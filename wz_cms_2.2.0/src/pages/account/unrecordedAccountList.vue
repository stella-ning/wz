<template>
<div>
    <el-form ref="form" :model="form" label-width="160px" :inline="true" align="left">
        <el-form-item label="流水单号">
            <el-input class="nn-input-s" v-model="form.freezeOrderNo" placeholder="精确搜索"></el-input>
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
        <el-form-item label="购物订单状态">
            <el-select v-model="form.shoppingOrderState" placeholder="请选择">
                <el-option v-for="item in threeOrderStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="流水方向">
            <el-select v-model="form.transformState" placeholder="请选择">
                <el-option v-for="item in transformStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="流水是否失效">
           <el-select v-model="form.efficacyState" placeholder="请选择">
               <el-option
               v-for="item in efficacyStateList"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="已失效类型">
           <el-select v-model="form.efficacyType" placeholder="请选择">
               <el-option
               v-for="item in efficacyTypeList"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="收货时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickHarvest"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="【已入账】预计时间：">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickBudgetTime"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="关联的商品活动名称：">
            <el-input class="nn-input-s" v-model="form.actName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="infoBox">
            <div class="infoCell">
                <p>【待入账】账户【流入】流水总额</p>
                <p class="color-red fs-24">+￥{{resultData.sumFreezeAmountIn/100 | moneyFormat}}</p>
            </div>
            <p class="infoDivider"></p>
            <div class="infoCell">
                <p>【待入账】账户【流出】流水总额</p>
                <p class="color-green fs-24">-￥{{resultData.sumFreezeAmountOut/100 | moneyFormat}}</p>
            </div>
        </div>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="流水单号" prop="freezeOrderNo">
                </el-table-column>
                <el-table-column label="流水账号" prop="phone" min-width="100">
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
                <el-table-column label="流水金额" prop="">
                    <template slot-scope="scope">
                        ￥{{scope.row.transformAmount/100 | moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="流水类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.transformType | getLabelByValue(transformTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="购物订单状态" prop="">
                    <template slot-scope="scope">
                         {{scope.row.threeOrderState | getLabelByValue(threeOrderStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="收货时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.harvestTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="流水方向" prop="">
                    <template slot-scope="scope">
                        {{scope.row.transformState | getLabelByValue(transformStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="【已入账】预计时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.budgetTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="关联的商品活动名称" prop="actName">
                </el-table-column>
                
                <el-table-column label="流水是否失效" prop="">
                    <template slot-scope="scope">
                        {{scope.row.efficacyState | getLabelByValue(efficacyStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="已失效类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.efficacyType | getLabelByValue(efficacyTypeList)}}
                    </template>
                </el-table-column>
                 <el-table-column label="用户最近登录App平台" prop="">
                      <template slot-scope="scope">
                          {{scope.row.lastLoginPlatformType | getLabelByValue((platformList))}}
                      </template>
                  </el-table-column>
                <el-table-column label="购物商品" prop="">
                    <template slot-scope="scope">
                        <el-button v-show="isShowGoodsDetails(scope.row)" type="text" @click="toGoodsDetails(scope.row)">商品详细</el-button>
                    </template>
                </el-table-column>
                 
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
    <el-dialog title="商品详情" :visible.sync="dialogVisible" width="40%"   style="text-align: left">
        <div class="goodsImageBox">
                <img  class="goodsImage"
                :src="dialogForm.goodsImage" alt="">
            <div class="goodsInfo">
                <p class="goodsName fs-18">{{dialogForm.goodsName}}</p>
                <p class="orderNumber">订单编号：{{dialogForm.threeOrderNo}}</p>
                <p>下单时间：{{new Date(dialogForm.placeOrderTime).Format()}}</p>
                <p>平台：{{dialogForm.goodsPlatform}}</p>
            </div>  
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关  闭</el-button>
       </span>
    </el-dialog>
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
            dialogVisible:false,
            dialogForm:{},
            totalPageCount: 0,
            tableData: [],
            form: {},
            transformTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: '购物订单返利（普通订单）',
                value: 1
            }, {
                label: '购物订单返利（0元购订单）',
                value: 2
            }, {
                label: '购物订单返利（5元购订单）',
                value: 3
            }, {
                label: '【兑换现金】，消耗金币',
                value: 4
            }, {
                label: '会员【50元红包】刮奖活动',
                value: 5
            }, {
                label: '购物订单返利（1元购订单）',
                value: 6
            },],
            threeOrderStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '已付款，未收货',
                value: 1
            }, {
                label: '已收货',
                value: 2
            }, ],
            transformStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '流出',
                value: 1
            }, {
                label: '流入',
                value: 2
            }, ],
            goodsPlatformList:[{
                label:'未知',
                value:0,
            },{
                label:'淘宝',
                value:1
             },{
                 label:'天猫',
                value:2
            },],
            efficacyStateList:[{
                label:'全部',
                value:'',
            },{
                label:'已失效',
                value:1
             },{
                 label:'未失效',
                value:2
            },],
            efficacyTypeList:[{
                label:'全部',
                value:'',
            },{
                label:'退货退款',
                value:1
             },{
                 label:'订单被处罚',
                value:2
            },],
            resultData:{},
        }
    },
    mounted(){
       this.$nextTick(()=>{
           this.callFirstPage();
       })  
    },
    methods: {
        onPlatformSelect(platformName){
           this.form.lastLoginPlatformType  = platformName;
        },
        isShowGoodsDetails(row){
            return row.transformType == 1 || 
             row.transformType == 2||
             row.transformType == 3||
             row.transformType == 6;
        },
        toGoodsDetails(row){
            this.dialogVisible = true;
            this.dialogForm = row;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickBudgetTime(timeStart, timeEnd) {
            this.form.budgetTimeStart = timeStart;
            this.form.budgetTimeEnd = timeEnd;
        },
        onTimePickHarvest(timeStart, timeEnd) {
            this.form.harvestTimeStart = timeStart;
            this.form.harvestTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
             paramJson = {...paramJson,...this.form}
             sendPost(urls.getFreezeTransformList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.freezeTransformList;
                 this.totalPageCount = resultJson.resultData.freezeTransformrCount;
                 this.resultData = resultJson.resultData;
             });
        },
        
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

.goodsImageBox {
    display: flex;
    .goodsImage {
        width: 120px;
        max-height: 120px;
    }
    .goodsInfo{
        flex: 1;
        padding: 0 18px;
        line-height: 22px;
        .goodsName {
            overflow: hidden;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            box-orient: vertical;
            display: -webkit-box;
            display: box;
        }
        .orderNumber {
            margin-top: 10px;
        }
    }
}
</style>
