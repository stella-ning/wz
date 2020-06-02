<template>
 <div>
   <a :href="url" v-trigger>点击</a>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         resultData:{},
         tips:'',
         url:'',
         returnUrl:'',
     }
   },
   created() {
      let andCode = encodeURIComponent('&');
      let urlPrefix = window.location.href.split('#')[0];
      this.returnUrl = encodeURIComponent(`${urlPrefix}#/card/cardSimple`);
      this.url = `alipays://platformapi/startapp?appId=20000067&url=${this.returnUrl}`;
   },
   directives:{
     trigger:{
        inserted(el,binging){
          console.log(el)
          el.click()
        }
     }
   },
   methods: {
      callPay() {
          this.tips = '发起支付'
           let paramJson = {
            //    redirectUrl : encodeURIComponent('http://www.baidu.com')
           };
          //  sendPost(urls.testPay, {data: JSON.stringify(paramJson)},(resultJson)=>{
          //      window.location.href = resultJson.resultData.mwebUrl ;
          //  });
      },
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
