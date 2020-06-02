<template>
<div>
    <div class="nn-table-wrapper">

      <div v-for="(item,index) in tableData"  :key="index" >
            <p class="n-form_subtitle ta-l">{{index == 0? '权益品牌页banner位置：' : '超人气榜单'}}</p>
             <el-table  class="mt-20 mb-40 nn-no-overflow-table" :data="index == 0? brandBannerList : privilegeBannerList" style="width: 100%" align="left" border>
            <el-table-column label="顺序（小的排期前）" prop="" width="120">
                <template slot-scope="scope">
                    <el-input class="nn-input-ms" v-model="scope.row.sortOrder" placeholder=""></el-input>
                </template>
            </el-table-column>
            <el-table-column label="banner图片" prop="" width="150">
                <template slot-scope="scope">
                    <VPickSelect :fileType="2" width="130px" height="80px" :index="scope.row" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.bannerPic"></VPickSelect>
                </template>
            </el-table-column>
            <el-table-column label="banner是否展示" prop="">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.bannerState" placeholder="请选择">
                        <el-option v-for="item in bannerStateList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="去到会员权益品牌" prop="" width="350">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.benifitId" placeholder="请选择">
                        <el-option v-for="item in benifitList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <div class="nn-form-line-h mb-40"></div>
      </div>

     <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
         <el-form-item label="商业合作联系方式：">
            <el-input class="nn-input-s" v-model="benifitContact" placeholder=""></el-input>
         </el-form-item>
     </el-form>

    </div>
    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="callUpdateBenifitBannerList">保 存</el-button>
    </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Vue from 'vue'
export default {
    data() {
        return {
            form:{},
            tableData:[{},{}],
            brandBannerList:[],
            privilegeBannerList:[],
            benifitContact:'',
            bannerStateList: [{
                label:'不展示',
                value:0
            },{
                label:'普通展示',
                value:1
            }],
            benifitList: [],

        }
    },
    created() {
        this.callGetBenifitList();
        this.callGetBenifitBannerList();
    },
    mounted() {},
    methods: {
        onUploadSuccess(imgUrl,index){
             index.bannerPic = imgUrl;
        },
        callGetBenifitList() {
            let paramJson = {
                startIndex:0,
                length:1000,
            };
            sendPost(urls.getBenifitList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitList =resultJson.resultData.benifitList;
            });
        },
        //获取权益横幅列表
        callGetBenifitBannerList() {
            let paramJson = {};
            sendPost(urls.getBenifitBannerList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                let picIndex = 0;
                this.brandBannerList = resultJson.resultData.brandBannerList;
                this.brandBannerList.forEach(element => {
                    element.index = picIndex;
                    picIndex += 1;
                });
                this.privilegeBannerList = resultJson.resultData.privilegeBannerList;
                this.privilegeBannerList.forEach(element => {
                    element.index = picIndex;
                    picIndex += 1;
                });
                this.benifitContact = resultJson.resultData.benifitContact;
            });
        },
        callUpdateBenifitBannerList() {
            let paramJson = {
                brandBannerList: JSON.parse(JSON.stringify(this.brandBannerList)),
                privilegeBannerList: JSON.parse(JSON.stringify(this.privilegeBannerList)),
                benifitContact:this.benifitContact
            };
            paramJson.brandBannerList.forEach(element => {
                element.bannerPic = encodeURIComponent(element.bannerPic)
            });
            paramJson.privilegeBannerList.forEach(element => {
                element.bannerPic = encodeURIComponent(element.bannerPic)
            });
            sendPost(urls.updateBenifitBannerList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.callGetBenifitBannerList();
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
    border: 1px solid #dcdcdc;
}
</style>
