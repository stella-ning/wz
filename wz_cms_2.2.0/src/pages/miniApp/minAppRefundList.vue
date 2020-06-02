<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="订单号">
            <el-input class="nn-input-s" v-model="form.input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发起人">
            <el-input class="nn-input-s" v-model="form.input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="审核人">
            <el-input class="nn-input-s" v-model="form.input" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
            <el-select v-model="form.auditState" placeholder="请选择">
                <el-option v-for="item in auditStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="default" @click="showBatchDialog(3)">批量通过</el-button>
            <el-button type="default" @click="showBatchDialog(4)">批量拒绝</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border @selection-change="handleSelectionChange">
                <el-table-column label="" prop="" type="selection">
                </el-table-column>
                <el-table-column label="订单号" prop="orderNo">
                </el-table-column>
                <el-table-column label="订单标记" prop="">
                  <template slot-scope="scope">
                      {{scope.row.orderSign | getLabelByValue(orderSignList)}}
                  </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="">
                  <template slot-scope="scope">
                      {{scope.row.auditState | getLabelByValue(auditStateList)}}
                  </template>
                </el-table-column>
                <el-table-column label="审核人" prop="auditor">
                </el-table-column>
                <el-table-column label="发起人" prop="phone">
                </el-table-column>
                <el-table-column label="支付时间" prop="" width="100">
                    <template slot-scope="scope">
                      {{new Date(scope.row.payCardTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="申请退款时间" prop="" width="100">
                    <template slot-scope="scope">
                         {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="退款状态" prop="">
                    <template slot-scope="scope">
                       {{scope.row.refundState | getLabelByValue(refundStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="描述" prop="refundDesc">
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>

        </div>
    </el-form>

    <el-dialog title="批量操作" :visible.sync="batchDialogVisible" width="40%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="batchDialogForm" :model="batchDialogForm" label-width="140px" :inline="false" align="left">
             <p v-if="auditState == 3" class="ta-c">批量通过{{selectedList.length}}条订单？</p>
              <p v-if="auditState == 4" class="ta-c">批量拒绝{{selectedList.length}}条订单？</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="batchDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callUpdateCardRefundList">确  定</el-button>
       </span>
    </el-dialog>
   
   
</div>
</template>

<script>
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
           batchDialogVisible:false,
           batchDialogForm:{},
           auditState:'',
           totalPageCount: 0,
            tableData: [],
            form: {},
            auditStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '待审核',
                value: 1
            }, {
                label: '通过',
                value: 2
            }, {
                label: '拒绝',
                value: 3
            }, ],
            refundStateList: [{
                label: '成功',
                value: 2
            }, {
                label: '失败',
                value: 3
            }, ],
            orderSignList:[{
                label:'正常',
                value:1
             },{
                 label:'异常',
                value:2
            },{
                 label:'退款',
                value:3
            },],
            selectedList:[],
            paramJson:{}
        }
    },
    mounted(){
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
       showBatchDialog(auditState){
          if(this.selectedList.length == 0) {
              warningToast('请选择订单');
              return;
          }
         this.batchDialogVisible = true;
         this.auditState = auditState;
       },
        handleSelectionChange(val) {
          console.log('val:',val)
          this.selectedList = val;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            this.paramJson = paramJson;
            sendPost(urls.getCardRefundList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                  this.tableData = resultJson.resultData.cardRefundList;
                  this.totalPageCount = resultJson.resultData.cardRefundCount;
            });
        },
        callUpdateCardRefundList() {
            let paramJson = {
                cardRefundIdList: this.selectedList.map(item=>item.cardOrderId),
                auditState:this.auditState,//3：审核通过，4：审核不通过
            };
           
            sendPost(urls.updateCardRefundList, {data: JSON.stringify(paramJson)},(resultJson)=>{
               successToast(resultJson.resultMsg,()=>{
                   this.batchDialogVisible = false;
                   this.callTableData(this.paramJson);
               });
            });
        },
    },
    components: {
        VPagination
    }
}
</script>

<style lang="scss" scoped>

 
</style>
