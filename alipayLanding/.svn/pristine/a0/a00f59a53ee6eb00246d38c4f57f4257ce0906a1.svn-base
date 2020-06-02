if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;


if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../components/vant-app/dist/transition/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/overlay/index?hash=133e033a22453da85c4dbb68b4bb63126bb0d43b');
require('../../components/vant-app/dist/popup/index?hash=604cbd0cdc7c5ba954a4d2f6725f07b363ad92ee');
require('../../components/vipCard/vipAgreement/vipAgreement?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/info/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/icon/index?hash=436a1c796b82498b8628b8e304b140a9d4710ae8');
require('../../components/vant-app/dist/loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/button/index?hash=d6dd9fe0845c2cc1c15fe7872905e38c4a9aa36c');
require('../../components/vant-app/dist/dialog/index?hash=f00a2066630cc21a67c6d07cd27011344cceef14');
require('../../components/contact/contact-dialog/contact-dialog?hash=c84b95473ae33dc8315c0f8bed6882ce36b97150');
require('../../components/custom/icon-input/icon-input?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/custom/icon-item/icon-item?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/picker-column/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/__antmove/component/custom-loading/custom-loading?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/picker/index?hash=ab6a8525ab89818e284dd5d1d4620dd0201a5b06');
require('../../components/vant-app/dist/area/index?hash=c53a73ff679fc0028769a049eeb90c155d17f4f1');
require('../../components/custom/text-cell/text-cell?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/vant-app/dist/cell/index?hash=cf42d5a19affcc83b584dedbcf4006f8b3ffcc03');
require('../../pages/index/index?hash=1de6b18eae99ceab7d402cdacad128fdbe8465b2');
require('../../pages/address/addressInfo/addressInfo?hash=d2aa42aaeca5a1adf91d98d1681d22d8447c3b23');
require('../../pages/card/buyCard/buyCard?hash=5158fa18297db3fbaac119609b168d20fcdf1eea');
require('../../pages/order/orderDetail/orderDetail?hash=817d1bc6abdfd7af877a446b212b5103aac373b2');
require('../../pages/order/orderState/orderState?hash=e4a5a9cbc27e1e65a57df9d73afbf20b481ddf62');
require('../../pages/test1/test1?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/test2/test2?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}