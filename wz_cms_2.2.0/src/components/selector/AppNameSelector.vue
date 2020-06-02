<template>
    <el-select v-model="appName" placeholder="请选择">
        <el-option v-for="item in appNameList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
 export default {
   data () {
     return {
        appName: '',
        appNameList: [],
     }
   },
   methods: {
       onSelect(){
           this.$emit('onSelect',this.appName,this.appNameList);
       },
       callAppNameList(){
            sendPost(urls.getAppNameList, {data: JSON.stringify({})}, (resultJson)=> {
                this.appNameList = [{
                    label:'全部',
                    value:''
                },];
                for (let index = 0; index < resultJson.resultData.appNameList.length; index++) {
                    const element = resultJson.resultData.appNameList[index];
                    this.appNameList.push({
                        label:element.appName,
                        value:element.appName,
                    });
                }
            });
       }
   },
   mounted(){
       this.onSelect();
       this.callAppNameList();
      
   },
   watch:{
       appName() {
           this.onSelect();
       }
   }
   
 }
</script>

<style lang="scss" scoped>

 
</style>
