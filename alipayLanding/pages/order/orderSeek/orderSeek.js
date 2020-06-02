var app = getApp();
var tools = require('/utils/tools')

Page({
  data: {
    phone:'',
    code:'',
    imgUrl:'',
    imgCode:'',
    time:0,
  },
  onInputPhone(e){
      this.setData({
        phone:e.detail.value
      })
  },
  onInputImgCode(e){
      this.setData({
        imgCode:e.detail.value
      })
  },
  onInputCode(e){
      this.setData({
        code:e.detail.value
      })
  },
  initTimer() {
    this.setData({
      time:60
    })
   let timer = setInterval(()=>{
      this.setData({
        time:this.data.time - 1
      })
      if(this.data.time == 0) {
        clearInterval(timer)
      }
    },1000)
  },
   getImgCode(){
      app.post('getImgCode',{},(res)=>{
        this.setData({
            imgUrl:res.resultData.imgCode.imgUrl,
            imgCodeId:res.resultData.imgCode.imgCodeId
        })
     })  
  },
  getCheckCode(){
    let params = {
        phone:this.data.phone,
        code:this.data.imgCode,
        imgCodeId:this.data.imgCodeId,
        verifyType:3,//短信验证码类型。1：用户注册，2：用户登陆，3：订单查询，4：激活会员，5：管理员登陆
    };
    if(!tools.checkPhoneMob(params.phone)) {
      app.showToast('请输入正确手机号码')
      return;
    }
    if(tools.isNull(params.code)) {
      app.showToast('请输入图片验证码')
      return;
    }
    this.initTimer();
    app.post('sendCode',params,(res)=>{
        app.showToast('验证码成功发送')
    }) 
  },
  toSeek(){
    let params = {
        phone:this.data.phone,
        code:this.data.code,
        channelName:app.globalData.channelName,
        platformType:2,//平台类型。1：cms，2：wap，3：iOS，4：android
    };
    if(!tools.checkPhoneMob(params.phone)) {
      app.showToast('请输入正确手机号码')
      return;
    }
    if(tools.isNull(params.code)) {
      app.showToast('请输入验证码')
      return;
    }
    app.post('getCardOrderByPhone',params,(res)=>{
        let cardInfo = res.resultData.cardOrder;
        let cardOrder = {
            cardOrderId:cardInfo.cardOrderId,
            phone:cardInfo.phone,
            consignee:cardInfo.consignee,
            payWay:cardInfo.paymentType,
        };
        app.setItem('cardOrder',cardOrder)
        my.navigateTo({
          url: `/pages/order/orderState/orderState?cardOrderId=${cardInfo.cardOrderId}&phone=${cardInfo.phone}`
        });
    }) 
  },
  onLoad() {
     this.getImgCode();
  },
});
