<template>
<div>
    <el-breadcrumb class="nn-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order/membershipOrderList' }">会员卡订单列表</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="140px" :inline="false" align="left">
        <el-form-item label="订单号：">{{cardOrder.orderNo}}</el-form-item>
        <el-form-item label="下单时间：">{{new Date(cardOrder.addTime).Format()}}</el-form-item>
        <el-form-item label="订单状态："><span class="fs-18">{{cardOrder.orderState | getLabelByValue(orderStateList)}}</span></el-form-item> 
        <el-form-item label="下单用户：">{{cardOrder.userPhone}}</el-form-item>
        <el-form-item label="收货人：">{{cardOrder.consignee}}</el-form-item>
        <el-form-item label="收货人手机号：">{{cardOrder.phone}}</el-form-item>
        <el-form-item label="收货地址：">{{cardOrder.area}}{{cardOrder.address}}
            <el-button  class="ml-20" type="text" @click="showEditDialog">编辑</el-button>
        </el-form-item>
        <el-divider></el-divider>
        <h3 class="nn-form_subtitle">下单商品信息</h3>
        <el-form-item label="下单商品：">
            <p v-if="cardOrder.orderType == 1">会员卡（普通）</p>
            <p v-if="cardOrder.orderType == 2">会员卡（加急</p>
        </el-form-item>
        <el-form-item label="下单金额：">￥{{cardOrder.paymentMoney/100 | moneyFormat}} </el-form-item>
        <el-divider></el-divider>
        <h3 class="nn-form_subtitle">支付信息</h3>
        <el-form-item label="流水单号：">{{cardOrder.paymentNo}}</el-form-item>
        <el-form-item label="支付类型：">{{cardOrder.paymentType | getLabelByValue(paymentTypeList)}}</el-form-item>
        <el-form-item label="支付时间：">{{new Date(cardOrder.payCardTime).Format()}}</el-form-item>
        <el-divider></el-divider>
        <h3 class="nn-form_subtitle">发货信息</h3>
        <el-form-item label="发货时间：">{{new Date(cardOrder.deliverTime).Format()}}</el-form-item>
        <el-form-item label="发货备注：">{{cardOrder.deliverRemark}}</el-form-item>
        <el-form-item label="物流号：">{{cardOrder.deliverNo}}</el-form-item>
        <el-form-item label="物流或快递公司：">{{cardOrder.deliverCompany}}</el-form-item>
        <el-form-item label="发货人：">{{cardOrder.deliverer}}</el-form-item>
        <el-divider></el-divider>
        <h3 class="nn-form_subtitle">已发货，待激活卡片信息</h3>
        <el-form-item label="激活时间：">{{new Date(cardOrder.activateCardTime).Format()}}</el-form-item>
        <el-divider v-if="dialogForm.orderState == 2"></el-divider>
        <h3 v-if="dialogForm.orderState == 2" class="nn-form_subtitle">订单操作</h3>
        <el-button v-if="dialogForm.orderState == 2" type="primary" @click="showDialog">关联会员卡号和物流订单号</el-button>

    </el-form>
     <MembershipOrderBindCardDialog :dialogForm="dialogForm" @onSuccess="onBindSuccess"></MembershipOrderBindCardDialog>

     <el-dialog title="修改地址" :visible.sync="editAddressDialogVisible" width="50%"  class="ta-l" :close-on-click-modal="false">
         <el-form ref="editAddressDialogForm" :model="editAddressDialogForm" label-width="140px" :inline="true" align="left">
             <el-form-item label="">
                <el-cascader
                ref="addressCascader"
                     v-model="editAddressDialogForm.selectArea"
                    :options="options"
                     :props="{ expandTrigger: 'hover' }"
                    ></el-cascader>
             </el-form-item>
             <el-form-item label="">
                <el-input class="nn-input-s" v-model="editAddressDialogForm.address" placeholder=""></el-input>
             </el-form-item>
         </el-form> 
         <span slot="footer" class="dialog-footer">
             <el-button @click="editAddressDialogVisible = false">关  闭</el-button>
             <el-button type="primary" @click="confirmEdit">确  定</el-button>
        </span>
     </el-dialog>
</div>
</template>

<script>
import MembershipOrderBindCardDialog from "@/components/order/MembershipOrderBindCardDialog";
export default {
    data() {
        return {
            options:require('@/libs/area/addressData').areaList,
            editAddressDialogForm:{
                selectArea:[],
                address:''
            },
            editAddressDialogVisible:false,
            form:{},
            dialogForm:{
                 dialogVisible:false,
            },
            cardOrder:{},
            orderStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '已下单，待付款',
                value: 1
            },  {
                label: '已付款，待发货',
                value: 2
            }, {
                label: '已发货，待激活卡片',
                value: 3
            }, {
                label: '已激活卡片，订单完成',
                value: 4
            }, ],
            paymentTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: '支付宝支付',
                value: 1
            }, {
                label: '微信支付',
                value: 2
            }, ],
        }
    },
    created(){
        this.callGetCardOrderByCardOrderId();  

       
    },
    methods: {
        confirmEdit(){
            var labels = this.$refs.addressCascader.getCheckedNodes()[0].pathLabels ;
            this.callUpdateOrderAddress(labels)
        },
        showEditDialog() {
            this.editAddressDialogVisible = true;
        },
        showDialog(row) {
            this.dialogForm.dialogVisible = true;
        },
        callGetCardOrderByCardOrderId() {
            let paramJson = {
                cardOrderId: this.$route.query.cardOrderId,
            };
            sendPost(urls.getCardOrderByCardOrderId, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.cardOrder = resultJson.resultData.cardOrder;
                this.dialogForm = {...this.dialogForm,...this.cardOrder}
                this.editAddressDialogForm.address = this.cardOrder.address;
            });
        },
        onBindSuccess(){
              this.callGetCardOrderByCardOrderId();
        },
        callUpdateOrderAddress(labels) {
            let paramJson = {
                cardOrderId: this.cardOrder.cardOrderId,
                area: labels.join('-'),
                address: this.editAddressDialogForm.address,
            };
            sendPost(urls.updateOrderAddress, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.editAddressDialogVisible = false;
                    this.callGetCardOrderByCardOrderId();
                });
            });
        },
    },
     components: {
        MembershipOrderBindCardDialog
    }
}
</script>

<style lang="scss" scoped>

 /deep/ .el-form-item {
    margin-bottom: 5px;
}
</style>
