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
                <el-option v-for="item in benifitList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="入口页面">
            <el-select v-model="form.pageName" placeholder="请选择">
                <el-option v-for="item in pageNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="统计类型">
            <el-select v-model="form.statisticsType" placeholder="请选择">
                <el-option v-for="item in statisticsTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <h3 class="nn-form_tips">查询结果统计</h3>
        <div label=" ">
            <div class="infoBox">
                <div v-for="(item,index) in clickStatisticsList" :key="index" class="infoCell">
                    <p>{{item.benifitName}}</p>
                    <p class="fs-24">{{item.clickCount}}</p>
                </div>
            </div>
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
                <el-table-column label="权益类型" prop="benifitName">
                </el-table-column>
                <el-table-column label="入口页面" prop="pageName">
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
            clickStatisticsList:[],
            listOne: [],
            form: {
                statisticsType:1
            },
            benifitList: [],
            pageNameList: [{
                label: '全部',
                value: ''
            }, {
                label: '会员特权',
                value: '会员特权'
            }, {
                label: '首页',
                value: '首页'
            }, {
                label: '权益品牌',
                value: '权益品牌'
            },{
                label: '麒麟会员',
                value: '麒麟会员'
            },],
            statisticsTypeList: [{
                label: 'uv',
                value: 2
            }, {
                label: 'pv',
                value: 1
            }, ]
        }
    },
    created() {
        // for (let index = 0; index < 8; index++) {
        //     this.listOne.push({
        //         label: '食神卡 季卡'
        //     })
        // }
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
             paramJson = {...paramJson,...this.form}
             sendPost(urls.getBenifitClickList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.benifitClickList;
                 this.totalPageCount = resultJson.resultData.benifitClickCount;
                 this.clickStatisticsList = resultJson.resultData.clickStatisticsList;
             });
        },
        callGetBenifitList() {
            let paramJson = {
                startIndex:0,
                length:1000,
            };
            sendPost(urls.getBenifitList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitList = [
                    {benifitName:'全部',benifitId:''},
                    ...resultJson.resultData.benifitList
                ];
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
.infoBox {
    .infoCell {
        display: inline-block;
        padding: 12px 12px;
        line-height: 36px;
        text-align: center;
        position: relative;
    }

    .infoCell::after {
        content: ' ';
        display: inline-block;
        width: 1px;
        height: 64px;
        border-right: 1px solid #ECEEF2;
        position: absolute;
        right: 0;
        top: 18px;
    }
}
.nn-form_tips {
    padding-left: 20px;
}
</style>
