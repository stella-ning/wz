<template>
    <div>
        <!-- <el-input class="nn-input-s" v-model="inputValue" @click.native="showDialog()">
             <span @click.stop style="margin-right:5px;" v-for="(item, index) in selectchannelNameList" :key="index" slot="prefix" class="el-tag el-tag--info el-tag--small"><span class="el-select__tags-text">{{item}}</span><i class="el-tag__close el-icon-close" @click="delItem(item)"></i></span>
        </el-input> -->
        <div v-show="isList" class="channel-name-cell" @click="showDialog()" >
            <span class="placeholderText" v-if="selectchannelNameList.length == 0">请选择渠道号</span>
            <span v-else   @click.stop style="margin:5px 5px 0 5px;" v-for="(item, index) in selectchannelNameList" :key="index" slot="prefix" class="el-tag el-tag--info el-tag--small"><span class="el-select__tags-text">{{item}}</span><i class="el-tag__close el-icon-close" @click="delItem(item)"></i></span>
        </div>
        <a style="cursor:pointer;" v-show="selectchannelNameList.length > 0 && isShowList" class="el-icon-circle-close-outline mr-20" type="text" @click="removeAllItem">&nbsp;清空渠道</a>
        <div v-show="!isList">
            <el-input  class="nn-input-s" v-model="inputValue" placeholder="请输入渠道号"></el-input>
        </div>
        <a v-if="isShowList" style="cursor:pointer;" @click="isList = !isList"><i class="el-icon-refresh"></i>{{isList?'&nbsp;切换到手动输入':'&nbsp;切换到列表筛选'}}</a>
        
        <el-dialog title="选择渠道数据" :visible.sync="channelDialogVisible" width="45%" top="15vh" :append-to-body="true" :close-on-click-modal="false">
            <div class="block">
                <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
                    <el-form-item label="渠道名">
                        <el-input class="nn-input-s"  v-lazyinput="onLazyInput" v-model="form.channelName"> 
                        </el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" :icon="searchIcon"  @click="callFirstPage">搜索 </el-button>
                    </el-form-item>
                     <li style="margin-left: 30px;">
                        <el-checkbox v-model="allChecked" style="width:100%;" @change="onAllCheckChang">全选</el-checkbox>
                    </li>
                    <ul v-if="tableData.length > 0" class="channel-list mt-20">
                         <li v-for="(item, index) in tableData" :key="index">
                              <el-checkbox v-model="tempSet[item.channelName]" style="width:100%;"
                              :disabled="single && selectchannelNameList.length>0 && !tempSet[item.channelName]"
                              @change="checkChange(item)">{{item.channelName}}</el-checkbox>
                         </li>
                    </ul>
                    <p v-else class="ta-c text-gray mt-20">暂无数据</p>
                    
                    <!--分页-->
                    <div  class="mt-20">
                        <VPagination  ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount"  @callTableData= "callTableData" ></VPagination>
                    </div>
                    
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="channelDialogVisible = false">好 了</el-button>
                <!-- <el-button type="primary" @click="onConfirm">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
     
</template>

<script>
 import VPagination from "@/components/VPagination";
 import Vue from 'vue';
 export default {
   data () {
     return {
        form:{},
        totalPageCount: 0,
        tableData: [],
        list: [],
        inputValue:'',
        selectchannelNameList: [],
        channelDialogVisible:false,
        tempSet:{},
        isList:true,
        allChecked:false,
        isLoading:false,
     }
   },
   methods: {
      onLazyInput(){
          this.callFirstPage();
      },
      onAllCheckChang(value) {
          if(this.single){
              warningToast('该项只支持选择单个');
              this.allChecked = false;
              return
          }
          this.tableData.forEach(element => {
              this.tempSet[element.channelName] = value;
          });
      }, 
      removeAllItem() {
           this.selectchannelNameList = [];
            this.tempSet = {};
      },
      delItem(item){
            var itemIndex = this.selectchannelNameList.findIndex((value, index, arr) => {
                return value == item;
            })
            if(itemIndex >= 0) {
                this.selectchannelNameList.remove(itemIndex);
                Vue.set(this.tempSet,item,false);
            }
           
       },
       checkChange(item) {
           console.log('aaa');
           return;
        //    Vue.set(this.tempSet,item.channelName,item.checked);
       },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson.channelName = this.form.channelName;
            this.isLoading = true;
            // sendNoLoadingPost( urls.getMarketChannelName, { data: JSON.stringify(paramJson) }, (resultJson)=> {
            //         this.isLoading = false;
            //         this.tableData = resultJson.resultData.channelList;
            //         this.totalPageCount = resultJson.resultData.channelListCount;    
            //         this.tableData.forEach(element => {
            //             if(isNull(this.tempSet[element.channelName])) {
            //                 Vue.set(this.tempSet,element.channelName,false);
            //             }
            //         });
            //  },() => {
            //      this.isLoading = false;
            //  });
        },
       showDialog(){
           this.channelDialogVisible = true;
       },
       onConfirm(){
           this.channelDialogVisible = false;
       },
       onSelect(){
           this.$emit('onSelect',this.selectchannelNameList);
       },
    
   },
   created(){
       if(!this.isShowList) {
           this.isList = false;
       }
   },
   mounted(){
       for (let index = 0; index < 50; index++) {
           this.tableData.push({
               value:'条目' + (index + 1),
               value:index
           });
           
       }
   },
   watch:{
       tempSet: {
           handler() {
                // console.log('tempSet:');
                // console.log(this.tempSet);
                this.selectchannelNameList = [];
                for (const key in this.tempSet) {
                    if (this.tempSet.hasOwnProperty(key)) {
                        const element = this.tempSet[key];
                        if(element) {
                            this.selectchannelNameList.push(key);
                        }
                    }
                }
                this.onSelect();
               
           },
           deep:true,
       },
       tableData:{
           handler(){
                var checkedCout = 0;
                this.tableData.forEach(element => {
                    if(this.tempSet[element.channelName]) {
                        checkedCout ++;
                    }
                });
                if(checkedCout == this.tableData.length) {
                    this.allChecked = true;
                }
                else {
                    this.allChecked = false;
                }
           },
           deep:true,
       },
       channelDialogVisible(){
            if(this.channelDialogVisible) {
                setTimeout(() => {
                    this.callFirstPage();
                }, 200);
            }
       },
       isList(){
           if(this.isList) {
               this.selectchannelNameList = [];
               this.tempSet = {};
           }
           else {
               this.tempSet = {};
               this.selectchannelNameList = [];
               this.inputValue = '';
           }
       },
       inputValue(){
           if(!this.isList){
               this.selectchannelNameList = [];
               if(!isNull(this.inputValue)) {
                   this.selectchannelNameList.push(this.inputValue);
               }
               this.onSelect();
           }
       }
      
   },
   computed: {
        searchIcon(){
            if(this.isLoading) {
                return 'el-icon-loading'
            }
            else {
                return 'el-icon-search';
            }
        }  
   },
   components: {
        VPagination
    },
    props:{
        isShowList:{
            default:true,
        },
        pageType:String,
        single:Boolean //是否选择单个
    }
   
 }
</script>
<style lang="scss" scoped>
    .channel-name-cell {
        width:300px;
        min-height:36px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        line-height: 32px;
        cursor: pointer;
        // padding: 5px 10px;
        .placeholderText {
            padding-left:15px;
            color:#C0C4CC;
            line-height: 40px;
        }
    }
   .channel-list {
       height: 40vh;
       overflow-x: hidden;
       padding-left: 30px;
       >li {
           border-bottom: 1px solid #DCDFE6;
           label {
               height: 40px;
               line-height: 40px;
           }
       }
   }
</style>

<style lang="scss" >
    .channel-selector {
        .el-select {
            width: 300px;
        }
        .el-select-dropdown {
            height: 60vh;
            .el-select-dropdown__wrap {
                max-height: 60vh;
            }
        }
        .el-select__tags {
            padding-left: 30px;
        }
    }
   
</style>
