<template>
<div>
    <el-breadcrumb class="nn-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/right/memberRightsProductList' }">会员权益产品</el-breadcrumb-item>
        <el-breadcrumb-item>编辑卡密产品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="170px" :inline="false" align="left" :rules="rules">
        <el-form-item label="会员权益产品：" prop="notifySwitch">
            {{form.productName}}
            <p class="specContent">
                 <span class="nn-require">是否打开缺货通知：</span>
                 <el-radio v-model="form.notifySwitch" :label="1">是</el-radio>
                <el-radio v-model="form.notifySwitch" :label="0">否</el-radio>
            </p>
        </el-form-item>
        <el-form-item label="所属权益品牌：" prop="notifyThreshold">
            {{form.benifitName}}
            <p class="specContent">
                 <span class="nn-require">未购买且未过期】卡密数量低于多少时：</span>
                 <el-input class="nn-input-s" v-model="form.notifyThreshold" placeholder=""></el-input>
            </p>
        </el-form-item>
        <el-form-item label="品牌供应商：">
              {{form.benifitSupplier}}
        </el-form-item>
        <el-form-item label="品牌类型：">
             {{form.benifitType | getLabelByValue(benifitTypeList)}}
        </el-form-item>

        <div class="nn-form-line-h"></div>

        <p class="ta-l mt-20 mb-10">产品规格</p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 60%" align="left" border>
                <el-table-column label="* 原价格" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="form.sourcePrice" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="* 交易价格" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="form.discountPrice" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="拿货价" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="form.purchasePrice" placeholder=""></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>

 

        <el-form-item label="产品主图：" prop="productPic">
            <VPickSelect :fileType="2" width="130px" height="80px" :index="1" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="form.productPic"></VPickSelect>
        </el-form-item>

      <div class="nn-form-line-h mt-20 mb-20"></div>

        <el-form-item label="购买须知信息：">
           <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" class="nn-input-l" v-model="form.purchaseNote" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="产品介绍信息：">
            <Editor ref="buyditor" id="buyditor" :defaultCon="form.productInstruction" ></Editor>
        </el-form-item>
        <el-form-item label="充值成功后的引导信息：">
            <Editor ref="chargeEditor" id="chargeEditor" :defaultCon="form.guidanceInformation" ></Editor>
        </el-form-item>
               <el-form-item label="充值成功后的跳转链接">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" class="nn-input-l" v-model="form.jumpUrl" placeholder=""></el-input>
        </el-form-item>
    </el-form>
    <div class="ta-l mt-20 nn-bottom-bar" v-if="!$route.query.viewOnly">
          <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Editor from '@/components/Editor';
import Vue from 'vue'
export default {
    data() {
        return {
            benifitTypeList:require('@/components/rights/benifitTypeList'),
            form: {
                productInstruction:'',
                guidanceInformation:'',
            },
            tableData: [{}],
            rules: {
                notifySwitch: [{
                    required: true,
                    message: '请选择是否打开缺货开关'
                }],
                notifyThreshold: [{
                    required: true,
                    message: '请填写信息'
                }],
                accountPrompt: [{
                    required: true,
                    message: '请填写信息'
                }],
                productPic: [{
                    required: true,
                    message: '请选择图片'
                }],
            },
            benifitProduct:{},
            benifitSpecList:[]
        }
    },
    mounted(){
        this.callGetBenifitProductDetail();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callUpdateBenifitProduct();
                 }
             })
        },
        onUploadSuccess(imgUrl,index){
            this.form.productPic  = imgUrl;
        },
        //权益产品详情
        callGetBenifitProductDetail() {
            let paramJson = {
                benifitProductId: this.$route.query.benifitProductId,
            };
            sendPost(urls.getBenifitProductDetail, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.benifitProduct = resultJson.resultData.benifitProduct; 
                this.benifitProduct.sourcePrice =  floatChu100(this.benifitProduct.sourcePrice);
                this.benifitProduct.discountPrice =  floatChu100(this.benifitProduct.discountPrice);
                this.benifitProduct.purchasePrice =  floatChu100(this.benifitProduct.purchasePrice);
                this.form = this.benifitProduct;
                
            });
        },
        //编辑权益产品
        callUpdateBenifitProduct() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.form)),
            }
            if(isNaN(paramJson.sourcePrice) ||isNull(paramJson.sourcePrice)) {
                warningToast('请填写原价格');
                return false;
            }
            if(isNaN(paramJson.discountPrice) || isNull(paramJson.discountPrice)) {
                warningToast('请填写交易价格');
                return false;
            }

            paramJson.sourcePrice = floatCheng100(paramJson.sourcePrice);
            paramJson.discountPrice =  floatCheng100(paramJson.discountPrice);
            paramJson.purchasePrice =  floatCheng100(paramJson.purchasePrice);
            paramJson.productInstruction  = getEditorContent(this.$refs.buyditor)
            paramJson.guidanceInformation  = getEditorContent(this.$refs.chargeEditor)
            
            sendPost(urls.updateBenifitProduct, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.callGetBenifitProductDetail();
                });
            });
        },
    },
    components: {
        VPickSelect,
        Editor
    }
}
</script>

<style lang="scss" scoped>
  .specContent {
    color: rgb(96, 98, 102);
    display: inline-block;
    margin-left: 5vw;
  }

 
</style>
