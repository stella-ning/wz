<template>
  <!-- van-hairline--top -->
  <div class="pay-footer">
    <slot></slot>
    <div class="backgroundW flex justify-between align-center">
      <div class="total-price">
        <p class="num font12 color666">已选共{{data.num}}件，合计</p>
        <p v-if="isSure" class="price font18">{{orderSureTotalPrice | formatPrice }}</p>
        <p v-else class="price font18">{{data.price | formatPrice}}</p>
      </div>
      <van-button type="info" @click="handleSubmit" :disabled="btnDisabled" :loading="btnLoading" loading-text="加载中..." class="buy-btn">{{btnDisabled ? disabledTxt : btnTxt}}</van-button>
    </div>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data:{
      type:Object,
      default:() => {
        return {
          num:0,
          price:0
        }
      }
    },
    handleSubmit:Function,
    isSure:{
      default:()=>{
        return false;
      }
    },
    disabled:{
      type:Boolean,
      default:false
    },
    disabledTxt:{
      type:String,
      default:'立即购买'
    },
    btnTxt:{
      type:String,
      default:'立即购买'
    }
  },
  data() { 
    return {
      
    }
  },
  computed: {
    ...mapState({
      btnLoading: state => state.btnLoading,
      orderSureTotalPrice : state => state.orderSureTotalPrice,
    }),

    btnDisabled() {
      return this.disabled || this.btnLoading
    }
  },
  watch: {
    
  },
  created() {
    
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
  .pay-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    min-height: 13vw;
    height:auto;
    line-height: 1.1;
    background:#fff;
    // iphonex 底部适配
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */

    .backgroundW{
      padding-left: 4vw;
    }
    .buy-btn {
      background-color:#5077FE;
      border:none;
      border-radius: 0;
      height: 13vw;
      line-height: 100%;
      font-size: 1rem;
      width: 32vw;
    }
  }
</style>