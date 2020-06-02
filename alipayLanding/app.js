
let tools = require('./utils/tools') 
let constant = require('./utils/constant')
App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData:{
    channelName:'alipayLanding'
  },
  
  post(url, param, successFn, failFn){
     const request = require('./utils/request')
     request.post(url, param, successFn, failFn)
  },
  loadJs(url, param, successFn, failFn){
    const request = require('./utils/request')
    request.loadJs(url, param, successFn, failFn)
  },
  showToast(content,type="none"){
     my.showToast({
      type: type, //success,fail,exception,none
      content: content,
      duration: 2000,
      success: () => {

      },
    });
  },
  setItem(key,data){
    my.setStorageSync({
        key: key, // 缓存数据的key
        data: data // 要缓存的数据
    });
  },
  getItem(key){
     return  (my.getStorageSync({ key: key })).data;
  }
});
