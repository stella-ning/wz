<template>
    <div class="activeRules">
        <article>
            <h5>活动时间 </h5>
            <p>活动期间，每日更新免单商品，商品数量有限，抢完 为止；</p>
            <h5>活动对象</h5>
            <p>
                新注册用户，用户在0元购专区，选择商品，并再淘宝 购完成买后，即完成0元购活动；
            </p>
            <h5>活动形式</h5>
            <p>用户领券下单-确认收货-返利提现，订单和返利，请 前往【我的-我的返利】查看；</p>
            <h5>其他</h5>
            <p>订单成交价须为商品券后价（因计算有四舍五入，成 交价和券后价可以存在0.01元的误差）；</p>
            <p>本次活动订单返现金额最高为10元，实际返现奖励金 额以所选商品金额为准；</p>
            <p>活动期间每个用户id仅限购买1件商品，如果有恶意刷 取奖励的用户，平台有权取消该用户的奖励；</p>
            <footer>
                <div class="footerBtn" @click="goBack" >我已了解规则</div>
            </footer>
        </article>


    </div>
</template>

<script>
    export default {
        data(){
            return{
                userAgent:'',
            }
        },
        created() {
            this.$nextTick(()=>{
                    APPTool.addJsCallback(this,'appSetTitle',{
                    title:'活动规则'
                })
            })
        },
        mounted() {
            this.userAgent = navigator.userAgent;
            WxCompat.wxSetTitle = '活动规则'
        },
        methods: {
            goBack(){
                APPTool.addJsCallback(this,'finishPage')
            }
        },
    }
</script>

<style lang="scss" scoped>
    .activeRules{
        article{
            padding:2.5rem /* 40/16 */ 1.25rem /* 20/16 */;
            font-size:.875rem /* 14/16 */;
            color:#666;
            h5{
                margin:.9375rem /* 15/16 */ 0 .5rem /* 8/16 */;
                color:#1A1A1A;
            }
            p{
                margin-bottom:.5rem /* 8/16 */;
            }
        }
        footer{
            margin-top:3.125rem /* 50/16 */;
            .footerBtn{
                width:18.5rem /* 296/16 */;
                height:2.75rem /* 44/16 */;
                text-align:center;
                line-height:2.75rem /* 44/16 */;
                background:#FFC102;
                color:#fff;
                font-size:1rem;
                border-radius:2.75rem /* 44/16 */;
                margin:0 auto;
            }
        }
    }
</style>