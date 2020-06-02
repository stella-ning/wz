var app = getApp();
var baseImgUrl = require('/utils/constant').baseImgUrl
Page({
  data: {
    partOneBg:baseImgUrl + '/jyd/partOneBg.png',
    seckillBoxBg:baseImgUrl + '/home/seckillBoxBg.png',
    morePrivileges:baseImgUrl + '/home/morePrivileges.png',
    tx:baseImgUrl + '/home/tx.png',
    cooperationImg:baseImgUrl + '/home/cooperationImg.png',
    cooperateIcon:baseImgUrl + '/home/cooperateIcon.png',
    contactIcon:baseImgUrl + '/home/contactIcon.png',
    rightIcon:baseImgUrl + '/home/contactIcon.png',
    redPackage:baseImgUrl + '/home/redPackage.png',
    serveBtn:baseImgUrl + '/serveBtn.png',
    selectedPrivileges21:baseImgUrl + '/home/selectedPrivileges21.png',
    selectedPrivileges2:baseImgUrl + '/home/selectedPrivileges2.png',
    newVipGoodsBg:baseImgUrl + '/home/newVipGoodsBg.png',
    price0:baseImgUrl + '/home/price0.png',
    membershipPrivilegesBg:baseImgUrl + '/home/membershipPrivilegesBg.png',
    tq1:baseImgUrl + '/home/tq1.png',
    tq2:baseImgUrl + '/home/tq2.png',
    tq3:baseImgUrl + '/home/tq3.png',
    tq4:baseImgUrl + '/home/tq4.png',
    coupon:baseImgUrl + '/home/coupon.png',
    gotItBth:baseImgUrl + '/home/gotItBth.png',
    selectedPrivilegesBg:baseImgUrl + '/home/selectedPrivilegesBg.png',
    globalBrandBg:baseImgUrl + '/home/globalBrandBg.png',
    servicePhone:'',
    dialogShow:false,
    show:false,
    startTime:0,
    deadLine:'',
    cardData:require('./cardDatas.js').datas,
    membershipPrivilegeTab:[
				{name:'热门推荐',englishName:'hotRecommend6'},
				{name:'生活服务',englishName:'liveServer'},
				{name:'美食饮品',englishName:'foodDrink'},
				{name:'旅游出行',englishName:'travelTrip'},
				{name:'影音娱乐',englishName:'entertainment'},
    ],
    globalTab:[
				{name:'精选',englishName:'JX'},
				{name:'美妆',englishName:'MZ'},
				{name:'食品',englishName:'MS'},
				{name:'女装',englishName:'NZ'},
				],
    customerService:'6666',
    membershipPrivilegeList:[],
    currentPrivilege:0,
    currentBrand:0,
    globalBrandImg:'',
    currentSeckillIndex:0,
    seckillImg:'',
    seckillTimeTabList:[
      {
        time:'10:00',
        label:'',
        start:10,
        end:12,
      },
       {
        time:'12:00',
        label:'',
        start:12,
        end:16,
      },
       {
        time:'16:00',
        label:'',
        start:16,
        end:20,
      },
       {
        time:'20:00',
        label:'',
        start:20,
        end:22,
      },
       {
        time:'22:00',
        label:'',
        start:22,
        end:24,
      },
    ]
  },
  onDialogShow(){
     console.log('onDialogShow:')
     this.setData({dialogShow:true})
  },
  onDialogClose(){
    this.setData({dialogShow:false})
  },
  selectPrivilege(event){
      var type = event.target.dataset.type;
      var index = event.target.dataset.index;
      this.setData({
        currentPrivilege: index,
        membershipPrivilegeList:this.data.cardData.membershipPrivileges[type],
      });
      
   },
   selectBrand(event){
      var type = event.target.dataset.type;
      var index = event.target.dataset.index;
      this.setData({
         currentBrand:index,
         globalBrandImg: this.data.cardData.globalBrand8[type]
      })		
  },
  selectSeckillTab(event){
      var time = event.target.dataset.time;
      var index = event.target.dataset.index;
      this.setData({
        currentSeckillIndex: index,
        seckillImg:this.data.cardData.seckillImgList[time],
      });
  },
  getCard(){
     my.navigateTo({
         url: '/pages/address/addressInfo/addressInfo'
     });
  },
  getTabClass(index) {
    console.log(this.data.currentPrivilege)
    if(this.data.currentPrivilege == index) {
      return 'active'
    }
    return ''
  },
  cumputedText(start,end,index,time){
			if(this.data.startTime < start){
				return '即将开始'
			}else if(this.data.startTime >= start && this.data.startTime < end){
          this.setData({
            currentSeckillIndex: index,
            seckillImg:this.data.cardData.seckillImgList[time],
          });
        console.log(this.data.currentSeckillIndex,this.data.seckillImg)
				return '正在疯抢'
			}else if(this.data.startTime >= end){
				return '已完成'
			}else{
				return ''
			}
  },
  initSeckillTime(){
    var currentTime = new Date();
    var time = currentTime.getTime()+6*(24*60*60*1000);
    this.setData({
       startTime:Number(new Date(currentTime).Format('hh')),
       deadLine:new Date(time).Format('MM月dd日')
    })
    this.data.seckillTimeTabList.forEach((element,index) => {
        element.label = this.cumputedText(element.start,element.end,index,element.time)
    })
    console.log('startTime',this.data.startTime)
  },
  getConstant(constant) {
      let param = {
        constantNames: ['serviceQQ', 'servicePhone'],
      };
      app.post('getConstantValues', param, res => {
         this.setData({
           servicePhone:res.resultData.servicePhone,
           serviceQQ:res.resultData.serviceQQ
         })
      })

    },
  toSeek(){
     my.navigateTo({
      url: '/pages/order/orderSeek/orderSeek'
     });
  },  
  showContactDialog(){
    this.setData({show:true})
  },
  onContactDialog(){
      this.setData({show:false})
  },
  onLoad() {
     this.getConstant();
     this.initSeckillTime();
     this.setData({
        currentPrivilege: 0,
        membershipPrivilegeList:this.data.cardData.membershipPrivileges['hotRecommend6'],
      });
      this.setData({
         currentBrand:0,
         globalBrandImg: this.data.cardData.globalBrand8['JX']
      })
    //  let  paramJson = {
    //    channelName:'test'
    //  }
    //  app.post('getLandPageByChannelName',paramJson,(res)=>{
        
    //  })
  },
});
