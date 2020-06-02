<template>
 <div>
     <div class="nn-table-wrapper">
         <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 50%"  align="left" border>
             <el-table-column label="用户返佣分组" prop="label">
             </el-table-column>
           <el-table-column label="返佣比例" prop="">
               <template slot-scope="scope">
                   <span v-if="scope.$index == 0">0</span>
                   <el-input v-else class="nn-input-xs" v-model="scope.row.value" placeholder=""></el-input>
                   <span class="ml-20"> %</span>
               </template>
           </el-table-column>
            
         </el-table>
     </div>
     <el-form ref="form" :model="form" label-width="250px" :inline="false" align="left" :rules="rules">
         <el-form-item label="用户为买卡默认分组：">
                无返佣
         </el-form-item>
         <el-form-item label="用户买卡，且激活，默认分组：" prop="rakeBack">
                <el-select v-model="form.activateGroup" placeholder="请选择">
                    <el-option
                    v-for="item in activateGroupList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
         </el-form-item>
         <p class="color-999 ml-20">注：用户返佣金额计算：= 平台拿到的佣金金额*用户返佣比例</p>
     </el-form>
     <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
     </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         form:{
             activateGroup:'',
         },
         tableData:[],
         activateGroupList:[{
             label:'无返佣',
             value:1
          },{
              label:'低返佣比例',
             value:2
         },{
              label:'中返佣比例',
             value:3
         },{
              label:'高返佣比例',
             value:4
         },],
         rules: {
            activateGroup: [{ required: true, message: '请填写信息' }],
         },
         
     }
   },
   created(){
       this.callGetUserRebateSetting();
   },
   methods: {
       submitForm(formName) {
           this.$refs[formName].validate((valid) => {
               if (valid) {
                   this.callUpdateUserRebateSetting();
                }
            })
       },
       callGetUserRebateSetting() {
           let paramJson = {
           };
           sendPost(urls.getUserRebateSetting, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = [
                    {label:'无分佣',value:0},
                    {label:'低返佣比例',value:resultJson.resultData.lowRebateRate},
                    {label:'中分佣比例',value:resultJson.resultData.midRebateRate},
                    {label:'高分佣比例',value:resultJson.resultData.highRebateRate},
                ],
                this.form.activateGroup = Number(resultJson.resultData.activateGroup);
           });
       },
       callUpdateUserRebateSetting() {
           let paramJson = {
               lowRebateRate: this.tableData[1].value,
               midRebateRate: this.tableData[2].value,
               highRebateRate: this.tableData[3].value,
               activateGroup:this.form.activateGroup
           };
           sendPost(urls.updateUserRebateSetting, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.callGetUserRebateSetting();
                });
           });
       },
       
   }
 }
</script>

<style lang="scss" scoped>

 
</style>
