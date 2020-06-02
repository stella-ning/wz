import BaseState from '../base/BaseState'
export default class wbjState extends BaseState {
    constructor(channelName, pageName) { // 定义构造方法
        super(channelName, pageName, 'wbjState');
    }

    init() {
        (function (root) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.crossOrigin = 'anonymous';
            script.src = 'https://cheka.biz.weibo.com/index';
            script.onerror = function () {
                var request = new XMLHttpRequest();
                var web_url = window.encodeURIComponent(window.location.href);
                var url = 'https://cheka.biz.weibo.com/v1/error';
                var data = {
                    "error": {
                        "url": web_url,
                        "message": "404",
                        "name": "__SDK_CDN__",
                        "detail": {}
                    }
                }

                request.open('POST', url, true);
                request.send('param=' + encodeURIComponent(data));
            }
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(script, s);
        })(window);
        super.initSuccess();
    }

    sendApi(code, fn) {
        // let requestData = {
        //     Code: code,
        // }
        // let getUrl = 'https://api.biz.weibo.com/track/activate'
        // request.post(urls.apiUrlGetThrough, { requestUrl: encodeURIComponent(addUrlParams(getUrl, requestData)) }, false).then((res) => {
        //     if (fn) {
        //         fn(res)
        //     }
        // })
    }
    addState(type) {
        setTimeout(() => {
            switch (type) {
                case 'getCardBtnClick': //首页点击【免费领卡】
                    break;
                case 'submitAddressBtnClick': //填写地址页点击【提交申请】
                    // this.sendApi('1001', () => {
                    //     super.addStateSuccess(type);
                    // });
                    window.wbadmt.send({
                        'eventid':getUrlArgs('eventid'),
                        'eventtype':'form',
                        'eventvalue':''
                    })
                    super.addStateSuccess(type); 
                    break;
                case 'payBtnClick':  // 买卡页点击【提交申请】
                    window.wbadmt.send({
                        'eventid':getUrlArgs('eventid'),
                        'eventtype':'shopping',
                        'eventvalue':''
                    })
                    super.addStateSuccess(type);
                    break;
                case 'paySuccess':  // 订单详情页【支付成功】状态
                    window.wbadmt.send({
                        'eventid':getUrlArgs('eventid'),
                        'eventtype':'shopping',
                        'eventvalue':''
                    })
                    super.addStateSuccess(type);
                    break;
                default:
                    break;
            }
        }, 200);
    }

}
