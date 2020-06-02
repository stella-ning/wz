<template>
<div>
    <el-form ref="form" :model="form" label-width="290px" :inline="true" align="left">
        <el-form-item label="提交到应用商店之前，请先设置该版管理">
            <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新增</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>

        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="新增时间" prop="" width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="版本号" prop="versionName">
                </el-table-column>
                <el-table-column label="枚举" prop="versionCode">
                </el-table-column>
                <el-table-column label="更新方式" prop="">
                    <template slot-scope="scope">
                        {{scope.row.versionState | getLabelByValue(versionStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="更新文案" prop="description">
                </el-table-column>
                <el-table-column label="平台" prop="versionType">
                    <template slot-scope="scope">
                        {{scope.row.versionType | getLabelByValue(versionTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="适用渠道" prop="">
                    <template slot-scope="scope">
                        {{scope.row.channel}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddDialog(true,scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
    <el-dialog title="新增版本" :visible.sync="addDialogVisible" width="60%" class="ta-l" :close-on-click-modal="false" top="1vh">
        <el-form ref="addDialogForm" :model="addDialogForm" label-width="140px" :inline="false" align="left" :rules="addDialogRules">
            <el-form-item label="版本号" prop="versionName">
                <el-input class="nn-input-s" v-model="addDialogForm.versionName" placeholder="例如2.0.0"></el-input>
            </el-form-item>
            <el-form-item label="版本枚举" prop="versionCode">
                <el-input class="nn-input-s" v-model="addDialogForm.versionCode" placeholder="向对应APP开发人员获取"></el-input>
            </el-form-item>
            <el-form-item label="更新方式" prop="versionState">
                <el-radio v-for="(item,index) in versionStateList" v-model="addDialogForm.versionState" :label="item.value" :key="index">{{item.label}}</el-radio>
            </el-form-item>
            <el-form-item label="更新文案" prop="description">
                <el-input type="textarea" :autosize="{ minRows: 3}" class="nn-input-l" v-model="addDialogForm.description" placeholder="建议30个字内"></el-input>
            </el-form-item>
            <el-form-item label="平台" prop="versionType">
                <el-radio v-for="(item ,index) in versionTypeList" v-model="addDialogForm.versionType" :key="index" :label="item.value">{{item.label}}</el-radio>
            </el-form-item>
            <el-form-item label="适用渠道" prop="channel">
                <p>
                    <el-radio v-model="addDialogForm.checkedchannel" :label="1">全部（iOS选择全部即可）</el-radio>
                </p>
                <p>
                    <el-radio v-model="addDialogForm.checkedchannel" :label="2">指定渠道</el-radio>
                    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" placeholder="按enter确定">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增渠道</el-button>
                </p>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addDialogForm')">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import VPagination from "@/components/VPagination";
import Vue from 'vue'
export default {
    data() {
        return {
            versionTypeList:[{
                label:'安卓',
                value:2
            },{
                label:'苹果',
                value:1
            },],
            versionStateList:[{
                label:'建议更新',
                value:1
             },{
                 label:'强制更新',
                value:2
            },{
                 label:'无需更新',
                value:0
            },{
                 label:'审核包（iOS提审时需要勾选该项）',
                value:4
            },],
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            addDialogVisible: false,
            addDialogForm: {},
            addDialogRules: {
                versionName: [{ required: true, message: '请填写信息' }],
                versionCode: [{ required: true, message: '请填写信息' }],
                versionState: [{ required: true, message: '请填写信息' }],
                description: [{ required: true, message: '请填写信息' }],
                versionType: [{ required: true, message: '请填写信息' }],
            },
            form: {},
            totalPageCount: 0,
            tableData: [],
           
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.callFirstPage();
        })
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateVersion();
                 }
             })
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
            this.showInput();
        },
        showAddDialog(isEdit, tempRow = {}) {
            this.addDialogVisible = true;
            this.isEdit = isEdit;
            this.addDialogForm = {
                versionState:1,
                versionType:2,
            };
            this.dynamicTags = [];

            let row = JSON.parse(JSON.stringify(tempRow))
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addDialogForm, key, element)
                }
            }
            if(!isNull(row.channel)) {
                this.dynamicTags = row.channel.split(',')
                 Vue.set(this.addDialogForm,'checkedchannel',2);
            }
            else {
                Vue.set(this.addDialogForm,'checkedchannel',1);
            }
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            sendPost(urls.getVersionList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.versionList;
                this.totalPageCount = resultJson.resultData.count;
            });
        },
        callUpdateVersion() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addDialogForm))
            };
            paramJson.channel = this.dynamicTags.join(',');
            if(paramJson.checkedchannel == 1) {
                paramJson.channel = '';
            }
            sendPost(urls.updateVersion, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                     this.addDialogVisible = false;
                     this.callFirstPage();
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
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 110px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
