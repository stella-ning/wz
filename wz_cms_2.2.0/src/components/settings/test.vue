<template>
 <div>

 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   methods: {
       test(){
           '中文ABc哈哈哈'.split('').reduce(( acc, cur )=>{
               return acc + cur
           })
       }
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
