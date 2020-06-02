// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入饿了吗组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//系统样式重置
import '@/assets/css/reset.css'
//饿了么样式重置
import '@/assets/css/element-ui-reset.css'
//公共样式
import '@/assets/css/config.css'
//接口访问
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//项目的公共文件
import '@/common/config';

//项目的指令集合
import '@/common/directive';
//过滤器
import '@/filters/toolsFilter';

import store from '@/store/index'

//富文本框neditor
import '@static/ueditor/ueditor.config.js'
import '@static/ueditor/ueditor.all.min.js'
import '@static/ueditor/ueditor.parse.min.js'
import '@static/ueditor/lang/zh-cn/zh-cn.js'
// 百度富文本重新定义插入图片按钮
UE.registerUI(`simpleupload`, function (editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    // editor.registerCommand(uiName, {
    //     execCommand: function () {
    //         alert(uiName)
    //     }
    // });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: '上传图片',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'height: 20px !important; width: 20px !important;background-image: url(../images/icons.png);background-position: -726px -77px;',
        //点击时执行的命令
        onclick: function () {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand(uiName);
            // $vue.showUploadImgDialog();
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射
   editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
}, 6);


Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})