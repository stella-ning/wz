<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.phone" placeholder="精确搜索-注册手机号"></el-input>
        </el-form-item>
        <el-form-item label="权益类型">
            <el-select v-model="form.benifitId" placeholder="请选择">
                <el-option v-for="item in benifitList" :key="item.value" :label="item.benifitName" :value="item.benifitId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="infoBox">
            <div class="infoCell">
                <p>查询的退款金额总额</p>
                <p class="fs-24">￥{{amoutSummary | moneyFormat}}</p>
            </div>
            <p class="infoDivider"></p>
        </div>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                 <el-table-column label="用户真实姓名" prop="" width="120">
                    <template slot-scope="scope">
                         {{scope.row.realName || '-'}}
                    </template>
                </el-table-column>
                <el-table-column label="生成时间" prop="">
                     <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="用户账号-注册手机号" prop="phone">
                </el-table-column>
                <el-table-column label="烈熊订单号" prop="orderId">
                </el-table-column>
                <el-table-column label="权益类型" prop="benifitName">
                </el-table-column>
                <el-table-column label="退款付金额" prop="">
                    <template slot-scope="scope">
                       ￥{{scope.row.price /100 | moneyFormat}}
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            totalPageCount: 0,
            tableData: [],
            form: {},
             benifitList: [],
            recordStatisticsList:[]
        }
    },
     created() {
        
    },
    mounted(){
         this.callGetBenifitList();
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {
                 recordType:2,//记录类型。1：付款，2：退款
                 ...paramJson,
             ...this.form} 
             sendPost(urls.getBillbearRecordList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.billbearRecordList;
                 this.totalPageCount = resultJson.resultData.billbearRecordCount;
                 this.recordStatisticsList = resultJson.resultData.recordStatisticsList;
             });
        },
         callGetBenifitList() {
            let paramJson = {
            };
            sendPost(urls.getBenifitList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitList = [
                    {benifitName:'全部',benifitId:''},
                    ...resultJson.resultData.benifitList
                ];
            });
        },
    },
      computed:{
        amoutSummary(){
            var total = 0;
            this.recordStatisticsList.forEach(element => {
                total =  NumberTool.floatAdd(total,element.totalPrice);
            });
            return NumberTool.floatDiv(total,100);
        }
    },
    components: {
        VDateRangePicker,
        VPagination
    }
}
</script>

<style lang="scss" scoped>
.infoBox {
    .infoDivider {
        display: inline-block;
        width: 1px;
        height: 46px;
        border-right: 1px solid #ECEEF2;
    }

    .infoCell {
        display: inline-block;
        padding: 20px;
        line-height: 36px;
        text-align: center;
    }
}
</style>
