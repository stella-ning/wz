<template>
 <div>
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="产品列表入口设置" name="first">
            <brandEntranceSettingsTabProduct></brandEntranceSettingsTabProduct>
        </el-tab-pane>
        <el-tab-pane label="品牌列表入口设置" name="second">
            <brandEntranceSettingsTabBrand></brandEntranceSettingsTabBrand>
        </el-tab-pane>
        <el-tab-pane label="【优选品牌导航页】相关配置" name="third">
            <brandEntranceSettingsTabLeading></brandEntranceSettingsTabLeading>
        </el-tab-pane>
        <el-tab-pane label="首页品牌配置" name="fourth">
            <brandEntranceSettingsTabHomeBrand></brandEntranceSettingsTabHomeBrand>
        </el-tab-pane>
    </el-tabs>
    
 </div>
</template>

<script>

import brandEntranceSettingsTabProduct from '@/components/settings/brandEntranceSettingsTabProduct'
import brandEntranceSettingsTabBrand from '@/components/settings/brandEntranceSettingsTabBrand'
import brandEntranceSettingsTabLeading from '@/components/settings/brandEntranceSettingsTabLeading'
import brandEntranceSettingsTabHomeBrand from '@/components/settings/brandEntranceSettingsTabHomeBrand'
 export default {
   data () {
     return {
          activeName: 'fourth',
       
     }
   },
   created(){
       
   },
   methods: {
        handleClick(){
            
        }
   },
   components:{
       
       brandEntranceSettingsTabProduct,
       brandEntranceSettingsTabBrand,
       brandEntranceSettingsTabLeading,
       brandEntranceSettingsTabHomeBrand
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
