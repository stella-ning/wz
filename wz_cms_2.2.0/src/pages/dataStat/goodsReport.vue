<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">

        <h3 class="nn-form_subtitle ">整体漏斗转化监控：
              <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">产品部周报导表</el-button>
        </h3>
        <div>
            <el-radio v-model="form.type" :label="1">按照业务发生的时间点统计：</el-radio>
            <span>日期：</span>
            <VDateRangePicker class="dp-ib" :timeInterval="10" @onTimePick="onTimePick"></VDateRangePicker>
            <el-button class="ml-20" type="primary" icon="el-icon-search" @click="callConversionMonitor">查 询</el-button>
        </div>
        <div class="mt-20">
            <el-radio v-model="form.type" :label="2" class="wrap-cell">按照【用户注册时间】为批次统计(仅统计注册时间起至第30天内的统计数据)</el-radio>
            <span>日期：</span>
            <VDateRangePicker class="dp-ib" :timeInterval="10" @onTimePick="onTimePick2"></VDateRangePicker>
        </div>

        <el-table class="mt-20 nn-no-overflow-table" :data="conversionList" style="width: 100%" align="left" border height="550">
            <el-table-column label="日期" prop="days" min-width="100">
            </el-table-column>
            <el-table-column label="星期" prop="" min-width="100">
                <template slot-scope="scope">
                    {{new Date(scope.row.days).getWeek()}}
                </template>
            </el-table-column>
            <el-table-column label="买卡落地页uv" prop="buyCardUv">
            </el-table-column>
            <el-table-column label="用户注册数" prop="regCount">
            </el-table-column>
            <el-table-column label="用户注册数/买卡落地页uv" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.regBuyCardUvRate)}}
                </template>
            </el-table-column>
            <el-table-column label="购买卡用户数" prop="buyCardCount">
            </el-table-column>
            <el-table-column label="购买卡用户数/用户注册数" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.buyCardRegRate)}}
                </template>
            </el-table-column>
            <el-table-column label="app首次登录数" prop="appLoginCount">
            </el-table-column>
            <el-table-column label="app首次登录数/购买卡用户数" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.appLoginBuyCardRate)}}
                </template>
            </el-table-column>
            <el-table-column label="激活卡用户数" prop="activeCardCount">
            </el-table-column>
            <el-table-column label="激活卡用户数/app登录数" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.activeCardAppLoginRate)}}
                </template>
            </el-table-column>
            <el-table-column label="完成0元购用户数" prop="freeActCount">
            </el-table-column>
            <el-table-column label="完成0元购用户数/app登录数" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.freeActAppLoginRate)}}
                </template>
            </el-table-column>
            <el-table-column label="完成50元红包领取数" prop="redPacketCount">
            </el-table-column>
            <el-table-column label="完成50元红包领取数/激活卡用户数" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.redPacketActiveCardRate)}}
                </template>
            </el-table-column>
            <el-table-column label="用户完成首单用户数" prop="firstOrderCount">
            </el-table-column>
            <el-table-column label="用户完成首单用户数/app登录数" prop="firstOrderAppLoginRate">
            </el-table-column>
            <el-table-column label="用户完成第2单用户数" prop="secondOrderCount">
            </el-table-column>
            <el-table-column label="用户完成第2单用户数/app登录数" prop="secondOrderAppLoginRate">
            </el-table-column>
            
            <el-table-column label="进30天变化详细" prop="" v-if="clickSearchType == 2" width="130">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDialog(scope.row)">数据变动详细</el-button>
                </template>
            </el-table-column>
            
        </el-table>
    </el-form>

    <p class="nn-form-line-h mt-40"></p>

    <el-form ref="formSecond" :model="formSecond" label-width="140px" :inline="true" align="left">
        <h3 class="nn-form_subtitle mt-40">整体活跃度监控：</h3>
        <div>
            <span>按照业务发生的时间点统计：</span>
            <span>日期：</span>
            <VDateRangePicker class="dp-ib" :timeInterval="10" @onTimePick="onTimePickActived"></VDateRangePicker>
            <el-button class="ml-20" type="warning" icon="el-icon-search" @click="getActive">查 询</el-button>
        </div>

        <h4 class="nn-form_tips mt-40">浏览商品和下单：</h4>
        <el-table class="mt-20 nn-no-overflow-table" :data="goodsDataList" style="width: 100%" align="left" border>
            <el-table-column label="日期" prop="days" min-width="100">
            </el-table-column>
            <el-table-column label="星期" prop="" min-width="100">
                <template slot-scope="scope">
                    {{new Date(scope.row.days).getWeek()}}
                </template>
            </el-table-column>
            <el-table-column label="用户app打开数(uv)" prop="openAppCount">
            </el-table-column>
            <el-table-column label="商品详情页uv" prop="itemDetailUv">
            </el-table-column>
            <el-table-column label="下单数" prop="itemOrderCount">
            </el-table-column>
            <el-table-column label="商品详情页uv/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemDetailUvOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="下单数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemOrderOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【0元购】商品详情页uv" prop="itemZDetailPageUv">
            </el-table-column>
             <el-table-column label="【0元购】商品下单数" prop="itemZOrderCount">
            </el-table-column>
            <el-table-column label="【0元购】商品详情页uv/用户app打开数(uv)" prop="">
             <template slot-scope="scope">
                    {{getPercent(scope.row.itemZDetailUvOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【0元购】下单数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemZOrderOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【5元购】商品详情页uv" prop="itemFDetailPageUv">
            </el-table-column>
             <el-table-column label="【5元购】商品下单数" prop="itemFOrderCount">
            </el-table-column>
            <el-table-column label="【5元购】商品详情页uv/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemFDetailUvOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【5元购】下单数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemFOrderOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【普通商品】商品详情页uv" prop="itemGDetailPageUv">
            </el-table-column>
            <el-table-column label="【普通商品】商品下单数" prop="itemGOrderCount">
            </el-table-column>
            <el-table-column label="【普通商品】商品详情页uv/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemGDetailUvOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【普通商品】下单数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getPercent(scope.row.itemGOrderOpenAppRate)}}
                </template>
            </el-table-column>
            <el-table-column label="【非商品库 】下单数" prop="">
                <template slot-scope="scope">
                    {{getOrderCount(scope)}}
                </template>
            </el-table-column>
            <el-table-column label="【非商品库】下单数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{getOrderRate(scope)}}
                </template>
            </el-table-column>
            
        </el-table>

        <h4 class="nn-form_tips mt-40">赚钱任务点击：</h4>
        <el-table class="mt-20 nn-no-overflow-table" :data="goldStatisticsList" style="width: 100%" align="left" border>
            <el-table-column label="日期" prop="days">
            </el-table-column>
            <el-table-column label="星期" prop="">
                <template slot-scope="scope">
                    {{new Date(scope.row.week).getWeek()}}
                </template>
            </el-table-column>
            <el-table-column label="用户app打开数(uv)" prop="userCountUv">
            </el-table-column>
            <el-table-column label="点击签到数" prop="signInUv">
            </el-table-column>
            <el-table-column label="点击签到翻倍数" prop="signInWatchAdsUv">
            </el-table-column>
            <el-table-column label="点击签到翻倍数/点击签到数" prop="">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.watchAdsUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="点击签到数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.signInUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="点击签到翻倍数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.signInWatchAdsUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="【点击看视频领】红包数" prop="scratchUv">
            </el-table-column>
            <el-table-column label="点击看视频领红包数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.scratchUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="完成【500金币】领取数" prop="taskUv">
            </el-table-column>
            <el-table-column label="完成【500金币】领取数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.taskUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="【挑战30000金币】操作数" prop="challengeUv">
            </el-table-column>
            <el-table-column label="【挑战30000金币】操作数/用户app打开数(uv)" prop="">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.challengeUvScale)}}
                </template>
            </el-table-column>
        </el-table>

        <h4 class="nn-form_tips mt-40">会员权益品牌入口点击：</h4>
        <el-table class="mt-20 nn-no-overflow-table" :data="benifitStatisticsList" style="width: 100%" align="left" border>
            <el-table-column v-for="(item, index) in benifitList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key == 'week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>

        <h4 class="nn-form_tips mt-40">页面流量分布监控：</h4>
        <el-table class="mt-20 nn-no-overflow-table" :data="flowPageStatisticsList" style="width: 100%" align="left" border>
            <el-table-column label="日期" prop="days" min-width="100">
            </el-table-column>
            <el-table-column label="星期" prop="" min-width="100">
                <template slot-scope="scope">
                    {{new Date(scope.row.week).getWeek()}}
                </template>
            </el-table-column>
            <el-table-column label="用户app打开数(uv)" prop="userCountUv" min-width="100">
            </el-table-column>
            <el-table-column label="首页（uv）" prop="homePageUv" min-width="100">
            </el-table-column>
            <el-table-column label="首页（uv）/用户app打开数(uv)" prop="homePageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.homePageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="0元购页（uv）" prop="zeroPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="0元购页（uv）/用户app打开数(uv)" prop="zeroPageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.zeroPageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="会员特权页【已激活状态】（uv）" prop="benifitPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="会员特权页【已激活状态】（uv）/用户app打开数(uv)" prop="benifitPageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.benifitPageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="我要赚钱页（uv）" prop="makeMomeyPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="我要赚钱页（uv）/用户app打开数(uv)" prop="makeMomeyPageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.makeMomeyPageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="1元购页（uv）" prop="onePageUv" min-width="100">
            </el-table-column>
            <el-table-column label="1元购页（uv）/用户app打开数(uv)" prop="onePageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.onePageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="优选品牌导航页（uv）" prop="optimizationPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="优选品牌导航页（uv）/用户app打开数(uv)" prop="optimizationPageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.optimizationPageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="会员专享商品区页（uv）" prop="memberGoodsPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="会员专享商品区页（uv）/用户app打开数(uv)" prop="memberGoodsPageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.memberGoodsPageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="搜索-商品列表页（uv）" prop="seekGoodsPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="搜索-商品列表页（uv）/用户app打开数(uv)" prop="seekGoodsPageUvScale" min-width="100">
                <template slot-scope="scope">
                    {{ getPercent(scope.row.seekGoodsPageUvScale)}}
                </template>
            </el-table-column>
            <el-table-column label="权益品牌页（uv）" prop="benefitPageUv" min-width="100">
            </el-table-column>
            <el-table-column label="权益品牌页（uv）/用户app打开数（uv））" prop="benefitPageUvScale" min-width="100">
            </el-table-column>
            <el-table-column label="弹窗点击【立即搜索】按钮点击pv" prop="searchBtnPv">
            </el-table-column>
            <el-table-column label="弹窗点击【立即搜索】按钮点击pv/用户app打开数（uv）" prop="searchBtnPvScale">
            </el-table-column>
            
         </el-table>

         <h4 class="nn-form_tips mt-40">【直充业务】快速统计：</h4>
        <el-table class="mt-20 nn-no-overflow-table" :data="zhiChongDataList" style="width: 100%" align="left" border>
            <el-table-column v-for="(item, index) in zhiChongTitleList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key == 'week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        
         <h4 class="nn-form_tips mt-40">【卡密业务】快速统计：</h4>
        <el-table class="mt-20 nn-no-overflow-table" :data="kaMiDataList" style="width: 100%" align="left" border>
            <el-table-column v-for="(item, index) in kaMiTitleList" :label="item.label" :key="index">
                <template slot-scope="scope">
                    <span v-if="item.key == 'week'">{{new Date(scope.row.week).getWeek()}}</span>
                    <span v-else>{{scope.row[item.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
    </el-form>

    <el-dialog title="近30天变动详细" :visible.sync="dialogVisible" width="60%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="dialogForm" :model="dialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="注册日期">
                 {{dialogForm.days}}
            </el-form-item>
        </el-form>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="dialogForm.list" style="width: 100%"  align="left" border>
                <el-table-column label="日期" prop="days">
                </el-table-column>
                <el-table-column label="用户注册数" prop="regCount">
                </el-table-column>
                <el-table-column label="购买卡用户数" prop="buyCardCount">
                </el-table-column>
                <el-table-column label="app登录数（首次）" prop="appLoginCount">
                </el-table-column>
                <el-table-column label="激活卡用户数" prop="activeCardCount">
                </el-table-column>
                <el-table-column label="完成0元购用户数" prop="freeActCount">
                </el-table-column>
                <el-table-column label="完成50元红包领取数" prop="redPacketCount">
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="">确  定</el-button>
       </span>
    </el-dialog>
    <!-- 导出对话框 -->
    <el-dialog title="产品部周报导表" :visible.sync="exportDialogVisible" width="50%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item label="取数范围：">
                <VDateRangePicker class="dp-ib" :timeInterval="10" @onTimePick="onTimePickExport"></VDateRangePicker>
                <p>（注：取数范围不可超过10天）</p>
            </el-form-item>
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
import Vue from 'vue'
export default {
    data() {
        return {
            exportDialogVisible:false,
            exportDialogForm:{},
            dialogForm:{},
            dialogVisible:false,
            form: {
                type: 1 //1：按照业务发生日期统计，2：按照注册日期查询
            },
            clickSearchType:'',
            formSecond: {},
            tableData: [],
            conversionList: [],
            goodsDataList: [],
            benifitList: [],
            benifitStatisticsList: [],
            flowPageStatisticsList: [],
            goldStatisticsList: [],
            zhiChongDataList:[],
            zhiChongTitleList:[],
            kaMiTitleList:[],
            kaMiDataList:[],
        }
    },
    methods: {
        showExportDialog(){
            this.exportDialogVisible = true;
        },
        showDialog(row){
            this.dialogVisible = true;
            this.dialogForm = {...row};
            this.callGetDataChanges(this.dialogForm.days);
        },
        getOrderRate(scope){
            if(isNaN(scope.row.openAppCount) || scope.row.openAppCount ==0) {
                return '';
            }
           return  (this.getOrderCount(scope)/scope.row.openAppCount * 100).toFixed(2) +'%'
        },
        getOrderCount(scope){
            scope.row.itemOrderCount  = scope.row.itemOrderCount  || 0;
            scope.row.itemZOrderCount  = scope.row.itemZOrderCount  || 0;
            scope.row.itemFOrderCount  = scope.row.itemFOrderCount  || 0;
            scope.row.itemGOrderCount  = scope.row.itemGOrderCount  || 0;
            var count =  scope.row.itemOrderCount - scope.row.itemZOrderCount-  scope.row.itemFOrderCount  - scope.row.itemGOrderCount
            return  !isNaN(count) ? count : 0;
        },
        getPercent(count) {
            if (isNaN(count)) {
                return '';
            }
            return `${(Number(count) * 100).toFixed(2)}%`;
        },
        getActive() {
            let paramJson = {
                timeStart: getTimeStampStart(this.formSecond.timeStart),
                timeEnd: getTimeStampEnd(this.formSecond.timeEnd),
            };
            if (isTimeNull(paramJson.timeStart)) {
                warningToast('请输入开始时间');
                return;
            }
            if (isTimeNull(paramJson.timeEnd)) {
                warningToast('请输入结束时间');
                return;
            }
            this.callGetItemData(paramJson);
            this.callGetGoldStatisticsList(paramJson);
            this.callGetBenifitStatisticsList(paramJson);
            this.callGetFlowPageStatisticsList(paramJson);
            this.callGetZhiChongStatisticsList(paramJson);
            this.callGetKaMiStatisticsList(paramJson);
        },

        onTimePickExport(timeStart, timeEnd) {
            this.exportDialogForm.timeStart = timeStart;
            this.exportDialogForm.timeEnd = timeEnd;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.timeStart = timeStart;
            this.form.timeEnd = timeEnd;
        },
        onTimePick2(timeStart, timeEnd) {
            this.form.timeStart2 = timeStart;
            this.form.timeEnd2 = timeEnd;
        },
        onTimePickActived(timeStart, timeEnd) {
            this.formSecond.timeStart = timeStart;
            this.formSecond.timeEnd = timeEnd;
        },
        //整体漏斗转化监控
        callConversionMonitor() {

            this.clickSearchType = this.form.type;

            let paramJson = {
                type: this.form.type,
                timeStart: this.form.type == 1 ? getTimeStampStart(this.form.timeStart) : getTimeStampStart(this.form.timeStart2),
                timeEnd: this.form.type == 1 ? getTimeStampEnd(this.form.timeEnd) : getTimeStampEnd(this.form.timeEnd2),
            };
            if (paramJson.type == 1 && isTimeNull(paramJson.timeStart)) {
                warningToast('请输入开始时间');
                return;
            }
            if (paramJson.type == 1 && isTimeNull(paramJson.timeEnd)) {
                warningToast('请输入结束时间');
                return;
            }
            if (paramJson.type == 2 && isTimeNull(paramJson.timeStart)) {
                warningToast('请输入开始时间');
                return;
            }
            if (paramJson.type == 2 && isTimeNull(paramJson.timeEnd)) {
                warningToast('请输入结束时间');
                return;
            }
            sendPost(urls.conversionMonitor, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.conversionList = resultJson.resultData.data;
            });
        },
        //商品下单浏览
        callGetItemData(paramJson) {
            sendPost(urls.getItemData, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.goodsDataList = resultJson.resultData.data;
            });
        },
        //赚钱任务
        callGetGoldStatisticsList(paramJson) {
            sendPost(urls.getGoldStatisticsList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.goldStatisticsList = resultJson.resultData.goldStatisticsList;
            });
        },
        //权益统计
        callGetBenifitStatisticsList(paramJson) {
            sendPost(urls.getBenifitStatisticsList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.benifitList = resultJson.resultData.benifitList;
                this.benifitStatisticsList = resultJson.resultData.benifitStatisticsList;
            });
        },
        //页面流量统计列表
        callGetFlowPageStatisticsList() {
            let paramJson = {
                timeStart: getTimeStampStart(this.formSecond.timeStart),
                timeEnd: getTimeStampEnd(this.formSecond.timeEnd),
            };
            sendPost(urls.getFlowPageStatisticsList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.flowPageStatisticsList = resultJson.resultData.flowPageStatisticsList;
            });
        },
        //获取注册日期的数据变化情况
        callGetDataChanges(days) {
            let paramJson = {
                days: days,
            };
            sendPost(urls.getDataChanges, {data: JSON.stringify(paramJson)},(resultJson)=>{
               Vue.set(this.dialogForm,'list',resultJson.resultData.data)
            });
        },
        //直充业务快速统计
        callGetZhiChongStatisticsList() {
            let paramJson = {
                timeStart: getTimeStampStart(this.formSecond.timeStart),
                timeEnd: getTimeStampEnd(this.formSecond.timeEnd),
            };
            sendPost(urls.getZhiChongStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.zhiChongTitleList  = resultJson.resultData.zhiChongTitleList;
                this.zhiChongDataList = resultJson.resultData.zhiChongDataList;
            });
        },
        //卡密页面快速统计
        callGetKaMiStatisticsList() {
            let paramJson = {
                timeStart: getTimeStampStart(this.formSecond.timeStart),
                timeEnd: getTimeStampEnd(this.formSecond.timeEnd),
            };
            sendPost(urls.getKaMiStatisticsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.kaMiTitleList = resultJson.resultData.kaMiTitleList;
                this.kaMiDataList = resultJson.resultData.kaMiDataList;
            });
        },
         //导出
        callExport(url, params = {}) {
            var paramJson = {...this.exportDialogForm};
            if(isTimeNull(paramJson.timeStart)) {
                warningToast('请选择开始时间');
                return ;
            }
             if(isTimeNull(paramJson.timeEnd)) {
                warningToast('请选择结束时间');
                return ;
            }
            sendDownLoad(urls.getWeekReport, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                 this.exportDialogVisible = false;
            });
        },

    },
    components: {
        VDateRangePicker
    }
}
</script>

<style lang="scss" scoped>
    /deep/ .wrap-cell  {
        .el-radio__label {
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-wrap;
            display: inline-block;
            width: 200px;
            line-height: 24px;
            vertical-align: middle;
        }
        .el-radio__inner {
            vertical-align: middle;
        }
    }
</style>
