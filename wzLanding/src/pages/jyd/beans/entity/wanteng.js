import BaseState from '../base/BaseState'
import md5 from '../base/md5'
export default  class  wantengState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'wantengState');
        }

        init(){
            super.loadJs('https://static.douin.xyz/static/tencentAdv.js',()=>{
                super.initSuccess();
            });
        }

        sendApi(postUrl,fn){
            let accountId = 'c54dff5c2f8440aa82a21aa2b2517fbb';
            let secret = '1f1b0091c311ad5e';
            let bidId = getHashArgs('bidId') || '';
            let click_ext = getHashArgs('click_ext') || '';
            let dkey = getHashArgs('dkey') || '';
            let trackParam = getHashArgs('trackParam') || '';
            let status = 1;
            let signTemp = `${accountId}${bidId}${click_ext}${dkey}${status}${trackParam}${secret}`
            let sign = md5.hex_md5(signTemp)
            console.log('signTemp:',signTemp);
            console.log('params',{
                accountId:accountId,
                secret:secret,
                bidId:bidId,
                click_ext:click_ext,
                dkey:dkey,
                trackParam:trackParam,
                status:status,
                signTemp:signTemp,
                sign:sign,
            })
            let requestData ={
                    accountId:accountId,
                    status:status,
                    click_ext:click_ext,
                    bidId:bidId,
                    trackParam:trackParam,
                    dkey:dkey,
                    sign:sign,
            }
            postUrl = addUrlParams(postUrl,requestData)
            var params = {
                requestUrl:encodeURIComponent(postUrl),
            }
            request.post(urls.apiUrlGetThrough,params,false).then((res)=>{
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
                        _ai_analysis();
                        super.addStateSuccess(type);
                        break;
                    case 'paySuccess': // 订单详情页【支付成功】状态
                         this.sendApi('https://openapi.bayimob.com/openApi/deepTranslate/v2',()=>{
                            super.addStateSuccess(type);
                         })
                        break;
                    default:
                        break;
                }
            }, 200);
        }
       
}
