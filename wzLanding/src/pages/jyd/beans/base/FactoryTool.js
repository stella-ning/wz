import StateConfig from '../StateConfig'

export  default class FactoryTool  {
    constructor(channelName,pageName) { 
       this.channelName = channelName;
       this.pageName = pageName;
       this.init();
    }

   static PageEnum = {
        'getCardBtnClick':'getCardBtnClick',   //首页点击【免费领卡】
        'submitAddressBtnClick':'submitAddressBtnClick',  //填写地址页点击【提交申请】
        'paySuccess':'paySuccess',   // 订单详情页【支付成功】状态
        'payBtnClick':'payBtnClick', // 买卡页点击【提交申请】
    }

    init(){
        var Bean = StateConfig[this.channelName];
        if(Bean != null) {
            this.myState = new Bean(this.channelName,this.pageName);
            this.myState.init();
        }
        else {
            console.log('===== FactoryTools 中Bean 为空！！！！！======')
            console.log('===== 请检查渠道名称是否正确 ============')
            console.log('===== 请检查/jyd/beans/StateConfig.js是否正确 =======')
            console.log('===== 请检查/jyd/beans/entity 中的统计类是否正确 =======')
        }
        
    }

    addState(type){
        if(this.myState != null)  {
            this.myState.addState(type);
        }
        
    }
    
}