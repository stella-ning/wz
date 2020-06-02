<template>
    <div class="aboutUs">
        <div class="logoBox" @click="test">
            <img :src="logo" alt="">
            <p>当前版本 v{{versionName}}</p>
        </div>
        <div class="aboutText">
            超惠省每天更新最新热门商品，种类齐全，所有商 品均由平台专业买手精挑细选，品质严选，海量商 品，满足您的购物需求。
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                logo:require('@/assets/images/logo.png'),
                versionName:'',
            }
        },
        created() {
            this.$nextTick(()=>{
                this.versionName = getUrlArgs('versionName')
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