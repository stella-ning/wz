<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="">
            <el-button type="primary" icon="el-icon-plus" @click="addRow">增加搜索一级类目</el-button>
        </el-form-item>
        <div class="nn-table-wrapper">
            <el-table class="nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="搜索一级类目id" prop="">
                </el-table-column>
                <el-table-column label="搜索一级类目名称" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="scope.row.input" placeholder=""></el-input>
                    </template>
                </el-table-column>
                 <el-table-column label="实际搜索关键词" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="scope.row.input" placeholder=""></el-input>
                    </template>
                </el-table-column>
                 <el-table-column label="排序值（排序值倒序）" prop="">
                    <template slot-scope="scope">
                        <el-input class="nn-input-xs" v-model="scope.row.input" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="上下架" prop="">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.checked" :label="1">上架</el-radio>
                        <el-radio v-model="scope.row.checked" :label="2">下架</el-radio>
                    </template>
                </el-table-column>
                <el-table-column label="类目配图" width="100">
                    <template slot-scope="scope">
                         <VPickSelect :fileType="1"  width="80px" height="80px"  :index="1" subTips="选择图片" @onSelect="onPicSelect" class="pic-selecter" :logoImageUrl="scope.row.imgUrl"></VPickSelect>
                    </template>
                </el-table-column>
                <el-table-column label="搜索结果默认商品排序逻辑" prop="">
                    <template slot-scope="scope">
                        <el-button type="text">详细</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="">
                    <template slot-scope="scope">
                         <el-button type="text">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="二级类目详情" prop="">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.radio" :label="1">设为当前</el-radio>
                    </template>
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
 import VPickSelect from "@/components/custom/VPicSelect";
export default {
    data() {
        return {
            totalPageCount: 0,
            tableData: [{}],
            form: {}
        }
    },
    methods: {
        addRow(){
            this.tableData.push({});
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {

        },
        onUploadSuccess(imgUrl,index) { 
            this.tableData[index].brandPic = imgUrl;
        },
    },
    components: {
        VPagination,
        VPickSelect
    }
}
</script>

<style lang="scss" scoped>

  /deep/ .el-radio  {
      margin-right: 0;
  }
</style>
