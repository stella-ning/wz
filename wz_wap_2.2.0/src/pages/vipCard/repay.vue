<template>
    <div class="orderDetail">
        <mHeader :title="'去支付'"></mHeader>
        <section class="addressBox van-hairline--top">
            <div class="address flex align-center justify-center">
                <div class="iconBox">
                    <van-icon name="location" />
                </div>
                <div class="textBox">
                    <p class="name">
                        {{userName}}（{{userPhone}}）
                    </p>
                    <p class="area">
                        {{province}}-{{city}}-{{county}}  {{street}}
                    </p>
                </div>
            </div>
            <div class="goodInfoBox">
                <p class="sectionTitle">商品信息</p>
                <div class="goodInfo flex align-center justify-between">
                    <span class="goodParam">麒麟卡</span>
                    <span class="goodValue">￥0（原价：￥299）</span>
                </div>
                <div class="goodInfo flex align-center justify-between">
                    <span class="goodParam">邮费</span>
                    <span class="goodValue">￥15 （普通快递，3个工作日内发货）</span>
                </div>
                <div class="goodInfo flex align-center justify-between">
                    <span class="goodParam">支付方式</span>
                    <span class="goodValue">微信支付</span>
                </div>
                <div class="repayBox">
                    <div class="repayBtn flex align-center justify-between">
                        <van-button round class="hadPayed">我已付款</van-button>
                        <van-button round class="payContinue">继续支付</van-button>
                    </div>
                    <p>
                        当前<span class="colorRed">587人</span>正在办卡，名额仅剩<span class="colorRed">2%</span>，请尽快完成支付！
                    </p>
                </div>

                <div class="goodInfo flex align-center justify-between">
                    <span class="goodParam">下单时间</span>
                    <span class="goodValue">2019-11-12  21:21:21</span>
                </div>
                <div class="goodInfo flex align-center justify-between">
                    <span class="goodParam">订单号</span>
                    <span class="goodValue">346938796475689569</span>
                </div>
                <div class="goodInfo flex align-center justify-between">
                    <span class="goodParam">订单状态</span>
                    <span class="goodValue colorRed">已下单，待支付></span>
                </div>
            </div>
        </section>
        <footer>
            如遇到支付失败，请点击  <span class="colorOrange">重新下单></span>
        </footer>
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    import payFooter from '@/components/pay/payFooter';
    export default {
        components:{
            mHeader,
            payFooter,
        },
        data(){
            return{
                userName:'宁菲菲',
                userPhone:'13560162027',
                minutes:'5',
                seconds:'59',
                province:'广东省',
                city:'广州市',
                county:'天河区',
                street:'天园街道建中路00号',
                postage:'1',
                payWay:'aplipay',
                alipay:require('@/assets/images/buy/alipay.png'),
                wechat:require('@/assets/images/buy/wechat.png'),
            }
        },
    }
</script>

<style lang="scss" scoped>
    
    .orderDetail{
        background:$backgroundC;
        min-height:100vh;
        .van-hairline--top::after{
            border-color:#E5E5E5;
        }
        .addressBox{
            width:100%;
            background:#fff;
            padding:0 .9375rem /* 15/16 */;
            margin-top:.625rem /* 10/16 */;
            .address{
                padding:.625rem /* 10/16 */ 0;
                border-bottom:1px solid #E5E5E5;
                .iconBox{
                    flex:1;
                    padding-left:.625rem /* 10/16 */;
                    .van-icon-location{
                        font-size:1.625rem /* 26/16 */;
                        color:#EAD6B9;
                    }
                }
                .textBox{
                    flex:6;
                    .name{
                        font-size:.875rem /* 14/16 */;
                        color:#1A1A1A;
                        margin-bottom:.5rem /* 8/16 */;
                    }
                    .area,.street{
                        font-size:.75rem /* 12/16 */;
                        color:#999;
                    }
                }
                .operate{
                    flex:1.5;
                    text-align: center;
                    font-size:.875rem /* 14/16 */;
                    color:#C89560;
                    .van-icon-arrow{
                        color:#1A1A1A;
                        font-size:.875rem /* 14/16 */;
                        vertical-align: middle;
                        top:-.0625rem /* 1/16 */;
                    }
                }
            }
        }
        .goodInfoBox{
            padding-bottom:.625rem /* 10/16 */;
            padding-top:.625rem /* 10/16 */;
            .sectionTitle{
                height:2.5rem /* 40/16 */;
                line-height:2.5rem /* 40/16 */;
                font-size:.875rem /* 14/16 */;
                color:#1A1A1A;
            }
            .goodInfo{
                width:100%;
                height:2.1875rem /* 35/16 */;
                line-height:2.1875rem /* 35/16 */;
                font-size:.875rem /* 14/16 */;
                color:#666;
                .goodParam{
                    flex:1.5
                }
                .goodValue{
                    flex:6;
                    text-align: right;
                    font-weight: 400;
                }

            }
        }
        .repayBox{
            margin-top:1.25rem /* 20/16 */;
            margin-bottom:1.875rem /* 30/16 */;
            .repayBtn{
                margin-bottom:.625rem /* 10/16 */;
            }
            .hadPayed{
                width:10.3125rem /* 165/16 */;
                height:2.75rem /* 44/16 */;
                line-height:2.75rem /* 44/16 */;
                border-color:#D9B38C;
                font-size:1rem;
                color:#D1AA83;
            }
            .payContinue{
                width:10.3125rem /* 165/16 */;
                height:2.75rem /* 44/16 */;
                line-height:2.75rem /* 44/16 */;
                border:none;
                background:linear-gradient(0deg,rgba(232,208,164,1),rgba(216,177,138,1));
                font-size:1rem;
                color:#000010;
            }
            p{
                font-size:.875rem /* 14/16 */;
                color:#1A1A1A;

            }
        }
        footer{
            margin-top:1.25rem /* 20/16 */;
            padding-bottom:1.25rem /* 20/16 */;
            font-size:.875rem /* 14/16 */;
            color:#1A1616;
            padding-left:.9375rem /* 15/16 */;
        }
       
    }
</style>