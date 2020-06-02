<template>
 <div class="nn-topbar">
    <div class="nn-topbar-content">
        <slot></slot>
        <span class="mr-20">  </span>
        <router-link to="/login">
            <el-button type="text">退出登录</el-button>
        </router-link>
    </div>

</div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   methods: {
      
   },
 }
</script>

<style lang="scss" scoped>

.nn-topbar {
    height: 60px;
    background: white;
    border-bottom: 1px solid #DAE0E8;
    text-align: right;
    line-height: 60px;
    background: white;
    .edit-btn {
        margin-top: 8px;
    }
    .nn-topbar-content {
        width: 90%;
        padding-left: 20px;
    }
}
.dialogContent {
    font-size:14px;
    line-height:24px;
    margin-top:-10px;
    max-height:60vh;
    overflow:auto;
    font-family: '微软雅黑';
    text-align: justify;
}
 
</style>


