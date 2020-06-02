<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.phone" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="反馈版本">
            <el-input class="nn-input-s" v-model="form.versionName" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="序号" prop="" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户账号" prop="phone" width="240">
                </el-table-column>
                 <el-table-column label="用户真实姓名" prop="" width="120">
                    <template slot-scope="scope">
                         {{scope.row.realName || '-'}}
                    </template>
                </el-table-column>
                <el-table-column label="生成时间" prop="" width="240">
                    <template slot-scope="scope">
                        <span>{{new Date(scope.row.createTime).Format()}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="反馈内容" prop="">
                    <template slot-scope="scope">
                        <p class="ta-l pointer feedbackContent" @click="showDialog(scope.row.content)">{{scope.row.content | cutWord(100)}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>

        </div>
    </el-form>
    <el-dialog title="反馈详情" :visible.sync="dialogVisible" width="50%" style="text-align: left">
        <p class="lh-24">
            {{content}}
        </p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            form: {},
            tableData: [],
            totalPageCount: 0,
            dialogVisible: false,
            content: '',
        }
    },
    created() {
    },
    mounted(){
         this.$nextTick(()=>{
            this.callFirstPage();
         }) 
    },
    methods: {
        showDialog(content) {
            this.dialogVisible = true;
            this.content = '';
            this.content = content;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.createTimeStart = timeStart;
            this.form.createTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
             paramJson = {...paramJson,...this.form}
             sendPost(urls.getFeedbackList, {data: JSON.stringify(paramJson)},(resultJson)=>{
                 this.tableData = resultJson.resultData.feedbackList;
                 this.totalPageCount = resultJson.resultData.count;
             });
        },
    },
    components: {
        VDateRangePicker,
        VPagination
    }
}
</script>

<style lang="scss" scoped>

    .feedbackContent:hover {
        text-decoration: underline
    }
</style>
