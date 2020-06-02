<template>
    <div class="aboutUs">
        <div class="logoBox" @click="test">
            <img v-if="isIos" :src="hsqLogo" alt="">
            <img v-else :src="logo" alt="">
            <p>当前版本 v{{versionName}}</p>
        </div>
        <div v-if="isIos" class="aboutText">
            【麒麟卡-提供有质生活的专家】
            麒麟卡-提供有质生活的专家是一款专门研究生活折扣app，百万优惠券直接抵现金，比淘宝上直接购买省更多，让用户以更低的价格，买到中意的商品，为用户提供最优的服务。
        </div>
        <div v-else class="aboutText">
            超惠省每天更新最新热门商品，种类齐全，所有商 品均由平台专业买手精挑细选，品质严选，海量商 品，满足您的购物需求。
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                logo:require('@/assets/images/logo.png'),
                hsqLogo:require('@/assets/images/hsqLogo.png'),
                versionName:'',
                isIos:isIOSClient(),
            }
        },
        created() {
            this.$nextTick(()=>{
                this.versionName = getUrlArgs('versionName')
                APPTool.addJsCallback(this,'appSetTitle',{
                    title:'关于我们'
                })
                WxCompat.wxSetTitle = '关于我们'
            })
        },
        methods: {
            test(){
                this.$router.push('/home')
            }
        },
    }
</script>

<style lang="scss" scoped>
    .aboutUs{
        padding:3.125rem /* 50/16 */ 2.1875rem /* 35/16 */;
        .logoBox{
            text-align: center;
            img{
                width:4.6875rem /* 75/16 */;
                height:4.6875rem /* 75/16 */;
                margin:0 auto .875rem /* 14/16 */;
            }
            p{
                font-size:.875rem /* 14/16 */;
                color:#666;
            }
        }
        .aboutText{
            margin-top:3.75rem /* 60/16 */;
            color:#1A1A1A;
            font-size:.875rem /* 14/16 */;
            font-weight: 300;
        }
    }
</style>