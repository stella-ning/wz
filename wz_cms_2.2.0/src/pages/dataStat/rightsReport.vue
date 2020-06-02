<template>
<div>
    <el-form ref="form" :model="form" label-width="170px" :inline="true" align="left">
        <el-form-item label="按照业务发生时间统计：">
            <VDateRangePicker type="date" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callData">查 询</el-button>
        </el-form-item>

        <p class="nn-form_title">权益流量总分布：
             <el-button type="warning" size="small" icon="el-icon-upload2" @click="showExportDialog('flow')">导出</el-button>
        </p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="benifitFlowDistributeList" style="width: 100%"  align="left" border  height="450">
                <el-table-column label="日期" prop="days" fixed width="100"> 
                </el-table-column>
                <el-table-column label="星期" prop="week"  width="120"> 
                    <template slot-scope="scope">
                        {{new Date(scope.row.week).getWeek()}}
                    </template>
                </el-table-column>
                <el-table-column label="激活用户app打开数(uv)" prop="userUv"  width="120"> 
                </el-table-column>
                <el-table-column label="权益总uv" prop="benifitCount"  width="120"> 
                </el-table-column>
                <el-table-column label="权益总uv/激活用户app打开数(uv)" prop="benifitCountUv"  width="120"> 
                </el-table-column>
                <el-table-column label="首页入口权益总uv" prop="home"  width="120"> 
                </el-table-column>
                <el-table-column label="首页入口权益总uv/权益总uv" prop="homeBenifitUv"  width="120"> 
                </el-table-column>
                <el-table-column label="首页入口权益总uv/激活用户app打开数(uv)" prop="homeUserUv"  width="120"> 
                </el-table-column>
                <el-table-column label="会员中心页权益总uv" prop="member"  width="120"> 
                </el-table-column>
                <el-table-column label="会员中心页权益总uv/权益总uv" prop="memberBenifitUv"  width="120"> 
                </el-table-column>
                <el-table-column label="会员中心页权益总uv/激活用户app打开数(uv)" prop="memberUserUv"  width="120"> 
                </el-table-column>
                <el-table-column label="权益品牌页权益总uv" prop="brand"  width="120"> 
                </el-table-column>
                <el-table-column label="权益品牌页权益总uv/权益总uv" prop="brandBenifitUv"  width="120"> 
                </el-table-column>
                <el-table-column label="权益品牌页权益总uv/激活用户app打开数(uv)" prop="brandUserUv"  width="120"> 
                </el-table-column>
               
            </el-table>
        </div>

        <p class="nn-form_title">权益业务总情况：
             <el-button type="warning" size="small" icon="el-icon-upload2" @click="showExportDialog('benifit')">导出</el-button>
        </p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="benifitBusinessList" style="width: 100%"  align="left" border height="450">
                <el-table-column label="日期" prop="days" fixed="" width="100">
                </el-table-column>
                <el-table-column label="星期" prop="week">
                    <template slot-scope="scope">
                        {{new Date(scope.row.week).getWeek()}}
                    </template>
                </el-table-column>
                <el-table-column label="激活用户app打开数(uv)" prop="userUv" width="120">
                </el-table-column>
                <el-table-column label="权益订单总数（直充+卡密+烈熊+易加油）" prop="orderCount" width="120">
                </el-table-column>
                <el-table-column label="权益订单总数直充+卡密）" prop="benifitOrderCount">
                </el-table-column>
                <el-table-column label="权益订单总金额（直充+卡密）" prop="" width="120">
                    <template slot-scope="scope">
                        {{scope.row.paymentMoney}}元
                    </template>
                </el-table-column>
                <el-table-column label="权益订单总利润（直充+卡密）" prop="" width="120">
                    <template slot-scope="scope">
                        {{scope.row.purchasePrice }}元
                    </template>
                </el-table-column>
                <el-table-column label="权益订单总金额（易加油）" prop="" width="120">
                      <template slot-scope="scope">
                        {{scope.row.ejiayouMoney }}元
                    </template>
                </el-table-column>
                <el-table-column label="权益订单总金额（烈熊）" prop="" width="120">
                     <template slot-scope="scope">
                        {{scope.row.billbearPayment}}元
                    </template>
                </el-table-column>
                
            </el-table>
        </div>
        <!-- 【直充业务】快速统计： -->
        <p class="nn-form_title">单个权益详细情况：</p>
        <p class="nn-form_tips mt-40">【直充业务】快速统计：
             <el-button type="warning" size="small" icon="el-icon-upload2" @click="showExportDialog('zhichong')">导出</el-button>
        </p>
       <el-table class="mt-20 nn-no-overflow-table" :data="benifitStatisticsList" style="width: 100%" align="left" border height="450">>
            <el-table-column v-for="(item, index) in benifitLabelList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key =='week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 【卡密业务】快速统计： -->
        <p class="nn-form_tips mt-40">【卡密业务】快速统计：
             <el-button type="warning" size="small" icon="el-icon-upload2" @click="showExportDialog('kami')">导出</el-button>
        </p>
       <el-table class="mt-20 nn-no-overflow-table" :data="cdkeyBenifitStatisticsList" style="width: 100%" align="left" border height="450">
            <el-table-column v-for="(item, index) in cdkeybenifitLabelList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key == 'week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 【H5跳转产品】快速统计： -->
        <p class="nn-form_tips mt-40">【H5跳转产品】快速统计：
              <el-button type="warning" size="small" icon="el-icon-upload2" @click="showExportDialog('h5')">导出</el-button>
        </p>
        <el-table class="mt-20 nn-no-overflow-table" :data="h5BenifitStatisticsList" style="width: 100%" align="left" border height="450">
            <el-table-column v-for="(item, index) in h5BenifitLabelList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key == 'week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 【烈熊产品】快速统计： -->
        <p class="nn-form_tips mt-40">【烈熊产品】快速统计：
              <el-button type="warning" size="small" icon="el-icon-upload2" @click="showExportDialog('liexiong')">导出</el-button>
        </p>
         <el-table class="mt-20 nn-no-overflow-table" :data="liexiongBenifitStatisticsList" style="width: 100%" align="left" border height="450">
            <el-table-column v-for="(item, index) in liexiongBenifitLabelList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key == 'week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 【易加油】快速统计： -->
        <p class="nn-form_tips mt-40">【易加油】快速统计：</p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%"  align="left" border height="450">
                <el-table-column label="" prop="">
                </el-table-column>
            </el-table>
        </div>
    </el-form>

    <!-- 导出对话框 -->
    <el-dialog title="导出" :visible.sync="exportDialogVisible" width="40%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">导出条件与筛选条件一致</p>
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
export default {
    data() {
        return {
            exportDialogVisible:false,
            exportDialogForm:{},
            form: {},
            paramJson: {},
            exportType:0,
            tableData:[],
            benifitBusinessList:[],
            benifitBusinessResultAmount:{},
            benifitFlowDistributeList:[],
            benifitFlowDistributeResultAmount:{},
            benifitStatisticsList:[],
            benifitLabelList:[],
            cdkeybenifitLabelList:[],
            cdkeyBenifitStatisticsList:[],
            liexiongBenifitLabelList:[],
            liexiongBenifitStatisticsList:[],
            h5BenifitLabelList:[],
            h5BenifitStatisticsList:[],
        }
    },
    mounted(){
       
    },
    methods: {
        callData(){
             let paramJson = {
                ...JSON.parse(JSON.stringify(this.form))
             };
             paramJson.timeStart = getTimeStampStart( paramJson.timeStart);
             paramJson.timeEnd = getTimeStampStart( paramJson.timeEnd);
             this.paramJson = paramJson;
             if(isTimeNull(paramJson.timeStart)) {
                 warningToast('请选择开始时间');
                 return ;
             }
              if(isTimeNull(paramJson.timeEnd)) {
                 warningToast('请选择结束时间');
                 return ;
             }
             this.callGetBenifitFlowDistributeList(paramJson);
             this.callGetBenifitBusinessList(paramJson);
             this.callGetRechargeStatisticsList(paramJson);
             this.callGetCardPasswordStatisticsList(paramJson);
             this.callGetBillbearStatisticsList(paramJson);
             this.callGetBenifitH5StatisticsList(paramJson);
        },
        showExportDialog(exportType) {
             if(isTimeNull(this.paramJson.timeStart)) {
                 warningToast('请选择开始时间');
                 return ;
             }
              if(isTimeNull(this.paramJson.timeEnd)) {
                 warningToast('请选择结束时间');
                 return ;
             }
            this.exportType = exportType;
            this.exportDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.timeStart = timeStart;
            this.form.timeEnd = timeEnd;
        },
        //获取权益流量总分布列表
        callGetBenifitFlowDistributeList(paramJson) {
            sendPost(urls.getBenifitFlowDistributeList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitFlowDistributeList = resultJson.resultData.benifitFlowDistributeList;
                this.benifitFlowDistributeResultAmount = resultJson.resultData.benifitFlowresultAmountDistributeList;
            });
        },
        //获取权益业务列表
        callGetBenifitBusinessList(paramJson) {
            sendPost(urls.getBenifitBusinessList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitBusinessList = resultJson.resultData.benifitBusinessList;
                this.benifitBusinessResultAmount = resultJson.resultData.resultAmount;
            });
        },
        //获取直充统计列表
        callGetRechargeStatisticsList(paramJson) {
            sendPost(urls.getRechargeStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitLabelList =resultJson.resultData.benifitLabelList;
                this.benifitStatisticsList =resultJson.resultData.benifitStatisticsList;
            });
        },
        //获取卡密统计列表
        callGetCardPasswordStatisticsList(paramJson) {
            sendPost(urls.getCardPasswordStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.cdkeybenifitLabelList =resultJson.resultData.benifitLabelList;
                this.cdkeyBenifitStatisticsList =resultJson.resultData.benifitStatisticsList;
            });
        },
        //获取烈熊统计列表
        callGetBillbearStatisticsList(paramJson) {
            sendPost(urls.getBillbearStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.liexiongBenifitLabelList =resultJson.resultData.benifitLabelList;
                 this.liexiongBenifitStatisticsList = resultJson.resultData.benifitStatisticsList;
            });
        },
        //获取H5统计列表
        callGetBenifitH5StatisticsList(paramJson) {
            sendPost(urls.getBenifitH5StatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.h5BenifitLabelList =resultJson.resultData.benifitLabelList;
                 this.h5BenifitStatisticsList = resultJson.resultData.benifitStatisticsList;
            });
        },
          //导出
        callExport() {
            let paramJson = this.paramJson;
            let postUrl = '';
            switch (this.exportType) {
                case 'flow':
                    postUrl = urls.exportBenifitFlowDistributeList;
                    break;
                case 'benifit':
                      postUrl = urls.exportBenifitBusinessList;
                    break;
                case 'zhichong':
                     postUrl = urls.exportBenifitStatisticsList;
                     paramJson.type = 1;
                    break;
                case 'kami':
                      postUrl = urls.exportBenifitStatisticsList;
                      paramJson.type = 2;
                    break;
                case 'h5':
                     postUrl =  urls.exportBenifitStatisticsList;
                     paramJson.type = 3;
                    break;
                case 'liexiong':
                     postUrl = urls.exportBenifitStatisticsList;
                     paramJson.type = 4;
                    break;
                default:
                    break;
            }
            sendDownLoad(postUrl, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.exportDialogVisible = false;
            });
        },
        

    },
    components: {
        VDateRangePicker
    }
}
</script>

<style lang="scss" scoped>

 .nn-form_title {
     padding-left: 0px!important;
 }

  // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 26px; // 横向滚动条
    height: 16px; // 纵向滚动条 必写
  }
</style>
