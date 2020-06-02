<template>
    <div class="orderDetail">
        <section class="topImg">
            <img class="orderTop" :src="orderTop" alt="">
            <img :src="hot"  class="hot animated  headShake ">
            <img :src="send" class="send animated  headShake ">
        </section>
        <section class="vipBox">
            <template v-if="orderState>1">
                <div class="vipBanner" >
                    <div class="vipInfo">
                        <div class="iconBox">
                            <img :src="paySucess" alt="">
                        </div>
                        <p class="fontBig">您已成功领取麒麟卡电子卡 </p>
                        <p class="fontBig mb30">请立即下载app并激活！</p>
                        <div class="info">
                            <p class="fontSmall" style="font-weight:600">麒麟会员：{{userPhone | formatPhone}}（{{userName | formatName}}） </p>
                            <p class="fontSmall">电子卡号：登录app可查看</p>
                            <p class="fontSmall"><span class="letterSpace">激活码</span>：登录app可查看</p>
                        </div>
                    </div>
                </div>
                <div class="timeBox">
                    <!-- <span class="gray">失效时间： </span> -->
                    <van-count-down :time="leftTime" format="mm分ss秒"/>
                    <span class="gray">后电子卡失效，请尽快激活</span>
                </div>
                <div class="downLoad">
                    <button class="downloadBtn" @click="onDownLoad">下载APP并激活，即可首单免费</button>
                    <div class="notice">
                        <p>活动期间，电子卡数量有限，请在10分钟内下载APP激活电子卡，并领取新人0元购福利，否则电子卡可能失效。</p>
                    </div>
                </div>
                <main class="main">
                    <section class="leadActive" >
                        <div class="themeTitle flex align-center">
                            <span class="left" :style="`background:url(${rightLine}) center right no-repeat;background-size:contain;`"></span>
                            <span class="center">麒麟卡激活攻略</span>
                            <span class="right" :style="`background:url(${leftLine}) center left no-repeat;background-size:contain;`"></span>
                        </div>
                        <ul class="leadItem flex justify-between">
                            <li>
                                <img :src="lead1" alt="">
                                <p>1.点击<span class="colorYellow">下载APP </span></p>
                            </li>
                            <van-icon name="arrow" />
                            <li>
                                <img :src="lead2" alt="">
                                <p>2.登录开启<span class="colorYellow">尊享特权</span></p>
                            </li>
                            <van-icon name="arrow" />
                            <li>
                                <img :src="lead3" alt="">
                                <p>3.选择喜欢的商品<span  class="colorYellow">0元购买！</span></p>
                            </li>
                        </ul>
                    </section>
                </main>
            </template>
            <template v-if="orderState == 1">
                <div class="goodInfoBox">
                    <p class="sectionTitle">收货人信息</p>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">姓名</span>
                        <span class="goodValue">{{userName}}</span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">手机号码</span>
                        <span class="goodValue">{{userPhone}} </span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">收货地址</span>
                        <div class="goodValue" style="padding:8px 0;">
                            <p style="line-height:18px">{{area}}</p>
                            <p style="line-height:18px">{{street}}</p>
                        </div>
                    </div>
                    <div class="line van-hairline--bottom"></div>
                    <p class="sectionTitle">商品信息</p>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">麒麟卡</span>
                        <span class="goodValue">￥0 ( 原价：￥{{sourcePrice | formatPrice}} )</span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">邮费</span>
                        <span class="goodValue">{{postage == 1 ? `￥${generalPostagePrice/100}(普通快递，24小时内发货)`: `￥${urgentPostagePrice/100} ( 加急快递，1-2个工作日内发货 )`}}</span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam" >支付方式</span>
                        <span class="goodValue">{{payWay==1?'支付宝支付':'微信支付'}}</span>
                    </div>
                </div>
                <div class="failPay">
                    <template >
                        <div class="imgBox">
                            <img :src="limitActive" alt="">
                        </div>
                        <div class="btnBox flex justify-between">
                            <van-button class="btnLeft" @click="reflush" >我已支付</van-button>
                            <van-button class="btnRight" @click="reflush" >继续支付</van-button>
                        </div>
                    </template>
                </div>
            </template>
        </section>
        <section class="orderDetailInfo" v-if="orderState>1">
            <van-collapse v-model="activeNames" @change="changeFn" >
                <van-collapse-item title="实体卡物流信息" name="1" :value="titleValue" >
                    <div class="addressBox">
                        <div class="address flex justify-center">
                            <div class="iconBox">
                                <img :src="addressIcon" alt="">
                            </div>
                            <div class="textBox">
                                <p class="name">
                                    {{userName}}（{{userPhone}}）
                                </p>
                                <p class="area">
                                    {{area}} {{street}}
                                </p>
                            </div>
                        </div>
                        <div class="goodInfoBox">
                            <p class="sectionTitle">商品信息</p>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">麒麟卡</span>
                                <span class="goodValue">￥0 ( 原价：￥{{sourcePrice | formatPrice}} )</span>
                            </div>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">邮费</span>
                                <span class="goodValue">{{postage == 1 ? `￥${generalPostagePrice/100}(普通快递，24小时内发货)`: `￥${urgentPostagePrice/100}(加急快递，1-2个工作日内发货)`}}</span>
                            </div>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam" >支付方式</span>
                                <span class="goodValue">{{payWay==1?'支付宝支付':'微信支付'}}</span>
                            </div>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">下单时间</span>
                                <span class="goodValue">{{new Date(addTime).Format()}}</span>
                            </div>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">订单号</span>
                                <span class="goodValue">{{orderNo}}</span>
                            </div>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">订单物流状态</span>
                                <span class="goodValue colorYellow">下载app,可看详细物流信息</span>
                            </div>
                            <!-- <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">快递单号</span>
                                <span class="goodValue discountColor" @click="expressTracking">{{deliverNo}}></span>
                            </div>
                            <div class="goodInfo flex align-center justify-between">
                                <span class="goodParam">快递公司</span>
                                <span class="goodValue">{{deliverCompany}}</span>
                            </div> -->
                        </div>
                    </div>
                </van-collapse-item>
            </van-collapse>
            
            
        </section>
        
        <section class="alipayBox">
            <div v-html="alipayHtml"></div>
        </section>
        <div class="recieveTime" v-if="activeNames.length>0">
            <p style="margin-bottom:10px;">会员实体卡预计在24小时内工作日发货，请耐心等待。</p>
            <p>活动期间，实体卡可赠送好友，下载app后激活，一齐享受所有会员省钱特权！卡片发出后不可退货！</p>
           
        </div>
        <!-- 联系客服 -->
		<aside class="service" @click="showServe = true">
			<img :src="payServe" alt="">
		</aside>
        <serve v-model="showServe"></serve>
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    import serve from '@/components/service//customerService';
    import FactoryTool from '@/pages/jyd/beans/base/FactoryTool';
    export default {
        components:{
            mHeader,
            serve,
        },
        data(){
            return{
                userId:'',
                sessionKey:'',
                userName:'',
                userPhone:'',
                area:'',
                street:'',
                postage:1,
                payWay:1,//支付类型。1：支付宝，2：微信
                addressIcon:require('@/assets/images/buy/detailIcon.png'),
                successIcon:require('@/assets/images/buy/successIcon.png'),
                paySucess:require('@/assets/images/order/paySucess.png'),
                paySucessNew:require('@/assets/images/order/paySuccessNew.png'),
                payServe:require('@/assets/images/buy/payServe.png'),
                lead1:require('@/assets/images/v12/lead2.png'),
                lead2:require('@/assets/images/order/lead10_2.png'),
                lead3:require('@/assets/images/order/lead10_3.png'),
                leftLine:require('@/assets/images/order/leftLine.png'),
                rightLine:require('@/assets/images/order/rightLine.png'),
                limitActive:require('@/assets/images/buy/limitActive.png'),
                tips:require('@/assets/images/order/tips.png'),
                orderTop:require('@/assets/images/v12/detailTop.png'),
                hot:require('@/assets/images/order/hot.png'),
                send:require('@/assets/images/order/send.png'),
                sourcePrice:'',//原价
                paymentMoney:'',//支付金额
                activateCardTime:'',//激活卡时间
                orderState:'',//订单状态。1：已下单，待付款，2：已付款，待发货，3：已发货，待激活，4：已激活
                cardNo:'',//会员卡号
                payCardTime:'',//支付卡时间
                addTime:'',//下单时间
                orderNo:'',//订单号
                deliverNo:'',//物流单号
                deliverCompany:'',//物流公司
                deliverCom:'',//物流公司编号
                leftTime:10*1000,
                disabled:false,
                cardOrderId:'',//会员订单id
                alipayHtml:'',//支付宝支付表单内容
                isApp:false,
                device:'',
                showServe:false,
                cardOriginalPrice:'',
                generalPostagePrice:'',
                urgentPostagePrice:'',
                androidDownloadUrl:'',
                iosDownloadUrl:'',
                userAgent:'',
                isSimple:false,
                cardOrder:'',
                userInfo:{},
                factoryTool:null,
                timer:null,
                versionCode:1,
                count:'',
                activeNames: [],
                titleValue:'查看详细',
                leftTime: 10 * 60 * 1000,
            }
        },
        created() {
            this.callGetLandPageByChannelName()
            if(this.$route.query.isSimple){
                this.isSimple = this.$route.query.isSimple;
            }
            if(this.isSimple && this.$ls.get('cardOrder')){
                this.cardOrder = this.$ls.get('cardOrder');
            }
            this.factoryTool = new FactoryTool(getUrlArgs('channel'),this.$route.path);
            
        },
        mounted() {
            
            this.device = getUrlArgs('device');
            this.userAgent = navigator.userAgent;
            this.getCardPrice();
            
            if(this.userAgent.indexOf('fychs') != -1){
                this.isApp = true;
                WxCompat.wxSetTitle = '订单详情'
            }else{
                this.isApp = false;
            }
            this.callDownloadUrl()
            const isOpenApp = this.$route.query.isOpenApp;
            if(this.isSimple){
                this.initOrderStateTimer();
            }else{
                this.userInfo = this.$ls.get('userInfo') || {};
                if(this.$route.query.userId || this.$route.query.sessionKey){
                    this.userId = this.$route.query.userId;
                    this.sessionKey = this.$route.query.sessionKey;
                }else{
                    this.userId = this.userInfo.userId;
                    this.sessionKey = this.userInfo.sessionKey;
                }
                this.getCardInfo().then((data)=>{
                    if(data.orderState > 1 && isOpenApp){
                        //判断是否是从app里提交申请
                        APPTool.openOrderDetailsInApp(this.userId,this.sessionKey);
                        return;
                    }
                })
            }
            
        },
        methods: {
            changeFn(activeNames){
                if(activeNames.length){
                    this.titleValue = '';
                }else{
                    this.titleValue = '查看详细'
                }
            },
            callGetLandPageByChannelName(){
                this.request.post(this.urls.getLandPageByChannelName, {
                    channelName: getUrlArgs('channel')
                },false).then((res) => {
                    var landPage = res.resultData.landPage || {
                        versionCode:1,
                        openType:1,
                        noVersion:true,
                    };
                    if (!isNaN(landPage.versionCode) && landPage.openType == 1) {
                        this.versionCode = landPage.versionCode;
                        this.$store.commit('SET_LANDPAGE',landPage.versionCode)
                    } else {
                        this.$toast('无版本信息');
                    }

                })
            },
            getCardPrice(){
                this.request.post(this.urls.getCardPrice,{},false).then((res)=>{
                    this.cardOriginalPrice = res.resultData.cardOriginalPrice;
                    this.generalPostagePrice = res.resultData.generalPostagePrice;
                    this.urgentPostagePrice = res.resultData.urgentPostagePrice;
                })
            },
            getCardInfo(){
                
                return new Promise((resove,reject)=>{
                    let params = {
                        userId:this.userId,
                        sessionKey:this.sessionKey,
                        platformType:this.platformType,
                    };
                    this.request.post(this.urls.getCardOrderByUserId,params,false).then((res)=>{
                        const resData = res.resultData.cardOrder;
                        this.userName = resData.consignee;
                        this.userPhone = resData.userPhone;
                        this.area = resData.area;
                        this.street = resData.address;
                        this.postage = resData.orderType;
                        this.sourcePrice = resData.sourcePrice;
                        this.paymentMoney = resData.paymentMoney;
                        this.orderState = resData.orderState;
                        this.cardNo = resData.cardNo;
                        this.payCardTime = resData.payCardTime;
                        this.addTime = resData.addTime;
                        this.orderNo = resData.orderNo;
                        this.deliverNo = resData.deliverNo;
                        this.deliverCompany = resData.deliverCompany;
                        this.cardOrderId = resData.cardOrderId;
                        this.payWay = resData.paymentType;
                        this.userInfo = {
                            userId: this.userId,
                            phone: resData.userPhone,
                            realName:resData.consignee,
                        };
                        //关联神策登录
                        STATS_SA.login(this.userInfo);
                        resove(resData)
                    })
                  

                })
            },
            getCardInfoOutLogin(loading = true){
                return new Promise((resove,reject)=>{
                    let params = {};
                    //判断是否是ios支付成功之后唤起的页面
                    if(this.$route.query.isOPenIos|| this.$route.query.cardId){
                        params.cardOrderId = this.$route.query.cardId
                        params.phone = this.$route.query.phone
                    }else{
                        params.cardOrderId=this.cardOrder.cardOrderId
                        params.phone=this.cardOrder.phone
                    }
                    this.request.post(this.urls.getCardOrderWithoutLogin,params,loading).then((res)=>{
                        const resData = res.resultData.cardOrder;
                        this.userName = resData.consignee;
                        this.userPhone = resData.phone;
                        this.area = resData.area;
                        this.street = resData.address;
                        this.postage = resData.orderType;
                        this.sourcePrice = resData.sourcePrice;
                        this.paymentMoney = resData.paymentMoney;
                        this.orderState = resData.orderState;
                        this.cardNo = resData.cardNo;
                        this.payCardTime = resData.payCardTime;
                        this.addTime = resData.addTime;
                        this.orderNo = resData.orderNo;
                        this.cardOrderId = resData.cardOrderId;
                        this.payWay = resData.paymentType;
                        this.userInfo = {
                            userId: resData.userId,
                            phone: resData.phone,
                            realName:resData.consignee,
                        };
                        //关联神策登录
                        STATS_SA.login(this.userInfo);
                        resove(resData)
                    })
                });
            },
            // 定时获取订单状态
            initOrderStateTimer(){
                let count = false
               if((this.orderState == 1 || isNull(this.orderState)) && this.isSimple ) {
                    this.getCardInfoOutLogin(false).then((data)=>{
                        if(data.orderState == 2 && this.$ls.get('paySuccessTag') != 'ok') {
                            STATS_SA.trackPageView('payQiLinSuccess','麒麟卡支付成功');
                            this.factoryTool.addState(FactoryTool.PageEnum.paySuccess);
                            this.$ls.set('paySuccessTag','ok')
                            clearTimeout(this.timer)
                        }
                        else {
                            this.timer = setTimeout(() => {
                                this.initOrderStateTimer()
                            }, 2000);
                        }
                    });
                }   
                else if(this.orderState == 2 && this.$ls.get('paySuccessTag') != 'ok'){
                    STATS_SA.trackPageView('payQiLinSuccess','麒麟卡支付成功');
                    this.factoryTool.addState(FactoryTool.PageEnum.paySuccess);
                    this.$ls.set('paySuccessTag','ok')
                    clearTimeout(this.timer)
                } 
            },
            reflush(){
                STATS_SA.trackClick('toPayContinue','继续支付')
                this.disabled = true;
                if(this.isSimple){
                    this.getCardInfoOutLogin().then((data)=>{
                        if(data.orderState == 1){
                            this.rePayFn();
                        }
                    });
                }else{
                    this.getCardInfo().then((data)=>{
                        if(data.orderState == 1){
                            this.rePayFn();
                        }
                    });
                }
                
            },
            rePayFn(){
                let returnUrl;
                let andCode = encodeURIComponent('&');
                let urlPrefix = encodeURIComponent(window.location.href.split('#')[0]);
                returnUrl = `${urlPrefix}#/order/orderDetail10?isSimple=${this.isSimple}`
                let params = {
                    platformType:this.platformType,//平台类型。1：cms，2：wap，3：iOS，4：android
                    redirectUrl:returnUrl,
                };
                if(this.isSimple){
                    if(this.$route.query.isOPenIos){
                        params.cardOrderId = this.$route.query.cardId
                    }else{
                        params.cardOrderId = this.cardOrder.cardOrderId;
                    }
                    
                    this.payApi(this.urls.payCardOrderWithoutLogin,params)
                }else{
                    params.userId = this.userId;
                    params.sessionKey = this.sessionKey;
                    params.cardOrderId = this.cardOrderId;
                    this.payApi(this.urls.payCardOrder,params)
                }
            },
            //继续支付
            payApi(url,params){
                this.request.post(url,params,true).then((res)=>{
                    if(this.payWay == '2'){
                        window.location.href = res.resultData.mwebUrl;
                    }else if(this.payWay == '1'){
                        this.alipayHtml = res.resultData.form;
                        this.$nextTick(()=>{
                            document.forms[0].submit();
                        })
                    }
                })
               
            },
            finished(){
                this.$refs.countDown.reset();
                this.disabled = false;
            },
            onDownLoad(){
                STATS_SA.trackClick('toDownLoadApp','下载 超惠省app，使用会员特权')
                if(isAndroidClient()){
                    window.location.href = this.androidDownloadUrl;
                }
                else if(isIOSClient()){
                    if(!isNull(this.iosDownloadUrl) && this.iosDownloadUrl.length > 10) {
					    window.location.href = this.iosDownloadUrl;
                    }
                    else {
                        this.$toast('苹果客户端需使用收到的卡片扫码下载')
                    }
                }
                else {
                    this.$toast('请在手机浏览器打开');
                }
            },
            callDownloadUrl() {
                let paramJson = {
                    constantNames:['androidDownloadUrl','iosDownloadUrl'],
                };
                this.request.post(this.urls.getConstantValue,paramJson,false).then((res)=>{
                    this.androidDownloadUrl = res.resultData.androidDownloadUrl;
                    this.iosDownloadUrl = res.resultData.iosDownloadUrl;
                })
                
            },
            //快递查询
            expressTracking(){
                let andCode = encodeURIComponent('&');
                let urlPrefix = encodeURIComponent(`${window.location.href.split('#')[0]}#`);
                let returnUrl = `${urlPrefix}/order/orderDetail10?userId=${this.userId}${andCode}sessionKey=${this.sessionKey}`;
                window.location.href=`https://m.kuaidi100.com/app/query/?nu=${this.deliverNo}&coname=feiyu&callbackurl=${returnUrl}`
            },
            backIndex(){
                this.$router.push({
                    path:'/card/cardSimple',
                    query: {
                        channel:getUrlArgs('channel'),
                        ...this.$route.query
                    }
                })
            }


        },
        computed: {
            platformType(){
                if(this.device == 'ios'){
                    return 3;
                }else if(this.device == 'android'){
                    return 4;
                }else{
                    return 2;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    
    .orderDetail{
        background:$backgroundC;
        min-height:100vh;
        padding-top:vw(20);
        padding-bottom:vw(10);
        .timeBox{
            font-size:vw(14);
            font-weight:500;
            color:#75460A;
            text-align:center;
            margin-bottom:vw(18);
            .van-count-down{
                display:inline-block;
                color:#F73A00;
            }
        }
        .topImg{
            width:100%;
            padding:0 vw(15);
            height:vw(57);
            margin-bottom:.9375rem /* 15/16 */;
            position:relative;
            .orderTop{
                width:100%;
                max-width:100%;
                height:100%;
                max-height:100%;
            }
            .hot{
                width:vw(38);
                height:vw(18);
                position:absolute;
                top:-(vw(8));
                right:vw(100);
                animation-duration: 3s;
                animation-delay: 6s;
                animation-iteration-count: infinite;
                // animation-direction: alternate;

            }
            .send{
                width:vw(45);
                height:vw(18);
                position:absolute;
                top:-(vw(8));
                right:vw(5);
                animation-duration: 3s;
                animation-delay: 7s;
                animation-iteration-count: infinite;
                // animation-direction: alternate;
            }
        }
        .themeTitle{
			width:100%;
            margin-bottom:vw(20);
			.left{
				flex:1;
				height:.875rem /* 14/16 */;
			}
			.center{
				flex:1;
				font-size:vw(14);
				color:#1A1A1A;
				text-align: center;
			}
			.right{
				flex:1;
				height:.875rem /* 14/16 */;
			}
        }
        .colorYellow{
            color:#E3A950;
        }
        .leadActive{
            .leadItem{
                padding:0 vw(10);
                margin-bottom:vw(30);
                .van-icon,.van-icon::before{
                    position: relative;
                    top: 30% !important;
                    color: #ccc;
                }
                li{
                    width:vw(90);
                    img{
                        width:vw(90);
                        height:vw(105);
                    }
                    p{
                        color:#1A1A1A;
                        font-size:vw(12);
                        line-height: vw(18);
                    }
                }
            }

        }
        
        .hadCard{
            text-align: center;
            border-top: 1px solid rgb(223, 221, 221);
            padding-top: 1.25rem /* 20/16 */;
            padding-bottom:.625rem /* 10/16 */;
            color: #666;
            font-size: .875rem /* 14/16 */;
        }
        .vipBox{
            width:vw(345);
            padding:.625rem /* 10/16 */;
            background:#fff;
            margin:vw(0) auto vw(10);
            border-radius:vw(10);
            position: relative;
            &::before{
                content: "";
                border: vw(10) solid transparent;
                border-bottom: vw(10) solid #fff;
                position: absolute;
                top: -(vw(20));
                left: 5%;
            }
            .van-hairline--top::after{
                border-color:#E5E5E5;
            }
            .vipBanner{
                width:100%;
                padding:vw(15) vw(30) 0;
                .iconBox{
                    text-align:center;
                    margin:0 0 vw(18);
                    img{
                        width:4rem /* 64/16 */;
                        height:4rem /* 64/16 */;
                        margin:0 auto;
                    }
                }
                .vipInfo{
                    text-align: center;
                    .info{
                        width:vw(230);
                        height:vw(70);
                        margin:0 auto vw(32);
                        background:url('../../../../assets/images/order/userInfoBg.png') no-repeat;
                        background-size:cover;
                        border-radius:vw(5);
                        padding:vw(10) vw(5) vw(10) vw(35);
                        text-align: left;
                    }
                    .fontSmall{
                        font-size:vw(12);
                        font-weight:400;
                        color:#676767;
                        line-height:vw(18);
                        .letterSpace{
                            letter-spacing: vw(4);
                        }
                    }
                    .fontBig{
                        font-size:vw(18);
                        font-weight:600;
                        color:#1A1A1A;
                        &.mb30{
                            margin-bottom:vw(30);
                        }
                    }
                }
            }
            .downLoad{
                text-align: center;
                .downloadBtn{
                    width:vw(295);
                    height:vw(44);
                    text-align: center;
                    line-height:vw(44);
                    margin:0 auto;
                    background:linear-gradient(0deg,rgba(255,204,128,1),rgba(253,231,183,1));
                    box-shadow:vw(0) vw(4) vw(5) vw(0) rgba(255,220,169,0.7);
                    border-radius: vw(44);
                    font-size:vw(16);
                    color:#75460A;
                    border:none;
                    outline:none;
                    font-weight: 600;
                    animation:pluse  2s  ease-in-out infinite alternate;
                }
                .notice{
                    padding: 0 1.8rem;
                    margin-top:.875rem /* 14/16 */;
                    margin-bottom:1.625rem /* 26/16 */;
                    p{
                        font-size:vw(12);
                        color:#999;
                        font-weight: 400;
                        span{
                            color:#F05F45;
                        }
                    }
                }
                
            }
            .failPay{
                text-align: center;
                padding:vw(10) 0;
                .imgBox{
                    width:100%;
                    height:4.0625rem /* 65/16 */;
                    img{
                        max-width: 100%;
                    }
                }
                .btnBox{
                    position:fixed;
                    bottom:0;
                    left:0;
                    width:100%;
                    height:vw(60);
                    text-align: center;
                    line-height: vw(45);
                    font-size:vw(16);
                    background:#FFF8E8;
                    font-weight: 600;
                    .btnLeft{
                        flex:1;
                        height:vw(60);
                        border:none;
                        color:#75460A;
                        margin:0;
                        background:none;
                    }
                    .btnRight{
                        flex:1;
                        height:100%;
                        background:url('../../../../assets/images/buyBtnBg.png') no-repeat;
                        background-size:100% 100%;
                        color:#75460A;
                        margin:0;
                        border:none;
                        padding-left:vw(40);
                    }
                }
                .van-loading{
                    display:inline;
                    padding-right:.3125rem /* 5/16 */;
                }
                .van-loading__spinner{
                    width:1.5rem /* 24/16 */;
                    height:1.5rem /* 24/16 */;
                }
                .van-count-down{
                    display:inline;
                    color:#ccc;
                }
                .fontSmall{
                    color:#1A1A1A;
                    font-size:.875rem /* 14/16 */;
                }
                .fontBig{
                    color:#1A1A1A;
                    font-size:1rem /* 16/16 */;
                    font-weight: 600;
                    margin-top:1rem;
                }
                
                .van-button{
                    margin:4.375rem /* 70/16 */ auto;
                    width:18.4375rem /* 295/16 */;
                    height:2.75rem /* 44/16 */;
                    line-height:2.75rem /* 44/16 */;
                    background:linear-gradient(0deg,rgba(232,208,164,1),rgba(216,177,138,1));
                    color:#1A1A1A;
                    font-size:1rem /* 16/16 */;
                }
                .van-button--disabled{
                    background:none;
                    border:1px solid rgba(204,204,204,1);
                    color:#ccc;
                }
                .tips{
                    font-size:.875rem /* 14/16 */;
                    color:#1A1A1A;
                }
            }
        }
        .orderDetailInfo{
            width:vw(345);
            background:#fff;
            padding:0 .9375rem /* 15/16 */;
            margin:0 auto;
            border-radius:vw(10);
            /deep/ .van-cell--clickable:active,/deep/ .van-cell--clickable,/deep/.van-cell{
                background:#fff;
                padding:vw(15) 0;
            }
            /deep/ .van-cell:not(:last-child)::after{
                border:none;
            }
            /deep/ .van-cell__right-icon{
                color:#E3A950;
            }
            /deep/ .van-cell__value span{
                color:#E3A950;
            }
            /deep/ .van-collapse-item__content{
                padding: vw(15) 0;
            }
        }
        .addressBox{
            
            .address{
                padding:.625rem /* 10/16 */ 0;
                border-bottom:1px solid #E5E5E5;
                .iconBox{
                    flex:1;
                    img{
                        width:1.125rem /* 18/16 */;
                        height:1.3125rem /* 21/16 */;
                        // margin:0 auto;
                    }
                }
                .textBox{
                    flex:9;
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
                    font-size:.875rem /* 14/16 */;
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
        .goodInfoBox{
            padding-bottom:.625rem /* 10/16 */;
            padding-top:.625rem /* 10/16 */;
            .line{
                width:100%;
                height:1px;
                padding-top:vw(15);
                margin-bottom:vw(10);
            }
            .sectionTitle{
                height:2.5rem /* 40/16 */;
                line-height:2.5rem /* 40/16 */;
                font-size:.875rem /* 14/16 */;
                color:#1A1A1A;
            }
            .goodInfo{
                width:100%;
                height:2.1875rem /* 35/16 */;
                line-height:2.1875rem /* 35/16 */;
                font-size:.875rem /* 14/16 */;
                color:#666;
                .goodParam{
                    flex:3
                }
                .goodValue{
                    flex:6;
                    text-align: right;
                    font-weight: 400;
                }

            }
        }
        .recieveTime{
            height:5.3125rem /* 85/16 */;
            font-size:vw(12);
            color:#999;
            padding-top:.9375rem /* 15/16 */;
            padding-right:vw(15);
            padding-left:vw(25);
            text-align: left;
        }
        .service{
			position:fixed;
			right:0;
			top:13rem;
			width:1.5625rem /* 25/16 */;
			img{
				max-width: 100%;
			}
		}
       
    }
</style>