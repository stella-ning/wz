<template>
<div>
    <el-breadcrumb class="nn-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/right/memberRightsProductList' }">会员权益产品</el-breadcrumb-item>
        <el-breadcrumb-item>编辑直充产品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="180px" :inline="false" align="left" :rules="rules">
        <el-form-item label="会员权益产品：">
            {{form.productName}}
        </el-form-item>
        <el-form-item label="所属权益品牌：">
            {{form.benifitName}}
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
            <el-table class="mt-20 nn-no-overflow-table" :data="benifitSpecList" style="width: 100%" align="left" border>
                <el-table-column label="第三方id号" prop="specCode">
                </el-table-column>
                <el-table-column label="类型" prop="specType">
                </el-table-column>
                <el-table-column label="规格名称" prop="specName">
                </el-table-column>
                <el-table-column label="* 原价格" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="scope.row.sourcePrice" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="* 交易价格" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="scope.row.discountPrice" placeholder=""></el-input>
                    </template>
                </el-table-column>
                   <el-table-column label="拿货价" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="scope.row.purchasePrice" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.specState" :label="1">上架</el-radio>
                        <el-radio v-model="scope.row.specState" :label="0">下架</el-radio>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>

        <el-form-item label="输入账号信息文案提示：" prop="accountPrompt">
            <el-input class="nn-input-s" v-model="form.accountPrompt" placeholder="请输入您的QQ"></el-input>
        </el-form-item>
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
    </el-form>
    <div class="ta-l mt-20 nn-bottom-bar" v-if="!$route.query.viewOnly">
          <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
import Editor from '@/components/Editor';
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
    created(){
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
                this.benifitSpecList = resultJson.resultData.benifitSpecList;
                this.benifitSpecList.forEach(element => {
                     element.sourcePrice =  floatChu100(element.sourcePrice);
                     element.discountPrice = floatChu100(element.discountPrice);
                     element.purchasePrice = floatChu100(element.purchasePrice);
                });
                this.form = this.benifitProduct;
            });
        },
        //编辑权益产品
        callUpdateBenifitProduct() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.form)),
                benifitSpecList:JSON.parse(JSON.stringify(this.benifitSpecList))
            }
            paramJson.benifitSpecList.forEach(element => {
                element.sourcePrice = floatCheng100(element.sourcePrice);
                element.discountPrice = floatCheng100(element.discountPrice);
                element.purchasePrice = floatCheng100(element.purchasePrice);
            });
            console.log('paramJson.benifitSpecList:',paramJson.benifitSpecList);
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

 
</style>
