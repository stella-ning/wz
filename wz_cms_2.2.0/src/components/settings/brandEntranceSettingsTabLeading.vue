<template>
<div class="nn-table-wrapper">
    <div v-for="(item,index) in tableData" :key="index">
        <p class="ta-l mt-10">{{index == 0?'优选品牌导航页banner位置：': '优选品牌.热销榜'}}</p>
        <el-table class="mt-20 nn-no-overflow-table" :data="index == 0? brandBannerList :sellBannerList" :fit='true' align="left" border>
            <el-table-column label="排顺序（小的排期前）序" prop="" width="150">
                <template slot-scope="scope">
                    <el-input class="priceInput" v-model="scope.row.sortOrder" placeholder=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="banner图片" prop="" width="180">
                <template slot-scope="scope">
                    <VPickSelect :fileType="3" width="130px" height="80px" :index="scope.row" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.bannerPic"></VPickSelect>
                </template>
            </el-table-column>
            <el-table-column label="品牌名称" prop="" width="200">
                <template slot-scope="scope">
                    <el-input class="nn-input-s" v-model="scope.row.brandName" placeholder="" style="width:170px;"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="banner是否展示" prop="" width="180">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.bannerState" placeholder="请选择">
                        <el-option v-for="item in bannerStateList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                </template>
            </el-table-column>

            <el-table-column label="页面链接" prop="" width="370">
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.jumpType" :label="1" class="mr-10">
                        <span>微信小程序页面链接</span>
                    </el-radio>
                    <el-radio v-model="scope.row.jumpType" :label="2">
                        <span>手机网页页面链接&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </el-radio>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" class="nn-input-s inputUrl mt-10" v-model="scope.row.jumpUrl" placeholder=""></el-input>
                </template>
            </el-table-column>
           <el-table-column label="结束时间" prop="" width="270">
                <template slot-scope="scope">
                     <el-date-picker v-model="scope.row.endTime" type="datetime" placeholder="选择时间">
                    </el-date-picker>
                </template>
            </el-table-column>
        </el-table>
        <div class="nn-form-line-h"></div>
    </div>

    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callUpdateWeegetBannerList">保 存</el-button>
    </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
export default {
    data() {
        return {
            tableData: [{}, {}],
            bannerStateList: [{
                label: '普通展示',
                value: 1
            }, {
                label: '不展示',
                value: 0
            }, ],
            brandBannerList: [],
            sellBannerList: [],
        }
    },
    created() {
        this.callGetWeegetBannerList();
    },
    methods: {
        onUploadSuccess(imgUrl,index){
            Vue.set(index, 'bannerPic', imgUrl)
        },
        callGetWeegetBannerList() {
            let paramJson = {};
            sendPost(urls.getWeegetBannerList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.brandBannerList  =resultJson.resultData.brandBannerList;
                this.sellBannerList  =resultJson.resultData.sellBannerList;
                // this.tableData.forEach(element => {
                //     if (isNull(element.goodsState)) {
                //         Vue.set(element, 'goodsState', 1)
                //     }
                //     if (isNull(element.jumpType)) {
                //         Vue.set(element, 'jumpType', 1)
                //     }
                // });
            });
        },
        callUpdateWeegetBannerList() {
            let paramJson = {
                brandBannerList: JSON.parse(JSON.stringify(this.brandBannerList)),
                sellBannerList: JSON.parse(JSON.stringify(this.sellBannerList)),
            };
            sendPost(urls.updateWeegetBannerList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.callGetWeegetBannerList();
                });
            });
        },
    },
    components: {
        VPickSelect,
    }
}
</script>

<style lang="scss" scoped>
.inputUrl {
    width: 300px;
}

.smallInput {
    width: 120px;
}

.priceInput {
    width: 80px;
}

.pic-selecter {
    margin: 0 auto;
}
</style>
