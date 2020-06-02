<template >
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20,30, 50, 100]" :page-size="pageLength" layout="total, sizes, prev, pager, next, jumper" :total="totalPageCount">
    </el-pagination>
</template>
<script>
export default {
    data() {
        return {
           currentPage:1, 
           pageLength:10,
        }
    },
    created: function () {
          this.$emit('paginationCreated',{
              startIndex:0,
              length:this.pageLength,
          }); 
    },
   
    props:{
        totalPageCount:Number,
        tableData: Array,
    },
    mounted(){
        //接受父控件第一页的参数
        this.$on('callFirstPage',(val)=>{
            this.callData(val);
            this.currentPage = 1;
        });
    },
    methods: {
          // 每页几条
        handleSizeChange(val) {
            this.pageLength = val;
            this.callData();
        },
        // 当前页
        handleCurrentChange(val) {
            
            this.currentPage = val;
            this.callData();
        },
        callData(startIndex) {
            var paramJson = {
                startIndex: startIndex,
                length: this.pageLength,
            }  
            if(isNull(startIndex)) {
                paramJson.startIndex = (this.currentPage -1) * this.pageLength;
            }
            this.$emit('callTableData',paramJson); 
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .goods-logo {
        width:60px;
        height:60px;
    }   
</style>