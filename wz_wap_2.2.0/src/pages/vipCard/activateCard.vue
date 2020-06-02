<template>
    <div>
        <mHeader :title="'激活会员'"></mHeader>
        <section class="seekInfo formCss">
            <div class="user">
                用户：{{userPhone}}
            </div>
            <van-cell-group>
                <van-field v-model="cardNo" placeholder="卡号" type="number" />
            </van-cell-group>
            <van-cell-group>
                <van-field  v-model="activationCode" placeholder="激活码" type="number" />
            </van-cell-group>
            
            <div class="footerBtn">
                <van-button type="primary" size="large" @click="toActive" :disabled="!cardNo || !activationCode">确认激活</van-button>
                <!-- <p class="seek" @click="toDetail">查看会员卡物流></p> -->
            </div>
            <!-- <p>
                userId={{userId}}
            </p>
            <p>
                sessionKey={{sessionKey}}
            </p>
            <p>
                platformType={{platformType}}
            </p> -->
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
                cardNo:'',
                activationCode:'',
                userPhone:'',
                disabled:false,
                userId:'',
                sessionKey:'',
                device:'',
            }
        },
        created() {
            this.$nextTick(()=>{
                this.getPhone();
                let cardNo = this.$route.query.cardNo;
                let activationCode = this.$route.query.activationCode;
                cardNo?this.cardNo=cardNo:this.cardNo='';
                activationCode?this.activationCode = activationCode : this.activationCode = '';
                // this.userPhone = this.$route.query.phone;
                // this.userId = this.$route.query.userId;
                // this.sessionKey = this.$route.query.sessionKey;
                // this.device = getUrlArgs('device');
                // let userInfo = {
                //     userId:this.userId,
                //     sessionKey:this.sessionKey
                // };
                // // APPTool.addJsCallback(this,'appSetTitle',{
                // //     title:'激活会员'
                // // })
                // this.$ls.set('userInfo',userInfo);
            })
        },
        mounted() {
            
        },
        methods: {
            getPhone(fn){
                this.userPhone = this.$ls.get('phone');
                if(isNull(this.userPhone)) {
                    var count = 0;
                    var timer = setInterval(() => {
                        count ++;
                        this.userPhone = this.$ls.get('phone');
                            console.log('轮询获取手机号')
                        if(!isNull(this.userPhone) ||  count > 15) {
                            clearInterval(timer);
                            if(fn)fn();
                                console.log('轮询获取手机号回调：'+this.userPhone)
                        }
                        
                    }, 100);
                }
                else {
                   
                    if(fn)fn();
                }
            },
            toActive(){
                let params = {
                    cardNo:this.cardNo,
                    activationCode:this.activationCode,
                    phone:this.userPhone
                };
                this.request.post(this.urls.activateMembershipCard,params,true).then(res=>{
                    APPTool.addJsCallback(this,'activitySuccess');
                    if(isAndroidClient()){
                        APPTool.addJsCallback(this,'startNative',{
                            url:'fychs://org.vackapi.wool.home.HomeActivity?pos=3'
                        })
                    }
                    if(isIOSClient()){
                        APPTool.addJsCallback(this,'startNative',{
                            url:'LExperUserRightsVC'
                        })
                    }
                    
                }).catch((error)=>{
                    console.log(error)
                    if(error.resultMsg == '会员卡已激活' || error.resultMsg == '用户已激活会员，无需重新激活'){
                        if(isAndroidClient()){
                            APPTool.addJsCallback(this,'startNative',{
                                url:'fychs://org.vackapi.wool.home.HomeActivity?pos=3'
                            })
                        }
                        if(isIOSClient()){
                            APPTool.addJsCallback(this,'startNative',{
                                url:'LExperUserRightsVC'
                            })
                        }
                    }
                    
                    
                })
               
                
            },
            toDetail(){
                //alert(121)
                this.$router.push(`/order/orderDetail?isSimple=true`)
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
    .seekInfo{
        padding:.9375rem /* 15/16 */ 1.5625rem /* 25/16 */;
        .col35{
            .box{
                padding-top:.4375rem /* 7/16 */;
                padding-right:.625rem /* 10/16 */;
            }
        }
        .user{
            margin-bottom:1.25rem /* 20/16 */;
        }
        .seek{
            height:2.5rem /* 40/16 */;
            line-height:2.5rem /* 40/16 */;
            margin-top:.625rem /* 10/16 */;
            text-align: right;
            color:#999;

        }
    }
</style>