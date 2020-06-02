<template>
<div class="nn-table-wrapper">
    <el-table class="mt-20 nn-no-overflow-table" :data="tableData" :fit='true'  align="left" border>
        <el-table-column label="*品牌logo" prop="" width="150">
            <template slot-scope="scope">
                <VPickSelect :fileType="3" width="130px" height="80px"  :index="scope.row" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.homeBrandPic"></VPickSelect>
            </template>
        </el-table-column>
        <el-table-column label="*品牌名" prop="" min-width="250">
            <template slot-scope="scope">
                <el-input class="nn-input-s" v-model="scope.row.homeBrandName" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="*结束时间" prop="" width="270">
                <template slot-scope="scope">
                     <el-date-picker v-model="scope.row.endTime" type="datetime" placeholder="选择时间">
                    </el-date-picker>
                </template>
        </el-table-column>
        <el-table-column label="标签" prop="" width="150">
            <template slot-scope="scope">
                <el-input class="nn-input-xs" v-model="scope.row.tagOne" placeholder=""></el-input>
                <el-input class="nn-input-xs mt-10" v-model="scope.row.tagTwo" placeholder=""></el-input>
                <el-input class="nn-input-xs mt-10" v-model="scope.row.tagThree" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="*小程序链接" prop="" width="280">
            <template slot-scope="scope">
                 <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 6}" class="nn-input-s inputUrl mt-10" v-model="scope.row.jumpUrl" placeholder=""></el-input>
            </template>
        </el-table-column>
        <el-table-column label="*入口是否显示" prop="" width="150">
            <template slot-scope="scope">
                <el-radio v-model="scope.row.goodsState" :label="1"  class="ml-10">显示</el-radio>
                <el-radio v-model="scope.row.goodsState" :label="0">不显示</el-radio>
            </template>
        </el-table-column>
       <el-table-column label="*商品图" prop="" width="160">
           <template slot-scope="scope">
                 <VPickSelect :fileType="3" width="130px" height="80px"  :index="scope.row" subTips="选择图片" @onUploadSuccess="onUploadSuccessGoodsPicOne" class="pic-selecter" :logoImageUrl="scope.row.goodsPicOne"></VPickSelect>
                 <VPickSelect :fileType="3" width="130px" height="80px"  :index="scope.row" subTips="选择图片" @onUploadSuccess="onUploadSuccessGoodsPicTwo" class="pic-selecter mt-10" :logoImageUrl="scope.row.goodsPicTwo"></VPickSelect>
                 <VPickSelect :fileType="3" width="130px" height="80px"  :index="scope.row" subTips="选择图片" @onUploadSuccess="onUploadSuccessGoodsPicThree" class="pic-selecter mt-10" :logoImageUrl="scope.row.goodsPicThree"></VPickSelect>
           </template>
       </el-table-column>
       <el-table-column label="*商品价格" prop="" width="160">
           <template slot-scope="scope">
                <el-input class="nn-input-xs" v-model="scope.row.discountPriceOne" placeholder=""></el-input>
                <el-input class="nn-input-xs mt-40" v-model="scope.row.discountPriceTwo" placeholder=""></el-input>
                <el-input class="nn-input-xs mt-40" v-model="scope.row.discountPriceThree" placeholder=""></el-input>
           </template>
       </el-table-column>
       
    </el-table>
    <div class="ta-l mt-20 nn-bottom-bar">
       <el-button type="primary" @click="callUpdateWeegetHoneBrandList">保 存</el-button>
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
             Vue.set(index,'homeBrandPic',imgUrl)
        },
        onUploadSuccessOne(imgUrl,index){
             Vue.set(index,'goodsPicOne',imgUrl)
        },
        onUploadSuccessGoodsPicOne(imgUrl,index){
             Vue.set(index,'goodsPicOne',imgUrl)
        },
        onUploadSuccessGoodsPicTwo(imgUrl,index){
             Vue.set(index,'goodsPicTwo',imgUrl)
        },
        onUploadSuccessGoodsPicThree(imgUrl,index){
             Vue.set(index,'goodsPicThree',imgUrl)
        },
    
        callGetGoodsList() {
            let paramJson = {
            };
            sendPost(urls.getWeegetHoneBrandList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData = resultJson.resultData.weegetHomeBrandList;
                this.tableData.forEach(element => {
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
        callUpdateWeegetHoneBrandList() {
            let paramJson = {
                weegetHomeBrandList:JSON.parse(JSON.stringify(this.tableData)),
            };
            sendPost(urls.updateWeegetHoneBrandList, {data: JSON.stringify(paramJson)},(resultJson)=>{
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
    width: 250px;
}  

.smallInput {
    width: 150px;
}

.priceInput {
    width: 80px;
} 

</style>
