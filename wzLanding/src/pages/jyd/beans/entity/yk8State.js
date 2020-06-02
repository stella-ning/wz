import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  yk8State extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'yk8State');
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
                    countLog.ready(() =>{
                        countLog.init(() =>{
                            super.addStateSuccess(type);
                        }, {
                            // 是否需要复制订单号，是为1，不是为0 
                            isCopy: 0,
                            // 上报转化类型，0:转化，1:下载，2:表单预约，3:下单(web)，4:注册(web)，5:申请(web)，6:页面咨询
                            pageType: 5
                        })
                    })
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        countLog.ready(() =>{
                            countLog.init(() =>{
                                super.addStateSuccess(type);
                            }, {
                                // 是否需要复制订单号，是为1，不是为0 
                                isCopy: 0,
                                // 上报转化类型，0:转化，1:下载，2:表单预约，3:下单(web)，4:注册(web)，5:申请(web)，6:页面咨询
                                pageType: 3

                            })
                        })
                        
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
