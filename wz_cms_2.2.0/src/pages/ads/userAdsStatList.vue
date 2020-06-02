<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="时间">
            <VDateRangePicker type="datetime" :timeInterval="10" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="平台">
            <el-select v-model="form.platformGenre" placeholder="请选择">
                <el-option v-for="item in platformTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="渠道">
            <el-select v-model="form.channelNameList" placeholder="请选择" multiple="">
                <el-option v-for="item in channelList" :key="item.channelName" :label="item.channelName" :value="item.channelName">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择用户">
            <el-select v-model="form.userStatus" placeholder="请选择">
                <el-option v-for="item in userStatusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
             <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出</el-button>
           <el-button type="primary" icon="el-icon-search" @click="callTableData">查 询</el-button>
        </el-form-item>

        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="时间" prop="days">
                </el-table-column>
                <el-table-column label="平台" prop="">
                    <template slot-scope="scope">
                        {{scope.row.platformType | getLabelByValue(platformTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="渠道" prop="channelName">
                </el-table-column>
                <el-table-column label="用户" prop="">
                    <template slot-scope="scope">
                        {{scope.row.userStatus | getLabelByValue(userStatusList)}}
                    </template>
                </el-table-column>
                <el-table-column label="日活 A1" prop="phoneAmount">
                </el-table-column>
                <el-table-column label="广告填充率（埋点）B1" prop="adsFillRate">
                </el-table-column>
                <el-table-column label="人均曝光（埋点）B2" prop="exposureAverageRate">
                </el-table-column>
                <el-table-column label="人均点击（埋点）B3" prop="adsClickRate">
                </el-table-column>
                <el-table-column label="广告收益 B4" prop="padsEarnings">
                </el-table-column>
                <el-table-column label="每千次曝光价值 B5" prop="pecpmEarnings">
                </el-table-column>
                <el-table-column label="次日留存 B6" prop="morrowAmount">
                </el-table-column>
                <el-table-column label="通过福利中心的活跃数 B7" prop="welfareAmount">
                </el-table-column>
                <el-table-column label="提现人数 B8" prop="withdrawUserCount">
                </el-table-column>
                <el-table-column label="提现总额 B9" prop="withdrawAmount">
                </el-table-column>
                <el-table-column label="人均提现金额 B10" prop="withdrawAverageRate">
                </el-table-column>
                <el-table-column label="获得金币人数 B11" prop="goldUserCount">
                </el-table-column>
                <el-table-column label="获得金币总额 B12" prop="goldAmount">
                </el-table-column>
                <el-table-column label="人均金币 B13" prop="goldAverageRate">
                </el-table-column>
            </el-table>
        </div>
    </el-form>
      <!-- 导出对话框 -->
    <el-dialog title="导出" :visible.sync="exportDialogVisible" width="40%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">导出条件与筛选条件一致</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="exportDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callExport">确  定</el-button>
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
            exportDialogVisible:false,
            exportDialogForm:{},
            totalPageCount: 0,
            tableData: [],
            form: {},
            platformTypeList: [{
                label: '全部',
                value: 0,
            }, {
                label: 'ios',
                value: 3
            }, {
                label: 'android',
                value: 4
            }, ],
            userStatusList: [{
                label: '全部',
                value: 0,
            }, {
                label: '新用户',
                value: 1
            }, {
                label: '老用户',
                value: 2
            }, ],
            channelList:[],
            paramJson:{}
        }
    },
    mounted(){
        this.callGetAppChannelList();
    },
    methods: {
        showExportDialog(){
            this.exportDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.timeStart = timeStart;
            this.form.timeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson = {}) {
            paramJson = {...paramJson, ...JSON.parse(JSON.stringify(this.form))};
            this.paramJson = paramJson;
            if(isNull(paramJson.timeStart)) {
                warningToast('请选择开始时间');
                return ;
            }
            if(isNull(paramJson.timeStart)) {
                warningToast('请选择结束时间');
                return ;
            }
            sendPost(urls.getUserAdsStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.userAdsStatisticsList;
            });
        },
        //获取App渠道
        callGetAppChannelList() {
            let paramJson = { };
            sendPost(urls.getAppChannelList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.channelList = resultJson.resultData.appChannelList;
            });
        },
           //导出
        callExport(url, params = {}) {
            var paramJson = this.paramJson;
            sendDownLoad(urls.exportUserAdsStatisticsList , {
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
