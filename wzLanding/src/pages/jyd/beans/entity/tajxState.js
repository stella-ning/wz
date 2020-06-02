import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  tajxState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'tajxState');
        }

        init(){
            super.loadJs('http://yun.tuisnake.com/h5-mami/log.js',()=>{
                super.initSuccess();
            },{id:'send_log'});
        }

        sendApi(subType,fn){
            let requestData={
                subType:subType,
                a_oId:getHashArgs('a_oId'),
                advertKey:'C92EF47EE7FE38BBACFD15E6F821A6C3',
                
            }
            let postUrl = 'https://activity.tuia.cn/log/effect/v2'
            Vue.prototype.request.post(urls.apiUrlGetThrough,{requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
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
                        countLog.init(()=> { 
                            super.addStateSuccess(type);
                        });
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        this.sendApi(2,()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        this.sendApi(3,()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
