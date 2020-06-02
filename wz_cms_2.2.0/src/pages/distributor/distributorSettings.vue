<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left" @keyup.enter.native="callFirstPage">
        <!-- <el-form-item label="日期">
                <VDateRangePicker :defaultStart="defaultStart" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
            </el-form-item> -->
        <el-form-item label="渠道商名称">
            <el-input v-model="form.distributorName" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="渠道商账号名">
            <el-input v-model="form.distributorAccount" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="包含渠道号的渠道商">
            <el-input class="nn-input-s" v-model="form.channelName" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item class="ml-20">
            <el-button type="success" icon="el-icon-plus" @click="showAddDialog(false)">添加渠道商</el-button>
            <el-button type="primary" icon="el-icon-search" @keyup.enter.native="callFirstPage" @click="callFirstPage">&nbsp;&nbsp;筛选&nbsp;&nbsp;</el-button>
        </el-form-item>

        <p class="nn-form-line-h"></p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="渠道商名称" prop="distributorName">
                </el-table-column>
                <el-table-column label="渠道商账号名" prop="distributorAccount">
                </el-table-column>
                <el-table-column label="渠道商账号密码" prop="password">
                </el-table-column>
                <el-table-column label="跟进人" prop="clerk">
                </el-table-column>
                <el-table-column label="渠道商类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.channelType | getLabelByValue(channelTypeList)}}
                    </template>
                </el-table-column>
                
                <el-table-column label="添加时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>

                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddDialog(true,scope.row)">编辑渠道商</el-button>
                        <el-button type="text" @click="channelDialogVisible = true; distributorId = scope.row.distributorId">渠道商渠道号</el-button>
                        <router-link target="_blank" :to="{path:'/distributor/channelDataDisplay',query:{distributorId:scope.row.distributorId,distributorName:scope.row.distributorName}}">
                            <el-button type="text">数据展示</el-button>
                        </router-link>
                    </template>
                </el-table-column>

            </el-table>
            <!--分页-->
            <VPagination class="mt-20" ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
        </div>
    </el-form>

    <!-- <div class="ta-l nn-bottom-bar">
            <el-button type="primary">提交</el-button>
        </div> -->

    <el-dialog title="添加渠道商" :visible.sync="dialogVisible" width="40%" top="2%" class="ta-l" :close-on-click-modal="false">
        <el-form label-width="150px" style="width: 450px;" ref="dialogForm" :model="dialogForm" :rules="rules">
            <!-- <el-form-item v-show="!isEdit" label="日期">
                    <el-date-picker v-model="dialogForm.loanTime" type="date" placeholder="选择日期" prop="loanTime">
                    </el-date-picker>
                </el-form-item> -->
            <!-- <el-form-item v-show="isEdit" label="日期" >
                    <span>{{dialogForm.loanTime}}</span>
                </el-form-item> -->
            <el-form-item label="渠道商名称" prop="distributorName">
                <el-input autofocus v-model="dialogForm.distributorName"></el-input>
            </el-form-item>
            <el-form-item label="渠道商账号名" prop="distributorAccount">
                <el-input autofocus v-model="dialogForm.distributorAccount"></el-input>
            </el-form-item>
            <el-form-item label="渠道商账号密码" prop="password">
                <el-input autofocus v-model="dialogForm.password"></el-input>
            </el-form-item>
            <el-form-item label="跟进人" prop="clerk">
                <el-input autofocus v-model="dialogForm.clerk"></el-input>
            </el-form-item>
            <el-form-item label="注册数">
                <!-- 注册数状态。1：显示，2：隐藏 -->
                <el-radio v-model="dialogForm.regCountDisplay" :label="1">展示</el-radio>
                <el-radio v-model="dialogForm.regCountDisplay" :label="2" style="margin-left:10px;margin-right:20px;">隐藏</el-radio>
            </el-form-item>
            <el-form-item label="app登录数">
                <el-radio v-model="dialogForm.appLoginCountDisplay" :label="1">展示</el-radio>
                <el-radio v-model="dialogForm.appLoginCountDisplay" :label="2" style="margin-left:10px;margin-right:20px;">隐藏</el-radio>
            </el-form-item>
            <el-form-item label="购买卡用户数">
                <!-- 注册数状态。1：显示，2：隐藏 -->
                <el-radio v-model="dialogForm.buyCardCountDisplay" :label="1">展示</el-radio>
                <el-radio v-model="dialogForm.buyCardCountDisplay" :label="2" style="margin-left:10px;margin-right:20px;">隐藏</el-radio>
            </el-form-item>
            <el-form-item label="激活卡用户数">
                <!-- 注册数状态。1：显示，2：隐藏 -->
                <el-radio v-model="dialogForm.activeCardCountDisplay" :label="1">展示</el-radio>
                <el-radio v-model="dialogForm.activeCardCountDisplay" :label="2" style="margin-left:10px;margin-right:20px;">隐藏</el-radio>
            </el-form-item>
            <el-form-item label="完成0元购用户数">
                <!-- 注册数状态。1：显示，2：隐藏 -->
                <el-radio v-model="dialogForm.freeBuyCountDisplay" :label="1">展示</el-radio>
                <el-radio v-model="dialogForm.freeBuyCountDisplay" :label="2" style="margin-left:10px;margin-right:20px;">隐藏</el-radio>
            </el-form-item>
            <el-form-item label="渠道商类型" prop="channelType">
                <el-select v-model="dialogForm.channelType" placeholder="请选择">
                    <el-option
                    v-for="item in channelTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
        </span>
    </el-dialog>

    <addChannelDialog :dialogVisible="channelDialogVisible" :distributorId="distributorId" @hideDialog="hideAddChannelialog"></addChannelDialog>

</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import addChannelDialog from "@/components/distributor/addChannelDialog";
import Vue from 'vue';
export default {
    data() {
        return {

            form: {},
            totalPageCount: 0,
            tableData: [],

            defaultStart: new Date(new Date().getTime()).toString(), //获取一周前时间
            dialogVisible: false,
            row: {},

            isEdit: false,

            rules: {
                distributorName: [{
                    required: true,
                    message: '请填写信息'
                }],
                distributorAccount: [{
                    required: true,
                    message: '请填写信息'
                }],
                password: [{
                    required: true,
                    message: '请填写信息'
                }],
                clerk: [{
                    required: true,
                    message: '请填写信息'
                }],
               channelType: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            channelTypeList:[{
                label:'H5渠道',
                value:1
             },{
                 label:'App渠道',
                value:2
            },],

            //添加渠道号
            channelDialogVisible: false,
            distributorId: 0,
            dialogForm: {
            },
            initDialogForm: {
                regCountDisplay: 1,
                appLoginCountDisplay: 1,
                buyCardCountDisplay: 1,
                activeCardCountDisplay: 1,
                freeBuyCountDisplay: 1,
                channelType:'',
            },

        }
    },
    mounted(){
         this.$nextTick(()=>{
            this.callFirstPage({});
         }) 
    },
    methods: {

        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },

        showAddDialog(isEdit, row = {}) {
            this.isEdit = isEdit;
            this.dialogVisible = true;
            this.dialogForm = JSON.parse(JSON.stringify(this.initDialogForm))
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.dialogForm, key, element)
                }
            }

            if (!isEdit) {
                for (var key in this.dialogForm) {
                    if (this.dialogForm.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.dialogForm, key, '')
                    }
                }
                this.dialogForm = {...this.dialogForm,...this.initDialogForm}
            }

        },
        tableEditClick(row) {
            Vue.set(row, 'editing', true);
        },
        tableCancelClick(row) {
            Vue.set(row, 'editing', false);
        },
        tableConfirmClick(row) {
            Vue.set(row, 'editing', false);
        },

        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法。
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form};
            sendPost(urls.getDistributorList, {
                    data: JSON.stringify(paramJson)
                },
                 (resultJson)=> {
                    this.tableData = resultJson.resultData.distributors;
                    this.totalPageCount = resultJson.resultData.count;
                }
            );
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callAddDistributor(function () {
                        this.dialogVisible = false;
                        this.callFirstPage();

                    });
                }
            });
        },
        hideAddChannelialog() {
            this.channelDialogVisible = false;
        },
        //添加渠道商
        callAddDistributor() {
            let paramJson = {
                ...this.dialogForm
            };
            sendPost(urls.addDistributor, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.dialogVisible = false;
                    this.callFirstPage();
                });
            });
        },
    },
    components: {
        VDateRangePicker,
        VPagination,
        addChannelDialog,
    }
}
</script>

<style lang="scss" scoped>

</style>
