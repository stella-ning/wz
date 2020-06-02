var app = getApp();
var api = require('./api')
var constant = require('./constant')
const baseUrl = constant.hostUrl;

//token
var tokenKey = "token";

// 登录地址, 根据这个地址来设置token
var loginUrl = "/dayan/scf/user/user/login";

// 例外不用token的地址
var exceptionAddrArr = [
  '',//暂时是个例子
];

//剪头函数表达式得写法 (参数1, 参数2, …, 参数N) => { 函数声明 }
function loadJs(url, param, successFn, failFn) {
  this.http(url, 'loadJs', param, successFn, failFn)
}
function post(url, param, successFn, failFn) {
  this.http(url, 'post', param, successFn, failFn)
}

function http(url, method, param, successFn, failFn) {

  param = {data:JSON.stringify(param)}

  if(method == 'loadJs') {
     
  }
  else {
    url = baseUrl + '/' + api[url]
  }
  
  console.log('url:', url)

  // my.showLoading({
  //   title: '正在加载...'
  // });
  // 记录发起请求的当前时间
  let timeStart = Date.now();
  //设置header
  CreateHeader(url, function (header) {
    //发起请求
    my.request({
      url: url,
      data: param,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': '*/*'
      },
      method: method == 'loadJs' ? 'get' :method,
      //检测是否传参completeData，如果有则执行回调completeData(res)
      complete(res) {
        console.log(`耗时${Date.now() - timeStart}`, url);
       
        if (res.status === 200) {
          //登录接口成功后设置token
          // if (url === loginUrl) {
          //   //同步存储token和登录信息
          //   my.setStorageSync({
          //     key: tokenKey, // 缓存数据的key
          //     data: res.headers.token // 要缓存的数据
          //   });
          //   my.setStorageSync({
          //     key: 'loginInfo', // 缓存数据的key
          //     data: res.data.data // 要缓存的数据
          //   });
          // }
          if(method == 'loadJs') {
            if (successFn) {
                successFn(res.data)
              }
              return;
          }
          if (res.data.resultCode === 0) {//正常返回数据
            my.stopPullDownRefresh()
            if (successFn) {
              successFn(res.data)
            }
            //为了兼容部分andriod 异步请求是隐藏不掉弹框加得延时
            setTimeout(function () {
              my.hideLoading();
            }, 1000);
          } else {//其他服务端状态码
            app.showToast(res.data.resultMsg,'exception')
            //为了兼容部分andriod 异步请求是隐藏不掉弹框加得延时
            setTimeout(function () {
              my.hideLoading();
            }, 1000);
            if(failFn) {
               failFn(res.data)
            }
            my.stopPullDownRefresh()
          }
        } else {
          setTimeout(function () {
            my.hideLoading();
          }, 1000);
          if(failFn) {
            failFn(res)
          }
          my.stopPullDownRefresh()
        }
      }
    })
  });
}


/** 
 * @param url:String 请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */
function CreateHeader(url, complete) {
  var header = {
    'content-type': 'application/json'
  }
  if (exceptionAddrArr.indexOf(url) === -1) {  //排除请求的地址不需要token的地址
    my.getStorage({
      key: tokenKey,
      success: function (res) {
        header.token = res.data;
      },
      fail: function (error) {
        console.log(error);
      },
      complete: function () {
        complete && typeof complete === 'function' ? complete(header) : null;
      }
    });
  } else {
    complete && typeof complete === 'function' ? complete(header) : null;
  }
}

module.exports = {
  http,
  post,
  loadJs
}
