 class WxPayH5 {


    constructor(){

    }

    pay
}

class WxPayJs {

    constructor(userInfo){
        this.userInfo = userInfo;
    }

    getWxCode(){
        if(getUrlArgs('code')) {
            var code = getUrlArgs('code')
            this.jsApiPay(code)
        }
    }

    callConfig(config){
         //判断是否是微信浏览器打开
         if(WxCompat.isWeixinClient()){
            let payData = {
                appId:config.appId,
                timeStamp:config.timestamp,
                nonceStr:config.nonce,
                package:config.packageName,
                signType:config.signType,
                paySign:config.signature
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
        }
    }

    //发起支付
    onBridgeReady(data){
        WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        res => {
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                this.$toast.success('支付成功');
                setTimeout(()=>{
                    window.location.reload()
                },500)
                
            } else if(res.err_msg == "get_brand_wcpay_request:fail") {
                this.$toast.fail('支付失败，请重试');
            }
        })
    }
    

    wxOfficialAccounts() {
        //微信授权
        let URL;
        let andCode = encodeURIComponent('&');
        let urlPrefix = window.location.href.split('#')[0];
        URL = encodeURIComponent(`${urlPrefix}#/card/buyCard?isSimple=${this.isSimple}&channel=${getUrlArgs('channel')}&time=${new Date().getTime()}`)
        let returnUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${URL}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        
        window.location.href = returnUrl
        return;
    }

    jsApiPay(this,code){

        this.$toast.loading({
            mask: true,
            duration:0,
            message: '加载中...'
        })
        let returnUrl;
        let andCode = encodeURIComponent('&');
        let urlPrefix = encodeURIComponent(window.location.href.split('#')[0]);

        if(this.device == 'ios' || this.device == 'android'){
            returnUrl = `${urlPrefix}#/order/orderDetail?isOpenApp=true${andCode}isSimple=${this.isSimple}${andCode}channel=${getUrlArgs('channel')}`
        }else{
            returnUrl = `${urlPrefix}#/order/orderDetail?isSimple=${this.isSimple}`
            // 为了方便第三方的js统计。需要把他们的参数都拼接进来
            for (const key in this.$route.query) {
                 const element = this.$route.query[key];
                if(key != 'isSimple') {
                    returnUrl = `${returnUrl}${andCode}${key}=${element}`
                }
            }
        };
        let params = {
            consignee:this.userName,
            phone:this.userPhone,
            area:this.area,
            address:this.street,
            orderType:this.postage,
            redirectUrl:returnUrl,
            channelName:getUrlArgs('channel'),  
            code: code,
            paymentType : 3
        };
        if(this.isSimple){
            this.payApi(this.urls.addCardOrderWithoutLogin,params,false)
        }else{
            params.userId = this.userId;
            params.sessionKey = this.sessionKey;
            this.payApi(this.urls.addCardOrder,params,false)
        }

        
    }

}