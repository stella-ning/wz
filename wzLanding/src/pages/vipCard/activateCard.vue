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
                this.userPhone = this.$route.query.phone;
                this.userId = this.$route.query.userId;
                this.sessionKey = this.$route.query.sessionKey;
                this.device = getUrlArgs('device');
                let userInfo = {
                    userId:this.userId,
                    sessionKey:this.sessionKey
                };
                this.$ls.set('userInfo',userInfo);
            })
        },
        mounted() {
            
        },
        methods: {
            toActive(){
                let params = {
                    cardNo:this.cardNo,
                    activationCode:this.activationCode,
                    userId:this.userId,
                    sessionKey:this.sessionKey,
                    platformType:this.platformType,//平台类型。1：cms，2：wap，3：iOS，4：android
                };
                
                this.request.post(this.urls.activateMembershipCard,params,true).then(res=>{
                    //APPTool.addJsCallback(this,'activitySuccess')
                }).catch((error)=>{
                    console.log(error)
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