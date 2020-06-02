<template>
 <div class="buyCardBox">
  <van-progress :percentage="progress"  :show-pivot="false" color="#57BC6A"/>
 </div>
</template>

<script>
 import FactoryTool from '@/pages/jyd/beans/base/FactoryTool';
 export default {
   data () {
     return {
         buyCardPageUrl:'',
         progress:0,
         factoryTool:null,
     }
   },
   created(){
    //   this.factoryTool = new FactoryTool(getUrlArgs('channel'));
      this.callUrl();
      this.setProgress();
   },
   methods: {
       setProgress(){
            var ran = 50 * Math.random() + 50;
            var timer =  setInterval(()=>{
                if(this.progress > ran) {
                    clearInterval(timer);
                }
                this.progress += 1;
            },100);
       },
       callUrl(){
            this.$store.dispatch('callConstantValue', ['buyCardPageUrl']).then(result => {
                this.progress =  99;
                this.buyCardPageUrl = result.buyCardPageUrl;
                //重定向到新的项目
                var redirectUrl = window.location.href.replace('wzLanding',this.buyCardPageUrl);
                window.location.replace(redirectUrl)
            })

       }
   }
 }
</script>

<style lang="scss" scoped>
    /deep/ .van-progress {
        height: 2px;
    }
 
</style>
