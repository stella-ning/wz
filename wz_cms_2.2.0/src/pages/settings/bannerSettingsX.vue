<template>
<div>
    <div class="nn-table-wrapper">
        <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
            <el-table-column label="banner顺序" prop="" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.homeSort}}</span>
                </template>
            </el-table-column>
            <el-table-column label="banner图片" prop="">
                <template slot-scope="scope">
                    <VPickSelect :fileType="1" :index="scope.$index" subTips="选择闪屏图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.homePicUrl"></VPickSelect>
                </template>
            </el-table-column>
            <el-table-column label="banner是否显示" prop="">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.display" placeholder="请选择">
                        <el-option
                        v-for="item in displayList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="设置" prop="" width="350">
                <template slot-scope="scope">
                    <el-button type="text" @click="showDialog(scope.row)">点击详细</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callUpdateHomeBannerList">保 存</el-button>
    </div>

     <el-dialog title="banner设置" :visible.sync="dialogVisible" width="55%" top="2%" class="ta-l" :close-on-click-modal="false">
        <el-form label-width="150px" style="width: 80%;" ref="dialogForm" :model="dialogForm">
            <el-form-item label="">
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="1">原生页</el-radio>
                    <el-select v-model="dialogForm.nativeJumpPageId" filterable allow-create default-first-option placeholder="请选择">
                        <el-option v-for="item in nativeJumpPageList" :key="item.nativeJumpPageId" :label="item.pageName" :value="item.nativeJumpPageId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemTow">
                    <el-radio v-model="dialogForm.jumpType" :label="2">微信小程序页面链接</el-radio>
                    <el-input autofocus v-model="dialogForm.urlXCX"></el-input>
                </div>
                <div class="itemTow">
                    <el-radio v-model="dialogForm.jumpType" :label="3">手机网页页面链接</el-radio>
                    <el-input autofocus v-model="dialogForm.urlW"></el-input>
                </div>
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="4">烈熊类权益品牌</el-radio>
                    <el-select v-model="dialogForm.lxBenifitId" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'lx')">
                        <el-option v-for="item in lieXiongList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="5">易加油类权益品牌</el-radio>
                    <el-select v-model="dialogForm.yjyBenifitId" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'yjy')">
                        <el-option v-for="item in nativeyiJiaYouList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="6">直冲类权益品牌</el-radio>
                    <el-select v-model="dialogForm.zhichongBenifitId" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'zc')">
                        <el-option v-for="item in zhiChongList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="7">卡密类权益品牌</el-radio>
                    <el-select v-model="dialogForm.kamiBenifitId" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'km')">
                        <el-option v-for="item in kaMiList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="8">h5跳转类权益品牌</el-radio>
                    <el-select v-model="dialogForm.h5Brand" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'h5')">
                        <el-option v-for="item in h5List" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
               
                <div class="itemRow">
                    <el-radio v-model="dialogForm.jumpType" :label="9">其他权益类型</el-radio>
                    <el-select v-model="dialogForm.otherBenifit" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'qt')">
                        <el-option v-for="item in otherBenifit" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">保存</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
export default {
    data() {
        return {
            dialogVisible:false,
            dialogForm:{},
            tableData: [],
            displayList: [],
            nativeJumpPageList: [],
            lieXiongList: [],
            nativeyiJiaYouList: [],
            zhiChongList: [],
            kaMiList: [],
            h5List: [],
            itemActs:[],//商品活动选项
            otherBenifit:[],//其他权益类型
            classPersionList: [{
                label: '已注册，未买卡用户',
                value: 1,
            }, {
                label: '已注册，已买卡，未激活卡用户',
                value: 2,
            }, {
                label: '未完成0元购用户',
                value: 3,
            }, {
                label: '未完成1元购任务用户',
                value: 4,
            }, {
                label: '已激活卡用户',
                value: 5,
            }, ],
        }
    },
    created() {},
    mounted() {
        this.callGetBannerSetting();
        this.$store.dispatch('callConstantValue', 'bannerDisplaySettings').then(constantValue => {
            this.displayList = JSON.parse(constantValue);
        })

    },
    methods: {
        submitForm(formName) {
            this.callUpdateSimpleItem();
        },
        selectChange(val) {
            this.$forceUpdate()
        },
        showDialog(tempRow = {}){
            this.dialogVisible = true;
            this.dialogForm = {...tempRow};
        },
       
        onUploadSuccess(imgUrl,index){
             this.tableData[index].homePicUrl = imgUrl;
        },
        //获取列表
        callGetBannerSetting() {
            let paramJson = {};
            sendPost(urls.getHomeBannerListSetting, {
                data: JSON.stringify(paramJson)
            }, (res) => {
                this.tableData = res.resultData.homes;
                this.nativeJumpPageList = res.resultData.nativeJumpPageList;
                this.lieXiongList = res.resultData.lieXiongList;
                this.nativeyiJiaYouList = res.resultData.yiJiaYouList;
                this.zhiChongList = res.resultData.zhiChongList;
                this.kaMiList = res.resultData.kaMiList;
                this.h5List = res.resultData.h5List;
                this.otherBenifit = res.resultData.otherBenifit;
                this.tableData.forEach(element => {
                        if (element.jumpType == 1) {
                          Vue.set(element, 'urlWeb', element.urlW)
                        }
                        if (element.jumpType == 2) {
                            Vue.set(element, 'urlXCX', element.urlW)
                        }
                        if (element.jumpType == 4) {
                            Vue.set(element, 'lxBenifitId', element.benifitId)
                        }
                        if (element.jumpType == 5) {
                            Vue.set(element, 'yjyBenifitId', element.benifitId)
                        }
                        if (element.jumpType == 6) {
                            Vue.set(element, 'zhichongBenifitId', element.benifitId)
                        }
                        if (element.jumpType == 7) {
                            Vue.set(element, 'kamiBenifitId', element.benifitId)
                        }
                        
                        if (element.jumpType == 8) {
                            Vue.set(element, 'h5BenifitId', element.benifitId)
                        }
                        if (element.jumpType == 9) {
                            Vue.set(element, 'qianZhuBenifitId', element.benifitId)
                        }
                });
            });
        },
        getItems(element){
            if (element.jumpType == 1) {
                    element.urlW = element.urlWeb;
                }
                if (element.jumpType == 2) {
                    element.urlW = element.urlXCX;
                }
                //猎熊
                if (element.jumpType == 4) {
                    element.benifitId = element.lxBenifitId;
                    // element.apiName = this.getApiName(element.apiId, this.lieXiongList);
                }
                //易加油
                if (element.jumpType == 5) {
                    element.benifitId = element.yjyBenifitId;
                    // element.apiName = this.getApiName(element.yjyBenifitId, this.yiJiaYouList);
                }
                //直充
                 if (element.jumpType == 6) {
                     element.benifitId = element.zhichongBenifitId
                 }
                //卡密
                 if (element.jumpType == 7) {
                     element.benifitId = element.kamiBenifitId
                 }
                 
                 //h5
                 if (element.jumpType == 8) {
                     element.benifitId = element.h5BenifitId
                 }
                 //其他
                 if (element.jumpType == 9) {
                     element.benifitId = element.qianZhuBenifitId
                 }

                // element.homePicUrl = encodeURIComponent(element.homePicUrl)
                // element.urlW = encodeURIComponent(element.urlW)
                return element;
        },
        //设置
        callUpdateHomeBannerList() {
            let paramJson = {
                homeBannelList: JSON.parse(JSON.stringify(this.tableData)),
            };
            paramJson.homeBannelList.forEach(element => {
                this.getItems(element)
            });
            sendPost(urls.updateHomeBannerList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.dialogVisible = false;
                    this.callGetBannerSetting();
                });
            });
        },
        callUpdateSimpleItem() {
            let paramJson = {
               ...(this.getItems(this.dialogForm))
            };
            sendPost(urls.updateHomeBanner, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                     this.dialogVisible = false;
                     this.callGetBannerSetting();
                });
            });
        },
       
    },
    components: {
        VPickSelect
    }

}
</script>

<style lang="scss" scoped>
.pic-selecter {
    height: 7vw;
    width: 15vw;
    border: 1px solid #dcdcdc;

}

/deep/ .el-switch__label--left {
    color: #999;
}

.itemRow {
    margin-top: 20px;
}
</style>
