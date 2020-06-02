<template>
    <div class="goodsActiveMannage">
        <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left" @keyup.enter.native="callFirstPage">
            <div class="formCon">
                <el-form-item label="活动标题">
                    <el-input v-model="form.actNameLike" placeholder="模糊搜索"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
                </el-form-item>
                <el-form-item label="活动状态">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option v-for="item in activeStateList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动开始时间">
                    <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickPush"></VDateRangePicker>
                </el-form-item>
                <el-form-item label="活动结束时间">
                    <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickFinish"></VDateRangePicker>
                </el-form-item>
            </div>
            <div class="formBtn">
                <el-form-item class="ml-20">
                    <el-button type="primary" icon="el-icon-search" @keyup.enter.native="callFirstPage" @click="callFirstPage">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
                    <el-button type="success" icon="el-icon-plus" @click="activeCreate()">新建商品活动</el-button>
                </el-form-item>
            </div>
            

            <p class="nn-form-line-h"></p>
            <div class="nn-table-wrapper">
                <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                    <el-table-column label="创建时间" prop="">
                        <template slot-scope="scope">
                            {{new Date(scope.row.createTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="活动标题" prop="actName">
                    </el-table-column>
                    <el-table-column label="活动负责人" prop="personInCharge">
                    </el-table-column>
                    <el-table-column label="活动开始时间" prop="">
                        <template slot-scope="scope">
                            {{new Date(scope.row.startTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="活动结束时间" prop="">
                        <template slot-scope="scope">
                            {{new Date(scope.row.endTime).Format()}}
                        </template>
                    </el-table-column>
                    <el-table-column label="活动状态" prop="">
                        <template slot-scope="scope">
                            {{(activeStateList[scope.row.status]).label}}
                        </template>
                    </el-table-column>
                    

                    <el-table-column label="操作" prop="" width="210">
                        <template slot-scope="scope">
                            <el-button type="text"  @click="editActive(scope.row)" >编辑活动</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <!--分页-->
                <VPagination class="mt-20" ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </el-form>
    </div>
</template>

<script>
    import VDateRangePicker from "@/components/VDateRangePicker";
    import VPagination from "@/components/VPagination";
    import Vue from 'vue';
    export default {
        data(){
            return{
                form: {},
                totalPageCount: 0,
                tableData: [],
                activeStateList: [{
                    label: '全部',
                    value: '',
                }, {
                    label: '活动未开始',
                    value: 1
                }, {
                    label: '活动进行中',
                    value: 2
                }, {
                    label: '活动已结束',
                    value: 3
                }, ],
            }
        },
        mounted() {
            this.callFirstPage({});
        },
        methods: {
            onTimePick(timeStart, timeEnd) {
                this.form.createTimeStart = timeStart;
                this.form.createTimeEnd = timeEnd;
            },
            onTimePickPush(timeStart, timeEnd){
                this.form.startTimeStart = timeStart;
                this.form.startTimeEnd = timeEnd;
            },
            onTimePickFinish(timeStart, timeEnd){
                this.form.endTimeStart = timeStart;
                this.form.endTimeEnd = timeEnd;
            },
            callFirstPage() {
                //获取列表第一页的参数,然后触发 callTableData 方法。
                this.$refs.vPage.$emit('callFirstPage', 0);
            },
            activeCreate(){
                this.$router.push('/goodsActive/goodsActiveCreate')
            },
            callTableData(paramJson){
                paramJson = {...paramJson,...this.form};
                sendPost(urls.getItemActList, {
                        data: JSON.stringify(paramJson)
                    },
                    (resultJson)=> {
                        this.tableData = resultJson.resultData.itemActs;
                        this.totalPageCount = resultJson.resultData.count;
                    }
                );
            },
            editActive(activeData){
                if(activeData.status == 3){
                    this.$message('该活动已结束')
                    return
                }
                activeData.actUrl = decodeURIComponent(activeData.actUrl)
                storageManager.setStorage('activeData', activeData);
                this.$router.push('/goodsActive/goodsActiveCreate?isEdit=true')
            }
        },
        components: {
            VDateRangePicker,
            VPagination,
        }

    }
</script>

<style lang="scss" scoped>
        .ta-l{
        /deep/ .el-dialog{
            height: auto;
            max-height: 90vh;
            overflow-y: scroll;
        }
        
    }
    .formCon{
        display: inline-block;
        width:72%;
        /deep/ .el-form-item__content .el-select .el-input__inner{
            width:150px;
            min-width:150px;
        }
    }
    .formBtn{
        display:inline-block;
        width:27%;
        .el-form--inline .el-form-item{
            margin-left:0;
            margin-right:0;
        }
    }
    .itemRow{
        margin-top:15px;
        /deep/ .el-radio{
            widows: 130px;
        }
    }
</style>