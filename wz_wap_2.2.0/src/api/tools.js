
import './axios'
import constant from'./constant'
const VERSION_INFO = constant.VERSION_INFO


//判断对象是否为空
global.isEmptyObject = function (obj) {
    var keyLength = Object.keys(obj);
    return keyLength.length;
}

global.showLoading = function (msg, spinnerType = 'snake') {
    Indicator.open({
        spinnerType: 'snake',
        text: msg
    });
}
global.closeLoading = function (msg, spinnerType = 'snake') {
    Indicator.close();
}


// 空字符判断
global.isNull = function (str) {
    if (str === 0) {
        return false;
    }
    if (str == "" || str == null || str == 'undefined' || str == '&nbsp;')
        return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
};

//十进制转换成汉字
global.changeToChinese = function(num){
    //先把十进制转成汉字，基础汉字范围19968-40869
    return String.fromCharCode(num)
}
//生成随机数
global.random = function (lower, upper) {
	return Math.floor(Math.random() * (upper - lower+1)) + lower;
}  
//打算数组顺序
global.sortChineseFn = function(arr){
   arr.sort(()=>{
       return (0.6-Math.random())
   })
   return arr;
}

//格式化日期
Date.prototype.Format = function (format) {
    format = format == null ? "yyyy-MM-dd hh:mm:ss" : format;
    if (this == 'Invalid Date' || this.getTime() < 1) {
        return "无";
    }
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    // $.each((o), function(k) {
    // 	if(new RegExp("(" + k + ")").test(format)) {
    // 		format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    // 	}
    // });
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
};
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}
String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
Date.prototype.getWeek = function (label) {
    if (label) {
        return label + "日一二三四五六".charAt(this.getDay());
    }
    return "星期" + "日一二三四五六".charAt(this.getDay());
};

//获取时间戳
global.getTimeStamp = function (time) {
    if (time == null) return '';
    return new Date(time).getTime();
}

//获取如 2018-01-01 00:00:00的时间戳
global.getTimeStampStart = function (time) {
    if (isNull(time)) return '';
    return new Date(new Date(time).toLocaleDateString()).getTime();
}
//获取如 2018-01-01 23:59:59的时间戳
global.getTimeStampEnd = function (time) {
    if (isNull(time)) return '';
    return new Date(new Date(new Date(time).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
}

global.riseNumberDot = function (_this, key, incomeNumber, targetNumber) {
    riseNumberEffect(_this, key, incomeNumber, targetNumber, true)
}

//数字增加的动效
global.riseNumberEffect = function (_this, key, incomeNumber, targetNumber, hasDot) {
    var timer = setInterval(function () {
        var step = Math.ceil(targetNumber / 100);
        if (isNull(incomeNumber) || isNaN(incomeNumber)) {
            incomeNumber = 0;
        }
        incomeNumber += step;
        _this.$set(_this.$data, key, incomeNumber);
        if (incomeNumber >= targetNumber) {
            if (hasDot) {
                _this.$set(_this.$data, key, NumberTool.toThousands(targetNumber));
            } else {
                _this.$set(_this.$data, key, targetNumber);
            }
            clearInterval(timer);
        }
    }, 20);
},
//数字增加的慢动效
global.riseNumberEffectSlow = function (_this, key, incomeNumber, targetNumber, hasDot) {

    var timer = setInterval(function () {
        var step = Math.ceil(targetNumber / 100);
        if (isNull(incomeNumber) || isNaN(incomeNumber)) {
            incomeNumber = 0;
        }
        incomeNumber += step;
        _this.$set(_this.$data, key, incomeNumber);
        if (incomeNumber >= targetNumber) {
            if (hasDot) {
                _this.$set(_this.$data, key, NumberTool.toThousands(targetNumber));
            } else {
                _this.$set(_this.$data, key, targetNumber);
            }
            clearInterval(timer);
        }
    }, 20);
},
//数字运算
global.NumberTool = {
    //每1000位加逗号
    toThousands: function (num) {
        var result = [],
            counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) { result.unshift(','); }
        }
        return result.join('');
    },
    //加
    floatAdd: function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },

    //减
    floatSub: function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },

    //乘
    floatMul: function (arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) { }
        try {
            m += s2.split(".")[1].length
        } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

    //除
    floatDiv: function (arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) { }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    //是否为正整数
    isPositiveInteger: function (s) {
        var re = /^[0-9]*[1-9][0-9]*$/;
        return re.test(s)
    }
};
//微信兼容代码
global.WxCompat = {
    // 解决微信document.title无效的问题
    wxSetTitle: function (title) {
        document.title = title;
        var mobile = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            //iframe.setAttribute('src', 'loading.png');
            var iframeCallback = function () {
                setTimeout(function () {
                    iframe.removeEventListener('load', iframeCallback);
                    document.body.removeChild(iframe);
                }, 0);
            };
            iframe.addEventListener('load', iframeCallback);
            document.body.appendChild(iframe);
        }
    },
    //判断软件来源
    isWeixinOrAlipay: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        //判断是不是微信
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return "WeiXIN";
        }
        //判断是不是支付宝
        if (ua.match(/AlipayClient/i) == 'alipayclient') {
            return "Alipay";
        }
        //哪个都不是
        return false;
    },
    //是否微信打开
    isWeixinClient: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        //判断是不是微信
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        }
        //哪个都不是
        return false;
    },
   
    //防止微信的回弹
    antiSroll(isAnti) {
        //弹出选择框的时候，防止微信上拉的回弹
        var handler = function (e) {
            if (isAnti) {
                e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
            }
        }
        document.body.addEventListener('touchmove', handler, { passive: false });
    }
};

//判断是用户端
global.getWebClient = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) return 'android';
    if (isiOS) return 'ios';
    return 'web';
}

global.isAndroidClient = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) return true;
    return false;
}
global.isIOSClient = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) return true;
    return false;
}

//存在hash的页面，用这个方法移除最后一个元素的'/'
global.getUrlArgs = function (key) {
    key = key || 'channel'
    var value = getQueryStringArgs()[key] || '';
    return value.replace('/', '');
}

//获得url字符串参数
global.getQueryStringArgs = function (url) {
    // 取得查询字符串并去掉开头的问号
    var qs = location.search.length > 0 ? location.search.substring(1) : "";
    if (!isNull(url)) {
        qs = url.substring(url.indexOf('?') + '?'.length);
    }
    var args = {};
    // 取得每一项
    var items = qs.length ? qs.split("&") : [];
    var item = null,
        name = null,
        value = null;
    // 逐个将每一项新增到args对象中
    for (var i = 0; i < items.length; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
//获取url参数
global.getUrlParam = function (paramName) {
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//检查是否电话号码
global.checkPhoneMob = function (phone) {
    return /^1[345678]\d{9}$/.test(phone);
}
//检查身份证号码
global.checkIdNumber = function (id) {
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(id);
}
//检查真实姓名
global.checkRealName = function (name) {
    return (/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/).test(name);
}

//判断访问终端
global.browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}



global.APPTool = {
    ANDRIOD: 'android',
    IOS: 'ios',
    isInApp() {
        const userAgent = navigator.userAgent;
        //判断是否是内嵌网页
        if (userAgent.indexOf('fychs') != -1) {
            return true;
        }
        return false;
    },
  
    //js 调用app的方法
    addJsCallback(_this, method, param, fn) {
        var device = getUrlArgs('device');
        //给android的回调
        if (getUrlArgs('device') == APPTool.ANDRIOD || (isNull(device) && isAndroidClient())) {
            console.log('addJsCallback: ' + method + '   param: ')
            console.log(JSON.stringify(param))
            try {
                var callback = Android[method](JSON.stringify(param));
                if (fn) {
                    fn(callback);
                }
            } catch (error) {
                console.log(error)
            }

        }
        //给ios的回调
        if (getUrlArgs('device') == APPTool.IOS || (isNull(device) && isIOSClient())) {
            console.log('addJsCallback: ' + method + '   param: ')
            console.log(param)
            try {
                var callback = _this.$bridge.callhandler(method, JSON.stringify(param), (data) => {
                    // 处理返回数据
                    if (fn) {
                        fn(data);
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
    //js 暴露方法给app调用
    registerHandler(_this, method, fn) {
        console.log('registerHandler: ' + method + '   param: ')
        //给android的回调
        if (getUrlArgs('device') == APPTool.ANDRIOD) {

            window[method] = function (data) {
                console.log(data)
                if (fn) {
                    fn(data)
                }
            }
        }
        //给ios的回调
        if (getUrlArgs('device') == APPTool.IOS) {
            this.$bridge.registerhandler(method, (data, responseCallback) => {
                console.log(data)
                responseCallback(data)
                if (fn) {
                    fn(data);
                }
            })
        }
    },
    URL_SCHEME:'fychs://www.fychs.com/openApp?hashPath=',
    //URL_SCHEME:'fychs://',
    // 在app中打开 
    openOrderDetailsInApp(id,sessionKey,isSimple) {
        if(getUrlArgs('device') == APPTool.ANDRIOD || isAndroidClient()) return;
        let hashPath ;
        
        if(isSimple){
            hashPath = `#/order/orderDetail?cardId=${id}&phone=${sessionKey}&isSimple=true&isOPenIos=true`;
        }else{
            hashPath = `#/order/orderDetail?userId=${id}&sessionKey=${sessionKey}`;
        }
        
        hashPath = encodeURIComponent(hashPath);
    
        var uri = APPTool.URL_SCHEME + hashPath;
        if (getUrlArgs('device') == APPTool.IOS ) {
            window.location.href = uri;
        }
    },
    //唤起app
    openOrDown(openUrl, downUrl){
        window.location.href = openUrl;
        let hasApp = true;
        setTimeout(function() {
          //没有安装APP则跳转至应用宝下载，延时时间设置为2秒
          if (!hasApp){
            window.location.href = downUrl;
          }
        }, 5000);
        let t1 = Date.now();
        setTimeout(function() {
          //t的时间就是出发APP启动的时间，若APP启动了，再次返回页面时t2这行代码执行，hasApp即为true。反之若APP没有启动即为false
          let t2 = Date.now();
          hasApp = !(!t1 || t2 - t1 < 4150);
        }, 1000);
      }
   
}
//获取用户姓名
global.getUserName = function (userInfo) {
    userInfo.wx = userInfo.wx || '{}'
    var wx = JSON.parse(userInfo.wx);
    var userName = '';
    if (!isNull(userInfo.name)) {
        userName = userInfo.name;
    } else if (!isNull(wx.nickname)) {
        userName = wx.nickname;
    } else if (!isNull(userInfo.phone)) {
        userName = userInfo.phone;
    }
    return userName;
}
//神策统计
global.STATS_SA = {
    init($vue) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        //设置通用属性
        var saConfig = {
            nnPlatformType: VERSION_INFO.platformType,
            nnPlatformDesc: VERSION_INFO.platformDesc,
            webVersionCode: VERSION_INFO.code,
            projectName: VERSION_INFO.projectName,
            channelName: getUrlArgs('channel'),
            appName: getUrlArgs('appName'),
            pageName: $vue.$route.name,
        };
        sa.registerPage(saConfig)
        // console.log('神策初始化 =>');
        // console.log(saConfig)
    },
    //统计点追踪
    track(method, eventName, param = {}) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        if (!isNull(eventName)) {
            param.eventName = eventName;
        }
        sa.track(method, param);
    },
    //统计点击事件
    trackClick(clickName, clickDesc, param = {}) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        if (!isNull(clickName)) {
            param.clickName = clickName;
            param.clickDesc = clickDesc;
        }
        sa.track('appViewClick', param);
    },
    // 统计访问页面事件
    trackPageView(pageViewName, pageDesc, param = {}) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        if (!isNull(pageViewName)) {
            param.pageViewName = pageViewName;
            param.pageDesc = pageDesc;
        }
        sa.track('appPageView', param);
    },
    //统计点击（适用于后续马上有跳转其他站点的操作）
    trackLinkClick(e, clickName, clickDesc, param = {}) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        if (!isNull(clickName)) {
            param.clickName = clickName;
            param.clickDesc = clickDesc;
        }
        sa.trackLink(e.target, 'appViewClick', param);
    },
    quick(method,params = {}) {
       
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        sa.quick(method,params);
    },
    //非a, button, input 事件的点击事件统计（vue专用）
    trackHeatMap(e) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        sa.quick('trackHeatMap', e.target);
    },
    //在追踪链接的点击、表单的提交等在当前窗口进行页面跳转的行为时，可能会出现数据发送不及时导致的数据丢失，
    //这个问题在移动网络下会更明显。现在我们对这个方法进行了封装，
    //可以用  sa.trackLink(link,event_name,event_prop) 方法跟踪链接：
    trackLink(e, method, eventName, param = {}) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }
        if (!isNull(eventName)) {
            param.eventName = eventName;
        }

        sa.trackLink(e.target, method, param);
    },
    //直接设置用户的属性，如果存在则覆盖
    setProfile(properties, fn) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        sa.setProfile(properties, fn);
    },
    //如果不存在则设置，存在就不设置
    setOnceProfile(properties, fn) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        sa.setOnceProfile(properties, fn);
    },
    //关联id
    login(userInfo) {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        sa.login(userInfo.userId);
        var properties = {
            userId: userInfo.userId,
            registerTime: new Date(userInfo.registerTime || 0).Format('yyyy-MM-dd hh:mm:ss'),
            lastLoginTime: new Date(userInfo.lastLoginTime || 0).Format('yyyy-MM-dd hh:mm:ss'),
            phone: userInfo.phone || '',
            registerChannel: userInfo.registerChannel || '',
            loginChannel: userInfo.loginChannel || '',
            realName: userInfo.realName || '',
        }
        sa.setProfile(properties);
    },
    logout() {
        if (isNull(sa)) {
            console.log('sa 为空');
            return;
        }

        sa.logout();
    }
}

global.STATS = {
    //添加统计事件
    addChannel: function (urlPath, pageName, channel = '') {
        // console.log('STATS.addChannel()')
        var lData = Utils.data.get();
        var paramJson = {};
        paramJson.phone = lData.phone;
        if (isNull(channel)) {
            paramJson.url = urlPath;
        } else {
            paramJson.url = urlPath + '-' + channel;
        }
        // sendPost(urls.addAccess, { data: JSON.stringify(paramJson)});

        STATS.addAccess(paramJson);
        if (!isNull(pageName)) {
            pageName = `${VERSION_INFO.platformDesc}${VERSION_INFO.code}(${pageName})`
            urlPath = pageName + urlPath;
        }
        if (!isNull(_hmt)) {
            var action = urlPath + '-' + channel;
            var label = 'channel:' + channel;
            _hmt.push(['_trackEvent', urlPath, action, label, '']);
            if (SHOW_STATS_LOG) {
                console.log('_trackEvent =>' + ' category =>' + urlPath + ', action =>' + action + ', label =>' + label);
            }
        }
    },
    //系统的统计事件
    addAccess: function (paramJson) {
        paramJson.webTime = new Date().getTime();
        //4：wap，5：iOS，6：android
        if (isAndroidClient()) {
            paramJson.platformType = 6;
        } else if (isIOSClient()) {
            paramJson.platformType = 5;
        } else {
            paramJson.platformType = 4;
        }
        paramJson.channelName = getUrlArgs('channel');
        sendPost(urls.addAccess, { data: JSON.stringify(paramJson) });
    },

}



global.UserManger = {
    reset() {
        Utils.data.remove('sesameCreditId');
    },
    logout() {
        Utils.data.set('fundDemand', '');
        Utils.data.set('phone', '');
        Utils.data.set('submitData', '');
        Utils.data.set('submitDataDebt', '');
        Utils.data.set('toProjectPage', '');
        Utils.data.set('creditId', '');
    },
    callAuthDetail(fn) {
        var params = {
            phone: Utils.data.get('phone'),
        };
        sendPost(urls.getAuthDetail, { data: JSON.stringify(params) }, (resultJson) => {
            if (fn) {
                fn(resultJson.resultData.userAuth || {});
                
                // fn(userAuth);
            }
        });
    },
}

//多个app的兼容
global.AppManager = {
    init() {

    },
    getAppInfo() {
        return {
            isDaidaile: this.isDaidaile(),
            isXynn: this.isXynn(),
            isSdjd: this.isSdjd(),
            isFkdx: this.isFkdx(),
            appName: this.getAppName(),
        }
    },
    getAppName() {
        if (this.isDaidaile()) {
            return GLOBAL_APPNAMES.daidaile;
        }
        else if (this.isXynn()) {
            return GLOBAL_APPNAMES.xinyongniuniu;
        }
        return '';
    },
    //是否贷贷乐
    isDaidaile() {
        var appName = getUrlArgs('appName');
        return appName.indexOf(GLOBAL_APPNAMES.daidaile) != -1;
    },
    //是否信用牛牛
    isXynn() {
        var appName = getUrlArgs('appName');
        return appName.indexOf(GLOBAL_APPNAMES.xinyongniuniu) != -1;
    },
    //是否闪电急贷，信用牛牛马甲包
    isSdjd() {
        var appName = getUrlArgs('appName');
        return appName.indexOf(GLOBAL_APPNAMES.sdjd) != -1;
    },
    //是否放款贷侠，贷贷乐马甲包
    isFkdx() {
        var appName = getUrlArgs('appName');
        return appName.indexOf(GLOBAL_APPNAMES.fkdx) != -1;
    }
}



