<template>
  <van-progress :percentage="progress"  :show-pivot="false" color="#57BC6A"/>
</template>

<script>
 export default {
   data () {
     return {
         progress:20,
     }
   },
   created(){
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
            },10);
       },
   },
   watch:{
       stopEvent(){
           if(this.stopEvent) {
               this.progress = 99;
           }
       },
   },
   props:{
       stopEvent:{
           default:false,
       }
   }
 }
</script>

<style lang="scss" scoped>
    /deep/ .van-progress {
        height: 2px;
    }
 
</style>
