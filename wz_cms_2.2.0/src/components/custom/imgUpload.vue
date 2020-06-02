<template>
 <div :value="value" class="select-box">
    <img v-show="fileUrl !=null && fileUrl != ''" class="select-img" :src="fileUrl"  alt="">
    <div v-show="fileUrl == null || fileUrl == ''" class="select-tips">
      <span class="subtips" style="">+{{subTips}}</span>
    </div>
    <input class="select-input" id="input01" type="file" accept="image/*" capture="camera" @change="handleFileChange " ref="selecter" >
 </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default:''
    },
    subTips: {
      default: "点击选择图片"
    }
  },

  data() {
    return {
      fileUrl:''
    };
  },

  created() {
    this.fileUrl = this.value
  },
  
  methods: {
    handleFileChange() {
      let file = this.$refs.selecter.files[0]
      let data = {
        data: JSON.stringify({'fileType':3}),
        file
      }
      sendUpload(urls.uploadFileList, data, resultJson => {
          let filePathList = resultJson.resultData.filePathList;
          if(filePathList.length > 0) {
            this.fileUrl = filePathList[0]
          }
        }
      )
    }
  },

  watch: {
    value(val, oldVal) {
      this.fileUrl = val || ''
    },

    fileUrl() {
      this.$emit('input',this.fileUrl)
    }
  }
};
</script>

<style lang="scss" scoped>
.select-box {
  position: relative;
  .select-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-height: 100%;
  }
  .select-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .select-tips {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    color: #999;
    text-align: center;
    .subtips {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
    }
  }
}
</style>
