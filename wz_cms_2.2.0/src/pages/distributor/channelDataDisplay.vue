<template>
<div>
    <el-breadcrumb class="nn-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">渠道商管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">渠道商数据显示</el-breadcrumb-item>
        <el-breadcrumb-item><span class="color-blue fs-22">{{distributorName}} （{{channelType | getLabelByValue(channelTypeList)}}）</span></el-breadcrumb-item>
    </el-breadcrumb>

    <el-form class="mt-20" ref="form" :model="form" label-width="140px" :inline="true" align="left">
         <el-form-item label="渠道号">
            <el-select v-model="form.channelName" placeholder="请选择"  >
                <el-option v-for="item in channelNameList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="" style="margin-top: -2px;margin-left:10px;">
             <el-radio v-model="form.type" :label="1"> 按照业务发生的时间点统计</el-radio>
             <el-radio v-model="form.type" :label="2"> 按照【用户注册时间】为批次统计</el-radio>
              <VDateRangePicker ref="timePicker" :defaultStart="defaultStart" :defaultEnd="defaultEnd"  :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
       
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <h3 v-if="form.type == 1" class="color-999 mt-40 mb-20">渠道商数据统计：（当天不参与统计）</h3>
        <el-form-item label="">
            <div class="infoBox" v-if="form.type == 1">
                <div class="infoCell">
                    <p>用户注册数</p>
                    <p class="fs-24">{{channelData.regCountX}}</p>
                </div>
                 <div class="infoCell">
                    <p>购买卡用户数</p>
                    <p class="fs-24">{{channelData.buyCardUserCountX}}</p>
                </div>
                <div class="infoCell">
                    <p>app登录数</p>
                    <p class="fs-24">{{channelData.appLoginCountX}}</p>
                </div>
                <div class="infoCell">
                    <p>激活卡用户数</p>
                    <p class="fs-24">{{channelData.activeCardUserCountX}}</p>
                </div>
                <div class="infoCell">
                    <p>完成0元购数</p>
                    <p class="fs-24">{{channelData.freeActAttendedUserCountX}}</p>
                </div>
            </div>
        </el-form-item>
        <h3 class="color-999 mt-20 mb-20">以下为真实数据，不展示给渠道商看：（当天不参与统计）</h3>
        <el-form-item label="">
            <div class="infoBox">
                <div class="infoCell">
                    <p>用户注册数</p>
                    <p class="fs-24">{{channelData.regCount}}</p>
                </div>
                 <div class="infoCell">
                    <p>购买卡用户数</p>
                    <p class="fs-24">{{channelData.buyCardUserCount}}</p>
                </div>
                <div class="infoCell">
                    <p>app登录数</p>
                    <p class="fs-24">{{channelData.appLoginCount}}</p>
                </div>
                <div class="infoCell">
                    <p>激活卡用户数</p>
                    <p class="fs-24">{{channelData.activeCardUserCount}}</p>
                </div>
                <div class="infoCell">
                    <p>完成0元购数</p>
                    <p class="fs-24">{{channelData.freeActAttendedUserCount}}</p>
                </div>
                <div class="infoCell">
                    <p>完成50元红包领取数</p>
                    <p class="fs-24">{{channelData.redPacketUsedCount}}</p>
                </div>
                <div class="infoCell">
                    <p>用户完成首单用户数</p>
                    <p class="fs-24">{{channelData.firstOrderCount}}</p>
                </div>
                <div class="infoCell">
                    <p>用户完成第2单用户数</p>
                    <p class="fs-24">{{channelData.secondOrderCount}}</p>
                </div>
            </div>
        </el-form-item>
        <div class="nn-form-line-h mt-40"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="日期" prop="">
                    <template slot-scope="scope">
                        {{scope.row.date}}
                    </template>
                </el-table-column>
                <el-table-column label="渠道商渠道号" prop="channelName">
                </el-table-column>
               
                <el-table-column label="扣量数据" prop="" v-if="form.type == 1">
                     <el-table-column label="用户注册数" prop="regCountX">
                    </el-table-column>
                    <el-table-column label="购买卡用户数" prop="buyCardUserCountX">
                    </el-table-column>
                    <el-table-column label="app登录数" prop="appLoginCountX">
                    </el-table-column>
                    <el-table-column label="激活卡用户数" prop="activeCardUserCountX">
                    </el-table-column>
                    <el-table-column label="完成0元购用户数" prop="freeActAttendedUserCountX">
                    </el-table-column>
                </el-table-column>
                
                <el-table-column label="（真实数据 - 不展示给渠道商看）" >
                    <el-table-column label="用户注册数" prop="regCount">
                    </el-table-column>
                    <el-table-column label="购买卡用户数" prop="buyCardUserCount">
                    </el-table-column>
                    <el-table-column label="app登录数" prop="appLoginCount">
                    </el-table-column>
                    <el-table-column label="激活卡用户数" prop="activeCardUserCount">
                    </el-table-column>
                    <el-table-column label="完成0元购用户数" prop="freeActAttendedUserCount">
                    </el-table-column>
                    <el-table-column label="完成50元红包领取数" prop="redPacketUsedCount">
                    </el-table-column>
                    <el-table-column label="用户完成首单用户数" prop="firstOrderCount">
                    </el-table-column>
                    <el-table-column label="用户完成第2单用户数" prop="secondOrderCount">
                    </el-table-column>
                    
                </el-table-column>
                 <el-table-column label="操作" prop=""  >
                     <!--  -->
                    <template slot-scope="scope">
                        <el-button v-if="form.type == 2"  type="text" @click="showDialog(scope.row)">数据变动详细</el-button>
                    </template>
                </el-table-column>  
                
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>

        </div>
    </el-form>
    <channelDataDisplayDetailsDialog :detailsDialogForm="detailsDialogForm" :channelName="detailsDialogForm.channelName" :regDate="detailsDialogForm.regDate"></channelDataDisplayDetailsDialog>
</div>
</template>

<script>
import VPagination from "@/components/VPagination";
import VDateRangePicker from "@/components/VDateRangePicker";
import channelDataDisplayDetailsDialog from '@/components/distributor/channelDataDisplayDetailsDialog'
import Vue from 'vue'
export default {
    data() {
        return {
            detailsDialogForm:{
                detailsDialogVisible:false,
            },
            defaultStart: getTimeStampStart(new Date()), //获取当天默认时间
            defaultEnd: getTimeStampEnd(new Date()), //获取当天默认时间
            totalPageCount: 0,
            tableData: [],
            distributorId: this.$route.query.distributorId,
            distributorName: this.$route.query.distributorName,
            form: {
                type:1,
            },
            channelNameList: [],
            channelData: {},
            channelType:'',
            channelTypeList:[{
                label:'H5渠道',
                value:1
             },{
                 label:'App渠道',
                value:2
            },],
        }
    },
    mounted() {
        this.callGetChannelList();
        this.$nextTick(() => {
            this.callFirstPage();
        })
    },
    methods: {
        showDialog(row){
            this.detailsDialogForm.detailsDialogVisible = true;
            Vue.set(this.detailsDialogForm,'channelName',row.channelName);
            Vue.set(this.detailsDialogForm,'regDate',row.date);
        },
        onTimePick(timeStart, timeEnd) {
            this.form.queryTimeStart = timeStart;
            this.form.queryTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            this.callGetSummaryData();
            paramJson = {
                ...paramJson,
                ...this.form,
                distributorId: this.distributorId
            }
            paramJson.queryTimeStart = getTimeStampStart(paramJson.queryTimeStart)
            paramJson.queryTimeEnd = getTimeStampEnd(paramJson.queryTimeEnd)
            sendPost(urls.getChannelDataList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.channelDatas;
                this.totalPageCount = resultJson.resultData.count;
            });
        },
        callGetChannelList() {
            var paramJson = {
                distributorId: this.distributorId,
            }
            sendPost(urls.getChannelList, {
                    data: JSON.stringify(paramJson)
                },
                (resultJson) => {
                    resultJson.resultData.channels.forEach(element => {
                        element.label = element.channelName;
                        element.value = element.channelName;
                    });
                    this.channelNameList = [
                        {
                            label: '全部',
                            value: ''
                        },
                        ...resultJson.resultData.channels
                    ];
                }
            );
        },
        //cms后台渠道商数据汇总
        callGetSummaryData() {
            let paramJson = {
                distributorId: this.distributorId,
                ...this.form,
            };
            paramJson.queryTimeStart = getTimeStampStart(paramJson.queryTimeStart);
            paramJson.queryTimeEnd = getTimeStampEnd(paramJson.queryTimeEnd);
            sendPost(urls.getSummaryData, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.channelData = resultJson.resultData.channelData || {};
                this.channelType = resultJson.resultData.channelType;
            });
        },
    },
    watch:{
        'form.type'(){
            // this.$refs.timePicker.timeStart = '';
            // this.$refs.timePicker.timeEnd = '';
            // this.form.queryTimeStart = '';
            // this.form.queryTimeEnd = '';
            this.channelData = {};
            this.tableData = [];
        }
    },
    components: {
        VDateRangePicker,
        VPagination,
        channelDataDisplayDetailsDialog
    }

}
</script>

<style lang="scss" scoped>
.infoBox {
    .infoCell {
        display: inline-block;
        padding: 12px 12px;
        line-height: 36px;
        text-align: center;
        position: relative;
    }

    .infoCell::after {
        content: ' ';
        display: inline-block;
        width: 1px;
        height: 64px;
        border-right: 1px solid #ECEEF2;
        position: absolute;
        right: 0;
        top: 18px;
    }
}

.infoBoxLineH {
    border-bottom: 1px solid #ECEEF2;
    height: 1px;
    width: 80vw;
    margin-left: 160px;
}
</style>
