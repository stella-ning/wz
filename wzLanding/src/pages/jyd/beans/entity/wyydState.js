import BaseState from '../base/BaseState'
export default  class  wyydState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wyydState');
        }

        init(){
            super.initSuccess();
        }

        sendApi(action,fn){
            let requestData ={
                conv_action:action,
                conv_ext:getHashArgs('ext_youdao'),
            }
            let getUrl = 'http://conv.youdao.com/api/track'
            request.post(urls.apiUrlGetThrough,{requestUrl:encodeURIComponent(addUrlParams(getUrl,requestData))},false).then((res)=>{
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
                        this.sendApi('landingpage_submitform',()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        this.sendApi('landingpage_purchase',()=>{
                            super.addStateSuccess(type);
                        })
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                         this.sendApi('landingpage_submitcredit',()=>{
                            super.addStateSuccess(type);
                         })
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
