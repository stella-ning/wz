<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="广告位id">
            <el-input class="nn-input-s" v-model="form.adsPositionId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="广告位名称">
            <el-input class="nn-input-s" v-model="form.adsPositionName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="状态">
             <el-select v-model="form.adsStatus" placeholder="请选择">
                 <el-option
                 v-for="item in [{label:'全部',value:''},...adsStatusList]"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
                 </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="广告位作用平台">
            <el-select v-model="form.platformGenre" placeholder="请选择">
                <el-option
                v-for="item in platformTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="删除渠道">
           <el-select v-model="form.undockChannel" placeholder="请选择">
               <el-option
               v-for="item in  [{channelName:'全部',value:''},...undockChannelList]"
               :key="item.channelName"
               :label="item.channelName"
               :value="item.channelNano">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-plus" @click="showAddAdsDialog(false)">新增广告位</el-button>
            <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>

        <div class="nn-table-wrapper">
            <el-table class="nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="广告位id" prop="adsPositionId">
                </el-table-column>
                <el-table-column label="广告位名称" prop="adsPositionName">
                </el-table-column>
                <el-table-column label="广告位作用平台" prop="platformType">
                   <template slot-scope="scope">
                        {{scope.row.platformType | getLabelByValue(platformTypeList)}}
                   </template>
                </el-table-column>
                 <el-table-column label="广告位置code" prop="adsCode">
                </el-table-column>
                 <el-table-column label="广告类型" prop="">
                     <template slot-scope="scope">
                         {{scope.row.adsType | getLabelByValue(adsTypeList)}}
                     </template>
                </el-table-column>
                <el-table-column label="广告位删除的渠道" prop="undockChannel">
                </el-table-column>
                <el-table-column label="修改时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.updateTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddAdsDialog(true,scope.row)">编辑</el-button>
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
    <!-- 新增/编辑广告位 -->
    <el-dialog title="新增/编辑广告位" :visible.sync="addAdsDialogVisible" top="5vh" width="60%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addAdsDialogForm" :model="addAdsDialogForm" label-width="140px" :inline="true" align="left" :rules="addAdsDialogRules">

            <p class="nn-form_subtitle mb-20" style="margin-top:0;">基础信息</p>
            <el-form-item label="广告位id" prop="adsPositionId">
                <el-input class="nn-input-s" v-model="addAdsDialogForm.adsPositionId" placeholder="必填，不可重复"></el-input>
            </el-form-item>
            <el-form-item label="广告位名称" prop="adsPositionName">
                <el-input class="nn-input-s" v-model="addAdsDialogForm.adsPositionName" placeholder="必填"></el-input>
            </el-form-item>
            <el-form-item label="上下线状态" prop="adsStatus">
                <el-select v-model="addAdsDialogForm.adsStatus" placeholder="请选择">
                    <el-option v-for="item in adsStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告位作用平台" prop="platformType">
                <el-select v-model="addAdsDialogForm.platformType" placeholder="请选择">
                    <el-option v-for="item in platformTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告位删除的渠道" prop="undockChannel">
                <el-select v-model="addAdsDialogForm.undockChannel" placeholder="请选择" multiple="">
                    <el-option
                    v-for="item in undockChannelList"
                    :key="item.channelName"
                    :label="item.channelName"
                    :value="item.channelName">
                    </el-option>
                </el-select>
            </el-form-item>

            <div class="nn-form-line-h"></div>
            <p class="nn-form_subtitle mb-20">关联广告</p>

            <el-form-item label="广告code" prop="adsCode">
                <el-input class="nn-input-s" v-model="addAdsDialogForm.adsCode" placeholder="第三方广告id"></el-input>
            </el-form-item>
            <el-form-item label="所属广告平台" prop="advertiserId">
                <el-select v-model="addAdsDialogForm.advertiserId" placeholder="请选择">
                    <el-option v-for="item in advertiserList" :key="item.advertiserId" :label="item.advertiserName" :value="item.advertiserId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作用用户" prop="userStatus">
                <el-select v-model="addAdsDialogForm.userStatus" placeholder="请选择">
                    <el-option v-for="item in userStatusList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型" prop="adsType">
               <el-select v-model="addAdsDialogForm.adsType" placeholder="请选择">
                   <el-option
                   v-for="item in adsTypeList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                   </el-option>
               </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addAdsDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addAdsDialogForm')">确 定</el-button>
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
            paramJson:{},
            confirmDelDialogVisible: false,
            confirmDelDialogForm: {},
            form: {},
            totalPageCount: 0,
            tableData: [],
            addAdsDialogVisible: false,
            addAdsDialogForm: {
                online: 2
            },
            isEdit: false,
            addAdsDialogRules: {
                adsPositionId: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsPositionName: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
                platformType: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsCode: [{
                    required: true,
                    message: '请填写信息'
                }],
                advertiserId: [{
                    required: true,
                    message: '请填写信息'
                }],
                userStatus: [{
                    required: true,
                    message: '请填写信息'
                }],
                adsType: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            adsStatusList: [{
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
            advertiserList: [],
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
            undockChannelList:[
              
            ],
            adsTypeList:[{
                label:'信息流',
                value:1
             },{
                 label:'banner',
                value:2
            },{
                 label:'插屏广告',
                value:3
            },{
                 label:'全屏视频',
                value:4
            },{
                label:'开屏广告',
                value:5
            },{
                label:'激励视频广告啊',
                value:6
            },],
        }
    },
    mounted(){
        this.callGetAdvertiserList();
        this.callGetAppChannelList();
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
                    this.callUpdateAdsPosition();
                }
            })
        },
        showConfirmDelDialog(row) {
            this.confirmDelDialogVisible = true;
        },
        showAddAdsDialog(isEdit, tempRow = {}) {
            this.addAdsDialogVisible = true;
            this.isEdit = isEdit;
            this.addAdsDialogForm = {
                undockChannel:'',
            };
            let row  =  JSON.parse(JSON.stringify(tempRow))
            for (var key in row) {
                if (row.hasOwnProperty(key)) {
                    var element = row[key];
                    Vue.set(this.addAdsDialogForm, key, element)
                }
            }
            if(!isNull(this.addAdsDialogForm.undockChannel)) {
                this.addAdsDialogForm.undockChannel = this.addAdsDialogForm.undockChannel.split(',');
            }
            else {
                this.addAdsDialogForm.undockChannel = [];
            }
        
          
            if (!isEdit) {
                for (var key in this.addAdsDialogForm) {
                    if (this.addAdsDialogForm.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.addAdsDialogForm, key, '')
                    }
                }
                // this.addAdsDialogForm = {...this.addAdsDialogForm,...this.initaddAdsDialogForm}
            }

        },
        //获取广告商列表
        callGetAdvertiserList() {
            let paramJson = {
            };
            sendPost(urls.getAdvertiserList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.advertiserList = resultJson.resultData.advertiserList;
            });
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        getChannelNo(channelName){
           let item = this.undockChannelList.find(item=>item.channelName == channelName);
           if(item) {
               return item.channelNano;
           }
           return ''
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            sendPost(urls.getAdsPositionList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.adsPositionList;
                this.totalPageCount = resultJson.resultData.count;
            });
        },
        //更新广告位
        callUpdateAdsPosition() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addAdsDialogForm)),
            };
            paramJson.undockChannel = paramJson.undockChannel || [];
            paramJson.undockChannel = paramJson.undockChannel.join(',');
            paramJson.platformGenre = paramJson.platformType;
            sendPost(urls.updateAdsPosition, {data: JSON.stringify(paramJson)},(resultJson)=>{
               successToast(resultJson.resultMsg,()=>{
                    this.addAdsDialogVisible = false;
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
        //导出
        callExport(url, params = {}) {
            var paramJson = this.paramJson;
            sendDownLoad(urls.exportAdsPositionList, {
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
