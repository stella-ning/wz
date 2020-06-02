<template>
  <van-tabbar 
    route 
    active-color="#5077FE"
    inactive-color="#999"
    @change="onchange"
    class="iphonex"
  >
    <van-tabbar-item
      v-for="(item,index) in tabbar"
      :key="index"
      replace
      :to="item.to"
    >
      <span>{{item.title}}</span>
      <i slot="icon" class="iconfont font22" :class="item.icon"></i>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>  
  export default {
    data() {
      return {
        active: '',
        tabbar: [
          { icon:'icon-brand2', title:'品牌会场', to:'/index' },
          { icon:'icon-order', title:'订单', to:'/orderList'},
          { icon:'icon-home', title:'我的', to:'/userHome' }
        ]
      }
    },
    mounted() {
    },
    
    methods: {
      onchange() {
        window.scrollTo(0, 0);
      }
    },
    

  }
</script>

<style lang="scss" scoped>
  .iphonex {
    // iphonex 底部适配
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    height: calc(50px + constant(safe-area-inset-bottom));
    height: calc(50px + env(safe-area-inset-bottom));
  }
</style>