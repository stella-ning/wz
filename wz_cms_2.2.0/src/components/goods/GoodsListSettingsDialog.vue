<template>
<el-dialog :title="functionDialogTitle" :visible.sync="functionDialogForm.functionDialogVisible" width="50%" style="text-align: left">
    <el-form ref="functionDialogForm" :model="functionDialogForm" label-width="180px" :inline="true" align="left">
        <el-form-item  label="设置1、0、5元购">
            <el-select v-model="functionDialogForm.activityId" placeholder="请选择" >
                <el-option v-for="item in activities" :key="item.activityId" :label="item.activityName" :value="item.activityId">
                </el-option>
            </el-select>
            <div class="mt-20" v-if="functionDialogForm.activityId == 2">
                 <el-checkbox v-for="(item,index) in actItemtypes" v-model="item.checked" :key="index">{{item.typeName}}</el-checkbox> 
            </div>
        </el-form-item>
        <el-form-item  label="设置排序值">
            <el-input class="nn-input-s" v-model="functionDialogForm.itemSort" placeholder="请输排序值"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <p class="color-999">（产品顺序按照排序值倒序，同排序值按照商品添加时间倒序排序）</p>
        </el-form-item>
        <el-form-item  label="设置上下架">
            <el-radio v-model="functionDialogForm.online" :label="1">上架</el-radio>
            <el-radio v-model="functionDialogForm.online" :label="2">下架</el-radio>
        </el-form-item>
        <el-form-item label="设置类目">
                <el-select v-model="functionDialogForm.cId" placeholder="请选择">
                <el-option v-for="item in categories" :key="item.categories" :label="item.cName" :value="item.cId">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="functionDialogForm.functionDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="callSetActivityType">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            activities:[],
            detail:{},
            actItemtypes:{},
            categories:[],
        }
    },
    methods: {
         callGetItemDetail() {
            let paramJson = {
                id: this.functionDialogForm.id,
            };
            sendPost(urls.getItemDetail, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.detail = resultJson.resultData.detail;
                for (const key in this.detail) {
                    if (this.detail.hasOwnProperty(key)) {
                        const element = this.detail[key];
                        Vue.set(this.functionDialogForm,key,element)
                    }
                }
                this.callGetActItemTypes();
            });
        },
         // 获取下拉活动列表
        callGetActivityListForSearch() {
            let paramJson = {};
            sendPost(urls.getActivityListForSearch, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.activities = resultJson.resultData.activities;
            });
        },
         //获取0元购营销分类
        callGetActItemTypes() {
            let paramJson = {
                forSearch: '2',
            };
            sendPost(urls.getActItemTypes, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.actItemtypes = resultJson.resultData.actItemtypes;
                this.detail.actItemTypeIds = this.detail.actItemTypeIds || '';
                this.detail.actItemTypeIds = this.detail.actItemTypeIds.split(',') || [];
                this.actItemtypes.forEach(element => {
                    Vue.set(element,'checked', this.detail.actItemTypeIds.findIndex(item=>item == element.actItemTypeId) > -1? true : false)
                });
            });
        },
        callGetCategoryListForSearch() {
            let paramJson = {};
            sendPost(urls.getCategoryListForSearch, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.categories = resultJson.resultData.categories
            });
        },
        //设置商品为普通商品、0元购、1元购或者是5元购
        callSetActivityType() {
           let paramJson = {
                // id: this.functionDialogForm.id,
                // activityId: this.functionDialogForm.activityId,
                ...JSON.parse(JSON.stringify(this.functionDialogForm))
            };

            // let postUrl = '';
            // switch (this.functionDialogForm.functionDialogType) {
            //     case 'sort':
            //         if (isNull(this.functionDialogForm.itemSort)) {
            //             warningToast('请填写商品排序值');
            //             return;
            //         }
            //         paramJson.itemSort = this.functionDialogForm.itemSort;
            //         postUrl = urls.setItemSort;
            //         break;
            //     case 'sale':
            //         if (isNull(this.functionDialogForm.online)) {
            //             warningToast('请选择商品上下架');
            //             return;
            //         }
            //         paramJson.online = this.functionDialogForm.online;
            //         postUrl = urls.setItemOnline;
            //         break;
            //     case 'price':
            //         if (isNull(this.functionDialogForm.activityId)) {
            //             warningToast('请选择商品活动类型');
            //             return;
            //         }
            //         // 设置0元购营销分类
            //         if(this.functionDialogForm.activityId == 2) {
            //              paramJson.actItemTypes = [];
            //             this.actItemtypes.forEach(element => {
            //                 if(element.checked) {
            //                     paramJson.actItemTypes.push(element.actItemTypeId)
            //                 }
            //             });
            //         }
            //         paramJson.activityId = this.functionDialogForm.activityId;
            //         postUrl = urls.setActivityType;
            //         break;
            //     case 'category':
            //         if (isNull(this.functionDialogForm.cId)) {
            //             warningToast('请选择商品类目');
            //             return;
            //         }
            //         paramJson.cId = this.functionDialogForm.cId;
            //         postUrl = urls.setItemCategory;
            //     break;
            //     default:
            //         break;
            // }

             // 设置0元购营销分类
            if(this.functionDialogForm.activityId == 2) {
                    paramJson.actItemTypes = [];
                this.actItemtypes.forEach(element => {
                    if(element.checked) {
                        paramJson.actItemTypes.push(element.actItemTypeId)
                    }
                });
            }

            sendPost(urls.updateItemSetting, {data: JSON.stringify(paramJson) }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.functionDialogForm.functionDialogVisible = false;
                    this.$emit('onSuccess')
                });
            });
        },
    },
    watch:{
        'functionDialogForm.functionDialogVisible'(){
            // 重置参数
            if(this.functionDialogForm.functionDialogVisible) {
                this.callGetActivityListForSearch();
                this.callGetItemDetail();
                this.callGetCategoryListForSearch();
                // this.functionDialogForm.setItemSort = '';
                // this.functionDialogForm.online = '';
                // this.functionDialogForm.activityId = '';
            }
        }
    },
    props: ['functionDialogForm'],
    computed: {
        functionDialogTitle() {
            // if (this.functionDialogForm.functionDialogType == 'sort') {
            //     return '设置商品排序'
            // } else if (this.functionDialogForm.functionDialogType == 'sale') {
            //     return '设置商品上下架'
            // } else if (this.functionDialogForm.functionDialogType == 'price') {
            //     return '设置0、1、5元购'
            // } else if (this.functionDialogForm.functionDialogType == 'category') {
            //     return '设置商品类目'
            // }
            return '商品设置'
        },
       
    }

}
</script>

<style lang="scss" scoped>

 
</style>
