<template>
<div class="select-box" :style="myStyle">
    <img v-show="fileUrl !=null && fileUrl != '' & imgLoaded" class="select-img" :src="fileUrl" alt="" :style="imgStyle">
  
    <div v-show="fileUrl == null || fileUrl == ''" class="select-tips">
        <span class="subtips" style="">+ {{subTips}}</span>
    </div>
    <transition name="fade">
        <div v-if="fileType > 0 && (uploadState == 1 )"  class="progressBox center-parent">
            <el-progress  v-if="uploadState == 1"  class="progressBar center-child " :show-text="false" :text-inside="importForm.textinside" :stroke-width="4" slot="tip" :percentage="importForm.percentage" :status="importForm.status"></el-progress>
        </div>
         <div v-if="uploadState == 2" class="successBox center-parent">
             <CheckboxAi class="cAi center-child"></CheckboxAi>
        </div>
    </transition>
    <input class="select-input" id="input01" type="file" accept="image/*" capture="camera" @change="handleFileChange " ref="selecter">
  
</div>
</template>

<script>
import Vue from 'vue'
import CheckboxAi from '@/components/custom/CheckboxAi'
export default {
    data() {
        return {
            leftCellStyle:{
                width:'0',
            },
            imgLoaded:false,
            fileUrl: '',
            myStyle: {
                width: this.width,
                height: this.height,
            },
            imgStyle: {
                height: 'auto',
                width: 'auto',
            },
            importForm:{
                percentage:0,
                textinside:true,
                status:'success'
            },
            uploadState:0,//0:仅仅显示图片 1:选择图片上传中  2:选择图片上传成功
        }
    },
    mounted(){
    },  
    methods: {
        resizeImg(fileUrl){
                let img = new Image();
                img.src =  fileUrl;
                img.onload = () => {
                    this.imgLoaded = true;
                    this.fileUrl = img.src;
                    if(img.width > img.height){
                        this.imgStyle.width = '100%';
                        this.imgStyle.height = 'auto';
                    }
                    else {
                        this.imgStyle.height = '100%';
                        this.imgStyle.width = 'auto';
                    }
                };
        },
        handleFileChange() {
            // this.importForm.percentage = 0;
            var $input = this.$refs.selecter;
            var _URL = window.URL || window.webkitURL;
            var file, img;
            if ((file = $input.files[0])) {
                // _this.$emit('onSelect', _this.fileUrl,file,_this.index);
                img = new Image();
                img.onload = () => {
                    // this.fileUrl = img.src;
                    if(this.fileType > 0) {
                        this.uploadFile(this.fileType,file);
                    }
                    else {
                        this.$emit('onSelect', this.fileUrl, file, this.index);
                    }
                };
                img.src = _URL.createObjectURL(file);
            }
        },
        uploadFile(fileType=8,file) {

            // if (/.*.ipa$/.test(uploadData.file.name)) {
            //     console.log('文件名正确')
            // } else {
            //     errorToast('文件名不正确')
            //     console.log('fileList:', uploadData.data.fileList)
            //     return false;
            // }
            this.uploadState = 1;
            var row = this.importForm;
            // Vue.set(row, 'status', 'warning')
            Vue.set(row, 'percentage', 0)
            // Vue.set(row, 'textinside', true)
            var paramJson = {
                data: JSON.stringify({
                    'fileType': fileType // 1：banner，2：权益图片 3：商品图片，4：品牌图片，5：excel文件
                }),
                file: file,
            };
            sendUpload(urls.uploadFileList, paramJson, (resultJson) => {
                    // Vue.set(row, 'textinside', false)
                    this.excelPath = resultJson.resultData.filePathList[0];
                    this.resizeImg(this.excelPath);
                    setTimeout(() => {
                        this.uploadState = 2;
                    }, 1);
                    this.$emit('onUploadSuccess',this.excelPath,this.index)
                },
                () => {
                    Vue.set(row, 'status', 'exception')
                    // Vue.set(row, 'textinside', false)
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
    watch: {
        logoImageUrl: {
            immediate: true,
            handler() {
                console.log('logoImageUrl change');
                this.fileUrl = this.logoImageUrl;
                this.uploadState = 0;
                this.resizeImg(this.logoImageUrl);
            }
        },
    //    'importForm.percentage'(){
    //         this.leftCellStyle.width = this.importForm.percentage + '%';
    //         console.log('this.leftCellStyle.width:',this.leftCellStyle.width);
    //     },
    },
     props: {
        logoImageUrl: String,
        index: {
            default: -1,
        },
        fileType:{
            default:0,
        },
        subTips: {
            default: '点击选择图片'
        },
        width: {
            default: '130px'
        },
        height: {
            default: '80px'
        },

    },
    components:{
        CheckboxAi
    }
}
</script>

<style lang="scss" scoped>
.select-box {
    position: relative;
    border: 1px solid #dcdcdc;

    .select-img {
        //  position: absolute;
        //  left: 0;
        //  top: 0;
        //  width: 100%;
        //  height: 100%;
        // max-height:100%;
        margin: 0 auto;
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

// .progressBar {
//     position: absolute;
//     left: 0;
//     top: 0;
//     display: flex;
//     width: 100%;
//     height: 100%;
//     .leftCell {
//         height: inherit;
//     }
//     .rightCell {
//         background: rgba(0,0,0,0.6);
//         height: inherit;
//         flex: 1;;
//     }
// }
.successBox {
    background: rgba(0,0,0,0.3);
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    animation: breathLamp 1.5s;
}

@keyframes breathLamp{
    0%{
        opacity:.7;
        background: rgba(0,0,0,1);
    }
    100%{
        opacity:.9;
         background: rgba(0,0,0,.3);
    }
}


.cAi {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: rgb(255, 255, 255);
}


.progressBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    .progressBar {
        width:80%;
        opacity: .9;
        /deep/ .el-progress__text {
            color:rgba(255, 255, 255, .8);
        }
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
