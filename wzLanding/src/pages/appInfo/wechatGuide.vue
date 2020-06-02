<template>
 <div class="logoBox">
     <img class="logo" :src="qlkWechatIcon" alt="">
     <p v-if="isWechat" class="ta-c">长按二维码处可自动识别</p>
     <p v-else class="ta-c">请扫描二维码关注公众号</p>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         qlkWechatIcon:require('@/assets/images/appInfo/qlkWechatIcon.png'),
         isWechat:WxCompat.isWeixinClient(),
     }
   },
   methods: {

   }
 }
</script>

<style lang="scss" scoped>
  .logoBox {
        font-size: 1.1rem;
      .logo {
          width: 65vw;
          margin: 0 auto;
         padding-top: 20vh;
      }
  }
 
</style>
