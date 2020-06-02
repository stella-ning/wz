<template>
    <div>
        <p class="subTitle">新建商品活动>分组商品来源</p>
        <el-form ref="form" :model="resourceDatas" label-width="30%"  align="left">
            <el-form-item label="商品分组名称：">
                <span>{{itemActGroups.groupName}}</span>
            </el-form-item>
            <el-form-item label="分组商品来源：">
                <el-radio v-model="resourceDatas.itemSource" :label="1">本地商品库</el-radio>
                <el-radio v-model="resourceDatas.itemSource" :label="2">淘宝api物料拉取</el-radio>
            </el-form-item>
            <el-divider></el-divider>
            <div v-if='resourceDatas.itemSource == 1' class="itemSorceGoodsList">
                <dl v-for="(item,index) in resourceDatas.itemActGroupParts" :key="index">
                    <dt>
                        <img :src="item.imgUrl" alt="">
                    </dt>
                    <dd>
                        <p>商品名称：{{item.itemName}}</p>
                        <p>商品id:{{item.itemPkId}}</p>
                        <p>
                            组内排序值：
                            <el-input v-model="item.itemSort" placeholder=""></el-input>
                            <el-button  type="text" style="color:red;" @click="deleteGood(index)">删除商品</el-button>
                        </p>
                    </dd>
                </dl>
            </div>
            <div v-else-if='resourceDatas.itemSource == 2' class="itemSorceGoodsList">
                <el-form-item label="调用的淘宝物料api种类为：">
                    <el-select 
                        v-model="resourceDatas.tbMaterialCatId"
                        filterable
                        allow-create
                        default-first-option 
                        placeholder="请选择"
                        @change='selectTbMaterial'
                    >
                        <el-option
                            v-for="item in tbMaterialCats"
                            :key="item.tbMaterialCatId"
                            :label="item.catName"
                            :value="item.tbMaterialCatId"

                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%;margin-left:0" align="left" border>
                    <el-table-column label="淘宝物料api" prop="catName">
                        
                    </el-table-column>
                    <el-table-column label="使用地方" prop="useIn">
                        
                    </el-table-column>
                    <el-table-column label="简介" prop="catDesc">
                        
                    </el-table-column>
                    <el-table-column label="配置项" >
                        <template slot-scope="scope">
                            <el-form-item label="本活动要显示的分类：">
                                <el-radio v-for="(item,index) in scope.row.tbMaterials" :key="index" v-model="resourceDatas.tbMaterialId" :label="item.tbMaterialId">{{item.materialName}}</el-radio>
                            </el-form-item>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-divider></el-divider>
            <el-button  type="primary" size="medium"  @click="submitForm">保存</el-button>
            <el-button  type="primary" size="medium"  @click="cancelFn">取消</el-button>
            <el-button  type="primary" size="medium" icon="el-icon-plus" @click="addGoodFn" v-if='resourceDatas.itemSource == 1'>给分组添加商品</el-button>
        </el-form>
        <el-dialog title="给分组添加商品" :visible.sync="dialogVisible" width="45%" top="2%"  :close-on-click-modal="false">
            <el-form :model="goodForm" label-width="20%"  :inline="true" align="left">
                <el-form-item label="商品id：">
                    <el-input v-model="goodForm.id" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="组内排序值：">
                    <el-input v-model="goodForm.itemSort" placeholder=""></el-input>
                </el-form-item>
                <div class="notice">
                    <p>注意：</p>
                    <p>1、只能添加0元购、普通商品；</p>
                    <p>2、用户完成0元购任务后，0元购商品，才会在列表中显示。</p>
                </div>
                <div class="btns">
                    <el-button  type="primary" size="medium"  @click="sureFn">添加</el-button>
                    <el-button  type="primary" size="medium"  @click="dialogVisible = false">取消</el-button>
                </div>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        props:{
            index:'',
            itemActGroups:Object,
        },
        data(){
            return{
                resourceDatas:{
                    resourceIndex:this.index,
                    itemSource:'',
                    tbMaterialCatId:'',
                    tbMaterialId:'',
                    itemActGroupParts:[],
                },
                itemTemplate:{
                    itemActGroupPartId:'',
                    itemPkId:'',
                    itemName:'',
                    imgUrl:'',
                    itemSort:'',
                },
                goodForm:{},
                dialogVisible:false,
                tbMaterialCats:[],
                tableData:[]
            }
        },
        created() {
            let resourcedata = this.itemActGroups;
            for (var key in resourcedata) {
                if (resourcedata.hasOwnProperty(key)) {
                    var element = resourcedata[key];
                    this.$set(this.resourceDatas, key, element)
                }
            }
        },
        mounted(){
            this.getSimplyCats()
        },
        methods:{
            submitForm(){
                this.$emit('resourceDatas', this.resourceDatas)
            },
            cancelFn(){
                this.$emit('cancleEdit')
            },
            addGoodFn(){
                //初始化数据
                this.dialogVisible = true;
            },
            sureFn(){
                let params = {
                    id:this.goodForm.id
                };
                sendPost(urls.getItemNameAndImgUrlById, {
                        data: JSON.stringify(params)
                    },
                    (res)=> {
                        let resData = res.resultData;
                        this.itemTemplate = {};
                        for (var key in resData) {
                            if (resData.hasOwnProperty(key)) {
                                var element = resData[key];
                                this.$set(this.itemTemplate, key, element)
                            }
                        }
                        this.$set(this.itemTemplate, 'itemSort', this.goodForm.itemSort);
                        this.resourceDatas.itemActGroupParts.push(this.itemTemplate);
                        this.dialogVisible = false;
                        this.goodForm.itemSort = '';
                        this.goodForm.id = '';

                    }
                );
            },
            //获取淘宝物料的分类
            getSimplyCats(){
                
                let params = {};
                sendPost(urls.getSimplyCats, {
                        data: JSON.stringify(params)
                    },
                    (res)=> {
                        this.tbMaterialCats = res.resultData.tbMaterialCats;
                    }
                );
            },
            selectTbMaterial(val){
                this.tableData = [];
                let params = {
                    tbMaterialCatId:val
                };
                sendPost(urls.getMaterialList, {
                        data: JSON.stringify(params)
                    },
                    (res)=> {
                       console.log(res)
                       this.tableData.push(res.resultData.catWithMaterials)
                    }
                );
            },
            deleteGood(index){
                this.resourceDatas.itemActGroupParts.splice(index,1)
            }
            
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-form--inline .el-form-item__content{
        width:50%;
    }
    /deep/ .el-form--inline .el-form-item{
        width:100%;
    }
    /deep/ .el-dialog__header{
        text-align: left;
    }
    /deep/ .el-form--inline .el-form-item__label{
        text-align:left;
    }
    .notice{
        margin-top: 20px;
        color: red;
        line-height: 25px;
        margin-bottom: 20px;
    }
    .itemSorceGoodsList{
        dl{
            display:flex;
            align-items: center;
            padding-bottom:10px;
            margin-bottom:10px;
            border-bottom:1px solid #ccc;
            dt{
                width:15%;
                height:120px;
                margin-right:.9375rem /* 15/16 */;
                
                img{
                    width:100%;
                    height:100%;
                    max-width:100%;
                }
            }
            dd{
                width:80%;
                p{
                    line-height:20px;
                    .el-input{
                        width:200px;
                    }
                }
            }
        }
    }
    .subTitle{
        text-align:left;
        line-height:30px;
    }
</style>