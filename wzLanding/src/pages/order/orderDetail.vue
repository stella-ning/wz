<template>
    <div class="orderDetail">
        <mHeader :title="'订单详情'"></mHeader>
        <section class="vipBox van-hairline--top">
            <template v-if="orderState>1">
                <div class="vipBanner" >
                    <div class="vipInfo">
                        <div class="iconBox">
                            <img :src="paySucess" alt="">
                        </div>
                        <p class="fontBig">您已激活麒麟特权</p>
                        <p class="fontSmall">{{userName}}（{{userPhone}}），<span style="color:#D7965C">请留意短信进行激活！</span></p>
                    </div>
                </div>
                <div class="downLoad">
                    <button class="downloadBtn" @click="onDownLoad">下载APP，激活会员</button>
                    <div class="notice" v-if="versionCode != 6 && versionCode != 7">
                        <p>受疫情防控影响，您的麒麟卡配送可能存在延迟。疫情期间超惠省联系了厂家给大家准备了消毒物资，购买路径：下载app-0元购</p>
                    </div>
                </div>
                <div class="hadCard" @click="backIndex" v-if="versionCode != 6 && versionCode != 7">
                    返回首页 >>
                </div>
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
                    <p class="sectionTitle">商品信息</p>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">麒麟卡</span>
                        <span class="goodValue">￥0 ( 原价：￥{{sourcePrice | formatPrice}} )</span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">邮费</span>
                        <span class="goodValue">{{postage == 1 ? `￥${generalPostagePrice/100} (普通快递，24小时内发货 )`: `￥${urgentPostagePrice/100} ( 加急快递，1-2个工作日内发货 )`}}</span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam" >支付方式</span>
                        <span class="goodValue">{{payWay==1?'支付宝支付':'微信支付'}}</span>
                    </div>
                </div>
                <div class="failPay">
                    <template v-if="versionCode == 6 ||  versionCode == 7">
                        <div class="imgBox">
                            <img :src="limitActive" alt="">
                        </div>
                        <div class="btnBox flex justify-between">
                            <van-button class="btnLeft" @click="reflush" >我已支付</van-button>
                            <van-button class="btnRight" @click="reflush" >继续支付</van-button>
                        </div>
                    </template>
                    <template v-else>
                        <p class="fontSmall">{{userName}}（{{userPhone}}）</p>
                        <p class="fontBig">
                            <van-loading type="spinner" />
                            正在支付中，请稍后...
                            <!-- 支付失败 -->
                        </p>
                        <van-button round plain class="reflush" @click="reflush" :disabled="disabled">
                            刷新支付情况
                            <!-- 继续支付 -->
                            <span v-show="disabled">
                                （<van-count-down ref="countDown" :time="leftTime"  :auto-start="false" @finish="finished" format="ss s"/>）
                            </span>
                        </van-button>
                        <p class="tips">
                            若多次刷新无反应，请电话联系客服。
                        </p>
                    </template>

                    
                </div>
            </template>
            
        </section>
        <main class="main"  v-if="orderState>1">
            <section class="leadActive" v-if="versionCode == 6 || versionCode == 7">
                <div class="themeTitle flex align-center">
					<span class="left" :style="`background:url(${rightLine}) center right no-repeat;background-size:contain;`"></span>
					<span class="center">麒麟卡使用攻略</span>
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
                        <p>2.登录时选择    </p>
                        <p>“<span class="colorYellow">激活麒麟卡</span>”</p>
                    </li>
                    <van-icon name="arrow" />
                    <li>
                        <img :src="lead3" alt="">
                        <p>3.输入短信送达    </p>
                        <p>的会员卡激活</p>
                    </li>
                </ul>
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
                        <span class="goodValue">{{postage == 1 ? `￥${generalPostagePrice/100} (普通快递，24小时内发货 )`: `￥${urgentPostagePrice/100} ( 加急快递，1-2个工作日内发货 )`}}</span>
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
                        <span class="goodParam">订单状态</span>
                        <span v-if="orderState>1" class="goodValue ">{{orderState>=2 && orderState<4 ?'物流配送中':'已收货'}}</span>
                        <span v-else class="goodValue ">待付款</span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">物流或快递单号</span>
                        <span class="goodValue discountColor" @click="expressTracking">{{deliverNo}}></span>
                    </div>
                    <div class="goodInfo flex align-center justify-between">
                        <span class="goodParam">物流或快递公司</span>
                        <span class="goodValue">{{deliverCompany}}</span>
                    </div>
                </div>
            </section>
        </main>
        
        <section class="alipayBox">
            <div v-html="alipayHtml"></div>
        </section>
        <div class="recieveTime">
            会员卡预计在{{postage == 1?'24小时':'1-2'}}内发货，请耐心等待。
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
                paySucess:require('@/assets/images/order/paySuccessNew.png'),
                payServe:require('@/assets/images/buy/payServe.png'),
                lead1:require('@/assets/images/order/lead1.png'),
                lead2:require('@/assets/images/order/lead2.png'),
                lead3:require('@/assets/images/order/lead3.png'),
                leftLine:require('@/assets/images/order/leftLine.png'),
                rightLine:require('@/assets/images/order/rightLine.png'),
                limitActive:require('@/assets/images/buy/limitActive.png'),
                tips:require('@/assets/images/order/tips.png'),
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
            //判断是否是免登录
            //激活页面：(this.isSimple && (this.$route.query.userId || this.$route.query.sessionKey)) 
            //唤起app详情页:(this.isSimple && this.$route.query.cardId)
            //订单查询：(this.isSimple && isOpenApp)
            if(this.isSimple){
                // this.getCardInfoOutLogin().then((data)=>{
                //     if(data.orderState > 1 && isOpenApp || (data.orderState > 1 &&this.$route.query.cardId)){
                //         //判断是否是从app里提交申请
                //         APPTool.openOrderDetailsInApp(this.cardOrder.cardOrderId,this.cardOrder.phone,true);
                //         return;
                //     }
                // })
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
            callGetLandPageByChannelName(){
                this.request.post(this.urls.getLandPageByChannelName, {
                    channelName: getUrlArgs('channel') || this.$route.query.channel
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
                if(this.versionCode !=6 && this.versionCode !=7){
                    this.$refs.countDown.start();
                }
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
                // if(this.$route.query.isOpenApp){
                //     returnUrl = `${urlPrefix}#/order/orderDetail?isOpenApp=true${andCode}isSimple=${this.isSimple}`
                // }else{
                //     returnUrl = `${urlPrefix}#/order/orderDetail?isSimple=${this.isSimple}`
                // };
                returnUrl = `${urlPrefix}#/order/orderDetail?isSimple=${this.isSimple}`
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
                let returnUrl = `${urlPrefix}/order/orderDetail?userId=${this.userId}${andCode}sessionKey=${this.sessionKey}`;
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
        .themeTitle{
			width:100%;
            margin-top:vw(30);
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
            color:#D8975C;
        }
        .leadActive{
            .leadItem{
                padding:0 vw(30);
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
            width:100%;
            padding:.625rem /* 10/16 */;
            background:#fff;
            margin-bottom:.625rem /* 10/16 */;
            .van-hairline--top::after{
                border-color:#E5E5E5;
            }
            .vipBanner{
                width:100%;
                padding-top:vw(15);
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
                    .fontSmall{
                        font-size:.875rem /* 14/16 */;
                        font-weight:400;
                        color:#999;
                        margin-bottom:vw(40);
                    }
                    .fontBig{
                        font-size:1rem /* 16/16 */;
                        font-weight:600;
                        color:#1A1A1A;
                        margin-bottom:vw(20); 
                    }
                }
            }
            .downLoad{
                padding-bottom:1.25rem /* 20/16 */;
                text-align: center;
                .downloadBtn{
                    width:17.8125rem /* 285/16 */;
                    height:2.75rem /* 44/16 */;
                    text-align: center;
                    line-height:2.75rem /* 44/16 */;
                    margin:0 auto;
                    background:linear-gradient(0deg,rgba(252,201,155,1),rgba(255,223,185,1));
                    border-radius: 2.75rem /* 44/16 */;
                    font-size:1rem;
                    color:#1A1A1A;
                    border:none;
                    outline:none;
                }
                .notice{
                    padding: 0 1rem;
                    margin-top:.875rem /* 14/16 */;
                    margin-bottom:1.625rem /* 26/16 */;
                    p{
                        font-size:.875rem /* 14/16 */;
                        color:#999;
                        font-weight: 400;
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
                    padding:vw(50) vw(10);
                    height:vw(45);
                    text-align: center;
                    line-height: vw(45);
                    
                    font-size:vw(16);
                    .btnLeft{
                        width:vw(125);
                        height:vw(45);
                        border:1px solid #FFBD82;
                        color:#FFBD82;
                        border-radius: vw(45);
                        margin:0;
                        background:none;
                    }
                    .btnRight{
                        width:vw(195);
                        height:vw(45);
                        background:linear-gradient(-90deg,rgba(252,201,155,1),rgba(255,223,185,1));
                        color:#1A1A1A;
                        border-radius: vw(45);
                        margin:0;
                        border:none;
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
        .addressBox{
            width:100%;
            background:#fff;
            padding:0 .9375rem /* 15/16 */;
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
                    flex:2.5
                }
                .goodValue{
                    flex:6;
                    text-align: right;
                    font-weight: 400;
                    color:#1A1A1A;
                }

            }
        }
        .recieveTime{
            height:5.3125rem /* 85/16 */;
            font-size:.875rem /* 14/16 */;
            color:#999;
            padding-top:.9375rem /* 15/16 */;
            padding-left:.9375rem /* 15/16 */;
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