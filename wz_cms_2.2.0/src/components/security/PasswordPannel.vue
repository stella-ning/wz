<template>
 <div class="passwordPannel">
     <el-input v-show="!isShow" v-model="key" class="nn-input-s mb-20 pwdBox" type="password" placeholder="请输入密码查看" ></el-input>
     <div v-show="isShow">
         <slot></slot>
     </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         key:'',
         defaultPwd:'',
         testServer:'',
     }
   },
   methods: {

   },
   created(){
    //    console.log('test=',process.env.NODE_ENV)
    //    this.testServer = process.env.NODE_ENV;
       if(isNull(this.pwd)) {
           this.defaultPwd = this.$store.state.API_PASSWORD;
       }
       else {
           this.defaultPwd = this.pwd
       }
   },
 
   computed:{
        isShow(){
            var showState ;
            // if(this.testServer == 'testServer'){
            //     showState = true;
            // }else{
            //     showState = this.defaultPwd == this.key
            // }
              showState = this.defaultPwd == this.key
            return showState;
        },
     
    },
    props:{
        pwd:{
            default:'xynnhaha'
        },
    }
    
 }
</script>

<style lang="scss" scoped>
     /* 在父组件中添加scoped之后，在父组件中书写子组件的样式是无效果的。去掉scoped之后，
       样式可以覆盖。但这样会污染全局样式，为了解决这个问题，vue-loader新增书写方式 /deep/ */
    .pwdBox /deep/ .el-input__inner{
       text-align: center;
    }
    
</style>
