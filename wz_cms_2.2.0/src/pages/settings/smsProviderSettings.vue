<template>
<PasswordPannel>
    <el-form ref="form" :model="form" label-width="180px" :inline="false" align="left">
        <el-form-item label="【验证码】短信供应商：">
              <!-- <el-radio v-model="form.SMSType1" :label="1">享讯</el-radio> -->
              <el-radio v-model="form.SMSType1" :label="2">国都</el-radio>
              <el-radio v-model="form.SMSType1" :label="3">创蓝</el-radio>
              <!-- <el-radio v-model="form.SMSType1" :label="4">耀嘉</el-radio> -->
              <el-radio v-model="form.SMSType1" :label="5">众览</el-radio>
                <el-radio v-model="form.SMSType1" :label="6">易网 </el-radio>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="【营销类】短信供应商：">
             <el-radio v-model="form.SMSType2" :label="1">众览</el-radio>
        </el-form-item>
    </el-form>
    <div class="ta-l mt-40 nn-bottom-bar">
       <el-button type="primary" @click="callUpdateSMSType">保 存</el-button>
    </div>
</PasswordPannel>
</template>

<script>
import PasswordPannel from '@/components/security/PasswordPannel'
export default {
    data() {
        return {
            form:{
                SMSType1:'',
                SMSType2:''
            }
        }
    },
    created(){
        this.callGetSMSType();
    },
    methods: {
        callGetSMSType() {
            let paramJson = {
            };
            sendPost(urls.getSMSType, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.form.SMSType1 = Number(resultJson.resultData.SMSType1);
                this.form.SMSType2 =  Number(resultJson.resultData.SMSType2);
            });
        },
         callUpdateSMSType() {
             let paramJson = {
                ...this.form,
             };
             sendPost(urls.updateSMSType, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 successToast(resultJson.resultMsg,()=>{
                      this.callGetSMSType();
                 });
             });
         },
    },
    components: {
        PasswordPannel
    }
}
</script>

<style lang="scss" scoped>

 
</style>
