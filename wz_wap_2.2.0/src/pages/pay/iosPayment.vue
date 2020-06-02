<template>
    <div class="iosPayment">
        <mHeader class="header" :title="'成功提交申请'"></mHeader>
        <div class="notes">
            通知：由于春节放假原因，值班人数不足，客服电话核实会延迟拨打，敬请谅解。
        </div>
        <div class="feedCon">
            <div class="imgBox">
                <img :src="feedSuccess" alt="">
            </div>
            <div class="feedTitle">申请成功提交，等待电话核实</div>
            <p class="feedTips">
                客服会在1-2日内电话与您联系，核实您的身份，请留意您的电话。
            </p>
        </div>
        <div class="closeBtn" @click="closeHandle">
            关闭
        </div>
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
                feedSuccess:require('@/assets/images/feedSuccess.png')
            }
        },
        mounted() {
            
        },
        methods: {
            closeHandle(){
                this.$router.push({
                    path:'/card/cardSimple',
                    query: {
                        isSimple:true,
                        channel:getUrlArgs('channel'),
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    /deep/.headBox header{
        height:3.125rem /* 50/16 */;
        line-height:3.125rem /* 50/16 */;
    }
    .notes{
        padding:.9375rem /* 15/16 */ 2.375rem /* 38/16 */;
        background:#FFC102;
        color:#fff;
        font-size:1rem;
        line-height:1.5625rem /* 25/16 */;
    }
    .feedCon{
        text-align:center;
        padding-top:2.8125rem /* 45/16 */;
        padding-bottom:1.25rem /* 20/16 */;
        .imgBox{
            img{
                display:inline-block;
                width:6.25rem /* 100/16 */;
                max-width: 100%;
                height:6.25rem /* 100/16 */;
                max-height:100%;
            }
        }
        .feedTitle{
            color:#ff8f02;
            font-size:1.375rem /* 22/16 */;
            text-align:center;
            margin-top:.9375rem /* 15/16 */;
            margin-bottom:.625rem /* 10/16 */;
        }
        .feedTips{
            font-size:.875rem /* 14/16 */;
            color:#1A1A1A;
            padding:0 3.625rem /* 58/16 */;
            text-align:left;
        }
        
    }
    .closeBtn{
        width:18.4375rem /* 295/16 */;
        height:2.75rem /* 44/16 */;
        background:linear-gradient(0deg,rgba(255,192,117,1),rgba(255,221,168,1));
        border-radius:2.75rem /* 44/16 */;
        margin:3.125rem /* 50/16 */ auto;
        color:#1A1A1A;
        font-size:1rem;
        text-align: center;
        line-height:2.75rem /* 44/16 */;
    }
</style>