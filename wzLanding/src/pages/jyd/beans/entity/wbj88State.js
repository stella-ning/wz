import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  wbj88State extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wbj88State');
        }

        init(){
            // super.loadJs('http://yun.tuisnake.com/h5-mami/log.js',()=>{
            //     super.initSuccess();
            // },{id:'send_log'});
            super.initSuccess();
        }

        sendApi(behavior,fn){
            let requestData={
                behavior:behavior,
                time:new Date().getTime(),
                mark_id:getHashArgs('mark_id'),
                host:window.location.host
            }
            let postUrl = 'https://api.biz.weibo.com/track/activate'
            request.post(urls.apiUrlPostThrough,{requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
                if(fn) {
                    fn(res)
                }
			})
        }

        addState(type){
            setTimeout(() => {
                
                switch (type) {
                    case 'getCardBtnClick':   //首页点击【免费领卡】
                        break;
                    case 'submitAddressBtnClick':  //填写地址页点击【提交申请】
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        this.sendApi(1001,()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        this.sendApi(1007,()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
