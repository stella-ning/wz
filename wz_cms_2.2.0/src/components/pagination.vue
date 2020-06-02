<template >
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20,30, 50, 100]" :page-size="pageLength" layout="total, sizes, prev, pager, next, jumper" :total.sync="totalPageCount">
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
   
    props:{
        totalPageCount:Number
    },
    
    mounted(){
        this.pageLength = parseInt(this.$route.query.length) || 10

        let startIndex = parseInt(this.$route.query.startIndex) || 0
        this.currentPage = Math.ceil((startIndex+1)/this.pageLength)
        
    },

    methods: {
          // 每页几条
        handleSizeChange(val) {
            this.pageLength = val
            this.callData()
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val
            this.callData()
        },
        callData() {
            let startIndex = (this.currentPage -1) * this.pageLength
            let length = this.pageLength

            let query = Object.assign({}, this.$route.query)
            query.startIndex = startIndex
            query.length = length
            let path = this.$route.path

            this.$router.push({
              path,
              query
            })

            this.$emit('on-change')
        }
    },

    watch:{
      $route() {
        this.pageLength = parseInt(this.$route.query.length) || 10

        let startIndex = parseInt(this.$route.query.startIndex) || 0
        this.currentPage = Math.ceil((startIndex+1)/this.pageLength)
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