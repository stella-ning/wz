<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="任务id">
            <el-input class="nn-input-s" v-model="form.adsTaskId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
            <el-input class="nn-input-s" v-model="form.adsTaskName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
            <el-select v-model="form.taskType" placeholder="请选择">
                <el-option v-for="item in [{label: '全部', value: '', },...taskTypeList]" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="触发类型">
            <el-select v-model="form.strikeType" placeholder="请选择">
                <el-option v-for="item in [{ label: '全部',value: '',},...strikeTypeList]" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="form.adsTaskStatus" placeholder="请选择">
                <el-option v-for="item in [{label:'全部',value:''},...this.adsTaskStatusList]" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-plus" @click="showAddDialog(false)">新增任务</el-button>
             <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="任务名称" prop="adsTaskName">
                </el-table-column>
                <el-table-column label="任务id" prop="adsTaskId">
                </el-table-column>
                <el-table-column label="任务类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.taskType | getLabelByValue(taskTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.adsTaskStatus | getLabelByValue(adsTaskStatusList)}}
                    </template>
                </el-table-column>
                <el-table-column label="触发类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.strikeType | getLabelByValue(strikeTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="修改时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.updateTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddDialog(true,scope.row)">编辑</el-button>
                        <el-button type="text" @click="showConfirmDelDialog(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>

        </div>
    </el-form>
    <!-- 新增/编辑任务 -->
    <el-dialog title="新增/编辑任务" :visible.sync="addDialogVisible" top="4vh" width="70%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addDialogForm" :model="addDialogForm" label-width="200px" :inline="true   " align="left" :rules="addDialogRules">
            <p class="nn-form_subtitle mb-20" style="margin-top:0;">基础信息</p>
            <el-form-item label="任务id" prop="adsTaskId">
                <span v-if="isEdit">{{addDialogForm.adsTaskId}}</span>
                <el-input v-else class="nn-input-s mr-10" v-model="addDialogForm.adsTaskId" placeholder="必填" v-lazyinput="callCheckId"></el-input>
                <el-tag v-if="!isEdit && isIdAvailable == 1 "  class="color-green" type="success">id可用</el-tag>
            </el-form-item>
            <el-form-item label="任务名称" prop="adsTaskName">
                <el-input class="nn-input-s" v-model="addDialogForm.adsTaskName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="任务类型" prop="taskType">
                <el-select v-model="addDialogForm.taskType" placeholder="请选择" :disabled="true">
                    <el-option v-for="item in taskTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="adsTaskStatus">
                <el-select v-model="addDialogForm.adsTaskStatus" placeholder="请选择">
                    <el-option v-for="item in adsTaskStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否展示在福利中心任务列表" prop="welfareCenter">
                <el-select v-model="addDialogForm.welfareCenter" placeholder="请选择">
                    <el-option v-for="item in welfareCenterList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="addDialogForm.welfareCenter == 1" label="任务列表展示的标题">
                <el-input class="nn-input-s" v-model="addDialogForm.taskTitleOne" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-if="addDialogForm.welfareCenter == 1" label="任务列表展示的副标题">
                <el-input class="nn-input-s" v-model="addDialogForm.taskTitleTwo" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-if="addDialogForm.welfareCenter == 1" label="任务列表的排序">
                <el-input class="nn-input-s" v-model="addDialogForm.taskSort" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-if="addDialogForm.welfareCenter == 1" label="按钮文案">
                <el-input class="nn-input-s" v-model="addDialogForm.buttonName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="任务列表展示的图标">
                 <VPickSelect :fileType="7"  width="80px" height="80px"   subTips="选择图片" @onUploadSuccess="onUploadSuccessLogo" class="pic-selecter" :logoImageUrl="addDialogForm.imgUrl"></VPickSelect>
            </el-form-item>
            <div class="nn-form-line-h"></div>
            <p class="nn-form_subtitle mb-20">任务规则</p>
            <el-form-item label="触发类型" prop="strikeType">
                <el-select v-model="addDialogForm.strikeType" placeholder="请选择">
                    <el-option v-for="item in strikeTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务次数" prop="taskNumber">
                <el-input class="nn-input-s" v-model="addDialogForm.taskNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="持续时间" >
                <el-input class="nn-input-s" v-model="addDialogForm.continueTime" placeholder=""></el-input>
            </el-form-item>

            <div class="nn-form-line-h"></div>
            <p class="nn-form_subtitle mb-20">关联的奖励id
                <el-button class="ml-20" size="mini" type="success" icon="el-icon-plus" @click="onAddReward">添加</el-button>
            </p>

            <div class="nn-table-wrapper">
                <el-table class="mt-20 nn-no-overflow-table" :data="addDialogForm.awardList" style="width: 100%" align="left" border  :span-method="objectSpanMethod">
                     <el-table-column label="排序" prop="">
                         <template slot-scope="scope">
                             <el-button :disabled="scope.$index == addDialogForm.awardList.length - 1" size="mini" icon="el-icon-arrow-down" circle @click="onRowUp(scope.row,scope.$index)"></el-button>
                             <el-button :disabled="scope.$index == 0" size="mini" icon="el-icon-arrow-up" circle @click="onRowDown(scope.row,scope.$index)"></el-button>
                              <span class="ml-20">{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                   <el-table-column label="奖励名称" prop="awardName">
                       <template slot-scope="scope">
                           <el-select v-model="scope.row.awardId" placeholder="请选择" @change="onSelectAward(scope.row.awardId)">
                               <el-option
                               v-for="item in allAwardList"
                               :key="item.awardId"
                               :label="item.awardName"
                               :value="item.awardId">
                               </el-option>
                           </el-select>
                       </template>
                    </el-table-column>
                    <el-table-column label="奖励id" prop="awardId">
                    </el-table-column>
                    <el-table-column label="作用用户" prop="">
                        <template slot-scope="scope">
                            {{scope.row.userStatus | getLabelByValue(userStatusList)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onDelTask(scope.row,scope.$index)">删除</el-button>
                             <el-button type="text" @click="onSaveTask(scope.row)">保存</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="排序保存" prop="">
                        <template slot-scope="scope">
                             <el-button class="ml-20" size="small" type="primary"  @click="callTaskAwardSort">保存排序</el-button>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addDialogForm')">保 存</el-button>
        </span>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="confirmDelDialogVisible" width="30%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="confirmDelDialogForm" :model="confirmDelDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">确认删除此任务吗？</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDelDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 导出对话框 -->
    <el-dialog title="导出" :visible.sync="exportDialogVisible" width="40%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">导出条件与筛选条件一致</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="exportDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callExport">确  定</el-button>
       </span>
    </el-dialog>

</div>
</template>

<script>
import VPagination from "@/components/VPagination";
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
export default {
    data() {
        return {
            exportDialogVisible:false,
            exportDialogForm:{},
            allAwardList:[],
            isIdAvailable:0,
            paramJson:{},
            tableDataDialog: [],
            totalPageCount: 0,
            tableData: [],
            confirmDelDialogVisible: false,
            confirmDelDialogForm: {},
            isEdit: false,
            addDialogVisible: false,
            addDialogForm: {
                awardList:[],
            },
            addDialogRules: {
                adsTaskId: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsTaskName: [{
                    required: true,
                    message: '请填写信息'
                }],
                taskType: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsTaskStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
                welfareCenter: [{
                    required: true,
                    message: '请填写信息'
                }],
                strikeType: [{
                    required: true,
                    message: '请填写信息'
                }],
                taskNumber: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            form: {},
            taskTypeList: [ {
                label: '签到任务',
                value: 1
            }, {
                label: '基础任务',
                value: 2
            }, {
                label: '普通任务',
                value: 3
            }, {
                label: '游戏页任务',
                value: 4
            }, {
                label: '新人任务',
                value: 5
            },],
            strikeTypeList: [ {
                label: '单次',
                value: 1
            }, {
                label: '每天',
                value: 2
            }, {
                label: '每x天',
                value: 3
            }, {
                label: '每x次',
                value: 4
            }, ],
            adsTaskStatusList: [{
                label: '上线',
                value: 1
            }, {
                label: '下线',
                value: 2
            }, ],
            welfareCenterList: [{
                label: '是',
                value: 1
            }, {
                label: '否',
                value: 2
            }, ],
            userStatusList: [{
                label: '全部',
                value: 0,
            }, {
                label: '新用户',
                value: 1
            }, {
                label: '老用户',
                value: 2
            }, ],
        }
    },
    mounted(){
        this.callGetAwardList();
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        showExportDialog(){
            this.exportDialogVisible = true;
        },
        onUploadSuccessLogo(imgUrl,index){
              Vue.set(this.addDialogForm,'imgUrl',imgUrl) 
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(columnIndex == 5) {
                return {
                    rowspan: this.addDialogForm.awardList.length,
                    colspan: 1
                };
            }
            // else {
            //     return {
            //         rowspan: 0,
            //         colspan: 0
            //      };
            // }
        },
        onSelectAward(awardId){
            let row = this.allAwardList.find(item=>item.awardId == awardId);
            // let temp = this.addDialogForm.awardList.find(item=>item.awardId == awardId);
            this.addDialogForm.awardList.forEach(element => {
                if(element.awardId == awardId) {
                    element.awardId = row.awardId;
                    element.userStatus = row.userStatus;   
                }
            });
        },
        onSaveTask(row){
            this.callAddTaskAward(row);
        },
        onDelTask(row,index){
            if(row.isNew) {
                this.addDialogForm.awardList.splice(index,1)
            }
            else {
                this.callDeleteTaskAwardByAwardId(row,()=>{
                      this.addDialogForm.awardList.splice(index,1)
                });
            }
        },
        swapArray(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        },
        onRowUp(row,index){
            let arr = this.addDialogForm.awardList;
            let length = arr.length;
            if(index+1 != length){
                this.swapArray(arr, index, index+1);
            }else{
                warningToast('已经处于置顶，无法上移');
            }
            this.updateIndex();
        },
        onRowDown(row,index){
            let arr = this.addDialogForm.awardList;
            let length = arr.length;
            if(index!= 0){
                this.swapArray(arr, index, index-1);
            }else{
                warningToast('已经处于置底，无法下移');
            }
            this.updateIndex();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateAdsTask();
                }
            })
        },
        showConfirmDelDialog(row) {
            this.confirmDelDialogVisible = true;
        },
        showAddDialog(isEdit, tempRow = {}) {
            this.addDialogVisible = true;
            this.isEdit = isEdit;
            this.addDialogForm = {
                awardList:[],
                taskType:3,
            };
            let  row = JSON.parse(JSON.stringify(tempRow));
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addDialogForm, key, element)
                }
            }
            // if (!isEdit) {
            //     for (var key in this.addDialogForm) {
            //          var element = row[key];
            //          if(isArray(element)) {
            //               Vue.set(this.addDialogForm, key, [])
            //          }
            //          else {
            //              Vue.set(this.addDialogForm, key, '')
            //          }
                    
            //     }
            // }
            if(isNumber(this.addDialogForm.continueTime)) {
                 this.addDialogForm.continueTime = this.addDialogForm.continueTime /1000;
            }

        },
        onAddReward() {
            this.addDialogForm.awardList.push({
                adsTaskStatus:'',
                awardId:'',
                isNew:true,
            });
            this.updateIndex();
           
        },
        updateIndex(){
             this.addDialogForm.awardList.forEach((element,index) => {
                 element.unionSort = index + 1;
            });
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            this.paramJson = paramJson;
            sendPost(urls.getAdsTaskList, {data: JSON.stringify(paramJson)},(resultJson)=>{
               this.tableData = resultJson.resultData.adsTaskList;
               this.totalPageCount = resultJson.resultData.count;
            });
        },
        //根据广告任务ID获取奖励列表
        callGetAwardListByAdsTaskId() {
            if(!this.isEdit) {
                return;
            }
            let paramJson = {
                adsTaskId: this.addDialogForm.adsTaskId,
            };
            sendPost(urls.getAwardListByAdsTaskId, {data: JSON.stringify(paramJson)},(resultJson)=>{
                Vue.set(this.addDialogForm,'awardList',resultJson.resultData.awardList);
            });
        },
        //检查id
        callCheckId() {
            let paramJson = {
                id: this.addDialogForm.adsTaskId,
            };
            if(isNull(this.addDialogForm.adsTaskId)) {
                this.isIdAvailable = 0;
                return;
            }
            sendNoLoadingPost(urls.adsTaskCheckId, {data: JSON.stringify(paramJson)},(resultJson)=>{
                if(resultJson.resultData.checkState == 2) {
                     this.isIdAvailable = 2;
                     this.addDialogForm.adsTaskId = '';
                     warningToast('id不可用');
                }
                else {
                     this.isIdAvailable = 1;
                }
            });
        },
        //更新广告任务记录
        callUpdateAdsTask() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addDialogForm))
            };
            paramJson.continueTime = paramJson.continueTime *1000;
            sendPost(urls.updateAdsTask, {data: JSON.stringify(paramJson)},(resultJson)=>{
               successToast(resultJson.resultMsg,()=>{
                    this.addDialogVisible = false;
                    this.callTableData(this.paramJson)
               });
            });
        },
        //添加任务奖励
        callAddTaskAward(row) {
            let paramJson = {
               adsTaskId : this.addDialogForm.adsTaskId,
               awardId:row.awardId
            };
            sendPost(urls.addTaskAward, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    row.isNew = false;
                });
            });
        },
        //获取奖励列表
        callGetAwardList() {
            let paramJson = {
            };
             sendPost(urls.getAwardList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.allAwardList = resultJson.resultData.awardList;
            });
        },
        //根据奖励ID删除任务奖励
        callDeleteTaskAwardByAwardId(row,fn) {
            let paramJson = {
                adsTaskId: this.addDialogForm.adsTaskId,
                awardId:row.awardId
            };
            sendPost(urls.deleteTaskAwardByAwardId, {data: JSON.stringify(paramJson)},(resultJson)=>{
               successToast(resultJson.resultMsg,()=>{
                   if(fn){
                       fn();
                   }
               });
            });
        },
        //任务奖励排序
        callTaskAwardSort() {
            let paramJson = {
                adsTaskId:this.addDialogForm.adsTaskId,
                awardList: this.addDialogForm.awardList.filter(item=>item.awardId > 0),
            };
            sendPost(urls.taskAwardSort, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.callGetAwardListByAdsTaskId();
                });
            });
        },
         //导出
        callExport(url, params = {}) {
            var paramJson = this.paramJson;
            sendDownLoad(urls.exportAdsTaskList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                 this.exportDialogVisible = false;
            });
        },
    },
    computed: {
    },
    watch:{
        addDialogVisible(){
            if(this.addDialogVisible) {
                this.callGetAwardListByAdsTaskId();
            }
        }
    },
    components: {
        VPagination,
        VPickSelect
    }
}
</script>

<style lang="scss" scoped>

</style>
