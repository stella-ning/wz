<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="h5渠道商名称：">
            <el-input class="nn-input-s" v-model="form.distributorName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="跟进人：">
            <el-input class="nn-input-s" v-model="form.clerk" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="渠道号：">
            <el-input class="nn-input-s" v-model="form.channelName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="日期：">
            <VDateRangePicker type="date" :defaultStart="defaultStart" :defaultEnd="defaultStart"  :timeInterval="10" @onTimePick="onTimePick"></VDateRangePicker>
            <span class="color-999"> （查询间隔时间前必须小于等于10天）：</span>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-upload2" @click="showExportDialog">导出表格</el-button>
            <el-button type="danger" icon="el-icon-setting" @click="showSearchSettingsDialog">查询配置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="日期" prop="days">
                </el-table-column>
                <el-table-column label="星期" prop="dayOfWeek">
                </el-table-column>
                <el-table-column label="对应h5寻流渠道号" prop="channelName">
                </el-table-column>
                <el-table-column label="h5渠道商名称" prop="distributorName">
                </el-table-column>
                <el-table-column label="落地页使用版本" prop="landPageName">
                </el-table-column>
                <el-table-column label="跟进人" prop="clerk">
                </el-table-column>
                <el-table-column label="总费用" prop="">
                     <template slot-scope="scope">
                        {{scope.row.totalCost/100 | moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="当前渠道单价" prop="">
                    <template slot-scope="scope">
                        {{scope.row.channelPrice/100 | moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="会员-支付成功的总次数（cms实际）" prop="buyCardUser">
                </el-table-column>
                <el-table-column label="会员-支付成功的总次数（扣量）" prop="buyCardUserX">
                </el-table-column>
                <el-table-column label="app首次登录数" prop="firstLoginCount">
                </el-table-column>
                <el-table-column label="首次登录/成功支付" prop="floginBcardRate">
                </el-table-column>
                <el-table-column label="首单（包括0元购只要下了单都算" prop="firstOrder">
                </el-table-column>
                <el-table-column label="0元购数" prop="zeroBuy">
                </el-table-column>
                <el-table-column label="当天首单转化（除以app首登）" prop="forderFloginRate">
                </el-table-column>
                <el-table-column label="用户渠道收入" prop="channelIncome">
                    <template slot-scope="scope">
                        {{scope.row.channelIncome}}元
                    </template>
                </el-table-column>
                <el-table-column label="roi" prop="roi">
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>

    <!-- 查询配置 -->
    <el-dialog title="查询配置" :visible.sync="searchSettingsDialogVisible" width="40%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="searchSettingsDialogForm" :model="searchSettingsDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item label="展示顺序：">
                <el-radio v-model="form.orderBy" :label="1">会员-支付成功的总次数正序>渠道号生成时间倒序</el-radio>
                <el-radio v-model="form.orderBy" :label="2">会员-支付成功的总次数倒序>渠道号生成时间倒序</el-radio>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="searchSettingsDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="searchSettingsDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 导出表格 -->
    <el-dialog title="导出表格" :visible.sync="exportDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item label="日期：">
               <VDateRangePicker type="date" :timeInterval="10" @onTimePick="onTimePickExport"></VDateRangePicker>
            </el-form-item>
             <el-form-item label="展示顺序：">
                <el-radio v-model="exportDialogForm.orderBy" :label="1">会员-支付成功的总次数正序>渠道号生成时间倒序</el-radio>
                <el-radio v-model="exportDialogForm.orderBy" :label="2">会员-支付成功的总次数倒序>渠道号生成时间倒序</el-radio>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="exportDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callExport">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            defaultStart: new Date(new Date().getTime()).toString(), 
            exportDialogVisible: false,
            exportDialogForm: {
                orderBy:1
            },
            searchSettingsDialogVisible: false,
            searchSettingsDialogForm: {},
            totalPageCount: 0,
            tableData: [],
            form: {
                orderBy:1
            },
        }
    },
    methods: {
        showExportDialog() {
            this.exportDialogVisible = true;
        },
        showSearchSettingsDialog() {
            this.searchSettingsDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.dayStrStart = timeStart;
            this.form.dayStrEnd = timeEnd;
        },
        onTimePickExport(timeStart, timeEnd) {
            this.exportDialogForm.dayStrStart = timeStart;
            this.exportDialogForm.dayStrEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            if(!isNull(paramJson.dayStrStart)) {
                  paramJson.dayStrStart = new Date(paramJson.dayStrStart).Format('yyyy-MM-dd')
            }
            if(!isNull(paramJson.dayStrEnd)) {
                  paramJson.dayStrEnd = new Date(paramJson.dayStrEnd).Format('yyyy-MM-dd')
            }
            sendPost(urls.getH5ChannelDataList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.h5ChannelDatas;   
                this.totalPageCount = resultJson.resultData.count;   
            });
        },
         //导出
        callExport(url, params = {}) {
            var paramJson = {
                ...JSON.parse(JSON.stringify(this.exportDialogForm))
            };
           
            if(isTimeNull(getTimeStamp(paramJson.dayStrStart))) {
                warningToast('请选择开始时间');
                return;
            }
            if(isTimeNull( getTimeStamp(paramJson.dayStrEnd))) {
                warningToast('请选择结束时间');
                return;
            }
            paramJson.dayStrStart = new Date(paramJson.dayStrStart).Format('yyyy-MM-dd')
            paramJson.dayStrEnd = new Date(paramJson.dayStrEnd).Format('yyyy-MM-dd')
            sendDownLoad(urls.exportH5ChannelDataList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                 this.exportDialogVisible = false;
            });
        },
    },
    components: {
        VDateRangePicker,
        VPagination
    }
}
</script>

<style lang="scss" scoped>

 
</style>
