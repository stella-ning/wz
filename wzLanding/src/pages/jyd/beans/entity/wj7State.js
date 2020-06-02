import BaseState from '../base/BaseState'
import Vue from 'vue'
export default  class  wj7State extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wj7State');
        }

        init(){
            super.loadJs('https://static.baichuanhd.com/game/common/lib/effectCollect.js',()=>{
                super.initSuccess();
            });
        }

        addState(type){
            let phone= (Vue.prototype.$ls.get('useInfo') || {}).userPhone;
            setTimeout(() => {
                switch (type) {
                    case 'getCardBtnClick':   //首页点击【免费领卡】
                        // EffectCollect.effectReport({type: 1, name: '', mobile: phone}, {
                        //     callback: ()=> {
                        //         super.addStateSuccess(type);
                        //     },
                        // })
                        break;
                    case 'submitAddressBtnClick':  //填写地址页点击【提交申请】
                            // EffectCollect.effectReport({type: 2, name: '', mobile: phone}, {
                            //     callback: ()=> {
                            //         super.addStateSuccess(type);
                            //     },
                            // })
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                            // EffectCollect.effectReport({type: 3, name: '', mobile: phone}, {
                            //     callback: ()=> {
                            //         super.addStateSuccess(type);
                            //     },
                            // })
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                            EffectCollect.effectReport({type: 4, name: '', mobile: phone}, {
                                callback: ()=> {
                                    super.addStateSuccess(type);
                                },
                            })
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
