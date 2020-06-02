<template>
	<div>
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
		<section class="alipayBox">
            <div v-html="alipayHtml"></div>
        </section>
		<!-- 公众号 officialAccounts -->

	</div>
  
</template>

<script>  
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
				payWay:'weChat',
				alipay:require('@/assets/images/buy/alipay.png'),
				wechat:require('@/assets/images/buy/wechat.png'),
				app_pay_type:APP_PAY_TYPE,
                alipayHtml:'',//支付宝支付表单内容
			}
		},

		computed: {
			user() {
				return this.$store.state.user
			}
		},

		mounted() {
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
               
                // 神策统计
                STATS_SA.trackClick('toPay','确认支付',{
                    phone:this.userPhone,
                    params:JSON.stringify(params)
                })
                this.factoryTool.addState(FactoryTool.PageEnum.payBtnClick);
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
                URL = encodeURIComponent(`${urlPrefix}#/card/buyCard?isSimple=${this.isSimple}&channel=${getUrlArgs('channel')}&time=${new Date().getTime()}`)
                let returnUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a903a4d536e933e&redirect_uri=${URL}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
                
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
	.payWayBox{
		.van-cell{
			padding:.625rem /* 10/16 */ 0;
		}
		.van-cell:not(:last-child)::after{
			left:0;
		}
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
</style>