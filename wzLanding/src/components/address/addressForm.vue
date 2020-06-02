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
                <p class="title">尊享名额仅剩：<span style="color:#EF2205">4%</span></p>
                <div class="processe">
                    <div class="progress-bar active" style="width: 96%;">
						<div class="progress-value">96%</div>
					</div>
                </div>
                <div class="imgBox" v-if="versionCode == 7 || versionCode == 6">
                     <img v-if="versionCode == 6" :src="tips" alt="">
                     <img v-else :src="limitActive" alt="">
                </div>
            
                <p class="subTitle">填写收货信息，领取卡片</p>
                <!-- class="van-hairline--surround" -->
                <div class="infoInput">
                    <van-cell-group>
                        <van-field
                            v-model="username"
                            @blur="inputBlur"
                            border="false"
                            :left-icon="userIcon"
                            label="持卡人姓名"
                            placeholder="请输入持卡人姓名"
                            :disabled="!isSimple"
                        />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                            type='number'
                            maxlength = '11'
                            @blur="inputBlur"
                            :left-icon="phoneIcon"
                            v-model="phone"
                            label="持卡人手机号"
                            placeholder="请输入持卡人手机号"
                            :disabled="!isSimple"
                        />
                    </van-cell-group>
                    <van-cell-group v-if="showAreaByStep">
                        <van-field
                            class="checkedAddress"
                            v-model="address.area"
                            :left-icon="areaIcon"
                            right-icon="arrow"
                            label="收货地址"
                            placeholder="请选择地区（省-市-县）"
                            disabled
                            @click="showArea"
                        />
                       
                    </van-cell-group>
                    <van-cell-group v-if="showAreaByStep">
                        <van-field
                            v-model="address.addressDetail"
                            @blur="inputBlur"
                            :left-icon="detailIcon"
                            rows="1"
                            autosize
                            label="详细地址"
                            type="textarea"
                            maxlength="50"
                            placeholder="详细地址"
                            show-word-limit
                        />
                    </van-cell-group>
                    <div class="imgBox" v-if="versionCode != 7 && versionCode != 6">
                        <img  :src="limitActive" alt="">
                    </div>
                </div>
            </div>
            <footer>
                <div class="footerBtn flex align-center footerFixed" >
                    <div class="left van-hairline--top">
                        <p>
                            总金额：
                            <span class="nowPrice">￥<b>0</b></span>
                            <del>￥299</del>
                        </p>
                        <div class="tips">尊享名额仅剩：4% </div>
                    </div>
                    <div class="right">
                        <van-button class="submitBtn"  @click="onSubmit"  :loading='btnLoading'>提交申请</van-button>
                    </div>
                    <div v-if="versionCode == 7" class="label" :style="`background:url(${specialBg}) 0% 25% no-repeat;background-size:cover`">
                        {{new Date(time).Format('MM月dd日')}}后，价格恢复￥299
                    </div>
                </div>
                
            </footer>
            
        </template>
        
        <van-popup v-model="isShowArea" position="bottom" 
            round lock-scroll :close-on-click-overlay='false'
            :style="{ 'width': '100%'}"
        >
           <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
        </van-popup>
        <backLayOut :isPopstate="isPopstate" :continueFn="continueFn"  btnText="继续领卡" persons="12736"></backLayOut>
    </div>
</template>

<script>
    import backLayOut from '@/components/common/backLayOut';
    import { areaList } from '@/utils/unit';
    import FactoryTool from '@/pages/jyd/beans/base/FactoryTool';
    import { mapState} from "vuex";
    export default {
        name:'addressForm',
        components:{
            backLayOut
        },
        props:{
            isEdit:{
                default:()=>{
                    return true;
                }
            },
            byStep:{
                default:false,
            }
        },
        data(){
            return{
                factoryTool:null,
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
                userIcon:require('@/assets/images/buy/userIcon.png'),
                phoneIcon:require('@/assets/images/buy/phoneIcon.png'),
                areaIcon:require('@/assets/images/buy/areaIcon.png'),
                detailIcon:require('@/assets/images/buy/detailIcon.png'),
                limitActive:require('@/assets/images/buy/limitActive.png'),
                tips:require('@/assets/images/order/tips.png'),
                specialBg:require('@/assets/images/buy/specialBg.png'),
                btnLoading:false,
                isPopstate:false,
                versionCode:'',
                time:'',
            }
        },
        created() {
            this.isSimple = this.$route.query.isSimple;
            // if(isAndroidClient()){
            //     APPTool.addJsCallback(this,'cancelRefresh',{cancelRefresh:true});
            // }
            this.factoryTool = new FactoryTool(getUrlArgs('channel'),this.$route.path);
            this.initData()
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
            this.callGetLandPageByChannelName()
        },
        methods:{
            initData(){
                const userInfo = this.$ls.get('userInfo');
                const address = this.$ls.get('address');
                if(userInfo){
                    this.username = userInfo.realName;
                    this.phone = userInfo.userPhone;
                }
                if(address){
                    this.address.area = address.area;
                    this.address.area = this.address.area.replace(/\s+/g,'-');
                    this.address.addressDetail = address.addressDetail;
                }
            },
            callGetLandPageByChannelName(){
                this.request.post(this.urls.getLandPageByChannelName, {
                    channelName: getUrlArgs('channel') || this.$route.query.channel
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
                if(!this.username || !this.phone || !this.address.area || !this.address.addressDetail){
                    this.$toast('请完善收货地址')
                    return;
                }
                if(!checkPhoneMob(this.phone)){
                    this.$toast('请输入正确的手机号')
                    this.phone = ''
                    return;
                }
                this.$ls.set('address',this.address)
                this.btnLoading = true;
                STATS_SA.trackClick('applyAddressInfo','提交申请')
                this.userInfo.realName = this.username;
                this.userInfo.userPhone = this.phone;
                this.$ls.set('userInfo',this.userInfo); 
                setTimeout(()=>{
                    this.btnLoading = false;
                    this.$router.push({
                        path:'/card/buyCard',
                        query: {
                            isSimple:true,
                            channel:getUrlArgs('channel'),
                            ...this.$route.query
                        }
                    })
                },1000)
                this.factoryTool.addState(FactoryTool.PageEnum.submitAddressBtnClick);
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
            continueFn(){
                this.isPopstate = false;
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
                    this.isShowArea = true;
                }else{
                    this.showAreaList = true;
                }
            },
        },
        
        computed: {
            showAreaByStep(){
                if(this.byStep) {
                    if(this.username && this.phone){
                        return true;
                    }
                    return false;
                }
                return true;
            }
        },

    }
</script>

<style lang="scss" scoped>
    .addressForm{
        max-height:75vh;
        .imgBox{
            width:100%;
            height:4.0625rem /* 65/16 */;
            img{
                max-width: 100%;
            }
        }
        .templateBox{
            padding: 0 1.25rem /* 20/16 */ 4.6875rem /* 75/16 */;
            background:#F7F7F7;
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
            margin-bottom:.625rem /* 10/16 */;
            background:#E6E6E6;
            height:.625rem /* 10/16 */;
            border-radius: .625rem /* 10/16 */;
            .progress-bar{
                position: relative;
			    animation: animate-positive 2s;
            }
            .progress-value{
                display: block;
                padding: 3px 7px;
                font-size: .75rem /* 12/16 */;
                color: #1A1A1A;
                border-radius: 4px;
                background: linear-gradient(-90deg,rgba(252,201,155,1),rgba(255,223,185,1));
                position: absolute;
                top: -30px;
                right: -10px;
            }
            .progress-value:after{
                content: "";
                border-top: 6px solid rgba(252,201,155,1);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                position: absolute;
                bottom: -6px;
                left: 34%;
            }
        }
        .progress-bar.active{
            height:.625rem /* 10/16 */;
			border-radius: .625rem /* 10/16 */;
            animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 2s;
            background:linear-gradient(-90deg,rgba(252,201,155,1),rgba(255,223,185,1));
		}
        .van-cell-group{
            margin-bottom:.625rem /* 10/16 */;
            width:100%;
            border-radius:.3125rem /* 5/16 */;
            box-shadow:0px 2px 10px 0px rgba(231,231,231,0.4);
        }
        
        /deep/ .van-hairline--top-bottom::after{
            border-width:0;
        }
        /deep/ .van-cell{
          border-radius:.3125rem /* 5/16 */;
          padding:.9375rem /* 15/16 */;
        }
        /deep/ .van-field__left-icon{
            margin-top:.1875rem /* 3/16 */;
        }
        /deep/ .van-field__label{
            color:#333;
            font-size:vw(14);
            font-weight: 400;
            padding-left:vw(2);
            width:vw(100);
        }
        /deep/ .van-field__right-icon{
            color:#FCC99B;
            .van-icon{
                font-size:.875rem /* 14/16 */;
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
            color:#1A1A1A;
            font-weight: 600;
            font-size:1rem;
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
            height:3.75rem /* 60/16 */;
            background:#fff;
            &.footerFixed{
                position:fixed;
                left:0;
                bottom:0;
            }
            .left{
                flex:1;
                height:3.75rem /* 60/16 */;
                padding-left:.9375rem /* 15/16 */;
                color:#4D4D4D;
                p{
                    display:inline-block;
                    font-size:.75rem /* 12/16 */;
                    padding:.4375rem /* 7/16 */ 0 0;
                }
                .nowPrice{
                    color:#EF2205;
                    font-size:.75rem /* 12/16 */;
                    padding-right:.3125rem /* 5/16 */;
                    b{
                        font-size:1.625rem /* 26/16 */;
                        font-weight: normal;
                    }
                }
                .tips{
                    font-size:.625rem /* 10/16 */;
                    color:#666;
                }
            }
            .right{
                flex:1.5;

            }
            .submitBtn{
                width:90%;
                background:linear-gradient(-90deg,rgba(252,201,155,1),rgba(255,223,185,1));
                border:0;
                border-radius: 2.8125rem /* 45/16 */;
                height:2.8125rem /* 45/16 */;
                line-height: 2.8125rem /* 45/16 */;
                font-size:1rem /* 16/16 */;
                font-weight: 600;
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
    @-webkit-keyframes animate-positive{
        0% { width: 0; }
    }
    @keyframes animate-positive{
        0% { width: 0; }
    }
</style>
<style lang="scss">
    .addressForm{
        .checkedAddress {
            .van-field__control,.van-field__control::-webkit-input-placeholder,.van-field__control:disabled{
                color:#1A1A1A !important;
            }
        }
        
    }
</style>