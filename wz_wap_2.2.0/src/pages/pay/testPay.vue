<template>
 <div>
    <p>{{tips}}</p>
    <p>{{resultData}}</p>
   <button type="submit" @click="callPay">点击发起支付</button>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         resultData:{},
         tips:'',
     }
   },
   created() {
     
   },
   methods: {
       callPay() {
            this.tips = '发起支付'
           let paramJson = {
            //    redirectUrl : encodeURIComponent('http://www.baidu.com')
           };
           sendPost(urls.testPay, {data: JSON.stringify(paramJson)},(resultJson)=>{
               window.location.href = resultJson.resultData.mwebUrl ;
           });
       },
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
