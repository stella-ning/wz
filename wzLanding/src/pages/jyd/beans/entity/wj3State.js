import BaseState from '../base/BaseState'
export default  class  wj3State extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wj3State');
        }

        init(){
            super.loadJs('http://static.lnkdata.com/js/monitor.min.js',()=>{
                super.initSuccess();
            });
        }

        addState(type){
            setTimeout(() => {
                
                switch (type) {
                    case 'getCardBtnClick':  //首页点击【免费领卡】
                            Xmob_Monitor.xmob_monitor_act(getUrlParam('mob_cid'),getUrlParam('plid'),0);
                            super.addStateSuccess(type);
                        break;
                    case 'submitAddressBtnClick': //填写地址页点击【提交申请】
                            Xmob_Monitor.xmob_monitor_act(getUrlParam('mob_cid'),getUrlParam('plid'),1);
                            super.addStateSuccess(type);
                        break;
                    case 'payBtnClick':  // 买卡页点击【提交申请】
                            Xmob_Monitor.xmob_monitor_act(getUrlParam('mob_cid'),getUrlParam('plid'),2);
                            super.addStateSuccess(type);
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                            Xmob_Monitor.xmob_monitor_act(getUrlParam('mob_cid'),getUrlParam('plid'),3);
                            super.addStateSuccess(type);
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
