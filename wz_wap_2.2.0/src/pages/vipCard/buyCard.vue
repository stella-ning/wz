<template>
    <div class="orderDetail">
        <mHeader :title="'订单支付'"></mHeader>
        
        <section class="vipBox">
            
            <div class="vipBanner flex align-center justify-center" :style="`background:url(${topBg}) top center;background-size:cover;`">
                <div class="iconBox">
                    <img :src="successIcon" alt="">
                </div>
                <div class="vipInfo">
                    
                    <p class="fontSmall">会员  {{userName}}（{{userPhone}}）</p>
                    <p class="fontBig">恭喜您！成功锁定尊享名额！</p>
                    
                    <div class="timeBox">
                        <span class="fontSmall">请在 </span>
                        <van-count-down :time="leftTime" format="mm 分 ss 秒"/>
                        <span class="fontSmall">内完成支付</span>
                        
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
                <div class="operate" @click="editAddress">
                    修改
                    <van-icon class="icon" name="arrow" />
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
                        （原价:<del>￥{{cardOriginalPrice | formatPrice}}</del>）
                    </span>
                </div>
            </div>

        </section>
        <section class="postageBox">
            <div class="postage">
                <p class="secTitle">邮费</p>
                <van-radio-group v-model="postage">
                    <van-cell-group>
                        <van-cell  clickable @click="postage = '1'">
                            <span>￥{{generalPostagePrice | formatPrice}}（普通快递，24h内发货）</span>
                            <van-radio slot="right-icon" name="1" checked-color="#D9B38B"/>
                        </van-cell>
                        <!-- <van-cell  clickable @click="postage = '2'">
                            <span>￥{{urgentPostagePrice | formatPrice}}（加急快递，1-2个工作日内发货）</span>
                            <van-radio slot="right-icon" name="2" checked-color="#D9B38B" />
                        </van-cell> -->
                    </van-cell-group>
                </van-radio-group>
            </div>
        </section>
        <section class="payWayBox">
            <div class="payWay">
                <p class="secTitle">请选择支付方式</p>
                <van-radio-group v-model="payWay">
                    <van-cell-group>
                        <van-cell v-if="app_pay_type == 'alipay' || app_pay_type == 'all'"  clickable @click="payWay = 'alipay'">
                            <span class="checkedLabel">
                                <img :src="alipay" alt="">
                                支付宝支付
                            </span>
                            
                            <van-radio slot="right-icon" name="alipay" checked-color="#D9B38B"/>
                        </van-cell>
                        <van-cell v-if="app_pay_type == 'weChat' || app_pay_type == 'all'"  clickable @click="payWay = 'weChat'">
                            <span class="checkedLabel">
                                <img :src="wechat" alt="">
                                微信支付
                            </span>
                            
                            <van-radio slot="right-icon" name="weChat" checked-color="#D9B38B" />
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
                    <van-button  class="buyBtn" @click="appPayFn">立即支付</van-button>
                </div>
            </div>
            <div class="label" :style="`background:url(${specialBg}) 0% 25% no-repeat;background-size:cover`">
                {{new Date(time).Format('MM月dd日')}}后，价格恢复￥{{cardOriginalPrice | formatPrice}}
            </div>
        </footer>
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    export default {
        components:{
            mHeader,
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
            }
        },
        created() {
            this.isSimple = this.$route.query.isSimple;
            this.$nextTick(()=>{
                const userInfo = this.$ls.get('userInfo');
                const address = this.$ls.get('address');
                this.userName = userInfo.realName;
                this.userPhone = userInfo.userPhone;
                this.area = address.area;
                this.area = this.area.replace(/\s+/g,'-');
                this.street = address.addressDetail;
            })
            
        },
        mounted() {
            this.getCardPrice();
            this.device = getUrlArgs('device');
            if(!this.isSimple){
                this.userId = userInfo.userId;
                this.sessionKey = userInfo.sessionKey;
            }
            // 优惠截止时间
            let currentTime = new Date();
		    this.time = currentTime.getTime()+24*60*60*1000;
            
        },
        methods: {
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
                let params = {};
                this.request.post(this.urls.getCardPrice,params,true).then(res=>{
                    this.cardOriginalPrice = res.resultData.cardOriginalPrice;
                    this.generalPostagePrice = res.resultData.generalPostagePrice;
                    this.urgentPostagePrice = res.resultData.urgentPostagePrice;
                }).catch(error=>{
                    console.log(error)
                })
            },
            appPayFn(){
                let returnUrl;
                let andCode = encodeURIComponent('&');
                returnUrl = `/order/orderDetail?isSimple=true&channel=${getUrlArgs('channel')}`;
                let params = {
                    platformType:2,//平台类型。1：cms，2：wap，3：iOS，4：android
                    consignee:this.userName,
                    phone:this.userPhone,
                    area:this.area,
                    address:this.street,
                    paymentType:`${this.payWay=='weChat'?5:4}`,
                    orderType:this.postage,
                    channelName:this.channelName,  
                };
                this.request.post(this.urls.appAddCardOrderWithoutLogin,params,true).then(res=>{
                    let cardInfo = res.resultData.cardOrder;
                    let cardOrder = {
                        cardOrderId:cardInfo.cardOrderId,
                        phone:cardInfo.phone,
                        consignee:cardInfo.consignee,
                        payWay:cardInfo.paymentType,
                    };
                    let payData = {};
                    this.$ls.set('cardOrder',cardOrder);
                    if(this.payWay == 'weChat'){
                        payData.config = res.resultData.config;
                        payData.payType = 1;//微信支付
                    }else if(this.payWay == 'alipay'){
                        payData.orderStr = res.resultData.prepayId;
                        payData.payType = 3;//支付宝支付
                    }
                    let sendData = {
                        payData,
                        success:{
                            path: returnUrl
                        },
                        fail:{
                            path:returnUrl,
                        }
                    }
                    APPTool.addJsCallback(this,'appPay', sendData)
                }).catch(error=>{
                    if(error.resultCode == 17){
                        this.$router.push({
                            path:'/order/orderDetail',
                            query: {
                                cardId:error.resultData.cardOrder.cardOrderId,
                                phone:error.resultData.cardOrder.phone,
                                channel:getUrlArgs('channel'),
                                ...this.$route.query
                            }
                        })
                    }
                })
            },
            payFn(){
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
                    paymentType:`${this.payWay=='weChat'?2:1}`,
                    orderType:this.postage,
                    redirectUrl:returnUrl,
                    channelName:this.channelName,  
                };
                if(this.isSimple){
                    this.payApi(this.urls.addCardOrderWithoutLogin,params)
                }else{
                    params.userId = this.userId;
                    params.sessionKey = this.sessionKey;
                    this.payApi(this.urls.addCardOrder,params)
                }
            },
            payApi(url,params){
                this.request.post(url,params,true).then(res=>{
                    let cardInfo = res.resultData.cardOrder;
                    let cardOrder = {
                        cardOrderId:cardInfo.cardOrderId,
                        phone:cardInfo.phone,
                        consignee:cardInfo.consignee,
                        payWay:cardInfo.paymentType,
                    };
                    this.$ls.set('cardOrder',cardOrder);
                    if(this.payWay == 'weChat'){
                        window.location.href = res.resultData.mwebUrl;
                    }else if(this.payWay == 'alipay'){
                        this.alipayHtml = res.resultData.form;
                        this.$nextTick(()=>{
                            document.forms[0].submit();
                        })
                    }
                }).catch(error=>{
                    if(error.resultCode == 17){
                        this.$router.push({
                            path:'/order/orderDetail',
                            query: {
                                cardId:error.resultData.cardOrder.cardOrderId,
                                phone:error.resultData.cardOrder.phone,
                                channel:getUrlArgs('channel'),
                                ...this.$route.query
                            }
                        })
                    }
                })
                
            }
            
        },
    }
</script>

<style lang="scss" scoped>
    .orderDetail{
        background:$backgroundC;
        min-height:100vh;
        .vipBox{
            width:100%;
            padding:.625rem /* 10/16 */ .9375rem /* 15/16 */;
            .vipBanner{
                width:100%;
                height:5.625rem /* 90/16 */;
                border-radius:.375rem /* 6/16 */;
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
                        color:rgba(26,26,26,1);
                        opacity:0.66;
                        background:linear-gradient(0deg,rgba(173,161,132,1) 0.634765625%, rgba(234,214,185,1) 100%);
                        -webkit-background-clip:text;
                        -webkit-text-fill-color:transparent;
                    }
                    .fontBig{
                        font-size:1rem /* 16/16 */;
                        font-weight:600;
                        color:rgba(26,26,26,1);
                        background:linear-gradient(0deg,rgba(173,161,132,1) 0.634765625%, rgba(234,214,185,1) 100%);
                        -webkit-background-clip:text;
                        -webkit-text-fill-color:transparent;
                        margin-top:.375rem /* 6/16 */;
                    }
                    .timeBox{
                       .van-count-down{
                           display:inline-block;
                           color:rgba(173, 161, 132, 0.8);
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
                    flex:4;
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
        .vipCard{
            width:100%;
            height:2.8125rem /* 45/16 */;
            line-height:2.8125rem /* 45/16 */;
            margin:.625rem /* 10/16 */ 0;
            color:#1A1A1A;
            padding:0 .9375rem /* 15/16 */;
            background:#fff;
            font-size:.875rem /* 14/16 */;
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
            height: 4.0625rem /* 65/16 */;
            line-height: 1.1;
            background:#fff;
            // iphonex 底部适配
            padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
            padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
            .footer{
                padding-left:.875rem /* 14/16 */;
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
                    width:100%;
                    border:none;
                    height:4.0625rem /* 65/16 */;
                    line-height:4.0625rem /* 65/16 */;
                    background:linear-gradient(0deg,rgba(232,208,164,1),rgba(216,177,138,1));
                    color:#000;
                    font-size:1rem /* 16/16 */;
                    border-radius: 0;
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
    }
</style>