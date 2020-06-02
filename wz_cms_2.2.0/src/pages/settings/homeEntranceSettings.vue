<template>
<div>
    <el-tabs v-model="activeName" type="card" >
        <el-tab-pane v-for="(item,key) in tableMap" :key="key" :label="geTableTitle(key)" :name="`tab${key}`">
            <el-table class="mt-20 mb-40 nn-no-overflow-table" :data="item" style="width: 100%" align="left" border>
                <el-table-column label="顺序（小的排期前）" prop="" width="80">
                    <template slot-scope="scope">
                        <el-input class="nn-input-ms" v-model="scope.row.homeSort" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="入口图片" prop="" width="150">
                    <template slot-scope="scope">
                        <p>Anroid</p>
                        <VPickSelect :fileType="6" width="100px" height="100px" :index="scope.row.index" subTips="选择闪屏图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.homePicUrl"></VPickSelect>
                        <p class="mt-20">Ios</p>
                        <VPickSelect :fileType="6" width="100px" height="100px" :index="scope.row.index" subTips="选择闪屏图片" @onUploadSuccess="onUploadSuccessIos" class="pic-selecter" :logoImageUrl="scope.row.iosPicUrl"></VPickSelect>
                    </template>
                </el-table-column>
                <el-table-column label="入口名称" prop="" width="250">
                    <template slot-scope="scope">
                        <p class="ta-l">主文案（最多6个汉字）</p>
                        <el-input class="nn-input-s" v-model="scope.row.homeName" placeholder=""></el-input>
                        <p class="ta-l mt-10">副文案（最多7个汉字）</p>
                        <el-input class="nn-input-s" v-model="scope.row.homeTitleTwo" placeholder="" v-lazyinput="onHomeTitle"> </el-input>
                        <p class="ta-l mt-10">红标签（最多3个汉字）</p>
                        <el-input class="nn-input-s" v-model="scope.row.homeTag" placeholder="" v-lazyinput="onHomeTag"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="是否展示" prop="">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.display" placeholder="请选择">
                            <el-option v-for="item in displayList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="跳转位置" prop="" width="350">
                    <template slot-scope="scope">
                        <div class="ta-l">
                            <el-radio v-model="scope.row.jumpType" :label="3">原生页</el-radio>
                            <p>
                                <el-select v-model="scope.row.nativeJumpPageId" placeholder="请选择">
                                    <el-option v-for="item in nativeJumpPageList" :key="item.nativeJumpPageId" :label="item.pageName" :value="item.nativeJumpPageId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="2">微信小程序页面链接</el-radio>
                            <el-input class="nn-input-xm" :autosize="{ minRows: 2}" type="textarea" v-model="scope.row.urlXCX" placeholder=""></el-input>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="1">手机网页页面链接</el-radio>
                            <el-input class="nn-input-xm" :autosize="{ minRows: 2}" type="textarea" v-model="scope.row.urlWeb" placeholder=""></el-input>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="4">猎熊类权益品牌</el-radio>
                            <p>
                                <el-select v-model="scope.row.lxBenifitId" placeholder="请选择">
                                    <el-option v-for="(item, index) in lieXiongList" :key="index" :label="item.benifitName" :value="item.benifitId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="5">易加油类权益品牌</el-radio>
                            <p>
                                <el-select v-model="scope.row.yjyBenifitId" placeholder="请选择">
                                    <el-option v-for="(item, index) in yiJiaYouList" :key="index" :label="item.benifitName" :value="item.benifitId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="6">直充类权益品牌</el-radio>
                            <p>
                                <el-select v-model="scope.row.zhichongBenifitId" placeholder="请选择">
                                    <el-option
                                    v-for="item in zhiChongList"
                                    :key="item.benifitId"
                                    :label="item.benifitName"
                                    :value="item.benifitId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                         <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="7">卡密类权益品牌</el-radio>
                            <p>
                                <el-select v-model="scope.row.kamiBenifitId" placeholder="请选择">
                                    <el-option
                                    v-for="item in kaMiList"
                                    :key="item.benifitId"
                                    :label="item.benifitName"
                                    :value="item.benifitId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="8">h5跳转类权益品牌</el-radio>
                            <p>
                                <el-select v-model="scope.row.h5BenifitId" placeholder="请选择">
                                    <el-option
                                    v-for="item in h5List"
                                    :key="item.benifitId"
                                    :label="item.benifitName"
                                    :value="item.benifitId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                        <div class="ta-l mt-10">
                            <el-radio v-model="scope.row.jumpType" :label="9">其他权益品牌</el-radio>
                            <p>
                                <el-select v-model="scope.row.qianZhuBenifitId" placeholder="请选择">
                                    <el-option
                                    v-for="item in qianZhuList"
                                    :key="item.benifitId"
                                    :label="item.benifitName"
                                    :value="item.benifitId">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>

    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callUpdateHomeSetting">保 存</el-button>
    </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
export default {
    data() {
        return {
            activeName: 'tab1',
            tableData: [],
            jumpTypeList: [{
                label: '网页',
                value: 1
            }, {
                label: '原生',
                value: 2
            }, ],
            nativeJumpPageList: [],
            displayList: [],
            yiJiaYouList: [],
            lieXiongList: [],
            kaMiList:[],
            yiJiaYouList:[],
            h5List:[],
            qianZhuList:[],
            tableMap: {}

        }
    },
    created() {

    },
    mounted() {
        this.callGetHomeSetting();
        this.$store.dispatch('callConstantValue', 'homeDisplaySettings').then(constantValue => {
            this.displayList = JSON.parse(constantValue);
        })
    },
    methods: {
        onHomeTag(row){
            
        },
        onHomeTitle(row){
        },
        getApiName(value, list) {
            var label = '';
            list.forEach((element) => {
                if (String(element.outId) == String(value)) {
                    label = element.benifitName;
                }
            });
            return label;
        },
        geTableTitle(key) {
            if (key == 1) {
                return '第一页第一排'
            }
            if (key == 2) {
                return '第一页第二排'
            }
            if (key == 3) {
                return '第一页第三排'
            }
            if (key == 4) {
                return '第二页第一排'
            }
            if (key == 5) {
                return '第二页第二排'
            }
            if (key == 6) {
                return '第二页第三排'
            }
            return '未知'
        },
        onUploadSuccess(imgUrl,index){
             this.tableData[index].homePicUrl = imgUrl;
        },
        onUploadSuccessIos(imgUrl,index){
             this.tableData[index].iosPicUrl = imgUrl;
        },
        //获取列表
        callGetHomeSetting() {
            let paramJson = {};
            sendPost(urls.getHomeSetting, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.homes;
                this.tableData.forEach((element, index) => {
                    Vue.set(element, 'index', index)
                });
                this.tableMap = {};
                this.tableData.forEach(element => {
                    this.nativeJumpPageList = resultJson.resultData.nativeJumpPageList;
                    this.tableMap[element.homeGrouping] = this.tableMap[element.homeGrouping] || [];
                    this.tableMap[element.homeGrouping].push(element)
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
                this.yiJiaYouList = resultJson.resultData.yiJiaYouList;
                // this.yiJiaYouList.forEach((element, index) => {
                //     if (element.benifitName == '易加油') {
                //         element.outId = '1'; //先写死为1
                //     }
                //     Vue.set(element, 'yjyBenifitId', element.outId);
                // });
                this.lieXiongList = resultJson.resultData.lieXiongList;
                this.kaMiList = resultJson.resultData.kaMiList;
                this.zhiChongList = resultJson.resultData.zhiChongList;
                this.qianZhuList = resultJson.resultData.qianZhuList;
                this.h5List = resultJson.resultData.h5List;
            });
        },
        //更新配置
        callUpdateHomeSetting() {
            let paramJson = {
                setting: JSON.parse(JSON.stringify(this.tableData)),
            };
            paramJson.setting.forEach(element => {
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

                element.homePicUrl = encodeURIComponent(element.homePicUrl)
                element.urlW = encodeURIComponent(element.urlW)
                element.urlXCX = encodeURIComponent(element.urlXCX)
                element.urlWeb = encodeURIComponent(element.urlWeb)
            });
            sendPost(urls.updateHomeSetting, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.callGetHomeSetting();
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
    // border: 1px solid #dcdcdc;
    margin:0 auto;
}

/deep/ .el-switch__label--left {
    color: #999;
}
</style>
