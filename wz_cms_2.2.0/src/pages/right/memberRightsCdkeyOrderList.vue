<template>
<div>
    <el-form ref="form" :model="form" label-width="180px" :inline="true" align="left">
        <el-form-item label="订单号">
            <el-input class="nn-input-s" v-model="form.orderNo" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="订单状态">
            <el-select v-model="form.orderState" placeholder="请选择">
                <el-option v-for="item in orderStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="支付时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePickPay"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="下单用户手机号">
            <el-input class="nn-input-s" v-model="form.phone" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="已获取卡密时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePickFinish"></VDateRangePicker>
        </el-form-item>
          <el-form-item label="用户真实姓名">
            <el-input class="nn-input-s" v-model="form.realName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="退款时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePickRefund"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="支付流水">
            <el-input class="nn-input-s" v-model="form.paymentNo" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="退款流水">
            <el-input class="nn-input-s" v-model="form.refundNo" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="下单金额">
            <el-input class="nn-input-xs" v-model="form.paymentMoneyStart" placeholder=""></el-input> ~
            <el-input class="nn-input-xs" v-model="form.paymentMoneyEnd" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="关联的卡密号">
            <el-input class="nn-input-s" v-model="form.cdkey" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="所属权益产品">
            <el-input class="nn-input-s" v-model="form.productName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="所属权益品牌">
            <el-input class="nn-input-s" v-model="form.benifitName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="权益品牌供应商">
            <el-input class="nn-input-s" v-model="form.benifitSupplier" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
            <el-select v-model="form.paymentType" placeholder="请选择">
                <el-option v-for="item in paymentTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>

        <div class="nn-form-line-h"></div>
        <el-form-item label="">
            <div class="infoBox">
                <div class="infoCell">
                    <p>查询订单合计总额：</p>
                    <p class="fs-24">{{cdkeyOrderMoney /100 | moneyFormat}}元</p>
                </div>
                 <div class="infoCell">
                    <p>利润 = 下单金额-拿货价：</p>
                    <p class="fs-24">{{cdkeyOrderProfit / 100 | moneyFormat}}元</p>
                </div>
            </div>
        </el-form-item>
        <div class="nn-form-line-h"></div>

        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="订单号" prop="orderNo">
                </el-table-column>
                <el-table-column label="订单状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.orderState |  getLabelByValue(orderStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="下单用户手机号" prop="phone">
                </el-table-column>
                <el-table-column label="用户真实姓名" prop="realName">
                </el-table-column>
                 <el-table-column label="品牌供应商" prop="benifitSupplier">
                </el-table-column>
                <el-table-column label="所属权益产品" prop="productName">
                </el-table-column>
                <el-table-column label="所属权益品牌" prop="benifitName">
                </el-table-column>
                <el-table-column label="下单金额" prop="">
                    <template slot-scope="scope">
                        {{scope.row.paymentMoney / 100 | moneyFormat}}元
                    </template>
                </el-table-column>
                <el-table-column label="拿货价" prop="">
                    <template slot-scope="scope">
                        {{scope.row.purchasePrice / 100 | moneyFormat}}元
                    </template>
                </el-table-column>
                <el-table-column label="订单利润" prop="">
                    <template slot-scope="scope">
                       {{ (scope.row.paymentMoney - scope.row.purchasePrice) / 100 | moneyFormat}}元
                    </template>
                </el-table-column>
                <el-table-column label="下单时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="已获取卡密时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.finishTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="退款时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.refundTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="支付类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.paymentType | getLabelByValue(paymentTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="支付流水" prop="paymentNo">
                </el-table-column>
                <el-table-column label="关联的卡密号" prop="cdkey">
                </el-table-column>
                <el-table-column label="退款流水" prop="refundNo">
                </el-table-column>
                <el-table-column label="操作退款管理员账号名" prop="refundOperator">
                </el-table-column>
                <el-table-column label="退款备注" prop="refundRemark">
                </el-table-column>
                <el-table-column label="失败原因" prop="result">
                </el-table-column>
                
                <el-table-column label="操作" prop="" width="140">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.orderState == 3" type="text" @click="showRefundDialog(scope.row)">手动操作退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
    <!--  手动操作退款 -->
    <el-dialog title="手动操作退款" :visible.sync="refundDialogVisible" width="40%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="refundDialogForm" :model="refundDialogForm" label-width="140px" :inline="false" align="left" :rules="refundDialogRules">
            <el-form-item label="退款流水：" prop="refundNo">
               <el-input class="nn-input-s" v-model="refundDialogForm.refundNo" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="退款备注：" prop="refundRemark">
               <el-input class="nn-input-s" type="textarea" :autosize="{ minRows: 3}" v-model="refundDialogForm.refundRemark" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="refundDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('refundDialogForm')">确 定</el-button>
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
            paramJson:{},
            cdkeyOrderMoney:0,
            cdkeyOrderProfit:0,
            refundDialogVisible: false,
            refundDialogForm: {},
            refundDialogRules: {
                refundNo: [{ required: true, message: '请填写信息' }],
                refundRemark: [{ required: true, message: '请填写信息' }],
            },
            totalPageCount: 0,
            tableData: [],
            form: {},
            orderStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '已下单，待付款',
                value: 1
            }, {
                label: '已支付',
                value: 2
            }, {
                label: '已获取卡密',
                value: 3
            }, {
                label: '取卡密失败',
                value: 4
            }, {
                label: '退款成功',
                value: 5
            }, ],
            paymentTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: 'App支付宝支付',
                value: 4
            }, {
                label: 'App微信支付',
                value: 5
            }, ],
        }
    },
    mounted(){
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateOrderRefundNo();
                 }
             })
        },
        showRefundDialog(row) {
            this.refundDialogVisible = true;
            this.refundDialogForm = {...row};
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickPay(timeStart, timeEnd) {
            this.form.payTimeStart = timeStart;
            this.form.payTimeEnd = timeEnd;
        },
        onTimePickFinish(timeStart, timeEnd) {
            this.form.finishTimeStart = timeStart;
            this.form.finishTimeEnd = timeEnd;
        },
        onTimePickRefund(timeStart, timeEnd) {
            this.form.refundTimeStart = timeStart;
            this.form.refundTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form};
            paramJson.paymentMoneyStart = paramJson.paymentMoneyStart * 100;
            paramJson.paymentMoneyEnd = paramJson.paymentMoneyEnd * 100;
            this.paramJson = paramJson;
            sendPost(urls.getCdkeyOrderList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.cdkeyOrderCount = resultJson.resultData.cdkeyOrderCount;
                this.tableData = resultJson.resultData.cdkeyOrderList;
                this.cdkeyOrderMoney = resultJson.resultData.cdkeyOrderMoney;
                this.cdkeyOrderProfit = resultJson.resultData.cdkeyOrderProfit;
                this.totalPageCount = resultJson.resultData.cdkeyOrderCount;
            });
        },
        //更新订单退款流水号
        callUpdateOrderRefundNo() {
            let paramJson = {
                benifitOrderId: this.refundDialogForm.benifitOrderId,
                userId:'',// 接口统一会上传
                refundNo:this.refundDialogForm.refundNo,
                refundRemark:this.refundDialogForm.refundRemark
            };
            sendPost(urls.updateOrderRefundNo, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 successToast(resultJson.resultMsg,()=>{
                     this.refundDialogVisible = false;
                     this.callTableData(this.paramJson);
                 });
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
</style>
