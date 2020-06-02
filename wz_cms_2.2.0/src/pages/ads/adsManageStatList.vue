<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="时间">
            <VDateRangePicker type="datetime" :timeInterval="10" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="广告位id">
             <el-select v-model="form.adsPositionId" placeholder="请选择">
                 <el-option
                v-for="item in [{adsPositionName:'全部',adsPositionId:''},...adsPositionList]"
                    :key="item.adsPositionId"
                    :label="item.adsPositionName"
                    :value="item.adsPositionId">
                 </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="广告位名称">
           <el-input class="nn-input-s" v-model="form.adsPositionName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="所属平台">
             <el-select v-model="form.platformGenre" placeholder="请选择">
                 <el-option
                 v-for="item in platformTypeList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
                 </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="广告类型" >
               <el-select v-model="form.adsType" placeholder="请选择">
                   <el-option
                   v-for="item in [{label:'全部',value:''},...adsTypeList]"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                   </el-option>
               </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出</el-button>
           <el-button type="primary" icon="el-icon-search" @click="callTableData">查 询</el-button>
        </el-form-item>

        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%"  align="left" border>
                <el-table-column label="时间" prop="days" width="100">
                </el-table-column>
                <el-table-column label="广告位id" prop="adsId">
                </el-table-column>
                <el-table-column label="广告位名称" prop="adsPositionName">
                </el-table-column>
                <el-table-column label="广告类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.adsType | getLabelByValue(adsTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="所属平台" prop="">
                    <template slot-scope="scope">
                        {{scope.row.platformType | getLabelByValue(platformTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="第三方广告位code" prop="adsCode">
                </el-table-column>
                <el-table-column label="曝光次数（回传）A1" prop="exposure">
                </el-table-column>
                <el-table-column label="点击次数（回传）A2" prop="click">
                </el-table-column>
                <el-table-column label="点击率（回传）A3" prop="clickScale">
                </el-table-column>
                <el-table-column label="ecpm（回传）A4" prop="ecmp">
                </el-table-column>
                <el-table-column label="收益 A5" prop="earnings">
                </el-table-column>
                <el-table-column label="请求人数（埋点）B1" prop="askDistinct">
                </el-table-column>
                <el-table-column label="请求次数（埋点）B2" prop="askAmount">
                </el-table-column>
                <el-table-column label="曝光人数（埋点）B3" prop="exposureDistinct">
                </el-table-column>
                <el-table-column label="曝光次数（埋点）B4" prop="exposureAmount">
                </el-table-column>
                <el-table-column label="点击人数（埋点）B5" prop="clickDistinct">
                </el-table-column>
                <el-table-column label="点击次数（埋点）B6" prop="clickAmount">
                </el-table-column>
                <el-table-column label="返回人数（埋点）B7" prop="backDistinct">
                </el-table-column>
                <el-table-column label="返回次数（埋点）B8" prop="backAmount">
                </el-table-column>
                <el-table-column label="请求->曝光（曝光人➗请求人）C1" prop="exposureAskDistinctScale" min-width="100">
                </el-table-column>
                <el-table-column label="曝光->点击（点击人➗曝光人）C2" prop="clickExposureDistinctScale" min-width="100">
                </el-table-column>
                <el-table-column label="点击->返回（返回人➗点击人）C3" prop="backClickDistinctScale" min-width="100">
                </el-table-column>
                <el-table-column label="请求->曝光（曝光次➗请求次）C4" prop="exposureAskAmountScale" min-width="100">
                </el-table-column>
                <el-table-column label="曝光->点击（点击数➗曝光数）C5" prop="clickExposureAmountScale" min-width="100">
                </el-table-column>
                <el-table-column label="点击->返回（返回次➗点击此）C6" prop="backClickAmountScale" min-width="100">
                </el-table-column>
                <el-table-column label="曝光价值（真实，次数）C7" prop="exposureWorth">
                </el-table-column>
                <el-table-column label="点击价值（真实，次数）C8" prop="clickWorth">
                </el-table-column>
            </el-table>
            <!--分页-->
            
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
            paramJson:{},
            adsPositionList:[],
             platformTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: 'ios',
                value: 3
            }, {
                label: 'android',
                value: 4
            }, ],
             adsTypeList:[{
                label:'信息流',
                value:1
             },{
                 label:'banner',
                value:2
            },{
                 label:'插屏广告',
                value:3
            },{
                 label:'全屏视频',
                value:4
            },{
                label:'开屏广告',
                value:5
            },{
                label:'激励视频广告啊',
                value:6
            },],
        }
    },
    mounted(){
        this.callGetAdsPositionList();
        //  this.$nextTick(()=>{
        //     this.callFirstPage();
        //  }) 
    },
    methods: {
        showExportDialog(){
            this.exportDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.timeStart = timeStart;
            this.form.timeEnd = timeEnd;
        },
        callGetAdsPositionList() {
            let paramJson = {
                startIndex: 0,
                length:100,
            };
            sendPost(urls.getAdsPositionList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.adsPositionList = resultJson.resultData.adsPositionList;
            });
        },
        callTableData(paramJson ={}) {
            paramJson = {...paramJson, ...JSON.parse(JSON.stringify(this.form))}
            this.paramJson = paramJson;
            if(isNull(paramJson.timeStart)) {
                warningToast('请选择开始时间');
                return ;
            }
            if(isNull(paramJson.timeStart)) {
                warningToast('请选择结束时间');
                return ;
            }
            sendPost(urls.getAdsStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.adsStatisticsList;
            }); 
        },
            //获取广告列表
        callGetAdsPositionList() {
            let paramJson = {
                startIndex: 0,
                length:100000,
            };
            sendPost(urls.getAdsPositionList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.adsPositionList = resultJson.resultData.adsPositionList;
            });
        },
          //导出
        callExport(url, params = {}) {
            var paramJson = this.paramJson;
            sendDownLoad(urls.exportAdsStatisticsList, {
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
