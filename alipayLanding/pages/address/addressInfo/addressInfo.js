
var app = getApp();
var tools = require('/utils/tools') 
var baseImgUrl = require('/utils/constant').baseImgUrl
Page({
  data: {
    limitActive:baseImgUrl + '/buy/limitActive.png',
    userIcon:baseImgUrl + '/buy/userIcon.png',
    phoneIcon:baseImgUrl + '/buy/phoneIcon.png',
    areaIcon:baseImgUrl + '/buy/areaIcon.png',
    detailIcon:baseImgUrl + '/buy/detailIcon.png',
    addressBg:baseImgUrl + '/addressBg.png',
    buyBtnBg:baseImgUrl + '/buyBtnBg.png',
    deadLine:'',
    areaList:[],
    showAreaList:false,
    address:{
        area:'',
        addressDetail:'',
        code:'',
    },
    userName:'',
    phone:'',
  },
  onInputUserName(e){
    this.setData({ userName: e.detail.value})
  },
  onInputPhone(e){
    this.setData({ phone: e.detail.value})
  },
  onInputAddress(e){
    this.setData({'address.addressDetail': e.detail.value})
  },
  initAddress(){
     var userInfo  = app.getItem('userInfo') || {};
     var address  = app.getItem('address') || {};
     this.setData({
         phone:userInfo.phone,
         userName:userInfo.userName,
         address:address,
     })
     
  },
  toApply(){
    console.log('this.data.phone:',this.data.phone)
    if(tools.isNull(this.data.userName)){
        app.showToast('请完善收货人姓名')
        return;
    }
    if(!tools.checkPhoneMob(this.data.phone)) {
       app.showToast('请填写正确的手机号码')
       return;
    }
    if(tools.isNull(this.data.address.area) || tools.isNull(this.data.address.addressDetail)){
        app.showToast('请完善收货信息')
        return;
    }
    app.setItem('address',this.data.address);
    app.setItem('userInfo',{
       userName:this.data.userName,
       phone:this.data.phone,
    })
  
    my.navigateTo({
         url: '/pages/card/buyCard/buyCard'
     });
      // app.showToast('正在跳转');
      // setTimeout(()=>{
      //     my.navigateTo({
      //       url: '/pages/test2/test2'
      //   });
      // },1000)
  },
  getAreaList(){
    app.loadJs('https://www.fychs.com/wangzhuan/alipayLanding/data/areaData.json',{},res=>{
        this.setData({
           areaList:res,
        })
    })
  },
  onConfirm(e){
      // if(this.isEdit){
      //     this.isShowArea = false;
      // }else{
      //     this.showAreaList = false;
      // }
      this.setData({showAreaList:false})
      var content = e.detail.values;
      this.setData({ 'address.area':'',})
      content.map((item,key)=>{
          if(key == content.length-1){
              this.setData({
                 'address.area':this.data.address.area += `${item.name}`,
                 'address.code':item.code
              })
             
          }else{
              this.setData({
                 'address.area':this.data.address.area += `${item.name}-`,
              })
          }
      })
      console.log(this.data.address)
  },
  showAreaDialog(){
    this.setData({showAreaList:true})
  },
  onCancel(){
    this.setData({showAreaList:false})
  },
  onClose(){

  },
  onLoad() {
    this.initAddress();
    this.getAreaList();
    var currentTime = new Date();
    var time = currentTime.getTime()+6*(24*60*60*1000);
    this.setData({
       deadLine:new Date(time).Format('MM月dd日')
    })
  },
});
