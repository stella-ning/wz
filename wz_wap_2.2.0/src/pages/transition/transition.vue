<template>
    <div class="transition">
        <van-loading type="spinner">加载中...</van-loading>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isSuccess:false,
                code:'',
                state:'',
            }
        },
        created(){
            this.code = this.$route.query.code;
            this.state = this.$route.query.state;
            
        },
        mounted(){
            let params = {
                code:this.code,
                state:this.state,
            };
            this.request.get(this.urls.taobaoAuth,params,true,false).then(res=>{
                if(res.resultCode == -1){
                    APPTool.addJsCallback(this,'tkAuth',{
                        "isSuccess":false,
                        title:error.resultData.title,
                        content:error.resultData.content,
                    })
                }else{
                    APPTool.addJsCallback(this,'tkAuth',{
                        "isSuccess":true,
                    })
                }
                
                
            }).catch(error=>{
                APPTool.addJsCallback(this,'tkAuth',{
                    "isSuccess":false,
                    title:error.resultData.title,
                    content:error.resultData.content,
                })
            })
        }

    }
</script>

<style lang="scss" scoped>
    .transition{
        width:100%;
        height:100vh;
        text-align: center;
        .van-loading{
            top:45%;
            .van-loading__spinner{
                color:#1A1A1A !important;
            }
            .van-loading__text{
                color:#1A1A1A !important;
            }
        }
    }
</style>