<template>
<div>
    <el-form ref="form" :model="form" label-width="160px" :inline="true" align="left">
        <el-form-item label="审核单号">
            <el-input class="nn-input-s" v-model="form.approveOrderNo" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="用户最近登录App平台">
        <PlatformSelector @onPlatformSelect="onPlatformSelect"></PlatformSelector>
        </el-form-item>
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.phone" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="审核时间">
            <VDateRangePicker type="datetime"  :timeInterval="30" @onTimePick="onTimePickApprove"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="审核状态">
            <el-select v-model="form.approveState" placeholder="请选择">
                <el-option v-for="item in approveStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
             <el-form-item label="打款时间">
            <VDateRangePicker type="datetime"  :timeInterval="30" @onTimePick="onTimePickRemitTime"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="infoBox">
            <div class="infoCell">
                <p>筛选审核单总额</p>
                <p class="color-red fs-24">+￥{{resultData.sumExtractDepositAmount/100 | moneyFormat}}</p>
            </div>

        </div>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="审核单号" prop="approveOrderNo">
                </el-table-column>
                <el-table-column label="用户账号" prop="phone">
                </el-table-column>
                <el-table-column label="用户支付宝账号和名字" prop="">
                    <template slot-scope="scope">
                        <p>{{scope.row.alipayAccount}}</p>
                        <p>{{scope.row.alipayName}}</p>
                    </template>
                </el-table-column>
                 <el-table-column label="用户真实姓名" prop="" width="120">
                    <template slot-scope="scope">
                         {{scope.row.realName || '-'}}
                    </template>
                </el-table-column>
                <el-table-column label="生成时间" prop="" width="120">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="审核时间" prop="" width="120">
                    <template slot-scope="scope">
                        {{new Date(scope.row.approveTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="打款时间" prop="" width="120">
                    <template slot-scope="scope">
                        {{new Date(scope.row.remitTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="申请提现额度" prop="" width="120">
                    <template slot-scope="scope">
                        ￥{{scope.row.approveAmount/100 | moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.approveState | getLabelByValue(approveStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="审核信息" prop="" min-width="200">
                    <template slot-scope="scope">
                        <!-- <p v-if="scope.row.approveState == 5">{{scope.row.remitRemarks}}</p>
                        <p v-if="scope.row.approveState == 2">{{scope.row.approveRemarks}}</p> -->
                        <div v-if="scope.row.approveState == 5">
                            <p class="ta-l">不通过原因：{{scope.row.remitRemarks}}</p>
                            <p class="ta-l">审核人：{{scope.row.remitName}}</p>
                        </div>
                        <div v-if="scope.row.approveState == 2">
                            <p class="ta-l">原因：{{scope.row.approveRemarks}}</p>
                            <p class="ta-l">审核人：{{scope.row.approveName}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="打款信息" prop="" min-width="200">
                    <template slot-scope="scope">
                        <p class="ta-l">打款流水：{{scope.row.remitTransformNo}}</p>
                        <p class="ta-l">打款经手人：{{scope.row.remitName}}</p>
                    </template>
                </el-table-column>
                  <el-table-column label="用户最近登录App平台" prop="">
                      <template slot-scope="scope">
                          {{scope.row.lastLoginPlatformType | getLabelByValue((platformList))}}
                      </template>
                  </el-table-column>
                <el-table-column label="操作" prop="" min-width="120">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.approveState == 3" type="text"  @click="showApplyDialog(scope.row)">操作审核</el-button>
                        <el-button v-if="scope.row.approveState == 1" type="text" @click="showTransferDialog(scope.row)">操作打款</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
   <!-- 审核提现神申请对话框 -->
   <el-dialog title="审核提现申请" :visible.sync="applyDialogVisible" width="40%"   style="text-align: left">
       <el-form ref="applyDialogForm" :model="applyDialogForm" :rules="dialogRules" label-width="140px" :inline="false" align="left">
            <el-radio class="ml-30" v-model="applyDialogForm.approveState" label="1">审核通过，待打款</el-radio>
           <el-divider ></el-divider>
           <el-radio class="mb-30 ml-30" v-model="applyDialogForm.approveState" label="2" >审核不通过</el-radio>
           <el-form-item v-if="applyDialogForm.approveState == 2" label="审核不通过原因" prop="reason">
              <el-input class="nn-input-s" v-model="applyDialogForm.approveRemarks" placeholder=""></el-input>
           </el-form-item>
            <el-form-item v-if="applyDialogForm.approveState == 2"  label="审核人" prop="reason">
              <el-input class="nn-input-s" v-model="applyDialogForm.approveName" placeholder=""></el-input>
           </el-form-item>
       </el-form>
       <span slot="footer" class="dialog-footer">
           <el-button @click="applyDialogVisible = false">关  闭</el-button>
           <el-button type="primary" @click="callApproveExtractDeposit">确  定</el-button>
      </span>
   </el-dialog>
   <!-- 操作打款对话框 -->
   <el-dialog title="操作打款" :visible.sync="transferDialogVisible" width="40%"   style="text-align: left">
       <el-form ref="transferDialogForm" :model="transferDialogForm" :rules="dialogRules" label-width="140px" :inline="false" align="left">
            <el-radio class="ml-30" v-model="transferDialogForm.approveState" label="5">转账失败</el-radio>
            <el-form-item v-if="transferDialogForm.approveState == 5" class="mt-20" label="原因">
               <el-input type="textarea" class="nn-input-s" v-model="transferDialogForm.remitRemarks" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-if="transferDialogForm.approveState == 5"  label="打款经手人">
                  <el-input class="nn-input-s" v-model="transferDialogForm.remitName" placeholder=""></el-input>
            </el-form-item>
           <el-divider></el-divider>
           <el-radio class="mb-30 ml-30" v-model="transferDialogForm.approveState" label="4" >打款成功</el-radio>
           <el-form-item v-if="transferDialogForm.approveState == 4" label="打款流水" prop="remitTransformNo">
              <el-input class="nn-input-s" v-model="transferDialogForm.remitTransformNo" placeholder=""></el-input>
           </el-form-item>
            <el-form-item v-if="transferDialogForm.approveState == 4" label="打款经手人" prop="remitName">
              <el-input class="nn-input-s" v-model="transferDialogForm.remitName" placeholder=""></el-input>
           </el-form-item>
       </el-form>
       <span slot="footer" class="dialog-footer">
           <el-button @click="transferDialogVisible = false">关  闭</el-button>
           <el-button type="primary" @click="callRemitToAlipayAccount">确  定</el-button>
      </span>
   </el-dialog>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import PlatformSelector from "@/components/selector/PlatformSelector";
import platformList from "@/components/selector/platformList"
import Vue from 'vue'
export default {
    data() {
        return {
            platformList:platformList,
            applyDialogVisible: false,
            applyDialogForm:{
                approveState:"1"
            },
            transferDialogVisible:false,
            transferDialogForm:{
                approveState:"4"
            },
            totalPageCount: 0,
            tableData: [],
            form: {},
            approveStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '审核中',
                value: 3
            }, {
                label: '审核不通过',
                value: 2
            }, {
                label: '审核通过，待打款',
                value: 1
            }, {
                label: '已打款',
                value: 4
            },{
                label:'转账失败',
                value:5
            }, ],
            dialogRules: {
                // reason: [{ required: true, message: '条件不能为空' }],
                // people: [{ required: true, message: '条件不能为空' }],
            },
            resultData:{},
            paramJson:{}
        }
    },
    mounted(){
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        onPlatformSelect(platformName){
           this.form.lastLoginPlatformType  = platformName;
        },
        showApplyDialog(row){
            this.applyDialogVisible = true;
            this.applyDialogForm = {};
            this.applyDialogForm = {...row};
             Vue.set(this.applyDialogForm,'approveState',"1");
        },
        showTransferDialog(row){
            this.transferDialogVisible = true;
            this.transferDialogForm = {};
            this.transferDialogForm = {...row};
            Vue.set(this.transferDialogForm,'approveState',"4");
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickApprove(timeStart, timeEnd) {
            this.form.approveTimeStart = timeStart;
            this.form.approveTimeEnd = timeEnd;
        },
        onTimePickRemitTime(timeStart, timeEnd) {
            this.form.remitTimeStart = timeStart;
            this.form.remitTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
             paramJson = {...paramJson,...this.form}
             this.paramJson = paramJson;
             sendPost(urls.getExtractDepositList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.extractDepositList;
                 this.totalPageCount = resultJson.resultData.extractDepositCount;
                 this.resultData = resultJson.resultData;
             });
        },
        //审批提现
        callApproveExtractDeposit() {
            let paramJson = {
                extractDepositId: this.applyDialogForm.extractDepositId,
                approveState:this.applyDialogForm.approveState,
                approveRemarks:this.applyDialogForm.approveRemarks,
                approveName:this.applyDialogForm.approveName,
                phone:this.applyDialogForm.phone,
            };
            // 审核失败需要填写相关信息
            if( Number(paramJson.approveState) == 2) {
                if(isNull(paramJson.approveRemarks)) {
                    warningToast('请填写审核不通过原因');
                    return false;
                }
                if(isNull(paramJson.approveName)) {
                    warningToast('请填写审核人');
                    return false;
                }
            }

            sendPost(urls.approveExtractDeposit, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.applyDialogVisible = false;
                     this.callTableData(this.paramJson);
                });
            });
        },
        // 打款到支付宝账号
        callRemitToAlipayAccount() {
            let paramJson = {
                extractDepositId: this.transferDialogForm.extractDepositId,
                approveState: this.transferDialogForm.approveState,
                remitTransformNo: this.transferDialogForm.remitTransformNo,
                remitName: this.transferDialogForm.remitName,
                remitRemarks: this.transferDialogForm.remitRemarks,
                phone:this.transferDialogForm.phone,
            };
             // 打款成功校验
            if( Number(paramJson.approveState) == 4) {
                if(isNull(paramJson.remitTransformNo)) {
                    warningToast('清填写打款流水');
                    return false;
                }
                if(isNull(paramJson.remitName)) {
                    warningToast('请填写打款人');
                    return false;
                }
            }
            sendPost(urls.remitToAlipayAccount, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.transferDialogVisible = false;
                    this.callTableData(this.paramJson);
                });
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                 }
             });
        },
        
       
    },
    components: {
        VDateRangePicker,
        VPagination,
        PlatformSelector
    }
}
</script>

<style lang="scss" scoped>
.infoBox {
    .infoDivider {
        display: inline-block;
        width: 1px;
        height: 46px;
        border-right: 1px solid #ECEEF2;
    }

    .infoCell {
        display: inline-block;
        padding: 20px;
        line-height: 36px;
        text-align: center;
    }
}

.mb-30 {
    margin-bottom: 30px;
}

.ml-30 {
    margin-left: 30px;
}

</style>
