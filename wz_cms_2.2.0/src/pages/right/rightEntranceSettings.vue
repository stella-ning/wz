<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="权益品牌名称">
            <el-input class="nn-input-s" v-model="form.benifitName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="品牌类型">
           <el-select v-model="form.benifitType" placeholder="请选择">
               <el-option
               v-for="item in benifitTypeList"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="上架设置">
           <el-select v-model="form.benifitState" placeholder="请选择">
               <el-option
               v-for="item in benifitStateList"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="供应商">
           <el-input class="nn-input-s" v-model="form.benifitSupplier" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="品牌展示分类">
             <el-select v-model="form.classifyId" placeholder="请选择">
                 <el-option
                 v-for="item in [{
                     classifyName:'全部',
                     classifyId:''
                 },...benifitClassifyList]"
                 :key="item.classifyId"
                 :label="item.classifyName"
                 :value="item.classifyId">
                 </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-plus" @click="showAddRightsDialog(false)">新增会员权益品牌</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="showRightsEditDialog">【品牌展示分类】编辑</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
    </el-form>
    <div class="nn-table-wrapper">
        <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
            <el-table-column label="权益品牌名称" prop="" min-width="160">
                <template slot-scope="scope">
                    <el-input class="nn-input-xs" v-model="scope.row.benifitName" placeholder=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="供应商" prop="benifitSupplier">
            </el-table-column>
            <el-table-column label="品牌类型" prop="">
                <template slot-scope="scope">
                    {{scope.row.benifitType | getLabelByValue(benifitTypeList)}}
                </template>
            </el-table-column>
            <el-table-column label="添加时间">
                <template slot-scope="scope">
                    {{new Date(scope.row.addTime).Format()}}
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="" min-width="140">
                <template slot-scope="scope">
                    <el-input class="nn-input-xs" v-model="scope.row.sortOrder" placeholder=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="上架设置">
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.benifitState" :label="1">上架</el-radio>
                    <el-radio v-model="scope.row.benifitState" :label="0">下架</el-radio>
                </template>
            </el-table-column>
            <el-table-column label="品牌展示分类" width="150">
                <template slot-scope="scope">
                    {{getClassifyString(scope.row.benifitClassifyList)}}
                </template>
            </el-table-column>
            <el-table-column label="【会员中心页】入口图片" prop="" min-width="140">
                <template slot-scope="scope">
                    <VPickSelect  :fileType="2" width="120px" height="80px" :index="scope.$index" subTips="选择闪屏图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.benifitPic"></VPickSelect>
                </template>
            </el-table-column>
            <el-table-column label="【会员中心页】标签文字"  width="140">
               <template slot-scope="scope">
                     <el-input class="nn-input-xs" v-model="scope.row.benifitDescription" placeholder=""></el-input>
               </template>
            </el-table-column>
            <el-table-column label="【会员权益品牌页】入口图片" prop="" min-width="140">
                <template slot-scope="scope">
                    <VPickSelect :fileType="2" width="120px" height="80px" :index="scope.$index" subTips="选择闪屏图片" @onUploadSuccess="onUploadSuccessBrand" class="pic-selecter" :logoImageUrl="scope.row.brandPic"></VPickSelect>
                </template>
            </el-table-column>
            <el-table-column label="【会员权益品牌页】标签文字" width="140">
               <template slot-scope="scope">
                   <el-input class="nn-input-xs" v-model="scope.row.brandTag" placeholder=""></el-input>
               </template>
            </el-table-column>
            <el-table-column label="【会员权益品牌页】副文案文字" width="140">
               <template slot-scope="scope">
                   <el-input class="nn-input-xs" v-model="scope.row.brandDescription" placeholder=""></el-input>
               </template>
            </el-table-column>
            <el-table-column label="操作" prop="" min-width="150">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.benifitType == 4" type="text" @click="showAddRightsDialog(true,scope.row)">编辑</el-button>
                    <el-button type="text" @click="showSetCategoryDialog(scope.row)">编辑展示分类</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="mt-20">
            <VPagination  ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount"  @callTableData= "callTableData" ></VPagination>
        </div>
      
      
    </div>
    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callUpdateBenifitList">保 存</el-button>
    </div>
    <!-- 新增&编辑会员权益入口 -->
    <el-dialog title="新增&编辑会员权益入口" :visible.sync="addRightsDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addRightsDialogForm" :model="addRightsDialogForm" label-width="140px" :inline="false" align="left" :rules="addRightsDialogRules">
            <el-form-item label="权益入口名称" prop="benifitName" >
                <el-input class="nn-input-l" v-model="addRightsDialogForm.benifitName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="H5跳转链接" prop="h5Url">
                <el-input type="textarea" :autosize="{ minRows: 2}" class="nn-input-l" v-model="addRightsDialogForm.h5Url" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="benifitSupplier">
               <el-input class="nn-input-s" v-model="addRightsDialogForm.benifitSupplier" placeholder=""></el-input>
            </el-form-item>
            <div class="color-999 ta-l lh-24 mt-40 ml-20">
                <p>注意：</p>
                <p>1、当前仅能新增的品牌的跳转类型为：跳h5</p>
                <p>2、新增默认设置：入口不显示，排序值为100，配置默认图片，标签文字为空</p>
                <p>3、权益品牌名称可重复、权益品牌名称和供应商之和 不可重复</p>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addRightsDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addRightsDialogForm')">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 编辑展示分类 -->
    <el-dialog title="编辑展示分类" :visible.sync="setCategoryDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="setCategoryDialogForm" :model="setCategoryDialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="展示板块分类：">
                <el-checkbox v-for="(item,index) in setCategoryDialogForm.benifitClassifyList" v-model="item.unionId" :key="index">{{item.classifyName}}</el-checkbox>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setCategoryDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callUpdateBenifitClassifyUnion">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 【会员权益分类】编辑 -->
    <el-dialog title="【会员权益分类】编辑" top="3%" :visible.sync="rightsEditDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="rightsEditDialogForm" :model="rightsEditDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item :label="`分类${index+1}：`" v-for="(item,index) in benifitClassifyList" :key="index">
                <el-input class="nn-input-s" v-model="item.classifyName" placeholder=""></el-input>
                <el-switch class="ml-20" active-text="显示" inactive-text="隐藏" v-model="item.classifyState">
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="rightsEditDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callUpdateBenifitClassifyList">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            cateList:[],
            benifitTypeList:[
                {
                    label:'全部',
                    value:''
                },
                ...require('@/components/rights/benifitTypeList')
            ],
            totalPageCount: 0,
            tableData: [],
            form: {},
            paramJson:{},
            rightsEditDialogVisible: false,
            rightsEditDialogForm: {},
            addRightsDialogVisible: false,
            addRightsDialogForm: {},
            addRightsDialogRules: {
                benifitName: [{
                    required: true,
                    message: '请填写信息'
                }],
                h5Url: [{
                    required: true,
                    message: '请填写信息'
                }],
                benifitSupplier: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
             benifitStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '上架',
                value: 1
            }, {
                label: '下架',
                value: 0
            }, ],
            setCategoryDialogVisible: false,
            setCategoryDialogForm: {
                benifitClassifyList: [
                    //  {
                    //      label:'分类1',
                    //      value:1
                    //  },
                    //  {
                    //      label:'分类2',
                    //      value:2
                    //  },
                ]
            },
            curBenifitClassifyList: [],
            benifitClassifyList: [],
            
        }
    },
    created() {

    },
    mounted() {
        this.callFirstPage();
        this.callGetBenifitClassifyList();
    },
    methods: {
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        getClassifyString(list) {
            var tempList = [];
            list.forEach(element => {
                if (element.unionId > 0) {
                    tempList.push(element.classifyName)
                }
            });
            return tempList.join(', ')
        },
        showRightsEditDialog() {
            this.rightsEditDialogVisible = true;
        },
        showSetCategoryDialog(row) {
            this.setCategoryDialogVisible = true;
            this.setCategoryDialogForm.benifitId = row.benifitId;
            this.setCategoryDialogForm.benifitClassifyList = JSON.parse(JSON.stringify(row.benifitClassifyList));
            this.setCategoryDialogForm.benifitClassifyList.forEach(element => {
                Vue.set(element, 'unionId', element.unionId > 0 ? true : false)
            });
        },
        showAddRightsDialog(isEdit, row = {}) {
            this.addRightsDialogVisible = true;
            this.addRightsDialogForm = {};
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addRightsDialogForm, key, element)
                }
            }
            if (!isEdit) {
                for (var key in this.addRightsDialogForm) {
                    if (this.addRightsDialogForm.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.addRightsDialogForm, key, '')
                    }
                }
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callAddBenifit();
                }
            })
        },
        onUploadSuccess(imgUrl,index){
             this.tableData[index].benifitPic = imgUrl;
        },
        onUploadSuccessBrand(imgUrl,index){
             this.tableData[index].brandPic  = imgUrl;
        },
        //更新权益分类列表
        callUpdateBenifitClassifyList() {
            let paramJson = {
                benifitClassifyList: JSON.parse(JSON.stringify(this.benifitClassifyList)),
            };
            paramJson.benifitClassifyList.forEach(element => {
                element.classifyState = element.classifyState ? 1 : 0;
            });
            sendPost(urls.updateBenifitClassifyList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.rightsEditDialogVisible = false;
                    this.callGetBenifitClassifyList();
                });
            });
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form};
            this.paramJson = paramJson;
            sendPost(urls.getBenifitList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.benifitList;
                this.totalPageCount = resultJson.resultData.benifitCount;
            });
        },
        //更新权益
        callUpdateBenifitList() {
            let paramJson = {
                benifitList: this.tableData,
            };
            // paramJson.benifitList.forEach(element => {
            //     element.benifitState = element.benifitState ? 1 : 0;
            // });
            sendPost(urls.updateBenifitList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.callTableData(this.paramJson);
                });
            });
        },
        callUpdateBenifitClassifyUnion() {
            let paramJson = {
                benifitId: this.setCategoryDialogForm.benifitId,
                benifitClassifyList: JSON.parse(JSON.stringify(this.setCategoryDialogForm.benifitClassifyList)),
            };
            paramJson.benifitClassifyList.forEach(element => {
                element.unionId = element.unionId ? 1 : 0;
            });

            sendPost(urls.updateBenifitClassifyUnion, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.setCategoryDialogVisible = false;
                     this.callTableData(this.paramJson);
                });
            });
        },
        callGetBenifitClassifyList() {
            let paramJson = {};
            sendPost(urls.getBenifitClassifyList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.benifitClassifyList = resultJson.resultData.benifitClassifyList;
                this.benifitClassifyList.forEach(element => {
                    element.classifyState = element.classifyState == 1 ? true : false;
                });
            });
        },
        //添加/编辑权益
        callAddBenifit() {
            let paramJson = {
                benifitId: this.addRightsDialogForm.benifitId,
                benifitName: this.addRightsDialogForm.benifitName,
                // h5Url: encodeURIComponent(this.addRightsDialogForm.h5Url),
                h5Url: this.addRightsDialogForm.h5Url,
                benifitSupplier:this.addRightsDialogForm.benifitSupplier
            };
            
            sendPost(urls.addBenifit, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.addRightsDialogVisible = false;
                    this.callFirstPage();
                });
            });
        },
    },
    watch: {
        tableData: {
            deep: true,
            handler() {
                this.tableData.forEach(element => {
                    if (element.sortOrder > 127) {
                        element.sortOrder = 127;
                        warningToast('排序值最大为127');
                    }
                });
            }
        }
    },
    components: {
        VPickSelect,
        VDateRangePicker,
        VPagination
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-switch__label--left {
    color: #999;
}
</style>
