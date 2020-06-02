import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  ytxmState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'ytxmState');
        }

        init(){
            
        }

        sendApi(subType,fn){
            //http://trail.e.mi.com/global/log?appId=urlencode({appid})&info=urlencode({data})&conv_type=urlencode({convType})&customer_id=urlencode({customerId
            // let requestData={
            //     appId:urlencode('2882303761518281781'),
            //     info:urlencode(''),
            //     conv_type:subType,
            //     customer_id:urlencode('bxm_id'),
            // }
            // let postUrl = 'http://trail.e.mi.com/global/test'
            // Vue.prototype.request.post(urls.apiUrlGetThrough,{requestUrl:encodeURIComponent(addUrlParams(postUrl,requestData))},false).then((res)=>{
            //     if(fn) {
            //         fn(res)
            //     }
			// })
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
                        // this.sendApi(2,()=>{
                        //     super.addStateSuccess(type);
                        // });
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
