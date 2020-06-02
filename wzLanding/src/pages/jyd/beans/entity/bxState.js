import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  tajxState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'bxState');
        }

        init(){
            super.initSuccess();
        }   

        sendApi(subType='',type='',fn){
            // let userPhone =  Vue.prototype.$ls.get('userInfo').userPhone;
            var postUrl = 'http://eg.hiweiyuan.com/effect/v1';
            // if(window_OnTestServer()) {
            //     postUrl = 'https://eg.hixiaoman.com/effect/v2/test';
            // }
            // else if(window_OnReleaseServer()) {
            //     postUrl = 'https://eg.hixiaoman.com/effect/v2/prod';
            // }

           let requestData ={
                a_oId:getHashArgs('a_oId'), 
                advertKey:'A8C0DA014D', 
                subType:subType, 
                type:type
            }
            request.post(urls.apiUrlGetThrough,{ requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
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
                        this.sendApi('',7,()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        this.sendApi('',8,()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        this.sendApi(7,'',()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
