<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="渠道">
            <el-select v-model="form.channelNano" placeholder="请选择">
                <el-option v-for="item in undockChannelList" :key="item.channelName" :label="item.channelName" :value="item.channelNano">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属平台">
            <el-select v-model="form.platformType" placeholder="请选择">
                <el-option v-for="item in platformTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="form.checkSettingStatus" placeholder="请选择">
                <el-option
                v-for="item in [{label: '全部', value: '',},...checkSettingStatusList]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-plus" @click="showAddDialog(false)">新增</el-button>
            <el-button type="warning" icon="el-icon-upload2" @click="onExport">导 出</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="开关名称" prop="checkSettingName">
                </el-table-column>
                <el-table-column label="所属平台" prop="">
                    <template slot-scope="scope">
                        {{scope.row.platformType | getLabelByValue(platformTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="屏蔽渠道" prop="filtrationChannelName">
                </el-table-column>
                <el-table-column label="最小版本" prop="versionMin">
                </el-table-column>
                <el-table-column label="最大版本" prop="versionMax">
                </el-table-column>
                <el-table-column label="状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.checkSettingStatus |  getLabelByValue(checkSettingStatusList)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddDialog(true,scope.row)">编辑</el-button>
                        <!-- <el-button type="text" @click="showAddDialog(true,scope.row)">下线</el-button> -->
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
    <!-- 新增/编辑 -->
    <el-dialog title="新增/编辑" :visible.sync="addDialogVisible" top="4vh" width="70%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addDialogForm" :model="addDialogForm" label-width="200px" :inline="true   " align="left" :rules="addDialogRules">
            <p class="nn-form_subtitle mb-20" style="margin-top:0;">基础信息</p>
            <el-form-item label="开关名称" prop="checkSettingName">
               <el-input class="nn-input-s" v-model="addDialogForm.checkSettingName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="所属平台" prop="platformType">
               <el-select v-model="addDialogForm.platformType" placeholder="请选择">
                   <el-option
                   v-for="item in platformTypeList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                   </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="选择屏蔽的渠道" >
                <el-select v-model="addDialogForm.filtrationChannelName" placeholder="请选择" multiple="">
                    <el-option
                    multiple
                    v-for="item in undockChannelList"
                    :key="item.channelName"
                    :label="item.channelName"
                    :value="item.channelNano">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开关状态" prop="checkSettingStatus">
               <el-select v-model="addDialogForm.checkSettingStatus" placeholder="请选择">
                   <el-option
                   v-for="item in checkSettingStatusList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                   </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="作用的最小版本">
               <el-input class="nn-input-s" v-model="addDialogForm.versionMin" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="作用的最大版本">
               <el-input class="nn-input-s" v-model="addDialogForm.versionMax" placeholder=""></el-input>
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
            <p class="ta-c">确认删除此开关吗？</p>
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
            tableDataDialog: [],
            totalPageCount: 0,
            tableData: [],
            confirmDelDialogVisible: false,
            confirmDelDialogForm: {},
            isEdit: false,
            addDialogVisible: false,
            addDialogForm: {
            },
            addDialogRules: {
                checkSettingName: [{
                    required: true,
                    message: '请填写信息'
                }],
                platformType: [{
                    required: true,
                    message: '请填写信息'
                }],
                checkSettingStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            form: {},
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
            checkSettingStatusList: [ {
                label: '上线',
                value: 1
            }, {
                label: '下线',
                value: 2
            }, ],
            isShowList: [{
                label: '是',
                value: 1
            }, {
                label: '否',
                value: 2
            }, ],
            undockChannelList:[]

        }
    },
    mounted(){
         this.callGetAppChannelList();
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        onExport(){

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateCheckSetting();
                }
            })
        },
        showConfirmDelDialog(row) {
            this.confirmDelDialogVisible = true;
        },
        showAddDialog(isEdit, row = {}) {
            this.addDialogVisible = true;
            this.isEdit = isEdit;
            this.addDialogForm = {
                filtrationChannelName:[],
            };
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addDialogForm, key, element)
                    Vue.set(this.addDialogForm,'filtrationChannelName',!isNull(row.filtrationChannelName)? row.filtrationChannelName.split(',') : [])
                }
            }
        //    if (!isEdit) {
        //         for (var key in this.addDialogForm) {
        //             if (this.addDialogForm.hasOwnProperty(key)) {
        //                 var element = row[key];
        //                 Vue.set(this.addDialogForm, key, '')
        //             }
        //         }
        //     }
          
        },

        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form};
            paramJson.platformGenre = paramJson.platformType;
            this.paramJson = paramJson;
             sendPost(urls.getCheckSettingList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.checkSettingList;
                 this.totalPageCount = resultJson.resultData.count;
            });
        },
        callUpdateCheckSetting() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addDialogForm))
            };
            paramJson.platformGenre = paramJson.platformType;
            paramJson.filtrationChannelName = paramJson.filtrationChannelName.join(',')
            sendPost(urls.updateCheckSetting, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.addDialogVisible = false;
                    this.callTableData(this.paramJson)
                });
            });
        },
         //获取App渠道
        callGetAppChannelList() {
            let paramJson = { };
            sendPost(urls.getAppChannelList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.undockChannelList = resultJson.resultData.appChannelList;
            });
        },
    },
    computed: {
        tempcheckSettingStatusList() {
            return this.checkSettingStatusList.splice(1, this.checkSettingStatusList.length);
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
