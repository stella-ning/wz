<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="权益产品名称">
            <el-input class="nn-input-s" v-model="form.productName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="所属权益品牌">
            <el-input class="nn-input-s" v-model="form.benifitName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="有效期开始时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePickStart"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="品牌供应商">
            <el-input class="nn-input-s" v-model="form.benifitSupplier" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="有效期结束时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePickEnd"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="卡密号">
            <el-input class="nn-input-s" v-model="form.cdkey" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="销售状态">
            <el-select v-model="form.saleState" placeholder="请选择">
                <el-option v-for="item in saleStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="过期状态">
            <el-select v-model="form.expiryState" placeholder="请选择">
                <el-option v-for="item in expiryStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="卡密类型">
            <el-select v-model="form.importType" placeholder="请选择">
                <el-option v-for="item in importTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="">
            <el-button type="primary" @click="showSetOverdueDialog">手动将到时间的卡密调整为过期状态</el-button>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-download" @click="showImportCdkeyDialog">导入卡密号</el-button>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>

        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="卡密号" prop="cdkey">
                </el-table-column>
                <el-table-column label="会员权益产品" prop="productName">
                </el-table-column>
                <el-table-column label="所属权益品牌" prop="benifitName">
                </el-table-column>
                <el-table-column label="品牌供应商" prop="benifitSupplier">
                </el-table-column>
                <el-table-column label="添加时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="销售状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.saleState| getLabelByValue(saleStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="过期状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.expiryState| getLabelByValue(expiryStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="有效期开始时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.startTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="有效期结束时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.endTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="密码" prop="cdkey">
                    <!-- <template slot-scope="scope">
                        <span v-if="type == 0">{{scope.row.cdkey}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column label="卡的url" prop="" min-width="120">
                        <template slot-scope="scope">
                            <a target="_blank" v-if="scope.row.type == 1" class="text-blue" :href="scope.row.url" >{{scope.row.url}}</a>
                        </template>
                </el-table-column>
                <el-table-column label="卡密类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.importType | getLabelByValue(importTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作管理员账号名" prop="operator">
                </el-table-column>
                <el-table-column label="操作" prop="" min-width="250">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.saleState == 1" type="text" @click="showSetSaleOverdueDialog(scope.row)">手动操作销售状态为【已售出】</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
    <!-- 导入卡密号 -->
    <el-dialog title="导入卡密号" :visible.sync="importCdkeyDialogVisible" width="40%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="importCdkeyDialogForm" :model="importCdkeyDialogForm" label-width="180px" :inline="false" align="left">
            <el-form-item label="1、下载导入的表格文件">
               <el-button type="warning" @click="callDownloadExcel">下载文件</el-button>
            </el-form-item>
            <el-form-item label="2、上传导入的表格文件">
                <VUploadFile btnText="选择导入" @onSuccess="onUploadSuccess" @onRemoveFile="onRemoveFile"></VUploadFile>
                <el-button  v-if="isUploadSuccess && btnClickTime == 0" type="text" @click="callImportBenifitCdkeyList">确认导入</el-button>
                <el-button v-else-if="isUploadSuccess && btnClickTime != 0" type="text" :disabled="true">还剩{{(WAIT_TIME-btnClickTime)/1000}}秒可操作</el-button>
            </el-form-item>
            <p>注意：单次导入卡密数据条数不可超过10000条。</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="importCdkeyDialogVisible = false">关 闭</el-button>
        </span>
    </el-dialog>
    <!-- 导入卡密失败 -->
    <el-dialog title="导入卡密号结果：" :visible.sync="importExcelFailDialogVisible" width="50%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="importExcelFailDialogForm" :model="importExcelFailDialogForm" label-width="250px" :inline="false" align="left">
            <el-form-item label="1、本次导入数据2000条">
            </el-form-item>
            <el-form-item label="2、成功1900条">
            </el-form-item>
            <el-form-item label="3、失败100条">
                <el-button type="danger">下载失败文件</el-button>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="importExcelFailDialogVisible = false">关  闭</el-button>
       </span>
    </el-dialog>
   
     <!-- 手动将到时间的卡密调整为过期状态 -->
     <el-dialog title="手动将到时间的卡密调整为过期状态" :visible.sync="setOverdueDialogVisible" width="40%"  class="ta-l" :close-on-click-modal="false">
         <el-form ref="setOverdueDialogForm" :model="setOverdueDialogForm" label-width="140px" :inline="false" align="left">
              <p class="ta-c">是否手动将到时间的卡密调整为过期状态？</p>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="setOverdueDialogVisible = false">关  闭</el-button>
             <el-button type="primary" @click="callUpdateCdkeyExpiryState">确  定</el-button>
        </span>
     </el-dialog>
    <!-- 手动操作销售状态为【已过期】 -->
    <el-dialog title="手动操作销售状态为【已售出】" :visible.sync="setSaleOverdueDialogVisible" width="40%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="setSaleOverdueDialogForm" :model="setSaleOverdueDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">是否手动操作卡密号为（{{setSaleOverdueDialogForm.cdkey}}）的销售状态为【已售出】？</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setSaleOverdueDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callUpdateCdkeySaleState">确  定</el-button>
       </span>
    </el-dialog>
    
   
    
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import VUploadFile from '@/components/custom/VUploadFile'
export default {
    data() {
        return {
            serverUrl:'',
            importExcelFailDialogVisible:false,
            importExcelFailDialogForm:{},
            setSaleOverdueDialogVisible:false,
            setSaleOverdueDialogForm:{},
            setOverdueDialogVisible:false,
            setOverdueDialogForm:{},
            isUploadSuccess:false,
            excelPath:'',
            importCdkeyDialogVisible: false,
            importCdkeyDialogForm: {},
            totalPageCount: 0,
            tableData: [],
            form: {},
            saleStateList: [{
                label: '全部',
                value: ''
            }, {
                label: '未售出',
                value: 1
            }, {
                label: '已售出',
                value: 2
            }, ],
            expiryStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '未过期',
                value: 1
            }, {
                label: '已过期',
                value: 2
            }, ],
            importTypeList: [{
                label: '全部',
                value: ''
            }, {
                label: '手动导入',
                value: 1
            }, {
                label: 'API导入',
                value: 2
            }, ],
            paramJson:{},
            btnClickTime:0,
            WAIT_TIME:10000,
        }
    },
    mounted(){
         this.$store.dispatch('callConstantValue', 'serverUrl').then(constantValue => {
            this.serverUrl = constantValue;
        })
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
         showImportExcelFailDialog(){
            this.importExcelFailDialogVisible = true;
        },
        showSetSaleOverdueDialog(row){
            this.setSaleOverdueDialogVisible = true;
            this.setSaleOverdueDialogForm = {...row}
        },
        showSetOverdueDialog(){
         this.setOverdueDialogVisible = true;
        },
        onUploadSuccess(filePath){
            this.isUploadSuccess = true;
            this.excelPath = filePath;
        },
        onRemoveFile(){
            this.isUploadSuccess = false;
        },
        showImportCdkeyDialog() {
            this.importCdkeyDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickStart(timeStart, timeEnd) {
            this.form.startTimeStart = timeStart;
            this.form.startTimeEnd = timeEnd;
        },
        onTimePickEnd(timeStart, timeEnd) {
            this.form.endTimeStart = timeStart;
            this.form.endTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            this.paramJson = paramJson;
            sendPost(urls.getBenifitCdkeyList, {data: JSON.stringify(paramJson)},(resultJson)=>{
               this.tableData = resultJson.resultData.benifitCdkeyList;
               this.totalPageCount = resultJson.resultData.benifitCdkeyCount;
            });
        },
        callDownloadExcel(url, params = {}) {
            let downloadUrl= this.myHostUrl + '/file/fy/resource/卡密模板.xls';
             window.open(downloadUrl)
            // var paramJson = {
            // };
            // sendDownLoad(urls.exportMembershipCardList, {
            //     data: JSON.stringify(paramJson)
            // }, (resultJson) => {

            // });
        },
        //手动更新卡密过期状态
        callUpdateCdkeyExpiryState() {
            let paramJson = { };
            sendPost(urls.updateCdkeyExpiryState, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                     this.setOverdueDialogVisible = false;
                     this.callFirstPage();
                });
            });
        },
        //修改权益卡密销售状态
        callUpdateCdkeySaleState() {
            let paramJson = {
                benifitCdkeyId: this.setSaleOverdueDialogForm.benifitCdkeyId,
                userId:'',//接口统一上传
            };
            sendPost(urls.updateCdkeySaleState, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 successToast(resultJson.resultMsg,()=>{
                     this.setSaleOverdueDialogVisible = false;
                     this.callTableData(this.paramJson);
                 });
            });
        },
        //导入权益卡密列表
        callImportBenifitCdkeyList(filePath) {

            if(this.btnClickTime > 0) {
                return;
            }

            this.btnClickTime += 1000;
            let timer = setInterval(() => {
                this.btnClickTime += 1000;
                if(this.btnClickTime  == this.WAIT_TIME) {
                    clearInterval(timer)
                    this.btnClickTime = 0;
                }
            }, 1000);

            let paramJson = {
                excelPath: this.excelPath,
            };
            sendDownLoad(urls.importBenifitCdkeyList, {data: JSON.stringify(paramJson)},(resultJson)=>{
               
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
   watch:{
       importCdkeyDialogVisible(){
           if(!this.importCdkeyDialogVisible ) {
               this.callTableData(this.paramJson)
           }
       }
   },
    components: {
        VDateRangePicker,
        VPagination,
        VUploadFile
    }
}
</script>

<style lang="scss" scoped>

 
</style>
