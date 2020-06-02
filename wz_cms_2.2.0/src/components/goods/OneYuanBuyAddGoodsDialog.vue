<template>
<el-dialog :title="title" :visible.sync="dialogForm.dialogVisible" width="40%" top="1%" style="text-align: left">
    <div>
        <el-input class="mb-20" placeholder="请输入商品名称" v-model="dialogForm.keyword" v-lazyinput="callFirstPage">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <ul class="goodsList">
            <div v-for="(item,index) in dialogTableData" :key="index" @click="checkItem(item)">
                <li class="goodsBox pointer" :class="{'goodsBoxSelected':item.checked}">
                    <img class="goodsImage" :src="item.itemPic" fit="fill">
                    <span class="goodsName">{{item.itemName | cutWord(100)}}</span>
                    <el-checkbox class="goodsCheck" v-model="item.checked"> </el-checkbox>
                </li>
            </div>
        </ul>
        <VPagination class="mt-20" ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogForm.dialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="confirmSelected">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import VPagination from "@/components/VPagination";
import Vue from 'vue'
export default {
    data() {
        return {
            dialogGoodsList: [],
            dialogTableData: [],
            tableData: [],
            totalPageCount: 0,
            selectList:[],
        }
    },
    methods: {
        checkItem(row) {
            Vue.set(row, 'checked', !row.checked)
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);

        },
        callTableData(paramJson) {
            paramJson.type = this.dialogForm.type; //3-1元购，4-5元购
            paramJson.keyword = this.dialogForm.keyword;
            sendPost(urls.getNotSetItemPromotionList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.dialogTableData = resultJson.resultData.activityItems;
                this.totalPageCount = resultJson.resultData.count;
            });
        },
        confirmSelected() {
            //获取被选中的商品
            this.dialogTableData.filter(item => item.checked == true).forEach(item => {
                // 被选中的商品不存在于要添加的商品列表中
                if (this.selectList.findIndex(jItem => jItem.itemPkId == item.itemPkId) < 0) {
                    this.selectList.push(item)
                }
            })
            if(this.selectList.length == 0) {
                warningToast('请选择商品');
                return;
            }
            this.dialogForm.dialogVisible = false;
            this.$emit('onSelect',this.selectList)
        },
    },
    watch: {
        'dialogForm.dialogVisible'() {
            this.$nextTick(() => {
                if (this.dialogForm.dialogVisible) {
                    this.selectList = [];
                    this.callFirstPage();
                }
            })
        },
        
    },
    props: {
        dialogForm: {
            default: {
                dialogVisible: false,
                type:'',
            }
        },
    },
    computed:{
        title(){
            var name = this.dialogForm.type == 3 ? '1' : '5';
            return `当前未设置至版块的【${name}元购】商品：`;
        }
    },
    components: {
        VPagination
    }
}
</script>

<style lang="scss" scoped>
.goodsList {
    overflow-y: scroll;
    max-height: 60vh;

    .goodsBox {
        padding-left: 10px;
    }

    .goodsBoxSelected {
        // border: 1px solid #409EFF;
        color: #409EFF;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
        border-bottom: 1px solid rgba(64, 158, 255, .5);
    }
}
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
</style>
