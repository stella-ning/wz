<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="false" align="left" style="margin-left: -130px;">
        <el-form-item label="" v-for="(item,index) in weegetBrandClassifyList" :key="index">
            <el-radio v-model="classifyId" @change="onChange" :label="item.classifyId">品牌分类{{index + 1 }}名称
                <el-input class="nn-input-s ml-20" v-model="item.classifyName" placeholder=""></el-input>
            </el-radio>
        </el-form-item>
    </el-form>
    <div class="nn-table-wrapper">
        <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
            <el-table-column label="品牌名称" prop="" width="160">
                <template slot-scope="scope">
                      <el-input  type="textarea" :autosize="{ minRows: 2}"  class="nn—input-s" v-model="scope.row.brandName" placeholder=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="入口图片" prop="" width="150">
                <template slot-scope="scope">
                    <VPickSelect :fileType="4" width="130px" height="80px" :index="scope.$index" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.brandPic"></VPickSelect>
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="" width="110">
                <template slot-scope="scope">
                    <el-input class="priceInput" v-model="scope.row.sortOrder" placeholder=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="入口是否显示" prop="" width="180">
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.brandState" :label="1" style="margin-right:10px;">显示</el-radio>
                    <el-radio v-model="scope.row.brandState" :label="0">不显示</el-radio>
                </template>
            </el-table-column>

            <el-table-column label="页面链接" prop="" min-width="320">
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
        <div class="ta-l mt-20 nn-bottom-bar">
            <el-button type="primary" @click="callUpdateBrandList">保 存</el-button>
        </div>
    </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
export default {
    data() {
        return {
            form: {},
            tableData: [],
            weegetBrandClassifyList: [],
            classifyId: '',
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.callGetBrandClassifyList(() => {
                this.callGetBrandList();
            });
        },
        onChange() {
            this.callGetBrandList();
        },
        onUploadSuccess(imgUrl,index){
            this.tableData[index].brandPic = imgUrl;
        },
        callGetBrandList() {
            let paramJson = {
                classifyId: this.classifyId
            };
            sendPost(urls.getBrandList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.weegetBrandList;
                this.tableData.forEach(element => {
                    element.sourcePrice = element.sourcePrice / 100;
                    element.discountPrice = element.discountPrice / 100;

                    if (isNull(element.brandState)) {
                        Vue.set(element, 'brandState', 1)
                    }
                    if (isNull(element.jumpType)) {
                        Vue.set(element, 'jumpType', 1)
                    }
                });
            });
        },
        callGetBrandClassifyList(fn) {
            let paramJson = {

            };
            sendPost(urls.getBrandClassifyList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.weegetBrandClassifyList = resultJson.resultData.weegetBrandClassifyList;
                if (this.weegetBrandClassifyList.length > 0 && isNull(this.classifyId)) {
                    this.classifyId = this.weegetBrandClassifyList[0].classifyId;
                }
                if (fn) {
                    fn();
                }
            });
        },
        callUpdateBrandList() {
            let paramJson = {
                weegetBrandClassifyList: [...this.weegetBrandClassifyList],
                weegetBrandList: JSON.parse(JSON.stringify(this.tableData))
            };
            paramJson.weegetBrandList.forEach(element => {
                element.brandName = encodeURIComponent(element.brandName);
                element.jumpUrl = encodeURIComponent(element.jumpUrl);
            });
            sendPost(urls.updateBrandList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.init();
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
</style>
