<template>
<div>
    <el-breadcrumb class="nn-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/goods/goodsList' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="200px" :inline="false" align="left">
        <el-form-item label="商品id（系统生成）：">
            {{detail.id}}
        </el-form-item>
        <el-form-item label="商品名称：">
            {{detail.itemName}}
        </el-form-item>
        <el-form-item label="商品主图：">
            <img v-for="(item, index) in imageList" :key="index" class="goodsImage" :src="item" >
        </el-form-item>
        <el-form-item label="商品添加时间：">
            {{new Date(detail.addTime).Format()}}
        </el-form-item>
        <el-form-item label="商品信息最新更新时间：">
            {{new Date(detail.updateTime).Format()}}
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="商品原价格：">￥{{detail.price/100 | moneyFormat}}</el-form-item>
        <el-form-item label="商品券价格：">￥{{detail.couponAmount/100 | moneyFormat}}</el-form-item>
        <el-form-item label="券过期日：">{{new Date(Number(detail.couponEndTime)).Format()}}</el-form-item>
        <el-form-item label="商品券后价格：">￥{{detail.couponUsedPrice/100 | moneyFormat}}</el-form-item>
        <el-divider></el-divider>
        <el-form-item label="可获返佣比例：">{{detail.commissionRate}}%</el-form-item>
        <el-form-item label="可获返佣金额：">￥{{detail.commission/100 | moneyFormat}}</el-form-item>
        <el-form-item label="【0元购】可返佣 金额比例："> ￥{{detail.zeroAreaAllowance/100 | moneyFormat}} </el-form-item>
        <el-form-item label="【1元购】可返佣 金额比例："> ￥{{detail.oneAreaAllowance/100 | moneyFormat}} </el-form-item>
        <el-form-item label="【5元购】可返佣 金额比例："> ￥{{detail.fiveAreaAllowance/100 | moneyFormat}} </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="上架状态：">{{detail.online | getLabelByValue(onlineList)}}</el-form-item>
        <el-form-item label="商品排序值">
            <span>{{detail.itemSort}}</span>
            <span class="color-999">（产品顺序按照排序值倒序，同排序值按照商品添加时间倒序排序）</span>
        </el-form-item>
        
        <el-divider></el-divider>
        <el-form-item label="商品分类：">{{detail.cName}}</el-form-item>
        <el-form-item label="商品版块分类：">{{detail.plateName}}</el-form-item>
        <el-form-item label="是否设置为0元购：">{{detail.activityName}}</el-form-item>
        <el-form-item label="商品平台：">{{detail.itemPlatform}}</el-form-item>
        <el-form-item label="商品url推广链接：" class="urlLabel">
             <div class="lh-24">
                <span >（我们生成的专有链接）</span>
                <span >{{detail.couponUrl}}</span>
                </div>
            </el-form-item>
       
         <el-divider></el-divider>
        <el-form-item label="月销量：">{{detail.monthVolume}}</el-form-item>
         <el-divider></el-divider>
         <el-form-item label="店铺名称：">{{detail.shopName}}</el-form-item>
         <div class="ta-l mt-20 nn-bottom-bar ">
            <el-button type="primary" @click="showFunctionDialog('price')">设置0元购</el-button>
            <el-button type="primary" @click="showFunctionDialog('sort')">设置商品排序</el-button>
            <el-button type="primary" @click="showFunctionDialog('sale')">设置商品上下架</el-button>
            <el-button type="primary" @click="showDialog">设置商品板块</el-button>
         </div>
        
    </el-form>
      <GoodsListSettingsDialog :id="detail.id" :functionDialogForm="functionDialogForm"   @onSuccess="onEditSuccess"></GoodsListSettingsDialog>
      <el-dialog title="设置商品模块" :visible.sync="dialogVisible" width="40%"   style="text-align: left">
           <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
               <el-form-item label=" ">
                    <el-select v-model="form.plates" placeholder="请选择" multiple>
                        <el-option
                        v-for="item in platesList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
               </el-form-item>
               
           </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关  闭</el-button>
              <el-button type="primary" @click="callSetItemPlate">确  定</el-button>
         </span>
      </el-dialog>
</div>
</template>

<script>
import GoodsListSettingsDialog from '@/components/goods/GoodsListSettingsDialog'
import Vue from 'vue'
export default {
    data() {
        return {
            form: {
                plates:[],
            },
            dialogVisible:false,
            platesList:[],
            imageList: [],
            onlineList: [{
                label: '全部',
                value: '',
            }, {
                label: '上架',
                value: 1
            }, {
                label: '下架',
                value: 2
            }, ],
            functionDialogForm:{
               functionDialogVisible:false,
               functionDialogType:'',
               id: this.$route.query.id,
            },
            detail:{},
        }
    },
    created(){
        this.callGetPlateListForSearch();
        this.callGetItemDetail();
    },
    methods: {
        onEditSuccess(){
            this.callGetItemDetail();
        },
        showDialog(){
            this.dialogVisible = true;
        },
        showFunctionDialog(type) {
            this.functionDialogForm.functionDialogVisible = true;
            this.functionDialogForm.functionDialogType = type; 
        },
        callGetItemDetail() {
            let paramJson = {
                id: this.$route.query.id,
            };
            sendPost(urls.getItemDetail, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.detail = resultJson.resultData.detail;
                this.detail.taobaoImage = this.detail.taobaoImage || '';
                this.imageList = this.detail.taobaoImage.split(',');
                this.form.plates = [];
                if(this.detail.plateIds) {
                     (this.detail.plateIds || '').split(',').forEach(element => {
                        this.form.plates.push(Number(element));
                    });
                }
               
            });
        },
        callGetPlateListForSearch() {
            let paramJson = {
            };
            sendPost(urls.getPlateListForSearch, {data: JSON.stringify(paramJson)},(resultJson)=>{
                resultJson.resultData.plates.forEach(element => {
                    Vue.set(element,'label',element.plateName);
                    Vue.set(element,'value',element.plateId);
                });
                this.platesList = resultJson.resultData.plates;
            });
        },
        callSetItemPlate() {
            let paramJson = {
                id: this.$route.query.id,//商品id,
                plates:this.form.plates,
            };
            sendPost(urls.setItemPlate, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.dialogVisible = false;
                    this.callGetItemDetail();
                });
            });
        },
       
    },
    components:{
        GoodsListSettingsDialog
    }
}
</script>

<style lang="scss" scoped>
.goodsImage {
    width: 150px;
    margin-right: 10px;
    border: 1px solid #e0e0e0;
}

.urlLabel {
    color: #606266;
    word-break: break-all;
}
/deep/ .el-form-item {
    margin-bottom: 5px;
}
</style>
