<template>
 <div>
     <el-breadcrumb class="nn-breadcrumb" separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/user/userList' }">用户管理</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: '/user/userList' }">用户列表</el-breadcrumb-item>
         <el-breadcrumb-item>用户列表详情</el-breadcrumb-item>
     </el-breadcrumb>
     <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
         <el-form-item label="用户ID">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="手机号">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="姓名">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="性别">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="身份证号">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="身份认证">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="手机三要素">
              <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="联系人">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="工作信息">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="银行卡">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="银行卡号">
                 <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="开户行">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="银行预留手机号">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="第一联系人">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="第一联系人号码">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="第二联系人">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="第二联系人号码">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="注册渠道">
                <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="注册系统">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="注册时间">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="首次登录APP时间">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="开启授信">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="授信总额">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="剩余额度">
               <span class="form-text">xxxx</span>
          </el-form-item>
          <el-form-item label="授信状态:通过">
               <span class="form-text">xxxx</span>
          </el-form-item>
               
     </el-form>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        form:{}
     }
   },
   methods: {

   }
 }
</script>

<style lang="scss" scoped>

   .form-text {
       display: inline-block;
       width: 10vw;
   }

     /deep/ .el-form-item {
         margin-bottom: 0px!important;
    }
</style>
