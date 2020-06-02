<template>
<div class="nn-table-wrapper">
    <el-table class="mt-20 nn-no-overflow-table" :data="tableData" :fit='true'  align="left" border>
        <el-table-column label="产品名称" prop="" width="180"  >
            <template slot-scope="scope">
                <el-input  type="textarea" :autosize="{ minRows: 2}"  class="smallInput" v-model="scope.row.goodsName" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="入口图片" prop="" width="150">
            <template slot-scope="scope">
                <VPickSelect :fileType="3" width="130px" height="80px"  :index="scope.$index" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.goodsPic"></VPickSelect>
            </template>
        </el-table-column>
        <el-table-column label="会场名称" prop="" min-width="150">
            <template slot-scope="scope">
                <el-input class="nn-input-xs" v-model="scope.row.groupName" placeholder=""></el-input>
            </template>
        </el-table-column>
        
        <el-table-column label="会员价" prop="" width="110">
            <template slot-scope="scope">
                <el-input class="priceInput" v-model="scope.row.discountPrice" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="非会员价" prop="" width="110">
            <template slot-scope="scope">
                <el-input class="priceInput" v-model="scope.row.sourcePrice" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="排序" prop="" width="110">
            <template slot-scope="scope">
                <el-input class="priceInput" v-model="scope.row.sortOrder" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="入口是否显示" prop="" width="100">
            <template slot-scope="scope">
                <el-radio v-model="scope.row.goodsState" :label="1"  class="ml-10">显示</el-radio>
                <el-radio v-model="scope.row.goodsState" :label="0">不显示</el-radio>
            </template>
        </el-table-column>
        
        <el-table-column label="页面链接" prop="" width="370" >
            <template slot-scope="scope">
                 <el-radio v-model="scope.row.jumpType" :label="1" class="mr-10">
                        <span>微信小程序页面链接</span>
                    </el-radio>
                    <el-radio v-model="scope.row.jumpType" :label="2">
                    <span>手机网页页面链接&nbsp;&nbsp;&nbsp;&nbsp;</span>
                 </el-radio>
                  <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 6}" class="nn-input-s inputUrl mt-10" v-model="scope.row.jumpUrl" placeholder=""></el-input>
            </template>
        </el-table-column>
    </el-table>
    <div class="ta-l mt-20 nn-bottom-bar">
       <el-button type="primary" @click="callUpdateGoodsList">保 存</el-button>
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
        }
    },
    created() {
        this.callGetGoodsList();
    },
    methods: {
        onUploadSuccess(imgUrl,index){
             Vue.set(this.tableData[index],'goodsPic',imgUrl)
        },
        callGetGoodsList() {
            let paramJson = {
            };
            sendPost(urls.getGoodsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.weegetGoodsList;
                this.tableData.forEach(element => {
                    element.sourcePrice = floatChu100(element.sourcePrice);
                    element.discountPrice = floatChu100(element.discountPrice);

                    if(isNull(element.goodsState)) {
                        Vue.set(element,'goodsState',1)
                    }
                    if(isNull(element.jumpType)) {
                        Vue.set(element,'jumpType',1)
                    }
                });
            });
        },
        callUpdateGoodsList() {
            let paramJson = {
                weegetGoodsList:JSON.parse(JSON.stringify(this.tableData)),
            };
            paramJson.weegetGoodsList.forEach(element => {
                element.sourcePrice =  floatCheng100(element.sourcePrice);
                element.discountPrice = floatCheng100(element.discountPrice);
                element.goodsName = encodeURIComponent(element.goodsName);
                element.jumpUrl = encodeURIComponent(element.jumpUrl);
            });
            sendPost(urls.updateGoodsList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.callGetGoodsList();
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
    width: 150px;
}

.priceInput {
    width: 80px;
} 

</style>
