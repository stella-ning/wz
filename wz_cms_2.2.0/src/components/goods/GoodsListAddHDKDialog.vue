<template>
<div>
    <!-- 同步好单库对话框 -->
    <el-dialog title="添加商品（同步好单库）" :visible.sync="addHDKDialogForm.addHDKDialogVisible" width="60%" style="text-align: left">
        <el-form ref="addHDKDialogForm" :model="addHDKDialogForm" label-width="180px" :inline="false" align="left">
            <el-form-item label="商品倾向">
                <el-select v-model="addHDKDialogForm.nav" placeholder="请选择">
                    <el-option v-for="item in navList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="商品类目">
                <div>
                    <el-checkbox v-model="addHDKDialogForm.checkAll" @change="onCheckAllChange">全选</el-checkbox>
                    <div>
                        <el-checkbox v-for="(item,index) in addHDKDialogCategories" v-model="item.checked" :key="index" @change="onItemChange">{{item.cName}}
                            <span class="ml-20">添加</span>
                            <el-input class="nn-input-xs" v-model="item.count" placeholder=""></el-input>
                            <span>个商品</span>
                        </el-checkbox>

                    </div>
                </div>
            </el-form-item>
            <el-form-item label="">
                <p class="color-red lh-24">每次添加商品总数，最多不可超过500个；每个类目，单次添加，最多不可超过500个商品；且每个类目添加商品个数只能为：1,2,10,20,50,100,120,200,500；爆单榜的商品不需要填写商品数</p>
            </el-form-item>
            <el-form-item label="其他条件（非必填）">
                <div class="conditionTwoCell">
                    <el-checkbox v-model="addHDKDialogForm.priceChecked">券后价</el-checkbox>
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.priceStart" placeholder=""></el-input> ~
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.priceEnd" placeholder=""></el-input>
                </div>
                <div class="conditionTwoCell">
                    <el-checkbox v-model="addHDKDialogForm.saleChecked">销量</el-checkbox>
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.saleStart" placeholder=""></el-input> ~
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.saleEnd" placeholder=""></el-input>
                </div>
                <div class="conditionTwoCell">
                    <el-checkbox v-model="addHDKDialogForm.couponChecked">券金额</el-checkbox>
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.couponStart" placeholder=""></el-input> ~
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.couponEnd" placeholder=""></el-input>
                </div>
                <div class="conditionTwoCell">
                    <el-checkbox v-model="addHDKDialogForm.tkratesChecked">佣金比例</el-checkbox>
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.tkratesStart" placeholder=""></el-input> % ~
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.tkratesEnd" placeholder=""></el-input> %
                </div>
                <div class="conditionTwoCell">
                    <el-checkbox v-model="addHDKDialogForm.tkmoneyChecked">佣金</el-checkbox>
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.tkmoneyStart" placeholder=""></el-input>  ~
                    <el-input class="nn-input-xs" v-model="addHDKDialogForm.tkmoneyEnd" placeholder=""></el-input> 
                </div>
            </el-form-item>
            <el-form-item label="是否只获取营销返利商品">
                <el-radio v-model="addHDKDialogForm.itemType" label="1">是</el-radio>
                <el-radio v-model="addHDKDialogForm.itemType" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="添加成商品类型：">
                <el-radio v-model="addHDKDialogForm.activityId" label="1">普通</el-radio>
                <el-radio v-model="addHDKDialogForm.activityId" label="2">0元购</el-radio>
                <el-radio v-model="addHDKDialogForm.activityId" label="3">1元购</el-radio>
                <el-radio v-model="addHDKDialogForm.activityId" label="4">5元购</el-radio>
            </el-form-item>
            <el-form-item label="商品版块分类(仅限普通商品)：" v-if="addHDKDialogForm.activityId == 1">
                <el-checkbox v-for="(item,index) in addHDKDialogPlates" v-model="item.checked" :key="index" >
                    {{item.plateName}}
                </el-checkbox>
            </el-form-item>
            

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addHDKDialogForm.addHDKDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callSyncItemsFromHdk">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 处理中 -->
    <el-dialog title="" :visible.sync="addingDialogVisible" width="40%"   style="text-align: left">
        <div v-if="addState == 1" class="lh-24">
             <p class="ta-c">正在处理中，请稍后......</p>
             <!-- <p class="ta-c mt-40 fs-18">预计还需要xx分钟完成商品添加</p> -->
        </div>
        <p v-if="addState == 2" class="fs-18 ta-c">共有<span class="color-red">{{addCount}}</span>个商品成功添加至商品库！</p> 
        <p v-if="addState == 2" class="fs-18 ta-c">共有<span class="color-red">{{updateCount}}</span>个商品成功更新至商品库！</p> 
        <span slot="footer" class="dialog-footer">
            <el-button @click="addingDialogVisible = false">关  闭</el-button>
       </span>
    </el-dialog>
</div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            updateCount:0,
            addCount:0,
            addState:1,
            addingDialogVisible:false,
            loadSuccess: false,
            navList: [{
                label: '实时跑单商品',
                value: 1
            }, {
                label: '爆单榜商品',
                value: 2
            }, {
                label: '全部商品',
                value: 3
            }, {
                label: '纯视频单',
                value: 4
            }, {
                label: '聚淘专区',
                value: 5
            }, ],
        }
    },
    methods: {
        showAddingDialog(){
            this.addingDialogVisible = true;
            this.addCount = 0;
            this.addState = 1;
        },
        onCheckAllChange() {
            this.addHDKDialogCategories.forEach(element => {
                Vue.set(element, 'checked', this.addHDKDialogForm.checkAll)
            });
        },
        onItemChange() {
            let checkCount = this.addHDKDialogCategories.filter(item => item.checked == true).length;
            let totalCount = this.addHDKDialogCategories.length;
            if (checkCount < totalCount) {
                this.addHDKDialogForm.checkAll = false;
            } else if (checkCount == totalCount) {
                this.addHDKDialogForm.checkAll = true;
            }
        },
        //同步好单库
        callSyncItemsFromHdk() {
            let paramJson = {
                cidList: [],
                plateIds: [],
            };
            paramJson = {
                ...paramJson,
                ...this.addHDKDialogForm
            };
            //找出被选中的商品版块分类
            this.addHDKDialogPlates.map(item=>{
                if(item.checked){
                    paramJson.plateIds.push(item.plateId)
                }
            })
            // 找出被选中的类目
            this.addHDKDialogCategories.filter(item => item.checked).forEach(element => {
                paramJson.cidList.push({
                    cid: element.categoryId,
                    count: element.count,
                })
            });
            
            // 没有被选中的条件不需要上传
            if (!this.addHDKDialogForm.priceChecked) {
                paramJson.pricesStart = '';
                paramJson.priceEnd = '';
            }
            if (!this.addHDKDialogForm.saleChecked) {
                paramJson.saleStart = '';
                paramJson.saleEnd = '';
            }
            if (!this.addHDKDialogForm.couponChecked) {
                paramJson.couponStart = '';
                paramJson.couponEnd = '';
            }
            if (!this.addHDKDialogForm.tkratesChecked) {
                paramJson.tkratesStart = '';
                paramJson.tkratesEnd = '';
            }
            if (!this.addHDKDialogForm.tkmoneyChecked) {
                paramJson.tkmoneyStart = '';
                paramJson.tkmoneyEnd = '';
            }
            if (paramJson.cidList.length == 0) {
                warningToast('请选择商品类目');
                return;
            }
            var totalCount = 0;
            paramJson.cidList.forEach(element => {
                if(isNumber(element.count)) {
                     totalCount = totalCount + Number(element.count);
                }
               
            });
            if(totalCount >  500) {
                warningToast('总数不能超过500');
                return;
            }
            console.log('totalCount:',totalCount);
            this.showAddingDialog();
            sendPost(urls.syncItemsFromHdk, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.addHDKDialogForm.addHDKDialogVisible = false;
                this.addCount = resultJson.resultData.addCount;
                this.updateCount = resultJson.resultData.updateCount;
                this.addState = 2
            });
            
        },
    },
    watch: {
        'addHDKDialogForm.addHDKDialogVisible'() {
            if (this.addHDKDialogForm.addHDKDialogVisible) {
                this.addHDKDialogCategories.forEach(element => {
                    Vue.set(element, 'checked', false);
                    if (this.loadSuccess) {
                        Vue.set(element, 'count', 10);
                    }
                });
                this.addHDKDialogPlates.forEach(element => {
                    Vue.set(element, 'checked', false);
                });
            }
            this.addHDKDialogForm.checkAll = false;
            for (const key in this.addHDKDialogForm) {
                let element = this.addHDKDialogForm[key];
                if (key.includes('Checked')) {
                    Vue.set(this.addHDKDialogForm, key, '')
                }
                if (key.includes('Start') || key.includes('End')) {
                    Vue.set(this.addHDKDialogForm, key, '')
                }
            }
            Vue.set(this.addHDKDialogForm, 'itemType', '1')
        },
        addHDKDialogCategories: {
            deep: true,
            handler() {
                if (this.addHDKDialogCategories.length > 0) {
                    this.loadSuccess = true;
                }
            }
        },
        loadSuccess() {
            if (this.loadSuccess) {
                this.addHDKDialogCategories.forEach(element => {
                    Vue.set(element, 'count', 10)
                });
            }
        }
    },
    props: ['addHDKDialogForm', 'addHDKDialogCategories' , 'addHDKDialogPlates']
}
</script>

<style lang="scss" scoped>
.conditionTwoCell {
    margin-bottom: 5px;
}

/deep/ .conditionTwoCell .el-checkbox {
    width: 80px;
}
</style>
