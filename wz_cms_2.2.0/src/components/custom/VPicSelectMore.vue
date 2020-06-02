<template>
  <div class="select-box">
    <!--<img v-show="fileUrl !=null && fileUrl != ''" class="select-img" :src="fileUrl"  alt="">-->
    <span class="select-tips" v-for="(item,index) in fileUrlArr" :index="index" :key="index">
      <img class="select-img" :src="item" alt=""/>
      <i class="el-icon-close iconError" @click="delImg(index)"></i>
    </span>
    <span class="select-tips">
        <i class="subtips">点击选择图片</i>
        <input class="select-input" id="input01" type="file" accept="image/*" capture="camera" @change="handleFileChange " ref="selecter" >
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileUrlArr:this.fileUrlArrImg,
      }
    },
    props:{
      logoImageUrl:String,
      fileUrlArrImg:Array,
      index:{
        default:-1,
      }
    },
    watch:{
      fileUrlArrImg(){
        this.fileUrlArr = this.fileUrlArrImg;
      }
    },
    methods: {
      handleFileChange(index){
        var _this = this;
        var $input = this.$refs.selecter;
        var _URL = window.URL || window.webkitURL;
        var file, img;
        if ((file = $input.files[0])) {
          img = new Image();
          img.onload = function() {
            _this.fileUrl = this.src;
            _this.$emit('onSelect', _this.fileUrl,file,_this.index);
          };
          img.src = _URL.createObjectURL(file);
        }
      },
      delImg(index){
        this.$emit('onDelImg', index);
      }
    }
  }
</script>

<style lang="scss" scoped>

  .select-box {
    position: relative;
    .select-img {
      width: 200px;
      height: 200px;
    }
    .iconError{
      position: absolute;
      top: -6px;
      right: -6px;
      color: #fff;
      background: #f56c6c;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      line-height: 18px;

    }
    .iconError:hover{
      cursor: pointer;
    }
    .select-input {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 200px;
      opacity: 0;
    }
    .select-tips {
      position: relative;
      left: 0;
      top: 0;
      margin-right: 10px;
      width: 200px;
      height: 198px;
      display: inline-block;
      border: 1px solid #DCDFE6;
      color: #999;
      text-align: center;
      line-height: 200px;

      .subtips {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
