<template>
<div>
    <div :value="value" class="editor-wap">
        <div :id="id"></div>
    </div>
    <el-dialog @opened="opened" title="上传图片" :visible.sync="uploadImgDialogVisible" width="60%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="uploadImgDialogForm" :model="uploadImgDialogForm" label-width="140px" :inline="false" align="left">
            <VUploadImage ref="uploader" btnText="选择图片" @onSuccess="onUploadSuccess" @onRemoveFile="onRemoveFile"></VUploadImage>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="uploadImgDialogVisible = false">关 闭</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
import VUploadImage from '@/components/custom/VUploadImage'
export default {
    name: 'editor',
    props: ['id', 'defaultCon', 'value'],
    data() {
        return {
            uploadImgDialogVisible: false,
            uploadImgDialogForm: {},
            isReady: false,
            ue: '', //ueditor实例
            content: '',
            isUploadSuccess: false,
            uploadFilePath: '',
        }
    },
    mounted() {
        //初始化编辑器
        this.$nextTick(() => {
            this.initEditor()
            this.createButton();
        })
    },
    methods: {
        //增加添加图片上传的按钮
        createButton() {
            let $vue = this;
            this.ue.registerCommand('simpleupload', {
                execCommand: function() {
                    $vue.showUploadImgDialog();
                }
            });
        },
        onUploadSuccess(filePath) {
            this.isUploadSuccess = true;
            this.uploadFilePath = filePath;
            // this.ue.execCommand("inserthtml", `<img src=:"${this.uploadFilePath}" alt="">`);
            var img = new Image();
            img.src = this.uploadFilePath;
            img.onload = ()=>{
                 this.ue.execCommand("insertimage", {
                    src: this.uploadFilePath,
                    width: img.width/2,
                    height: img.height/2
                });
                this.uploadImgDialogVisible = false;
                this.content = this.ue.getContent()
            };
            
        },
        onRemoveFile() {
            this.isUploadSuccess = false;
        },
        opened(){
             this.$refs.uploader.reset();
        },
        showUploadImgDialog() {
            this.uploadImgDialogVisible = true;
        },
        //初始化编辑器
        initEditor() {
            // console.log('子组件是否能接收到content='+this.defaultCon)
            // console.log('this.isEdit='+this.isEdit)
            this.ue = UE.getEditor(this.id, {
                initialFrameWidth: '100%',
                initialFrameHeight: '650',
                scaleEnabled: true
            });
            this.handleChange();
            //编辑器内容修改时
            this.selectionchange()

        },
        handleChange() {
            //编辑器准备就绪后会触发该事件
            this.ue.addListener('ready', () => {
                this.ue.execCommand('cleardoc')
                this.ue.execCommand('insertHtml', this.defaultCon);
                //设置可以编辑
                this.ue.setEnabled()
            })
        },
        //编辑器内容修改时
        selectionchange(e) {
            this.ue.addListener('selectionchange', () => {
                this.content = this.ue.getContent()
            })
        }
    },
  
    watch: {
        defaultCon(curVal, oldVal) { //监听传过来的内容是否发生改变
            this.handleChange();
        },

        content() {
            this.$emit('onText', this.content)
        }

    },
    deactivated() {
        //销毁编辑器实例，使用textarea代替
        this.ue.destroy()
        //重置编辑器，可用来做多个tab使用同一个编辑器实例
        //如果要使用同一个实例,请注释destroy()方法
        //this.ue.reset()
    },
    beforeDestroy() {
        this.ue.destroy()
    },
    components: {
        VUploadImage
    }
}
</script>

<style>
#edui_fixedlayer {
    z-index: 1000000 !important;
}
</style>
