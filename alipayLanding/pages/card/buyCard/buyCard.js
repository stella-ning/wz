

var app = getApp();
var baseImgUrl = require('/utils/constant').baseImgUrl
Page({
  data: {
    successIcon:baseImgUrl + '/buy/successIcon.png',
    addressIcon:baseImgUrl + '/buy/addressIcon.png',
    limitActive:baseImgUrl + '/buy/limitActive.png',
    alipay:baseImgUrl + '/buy/alipay.png',
    topBgNew:baseImgUrl + '/buy/topBgNew.png',
    specialBg:baseImgUrl + '/buy/specialBg.png',
    buyBtnBg:baseImgUrl + '/buyBtnBg.png',
    userName:'',
    phone:'',
    address:{
        area:'',
        addressDetail:'',
        code:'',
    },
    cardOriginalPrice:'',
    generalPostagePrice:'',
    postageRadio:true,
    deadLine:'',
    postage:1,
    urgentPostagePrice:'',
    counter:'',
    remainTime:60*3,
    countdownLabel:'03分00秒',
    onHide:false,
    tempCardOrder:{},
  },
   initCounter(){

       if(this.data.onHide) {
         return;
       }

       if(this.data.remainTime <= 0) {
         return;
       }

        var hour = Math.floor((this.data.remainTime / 3600) % 24)
        var minute = Math.floor((this.data.remainTime / 60) % 60)
        var second = Math.floor(this.data.remainTime % 60)

        if(second < 9) {
          second = `0${second}`
        }
        if(minute < 9) {
          minute = `0${minute}`
        }
        setTimeout(()=>{
           this.setData({remainTime:this.data.remainTime - 1})
           this.setData({
             countdownLabel:`${minute}分${second}秒`
           })
           this.initCounter();
        },1000)
   },
   initAddress(){
     var userInfo  = app.getItem('userInfo');
     var address  = app.getItem('address');
     this.setData({
         phone:userInfo.phone,
         userName:userInfo.userName,
         address:address,
     })
     
  },
  toPay(){
     this.getAuthCode(code =>{
      this.callAddCardOrderWithoutLogin(code)
    });
    //  my.navigateTo({
    //   url: '/pages/order/orderDetail/orderDetail'
    //  });
  },
  callGetCardPrice(){
     app.post('getCardPrice',{},res=>{
        this.setData({
          cardOriginalPrice:res.resultData.cardOriginalPrice,
           generalPostagePrice:res.resultData.generalPostagePrice,
            urgentPostagePrice:res.resultData.urgentPostagePrice,
        })
     })
  },
   callAddCardOrderWithoutLogin(code){
     console.log('code:',code)
     let params = {
        consignee:this.data.userName,
        phone:this.data.phone,
        area:this.data.address.area,
        address:this.data.address.addressDetail,
        orderType:this.data.postage,
        channelName:'',  
        code:code,
        paymentType : 7
    };

     app.post('addCardOrderWithoutLogin',params,res => {
         this.setData({tempCardOrder:res.resultData.cardOrder})
         this.callPay(res.resultData.tradeNo)
     },error => {
        if(error.resultCode == 17 ){
             my.navigateTo({
               url: `/pages/order/orderDetail/orderDetail?cardId=${error.resultData.cardOrder.cardOrderId}&phone=${error.resultData.cardOrder.phone}`
             });
        }
     })
  },
  getAuthCode(fn){
      console.log('getAuth()')
      my.getAuthCode({
      scopes: 'auth_base', // 主动授权：auth_user，静默授权：auth_base。或者其它scope
      success: (res) => {
        console.log('res:',res)
        if (res.authCode) {
          // 认证成功
          // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
           if(fn) {
             fn(res.authCode)
           }
        }
      },
    });
  },
  callPay(tradeNo){
    console.log('tradeNo',tradeNo)
    my.tradePay({
        tradeNO: tradeNo,  
        success: (res)=> {   
           console.log('res:',res)  
           app.showToast('支付成功');       
           my.navigateTo({
               url: `/pages/order/orderDetail/orderDetail?cardId=${this.data.tempCardOrder.cardOrderId}&phone=${this.data.tempCardOrder.phone}`
           });
        },
        fail: (res)=> {  
            console.log('res:',res)         
          app.showToast(res)

       },
    });
  },
  
  onLoad(option) {
  
    this.initAddress();
    this.initCounter();
    this.callGetCardPrice();
    var currentTime = new Date();
    var time = currentTime.getTime()+6*(24*60*60*1000);
    this.setData({
       deadLine:new Date(time).Format('MM月dd日')
    })
  },
  onHide(){
    console.log('onHide')
    //  this.setData({onHide:true})
  }
});
