import BaseState from '../base/BaseState'
export default  class  ytcbState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'ytcbState');
        }

        init(){
            super.initSuccess();
        }

        sendApi(event_type,fn){
            let requestData={
                event_type:event_type,
                clickid:getHashArgs('clickid'),
            }
            let postUrl = 'https://naga.convergemob.com/naga/dsp/transform'
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
                        
                        break;
                    case 'submitAddressBtnClick':  //填写地址页点击【提交申请】
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        this.sendApi(35,()=>{
                            super.addStateSuccess(type);
                        });
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
