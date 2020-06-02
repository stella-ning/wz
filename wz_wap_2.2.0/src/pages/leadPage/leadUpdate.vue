<template>
    <div class="update">
        <p class="tips">新功能上线啦！</p>
        <p>下载最新版本，可立即使用新功能哦~</p>
        <div class="btn" @click="onDownLoad">了解，立即下载</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                androidDownloadUrl:'',
                iosDownloadUrl:'',
                channel:getUrlArgs('channel'),
            }
        },
        created() {
            this.$nextTick(()=>{
                APPTool.addJsCallback(this,'appSetTitle',{
                    title:'升级提醒'
                })
            })
        },
        mounted(){
            this.callDownloadUrl()
        },
        methods:{
            callDownloadUrl() {
                let paramJson = {
                    constantNames:['appDownloadUrl','iosDownloadUrl'],
                };
                this.request.post(this.urls.getConstantValue,paramJson,false).then((res)=>{
                    this.appDownloadUrl = res.resultData.appDownloadUrl;
                    this.appDownloadUrl = this.appDownloadUrl.replace('%s',this.channel);
                    console.log(this.appDownloadUrl)
                    this.iosDownloadUrl = res.resultData.iosDownloadUrl;
                })
                
            },
            onDownLoad(){
                // STATS_SA.trackClick('toDownLoadApp','下载 超惠省app，使用会员特权')
                if(isAndroidClient()){
                    APPTool.addJsCallback(this,'downLoadAPP',{
                        url:this.appDownloadUrl
                    })
                }
                else if(isIOSClient()){
                    APPTool.addJsCallback(this,'downLoadAPP',{
                        url:''
                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .update{
        text-align:center;
        padding-top:12rem;
        p{
            color:#1a1a1a;
            line-height:2.8125rem /* 45/16 */;
            font-size:1.125rem /* 18/16 */;
            &.tips{
                color:#ff8f02;
            }
        }
        .btn{
            width:12.5rem /* 200/16 */;
            height:3.125rem /* 50/16 */;
            line-height: 3.125rem /* 50/16 */;
            text-align: center;
            color:#fff;
            font-size:1.125rem /* 18/16 */;
            margin:1.5625rem /* 25/16 */ auto;
            background:#ff8f02;
            border-radius:.3125rem /* 5/16 */;
            
        }
    }
</style>