<template>
<el-dialog top="3%" title="流量商渠道号" :visible.sync="visible" width="80%" class="ta-l" @close="hideAddChannelialog" :close-on-click-modal="false">
    <div style="text-align: right;">
        <el-button type="success" icon="el-icon-plus" @click="addRow()">添加渠道</el-button>
    </div>
    <div class="nn-table-wrapper">
        <el-table v-loading="loading"  element-loading-text="拼命加载中" height="400" class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border ref="dialogForm" :model="dialogForm" :rules="rules">
            <el-table-column label="渠道号" prop="channelName" width="120">
                <template slot-scope="scope">
                    <el-input autofocus v-model="scope.row.channelName"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="">
                <template slot-scope="scope">
                    <el-input autofocus v-model="scope.row.description"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" prop="" width="160">
                <template slot-scope="scope">
                    {{scope.row.addTime == null ? "-" : new Date(scope.row.addTime).Format()}}
                </template>
            </el-table-column>
            <el-table-column label="用户注册数据倍率" prop="" width="100">
                <template slot-scope="scope">
                    <el-input autofocus v-model="scope.row.channelRate"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="渠道单价" prop="" width="120">
                <template slot-scope="scope">
                    <el-input autofocus v-model="scope.row.price"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="展示给渠道商" prop="" width="160">
                <template slot-scope="scope">
                    <el-radio v-model="scope.row.display" :label="1">展示</el-radio>
                    <el-radio v-model="scope.row.display" :label="2">隐藏</el-radio>
                </template>
            </el-table-column>
            <el-table-column label="使用落地页版本" prop="">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.landPageId" placeholder="请选择">
                        <el-option
                        v-for="item in landingList"
                        :key="item.landPageId"
                        :label="`${item.openType == 1? 'Web' :'App'}${item.name}`"
                        :value="item.landPageId">
                            <span class="appStyle ml-10">{{ item.openType == 1? 'Web' :'App' }}</span>
                            <span >{{ item.name }}</span>
                            <span class="remarkStyle ml-10">{{ item.remark }}</span>
                        </el-option>
                    </el-select>
                    
                </template>
            </el-table-column>
            
        </el-table>
        <!--分页-->
        <div class="mt-20">
            <VPagination  ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount"  @callTableData= "callTableData" ></VPagination>
        </div>
    
        
       
      
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddChannelialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import Vue from 'vue';
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            loading:false,
            totalPageCount: 0,
            tableData: [],
            dialogForm: {

            },
            row: {},
            rules: {
                channelName: [{
                    required: true,
                    message: '请填写信息'
                }],
            },
            landingList:[]
        }
    },
    mounted() {
       
    },
    watch: {
        dialogVisible() {
            if (this.dialogVisible && this.distributorId > 0) {
                this.tableData = [];
                this.$nextTick(()=>{
                     this.callFirstPage();
                })
            }
        }
    },
    props: {
        dialogVisible: Boolean,
        distributorId: Number,
    },
    methods: {
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        addRow() {
            // this.tableData.splice(0,0,{
            //       displayState:1,//展示状态。1：显示，2：隐藏
            // });
            this.tableData.push({
                displayState: 1, //展示状态。1：显示，2：隐藏
            });
        },
        callGetLandPageAllocationList() {
            let paramJson = {
            };
            sendPost(urls.getLandPageAllocationList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.landingList = [...resultJson.resultData.landPageOneList,...resultJson.resultData.landPageTwoList]
            });
        },
        submitForm(formName) {
            var isOk = this.tableData.length > 0;
            this.tableData.forEach((element, index) => {
                if (isNull(element.channelName)) {
                    isOk = false;
                    errorToast('请填写渠道号');
                    return;
                }
                if (isNull(element.channelRate)) {
                    isOk = false;
                    errorToast('请填写渠道倍率');
                    return;
                }
            }, this);

            if (isOk) {
                this.callAddDistributor(() => {
                    this.hideAddChannelialog();
                });
            }
        },
        hideAddChannelialog() {
            this.$emit('hideDialog');
        },
        callAddDistributor(fn) {
            let paramJson = {
                distributorId: this.distributorId,
                channels: this.tableData,
            }
            sendPost(urls.createOrUpdateChannels, {
                    data: JSON.stringify(paramJson)
                },
                (resultJson) => {
                    successToast(resultJson.resultMsg, function () {
                        if (fn) {
                            fn();
                        }
                    })
                }
            );
        },
        callTableData(paramJson) {
            this.loading = true;
            this.callGetLandPageAllocationList();
            var paramJson = {
                ...paramJson,
                distributorId: this.distributorId,
            }
            sendPost(urls.getChannelList, {
                    data: JSON.stringify(paramJson)
                },
                 (resultJson)=> {
                    setTimeout(() => {
                        this.loading = false; 
                    }, 450);
                    this.totalPageCount = resultJson.resultData.count;
                    this.tableData = resultJson.resultData.channels;
                    this.tableData.forEach(element => {
                        // element.displayState = Number();
                    });
                }
            );
        },
    },
    computed: {
        visible() {
            return this.dialogVisible;
        }
    },
      components: {
        VPagination
    }
}
</script>

<style lang="scss" scoped>
    /deep/.el-select-dropdown__item {
        height: auto;
        border-bottom: 1px dashed rgb(223, 230, 236);
        padding: 0 20px 0 5px;
    }

    .appStyle {
        // color: #8492a6; 
        font-size: 14px;
    }
    .remarkStyle {
        color: #999; 
        font-size: 12px;
        margin-top: -13px;
    }
</style>
