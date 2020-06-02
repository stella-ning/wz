<template>
 <div class="userList">
     <el-form ref="form" :model="form" label-width="160px" :inline="true" align="left">
          <el-form-item label="用户手机号">
                 <el-input class="nn-input-s" v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="用户真实姓名">
             <el-input class="nn-input-s" v-model="form.realName" placeholder="请输入用户真实姓名（模糊搜索）"></el-input>
          </el-form-item>
          <el-form-item label="用户注册时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickRegister"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户注册渠道">
                <ChannelSelector :isShowList="false" @onSelect="onRegisterChannel"></ChannelSelector>
          </el-form-item>
           <el-form-item label="用户最近登录App时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickLastLogin"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户登录App平台">
             <PlatformSelector @onPlatformSelect="onPlatformSelect"></PlatformSelector>
          </el-form-item>
          <el-form-item label="用户首次登录App时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickFistLogin"></VDateRangePicker>
          </el-form-item>
         <el-form-item label="用户最近登录App渠道">
                <ChannelSelector type="datetime" :isShowList="false" @onSelect="onLastLoginChannel"></ChannelSelector>
          </el-form-item>
           <el-form-item label="用户成功支付卡时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickPayCard"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户返佣分组">
                 <el-select v-model="form.commissionGroup" placeholder="请选择">
                     <el-option
                     v-for="item in commissionGroupList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                     </el-option>
                 </el-select>
          </el-form-item>
          <el-form-item label="用户成功激活卡时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickActivateCard"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户是否支付会员卡">
                 <el-select v-model="form.payCardState" placeholder="请选择">
                     <el-option
                     v-for="item in payCardStateList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                     </el-option>
                 </el-select>
                 
          </el-form-item>
            <el-form-item label="会员成功完成0元购首单时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickFirstTrade"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户是否已激活会员卡">
                 <el-select v-model="form.activateCardState" placeholder="请选择">
                     <el-option
                     v-for="item in activateCardStateList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                     </el-option>
                 </el-select>
          </el-form-item>
        <el-form-item label="用户完成【50元红包】刮奖时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickScratchTime"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户是否已在0元购完成首单">
              <el-select v-model="form.firstTradeState" placeholder="请选择">
                  <el-option
                  v-for="item in firstTradeStateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
            <el-form-item label="用户完成首单时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickFirstOrder"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户是否完成【50元红包】刮奖">
                 <el-select v-model="form.scratchState" placeholder="请选择">
                  <el-option
                  v-for="item in firstTradeStateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
           <el-form-item label="用户完成第2单时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickSecondOrder"></VDateRangePicker>
          </el-form-item>
           <el-form-item label="用户最近打开app的时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickLastOpenApp"></VDateRangePicker>
          </el-form-item>
           <el-form-item label="首次达到提现资格时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickFirstWithdrawable"></VDateRangePicker>
          </el-form-item>
          <el-form-item label="用户绑定的淘宝账号" class="mr-20">
             <el-input class="nn-input-s" v-model="form.taobaoUserNick" placeholder=""></el-input>
               <el-checkbox v-model="form.showTbNick">勾选生效</el-checkbox>
          </el-form-item>
          <el-form-item label="" style="padding-top:4px;">
                <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
               <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出用户手机号</el-button>
          </el-form-item>
          <div class="nn-form-line-h"></div>

          <div class="nn-table-wrapper">
              <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%"  align="left" border>
                    <el-table-column label="用户手机号" prop="phone" width="120">
                    </el-table-column>
                    <el-table-column label="用户真实姓名" prop="realName">
                    </el-table-column>
                    <el-table-column label="用户注册渠道号" prop="registerChannel">
                    </el-table-column>
                    <el-table-column label="用户最近登录app渠道号" prop="loginChannel">
                    </el-table-column>
                    <el-table-column label="用户返佣分组" prop="">
                          <template slot-scope="scope">
                            {{scope.row.commissionGroup | getLabelByValue(commissionGroupList)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户注册时间" prop="" width="100">
                        <template slot-scope="scope">
                             {{new Date(scope.row.registerTime).Format()}}
                        </template>
                    </el-table-column>
                     <el-table-column label="用户成功支付卡时间" prop="" width="100">
                        <template slot-scope="scope">
                             {{new Date(scope.row.payCardTime).Format()}}
                        </template>
                    </el-table-column>
                     <el-table-column label="用户首次登录app时间" prop="" width="100">
                         <template slot-scope="scope">
                             {{new Date(scope.row.appFirstLoginTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户最近登录app时间" prop="" width="100">
                         <template slot-scope="scope">
                             {{new Date(scope.row.lastLoginTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户成功激活卡时间" prop="" width="100">
                         <template slot-scope="scope">
                             {{new Date(scope.row.activateCardTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户最近打开App的时间" prop="" width="100">
                        <template slot-scope="scope">
                            {{new Date(scope.row.lastOpenAppTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户完成首单的时间" prop="" width="100"> 
                        <template slot-scope="scope">
                            {{new Date(scope.row.firstOrderTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户完成第2单时间" prop="" width="100">
                        <template slot-scope="scope">
                            {{new Date(scope.row.secondOrderTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="首次达到提现资格时间" prop="" width="100">
                        <template slot-scope="scope">
                            {{new Date(scope.row.firstWithdrawableTime).Format()}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="用户成功完成0元购首单时间" prop="" width="100">
                         <template slot-scope="scope">
                             {{new Date(scope.row.firstTradeTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户完成【50元红包】刮奖时间" prop="" width="100">
                                    <template slot-scope="scope">
                             {{new Date(scope.row.scratchTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户支付宝账号" prop="alipayAccount" width="120">
                    </el-table-column>
                    <el-table-column label="用户支付宝名称" prop="alipayName" width="100">
                    </el-table-column>
                    <el-table-column v-if="form.showTbNick" label="用户绑定的淘宝账号" prop="taobaoUserNick">
                    </el-table-column>
                    
                  <el-table-column label="用户最近登录App平台" prop="">
                      <template slot-scope="scope">
                          {{scope.row.lastLoginPlatformType | getLabelByValue((platformList))}}
                      </template>
                  </el-table-column>
                  
                    <el-table-column label="用户账户详情" prop="" width="240px">
                         <template slot-scope="scope">
                             <p class="ta-l">【我的金币】账户：{{scope.row.goldAccount}}</p>
                             <p class="ta-l">【待入账】账户：￥{{scope.row.freezeAccount/100 | moneyFormat}}</p>
                             <p class="ta-l">【已入账，可提现】账户：￥{{scope.row.withdrawAccount/100 | moneyFormat}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" prop="" width="140">
                        <template slot-scope="scope" >
                            <el-button type="text" @click="showDialog(scope.row)">调整返佣分组</el-button>
                        </template>
                    </el-table-column>
                    
              </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination  ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount"  @callTableData= "callTableData" ></VPagination>
            </div>
            
          </div>
     </el-form>
     <el-dialog title="调整返佣比例" :visible.sync="dialogVisible" width="40%"   style="text-align: left">
         <el-form ref="dialogForm" :model="dialogForm" label-width="140px" :inline="true" align="left" :rules="dialogRules">
             <el-form-item label="用户账号：" prop="phone">
                 {{dialogForm.phone}}
             </el-form-item>
            <el-form-item label="用户返佣比例" prop="commissionGroup">
                  <el-select v-model="dialogForm.commissionGroup" placeholder="请选择">
                 <el-option
                 v-for="item in [...this.commissionGroupList].splice(1,this.commissionGroupList.length)"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
                 </el-option>
             </el-select>  
            </el-form-item>
             
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false" >关  闭</el-button>
             <el-button type="primary" @click="submitForm('dialogForm')" >确  定</el-button>
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
import VDateRangePicker from "@/components/VDateRangePicker";
import ChannelSelector from "@/components/selector/ChannelSelector";
import PlatformSelector from "@/components/selector/PlatformSelector";
import platformList from '@/components/selector/platformList'
import VPagination from "@/components/VPagination";   
 export default {
   data () {
     return {
         paramJson:{},
         exportDialogVisible:false,
         exportDialogForm:{},
         platformList:platformList,
         dialogVisible:false,
         dialogForm:{},
         tableData:[],
         totalPageCount: 0,
         form:{},
         commissionGroupList:[{
             label:'全部',
             value:''
         },{
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
        payCardStateList:[{
            label:'全部',
            value:'',
        },{
            label:'未支付',
            value:0
        },{
            label:'已支付',
            value:1
        },],
        activateCardStateList:[{
            label:'全部',
            value:'',
        },{
            label:'未激活',
            value:0
         },{
             label:'已激活',
            value:1
        },],
        firstTradeStateList:[{
            label:'全部',
            value:'',
        },{
            label:'未完成',
            value:0
         },{
             label:'已完成',
            value:1
        },],
        menshipCardActivateList:[{
            label:'全部',
            value:'',
        },{
            label:'未完成',
            value:0
         },{
             label:'已完成',
            value:1
        },],
        dialogRules: {
           phone: [{ required: true, message: '请填写信息' }],
           commissionGroup: [{ required: true, message: '请选择返佣比例' }],
        },
     }
   },
   mounted(){
       this.$nextTick(()=>{
           this.callFirstPage();
       })
   },
   methods: {
       showExportDialog(){
            this.exportDialogVisible = true;
       },
       onPlatformSelect(platformName){
           this.form.lastLoginPlatformType  = platformName;  
       },
       onRegisterChannel(selectList){
           this.form.registerChannel = selectList.join('')
       },
       onLastLoginChannel(selectList){
           this.form.lastLoginChannel = selectList.join('')
       },
       showDialog(row){
           this.dialogVisible = true;
           this.dialogForm = {};
           this.dialogForm = row
       },
       onTimePickRegister(timeStart,timeEnd) {
            this.form.registerTimeStart = timeStart;
            this.form.registerTimeEnd = timeEnd;
        },
        onTimePickLastLogin(timeStart,timeEnd) {
            this.form.lastLoginTimeStart = timeStart;
            this.form.lastLoginTimeEnd = timeEnd;
        },
        onTimePickFistLogin(timeStart,timeEnd) {
            this.form.appFirstLoginTimeStart = timeStart;
            this.form.appFirstLoginTimeEnd = timeEnd;
        },
        onTimePickPayCard(timeStart,timeEnd) {
            this.form.payCardTimeStart = timeStart;
            this.form.payCardTimeEnd = timeEnd;
        },
        onTimePickActivateCard(timeStart,timeEnd) {
            this.form.activateCardTimeStart = timeStart;
            this.form.activateCardTimeEnd = timeEnd;
        },
        onTimePickFirstTrade(timeStart,timeEnd) {
            this.form.firstTradeTimeStart = timeStart;
            this.form.firstTradeTimeEnd = timeEnd;
        },
        onTimePickScratchTime(timeStart,timeEnd) {
            this.form.scratchTimeStart = timeStart;
            this.form.scratchTimeEnd = timeEnd;
        },
        onTimePickFirstOrder(timeStart,timeEnd) {
            this.form.firstOrderTimeStart = timeStart;
            this.form.firstOrderTimeEnd = timeEnd;
        },
        onTimePickSecondOrder(timeStart,timeEnd) {
            this.form.secondOrderTimeStart = timeStart;
            this.form.secondOrderTimeEnd = timeEnd;
        },
        onTimePickLastOpenApp(timeStart,timeEnd) {
            this.form.lastOpenAppTimeStart = timeStart;
            this.form.lastOpenAppTimeEnd = timeEnd;
        },
        onTimePickFirstWithdrawable(timeStart,timeEnd) {
            this.form.firstWithdrawableTimeStart = timeStart;
            this.form.firstWithdrawableTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
             paramJson = {...paramJson,...JSON.parse(JSON.stringify(this.form))}
             paramJson.showTbNick = paramJson.showTbNick == true ? 1: 2;
             this.paramJson = paramJson;
             sendPost(urls.getUserList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.userList;
                 this.totalPageCount = resultJson.resultData.userCount;
             });
        },
        callUpdateCommissionGroup(row) {
            let paramJson = {
                phone: row.phone,
                commissionGroup:row.commissionGroup
            };
            sendPost(urls.updateCommissionGroup, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.dialogVisible = false;
                });
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateCommissionGroup(this.dialogForm)
                 }
             })
        },
         //导出
        callExport(url, params = {}) {
            var paramJson = this.paramJson;
            sendDownLoad(urls.exportUserList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                 this.exportDialogVisible = false;
            });
        },
          
   },
   components: {
        VDateRangePicker,
        ChannelSelector,
        PlatformSelector,
        VPagination 
    }
 }
</script>

<style lang="scss" scoped>
    /deep/ .el-form-item__label {
      line-height: 24px;
       vertical-align: middle;
    }
   /deep/ .el-form-item__content {
       vertical-align: middle;
    }
 
</style>
