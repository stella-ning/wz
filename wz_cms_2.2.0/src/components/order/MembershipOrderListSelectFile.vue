<template>
<div class="dp-ib">
    <el-upload :data="importForm" :http-request="uploadFile" :auto-upload="true" class="upload-box dp-ib ml-10 mr-10" action="https://test.520daikuna.com" :file-list="importForm.fileList" :limit="1">
        <el-button v-if="!isUploaded" type="default" icon="el-icon-download">{{text}}</el-button>
        <el-progress v-if="isUploaded" class="mt-10" :text-inside="importForm.textinside" :stroke-width="5" slot="tip" :percentage="importForm.percentage" :status="importForm.status"></el-progress>
    </el-upload>
    <el-button v-if="isUploaded && excelPath.length > 10" type="success" @click="callImportCardOrderList">{{tips}}</el-button>
</div>
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
        callImportCardOrderList() {
            this.$emit('onSelect',this.excelPath)
        },
        uploadFile(uploadData) {

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
                    'fileType': 5 // 1：banner，2：权益图片 3：商品图片，4：品牌图片，5：excel文件
                }),
                file: uploadData.file,
            };
            sendUpload(urls.uploadFileList, paramJson, (resultJson) => {
                    Vue.set(row, 'status', 'success')
                    Vue.set(row, 'textinside', false)
                    this.excelPath = resultJson.resultData.filePathList[0];
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
    computed: {
        isUploaded() {
            return this.importForm.percentage > 0 ? true : false;
        }
    },
    props:['text','tips']
}
</script>

<style lang="scss" scoped>

 
</style>
