import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  ykhdtState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'ykhdtState');
        }

        init(){
            super.loadJs('https://static.adhudong.com/display/public/conversion/conversion.min.js',()=>{
                super.initSuccess()
                
            },{id:'send_log'});
        }

        sendApi(subType,fn){
            let requestData={
                subType:subType,
                a_oId:getHashArgs('a_oId'),
                advertKey:'C92EF47EE7FE38BBACFD15E6F821A6C3'
            }
            let postUrl = 'https://activity.tuia.cn/log/effect/v2'
            Vue.prototype.request.post(urls.apiUrlPostThrough,{requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
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
                        emar.saveEffect({
                            type:4,//1:表单预约,3:激活,4:注册,5:付费行为,6:下单,7:微信授权,17:复制微信号
                            uid:Vue.prototype.$ls.get('userInfo').userPhone
                        });
                        super.addStateSuccess(type);
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                       
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        emar.saveEffect({
                            type:5,//1:表单预约,3:激活,4:注册,5:付费行为,6:下单,7:微信授权,17:复制微信号
                            uid:Vue.prototype.$ls.get('userInfo').userPhone
                        });
                        super.addStateSuccess(type);
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}

 
