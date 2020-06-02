var baseImgUrl = require('/utils/constant').baseImgUrl
var app = getApp();
var tools = require('/utils/tools')
Page({
  data: {
    orderTop:baseImgUrl + '/order/orderTop.png',
    hot:baseImgUrl + '/order/hot.png',
    paySucess:baseImgUrl + '/order/paySucess.png',
    rightLine:baseImgUrl + '/order/rightLine.png',
    leftLine:baseImgUrl + '/order/leftLine.png',
    lead1:baseImgUrl + '/order/lead1.png',
    lead2:baseImgUrl + '/order/lead2.png',
    lead4:baseImgUrl + '/order/lead4.png',
    addressIcon:baseImgUrl + '/buy/addressIcon.png',
    paySuccessBg:baseImgUrl + '/order/paySuccessBg.png',
    serveBtn:baseImgUrl + '/serveBtn.png',
    userName:'',
    phone:'',
    address:{
        area:'',
        addressDetail:'',
        code:'',
    },
    generalPostagePrice:'',
    postage:1,
    urgentPostagePrice:'',
    orderNo:'',
    addressBoxShow:false,
    show:false,
    remainTime:60 * 10,
    countdownLabel:'10分00秒',
    query:{},
    cardOrder:{},
    sourcePrice:'',
  },
    initCounter(){

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
   callGetCardPrice(){
     app.post('getCardPrice',{},res=>{
        this.setData({
           cardOriginalPrice:res.resultData.cardOriginalPrice,
           generalPostagePrice:res.resultData.generalPostagePrice,
           urgentPostagePrice:res.resultData.urgentPostagePrice,
        })
     })
  },
  callOrderDetail(){
     var params={};
     if(this.data.query.cardId){
          params.cardOrderId = this.data.query.cardId
          params.phone = this.data.query.phone
      }else{
          params.cardOrderId = this.cardOrder.cardOrderId
          params.phone = this.cardOrder.phone
      }
      app.post('getCardOrderWithoutLogin',params,res=>{
         this.setData({cardOrder:res.resultData.cardOrder})
         const resData = res.resultData.cardOrder;
         this.setData({
            userName:resData.consignee,
            phone:tools.noPassByPhone(resData.userPhone),
            'address.area':resData.area,
            'address.addressDetail':resData.address,
            postage:resData.orderType,
            orderState:resData.orderState,
            addTime:new Date(resData.addTime).Format(),
            orderNo:resData.orderNo
         })
          var userInfo = {
              userId: resData.userId,
              phone: resData.phone,
              userName:resData.consignee,
          };
     })
  },
  initAddress(){
    //  var userInfo  = app.getItem('userInfo');
    //  var address  = app.getItem('address');
    //  this.setData({
    //      phone:tools.noPassByPhone(userInfo.phone),
    //      userName:userInfo.userName,
    //      address:address,
    //  })
     
  },
  toggleAddress(){
     if(this.data.addressBoxShow) {
       this.setData({
          addressBoxShow:false,
      })
    }else {
        this.setData({
          addressBoxShow:true,
       })
    }
  },
  showContactDialog(){
    this.setData({show:true})
  },
  onContactDialog(){
      this.setData({show:false})
  },

  onLoad(query) {
    this.setData({
       query:query,
       cardOrder:app.getItem('cardOrder') || {}
    })
    this.initCounter();
    this.initAddress();
    this.callGetCardPrice();
    this.callOrderDetail(); 
  },
});
