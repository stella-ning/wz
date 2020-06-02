<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="关键字">
            <el-input type="textarea" class="nn-input-l" v-model="form.requestDataLike" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="时间" prop="" width="160">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="请求数据" prop="requestData">
                </el-table-column>
                <el-table-column label="返回数据" prop="resultDate">
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>

        </div>
    </el-form>
</div>
</template>

<script>
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            form: {},
            totalPageCount: 0,
            tableData: [],
        }
    },
    mounted(){
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {...paramJson,...this.form}
            sendPost(urls.getApiAccessList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.list;
                this.totalPageCount = resultJson.resultData.count;
            });
        },
    },
    components: {
        VPagination
    }

}
</script>

<style lang="scss" scoped>

 
</style>
