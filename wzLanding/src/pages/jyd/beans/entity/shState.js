import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  shState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'shState');
        }

        init(){
            super.loadJs('http://fdf24fb6ce298.cdn.sohucs.com/track-report/adTackRport.js',()=>{
                super.initSuccess();
            });
            // (function(root) {
            //     var script = document.createElement('script'); 
            //     script.type = 'text/javascript'; 
            //     script.async = true;
            //     script.src = '//fdf24fb6ce298.cdn.sohucs.com/track-report/adTackRport.js';
            //     script.onerror = function () {}
            //     var s = document.getElementsByTagName('script')[0]; 
            //     s.parentNode.insertBefore(script, s);
            // })(window);
            // super.initSuccess();
        }

        // sendApi(subType,fn){
        //     let requestData={
        //         type:subType,
        //         bxmId:getUrlArgs('bxm_id'),
        //     }
        //     let postUrl = 'http://api.bianxianmao.com/dting/monitor/appActivate'
        //     Vue.prototype.request.post(urls.apiUrlGetThrough,{requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
        //         if(fn) {
        //             fn(res)
        //         }
		// 	})
        // }

        addState(type){
            setTimeout(() => {
                
                
                switch (type) {
                    case 'getCardBtnClick':   //首页点击【免费领卡】
                        
                        break;
                    case 'submitAddressBtnClick':  //填写地址页点击【提交申请】
                     
                       var channelName = getUrlArgs('channel')
                       if(channelName == 'sh2') {
                           _shTrackSendLog({ 'trackId': "12", 'trackType': "FORM", 'convertId': "3859" })
                            super.addStateSuccess(type,`${channelName}:${3859}`);
                        }
                        if(channelName == 'sh3') {
                            _shTrackSendLog({ 'trackId': "12", 'trackType': "FORM", 'convertId': "3860" })
                            super.addStateSuccess(type,`${channelName}:3860`);
                        }
                        if(channelName == 'sh4') {
                            _shTrackSendLog({ 'trackId': "12", 'trackType': "FORM", 'convertId': "3831" })
                            super.addStateSuccess(type,`${channelName}:3831`);
                        }
                        if(channelName == 'sh5') {
                            _shTrackSendLog({ 'trackId': "12", 'trackType': "FORM", 'convertId': "3827" })
                            super.addStateSuccess(type,`${channelName}:3827`);
                        }
                        if(channelName == 'sh6') {
                            _shTrackSendLog({ 'trackId': "12", 'trackType': "FORM", 'convertId': "3864" })
                            super.addStateSuccess(type,`${channelName}:3864`);
                        }
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                     
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
