<template>
    <el-upload 
    ref="imgUploader"
     drag
    :data="importForm" 
    :http-request="uploadFile"
     :auto-upload="true" 
     class="upload-box dp-ib ml-10 mr-10" 
     action="https://xxx.xxx.com" 
     :file-list="importForm.fileList" 
     :on-remove="removeFile"
     :limit="1">
        <img v-if="isUploaded" class="uploadImg" :src="excelPath" alt="">
        <!-- <el-button v-if="!isUploaded" type="default" icon="el-icon-download">{{btnText}}</el-button> -->
         <i  v-if="!isUploaded" class="el-icon-upload"></i>
         <div v-if="!isUploaded" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <el-progress v-if="isUploaded" class="mt-10" :text-inside="importForm.textinside" :stroke-width="3" slot="tip" :percentage="importForm.percentage" :status="importForm.status"></el-progress>
    </el-upload>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            importForm: {
                fileList: []
            },
            excelPath:'',
        }
    },
    methods: {
        reset(){
           this.$nextTick(()=>{
                this.$refs.imgUploader.clearFiles();
                this.importForm.percentage = 0;
           })
        },
        removeFile(){
            if(this.importForm.fileList.length == 0) {
                 this.importForm.percentage = 0;
                 this.excelPath = '';
                 this.$emit('onRemoveFile')
            }
           
        },
         uploadFile(uploadData,fileType=8,url=urls.uploadFileList) {

            // if (/.*.ipa$/.test(uploadData.file.name)) {
            //     console.log('文件名正确')
            // } else {
            //     errorToast('文件名不正确')
            //     console.log('fileList:', uploadData.data.fileList)
            //     return false;
            // }

            var row = uploadData.data;
            Vue.set(row, 'status', 'warning')
            Vue.set(row, 'textinside', true)
            var paramJson = {
                data: JSON.stringify({
                    'fileType': fileType // 1：banner，2：权益图片 3：商品图片，4：品牌图片，5：excel文件
                }),
                file: uploadData.file,
            };
            sendUpload(url, paramJson, (resultJson) => {
                    Vue.set(row, 'status', 'success')
                    Vue.set(row, 'textinside', false)
                    this.excelPath = resultJson.resultData.filePathList[0];
                    this.$emit('onSuccess',this.excelPath)
                },
                () => {
                    Vue.set(row, 'status', 'exception')
                    Vue.set(row, 'textinside', false)
                },
                () => {
                    //todo
                },
                (uploadProgressEvent) => {
                    var percentage = (uploadProgressEvent.loaded / uploadProgressEvent.total * 100).toFixed(2)
                    Vue.set(row, 'percentage', Number(percentage))
                });

        },
    },
    computed:{
        isUploaded(){
            return this.importForm.percentage > 0 ? true : false;
        }
    },
    props:['btnText',]
}
</script>

<style lang="scss" scoped>

  .uploadImg {
      height: 180px;
  }
</style>
