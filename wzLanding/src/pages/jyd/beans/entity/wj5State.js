import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  wj5State extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wj5State');
        }

        init(){
            // super.loadJs('http://yun.tuisnake.com/h5-mami/log.js',()=>{
            //     super.initSuccess();
            // },{id:'send_log'});
            super.initSuccess();
        }

        sendApi(event_type,fn){
            let requestData={
                event_type:event_type,
                event_time:new Date().getTime(),
                callback:getHashArgs('callback'),
            }
            let postUrl = 'http://ad.partner.gifshow.com/track/activate'
            request.post(urls.apiUrlGetThrough,{requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
                if(fn) {
                    fn(res)
                }
			})
        }

        addState(type){
            setTimeout(() => {
                
                switch (type) {
                    case 'getCardBtnClick':   //首页点击【免费领卡】
                        this.sendApi(1,()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    case 'submitAddressBtnClick':  //填写地址页点击【提交申请】
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        this.sendApi(9,()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        this.sendApi(15,()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
