<template>
    <div>
        <article>
            <h2 align="center" style="text-align:center;font-family:Arial;font-size:16pt;">
                <b><span style="font-family:黑体;font-size:16pt;">关于【激活会员操作】小提示</span></b><b><span style="font-size:16pt;"></span></b>
            </h2>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">针对部分【已领取麒麟卡】，找不到【激活按钮】的用户，激活步骤如下：</span><span style="font-family:宋体;font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">1、</span><span style="font-family:宋体;font-size:10.5pt;">点击底部【会员特权】按钮：</span><span style="font-family:宋体;font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <img width="266" height="570" :src="actived1">
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">2、</span><span style="font-family:宋体;font-size:10.5pt;">下拉页面刷新后，页面如下：</span><span style="font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <img width="266" height="570" :src="actived2">
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;"><br />
        </span><span style="font-family:宋体;font-size:10.5pt;">3<span>、点击【激活会员卡，立即享受特权】，显示如下：</span></span><span style="font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <img width="266" height="570" :src="actived3">
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">4<span>、输入卡的卡号和激活码，点击确定，即可完成激活。</span></span><span style="font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" align="justify" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" align="justify" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" align="justify" style="text-align:justify;font-family:Calibri;font-size:10.5pt;text-indent:21pt;">
                <span style="font-family:宋体;font-size:10.5pt;">对于遇到激活问题的用户，我们深表歉意。我们会在下个版本进行优化，同时下个版本会增加更多【会员权益】和【实用功能】，欢迎大家多提宝贵意见，衷心感谢大家的理解和支持。</span><span style="font-family:宋体;font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" align="justify" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" align="right" style="text-align:right;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">超惠省研发部</span><span style="font-size:10.5pt;"></span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>
            <p class="MsoNormal" style="text-align:justify;font-family:Calibri;font-size:10.5pt;">
                <span style="font-family:宋体;font-size:10.5pt;">&nbsp;</span>
            </p>

        </article>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                actived1:require('@/assets/images/actived1.jpg'),
                actived2:require('@/assets/images/actived2.jpg'),
                actived3:require('@/assets/images/actived3.jpg'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    article{
        padding:.9375rem /* 15/16 */;
        img{
            margin: .9375rem /* 15/16 */ auto;
        }
    }
</style>