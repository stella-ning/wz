<template>
    <div :value="value">
        <el-select v-model="platform" placeholder="请选择" :size="size">
            <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
import platformList from '@/components/selector/platformList'
 export default {
     props:['value','size'],

   data () {
     return {
        platform: '',
        platformList: platformList,
     }
   },
   methods: {
       onSelect(){
           this.$emit('onPlatformSelect',this.platform,this.platformList);
       }
   },
   mounted(){
       this.onSelect();
       this.platform = this.value || ''
   },
   watch:{
       platform() {
           this.onSelect();
           this.$emit('input',this.platform)
       },

       value() {
        this.platform = this.value
      }
   }
   
 }
</script>

<style lang="scss" scoped>

 
</style>
