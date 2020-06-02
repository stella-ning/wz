
const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
// const isPay = (process.env.NODE_ENV === 'production' && process.argv.splice(3) == '--pay' )? true :false;
const  projectName = 'fy'



const urls = {
    addAccess: `/${projectName}/access/addAccess`, //统计pv、uv
    getImgCode:`/${projectName}/imgCode/getImgCode`,//获取图形验证码
    sendCode:`/${projectName}/verifyCode/sendCode`,//获取短信验证码
    userRegister:`/${projectName}/user/userRegister`,//用户注册
    userLogin:`/${projectName}/user/userLogin`,//用户登录
    addCardOrder:`/${projectName}/cardOrder/addCardOrder`,//添加会员卡订单
    payCardOrder:`/${projectName}/cardOrder/payCardOrder`,//继续支付
    getCardPrice:`/${projectName}/cardOrder/getCardPrice`,//获取会员价格
    getCardOrderByPhone:`/${projectName}/cardOrder/getCardOrderByPhone`,//根据手机号码查询会员卡订单
    getCardOrderByUserId:`/${projectName}/cardOrder/getCardOrderByUserId`,//根据用户ID获取会员卡订单
    activateMembershipCard:`/${projectName}/membershipCard/activateMembershipCard`,//激活会员卡
    queryItemPromotionList:`/${projectName}/promotion/queryItemPromotionList`,//获取商品列表（0元购/1元购）
    getConstantValue:`/${projectName}/system/getConstantValues`,//获取客服信息
    addCardOrderWithoutLogin:`/${projectName}/cardOrder/addCardOrderWithoutLogin`,//免登陆添加会员卡订单
    payCardOrderWithoutLogin:`/${projectName}/cardOrder/payCardOrderWithoutLogin`,//免登陆继续支付订单
    getCardOrderWithoutLogin:`/${projectName}/cardOrder/getCardOrderWithoutLogin`,//免登陆获取订单详情   
    taobaoAuth:`/${projectName}/user/taobaoAuth`,//淘宝授权
    testPay:host + projectName+'/cardOrder/testPay',
    getLandPageByChannelName: `/${projectName}/landPage/getLandPageByChannelName`,//根据渠道名称获取落地页配置
    apiUrlPostThrough: `/${projectName}/api/apiUrlPostThrough`,//通用第三方请求post
    apiUrlGetThrough: `/${projectName}/api/apiUrlGetThrough`,//通用第三方请求get
}

global.urls = urls;

export default {
    urls
}

