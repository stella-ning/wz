<template>
<div>
    <div class="nn-table-wrapper">
        <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
            <el-table-column label="banner顺序" prop="" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.bannerSort}}</span>
                </template>
            </el-table-column>
            <el-table-column label="banner图片" prop="">
                <template slot-scope="scope">
                    <VPickSelect :fileType="1" :index="scope.$index" subTips="选择闪屏图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.bannerPicUrl"></VPickSelect>
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
                    <div class="ta-l">
                        <el-radio v-model="scope.row.jumpType" :label="2">原生页</el-radio>
                        <p>
                            <span class="ml-20">跳转至</span>
                            <el-select v-model="scope.row.nativeJumpPageId" placeholder="请选择">
                                <el-option v-for="item in nativeJumpPageList" :key="item.nativeJumpPageId" :label="item.pageName" :value="item.nativeJumpPageId">
                                </el-option>
                            </el-select>
                        </p>
                    </div>
                    <div class="ta-l mt-10">
                        <el-radio v-model="scope.row.jumpType" :label="1">链接</el-radio>
                        <el-input class="nn-input-xm" :autosize="{ minRows: 2}" type="textarea" v-model="scope.row.urlW" placeholder=""></el-input>
                    </div>
                </template>
            </el-table-column>

        </el-table>
    </div>
    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callBannerSetting">保 存</el-button>
    </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
export default {
    data() {
        return {
            tableData: [],
            jumpTypeList: [{
                label: '网页',
                value: 1
            }, {
                label: '原生',
                value: 2
            }, ],
            nativeJumpPageList: [],
            displayList: []

        }
    },
    created() {},
    mounted() {
        this.callGetBannerSetting();
        this.callGetNativeJumpPageList();
        this.$store.dispatch('callConstantValue', 'bannerDisplaySettings').then(constantValue => {
            this.displayList = JSON.parse(constantValue);
        })

    },
    methods: {
        // calUpdateConstantValue() {
        //     var json = [{
        //         label: "展示",
        //         value: 1
        //     }, {
        //         label: "不展示",
        //         value: 2
        //     }, {
        //         label: "激活会员后不展示",
        //         value: 3
        //     }, {
        //         label: "完成0元购后不展示",
        //         value: 4
        //     }, {
        //         label: "完成50元红包领取后不展示",
        //         value: 5
        //     }]
        //     var paramJson = {
        //         constantName: 'bannerDisplaySettings',
        //         constantValue: JSON.stringify(json),
        //     }
        //     sendPost(urls.updateConstantValue, {
        //         data: JSON.stringify(paramJson)
        //     }, (resultJson) => {
        //         successToast(resultJson.resultMsg, () => {});
        //     });
        // },
        onUploadSuccess(imgUrl,index){
             this.tableData[index].bannerPicUrl = imgUrl;
        },
        //获取列表
        callGetBannerSetting() {
            let paramJson = {};
            sendPost(urls.getBannerSetting, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.banners;
                // this.tableData.forEach(element => {
                //     Vue.set(element, 'display', element.display == 1 ? true : false)
                // });
            });
        },
        //设置
        callBannerSetting() {
            let paramJson = {
                setting: JSON.parse(JSON.stringify(this.tableData)),
            };
            paramJson.setting.forEach(element => {
                element.urlW = encodeURIComponent(element.urlW);
                element.bannerPicUrl =  encodeURIComponent( element.bannerPicUrl);
            });
            sendPost(urls.bannerSetting, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.callGetBannerSetting();
                });
            });
        },
        callGetNativeJumpPageList() {
            let paramJson = {};
            sendPost(urls.getNativeJumpPageList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.nativeJumpPageList = resultJson.resultData.nativeJumpPageList;
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
</style>
