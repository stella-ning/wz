import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  catState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'catState');
        }
        init(){
            //
            super.loadJs('https://bxmads-test.oss-cn-hangzhou.aliyuncs.com/testEffect/effectListen.js',()=>{
                super.initSuccess();
            })
        }

        sendApi(subType,fn){
            let requestData={
                type:subType,
                bxmId:getUrlArgs('bxm_id'),
            }
            let postUrl = 'http://api.bianxianmao.com/dting/monitor/appActivate'
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
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        this.sendApi(2,()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
