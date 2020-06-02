<template>
    <div class="orderDetail">
        <mHeader :title="'确认领卡'"></mHeader>
        <!-- :style="`background:url(${topBg}) top center;background-size:cover;`" -->
        <section class="vipBox"> 
            <div class="vipBanner flex align-center justify-center" >
                <div class="iconBox">
                    <img :src="successIcon" alt="">
                </div>
                <div class="vipInfo">
                    
                    <p class="fontSmall">会员  {{userName}}（{{userPhone}}）</p>
                    <p class="fontBig">恭喜您！成功锁定尊享名额！</p>
                    
                    <div class="timeBox">
                        <span class="gray">请在 </span>
                        <van-count-down :time="leftTime" format="mm 分 ss 秒"/>
                        <span class="gray">内完成支付</span>
                        
                    </div>
                </div>
            </div>
        </section>
        <section class="addressBox">
            <div class="address flex align-center justify-center">
                <div class="iconBox">
                    <img :src="addressIcon" alt="">
                </div>
                <div class="textBox">
                    <p class="name">
                        {{userName}}（{{userPhone}}）
                    </p>
                    <p class="area">
                        {{area}}
                    </p>
                    <p class="street">
                        {{street}}
                    </p>
                </div>
                <!-- @click="editAddress" -->
                <div class="operate" >
                    请确保收货地址正确
                    <!-- <van-icon class="icon" name="arrow" /> -->
                </div>
            </div>
        </section>
        <section class="vipCardBox">
            <div class="vipCard flex align-center justify-between">
                <div class="cardName">
                    麒麟卡
                </div>
                <div class="cardPrice">
                    <span class="newPrice">￥0</span>
                    <span class="oldPrice">
                        （原价:<del>￥{{cardOriginalPrice/100}}</del>）
                    </span>
                </div>
            </div>
            <div class="imgBox" v-if="versionCode == 3 || versionCode == 6">
                <img :src="limitActive" alt="">
            </div>
        </section>
        <section class="vipExclusive" v-if="versionCode !=3 && versionCode != 6">
            <p >我的专属特权</p>
            <div class="exclusive">
                <ul class="flex align-center" >
                    <li>
                        <img :src="selected" alt="">
                        腾讯视频5折起
                    </li>
                    <li>
                        <img :src="selected" alt="">
                        加油直降1.8元/升
                    </li>
                    <li>
                        <img :src="selected" alt="">
                        住酒店低至29元/晚
                    </li>
                    <li>
                        <img :src="selected" alt="">
                        美团外卖8折起
                    </li>
                    <li>
                        <img :src="selected" alt="">
                        首单领高至50元现金
                    </li>
                    <li>
                        <img :src="selected" alt="">
                        大牌好物低至3折
                    </li>
                    <li>
                        <img :src="selected" alt="">
                        会员尊享1元包邮秒杀
                    </li>
                    <li>
                        ......
                    </li>
                </ul>
                
            </div>
        </section>
        <section class="postageBox">
            <div class="postage">
                <p class="secTitle">邮费</p>
                <van-radio-group v-model="postage">
                    <van-cell-group>
                        <van-cell  clickable @click="postage = '1'">
                            <span>￥{{generalPostagePrice | formatPrice}}（普通快递，24小时内发货）</span>
                            <van-radio slot="right-icon" name="1" checked-color="#F5D8B0"/>
                        </van-cell>
                        <!-- <van-cell  clickable @click="postage = '2'">
                            <span>￥{{urgentPostagePrice | formatPrice}}（加急快递，1-2个工作日内发货）</span>
                            <van-radio slot="right-icon" name="2" checked-color="#F5D8B0" />
                        </van-cell> -->
                        <van-cell v-if="versionCode != 3 && versionCode != 6">
                            <span class="lable">限时活动</span>
                            现在办理，可获得<span class="colorRed">0元购</span>额外奖励资格
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </section>
        <section class="payWayBox">
            <div class="payWay">
                <p class="secTitle">请选择支付方式</p>
                <van-radio-group v-model="payWay">
                    <van-cell-group>
                        <van-cell v-if="(app_pay_type == 'alipay' || app_pay_type == 'all') && !isWeixinClient"  clickable @click="payWay = 'alipay'">
                            <span class="checkedLabel">
                                <img :src="alipay" alt="">
                                支付宝支付
                            </span>
                            
                            <van-radio slot="right-icon" name="alipay" checked-color="#F5D8B0"/>
                        </van-cell>
                        <van-cell v-if="(app_pay_type == 'weChat' || app_pay_type == 'all') && !isAlipayClient"  clickable @click="payWay = 'weChat'">
                            <span class="checkedLabel">
                                <img :src="wechat" alt="">
                                微信支付
                            </span>
                            
                            <van-radio slot="right-icon" name="weChat" checked-color="#F5D8B0" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </section>
        <section class="alipayBox">
            <div v-html="alipayHtml"></div>
        </section>
        <footer>
            <div class="footer flex justify-between align-center">
                <div class="left">
                    <div class="leftTop">
                        <span class="vipCardPrice">
                            会员卡价格:￥0
                        </span>
                         <span class="postagePrice">
                            邮费:￥ {{postage == 1? (generalPostagePrice/100) : (urgentPostagePrice/100)}} 
                        </span>
                    </div>
                    <div class="totalPrice">
                        ￥ <strong>{{postage == 1? (generalPostagePrice/100) : (urgentPostagePrice/100)}}</strong>
                    </div>
                   
                </div>
                <div class="right">
                    <van-button  class="buyBtn" @click="payFn" :disabled="isRequest">立即领卡</van-button>
                </div>
            </div>
            <div class="label" :style="`background:url(${specialBg}) 0% 25% no-repeat;background-size:cover`">
                {{new Date(time).Format('MM月dd日')}}后，价格恢复￥{{cardOriginalPrice/100}}
            </div>
        </footer>
        <!-- 二次确认弹窗 -->
        <backLayOut :isPopstate="isPopstate" :continueFn="payFn" btnText="确认支付" persons="15832"></backLayOut>
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    import backLayOut from '@/components/common/backLayOut';
    import FactoryTool from '@/pages/jyd/beans/base/FactoryTool';
    import { setTimeout } from 'timers';
    import { mapState} from "vuex";
    import { log } from 'util';
    export default {
        name:'buyCard',
        components:{
            mHeader,
            backLayOut,
        },
        computed: {
            ...mapState({
                versionCode: state => state.versionCode,
            }),
           
        },
        data(){
            return{
                userId:'',
                sessionKey:'',
                userName:'',
                userPhone:'',
                area:'',
                street:'',
                postage:'1',
                payWay:'weChat',
                alipay:require('@/assets/images/buy/alipay.png'),
                wechat:require('@/assets/images/buy/wechat.png'),
                addressIcon:require('@/assets/images/buy/addressIcon.png'),
                successIcon:require('@/assets/images/buy/successIcon.png'),
                topBg:require('@/assets/images/buy/topBg.png'),
                specialBg:require('@/assets/images/buy/specialBg.png'),
                selected:require('@/assets/images/buy/selected.png'),
                limitActive:require('@/assets/images/buy/limitActive.png'),
                leftTime: 6 * 60 * 1000,
                time:'',
                cardOriginalPrice:'',
                generalPostagePrice:'',
                urgentPostagePrice:'',
                app_pay_type:APP_PAY_TYPE,
                alipayHtml:'',//支付宝支付表单内容
                device:'',
                channelName:getUrlArgs('channel'),
                isSimple:false,
                projectName:projectName,
                factoryTool:null,
                isPopstate:false,//是否点击返回按钮
                code:'',//微信公众支付返回的code
                APPID:'',//微信公众号支付APPID
                isWeixinClient:WxCompat.isWeixinClient(),
                isAlipayClient:WxCompat.isAlipayClient(),
                isRequest:false,
            }
        },
        created() {
            this.initPayWay();
            this.isSimple = this.$route.query.isSimple;
            this.factoryTool = new FactoryTool(getUrlArgs('channel'),this.$route.path);
            const userInfo = this.$ls.get('userInfo');
            const address = this.$ls.get('address');
            if(!userInfo || !address){
                this.$toast('请完善您的收货地址')
                return;
            }
            this.userName = userInfo.realName;
            this.userPhone = userInfo.userPhone;
            this.area = address.area;
            this.area = this.area.replace(/\s+/g,'-');
            this.street = address.addressDetail;
            this.getCardPrice();
            this.device = getUrlArgs('device');
            if(!this.isSimple){
                this.userId = userInfo.userId;
                this.sessionKey = userInfo.sessionKey;
            }
            
        },
       
        destroyed () { 
            let _this = this;
            // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
            window.removeEventListener("popstate", function(e) {
        　　　　_this.isPopstate = true;
        　　}, false);
        },
        mounted() {
            
            // 优惠截止时间
            let currentTime = new Date();
		    this.time = currentTime.getTime()+6*(24*60*60*1000);
            this.back()
            //判断是打包到测试环境还是正式环境
            // if(process.env.VUE_APP_TITLE === 'production'){
            //     this.APPID= 'wx6047adc5d1e679eb'
            // }else{
            //     this.APPID= 'wx4a903a4d536e933e'
            // }
            //判断有code
			if(getUrlArgs('code')) {
				this.code = getUrlArgs('code')
				this.jsApiPay(this.code)
            }
        },
        methods: {
            initPayWay(){
                if(WxCompat.isAlipayClient()&& (this.app_pay_type == 'all' || this.app_pay_type == 'alipay')){
                    this.payWay = 'alipay';
                }
            },
            editAddress(){
                //this.$router.push('/address/editAddress')   
                this.$router.push({
                    path:'/address/editAddress',
                    query: {
                        channel:getUrlArgs('channel'),
                        ...this.$route.query
                    }
                })
            },
            getCardPrice(){
                this.request.post(this.urls.getCardPrice,{},false).then(res=>{
                    this.cardOriginalPrice = res.resultData.cardOriginalPrice;
                    this.generalPostagePrice = res.resultData.generalPostagePrice;
                    this.urgentPostagePrice = res.resultData.urgentPostagePrice;
                    this.APPID = res.resultData.appId;
                }).catch(error=>{
                    console.log(error)
                })
            },
            payFn(){
                // 神策统计
                STATS_SA.trackClick('toPay','确认支付',{
                    phone:this.userPhone,
                    params:JSON.stringify(params)
                })
                this.factoryTool.addState(FactoryTool.PageEnum.payBtnClick);
                this.isRequest = true;
                let returnUrl;
                let andCode = encodeURIComponent('&');
                let urlPrefix = encodeURIComponent(window.location.href.split('#')[0]);
                if(this.device == 'ios' || this.device == 'android'){
                    returnUrl = `${urlPrefix}#/order/orderDetail10?isOpenApp=true${andCode}isSimple=${this.isSimple}${andCode}channel=${getUrlArgs('channel')}`
                }else{
                    returnUrl = `${urlPrefix}#/order/orderDetail10?isSimple=${this.isSimple}`
                    // 为了方便第三方的js统计。需要把他们的参数都拼接进来
                    for (const key in this.$route.query) {
                         const element = this.$route.query[key];
                        //  console.log(key,`:  ${element}`);
                        if(key != 'isSimple') {
                            if(element.includes('&')) {
                                element = encodeURIComponent(element);
                            }
                            returnUrl = `${returnUrl}${andCode}${key}=${element}`
                        }
                    }
                };
                // returnUrl = `${urlPrefix}#/order/orderDetail10?isSimple=${this.isSimple}`
                // // 为了方便第三方的js统计。需要把他们的参数都拼接进来
                // for (const key in this.$route.query) {
                //         const element = this.$route.query[key];
                //     //  console.log(key,`:  ${element}`);
                //     if(key != 'isSimple') {
                //         if(element.includes('&')) {
                //             element = encodeURIComponent(element);
                //         }
                //         returnUrl = `${returnUrl}${andCode}${key}=${element}`
                //     }
                // }
                let params = {
                    consignee:this.userName,
                    phone:this.userPhone,
                    area:this.area,
                    address:this.street,
                    orderType:this.postage,
                    redirectUrl:returnUrl,
                    channelName:this.channelName,  
                    paymentType :`${this.payWay=='weChat'?2:1}`
                };
               
                //判断用户是否有收货地址
                if(!this.userPhone || !this.street || !this.userName || !this.area){
                    this.$toast('请完善您的收货地址！')
                    return;
                }
                //判断是否是微信浏览器打开
                if(WxCompat.isWeixinClient()){
                    this.wxOfficialAccounts()
                    return;
                }else{
                    if(this.isSimple){
                        this.payApi(this.urls.addCardOrderWithoutLogin,params,true)
                    }else{
                        params.userId = this.userId;
                        params.sessionKey = this.sessionKey;
                        this.payApi(this.urls.addCardOrder,params,true)
                    }
                }
               
                
            },
            jsApiPay(code){
                this.$toast.loading({
					mask: true,
					duration:0,
					message: '加载中...'
				})
                let returnUrl;
                let andCode = encodeURIComponent('&');
                let urlPrefix = encodeURIComponent(window.location.href.split('#')[0]);

                if(this.device == 'ios' || this.device == 'android'){
                    returnUrl = `${urlPrefix}#/order/orderDetail10?isOpenApp=true${andCode}isSimple=${this.isSimple}${andCode}channel=${getUrlArgs('channel')}`
                }else{
                    returnUrl = `${urlPrefix}#/order/orderDetail10?isSimple=${this.isSimple}`
                    // 为了方便第三方的js统计。需要把他们的参数都拼接进来
                    for (const key in this.$route.query) {
                         const element = this.$route.query[key];
                        if(key != 'isSimple') {
                            returnUrl = `${returnUrl}${andCode}${key}=${encodeURIComponent(element)}`
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
                    channelName:this.channelName,  
                    code: this.code,
                    paymentType : 3
                };
                if(this.isSimple){
                    this.payApi(this.urls.addCardOrderWithoutLogin,params,false)
                }else{
                    params.userId = this.userId;
                    params.sessionKey = this.sessionKey;
                    this.payApi(this.urls.addCardOrder,params,false)
                }

                
            },
            wxOfficialAccounts() {
                //微信授权
                let URL;
                let andCode = encodeURIComponent('&');
                let urlPrefix = window.location.href.split('#')[0];
                // URL = encodeURIComponent(`${urlPrefix}#/card/buyCard?isSimple=${this.isSimple}&channel=${getUrlArgs('channel')}&time=${new Date().getTime()}`)
                URL = encodeURIComponent(`${urlPrefix}#/card/buyCard?isSimple=${this.isSimple}&time=${new Date().getTime()}`)
                // 为了方便第三方的js统计。需要把他们的参数都拼接进来
                for (const key in this.$route.query) {
                        const element = this.$route.query[key];
                    if(key != 'isSimple') {
                        URL = `${URL}${andCode}${key}=${encodeURIComponent(element)}`
                    }
                }
                let returnUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${URL}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
                
                window.location.href = returnUrl
                return;
            },
            payApi(url,params,loading){
                this.request.post(url,params,loading).then(res=>{
                    let cardInfo = res.resultData.cardOrder;
                    let cardOrder = {
                        cardOrderId:cardInfo.cardOrderId,
                        phone:cardInfo.phone,
                        consignee:cardInfo.consignee,
                        payWay:cardInfo.paymentType,
                    };
                    this.$ls.set('cardOrder',cardOrder);
                    if(this.payWay == 'weChat'){
                        //判断是否是微信浏览器打开
                        if(WxCompat.isWeixinClient()){
                            let config = res.resultData.config
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
                        }else{
                            window.location.href = res.resultData.mwebUrl;
                        }
                        
                    }else if(this.payWay == 'alipay'){
                        this.alipayHtml = res.resultData.form;
                        this.$nextTick(()=>{
                            document.forms[0].submit();
                        })
                    }
                    setTimeout(()=>{
                        this.isRequest = false;
                    },1000)
                }).catch(error=>{
                    this.$toast.clear()
                    if(error.resultCode == 17){
                        this.$router.push({
                            path:`/order/orderDetail10?isSimple=${this.isSimple}`,
                            query: {
                                cardId:error.resultData.cardOrder.cardOrderId,
                                phone:error.resultData.cardOrder.phone,
                                channel:getUrlArgs('channel'),
                                ...this.$route.query
                            }
                        })
                    }
                })
                setTimeout(()=>{
                    this.isRequest = false;
                },1000)
                
            },
            //发起支付
			onBridgeReady(data){
                let returnUrl;
                let andCode = encodeURIComponent('&');
                let urlPrefix =window.location.href.split('#')[0];
                returnUrl = `${urlPrefix}#/order/orderDetail10?isSimple=${this.isSimple}`
                // 为了方便第三方的js统计。需要把他们的参数都拼接进来
                for (const key in this.$route.query) {
                        const element = this.$route.query[key];
                    if(key != 'isSimple') {
                        returnUrl = `${returnUrl}&${key}=${encodeURIComponent(element)}`
                    }
                }
				WeixinJSBridge.invoke(
				'getBrandWCPayRequest', data,
				res => {
					if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        this.$toast.success('支付成功');
                        setTimeout(()=>{
                            window.location.href = returnUrl;
                        },500)
                        
					} else if(res.err_msg == "get_brand_wcpay_request:fail") {
                        this.$toast.fail('支付失败，请重试');
					}
				})
			},
            back() {
                let _this = this;
                if (window.history && window.history.pushState) {
                    // 向历史记录中插入了当前页
                    history.pushState(null, null, document.URL);
                    window.addEventListener("popstate", function(e) {
                　　　　_this.isPopstate = true;
                　　}, false);
                }
                
                
            },
            goBack(){
                this.$router.go(-1)
            }
            
        },
    }
</script>

<style lang="scss" scoped>
    .orderDetail{
        background:$backgroundC;
        min-height:100vh;
        padding-bottom:4.0625rem /* 65/16 */;
        .imgBox{
            width:100%;
            height:vw(80);
            margin-top:.625rem /* 10/16 */;
            padding-bottom:1.25rem /* 20/16 */;
            img{
                max-width: 100%;
            }
        }
        .vipBox{
            width:100%;
            padding:.625rem /* 10/16 */ .9375rem /* 15/16 */;
            .vipBanner{
                width:100%;
                height:5.625rem /* 90/16 */;
                border-radius:.375rem /* 6/16 */;
                background: #fad6a9;
                .iconBox{
                    flex:1;
                    text-align:center;
                    img{
                        width:2rem /* 32/16 */;
                        height:2rem /* 32/16 */;
                        margin:0 auto;
                    }
                }
                .vipInfo{
                    flex:4;
                    .fontSmall{
                        font-size:.875rem /* 14/16 */;
                        font-weight:400;
                        color:#BC8D5D;
                        // background:linear-gradient(0deg,rgba(173,161,132,1) 0.634765625%, rgba(234,214,185,1) 100%);
                        // -webkit-background-clip:text;
                        // -webkit-text-fill-color:transparent;
                    }
                    .fontBig{
                        font-size:1rem /* 16/16 */;
                        font-weight:600;
                        color:#282828;
                        // background:linear-gradient(0deg,rgba(173,161,132,1) 0.634765625%, rgba(234,214,185,1) 100%);
                        // -webkit-background-clip:text;
                        // -webkit-text-fill-color:transparent;
                        margin-top:.375rem /* 6/16 */;
                    }
                    .timeBox{
                        font-size:.875rem /* 14/16 */;
                        font-weight:400;
                        color:#705942;
                        .van-count-down{
                            display:inline-block;
                            color:#705942;
                        }
                    }
                }
            }
        }
        .addressBox{
            width:100%;
            background:#fff;
            .address{
                padding:.625rem /* 10/16 */ 0;
                .iconBox{
                    flex:1;
                    text-align: center;
                    img{
                        width:1.125rem /* 18/16 */;
                        height:1.3125rem /* 21/16 */;
                        margin:0 auto;
                    }
                }
                .textBox{
                    flex:2;
                    .name{
                        font-size:.875rem /* 14/16 */;
                        color:#1A1A1A;
                        margin-bottom:.5rem /* 8/16 */;
                    }
                    .area,.street{
                        font-size:.75rem /* 12/16 */;
                        color:#999;
                    }
                }
                .operate{
                    flex:1.5;
                    text-align: center;
                    font-size:vw(10);
                    color:#C89560;
                    .van-icon-arrow{
                        color:#1A1A1A;
                        font-size:.875rem /* 14/16 */;
                        vertical-align: middle;
                        top:-.0625rem /* 1/16 */;
                    }
                }
            }
            
        }
        .vipCardBox{
            width:100%;
            margin-top:.625rem /* 10/16 */;
            padding:0 .9375rem /* 15/16 */;
            background:#fff;
        }
        .vipCard{
            height:2.8125rem /* 45/16 */;
            line-height:2.8125rem /* 45/16 */;
            color:#1A1A1A;
            background:#fff;
            font-size:.875rem /* 14/16 */;
            border-bottom:1px solid #E5E5E5;
        }
        .vipExclusive{
            width:100%;
            background:#fff;
            margin-bottom:.625rem /* 10/16 */;
            padding:0 .9375rem /* 15/16 */;
            p{
                padding-top:.625rem /* 10/16 */;
                line-height:2.8125rem /* 45/16 */;
                color:#1A1A1A;
                font-size:.9375rem /* 15/16 */;
            }
            ul{
                width:100%;
				flex-flow: row wrap;
                li{
                    width:50%;
                    margin-bottom:.625rem /* 10/16 */;
                    img{
                        display:inline-block;
                        width:1rem /* 16/16 */;
                        height:1rem;
                        max-width: 100%;
                        max-height: 100%;

                    }
                }
            }
        }
        .postageBox,.payWayBox{
            width:100%;
            background:#fff;
            padding:0 .9375rem /* 15/16 */;
            .secTitle{
                height:2.8125rem /* 45/16 */;
                line-height:2.8125rem /* 45/16 */;
                font-size:.75rem /* 12/16 */;
                color:#666;
            }
            .lable{
                padding:.3125rem /* 5/16 */ .5rem /* 8/16 */;
                background:linear-gradient(90deg,rgba(240,90,67,1) 0%,rgba(242,163,102,1) 100%);
                color:#fff;
                font-size:.875rem /* 14/16 */;
                border-radius:.1875rem /* 3/16 */;
                margin-right:.3125rem /* 5/16 */;
            }
            .van-cell{
                padding:.625rem /* 10/16 */ 0;
            }
            .van-cell:not(:last-child)::after{
                left:0;
            }
        }
        .payWayBox{
            margin-top:.625rem /* 10/16 */;
            margin-bottom:1.25rem /* 20/16 */;
            .van-icon-alipay{
                color:#00A9EE;
                padding-right:.625rem /* 10/16 */;
                font-size:1.25rem /* 20/16 */;
                top:.3125rem /* 5/16 */;
            }
            .van-icon-wechat{
                color:#66C74C;
                padding-right:.625rem /* 10/16 */;
                font-size:1.25rem /* 20/16 */;
                top:.3125rem /* 5/16 */;
            }
        }
        .checkedLabel{
            img{
                display:inline-block;
                width:1.25rem /* 20/16 */;
                height:1.25rem /* 20/16 */;
                vertical-align: middle;
                margin-right:.625rem /* 10/16 */;
            }
        }
        footer{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 3.75rem /* 60/16 */;
            line-height: 1.1;
            background:#fff;
            // iphonex 底部适配
            padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
            padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
            .footer{
                padding-left:.875rem /* 14/16 */;
                height:3.75rem /* 60/16 */;
                .left{
                    flex:1.5;
                }
                .right{
                    flex:1;
                }
                .leftTop{
                    padding-bottom:.25rem /* 4/16 */;
                }
                .postagePrice{
                    color:#4D4D4D;
                    font-size:.75rem /* 12/16 */;
                }
                .totalPrice{
                    color:#EF2205;
                        strong{
                            font-size:1.75rem /* 28/16 */;
                            font-weight: 600;
                        }
                }
                .vipCardPrice{
                    font-size:.75rem /* 12/16 */;
                    font-weight: 400;
                    color:#4D4D4D;
                    text-align: center;
                    padding-right:1.875rem /* 30/16 */;
                }
                .buyBtn{
                    width:90%;
                    border:none;
                    height:2.8125rem /* 45/16 */;
                    line-height:2.8125rem /* 45/16 */;
                    background:linear-gradient(-90deg,rgba(252,201,155,1),rgba(255,223,185,1));
                    color:#000;
                    font-size:1rem /* 16/16 */;
                    border-radius: 2.8125rem /* 45/16 */;
                }
            }
            .label{
                position:absolute;
                left:.625rem /* 10/16 */;
                top:-.9375rem /* 15/16 */;
                padding:.1875rem /* 3/16 */ .625rem /* 10/16 */;
                font-size:.75rem /* 12/16 */;
                color:#fff;
                width:12.1875rem /* 195/16 */;
                height:1.5rem /* 24/16 */;
            }
        }
        .colorRed{
            color:#EC513D
        }
      
    }
</style>