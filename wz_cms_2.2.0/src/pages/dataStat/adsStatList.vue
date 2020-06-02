<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="广告位">
            <el-select v-model="form.adsLocation" placeholder="请选择">
                <el-option v-for="item in adsLocationList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="系统">
            <el-select v-model="form.os" placeholder="请选择">
                <el-option v-for="item in osList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.phone" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="广告主">
            <el-select v-model="advertiser" placeholder="请选择">
                <el-option v-for="item in advertiserList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="广告类型">
            <el-select v-model="form.adsType" placeholder="请选择">
                <el-option v-for="item in adsTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
             <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导 出</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border
             :summary-method="getSummaries"
            show-summary
            >
                <el-table-column label="日期" prop=""  width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="账号" prop="">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="用户真实姓名" prop="" width="120">
                    <template slot-scope="scope">
                         {{scope.row.realName || '-'}}
                    </template>
                </el-table-column>
                <el-table-column label="系统" prop="">
                    <template slot-scope="scope">
                        {{scope.row.osType | getLabelByValue(osList)}}
                    </template>
                </el-table-column>
                <el-table-column label="我方展现" prop="owerShowNum">
                </el-table-column>
                <el-table-column label="我方点击" prop="owerClickNum">
                </el-table-column>
                <el-table-column label="对方展现" prop="advertiserShowNum">
                </el-table-column>
                <el-table-column label="对方点击" prop="advertiserClickNum">
                </el-table-column>
                <el-table-column label="广告主" prop="">
                    <template slot-scope="scope">
                         {{scope.row.advertiser | getLabelByValue(advertiserList)}}
                    </template>
                </el-table-column>
                <el-table-column label="广告类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.adsType | getLabelByValue(adsTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="广告位" prop="">
                    <template slot-scope="scope">
                        {{scope.row.adsLocation | getLabelByValue(adsLocationList)}}
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>  
     <el-dialog title="导出" :visible.sync="exportDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="时间">
                <!-- <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickExport"></VDateRangePicker> -->
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
            exportDialogForm:{},
            exportDialogVisible:false,
            totalPageCount: 0,
            tableData: [],
            form: {},
            sumInfo:{},
            adsLocationList: [{
                label: '全部',
                value: '',
            }, {
                label: '签到成功的广告图片',
                value: 1
            }, {
                label: '每日签到奖励翻倍，看视频',
                value: 2
            }, {
                label: '签到翻倍的广告图片',
                value: 3
            }, {
                label: '【看视频，领红包】刮奖，看视频',
                value: 4
            }, {
                label: '【一起获得500金币】任务，看视频',
                value: 5
            }, ],
            osList: [{
                label: '全部',
                value: '',
            }, {
                label: 'ios',
                value: 3
            }, {
                label: 'android',
                value: 4
            }],
            advertiser: [{
                label: '全部',
                value: '',
            }, {
                label: '穿山甲',
                value: 1
            }, ],
            adsTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: '激励视频广告',
                value: 1
            }, {
                label: '插屏广告',
                value: 2
            }, ],
            advertiserList: [{
                label: '全部',
                value: '',
            }, {
                label: '穿山甲',
                value: 1
            },]
        }
    },
    created(){
        // for (let index = 0; index < 10; index++) {
        //     this.tableData.push({
        //         count:parseInt(Math.random(10) * 10)
        //     });
        // }
    },
    mounted(){
        this.$nextTick(()=>{
            this.callFirstPage();
        });
    },
    methods: {
         showExportDialog(){
            this.exportDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.startTime = timeStart;
            this.form.endTime = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            paramJson.startTime = getTimeStamp(paramJson.startTime);
            paramJson.endTime = getTimeStamp(paramJson.endTime);
            sendPost(urls.clickInfo, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.list;
                this.totalPageCount = resultJson.resultData.countNum;
                this.sumInfo = resultJson.resultData.sumInfo || {};
            });
        },
        getSummaries(param){
            console.log(param)
             const { columns, data } = param;
              return ['合计','','',this.sumInfo.ower_show_sum,this.sumInfo.ower_click_sum,this.sumInfo.advertiser_show_sum,this.sumInfo.advertiser_click_sum];
        },
         callExport(url, params = {}) {
            var paramJson = {
                addTimeStart:getTimeStamp(this.exportDialogForm.addTimeStart),
                addTimeEnd:getTimeStamp(this.exportDialogForm.addTimeEnd),
            };
            if(isTimeNull(paramJson.addTimeStart)) {
                warningToast('请选择开始时间');
                return;
            }
            if(isTimeNull(paramJson.addTimeEnd)) {
                warningToast('请选择结束时间');
                return;
            }
            // sendDownLoad(urls.exportMembershipCardList, {
            //     data: JSON.stringify(paramJson)
            // }, (resultJson) => {

            // });
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
