<template>
 <div>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane  v-for="(item, index) in renderData" :key="index" :label="item.label" :name="item.label">
              <div class="nn-table-wrapper">
                <p class="color-999 ta-l">请先点击【使用落地页渠道号】中的具体渠道名，来获得落地页链接</p>
                <el-table class="mt-20 nn-no-overflow-table" :data="item.tableList" style="width: 100%"  align="left" border>
                    <el-table-column label="版本名称" prop="name">
                    </el-table-column>
                    <el-table-column label="备注" prop="">
                        <template slot-scope="scope">
                            <el-input type="textarea" :autosize="{ minRows: 2}"  class="nn-input-s"  v-model="scope.row.remark" placeholder=""></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="落地页链接" prop="">
                        <template slot-scope="scope">
                            <p v-if="scope.row.selectedChannel">{{myHostUrl}}/wangzhuan/wzLanding/?channel=<span class="color-red">{{scope.row.selectedChannel}}</span>#/card/cardSimple
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showDialog(scope.row)">使用落地页的渠道号</el-button>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>
   

     <el-dialog title="使用落地页的渠道号" :visible.sync="dialogVisible" width="50%"  class="ta-l" :close-on-click-modal="false">
         <el-form ref="dialogForm" :model="dialogForm" label-width="140px" :inline="true" align="left">
              <!-- <div>
                   <el-button type="default"
                    class="pointer mb-20"  
                    v-for="(item,index) in channelNameList" 
                   :key="index"
                    @click="selectTag(item)"
                   >{{item.channelName}}
                   </el-button>
              </div> -->
                <el-radio-group v-model="dialogForm.selectedChannel">
                    <el-radio-button   
                     v-for="(item,index) in channelNameList" 
                    :key="index"
                    @click="selectTag(item)" :label="item.channelName"></el-radio-button>
                </el-radio-group>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">关  闭</el-button>
        </span>
     </el-dialog>

     <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callUpdateLandPageAllocationList">保 存</el-button>
     </div>
 </div>
</template>

<script>
import Vue from 'vue';
 export default {
   data () {
     return {
          activeName:'落地页',
          renderData:[
               {
                   label:'落地页',
                   tableList:[]
               },
               {
                   label:'App内嵌页',
                   tableList:[]
               },
        ],
         dialogForm:{},
         dialogVisible:false,
         tableData:[],
         channelNameList:[],
         serverUrl:'',
     }
   },
   created(){
        this.callGetLandPageAllocationList();
        this.$store.dispatch('callConstantValue', 'serverUrl').then(constantValue => {
            this.serverUrl = constantValue;
        })

       
   },
   methods: {
       selectTag(item){
           Vue.set(this.dialogForm,'selectedChannel',item.channelName);
       },
       showDialog(row){
           this.dialogVisible = true;
           this.dialogForm = {};
           this.dialogForm = row;
           this.callGetChannelListByLandPageId(row.landPageId);
       },
       callGetLandPageAllocationList() {
           let paramJson = {
           };
           sendPost(urls.getLandPageAllocationList, {data: JSON.stringify(paramJson)},(resultJson)=>{
               this.renderData[0].tableList = resultJson.resultData.landPageOneList;
               this.renderData[1].tableList = resultJson.resultData.landPageTwoList;
           });
       },
       callUpdateLandPageAllocationList() {
           let paramJson = {
               setting: [...JSON.parse(JSON.stringify(this.renderData[0].tableList)),
               ...JSON.parse(JSON.stringify(this.renderData[1].tableList))
               ],
           };
           paramJson.setting.forEach(element => {
               element.remark = encodeURIComponent(element.remark);
               element.landPageUrl = encodeURIComponent(element.landPageUrl);
           });
           sendPost(urls.updateLandPageAllocationList, {data: JSON.stringify(paramJson)},(resultJson)=>{
              successToast(resultJson.resultMsg,()=>{
                  this.callGetLandPageAllocationList();
              });
           });
       },
       callGetChannelListByLandPageId(landPageId) {
           let paramJson = {
               landPageId: landPageId,
           };
           sendPost(urls.getChannelListByLandPageId, {data: JSON.stringify(paramJson)},(resultJson)=>{
               this.channelNameList = resultJson.resultData.channelNameList || [];
           });
       },
   },
    computed:{
       myHostUrl(){
            var host = window.location.host;
            if(isNull(this.serverUrl)) {
                return '';
            }
           if(this.serverUrl == 'http://test.520daikuan.com') {
                if(host.includes('localhost') || host.includes('192')) {
                     return 'http://test.520daikuan.com';
                }
                return this.serverUrl;
           }
           else {
               return  window.location.protocol + '//'+ host;
           }
           return ''
       }
   },
 }
</script>

<style lang="scss" scoped>
    /deep/ .el-radio-group .el-radio-button__inner{
        margin: 10px;
        border:1px solid rgb(220, 223, 230);
    }
    /deep/ .el-radio-group .is-active .el-radio-button__inner{
        margin: 10px;
        border:none;
    }
</style>
