<template>
  <el-form :inline="true" :model="form" :value="form" ref="searchForm" align="left">
    <slot></slot>
      
    <el-form-item>
      <el-button type="primary" @click="handleSearch" icon="el-icon-search" :size="size">筛选</el-button>
      <el-button @click="handleReset" icon="el-icon-refresh" :size="size">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    props: {
      form: Object,
      noPage: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      noSearch: {
        type:Boolean,
        default:false
      }
    },
    components: {},
    data() {
      return {}
    },
    created() {
      //获取数据
      //this.fetchData()
      //this.handleSearch()
    },

    mounted() {
      this.init()
    },

    methods: {
      //检索框初始化
      init() {
        let query = JSON.parse(JSON.stringify(this.$route.query))
        let form = JSON.parse(JSON.stringify(this.form))
        for(let i in query) {
          if(form.hasOwnProperty(i)) {
            if(Object.prototype.toString.call(form[i]) == '[object Object]') {
              form[i] = JSON.parse(query[i])
            } else {
              form[i] = query[i]
            }
          }
        }
        this.$emit('input',form)
        if(!this.noSearch) {
          this.$nextTick(() => {
            this.handleSearch()
          })
        }
      },
      //获取数据
      fetchData() {
        this.$emit('fetchData')
      },

      //处理搜索事件
      handleSearch() {
        let query = {}
        for(let i in this.form) {
          //排除空数组、空对象、空字段
          if(Object.prototype.toString.call(this.form[i]) == '[object Array]') {
            if(this.form[i].length > 0) {
              query[i] = this.form[i]
            }
          } else if(Object.prototype.toString.call(this.form[i]) == '[object Object]') {
            if(Object.keys(this.form[i]).length > 0) {
              query[i] = JSON.stringify(this.form[i])
            }

          } else if(Object.prototype.toString.call(this.form[i]) == '[object Date]') {
            query[i] = this.form[i].toString()
          } else if((this.form[i] != null && (`${this.form[i]}`).replace(/(^\s*)|(\s*$)/g, '') != '') || this.form[i] == '0') {
            query[i] = this.form[i]
          }
        }

        let rootQuery = Object.assign({}, this.$route.query)
        for(let i in rootQuery) {
          if(!this.form.hasOwnProperty(i)) {
            query[i] = rootQuery[i]
          }
        }
        if(!this.noPage) {
          query.startIndex = 0
          query.length = query.length || 10
        }
        
        this.$router.replace({
          path: this.$route.path,
          query: query
        })
        this.fetchData()
      },

      //处理重置事件
      handleReset() {
        this.$refs["searchForm"].resetFields()
        if(!this.noSearch) {
          this.$nextTick(() => {
            this.handleSearch()
          })
        }
      }
    }
  }
</script>