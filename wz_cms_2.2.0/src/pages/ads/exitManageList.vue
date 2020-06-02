<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="所属出口位">
            <el-select v-model="form.welfareType" placeholder="请选择">
                <el-option v-for="item in [{ label: '全部',value: '',}, ...welfareTypeList]" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题">
            <el-input class="nn-input-s" v-model="form.welfareSettingName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="form.welfareSettingStatus" placeholder="请选择">
                <el-option v-for="item in [{label: '全部',value: '',}, ...welfareSettingStatusList]" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属平台">
            <el-select v-model="form.platformType" placeholder="请选择">
                <el-option v-for="item in platformTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-plus" @click="showAddDialog(false)">新增出口位</el-button>
            <el-button type="warning" icon="el-icon-upload2" @click="">导 出</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="标题" prop="welfareSettingName">
                </el-table-column>
                <el-table-column label="状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.welfareSettingStatus | getLabelByValue(welfareSettingStatusList)}}
                    </template>
                </el-table-column>
                <el-table-column label="所属出口位" prop="">
                    <template slot-scope="scope">
                        {{scope.row.welfareType | getLabelByValue(welfareTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="图片" prop="">
                    <template slot-scope="scope">
                        <img class="exitImg" :src="scope.row.imgUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="排序" prop="settingSort">
                </el-table-column>
                <el-table-column label="所属平台" prop="">
                    <template slot-scope="scope">
                        {{scope.row.platformType | getLabelByValue(platformTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddDialog(true,scope.row)">编辑</el-button>
                        <!-- <el-button v-if="scope.row.welfareSettingStatus == 2" type="text">上线</el-button>
                        <el-button v-else type="text">下线</el-button> -->
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
    <!-- 新增/编辑出口位 -->
    <el-dialog title="新增/编辑出口位" :visible.sync="addDialogVisible" top="4vh" width="60%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addDialogForm" :model="addDialogForm" label-width="140px" :inline="true   " align="left" :rules="addDialogRules">
            <p class="nn-form_subtitle mb-20" style="margin-top:0;">基础信息</p>
            <el-form-item label="所属出口位" prop="welfareType">
                <el-select v-model="addDialogForm.welfareType" placeholder="请选择">
                    <el-option v-for="item in welfareTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出口位名称" prop="welfareSettingName">
                <el-input class="nn-input-s" v-model="addDialogForm.welfareSettingName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="上下线状态" prop="welfareSettingStatus">
                <el-select v-model="addDialogForm.welfareSettingStatus" placeholder="请选择">
                    <el-option v-for="item in welfareSettingStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作用平台" prop="platformType">
                <el-select v-model="addDialogForm.platformType" placeholder="请选择">
                    <el-option v-for="item in platformTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <div class="nn-form-line-h"></div>
            <p class="nn-form_subtitle mb-20">交互信息</p>

            <el-form-item label="主图">
                <VPickSelect :fileType="7" width="180px" height="120px" :index="1" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="addDialogForm.imgUrl"></VPickSelect>
            </el-form-item>
            <el-form-item label="跳转类型" prop="settingType">
               <el-select v-model="addDialogForm.settingType" placeholder="请选择">
                   <el-option
                   v-for="item in settingTypeList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                   </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="页面链接" v-if="addDialogForm.settingType == 1" prop="webUrl">
               <el-input type="textarea" :autosize="{minRows:2}" class="nn-input-l" v-model="addDialogForm.webUrl" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="激励视频任务ID" v-if="addDialogForm.settingType == 2" prop="adsTaskId">
               <el-select v-model="addDialogForm.adsTaskId" placeholder="请选择">
                   <el-option
                   v-for="item in adsTaskList"
                   :key="item.adsTaskId"
                   :label="item.adsTaskName"
                   :value="item.adsTaskId">
                   </el-option>
               </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addDialogForm')">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="confirmDelDialogVisible" width="30%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="confirmDelDialogForm" :model="confirmDelDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">确认删除此出口位吗？</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDelDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="">确 定</el-button>
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
            paramJson:{},
            totalPageCount: 0,
            tableData: [],
            confirmDelDialogVisible: false,
            confirmDelDialogForm: {},
            isEdit: false,
            addDialogVisible: false,
            addDialogForm: {
            },
            addDialogRules: {
                welfareType: [{
                    required: true,
                    message: '请填写信息'
                }],
                welfareSettingName: [{
                    required: true,
                    message: '请填写信息'
                }],
                welfareSettingStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
                platformType: [{
                    required: true,
                    message: '请填写信息'
                }],
                settingType: [{
                    required: true,
                    message: '请填写信息'
                }],
                webUrl: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsTaskId: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            form: {},
            welfareTypeList: [{
                label: '福利中心规定banner位',
                value: 1
            }, {
                label: '福利中心右下角浮层icon',
                value: 2
            }, ],
            welfareSettingStatusList: [{
                label: '上线',
                value: 1
            }, {
                label: '下线',
                value: 2
            }, ],
            platformTypeList: [{
                label: '全部',
                value: 0,
            }, {
                label: 'ios',
                value: 3
            }, {
                label: 'android',
                value: 4
            }, ],
            settingTypeList:[{
                label:'h5页面',
                value:1
            },{
                label:'激励视频任务',
                value:2
            },],
            adsTaskList:[]
        }
    },
    mounted(){
        this.callGetAdsTaskList();
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateWelfareSetting();
                 }
             })
        },
        showConfirmDelDialog(row) {
            this.confirmDelDialogVisible = true;
        },
        showAddDialog(isEdit, row = {}) {
            this.addDialogVisible = true;
            this.isEdit = isEdit;
            this.addDialogForm = {};
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addDialogForm, key, element)
                }
            }

            if (!isEdit) {
                for (var key in this.addDialogForm) {
                    if (this.addDialogForm.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.addDialogForm, key, '')
                    }
                }
            }

        },
        onUploadSuccess(imgUrl,index){
             Vue.set(this.addDialogForm, 'imgUrl', imgUrl)
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            paramJson.platformGenre = paramJson.platformType;
            this.paramJson = paramJson;
            sendPost(urls.getWelfareSettingList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.welfareSettingList;
                this.totalPageCount = resultJson.resultData.count;
            });
        },
        callGetAdsTaskList() {
            let paramJson = {
                taskType: 3,//任务类型。 1：签到任务，2：基础任务，3：普通任务，4：游戏任务
                startIndex:0,
                length:1000,
            };
            sendPost(urls.getAdsTaskList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.adsTaskList = resultJson.resultData.adsTaskList;
            });
        },
        //更新福利设置
        callUpdateWelfareSetting() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addDialogForm))
            };
            paramJson.platformGenre = paramJson.platformType;
            sendPost(urls.updateWelfareSetting, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.addDialogVisible = false;
                    this.callTableData(this.paramJson)
                });
            });
        },
    },
    components: {
        VPagination,
        VPickSelect
    }
}
</script>

<style lang="scss" scoped>
.exitImg {
    width: 100px;
}
</style>
