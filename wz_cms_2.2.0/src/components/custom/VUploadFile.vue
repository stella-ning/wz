<template>
    <el-upload :data="importForm" 
    :http-request="uploadFile"
     :auto-upload="true" 
     class="upload-box dp-ib ml-10 mr-10" 
     action="https://xxx.xxx.com" 
     :file-list="importForm.fileList" 
     :on-remove="removeFile"
     :limit="1">
        <el-button v-if="!isUploaded" type="default" icon="el-icon-download">{{btnText}}</el-button>
        <el-progress v-if="isUploaded" class="mt-10" :text-inside="importForm.textinside" :stroke-width="5" slot="tip" :percentage="importForm.percentage" :status="importForm.status"></el-progress>
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
        }
    },
    methods: {
        removeFile(){
            if(this.importForm.fileList.length == 0) {
                 this.importForm.percentage = 0;
                 this.$emit('onRemoveFile')
            }
           
        },
         uploadFile(uploadData,fileType=5,url=urls.uploadFileList) {

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
    props:['btnText']
}
</script>

<style lang="scss" scoped>

 
</style>
