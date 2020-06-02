import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  ykksState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'ykksState');
        }

        init(){
            (function (root) {
                var ksscript = document.createElement('script');
                ksscript.setAttribute('charset', 'utf-8');
                ksscript.src = 'https://static.yximgs.com/udata/pkg/ks-ad-trace-sdk/ks-trace.2.0.1.beta.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ksscript, s);
            })(window);
            super.initSuccess();
        }


        addState(type){
            setTimeout(() => {
                
                switch (type) {
                    case 'getCardBtnClick':   //首页点击【免费领卡】
                        
                        break;
                    case 'submitAddressBtnClick':  //填写地址页点击【提交申请】
                        console.log('submitAddressBtnClick 点击');
                        _ks_trace.push({event: 'form', convertId: 21128, cb: ()=>{
                            super.addStateSuccess(type);
                        }})
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                       
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
