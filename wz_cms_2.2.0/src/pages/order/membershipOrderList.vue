<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="订单号">
            <el-input class="nn-input-s" v-model="form.orderNo" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickAddOrder"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="订单状态">
            <el-select v-model="form.orderState" placeholder="请选择">
                <el-option v-for="item in orderStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="渠道名">
            <el-input class="nn-input-s" v-model="form.channelName" placeholder="请输入渠道名"></el-input>
        </el-form-item>
        <el-form-item label="用户支付手机">
             <PlatformSelector @onPlatformSelect="onPlatformSelect"></PlatformSelector>
          </el-form-item>
        <el-form-item label="支付时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickPayCard"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="下单用户">
            <el-input class="nn-input-s" v-model="form.userPhone" placeholder="请输入下单用户"></el-input>
        </el-form-item>
        <el-form-item label="发货时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickDeliver"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="收货人">
            <el-input class="nn-input-s" v-model="form.consignee" placeholder="请输入收货人"></el-input>
        </el-form-item>
        <el-form-item label="激活卡时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickActivateCard"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="收货人手机号">
            <el-input class="nn-input-s" v-model="form.phone" placeholder="请输入收货人手机号"></el-input>
        </el-form-item>
        <el-form-item label="会员卡号">
            <el-input class="nn-input-s" v-model="form.cardNo" placeholder="请输入会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
            <el-select v-model="form.paymentType" placeholder="请选择">
                <el-option v-for="item in paymentTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="下单金额">
            <el-input class="nn-input-xs" v-model="form.paymentMoneyStart" placeholder=""></el-input> ~
            <el-input class="nn-input-xs" v-model="form.paymentMoneyEnd" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="订单标记">
           <el-select v-model="form.orderSign" placeholder="请选择">
               <el-option
               v-for="item in [{label:'全部',value:''},...orderSignList]"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button  type="warning" icon="el-icon-upload2" @click="openExport">导出订单列表给上海云仓</el-button>
            <MembershipOrderListSelectFile text='将上海云仓表格导入' tips='上海上传成功，点击导入' @onSelect="callImportCardOrderList"></MembershipOrderListSelectFile>
            <MembershipOrderListSelectFile text='将深圳云仓表格导入' tips='深圳上传成功，点击导入' @onSelect="callImportCardOrderList2"></MembershipOrderListSelectFile>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>

        <p class="nn-form-line-h"></p>
        <div class="infoBox">
            <p>查询订单合计金额</p>
            <p><span class="fs-18">￥{{cardOrderMoney/100 | moneyFormat}}</span></p>
        </div>
        <p class="nn-form-line-h"></p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="订单号" prop="orderNo" width="120">
                    <template slot-scope="scope">
                         <router-link class="dp-ib" target="_blank" :to="{path:'/order/membershipOrderDetails',query: {cardOrderId:scope.row.cardOrderId}}">
                            <span type="text">{{scope.row.orderNo}}</span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="渠道名" prop="channelName">
                </el-table-column>
                <el-table-column label="订单状态" prop="" >
                    <template slot-scope="scope">
                        {{scope.row.orderState | getLabelByValue(orderStateList)}}
                    </template>
                </el-table-column>
                 <el-table-column label="用户真实姓名" prop="" width="120">
                    <template slot-scope="scope">
                         {{scope.row.realName || '-'}}
                    </template>
                </el-table-column>
                <el-table-column label="订单标记" prop="">
                    <template slot-scope="scope">
                        {{scope.row.orderSign | getLabelByValue(orderSignList)}}
                    </template>
                </el-table-column>
                <el-table-column label="下单用户" prop="userPhone" width="120">
                </el-table-column>
                <el-table-column label="收货人" prop="consignee">
                </el-table-column>
                <el-table-column label="收货人手机号" prop="phone" width="120">
                </el-table-column>
                <el-table-column label="下单时间" prop="" width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="支付时间" prop="" width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.payCardTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="发货时间" prop="" width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.deliverTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="激活卡时间" prop="" width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.activateCardTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="支付类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.paymentType | getLabelByValue(paymentTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="下单商品" prop="">
                    <template slot-scope="scope">
                        <p v-if="scope.row.orderType == 1">会员卡（普通）</p>
                        <p v-if="scope.row.orderType == 2">会员卡（加急</p>
                    </template>
                </el-table-column>
                <el-table-column label="支付金额" prop="">
                    <template slot-scope="scope">
                        ￥{{scope.row.paymentMoney/100 | moneyFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="会员卡号" prop="cardNo" width="100">
                </el-table-column>
                   <el-table-column label="用户支付手机" prop="">
                      <template slot-scope="scope">
                          {{scope.row.appPlatformType | getLabelByValue((platformList))}}
                      </template>
                  </el-table-column>
                <el-table-column label="操作" prop="" width="250">
                    <template slot-scope="scope">
                        <router-link target="_blank" :to="{path:'/order/membershipOrderDetails',query: {cardOrderId:scope.row.cardOrderId}}">
                            <el-button type="text">订单详情</el-button>
                        </router-link>
                        <el-button class="ml-10" type="text" @click="showTagDialog(scope.row)">订单标记</el-button>
                        <el-button v-if="scope.row.orderState == 2" type="text" @click="showDialog(scope.row)">关联会员卡号和物流订单号</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>

    <el-dialog title="导出订单列表给云仓" :visible.sync="exportDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item label="订单付款时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickExport"></VDateRangePicker>
            </el-form-item>
                 <el-form-item label="">
               <!-- <el-select v-model="exportDialogForm.orderTag" placeholder="请选择">
                   <el-option
                   v-for="item in orderSignList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                   </el-option>
               </el-select> -->
               标记为（
                <el-checkbox-group class="dp-ib ml-10" v-model="notOrderSignList">
                    <el-checkbox :label="2">标记异常</el-checkbox>
                    <el-checkbox :label="3">标记退款</el-checkbox>
                </el-checkbox-group>
                 <span class="ml-20">）不导出</span>
            </el-form-item>

            <el-form-item label="">
                <div>
                      <el-checkbox v-model="exportDialogForm.exportChecked">
                           用户地址信息包含以下的
                      </el-checkbox>
                    <el-radio v-model="exportDialogForm.exportType" :label="1">导出</el-radio>
                    <el-radio v-model="exportDialogForm.exportType" :label="2">不导出</el-radio>
                </div>
            </el-form-item>
              <el-form-item v-for="(item,index) in exportDialogForm.areaSoureList" :key="index"  label="">
                  <el-cascader
                    :ref="`addressCascader${index}`"
                        v-model="item.selectArea"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                    ></el-cascader>
                    <el-button type="text" class="color-red ml-20" @click="onDelRow(item,index)">删除</el-button>
            </el-form-item>
            <el-form-item label="">
               <el-button type="text" @click="onAddRow">+ 添加筛选项（省、直辖市、特别行政区级别）</el-button>
            </el-form-item>
            <section class="lh-24 color-999 mt-20 ml-20">
                <p>注：</p>
                <p>1、只导出订单状态为【已付款，待发货】，且下单用户未关联卡号 的订单信息。</p>
                <p>2、若订单付款时间范围内的订单数，大于10000条，则提示：订单信息不可大于10000条。</p>
            </section>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="exportDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callExport">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 订单标记 -->
     <el-dialog title="订单标记" :visible.sync="tagDialogVisible" width="40%"  class="ta-l" :close-on-click-modal="false">
         <el-form ref="tagDialogForm" :model="tagDialogForm" label-width="140px" :inline="false" align="left">
             <el-form-item label="标记为">
                 <el-select v-model="tagDialogForm.orderSign" placeholder="请选择">
                     <el-option
                     v-for="item in orderSignList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                     </el-option>
                 </el-select>
             </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
             <el-button @click="tagDialogVisible = false">关  闭</el-button>
             <el-button type="primary" @click="callUpdateOrderSign">确  定</el-button>
        </span>
     </el-dialog>
    <MembershipOrderBindCardDialog :dialogForm="dialogForm" @onSuccess="onBindSuccess"></MembershipOrderBindCardDialog>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import MembershipOrderBindCardDialog from "@/components/order/MembershipOrderBindCardDialog";
import PlatformSelector from "@/components/selector/PlatformSelector";
import platformList from '@/components/selector/platformList'
import Vue from 'vue'
import MembershipOrderListSelectFile from '@/components/order/MembershipOrderListSelectFile'
export default {
    data() {
        return {
            areaList:require('@/libs/area/addressData').areaList,
            options:[],
            notOrderSignList:[],
            tagDialogVisible:false,
            tagDialogForm:{},
            platformList:platformList,
            
            exportDialogForm: {
                areaSoureList:[{"selectArea":["710000"]},{"selectArea":["810000"]},{"selectArea":["820000"]},{"selectArea":["420000"]}],
                exportType:1
            },
            exportDialogVisible: false,
            paramJson: {},
            cardOrderMoney: 0,
            dialogForm: {
                dialogVisible: false,
            },
            totalPageCount: 0,
            tableData: [],
            form: {},
            orderStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '已下单，待付款',
                value: 1
            }, {
                label: '已付款，待发货',
                value: 2
            }, {
                label: '已发货，待激活卡片',
                value: 3
            }, {
                label: '已激活卡片，订单完成',
                value: 4
            }, ],
            paymentTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: '支付宝支付（h5）',
                value: 1
            }, {
                label: '微信支付（h5）',
                value: 2
            }, {
                label: '微信支付（公众号）',
                value: 3
            }, {
                label: '支付宝支付（原生）',
                value: 4
            }, {
                label: '微信支付支付（原生）',
                value: 5
            }, ],
            excelPath:'',//上传的execl远程文件路径
            orderSignList:[{
                label:'无标记',
                value:1
            },{
                label:'标记异常',
                value:2
            },{
                label:'标记退款',
                value:3
            },]
        }
    },
    created(){
        this.areaList.forEach(element => {
            this.options.push({
                label:element.label,
                value:element.value,
            })
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.callFirstPage();
        });
    },
    methods: {
        onAddRow(){
            this.exportDialogForm.areaSoureList.push({})
        },
        onDelRow(index){
            this.exportDialogForm.areaSoureList.splice(index,1)
        },
        showTagDialog(row){
          this.tagDialogVisible = true;
          this.tagDialogForm = {...row};
        //   if(isNull(row.orderSign)) {
        //        Vue.set(this.tagDialogForm,'orderSign',2)
        //   }
          
        },
        onPlatformSelect(platformName){
           this.form.appPlatformType  = platformName;  
       },
        openExport() {
            this.exportDialogVisible = true;
        },
        onBindSuccess() {
            this.dialogForm.dialogVisible = false;
            this.callTableData(this.paramJson);

        },
        showDialog(row) {
            this.dialogForm = {
                ...this.dialogForm,
                ...row
            };
            this.dialogForm.dialogVisible = true;
             Vue.set(this.dialogForm,'cardNo','');
             Vue.set(this.dialogForm,'deliverNo','');
             Vue.set(this.dialogForm,'deliverCompany','');
             Vue.set(this.dialogForm,'deliverRemark','');
             Vue.set(this.dialogForm,'deliverer','');
        },
        onTimePickAddOrder(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickPayCard(timeStart, timeEnd) {
            this.form.payCardTimeStart = timeStart;
            this.form.payCardTimeEnd = timeEnd;
        },
        onTimePickDeliver(timeStart, timeEnd) {
            this.form.deliverTimeStart = timeStart;
            this.form.deliverTimeEnd = timeEnd;
        },
        onTimePickActivateCard(timeStart, timeEnd) {
            this.form.activateCardTimeStart = timeStart;
            this.form.activateCardTimeEnd = timeEnd;
        },
        onTimePickExport(timeStart, timeEnd) {
            this.exportDialogForm.payCardTimeStart = timeStart;
            this.exportDialogForm.payCardTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {
                ...paramJson,
                ...JSON.parse(JSON.stringify(this.form))
            }
            if (paramJson.paymentMoneyStart > 0) {
                paramJson.paymentMoneyStart = Number(paramJson.paymentMoneyStart) * 100;
            }
            if (paramJson.paymentMoneyEnd > 0) {
                paramJson.paymentMoneyEnd = Number(paramJson.paymentMoneyEnd) * 100;
            }
            this.paramJson = paramJson;
            // paramJson.addTimeStart = getTimeStamp(paramJson.addTimeStart); //下单时间-开始
            // paramJson.addTimeEnd = getTimeStamp(paramJson.addTimeEnd);    //下单时间-结束
            // paramJson.payCardTimeStart = getTimeStamp(paramJson.payCardTimeStart);  //支付卡时间-开始
            // paramJson.payCardTimeEnd = getTimeStamp(paramJson.payCardTimeEnd);      // 支付卡时间-结束
            // paramJson.deliverTimeStart = getTimeStamp(paramJson.deliverTimeStart);  //发放时间-开始
            // paramJson.deliverTimeEnd = getTimeStamp(paramJson.deliverTimeEnd);     //发放时间-结束
            // paramJson.activateCardTimeStart = getTimeStamp(paramJson.activateCardTimeStart); //激活卡时间-开始
            // paramJson.activateCardTimeEnd = getTimeStamp(paramJson.activateCardTimeEnd);  //激活卡时间-结束
            sendPost(urls.getCardOrderList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.cardOrderList;
                this.totalPageCount = resultJson.resultData.cardOrderCount;
                this.cardOrderMoney = resultJson.resultData.cardOrderMoney;
            });
        },
        callExport(url, params = {}) {
            var paramJson = {
                payCardTimeStart: getTimeStamp(this.exportDialogForm.payCardTimeStart),
                payCardTimeEnd: getTimeStamp(this.exportDialogForm.payCardTimeEnd),
                notOrderSignList:this.notOrderSignList,
                areaList:[],
            };
            if(this.exportDialogForm.exportChecked) {
                paramJson.exportType = this.exportDialogForm.exportType,
                this.exportDialogForm.areaSoureList.forEach((element,index) => {
                    let label = this.$refs[`addressCascader${index}`][0].inputValue;
                    paramJson.areaList.push(label)
                });
            }   
            
            if (isTimeNull(paramJson.payCardTimeStart)) {
                warningToast('请选择开始时间');
                return;
            }
            if (isTimeNull(paramJson.payCardTimeEnd)) {
                warningToast('请选择结束时间');
                return;
            }
            sendDownLoad(urls.exportCardOrderList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {

            });
        },
        isShowProgress(row){
            if(row.percentage > 0) {
                return true;
            }
            return false;
        },
       
        callImportCardOrderList(excelPath) {
            let paramJson = {
                excelPath: excelPath
            };
            sendDownLoad(urls.importCardOrderList, {data: JSON.stringify(paramJson)},(resultJson)=>{
            });
        },
        callImportCardOrderList2(excelPath) {
            let paramJson = {
                excelPath: excelPath
            };
            sendDownLoad(urls.importCardOrderList2, {data: JSON.stringify(paramJson)},(resultJson)=>{
            });
        },
        //更新订单标记
        callUpdateOrderSign() {
            let paramJson = {
                cardOrderId: this.tagDialogForm.cardOrderId,
                orderSign:this.tagDialogForm.orderSign,
            };
            sendPost(urls.updateOrderSign, {data: JSON.stringify(paramJson)},(resultJson)=>{
               successToast(resultJson.resultMsg,()=>{
                   this.tagDialogVisible = false;
                   this.callTableData(this.paramJson)
               });
            });
        },

    },
    components: {
        VDateRangePicker,
        VPagination,
        MembershipOrderBindCardDialog,
        PlatformSelector,
        MembershipOrderListSelectFile
    }
}
</script>

<style lang="scss" scoped>
.infoBox {
    display: inline-block;
    text-align: center;
    line-height: 36px;
    padding: 20px 40px;
}
</style>
