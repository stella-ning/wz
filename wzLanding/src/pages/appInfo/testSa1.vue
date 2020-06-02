<template>
 <div>
    <a class="text-blue" href="javascript:void(0)" @click="onLogin">登录 神策</a>
    <p>
       <a class="text-blue" href="javascript:void(0)" @click="$router.push('/appInfo/testSa2')">跳转测试页2</a>
    </p>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   created(){

   },
   methods: {
     onLogin(){
        STATS_SA.login({
            userId: 1,
            registerTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
            lastLoginTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
            phone: '13430387077',
            registerChannel:'testSaReg',
            loginChannel: 'testSaLogin',
            realName:  '小飞',
      });
     }
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
