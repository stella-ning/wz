<template>
    <div>
        <van-button @click="toNativePage">去app</van-button>
        <van-button @click="toNativePage">去app</van-button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                smsId:this.$route.query.id,
                urlA:'',//安卓页面地址
                urlI:'',//ios页面地址
                urlW:'',//网页地址
                urlMp:'',//小程序地址
                nativeJumpPageId:'',//原生跳转页面Id。jump_type为1时填写
                benifitId:'',//会员权益ID。jump_type为4，5，6，7，8时填写
                benifitProductId:'',//权益产品ID。jump_type为6，7时填写
                jumpType:'',//跳转类型 1:原生页面 2:微信小程序页面 3:手机网页 4:烈熊类权益 5:易加油类权益 6:直冲类权益 7:卡密类权益 8:h5跳转类权益 11:其他权益类型
                channel:getUrlArgs('channel'),
            }
        },
        mounted(){
            this.smsClick()
            this.getSmsMarketingContentDetails()
        },
        methods:{
            smsClick(){ //统计链接点击数
                let params = {
                    smsMarketingContentId:this.smsId
                };
                this.request.post(this.urls.smsClick,params).then(res=>{
                    console.log('统计成功')
                    //console.log(res)
                })
            },
            getSmsMarketingContentDetails(){
                let params = {
                    smsMarketingContentId:this.smsId
                };
                this.request.post(this.urls.getSmsMarketingContentDetails,params).then(res=>{
                    let smsDetail = res.resultData.smsMarketingContent;
                    this.jumpType = smsDetail.jumpType;
                    switch(this.jumpType){
                        case 1:
                            this.nativeJumpPageId = smsDetail.nativeJumpPageId;
                            this.urlA = smsDetail.urlA;
                            this.urlI = smsDetail.urlI;
                            this.toNativePage()
                            break;
                        case 2:
                            this.urlMp = smsDetail.urlMp;
                            break;
                        case 3:
                            this.urlW = smsDetail.urlW;
                            window.location.href = this.urlW;
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            this.benifitId = smsDetail.benifitId;
                            if(this.jumpType == 6 || this.jumpType == 7){
                                this.benifitProductId = smsDetail.benifitProductId;
                            }
                            this.urlA = smsDetail.urlA;
                            this.urlI = smsDetail.urlI;
                            this.toNativePage()
                            break;
                        case 11:
                            this.urlA = smsDetail.urlA;
                            this.urlI = smsDetail.urlI;
                            this.toNativePage()
                            break;
                        

                    }
                    console.log(res)
                })
            },
            toNativePage(){
                let openUrl,
                    downLoadUrl = `http://www.fychs.com/wangzhuan/wzLanding/?channel=${this.channel}#/appInfo/appDownload`;
                if(isAndroidClient()){
                    this.urlA = encodeURIComponent(this.urlA);
                    openUrl = `fychs://org.vackapi.wool.main?loadUrl=${this.urlA }`
                    APPTool.openOrDown(openUrl,downLoadUrl)
                }
                if(isIOSClient()){
                    openUrl = `fychs://org.vackapi.wool.main?loadUrl=${this.urlI}`
                    APPTool.openOrDown(openUrl,downLoadUrl)
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>