<template>
    <div class="addressForm">
        <template v-if="showAreaList && !isEdit">
            <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel" :value='address.code' />
        </template>
        <template v-else>
            <!-- <div class="closeBox" @click="goBackFn">
                <van-icon name="close" />
            </div> -->
            <div class="templateBox">
                <section class="vipBox" v-if="!isEdit && !isSimple">
                    <div class="vipBanner flex align-center justify-center" :style="`background:url(${topBg}) top center;background-size:cover;`">
                        <div class="iconBox">
                            <img :src="successIcon" alt="">
                        </div>
                        <div class="vipInfo">
                            <p class="fontBig">{{username}}，恭喜您获得卡片名额！</p>
                            <p class="fontSmall">名额账号：{{phone}} </p>
                        
                        </div>
                    </div>
                </section>
                <p class="title">尊享名额仅剩：4%</p>
                <div class="processe">
                    <img :src="process" alt="">
                </div>
            
                <p class="subTitle">填写收货信息，领取卡片</p>
                <!-- class="van-hairline--surround" -->
                <div class="infoInput">
                    <van-cell-group>
                        <van-field
                            v-model="username"
                            @blur="inputBlur"
                            label="收件人"
                            placeholder="请输入收件人"
                            :disabled="!isSimple"
                        />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                            type='number'
                            maxlength = '11'
                            @blur="inputBlur"
                            v-model="phone"
                            label="手机号"
                            placeholder="请输入手机号"
                            :disabled="!isSimple"
                        />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                            class="checkedAddress"
                            v-model="address.area"
                            label="地区"
                            placeholder="请选择地区（省-市-县）"
                            disabled
                            @click="showArea"
                        />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                            v-model="address.addressDetail"
                            @blur="inputBlur"
                            rows="2"
                            autosize
                            label="详细地址"
                            type="textarea"
                            maxlength="50"
                            placeholder="详细地址"
                            show-word-limit
                        />
                    </van-cell-group>
                
                </div>
            </div>
            <div class="footerBtn flex align-center footerFixed" >
                <div class="left van-hairline--top">
                    <p>
                        总金额：<del>￥299</del>
                    </p>
                    <div> <span class="nowPrice">￥<b>0</b></span></div>
                </div>
                <div class="right">
                    <van-button class="submitBtn"  @click="onSubmit" :disabled="!username || !phone || !address.area || !address.addressDetail" :loading='btnLoading' >提交申请</van-button>
                </div>
            </div>
        </template>
        
        <van-popup v-model="isShowArea" position="bottom" 
            round lock-scroll :close-on-click-overlay='false'
            :style="{ 'width': '100%'}"
        >
           <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
        </van-popup>
    </div>
</template>

<script>
    import { areaList } from '@/utils/unit';
    export default {
        name:'addressForm',
         props:{
            isEdit:{
                default:()=>{
                    return true;
                }
            },
        },
        data(){
            return{
                username:'',
                phone:'',
                areaList:areaList,
                address:{
                    area:'',
                    addressDetail:'',
                    code:'',
                },
                userInfo:{
                    realName:'',
                    userPhone:'',
                },
                isShowArea:false,
                showAreaList:false,
                isSimple:false,
                topBg:require('@/assets/images/buy/topBg.png'),
                goBack:require('@/assets/images/goBack.png'),
                successIcon:require('@/assets/images/buy/successIcon.png'),
                process:require('@/assets/images/process.png'),
                btnLoading:false,
                iosPaymentMode:null,
            }
        },
        created() {
            this.isSimple = this.$route.query.isSimple;
            if(isAndroidClient()){
                APPTool.addJsCallback(this,'cancelRefresh',{cancelRefresh:true});
            }
        },
        mounted() {
            const userInfo = this.$ls.get('userInfo');
            if(userInfo){
                this.username = userInfo.realName;
                this.phone = userInfo.userPhone;
            }
            this.callIosPaymentMode()
            
        },
        methods:{
            onConfirm(content){
                if(this.isEdit){
                    this.isShowArea = false;
                }else{
                    this.showAreaList = false;
                }
                console.info(content)
                this.address.area = '';
                content.map((item,key)=>{
                    if(key == content.length-1){
                        this.address.area += `${item.name}`
                        this.address.code = item.code
                    }else{
                        this.address.area += `${item.name} `
                    }
                })
            },
            onCancel(){
                if(this.isEdit){
                    this.isShowArea = false;
                }else{
                    this.showAreaList = false;
                }
            },
            onSubmit(){
                if(!checkPhoneMob(this.phone)){
                    this.$toast('请输入正确的手机号')
                    this.phone = ''
                    return;
                }
                this.$ls.set('address',this.address)
                this.userInfo.realName = this.username;
                this.userInfo.userPhone = this.phone;
                this.$ls.set('userInfo',this.userInfo);  
                this.btnLoading = true;
                STATS_SA.trackClick('applyAddressInfo','提交申请')
                setTimeout(()=>{
                    this.btnLoading = false;
                    // if(this.iosPaymentMode == 2  && isIOSClient()){
                    //     this.$router.push({
                    //         path:'/pay/iosPayment',
                    //         query: {
                    //             isSimple:true,
                    //             channel:getUrlArgs('channel'),
                    //         }
                    //     })
                    //     return;
                    // }else{
                    //     this.$router.push({
                    //         path:'/card/buyCard',
                    //         query: {
                    //             isSimple:true,
                    //             channel:getUrlArgs('channel'),
                    //         }
                    //     })
                    // }
                    this.$router.push({
                        path:'/card/buyCard',
                        query: {
                            isSimple:true,
                            channel:getUrlArgs('channel'),
                        }
                    })
                    
                },800)
                
            },
            goBackFn(){
                this.$router.go(-1)
            },
            inputBlur() { //兼容ios固定点位出现的问题
                setTimeout(() => {
                    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                        document.activeElement.scrollIntoViewIfNeeded(true)
                    }
                }, 400)
            },
            showArea(){
                if(this.isEdit){
                    this.isShowArea = true
                }else{
                    this.showAreaList = true;
                }
            },
            callIosPaymentMode(){
                let paramJson = {
                    constantNames:['iosPaymentMode'],
                };
                this.request.post(this.urls.getConstantValue,paramJson,false).then((res)=>{
                    this.iosPaymentMode = res.resultData.iosPaymentMode;
                    
                })
            },
        },
        computed: {
            
           
        },
    }
</script>

<style lang="scss" scoped>
    .addressForm{
        .templateBox{
            padding: 0 1.25rem /* 20/16 */ 4.6875rem /* 75/16 */;
            background:#fff;
            border-radius: 12px 12px 0 0;
        }
        .closeBox{
            height:3.125rem /* 50/16 */;
            line-height:3.125rem /* 50/16 */;
            text-align: right;
            .van-icon{
                color: #fff;
                font-size: 2rem /* 32/16 */;
                padding-right:.9375rem /* 15/16 */;
            }
        }
        .topBar{
            height:3.125rem /* 50/16 */;
            padding-top:.625rem /* 10/16 */;
            .imgBox{
                img{
                    width:1.875rem /* 30/16 */;
                }
            }
        }
        .processe{
            width:100%;
            padding: 0 .9375rem /* 15/16 */;
            margin-bottom:1.5625rem /* 25/16 */;
            img{
                max-width: 100%;
            }
        }
        .infoInput{
            padding-left:.9375rem /* 15/16 */;
            padding-right:.625rem /* 10/16 */;
        }
        .van-cell-group{
            margin-bottom:.9375rem /* 15/16 */;
            width:100%;
        }
        .van-cell{
           border:.0625rem /* 1/16 */ solid #ccc; 
        }
        .checkedAddress {
            /deep/.van-field__control:disabled{
                color:#1A1A1A;
            }
        }
        /deep/.van-field__control{
            color:#1A1A1A;
        }
        /deep/.van-loading__spinner{
            color:#fff !important;
        }
        .title,.subTitle{
            padding-left:.9375rem /* 15/16 */;
            height:3.125rem /* 50/16 */;
            line-height:3.125rem /* 50/16 */;
        }
        
        .van-progress{
            height:.9375rem /* 15/16 */;
        }
        .vipBox{
            width:100%;
            padding:.625rem /* 10/16 */ 0;
            margin-bottom:.9375rem /* 15/16 */;
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
                        margin-top:.375rem /* 6/16 */;
                    }
                    .fontBig{
                        font-size:1rem /* 16/16 */;
                        font-weight:600;
                        color:rgba(26,26,26,1);
                        background:linear-gradient(0deg,rgba(173,161,132,1) 0.634765625%, rgba(234,214,185,1) 100%);
                        -webkit-background-clip:text;
                        -webkit-text-fill-color:transparent;
                        
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
        .footerBtn{
            width:100%;
            height:4.0625rem /* 65/16 */;
            background:#fff;
            &.footerFixed{
                position:fixed;
                left:0;
                bottom:0;
            }
            .left{
                flex:1;
                height:4.0625rem /* 65/16 */;
                padding-left:.9375rem /* 15/16 */;
                color:#4D4D4D;
                p{
                    display:inline-block;
                    font-size:.75rem /* 12/16 */;
                    padding:.4375rem /* 7/16 */ 0;
                }
                .nowPrice{
                    color:#EF2205;
                    font-size:.75rem /* 12/16 */;
                    padding-right:1.25rem /* 20/16 */;
                    b{
                        font-size:1.625rem /* 26/16 */;
                        font-weight: normal;
                    }
                }
            }
            .right{
                flex:1;

            }
            .submitBtn{
                width:100%;
                background:linear-gradient(0deg,rgba(216,177,138,1),rgba(232,208,164,1));
                border:0;
                border-radius: 0;
                height:4.0625rem /* 65/16 */;
                line-height: 4.0625rem /* 65/16 */;
                font-size:1rem /* 16/16 */;
                font-weight: 600;
                &.van-button--disabled{
                    color:#666;
                }
            }
        }
        
    }
</style>