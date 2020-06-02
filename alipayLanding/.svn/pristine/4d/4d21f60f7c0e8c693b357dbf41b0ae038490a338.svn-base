var app = getApp();
var tools = require('/utils/tools')
var baseImgUrl = require('/utils/constant').baseImgUrl
Page({
  data: {
    lineH: baseImgUrl + '/order/lineH.png',
    orderNo: '',
    deliverNo:'',
    phone: '',
    userName: '',
    address: {
      area: '',
      addressDetail: '',
    },
    orderState: 7,//1：已下单，待付款，2：已付款，待发货，3：已发货，待激活，4：已激活，5：退款中，6：退款成功，7：退款失败
    cardOrderId: '',
    query:{},
  },

  copyToClipboard() {
    my.setClipboard({
      text: this.data.orderNo,
    });
    app.showToast('订单号已复制到剪切板');
  },
  copyShipmentToClipboard() {
    my.setClipboard({
      text: this.data.deliverNo,
    });
    app.showToast('物流单号已复制到剪切板');
  },
  
  cancelOrder() {
    this.callAddCardRefundWithoutLogin();

  },
  callOrderDetail() {
    var params = {
      cardOrderId: this.data.query.cardOrderId,
      phone: this.data.query.phone
    };
    app.post('getCardOrderWithoutLogin', params, res => {
      this.setData({ cardOrder: res.resultData.cardOrder })
      const resData = res.resultData.cardOrder;
      this.setData({
          userName: resData.consignee,
          phone: resData.userPhone,
          'address.area': resData.area,
          'address.addressDetail': resData.address,
          postage: resData.orderType,
          orderState: resData.orderState,
          orderNo: resData.orderNo,
          deliverNo:resData.deliverNo
      })
      // var userInfo = {
      //   userId: resData.userId,
      //   phone: resData.phone,
      //   userName: resData.consignee,
      // };
    })
  },
  //取消订单
  callAddCardRefundWithoutLogin(){
     var params = {
       cardOrderId:this.data.cardOrderId,
       phone:this.data.phone
     }
     app.post('addCardRefundWithoutLogin', params, res => {
         this.callOrderDetail();
     });
  },
onPullDownRefresh() {
     this.callOrderDetail();
 }, 
  onLoad(query) {
    this.setData({
      cardOrderId: query.cardOrderId,
      phone: query.phone,
      query:query
    })
    this.callOrderDetail();
  },
});
