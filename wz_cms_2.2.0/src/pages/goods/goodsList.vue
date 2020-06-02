<template>
<div>
    <el-form ref="form" :model="form" label-width="170px" :inline="true" align="left">
        <el-form-item label="商品id">
            <el-input class="nn-input-s" v-model="form.id" placeholder="请输入商品id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
            <el-input class="nn-input-s" v-model="form.itemName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="是否设置为0|1|5元购">
            <el-select v-model="form.activityId" placeholder="请选择">
                <el-option v-for="item in activityIdList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="0元购商品分类设置">
            <el-select v-model="form.actItemTypeId" placeholder="请选择">
                <el-option
                v-for="item in actItemtypes"
                :key="item.actItemTypeId"
                :label="item.typeName"
                :value="item.actItemTypeId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label=" ">
            <el-select v-model="form.conditionId" class="inputCategory" placeholder="请选择" style="width:135px;" @change="onConditionChange">
                <el-option v-for="item in conditionList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="form.conditionMin" class="nn-input-s inputMin" placeholder="请输入开始条件"> </el-input>
            <span> ~ </span>
            <el-input class="nn-input-s" v-model="form.conditionMax" placeholder="请输入结束条件"></el-input>
        </el-form-item>
        <el-form-item label="上架状态">
            <el-select v-model="form.online" placeholder="请选择">
                <el-option v-for="item in onlineList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品最初来源">
            <el-select v-model="form.source" placeholder="请选择">
                <el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品板块分类">
            <el-select v-model="form.plateIds" placeholder="请选择" multiple>
                <el-option v-for="item in plates" :key="item.plateIds" :label="item.plateName" :value="item.plateId">
                </el-option>
            </el-select>

        </el-form-item>
        <el-form-item label="商品类目">
            <el-select v-model="form.categoryId" placeholder="请选择">
                <el-option v-for="item in categories" :key="item.categories" :label="item.cName" :value="item.categoryId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品添加时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="优惠券过期日">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickCoupon"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="商品信息最新更新时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickUpdate"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="商品是否存在于淘宝联盟">
           <el-select v-model="form.itemExists" placeholder="请选择">
               <el-option
               v-for="item in [{label:'全部',value:''},...itemExistsList]"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        <el-form-item class="function-bar" label="">
            <el-button type="success" icon="el-icon-plus" @click="showAddHDKDialog">添加商品（同步好单库）</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="showUpdateToTBKDialog">添加商品（直接同步淘客商选品库）</el-button>
            <el-button type="danger" icon="el-icon-sort" @click="showUpdateGoodsDialog">更新商品信息</el-button>
            <el-button type="default" icon="el-icon-moon-night" @click="showBatchDownShelfDialog">批量下架商品</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="showGoodsCategoryImagedialog">商品类目图片设置</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="showGoodsPlateImagedialog">商品板块图片设置</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="showZeroGoodsCategoryDialog">0元购商品分类设置</el-button>
            <el-button type="warning" icon="el-icon-setting" @click="showGoodsBatchHandleDialog">商品批处理</el-button>
             <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>

        <p class="nn-form-line-h"></p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="商品id（系统生成）" prop="id">
                    <template slot-scope="scope">
                          <router-link class="dp-ib" target="_blank" :to="{path: '/goods/goodsDetails', query: {id: scope.row.id}}">
                              <span type="text">{{scope.row.id}}</span>
                           </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="商品图" prop="" width="100">
                    <template slot-scope="scope">
                        <img style="width: 60px; height:60px" :src="scope.row.itemPic">
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="itemName" width="160">
                </el-table-column>
                <el-table-column label="平台" prop="itemPlatform">
                </el-table-column>
                <el-table-column label="上架状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.online | getLabelByValue(onlineList)}}
                    </template>
                </el-table-column>
                <el-table-column label="商品类目" prop="cName">
                </el-table-column>
                <el-table-column label="商品版块分类" prop="plateName">
                </el-table-column>
                <el-table-column label="设置0、1、5元购" prop="activityName">
                </el-table-column>
                <el-table-column label="商品价格" prop="" width="180">
                    <template slot-scope="scope">
                        <p>原价格：￥{{scope.row.price/100 | moneyFormat}}</p>
                        <p>券价格：￥{{scope.row.couponAmount/100 | moneyFormat}}</p>
                        <p>券后价格：￥{{scope.row.couponUsedPrice/100 | moneyFormat}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="券过期日" prop="" min-width="100">
                    <template slot-scope="scope" >
                        {{new Date(Number(scope.row.couponEndTime)).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="返佣信息" prop="" width="160">
                    <template slot-scope="scope">
                        <p>返佣比例：{{scope.row.commissionRate}}%</p>
                        <p>可获返佣金额：￥{{scope.row.commission/100 | moneyFormat}}</p>
                        <p>参考成本：￥{{scope.row.costReference/100 | moneyFormat}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="商品最初来源" prop="" width="160">
                    <template slot-scope="scope">
                        {{scope.row.source | getLabelByValue(sourceList)}}
                    </template>
                </el-table-column>
                <el-table-column label="销售情况" prop="" width="180">
                    <template slot-scope="scope">
                        <p>月销量：{{scope.row.monthVolume}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="商品排序值" prop="itemSort">
                </el-table-column>
                <el-table-column label="商品添加时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="商品信息最新更新时间" prop="" width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.updateTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="商品是否存在于淘宝联盟" prop="">
                    <template slot-scope="scope">
                        {{scope.row.itemExists | getLabelByValue(itemExistsList)}}
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" prop="" width="160">
                    <template slot-scope="scope">
                        <router-link target="_blank" :to="{path: '/goods/goodsDetails', query: {id: scope.row.id}}">
                           <el-button type="text">商品详情</el-button></router-link>
                        <el-button type="text" @click="showFunctionDialog('sort',scope.row)">设置商品排序</el-button>
                        <el-button type="text" @click="showFunctionDialog('sale',scope.row)">设置商品上下架</el-button>
                        <el-button type="text" @click="showFunctionDialog('price',scope.row)">设置1、0、5元购</el-button>
                        <el-button type="text" @click="showFunctionDialog('category',scope.row)">设置商品类目</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
    <!-- 添加好单库商品对话框 -->
    <GoodsListAddHDKDialog :addHDKDialogForm="addHDKDialogForm" 
        :addHDKDialogCategories="addHDKDialogCategories"
        :addHDKDialogPlates = addHDKDialogPlates
    ></GoodsListAddHDKDialog>
    <!-- 添加淘宝客户商品对话框 -->
    <el-dialog title="添加商品（直接同步淘宝客选品库）" :visible.sync="updateToTBKDialogVisible" width="50%" style="text-align: left" :close-on-click-modal="false">
        <div class="lh-24">
            <p v-if="updateToTBKDialogState == 1">是否将淘宝客选品库的商品，同步到自己的商品列表</p>
            <div v-if="updateToTBKDialogState == 2">
                <p>正在处理中，请稍后......</p>
                <!-- <p>预计还需要xx分钟完成商品添加</p> -->
            </div>
            <p class="color-green" v-if="updateToTBKDialogState == 3">成功添加至商品库！</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="updateToTBKDialogState == 1" @click="updateToTBKDialogVisible = false">关 闭</el-button>
            <el-button v-if="updateToTBKDialogState == 1" type="primary" @click="callSyncItemsFromTbk">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 更新商品信息 -->
    <el-dialog title="更新商品信息" :visible.sync="updateGoodsdialogVisible" width="50%" style="text-align: left" :close-on-click-modal="false">
        <el-form ref="updateGoodsdialogForm" :model="updateGoodsdialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="商品范围">

            </el-form-item>
            <el-form-item label="商品添加时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickUpdateGoodsdialog"></VDateRangePicker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="updateGoodsdialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callUpdateItemList">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 商品类目图片设置 -->
    <el-dialog title="商品类目图片设置" :visible.sync="goodsCategoryImageDialogVisible" width="60%" top="0" style="text-align: left" :close-on-click-modal="false">
        <el-form ref="goodsCategorydialogForm" :model="goodsCategoryImageDialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="" v-for="(item,index) in goodsCategoryImageDialogForm.categories" :key="index">
                <div class="categoryBox">
                    <p class="categoryLabel ta-c">{{item.cName}}</p>
                    <VPickSelect :fileType="3" :index="index" subTips="选择图片" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="item.imgUrl"></VPickSelect>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="goodsCategoryImageDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callSetCategoriesImg">确 定</el-button>
        </span>
    </el-dialog>
    <!--  商品板块图片守则-->
    <el-dialog title="商品板块图片设置" :visible.sync="goodsPlateImageDialogVisible" width="60%" top="5%" style="text-align: left" :close-on-click-modal="false">
        <el-form ref="goodsPlateImageDialogForm" :model="goodsPlateImageDialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="" v-for="(item,index) in goodsPlateImageDialogForm.plates" :key="index">
                <div class="categoryBox">
                    <p class="categoryLabel ta-c">{{item.plateName}}</p>
                    <VPickSelect :fileType="3" :index="index" subTips="选择图片" @onUploadSuccess="onUploadSuccessPlate" class="pic-selecter" :logoImageUrl="item.imgUrl"></VPickSelect>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="goodsPlateImageDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callSetPlatesImg">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 批量下架产品对话框 -->
    <el-dialog title="批量下架商品" :visible.sync="batchDownShelfDialogVisible" width="60%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="batchDownShelfDialogForm" :model="batchDownShelfDialogForm" label-width="140px" :inline="true" align="left">
             <el-form-item label="">
                <el-radio v-model="batchDownShelfDialogForm.checked" :label="1">
                    <span style="width: 140px;display: inline-block;">商品添加时间</span>
                </el-radio>
                 <VDateRangePicker class="dp-ib" type="datetime" :timeInterval="30" @onTimePick="onTimePickBatchGoodsAdd"></VDateRangePicker>
             </el-form-item>
             <el-form-item label="">
                <el-radio v-model="batchDownShelfDialogForm.checked" :label="2">
                    <span style="width: 140px;display: inline-block;">商品的优惠券失效时间</span>
                </el-radio>
                <VDateRangePicker class="dp-ib" type="datetime" :timeInterval="30" @onTimePick="onTimePickCouponExpiration"></VDateRangePicker>
             </el-form-item>
             <p class="color-999 ml-20 mt-20">点击确定后，时间范围内的商品，若上架，则状态改为下架；若已经为下架，则不更改。</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="batchDownShelfDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callBatchDownShelf">确  定</el-button>
       </span>
    </el-dialog>
    <!-- 0元购营销分类 -->
    <el-dialog title="【0元购商品分类】编辑" :visible.sync="zeroGoodsCategoryDialogVisible" top="2vh" width="60%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="zeroGoodsCategoryDialogForm" :model="zeroGoodsCategoryDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item :label="`分类${index + 1}：`" v-for="(item, index) in zeroGoodsCategoryDialogForm.actItemtypes" :key="index">
                <el-input class="nn-input-s" v-model="item.typeName" placeholder=""></el-input>
                 <el-radio class="ml-20" v-model="item.visibility" :label="1">显示</el-radio>
                 <el-radio  v-model="item.visibility" :label="2">不显示</el-radio>
                 <el-button type="text" @click="showDelCatgoryDialog(item)">将分类下的商品的【分类标签】去除</el-button>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="zeroGoodsCategoryDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callUpdateActItemTypes">确  定</el-button>
       </span>
    </el-dialog>
    <!-- 将分类下的商品的【分类标签】去除 -->
    <el-dialog title="提示" :visible.sync="delCatgoryDialogVisible" width="30%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="delCatgoryDialogForm" :model="delCatgoryDialogForm" label-width="140px" :inline="false" align="left">
            <p>{{`确定将分类《${this.zeroGoodsCategoryDialogForm.typeName }》的商品的【分类标签】去除吗？`}}</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delCatgoryDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callRemoveActItemType">确  定</el-button>
       </span>
    </el-dialog>
    <!-- 商品批处理 -->
    <el-dialog title="商品批处理" :visible.sync="goodsBatchHandleDialogVisible" width="60%"  class="ta-l" :close-on-click-modal="false">
        <el-form ref="goodsBatchHandleDialogForm" :model="goodsBatchHandleDialogForm" label-width="140px" :inline="false" align="left">
            <el-checkbox class="mb-20" v-for="(item,index) in goodsBatchHandleDialogForm.list" :key="index" v-model="item.checked">上线的{{item.label}}元购商品，券后价大于
                <el-input class="nn-input-xs mr-10" v-model="item.couponUsedPrice" placeholder=""></el-input>
                时，批处理为普通商品
            </el-checkbox>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="goodsBatchHandleDialogVisible = false">关  闭</el-button>
            <el-button type="primary" @click="callBatchActivitySet">确  定</el-button>
       </span>
    </el-dialog>
    
   

    <GoodsListSettingsDialog  :functionDialogForm="functionDialogForm"  :categories="categories"   @onSuccess="callTableData(paramJson)"></GoodsListSettingsDialog>
</div>
</template>

<script>
import Vue from 'vue';
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import GoodsListSettingsDialog from '@/components/goods/GoodsListSettingsDialog'
import GoodsListAddHDKDialog from '@/components/goods/GoodsListAddHDKDialog'
import VPickSelect from "@/components/custom/VPicSelect";
import loginVue from '../login/login.vue';
export default {
    data() {
        return {
            goodsBatchHandleDialogVisible:false,
            goodsBatchHandleDialogForm:{
                list:[
                    {
                        activityId:2, //0元购
                        checked:false,
                        couponUsedPrice:'',
                        label:'0'
                    },
                    {
                        activityId:3, //1元购
                        checked:false,
                        couponUsedPrice:'',
                        label:'1'
                    },
                     {
                        activityId:4, //5元购
                        checked:false,
                        couponUsedPrice:'',
                        label:'5'
                    },
                ]
            },
            itemExistsList:[{
                label:'存在',
                value:1
             },{
                 label:'不存在',
                value:2
            },{
                 label:'未知',
                value:3
            },],
            delCatgoryDialogVisible:false,
            delCatgoryDialogForm:{},
            zeroGoodsCategoryDialogVisible:false,
            zeroGoodsCategoryDialogForm:{
                actItemtypes:[],
            },
            batchDownShelfDialogForm:{
                checked:1,
            },
            batchDownShelfDialogVisible:false,
            addHDKDialogForm: {
                addHDKDialogVisible: false,
            },
            addHDKDialogCategories: [],
            addHDKDialogPlates : [],
            updateToTBKDialogState: 0,
            updateToTBKDialogVisible: false,
            updateToTBKDialogForm: false,
            updateGoodsdialogVisible: false,
            updateGoodsdialogForm: {},
            goodsCategoryImageDialogForm: {},
            goodsCategoryImageDialogVisible: false,
            goodsPlateImageDialogForm:{},
            goodsPlateImageDialogVisible:false,
            totalPageCount: 0,
            tableData: [],
            paramJson: {},
            form: {
                conditionMin: '',
                conditionMax: '',
            },
            activityIdList: [{
                label: '全部',
                value: '',
            }, {
                label: '0元购',
                value: 2
            }, {
                label: '1元购',
                value: 3
            }, {
                label: '5元购',
                value: 4
            }, {
                label: '普通商品',
                value: 1
            }, ],
            conditionList: [{
                label: '不选择',
                value: '',
            }, {
                label: '商品原价',
                value: 1
            }, {
                label: '商品券后价格',
                value: 2
            }, {
                label: '月销量',
                value: 3
            }, {
                label: '月销售金额',
                value: 4
            }, {
                label: '参考成本',
                value: 5
            }, ],
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
            sourceList: [{
                label: '全部',
                value: '',
            }, {
                label: '好单库',
                value: 1
            }, {
                label: '淘宝客选品库',
                value: 2
            }, ],

            functionDialogForm: {
                functionDialogVisible: false,
                functionDialogType: '',
            },
            conditionId: '',
            categories: [],
            plates: [],
            actItemtypes:[
            ]
        }
    },
    created() {
        // this.goodsCategoryImageDialogForm.goodsList = [];
        // for (let index = 0; index < 10; index++) {
        //     this.tableData.push({})
        //     this.goodsCategoryImageDialogForm.goodsList.push({
        //         label: 'name' + (index + 1),
        //         imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572328672387&di=ec4a127804303c52cb8be67ed8b0b38a&imgtype=0&src=http%3A%2F%2Fimage.retui8.com%2F%3Furl%3Dhttps%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FL0owf7fTI9MfMTavIyZIhAgxw3Rpe3tw81MHSpfpp0hxibSJww5BVeGRwbGsywZ4iaPM0kQamJkAREgoQsiczGFnQ%2F640.jpg'
        //     });
        // }
    },
    mounted() {
        this.callGetCategoryListForSearch();
        this.callGetAllCategoryListForSearch();
        this.callGetPlateListForSearch();
        this.callGetActItemTypes();
        this.$nextTick(() => {
            this.callFirstPage();
        })
    },
    methods: {
         showGoodsBatchHandleDialog(){
            this.goodsBatchHandleDialogVisible = true;
        },
         showDelCatgoryDialog(row){
            this.zeroGoodsCategoryDialogForm.actItemTypeId = '';
            this.zeroGoodsCategoryDialogForm.actItemTypeId = row.actItemTypeId;
            this.zeroGoodsCategoryDialogForm.typeName = row.typeName;
            this.delCatgoryDialogVisible = true;
        },
        showZeroGoodsCategoryDialog(){
            this.zeroGoodsCategoryDialogVisible = true;
        },
        showBatchDownShelfDialog(){
            this.batchDownShelfDialogVisible = true;
        },
        showAddHDKDialog() {
            this.addHDKDialogForm.addHDKDialogVisible = true;
        },
        showUpdateToTBKDialog() {
            this.updateToTBKDialogVisible = true;
            this.updateToTBKDialogState = 1;
            // setInterval(() => {
            //     this.updateToTBKDialogState++;
            // }, 2000);
        },
        showUpdateGoodsDialog() {
            this.updateGoodsdialogVisible = true;
        },
        onUploadSuccess(imgUrl,index){
            this.goodsCategoryImageDialogForm.categories[index].imgUrl = imgUrl;
        },
        onUploadSuccessPlate(imgUrl,index){
             this.goodsPlateImageDialogForm.plates[index].imgUrl = imgUrl;
        },
        onConditionChange(conditionId) {
            this.form.conditionMin = ''
            this.form.conditionMax = ''
            this.conditionId = conditionId;
        },
        toDetails(row) {
            this.$router.push({
                path: '/goods/goodsDetails',
                query: {
                    id: row.id
                }
            })
        },
        showFunctionDialog(type, row) {
            this.functionDialogForm.functionDialogVisible = true;
            this.functionDialogForm.functionDialogType = type;

            Vue.set(this.functionDialogForm, 'itemSort', row.itemSort || '');
            Vue.set(this.functionDialogForm, 'online', row.online || '');
            Vue.set(this.functionDialogForm, 'activityId', row.activityId || '');
            Vue.set(this.functionDialogForm, 'cId', row.itemCategoryId || '');
            Vue.set(this.functionDialogForm, 'id', row.id);
            // for (const key in row) {
            //      const element = row[key];
            //     Vue.set(this.functionDialogForm,key,element);
            // }
            // if(isNull(row.itemSort)) {
            //     Vue.set(this.functionDialogForm,'itemSort','');
            // }
            // if(isNull(row.online)) {
            //     Vue.set(this.functionDialogForm,'online','');
            // }
            // if(isNull(row.activityId)) {
            //     Vue.set(this.functionDialogForm,'activityId','');
            // }

        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickCoupon(timeStart, timeEnd) {
            this.form.couponEndTimeStart  = timeStart;
            this.form.couponEndTimeEnd = timeEnd;
        },
        onTimePickUpdate(timeStart, timeEnd) {
            this.form.updateTimeStart = timeStart;
            this.form.updateTimeEnd = timeEnd;
        },
        onTimePickUpdateGoodsdialog(timeStart, timeEnd) {
            this.updateGoodsdialogForm.addTimeStart = timeStart;
            this.updateGoodsdialogForm.addTimeEnd = timeEnd;
        },
        onTimePickBatchGoodsAdd(timeStart, timeEnd){
            this.batchDownShelfDialogForm.addTimeStart = timeStart;
            this.batchDownShelfDialogForm.addTimeEnd = timeEnd;
        },
        onTimePickCouponExpiration(timeStart, timeEnd){
            this.batchDownShelfDialogForm.couponEndTimeStart = timeStart;
            this.batchDownShelfDialogForm.couponEndTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {

            switch (this.conditionId) {
                case 1: //商品原价筛选
                    this.form.priceStart = this.form.conditionMin *100;
                    this.form.priceEnd = this.form.conditionMax * 100;
                    break;
                case 2: // 券后价筛选
                    this.form.couponUsedPriceStart = this.form.conditionMin * 100;
                    this.form.couponUsedPriceEnd = this.form.conditionMax * 100;
                    break;
                case 3: // 月销量筛选
                    this.form.monthVolumeStart = this.form.conditionMin;
                    this.form.monthVolumeEnd = this.form.conditionMax;
                    break;
                case 4: // 月销售金额筛选
                    this.form.monthValueStart = this.form.conditionMin;
                    this.form.monthValueEnd = this.form.conditionMax;
                    break;
                case 5://参考成本
                    this.form.costReferenceStart = this.form.conditionMin * 100;
                    this.form.costReferenceEnd = this.form.conditionMax *100;
                    break;
                default:
                    break;
            }
            paramJson = {
                ...paramJson,
                ...this.form
            }
            paramJson.itemName = encodeURIComponent(paramJson.itemName|| '');
            this.paramJson = paramJson;
            sendPost(urls.getItemList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.items;
                this.totalPageCount = resultJson.resultData.count;
            });
        },

        showGoodsCategoryImagedialog() {
            this.goodsCategoryImageDialogVisible = true;
        },
        showGoodsPlateImagedialog() {
            this.goodsPlateImageDialogVisible = true;
        },
        // 获取搜索（下拉列表）用的类目列表
        callGetCategoryListForSearch() {
            let paramJson = {};
            sendPost(urls.getCategoryListForSearch, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.categories = [
                    {
                        cName:'全部',
                        categoryId:''
                    },
                    ...resultJson.resultData.categories
                ];
                this.addHDKDialogCategories = [...resultJson.resultData.categories]
            });
        },
        callGetAllCategoryListForSearch() {
            let paramJson = {};
            sendPost(urls.getAllCategoryListForSearch, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.goodsCategoryImageDialogForm.categories = [...resultJson.resultData.categories];
            });
        },
        // 获取搜索（下拉列表）用的板块列表
        callGetPlateListForSearch() {
            let paramJson = {};
            sendPost(urls.getPlateListForSearch, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.plates = resultJson.resultData.plates;
                this.addHDKDialogPlates = resultJson.resultData.plates;
                this.goodsPlateImageDialogForm.plates = [...resultJson.resultData.plates];
            });
        },
       
        //设置商品类目图片
        callSetCategoriesImg() {
            let paramJson = {
               categories: [...this.goodsCategoryImageDialogForm.categories],
            };
            paramJson.categories.map(element => element.imgUrl = encodeURIComponent(element.imgUrl));
            sendPost(urls.setCategoriesImg, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.goodsCategoryImageDialogVisible = false;
                    this.callGetAllCategoryListForSearch();
                });
            });
        },
         //设置商品板块图片
        callSetPlatesImg() {
            let paramJson = {
               plates: [...this.goodsPlateImageDialogForm.plates],
            };
            paramJson.plates.map(element => element.imgUrl = encodeURIComponent(element.imgUrl));
            sendPost(urls.updatePlates, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.goodsPlateImageDialogVisible = false;
                    this.callGetPlateListForSearch();
                });
            });
        },
        //更新指定添加时间的商品信息
        callUpdateItemList() {
            let paramJson = {
                ...this.updateGoodsdialogForm
            };
            if(isTimeNull(paramJson.addTimeStart) ) {
                warningToast('请选择开始时间');
                return false;
            }
            if(isTimeNull(paramJson.addTimeEnd) ) {
                warningToast('请选择结束时间');
                return false;
            }
            sendPost(urls.updateItemList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.updateGoodsdialogVisible = false;
                });
            });
        },
        //同步淘客商选品库
        callSyncItemsFromTbk() {
            this.updateToTBKDialogState = 2;
            let paramJson = {};
            sendPost(urls.syncItemsFromTbk, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.updateToTBKDialogState = 3;
            });
        },
       //获取0元购营销分类
        callGetActItemTypes() {
            let paramJson = {
                forSearch: '2',
            };
            sendPost(urls.getActItemTypes, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.actItemtypes = [
                    {
                        typeName:'全部',
                        actItemTypeId:'',
                    },
                    ...resultJson.resultData.actItemtypes
                ],
                this.zeroGoodsCategoryDialogForm.actItemtypes = JSON.parse(JSON.stringify(resultJson.resultData.actItemtypes))
            });
        },
        //0元购营销分类信息更新
        callUpdateActItemTypes() {
            let paramJson = {
                actItemTypes: JSON.parse(JSON.stringify(this.zeroGoodsCategoryDialogForm.actItemtypes)),
            };
            sendPost(urls.updateActItemTypes, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.zeroGoodsCategoryDialogVisible = false;
                     this.callGetActItemTypes();
                });
            });
        },
        //解除0元购营销分类关联
        callRemoveActItemType() {
            let paramJson = {
                actItemTypeId: this.zeroGoodsCategoryDialogForm.actItemTypeId,
            };
            sendPost(urls.removeActItemType, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.delCatgoryDialogVisible = false;
                });
            });
        },
        //批量处理0、1、5元购为普通商品
        callBatchActivitySet() {
            let paramJson = {
                setting:[]
            };

            let isOk = true;
            this.goodsBatchHandleDialogForm.list.forEach(element => {
                if(element.checked) {
                    paramJson.setting.push({
                        activityId:element.activityId,
                        couponUsedPrice:element.couponUsedPrice * 100
                    });
                    if(!isNumber(element.couponUsedPrice)) {
                        isOk = false;
                    }
                }
            });

            if(paramJson.setting.length == 0) {
                warningToast('请勾选至少一个条件')
                return;
            }

            if(!isOk) {
                warningToast('请填写条件');
                return;
            }

            sendPost(urls.batchActivitySet, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 successToast(resultJson.resultMsg,()=>{
                     this.goodsBatchHandleDialogVisible = false;
                 });
            });
        },
        //批量下架产品
        callBatchDownShelf(){
             let paramJson = {};
            switch (this.batchDownShelfDialogForm.checked) {
                case 1:
                    paramJson.addTimeStart = this.batchDownShelfDialogForm.addTimeStart;
                    paramJson.addTimeEnd = this.batchDownShelfDialogForm.addTimeEnd;

                    if(isTimeNull(paramJson.addTimeStart)){
                        warningToast('请选择开始时间');
                        return;
                    }
                    if(isTimeNull(paramJson.addTimeStart)){
                        warningToast('请选择结束时间');
                        return;
                    }
                    break;
                case 2:
                      paramJson.couponEndTimeStart = this.batchDownShelfDialogForm.couponEndTimeStart;
                      paramJson.couponEndTimeEnd = this.batchDownShelfDialogForm.couponEndTimeEnd;
                    //   if(isTimeNull(paramJson.couponEndTimeStart)){
                    //     warningToast('请选择开始时间');
                    //     return;
                    //  }
                    if(isTimeNull(paramJson.couponEndTimeEnd)){
                        warningToast('请选择结束时间');
                        return;
                    }
                    break;
                default:
                    break;
            }
            sendPost(urls.batchPullOffShelves, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.batchDownShelfDialogVisible = false;
                    this.callFirstPage();
                });
            });
        },

    },
    computed: {

    },
    components: {
        VDateRangePicker,
        VPagination,
        GoodsListSettingsDialog,
        VPickSelect,
        GoodsListAddHDKDialog

    }
}
</script>

<style lang="scss" scoped>
/deep/ .inputCategory input {
    background-color: #f5f7fa;
    color: #909399;
}

/deep/ .inputMin input {
    border-radius: 0 4px 4px 0;
}
/deep/ .function-bar .el-button {
    margin-bottom: 10px;
    margin-left: 0px;
    margin-right: 10px;
}

.categoryBox {
    width: 16vw;
    display: flex;

    .categoryLabel {
        height: 10vw;
        width: 6vw;
        line-height: 10vw;
        padding-right: 10px;
        font-size: 16px;
    }

    .pic-selecter {
        width:15vw;
        height: 10vw;
        border: 1px solid #dcdcdc;
    }

}
</style>
