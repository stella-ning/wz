<template>
<div>
    <el-form ref="form" :model="form" label-width="160px" :inline="true" align="left">
        <el-form-item label="流水单号">
            <el-input class="nn-input-s" v-model="form.goldOrderNo" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="用户最近登录App平台">
        <PlatformSelector @onPlatformSelect="onPlatformSelect"></PlatformSelector>
        </el-form-item>
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="流水用户">
           <el-input class="nn-input-s" v-model="form.phone" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="流水类型">
            <el-select v-model="form.transformType" placeholder="请选择">
                <el-option v-for="item in transformTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="流水方向">
            <el-select v-model="form.transformState" placeholder="请选择">
                <el-option v-for="item in transformStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="奖励id名称">
           <el-input class="nn-input-s" v-model="form.awardId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="任务id">
            <el-select v-model="form.adsTaskId" placeholder="请选择">
                <el-option
                v-for="item in [{adsTaskName:'全部',adsTaskId:''},...adsTaskList]"
                :key="item.adsTaskId"
                :label="item.adsTaskName"
                :value="item.adsTaskId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="infoBox">
            <div class="infoCell">
                <p>【我的金币】账户【流入】流水总额</p>
                <p class="color-red fs-24">+￥{{Math.abs(resultData.amountIn)}}</p>
            </div>
            <p class="infoDivider"></p>
            <div class="infoCell">
                <p>【我的金币】账户【流出】流水总额</p>
                <p class="color-green fs-24">-￥{{Math.abs(resultData.amountOut)}}</p>
            </div>
        </div>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="流水订单号" prop="goldOrderNo">
                </el-table-column>
                <el-table-column label="流水用户" prop="phone">
                </el-table-column>
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
                <el-table-column label="流水额度" prop="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.transformState == 1" class="color-red">+{{scope.row.transformAmount}}</span>
                        <span v-if="scope.row.transformState == 2" class="color-green">{{scope.row.transformAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="流水类型" prop="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.transformName">{{scope.row.transformName}}</span>
                        <span v-else>{{scope.row.transformType | getLabelByValue(transformTypeList)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="流水方向" prop="">
                    <template slot-scope="scope">
                        {{scope.row.transformState | getLabelByValue(transformStateList)}}
                    </template>
                </el-table-column>
                  <el-table-column label="用户最近登录App平台" prop="">
                      <template slot-scope="scope">
                          {{scope.row.lastLoginPlatformType | getLabelByValue((platformList))}}
                      </template>
                  </el-table-column>
                  <el-table-column label="奖励id名称" prop="awardId">
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
import PlatformSelector from "@/components/selector/PlatformSelector";
import platformList from "@/components/selector/platformList"
export default {
    data() {
        return {
            platformList:platformList,
            dialogVisible: false,
            totalPageCount: 0,
            tableData: [],
            form: {},
            transformTypeList: [{
                label:'全部',
                value:'',
            },{
                label:'每日签到获金币',
                value:1
             },{
                 label:'每日签到奖励翻倍，获金币',
                value:2
            },{
                 label:'每日签到（连续7日额外金币奖励）',
                value:3
            },{
                 label:'【看视频，领红包】刮奖，获金币',
                value:4
            },{
                label:'【一起获得500金币】任务，获金币',
                value:5
            },{
                label:'【挑战30000个金币！】刮奖，获金币',
                value:6
            },{
                label:'【挑战30000个金币！】刮奖，消耗金币',
                value:7
            },{
                label:'【购好物,领金币】刮奖，获金币',
                value:8
            },{
                label:'【兑换现金】，消耗金币',
                value:9
            },{
                label:'浏览商品，获取金币',
                value:10
            },],

            transformStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '流入',
                value: 1
            }, {
                label: '流出',
                value: 2
            }, ],
            resultData:{},
            adsTaskList:[],
        }
    },
    mounted(){
        this.callGetAdsTaskList();
        this.$nextTick(()=>{
            this.callFirstPage();
        });
    },
    methods: {
        onPlatformSelect(platformName){
           this.form.lastLoginPlatformType  = platformName;
        },
        toGoodsDetails(row) {
            this.dialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form};
            sendPost(urls.goldRecordTable, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.list;
                 this.totalPageCount = resultJson.resultData.count;
                 this.resultData = resultJson.resultData;
            });
        },
        callGetAdsTaskList(){
            let paramJson = {
                startIndex:0,
                length:1000
            }
             sendPost(urls.getAdsTaskList, {data: JSON.stringify(paramJson)},(resultJson)=>{
               this.adsTaskList = resultJson.resultData.adsTaskList;
            });
        }
    },
    components: {
        VDateRangePicker,
        VPagination,
        PlatformSelector
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
