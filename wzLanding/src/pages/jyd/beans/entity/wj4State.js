import BaseState from '../base/BaseState'
export default  class  wj4State extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wj4State');
        }

        init(){
            super.loadJs('https://static.douin.xyz/static/tencentAdv.js',()=>{
                super.initSuccess();
            });
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
                        _ai_analysis();
                        super.addStateSuccess(type);
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
