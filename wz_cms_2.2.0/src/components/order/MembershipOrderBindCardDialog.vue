<template>
 <el-dialog title="订单关联会员卡号和物流单号（给用户发放和寄会员卡）" top="2%" :visible.sync="dialogForm.dialogVisible" width="38%" style="text-align: left">
        <el-form ref="dialogForm" :model="dialogForm" label-width="140px" :rules="dialogRules" :inline="true" align="left">
            <el-form-item label="下单用户："> {{dialogForm.userPhone}} </el-form-item>
            <el-form-item label="收货人："> {{dialogForm.consignee}} </el-form-item>
            <el-form-item label="收货人手机号：">{{dialogForm.phone}}</el-form-item>
            <el-form-item label="收货地址">{{dialogForm.area}} {{dialogForm.address}} </el-form-item>
            <!-- <el-form-item label="会员卡号" prop="cardNo">
                <el-input class="nn-input-s" v-model="dialogForm.cardNo" placeholder=""></el-input>
            </el-form-item> -->
            <el-form-item label="物流号" prop="deliverNo">
                <el-input class="nn-input-s" v-model="dialogForm.deliverNo" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="物流或快递公司" prop="deliverCompany">
                <el-select v-model="dialogForm.deliverCompany" placeholder="请选择">
                    <el-option
                    v-for="item in expressCompanyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item label="发货备注" prop="deliverRemark">
                <el-input type="textarea" class="nn-input-s" v-model="dialogForm.deliverRemark" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="发货人" prop="deliverer">
                <el-input class="nn-input-s" v-model="dialogForm.deliverer" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogForm.dialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
 export default {
   data () {
     return {
            expressCompanyList:[],
            dialogRules: {
                // cardNo: [{
                //     required: true,
                //     message: '请完善信息'
                // }],
                deliverNo: [{
                    required: true,
                    message: '请完善信息'
                }],
                deliverCompany: [{
                    required: true,
                    message: '请完善信息'
                }],
                deliverRemark: [{
                    required: true,
                    message: '请完善信息'
                }],
                deliverer: [{
                    required: true,
                    message: '请完善信息'
                }],
            },
     }
   },
   created(){
         this.$store.dispatch('callConstantValue', 'expressCompanyList').then(constantValue => {
            this.expressCompanyList = JSON.parse(constantValue);
        })
   },
   methods: {
       submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.calldeliverCardOrder();
                }
            });
        },
        calldeliverCardOrder() {
            let paramJson = {...this.dialogForm};
            sendPost(urls.deliverCardOrder, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.dialogForm.dialogVisiable = false;
                    this.$emit('onSuccess')
                })
            });
        },
   },
//    watch:{
//        'dialogForm.dialogVisible'(){
//            alert(this.dialogForm.dialogVisiable)
//            if(this.dialogForm.dialogVisiable) {
//                this.dialogForm.cardNo = '';
//                this.dialogForm.deliverNo = '';
//                this.dialogForm.deliverCompany = '';
//                this.dialogForm.deliverRemark = '';
//                this.dialogForm.deliverer = '';
//            }
//        }
//    },
   props:{
       dialogForm:{
           default:{
               dialogVisible:false,
           }
       }
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
