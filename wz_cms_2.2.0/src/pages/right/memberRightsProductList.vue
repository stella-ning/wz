<template>
<div>
    <el-form ref="form" :model="form" label-width="200px" :inline="true" align="left">
        <el-form-item label="权益产品名称">
            <el-input class="nn-input-s" v-model="form.productName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="所属权益品牌">
            <el-input class="nn-input-s" v-model="form.benifitName" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="产品上架设置">
            <el-select v-model="form.productState" placeholder="请选择">
                <el-option v-for="item in productStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="品牌类型">
            <el-select v-model="form.benifitType" placeholder="请选择">
                <el-option v-for="item in benifitTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="品牌供应商">
            <el-input class="nn-input-s" v-model="form.benifitSupplier" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="danger" icon="el-icon-plus" @click="showAddCdkeyDialog">新增卡密产品</el-button>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
    </el-form>

    <div class="nn-table-wrapper">
        <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border :span-method="arraySpanMethod">
            <el-table-column label="会员权益产品" prop="productName">
            </el-table-column>
            <el-table-column label="会员权益产品id" prop="productCode">
            </el-table-column>
            <el-table-column label="所属权益品牌" prop="benifitName">
            </el-table-column>
            <el-table-column label="品牌供应商" prop="benifitSupplier">
            </el-table-column>
            <el-table-column label="品牌类型" prop="">
                <template slot-scope="scope">
                    {{scope.row.benifitType | getLabelByValue(benifitTypeList)}}
                </template>
            </el-table-column>
            <el-table-column label="添加时间" prop="">
                <template slot-scope="scope">
                    {{new Date(scope.row.addTime).Format()}}
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="" >
                <template slot-scope="scope">
                    <el-input class="nn-input-xs" v-model="scope.row.sortOrder" placeholder="" ></el-input>
                    <!-- <el-button type="text" @click="callUpdateBenifitProductList('sort',scope.row)">保存</el-button> -->

                    <div>
                         <el-radio class="mt-20" v-model="scope.row.productState" :label="1">上架</el-radio>
                        <el-radio class="mt-20" v-model="scope.row.productState" :label="0">下架</el-radio>
                        <el-button type="text" @click="callUpdateBenifitProductList(scope.row)">保存</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="产品上架设置" prop="">
                <template slot-scope="scope">
                      <div v-if="scope.row.benifitType == 5">
                        <router-link v-if="scope.row.tempProductState == 0" class="dp-ib" target="_blank" :to="{path: '/right/memberRightsChargeEdit', query: {benifitProductId: scope.row.benifitProductId}}">
                            <span type="text">编辑直充产品</span>
                        </router-link>
                        <span class="color-999 pointer" v-else type="text" @click="editTips">编辑直充产品</span>
                     </div>
                     <div v-if="scope.row.benifitType == 5">
                        <router-link class="dp-ib" target="_blank" :to="{path: '/right/memberRightsChargeEdit', query: {benifitProductId: scope.row.benifitProductId,viewOnly:true}}">
                            <span type="text">详情</span>
                        </router-link>
                     </div>

                    <div v-if="scope.row.benifitType == 6">
                        <router-link v-if="scope.row.tempProductState == 0"  class="dp-ib" target="_blank" :to="{path: '/right/memberRightsCdkeyEdit', query: {benifitProductId: scope.row.benifitProductId}}">
                            <span type="text">编辑卡密产品</span>
                        </router-link>
                        <span class="color-999 pointer" v-else type="text" @click="editTips">编辑卡密产品</span>
                    </div>
                    <div v-if="scope.row.benifitType == 6">
                        <router-link  class="dp-ib" target="_blank" :to="{path: '/right/memberRightsCdkeyEdit', query: {benifitProductId: scope.row.benifitProductId,viewOnly:true}}">
                            <span type="text">详情</span>
                        </router-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="">
                <template slot-scope="scope">
                   
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="mt-20">
            <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
        </div>

    </div>
    <el-dialog title="" :visible.sync="adsreDialogVisible" width="60%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="adsreDialogForm" :model="adsreDialogForm" label-width="140px" :inline="true" align="left">

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 新增卡密产品 -->
    <el-dialog title="新增卡密产品" :visible.sync="addCdkeyDialogVisible" width="60%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="addCdkeyDialogForm" :model="addCdkeyDialogForm" label-width="240px" :inline="false" align="left" :rules="addCdkeyDialogRules">
            <el-form-item label="选择所属【卡密类型】的权益品牌" prop="benifitId">
                <el-select v-model="addCdkeyDialogForm.benifitId" placeholder="请选择">
                    <el-option v-for="item in benifitList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员权益产品" prop="productName">
                <el-input class="nn-input-s" v-model="addCdkeyDialogForm.productName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="会员权益产品id" prop="productCode">
                <el-input class="nn-input-s" v-model="addCdkeyDialogForm.productCode" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="">
               <p class="color-red">非api的卡密产品，不要增加会员权益产品id</p>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCdkeyDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('addCdkeyDialogForm')">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import Vue  from 'vue'
// import benifitTypeList  from '@/components/rights/benifitTypeList'
export default {
    data() {
        return {
            adsreDialogForm: {},
            adsreDialogVisible: false,
            totalPageCount: 0,
            tableData: [],
            form: {},
            addCdkeyDialogVisible: false,
            addCdkeyDialogForm: {},
            addCdkeyDialogRules: {
                benifitId: [{
                    required: true,
                    message: '请选择会员权益'
                }],
                productName: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            productStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '上架',
                value: 1
            }, {
                label: '下架',
                value: 0
            }, ],

            cdkeyBrandList: require('@/components/rights/benifitTypeList'),
            benifitList: [],
            benifitTypeList: [{
                    label: '全部',
                    value: ''
                },
                ...require('@/components/rights/benifitTypeList')
            ],
            paramJson: {}
        }
    },
    mounted() {
        this.callGetBenifitList();
        this.$nextTick(() => {
            this.callFirstPage();
        })
    },
    methods: {
        arraySpanMethod({row,column,rowIndex, columnIndex}) {
            if(column.label == '排序') {
                 return [1, 2]
            }
        },

        editTips() {
            warningToast('产品下架状态，才可进行编辑');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.callAddBenifitProduct();
                }
            })
        },
        showAddCdkeyDialog() {
            this.addCdkeyDialogVisible = true;
            this.addCdkeyDialogForm = {};
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {
                ...paramJson,
                ...this.form
            };
            this.paramJson = paramJson;
            sendPost(urls.getBenifitProductList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.benifitProductList;
                console.log('resultJson.resultData.benifitProductList：',resultJson.resultData.benifitProductList);
                this.totalPageCount = resultJson.resultData.benifitProductCount;
                this.tableData.forEach(element => {
                    Vue.set(element,'tempProductState',element.productState)
                });
            });
        },
        //获取权益品牌列表
        callGetBenifitList() {
            let paramJson = {
                benifitType: 6, //权益类型。1：烈熊，2：车主邦，3：易加油，4：h5跳转，5：直充，6：卡密
            };
            sendPost(urls.getBenifitList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.benifitList = resultJson.resultData.benifitList;
            });
        },
        //新增权益品牌产品
        callAddBenifitProduct() {
            let paramJson = {
                ...JSON.parse(JSON.stringify(this.addCdkeyDialogForm))
            };
            sendPost(urls.addBenifitProduct, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.addCdkeyDialogVisible = false;
                    this.callFirstPage();
                });
            });
        },
        callUpdateBenifitProductList(row) {
            let paramJson = {
                benifitProductList: [{
                    benifitProductId: row.benifitProductId,
                    productState: row.productState,
                    sortOrder: row.sortOrder,
                }],
                // benifitProductList: [{
                //     benifitProductId: row.benifitProductId,
                //     productState: type == 'state' ? row.productState : '',
                //     sortOrder: type == 'sort' ? row.sortOrder : '',
                // }],
            };
            sendPost(urls.updateBenifitProductList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.callTableData(this.paramJson)
                });
            });
        },
    },
    watch: {
        tableData: {
            deep: true,
            handler() {
                this.tableData.forEach(element => {
                    if (element.sortOrder > 256) {
                        element.sortOrder = 256;
                        warningToast('排序值最大为256');
                    }
                });
            }
        }
    },
    components: {
        VDateRangePicker,
        VPagination
    }

}
</script>

<style lang="scss" scoped>
/deep/ .lh-label label {
    line-height: 24px;
}
</style>
