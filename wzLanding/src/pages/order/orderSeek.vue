<template>
    <div class="orderSeek">
        <!-- <mHeader :title="'订单查询'"></mHeader> -->
        <section class="seekInfo formCss">
            <van-cell-group>
                <van-field class="van-hairline--surround" @blur="inputBlur" v-model="userPhone" placeholder="请输入手机号" />
            </van-cell-group>
            <div class="inputBox van-hairline--surround flex">
                <div class="col65">
                    <van-field class="borderRight" @blur="inputBlur" v-model="imgCode" placeholder="请输入图片验证码"/>
                </div>
                <div class="col35">
                    <div class="box">
                        <img class="imgCode" :src="imgUrl"  alt="" @click="getImgCode">
                    </div>
                </div>
            </div>
            <div class="inputBox van-hairline--surround flex">
                <div class="col65">
                    <van-field class="borderRight" @blur="inputBlur" v-model="verifyCode" center clearable placeholder="请输入短信验证码"/>
                </div>
                <div class="col35">
                    <div class="box">
                        <van-button  slot="button"  size="small" type="primary" :disabled="disabled" @click="getVerifyCode">{{btnText}}</van-button>
                    </div>
                </div>
            </div>
            
            <div class="footerBtn">
                <van-button type="primary" size="large" @click="toSeek" :disabled="!userPhone || !imgCode || !verifyCode">确认查询</van-button>
            </div>
        </section>
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
                userPhone:'',
                imgCode:'',
                verifyCode:'',
                imgUrl:'',
                btnText:'获取验证码',
                disabled:false,
                t:'',
                isApp:false,
                channelName:getUrlArgs('channel'),
                versionCode:'',
            }
        },
        created() {
            this.callGetLandPageByChannelName();
        },
        mounted() {
            this.getImgCode()
            WxCompat.wxSetTitle = '订单查询'

        },
        computed: {
            device(){
                if(getUrlArgs('device')=='ios'){
                    return 3;
                }else if(getUrlArgs('device') == 'android'){
                    return 4;
                }else{
                    return 2;
                }
            }
        },
        methods: {
            callGetLandPageByChannelName(){
                this.request.post(this.urls.getLandPageByChannelName, {
                    channelName: getUrlArgs('channel')
                },false).then((res) => {
                    var landPage = res.resultData.landPage || {
                        versionCode:1,
                        openType:1,
                        noVersion:true,
                    };
                    if(landPage.noVersion) {
                        this.$toast('无版本信息');
                    }
                    if (!isNaN(landPage.versionCode) && landPage.openType == 1) {
                        this.versionCode = landPage.versionCode;
                        this.$store.commit('SET_LANDPAGE',landPage.versionCode)
                    } else {
                        this.$toast('无版本信息');
                    }

                })
            },
            //图形验证码
            getImgCode(){
                this.request.post(this.urls.getImgCode,{},false).then((res)=>{
                    this.imgUrl = res.resultData.imgCode.imgUrl
                    this.imgCodeId = res.resultData.imgCode.imgCodeId
                })
                
            },
            //短信验证码
            getVerifyCode(){
                this.disabled = true
                this.btnText = `60s 后重发`
                let time = 60
                this.t = setInterval(() => {
                    time = --time
                    this.btnText = `${time}s 后重发`
                    if(time == 0) {
                        clearInterval(this.t)
                        this.disabled = false
                        this.btnText = `获取验证码`
                    }
                },1000)
                let params = {
                    phone:this.userPhone,
                    code:this.imgCode,
                    imgCodeId:this.imgCodeId,
                    verifyType:3,//短信验证码类型。1：用户注册，2：用户登陆，3：订单查询，4：激活会员，5：管理员登陆
                };
                this.request.post(this.urls.sendCode,params,true).then(res =>{
                    console.log('获取短信验证码成功')
                }).catch(error=>{
                    clearInterval(this.t)
                    this.disabled = false
                    this.btnText = `获取验证码`
                })
            },

            toSeek(){
                let params = {
                    phone:this.userPhone,
                    code:this.verifyCode,
                    channelName:this.channelName,
                    platformType:this.device,//平台类型。1：cms，2：wap，3：iOS，4：android
                };
                this.request.post(this.urls.getCardOrderByPhone,params,true).then(res=>{
                    let cardInfo = res.resultData.cardOrder;
                    let cardOrder = {
                        cardOrderId:cardInfo.cardOrderId,
                        phone:cardInfo.phone,
                        consignee:cardInfo.consignee,
                        payWay:cardInfo.paymentType,
                    };
                    this.$ls.set('cardOrder',cardOrder);
                    // switch (this.versionCode) {
                    //     case 8 :
                    //         this.$router.push(`/order/orderDetailNew?isSimple=true`);
                    //         break;
                    //     case 9 :
                    //         this.$router.push(`/order/orderDetail9?isSimple=true`);
                    //         break;
                    //     case 10:
                    //         this.$router.push(`/order/orderDetail10?isSimple=true`);
                    //         break;
                    //     default:
                    //         this.$router.push(`/order/orderDetail?isSimple=true`);
                    //         break;
                    // }
                    this.$router.push(`/order/orderDetail10?isSimple=true`);
                    
                })
                
            },
            inputBlur() { //兼容ios固定点位出现的问题
                setTimeout(() => {
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        document.activeElement.scrollIntoViewIfNeeded(true)
                    }
                }, 400)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .seekInfo{
        padding:1.5625rem /* 25/16 */  1.5625rem /* 25/16 */ .9375rem /* 15/16 */;  
        .col35{
            .box{
                padding-top:.4375rem /* 7/16 */;
                padding-right:.625rem /* 10/16 */;
            }
        }
    }
</style>