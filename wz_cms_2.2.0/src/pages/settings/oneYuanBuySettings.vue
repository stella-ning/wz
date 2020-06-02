<template>
<div>
    <el-form ref="form" :model="form" label-width="400px" :inline="true" align="left">
        <p class="mb-20">注：商品要提前在 【商品列表】设置为【1元购】或【5元购】；</p>
        <div>
            <el-form-item class="mt-20" label="每个5元购商品，每天最多可以产生返利订单个数">
            <el-input class="nn-input-xs" v-model="form.fiveYuanCount" placeholder=""></el-input>
            </el-form-item>
            <el-form-item class="mt-20" label="【当天可下单数】和【已下单数】再加数量">
                <el-input class="nn-input-xs" v-model="form.viewExtrasCount4" placeholder=""></el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="每个1元购商品，每天最多可以产生返利订单个数">
            <el-input class="nn-input-xs" v-model="form.oneYuanCount" placeholder=""></el-input>
            </el-form-item>
            <el-form-item class="lh-label" label="【当天可下单数】和【已下单数】再加数量">
                <el-input class="nn-input-xs" v-model="form.viewExtrasCount3" placeholder=""></el-input>
            </el-form-item>
        </div>
    </el-form>
    <div class="nn-table-wrapper">
        <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
            <el-table-column label="时间" prop="time" width="120">
            </el-table-column>
            <el-table-column label="1元购产品" prop="">
                <template slot-scope="scope">
                    <p v-if="!refreshCount"></p>
                    <el-button class="btnSelectGoods" type="default" icon="el-icon-plus" @click="showDialog(scope.row,scope.row.oneYuanList,3)">选择产品</el-button>
                    <div class="goodsBox" v-for="(item,index) in scope.row.oneYuanList" :key="index" >
                        <img class="goodsImage" :src="item.itemPic" fit="fill">
                        <span class="goodsName">{{item.itemName | cutWord(100)}}</span>
                        <el-button class="color-red btnDelete" type="text" @click="delRow(scope.row.oneYuanList,index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="5元购" prop="">
                <template slot-scope="scope">
                     <p v-if="!refreshCount"></p>
                    <el-button class="btnSelectGoods" type="default" icon="el-icon-plus" @click="showDialog(scope.row,scope.row.fiveYuanList,4)">选择产品</el-button>
                    <div v-show="refreshCount" class="goodsBox" v-for="(item,index) in scope.row.fiveYuanList" :key="index">
                        <img class="goodsImage" :src="item.itemPic" fit="fill">
                        <span class="goodsName">{{item.itemName | cutWord(100)}}</span>
                        <el-button class="color-red btnDelete" type="text" @click="delRow(scope.row.fiveYuanList,index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>

    <OneYuanBuyAddGoodsDialog :dialogForm="dialogForm" @onSelect="onSelectGoods"></OneYuanBuyAddGoodsDialog>

    <div class="ta-l mt-20 nn-bottom-bar" ref="bottomBar">
        <el-button type="primary" @click="callSetItemPromotion">保 存</el-button>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import OneYuanBuyAddGoodsDialog from '@/components/goods/OneYuanBuyAddGoodsDialog'
export default {
    data() {
        return {
            refreshCount: 1,
            dialogForm: {
                dialogVisible: false,
                type:0,
            },
            form: {},
            keyword: '',
            dialogVisible: false,
            tableData: [{
                time: '10:10',
                goodsList: [],
                goodsListTwo: [],
            }, {
                time: '12:10',
                goodsList: [],
                goodsListTwo: [],
            }],
            dialogGoodsList: [],
            currentGoodsList: [],
         
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.callGetOneOrFiveItemList();
        })
    },
    created() {
        // for (let index = 0; index < 20; index++) {
        //     this.dialogGoodsList.push({
        //         goodsName: index + ' airpod pro airpod pro airpod pro airpod pro airpod pro airpod pro airpod pro airpod pro airpod pro 新耳机 新耳机 新耳机 新耳机 新耳机 新耳机',
        //         goodsImageUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2865594839,1165851631&fm=26&gp=0.jpg',
        //         goodsId: index + 1,
        //     })
        // }
    },
    watch:{
        currentGoodsList:{
            deep:true,
            handler(){
                 this.refreshView();
            }
        }
    },
    methods: {
        // 手动触发界面更新
        refreshView() {
            this.refreshCount++;
        },
        onSelectGoods(selectList) {
            let tempList = [...this.currentGoodsList];
            selectList.forEach(element => {
                if (tempList.findIndex(item => item.itemPkId == element.itemPkId) == -1) {
                    this.currentGoodsList.push(element);
                }
            });
           
        },
        delRow(list, index) {
            list.splice(index, 1);
            this.refreshView();
        },
        showDialog(row, currentList,type) {
            this.dialogForm.dialogVisible = true;
            this.dialogForm.type = type;
            this.currentGoodsList = currentList;
            // this.dialogGoodsList.forEach(element => {
            //     Vue.set(element, 'checked', false)
            //     list.forEach(jItem => {
            //         if (element.goodsId == jItem.goodsId) {
            //             Vue.set(element, 'checked', true)
            //         }
            //     });
            // });

        },

        checkItem(row) {
            Vue.set(row, 'checked', !row.checked)
        },
        callGetOneOrFiveItemList() {
            let paramJson = {
            };
            sendPost(urls.getOneOrFiveItemList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.activityItems;
                var oneYuanInit = false;
                var fiveYuanInit = false;
                this.tableData.forEach((element,index) => {
                    element.oneYuanList = element.oneYuanList || [];
                    element.fiveYuanList = element.fiveYuanList || [];
                    // 随便从一个元素取
                    if(!oneYuanInit) {
                        if(element.oneYuanList.length > 0) {
                            oneYuanInit = true;
                            Vue.set(this.form,'oneYuanCount',element.oneYuanList[0].quantity);
                            Vue.set(this.form,'viewExtrasCount3',element.oneYuanList[0].viewExtrasCount);
                        }
                        else{
                            Vue.set(this.form,'oneYuanCount','');
                            Vue.set(this.form,'viewExtrasCount3','');
                        }
                    }
                    if(!fiveYuanInit) {
                        if(element.fiveYuanList.length > 0) {
                            fiveYuanInit = true;
                            Vue.set(this.form,'fiveYuanCount',element.fiveYuanList[0].quantity);
                            Vue.set(this.form,'viewExtrasCount4',element.fiveYuanList[0].viewExtrasCount);
                        }
                        else {
                            Vue.set(this.form,'fiveYuanCount','');
                            Vue.set(this.form,'viewExtrasCount4','');
                        }
                    }
                   
                    
                });
               
            });
        },
        callDeleteItemPromotion() {
            let paramJson = {
                itemPromotionId: 'itemPromotionId',
            };
            sendPost(urls.deleteItemPromotion, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {

            });
        },
        //设置活动专区展示商品
        callSetItemPromotion() {
            let paramJson = {
                setting: [],
                ...this.form
            };
            this.tableData.forEach(element => {
                element.oneYuanList.forEach(oneYuanItem => {
                    paramJson.setting.push({
                        id: oneYuanItem.itemPkId,
                        type: 3, //3-1元购，4-5元购，2-0元购
                        startTime: element.time,
                    })
                });
                element.fiveYuanList.forEach(fiveYuanItem => {
                    paramJson.setting.push({
                        id: fiveYuanItem.itemPkId,
                        type: 4, //3-1元购，4-5元购，2-0元购
                        startTime: element.time,
                    })
                });
            });
            sendPost(urls.setItemPromotion, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.callGetOneOrFiveItemList();
                });
            });
        },

    },
    components: {
        OneYuanBuyAddGoodsDialog
    }
}
</script>

<style lang="scss" scoped>
.goodsBox {
    display: flex;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px 20px 10px 0;

    .goodsImage {
        align-items: center;
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border: 1px solid #e0e0e0;
    }

    .goodsName {
        flex: 1;
        align-items: center;
        margin-right: 16px;
        display: inline-flex;
    }

    .goodsCheck {
        display: inline-flex;
        align-items: center;
    }
}

.btnSelectGoods {
    width: 100%;
    margin-bottom: 10px;
}

::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}

.btnDelete:hover {
    color: red;
    opacity: .7;
}

/deep/ .lh-label .el-form-item__label{
    line-height: 24px;
}
</style>
