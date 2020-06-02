<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="奖励id">
            <el-input class="nn-input-s" v-model="form.awardId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="奖励名称">
            <el-input class="nn-input-s" v-model="form.awardName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="奖励皮肤">
            <el-select v-model="form.awardTemplate" placeholder="请选择">
                <el-option v-for="item in [{label: '全部',value: '',}, ...awardTemplateList]" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="showAddRewardDialog(false)">新增奖励模板</el-button>
        </el-form-item>

        <div class="nn-table-wrapper">
            <el-table class="nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="奖励id" prop="awardId">
                </el-table-column>
                <el-table-column label="奖励名称" prop="awardName">
                </el-table-column>
                <el-table-column label="奖励模板" prop="">
                    <template slot-scope="scope">
                        {{scope.row.awardTemplate | getLabelByValue(awardTemplateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="奖励类型" prop="">
                    <template slot-scope="scope">
                        {{scope.row.awardType | getLabelByValue(awardTypeList)}}
                    </template>
                </el-table-column>
                <el-table-column label="奖励数值" prop="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.awardType == 1">{{scope.row.awardNumber}}</span>
                        <span v-else>{{scope.row.awardNumberMin}} ~ {{scope.row.awardNumberMax}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="奖励翻倍倍数" prop="awardDoubleNumber">
                </el-table-column>
                <el-table-column label="作用用户" prop="">
                    <template slot-scope="scope">
                        {{scope.row.userStatus | getLabelByValue(userStatusList)}}
                    </template>
                </el-table-column>
                <el-table-column label="作用平台" prop="">
                    <template slot-scope="scope">
                        {{scope.row.platformType | getLabelByValue(platformTypeList)}}
                    </template>
                </el-table-column>
                
                <el-table-column label="修改时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.updateTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddRewardDialog(true,scope.row)">编辑</el-button>
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
    <!-- 新增/编辑奖励模板 -->
    <el-dialog title="新增/编辑奖励模板" :visible.sync="addRewardDialogVisible" top="5vh" width="70%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addRewardDialogForm" :model="addRewardDialogForm" label-width="180px" :inline="true" align="left" :rules="addRewardDialogRules">
            <p class="nn-form_subtitle mb-20" style="margin-top:0;">基础信息</p>
            <el-form-item label="奖励id" prop="awardId">
                <span v-if="isEdit">{{addRewardDialogForm.awardId}}</span>
                <el-input v-else class="nn-input-s mr-10" v-model="addRewardDialogForm.awardId" placeholder="必填" v-lazyinput="callCheckId"></el-input>
                  <el-tag v-if="!isEdit && isIdAvailable == 1 "  class="color-green" type="success">id可用</el-tag>
            </el-form-item>
            <el-form-item label="奖励名称" prop="awardName">
                <el-input class="nn-input-s" v-model="addRewardDialogForm.awardName" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="奖励模板" prop="awardTemplate">
                <el-select v-model="addRewardDialogForm.awardTemplate" placeholder="请选择">
                    <el-option v-for="item in awardTemplateList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="奖励类型" prop="awardType">
                <el-select v-model="addRewardDialogForm.awardType" placeholder="请选择">
                    <el-option v-for="item in awardTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="addRewardDialogForm.awardType == 1" label="奖励数值" prop="awardNumber">
                <el-input class="nn-input-s" v-model="addRewardDialogForm.awardNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-if="addRewardDialogForm.awardType == 2" label="奖励随机数区间">
                <el-input class="nn-input-xs" v-model="addRewardDialogForm.awardNumberMin" placeholder=""></el-input> ~
                <el-input class="nn-input-xs" v-model="addRewardDialogForm.awardNumberMax" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="奖励是否可翻倍" prop="awardDouble">
                <el-select v-model="addRewardDialogForm.awardDouble" placeholder="请选择">
                    <el-option v-for="item in awardDoubleList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="奖励翻倍倍数" v-if="addRewardDialogForm.awardDouble == 1" prop="awardDoubleNumber">
                <el-input class="nn-input-s" v-model="addRewardDialogForm.awardDoubleNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="通用奖励模板按钮类型" prop="templateButtonStatus">
                <el-select v-model="addRewardDialogForm.templateButtonStatus" placeholder="请选择">
                    <el-option v-for="item in templateButtonStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作用的用户" prop="userStatus">
                <el-select v-model="addRewardDialogForm.userStatus" placeholder="请选择">
                    <el-option v-for="item in userStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作用平台" prop="platformGenre">
                <el-select v-model="addRewardDialogForm.platformGenre" placeholder="请选择">
                    <el-option
                    v-for="item in platformTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="自定义按钮名称" v-if="addRewardDialogForm.templateButtonStatus == 1" prop="customButtonName">
                <el-input class="nn-input-s" v-model="addRewardDialogForm.customButtonName" placeholder=""></el-input>
            </el-form-item>

            <div class="nn-form-line-h"></div>
            <p class="nn-form_subtitle mb-20">关联的广告位</p>

            <el-form-item label="翻倍关联的广告位">
                <!-- <el-input class="nn-input-s" v-model="addRewardDialogForm.adsdoubleCode" placeholder="广告位id"></el-input> -->
                <el-select v-model="addRewardDialogForm.adsDoubleId" placeholder="请选择">
                    <el-option
                    v-for="item in adsPositionList"
                    :key="item.adsPositionId"
                    :label="item.adsPositionName"
                    :value="item.adsPositionId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="猜你喜欢的广告位">
                <!-- <el-input class="nn-input-s" v-model="addRewardDialogForm.adsLoveCode" placeholder="广告位id"></el-input> -->
                 <el-select v-model="addRewardDialogForm.adsLoveId" placeholder="请选择">
                    <el-option
                    v-for="item in adsPositionList"
                    :key="item.adsPositionId"
                    :label="item.adsPositionName"
                    :value="item.adsPositionId">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addRewardDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addRewardDialogForm')">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 删除广告位 -->
    <el-dialog title="提示" :visible.sync="confirmDelDialogVisible" width="30%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="confirmDelDialogForm" :model="confirmDelDialogForm" label-width="140px" :inline="false" align="left">
            <p class="ta-c">确认删除此广告位吗？</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDelDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="">确 定</el-button>
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
import VPagination from "@/components/VPagination";
import Vue from 'vue'
export default {
    data() {
        return {
            exportDialogVisible:false,
            exportDialogForm:{},
            isIdAvailable:0,
            paramJson:{},
            confirmDelDialogVisible: false,
            confirmDelDialogForm: {},
            form: {},
            totalPageCount: 0,
            tableData: [],
            addRewardDialogVisible: false,
            addRewardDialogForm: {
                awardDouble: 2,
            },
            isEdit: false,
            addRewardDialogRules: {
                awardId: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardName: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardTemplate: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardType: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardDouble: [{
                    required: true,
                    message: '请填写信息'
                }],
                userStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
                templateButtonStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
                customButtonName: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardNumber: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardDoubleNumber: [{
                    required: true,
                    message: '请填写信息'
                }],
                awardDoubleNumber: [{
                    required: true,
                    message: '请填写信息'
                }],
                platformGenre: [{
                    required: true,
                    message: '请填写信息'
                }],
                
            },
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
            awardTemplateList: [{
                label: '激励视频奖励模板',
                value: 1
            }, {
                label: '签到奖励模板',
                value: 2
            }, {
                label: '通用奖励模板',
                value: 3
            }, {
                label: '答错模板',
                value: 4
            }, ],
            awardTypeList: [{
                label: '固定数值',
                value: 1
            }, {
                label: '随机数值',
                value: 2
            }, ],
            awardDoubleList: [{
                label: '是',
                value: 1
            }, {
                label: '否',
                value: 2
            }, ],
            templateButtonStatusList: [{
                label: '翻倍奖励+自动循环',
                value: 1
            }, {
                label: '翻倍奖励',
                value: 2
            }, {
                label: '翻倍奖励+关闭',
                value: 3
            }, ],
           
            userStatusList: [{
                label: '全部',
                value: 0,
            }, {
                label: '新用户',
                value: 1
            }, {
                label: '老用户',
                value: 2
            }, ],
            adsPositionList:[],
        }
    },
    mounted(){
        this.callGetAdsPositionList();
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        showExportDialog(){
            this.exportDialogVisible = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateAward();
                }
            })
        },
        showConfirmDelDialog(row) {
            this.confirmDelDialogVisible = true;
        },
        showAddRewardDialog(isEdit, tempRow = {}) {
            this.addRewardDialogVisible = true;
            this.isIdAvailable = 0;
            this.isEdit = isEdit;
            this.addRewardDialogForm = {};
            Vue.set(this.addRewardDialogForm,'platformGenre',0)
            let row = JSON.parse(JSON.stringify(tempRow));
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addRewardDialogForm, key, element)
                }
            }

            if (!isEdit) {
                for (var key in this.addRewardDialogForm) {
                    if (this.addRewardDialogForm.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.addRewardDialogForm, key, '')
                    }
                }
            }

        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form};
            this.paramJson = paramJson;
            sendPost(urls.getAwardList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.awardList;
                this.tableData.forEach(element => {
                    Vue.set(element,'platformGenre',element.platformType);
                });
                this.totalPageCount = resultJson.resultData.count;
            });
        },
        //更新奖励记录
        callUpdateAward() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addRewardDialogForm))
            };
            
            let loveItem = this.adsPositionList.find(item=>item.adsPositionId == paramJson.adsLoveId) || {};
            let doubleItem = this.adsPositionList.find(item=>item.adsPositionId == paramJson.adsDoubleId) || {};
            paramJson.adsLoveCode = loveItem.adsCode;
            paramJson.adsDoubleCode = doubleItem.adsCode;
            sendPost(urls.updateAward, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.addRewardDialogVisible = false;
                    this.callTableData(this.paramJson)
                });
            });
        },
        //检查奖励id
        callCheckId() {
            let paramJson = {
                id: this.addRewardDialogForm.awardId,
            };
            if(isNull(this.addRewardDialogForm.awardId)) {
                this.isIdAvailable = 0;
                return;
            }
            sendNoLoadingPost(urls.checkId, {data: JSON.stringify(paramJson)},(resultJson)=>{
                if(resultJson.resultData.checkState == 2) {
                     this.isIdAvailable = 2;
                     this.addRewardDialogForm.awardId = '';
                     warningToast('id不可用');
                }
                else {
                     this.isIdAvailable = 1;
                }
            });
        },
        //获取广告列表
        callGetAdsPositionList() {
            let paramJson = {
                startIndex: 0,
                length:100000,
            };
            sendPost(urls.getAdsPositionList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.adsPositionList = resultJson.resultData.adsPositionList;
            });
        },
       //导出
        callExport(url, params = {}) {
            var paramJson = this.paramJson;
            sendDownLoad(urls.exportAwardList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                 this.exportDialogVisible = false;
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
