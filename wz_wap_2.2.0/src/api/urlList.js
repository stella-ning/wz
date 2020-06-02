
const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
// const isPay = (process.env.NODE_ENV === 'production' && process.argv.splice(3) == '--pay' )? true :false;
const  projectName = 'fy'
let host ;
// 正式打包
if(isProduction) {
    host = window.location.protocol +'//' + window.location.host + '/';
}
else {//测试
    host = TEST_HOST +'/';
}
console.log('host--------:',host)

const urls = {
    addAccess: host + projectName + '/access/addAccess', //统计pv、uv
    getImgCode:`/${projectName}/imgCode/getImgCode`,//获取图形验证码
    sendCode:`/${projectName}/verifyCode/sendCode`,//获取短信验证码
    userRegister:`/${projectName}/user/userRegister`,//用户注册
    userLogin:`/${projectName}/user/userLogin`,//用户登录
    // addCardOrder:`/${projectName}/cardOrder/addCardOrder`,//添加会员卡订单
    // payCardOrder:`/${projectName}/cardOrder/payCardOrder`,//继续支付
    getCardPrice:`/${projectName}/cardOrder/getCardPrice`,//获取会员价格
    getCardOrderByPhone:`/${projectName}/cardOrder/getCardOrderByPhone`,//根据手机号码查询会员卡订单
    getCardOrderByUserId:`/${projectName}/cardOrder/getCardOrderByUserId`,//根据用户ID获取会员卡订单
    activateMembershipCard:`/${projectName}/membershipCard/activateMembershipCardWithoutLogin`,//勉登录激活会员卡
    queryItemPromotionList:`/${projectName}/promotion/queryItemPromotionList`,//获取商品列表（0元购/1元购）
    getConstantValue:`/${projectName}/system/getConstantValues`,//获取客服信息
    appAddCardOrderWithoutLogin:`/${projectName}/appCardOrder/addCardOrderWithoutLogin`,//原生支付-免登陆添加会员卡订单
    appPayCardOrderWithoutLogin:`/${projectName}/appCardOrder/payCardOrderWithoutLogin`,//原生支付-免登陆继续支付订单
    addCardOrderWithoutLogin:`/${projectName}/cardOrder/addCardOrderWithoutLogin`,//免登陆添加会员卡订单
    payCardOrderWithoutLogin:`/${projectName}/cardOrder/payCardOrderWithoutLogin`,//免登陆继续支付订单
    getCardOrderWithoutLogin:`/${projectName}/cardOrder/getCardOrderWithoutLogin`,//免登陆获取订单详情   
    taobaoAuth:`/${projectName}/user/taobaoAuth`,//淘宝授权
    testPay:host + projectName+'/cardOrder/testPay',
    getIdiomAmount:`/${projectName}/game/getIdiomAmount`,//获取成语次数
    getIdiom:`/${projectName}/game/getIdiom`,//获取成语
    replyIdiom:`/${projectName}/game/replyIdiom`,//回答成语
    insertIdiomGameAward:`/${projectName}/game/insertIdiomGameAward`,//领取成语奖励
    getTurntableGameAmount:`/${projectName}/game/getTurntableGameAmount`,//获取转盘游戏次数
    getTurntableGameAward:`/${projectName}/game/getTurntableGameAwardStatus`,//获取转盘游戏奖励类型
    insertTurntableGameAward:`/${projectName}/game/insertTurntableGameAward`,//领取转盘游戏奖励
    getItemActGroup:`/${projectName}/itemAct/getItemActGroup`,//获取商品活动分组 
    getItemActGroupPart:`/${projectName}/itemAct/getItemActGroupPart`,//获取活动分组的商品 
    getItemActNameAndIdList:`/${projectName}/itemAct/getItemActNameAndIdList`,//获取商品活动名称列表
    //短信点击记录
    smsClick:`/${projectName}/smsMarketingContent/smsClick`,
    //营销短信详情
    getSmsMarketingContentDetails: `/${projectName}/smsMarketingContent/getSmsMarketingContentDetails`,
    
}

export default {
    urls
}

