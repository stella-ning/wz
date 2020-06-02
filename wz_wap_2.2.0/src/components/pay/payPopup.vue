<template>
  <van-action-sheet
    v-model="show"
    :value="value"
    :actions="actions"
    @select="onSelect"
    title="请选择支付方式"
  >
  </van-action-sheet>
</template>

<script>  
  import { weXinH5Pay, dopay } from '@/api'

  export default {
    props:{
      value:{
        type:Boolean,
        default:false
      },
      order: {
        type:Object,
        default:() => {
          return {
            id:'',
            orderId:''
          }
        }
      }
    },

    data() {
      return {
        show:false,
        actions: [
          { name: '微信支付' },
          // { name: '银行卡支付' }
        ]
      }
    },

    computed: {
      user() {
        return this.$store.state.user
      }
    },

    mounted() {
      this.show = this.value
      //处理授权后hash路由参数拼接问题
      let href = window.location.href
      //url包括 wap/?code 证明为从微信跳转回来的
      if(href.includes('wap/?code')) {
        let code = this.getQueryVariable('code')
        let urlLeft = href.indexOf('wap/') //获取url左侧结束的位置
        let urlRight = href.indexOf('#/') //获取url右侧开始的位置
        let newUrl = href.substring(0,urlLeft+4)+href.substring(urlRight)+`&code=${code}` //拼接成新的跳转连接
        window.location = newUrl
      }

      //判断有code，则去支付
      if(this.$route.query.code) {
        let query = JSON.parse(JSON.stringify(this.$route.query))
        let code = query.code
        delete query.code
        this.$router.replace({
          name:'orderDetail',
          query
        })
        
        this.jsApiPay(code)
      }
    },
    
    methods: {
      onSelect(item) {
        if(item.name == '银行卡支付') {
          this.ysPay()
        }

        if(item.name == '微信支付') {
          this.wxPay()
        }

        this.show = false
      },

      ysPay() {
        // 判断用户是否绑卡，未绑卡去绑卡
        if(this.user.bankCardList.length > 0) {
          this.$router.push({
            name:'bankCardList',
            query: {
              orderId:this.order.orderId,
              id:this.order.id
            }
          })
        } else {
          this.$router.push(`/bankPay?orderId=${this.order.orderId}&id=${this.order.id}`)
        }
      },

      wxPay() {
        // 判断是否微信打开
        let ua = window.navigator.userAgent.toLowerCase()
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
          //this.jsApiPay()
          //微信授权
          const APPID = 'wxfa51748f12d0f6fd'
          const URL = encodeURIComponent(window.location.href)
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${URL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        } else {
          this.h5Pay()
        }
      },

      jsApiPay(code) {
        this.$toast.loading({
          mask: true,
          duration:0,
          message: '加载中...'
        })
        let data = {
          outTradeNo:this.order.orderId || this.$route.query.orderNo,
          code
        }

        dopay(data).then(ret => {

          let payData = {
            appId:ret.data.appId,
            timeStamp:ret.data.timeStamp,
            nonceStr:ret.data.nonceStr,
            package:ret.data.package,
            signType:ret.data.signType,
            paySign:ret.data.sign
          }

          //兼容安卓调不起微信支付
          setTimeout(() => {
            this.$toast.clear()

            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(payData), false)
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(payData))
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(payData))
              }
            }else{
              this.onBridgeReady(payData)
            }
          },1000)

        }).catch(err => {
          window.alert(err)
        })

      },

      //发起支付
      onBridgeReady(data){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data, res => {
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              this.$notify({
                message: '支付成功',
                background: '#19be6b',
                className:'notify-box'
              })
              setTimeout(() => {
                this.$emit('fetchData')
              },1000)
            } else if(res.err_msg == "get_brand_wcpay_request:fail") {
              window.alert('支付失败，请重试')
            }
        })
      },

      async h5Pay() {
        let data = {
          orderId:this.order.orderId
        }
        
        let ret = await weXinH5Pay(data)
        
        //回调链接
        let redirect_url = encodeURIComponent(`${window.location.href}&showFinish=true`)
        //跳转链接
        let mweb_url = `${ret.data.mweb_url}&redirect_url=${redirect_url}`
        window.location.href = mweb_url
      },

      //获取url参数
      getQueryVariable(variable) {
        var query = window.location.search.substring(1)
        var vars = query.split("&")
        for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=")
          if(pair[0] == variable){return pair[1]}
        }
        return(false)
      }
    },
    
    watch:{
      value() {
        this.show = this.value
      },
      show() {
        this.$emit('input', this.show)
      }
     }
  }
</script>

<style lang="scss" scoped>
  
</style>