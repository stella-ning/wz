import BaseState from '../base/BaseState'
export default class jgggState extends BaseState {
    constructor(channelName, pageName) { // 定义构造方法
        super(channelName, pageName, 'jgggState');
    }

    init() {
        super.initSuccess();
    }

    sendApi(event, fn) {
        // getHashArgs('jcid')
        let requestData = {
            jcid:getUrlArgs('jcid'),
            product_id:'2509',
            event:event,
        }
        let getUrl = 'https://bj2-api.ad.jiguang.cn/v2/trk/h5track'
        request.post(urls.apiUrlGetThrough, { requestUrl: encodeURIComponent(addUrlParams(getUrl, requestData)) }, false).then((res) => {
            if (fn) {
                fn(res)
            }
        })
    }
    addState(type) {
        setTimeout(() => {
            switch (type) {
                case 'getCardBtnClick': //首页点击【免费领卡】
                    break;
                case 'submitAddressBtnClick': //填写地址页点击【提交申请】
                    this.sendApi('register',()=>{
                        super.addStateSuccess(type);
                    });
                    break;
                case 'payBtnClick':  // 买卡页点击【提交申请】
                    this.sendApi('reservation',()=>{
                        super.addStateSuccess(type);
                    });
                    break;
                case 'paySuccess':  // 订单详情页【支付成功】状态
                    this.sendApi('complete_order',()=>{
                        super.addStateSuccess(type);
                    });
                    break;
                default:
                    break;
            }
        }, 200);
    }

}
