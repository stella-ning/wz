import './api'; //请求接口
import axios from 'axios'
import router from '@/router/index.js'
import { Message, Loading } from 'element-ui'
import Vue from 'vue'
import CryptoJS from 'crypto-js'

const SUCCESS_STATUS_CODE = 0; //接口请求成功状态码
global.APIPWD = process.env.APIPWD;
global.ISTEST = process.env.ISTEST;


global.sendUpload = function (url, data, fn, errorFn, beforeSendFn, onUploadProgressFn) {
    var tempData = JSON.parse(data.data = data.data || '{}');
    setPostSessionKey(tempData);
    data.data = JSON.stringify(tempData);
    var file = data.file;
    var formdata = new FormData(); // 创建form对象  
    formdata.append('file', file); // 通过append向form对象添加数据,可以通过append继续添加数据  
    formdata.append('data', data.data);
    axios({ // 用axios发送post请求
        method: 'post',
        url: url, // 请求地址
        data: formdata, // 参数
        //     transformRequest: [function (data) {
        //       /* 做任何你想要的数据转换*/
        //       data = 'data=' + data.data + '';
        //       return data;
        //   }],
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': '*/*'
        },
        onUploadProgress: (progressEvent) => {
            console.log('loaded:' + progressEvent.loaded, ' total:' + progressEvent.total)
            if (onUploadProgressFn) {
                onUploadProgressFn(progressEvent)
            }
        },
    })
        .then((response) => { // 处理返回的文件流
            var resultJson = response.data;
            console.log(resultJson.resultCode);
            if (resultJson.resultCode == SUCCESS_STATUS_CODE) {
                fn(resultJson);
            } else {
                errorToast(resultJson.resultMsg);
                if (errorFn) {
                    errorFn(resultJson);
                }
            }
        })
}

// 判断是否数组
global.isArray = function (o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

global.sendDownLoad = function (url, data, fn, errorFn, beforeSendFn) {
    var myLoading = Vue.prototype.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.65)',
        // spinner: ' el-icon-loading'
    });
    var tempData = JSON.parse(data.data = data.data || '{}');

    for (const key in tempData) {
        // 时间字符串自动进行格式化 
        if (key.includes('TimeStart') || key.includes('TimeEnd') || key.includes('timeStart') || key.includes('timeEnd')) {
            if (!isNumber(tempData[key])) {
                tempData[key] = getTimeStamp(tempData[key]);
            }
        }
    }
    setPostSessionKey(tempData);
    data.data = JSON.stringify(tempData);
    axios({ // 用axios发送post请求
        method: 'post',
        url: url, // 请求地址
        data: data, // 参数
        transformRequest: [function (data) {
            /* 做任何你想要的数据转换*/
            data = 'data=' + data.data + '';
            return data;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        },
        responseType: 'blob' // 表明返回服务器返回的数据类型
    })
        .then((res) => { // 处理返回的文件流
            const content = res.data
            let disposition = res.headers['content-disposition'];
            disposition = disposition.replace("attachment; ", "");
            disposition = disposition.replace('filename="', "");
            disposition = disposition.replace('"', "");
            disposition = decodeURI(disposition);
            console.log(res);
            console.log(disposition);
            const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=UTF-8;' })
            const fileName = disposition;
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
            myLoading.close();
            fn();
        })
}

global.sendPostEC = function (url, data, fn, errorFn, beforeSendFn) {
    data.needEncodeUri = true;
    sendPost(url, data, fn, errorFn, beforeSendFn);
}

global.sendGet = function (url, data, fn, errorFn, beforeSendFn) {
    data.method = 'get';
    sendPost(url, data, fn, errorFn, beforeSendFn);
}

// 发起网络请求
global.sendPost = function (url, data, fn, errorFn, beforeSendFn) {
    // 加载框
    var tempData = JSON.parse(data.data = data.data || '{}');
    // if (tempData.sortField == null) {
    //     tempData.sortField = defaultSortField;
    // }

    if (url.indexOf('login') == -1) {
        setPostSessionKey(tempData);
    }

    for (const key in tempData) {
        //  特殊字符串格式化 
        switch (typeof (tempData[key])) {
            case 'string':
                if (tempData[key].includes('&') || tempData[key].includes('#') || tempData[key].includes('%')) {
                    tempData[key] = encodeURIComponent(decodeURIComponent(tempData[key]))
                }
                break;
            case 'object':
                if (isArray(tempData[key])) {
                    tempData[key].forEach(iItem => {
                        for (const jKey in iItem) {
                            if (typeof (iItem[jKey]) != 'string') continue;
                            if (iItem[jKey].includes('&') || iItem[jKey].includes('#') || iItem[jKey].includes('%')) {
                                iItem[jKey] = encodeURIComponent(decodeURIComponent(iItem[jKey]));
                            }
                        }
                    });
                }
                break;
            default:
                break;
        }
        // 时间字符串自动进行格式化 
        if (key.includes('TimeStart') || key.includes('TimeEnd') || key.includes('timeStart') || key.includes('timeEnd')) {
            if (!isNumber(tempData[key])) {
                tempData[key] = getTimeStamp(tempData[key]);
            }
        }
    }

    if (data.needEncodeUri) {
        for (const key in tempData) {
            if (tempData.hasOwnProperty(key) && typeof tempData[key] == 'string') {
                let pattern = /[^]*(&|%)[^]*/g
                if (pattern.test(tempData[key])) {
                    tempData[key] = `${tempData[key].replace(/\"/g, `\'`)}`
                    tempData[key] = encodeURIComponent(tempData[key])
                }
            }
        }
    }

    data.data = JSON.stringify(tempData);

    let loading;
    if (!data.noloading) {
        loading = Vue.prototype.$loading({
            lock: true,
            text: 'Loading',
            background: 'rgba(255, 255, 255, 0.65)',
            // spinner: ' el-icon-loading'
        });
    }

    axios({
        method: data.method || 'post',
        url: url,
        data: `data=${data.data}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    }).then((response) => {
        // 关闭加载框
        if (!data.noloading && loading) {
            loading.close();
        }
        // console.log(response + "请求成功");
        var resultJson = response.data;
        console.log(resultJson.resultCode);
        if (resultJson.resultCode == SUCCESS_STATUS_CODE) {
            fn(resultJson);
        } else {
            if (errorFn) {
                errorFn(resultJson);
            }
            switch (resultJson.resultCode) {
                case -3:
                case -4:
                    Message.error({
                        message: resultJson.resultMsg,
                        duration: '1000',
                        onClose: function () {
                            //CookieManager.clearWhileLogout();
                            router.push({ path: '/login' });
                        }
                    });
                    break;
                default:
                    Message.warning({
                        message: resultJson.resultMsg,
                        duration: '1000',
                    });
                    break;
            }
        }
    })
        .catch((error) => {
            Message.error('未知异常')
            if (!data.noloading && loading) {
                loading.close();
            }
            console.log(error);
        })
};

//发起无转圈的请求
global.sendNoLoadingPost = function (url, data, fn, errorFn, beforeSendFnparams) {
    data.noloading = true;
    global.sendPost(url, data, fn, errorFn, beforeSendFnparams);
}

//设置请求参数中的userId与sessionKey
global.setPostSessionKey = function (data) {
    data = data || {};
    data.userId = isNull(getQueryStringArgs().userId) ? CookieManager.getCookie(CookieManager.userId) : getQueryStringArgs().userId;
    data.sessionKey = isNull(getQueryStringArgs().sessionKey) ? CookieManager.getCookie(CookieManager.sessionKey) : getQueryStringArgs().sessionKey;
    // if(isNull(data.platformType)) {
    //     data.platformType = 1 ;//cms
    // }

}

//获取查询字符串参数
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
};
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

global.isTimeNull = function (time) {
    return isNull(time) || time <= 0 || isNaN(time);
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

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @returns {String}
 */
Date.prototype.getWeek = function () {
    return "星期" + "日一二三四五六".charAt(this.getDay());
};
//去除左右空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

global.floatChu100 = function (num) {
    if (isNull(num)) {
        return ''
    }
    return NumberTool.floatDiv(num, 100);
}
global.floatCheng100 = function (num) {
    if (isNull(num)) {
        return ''
    }
    return NumberTool.floatMul(num, 100);
}

//数字运算
global.NumberTool = {
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

//浏览器判断工具
global.AgentTool = {
    //是否微信打开
    isWeixinClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    },
    //是否手机打开
    isOnPhone() {
        var isOnPhone = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
        return isOnPhone;
    }
}

//json操作工具
global.JSONTool = {
    //合并两个json对象
    merageObj(jsonbject1, jsonbject2) {
        var resultJsonObject = {};
        for (var attr in jsonbject1) {
            resultJsonObject[attr] = jsonbject1[attr];
        }
        for (var attr in jsonbject2) {
            resultJsonObject[attr] = jsonbject2[attr];
        }
        return resultJsonObject;
    },
    merageArray(src, override) {
        var des = [];
        if (src instanceof Array) {
            for (var i = 0, len = src.length; i < len; i++)
                extend(des, src[i], override);
        }
        for (var i in src) {
            if (override || !(i in des)) {
                des[i] = src[i];
            }
        }
        return des;
    }
}


// 消息弹出框
global.warningToast = function (news, fn) {
    Message.warning({
        message: news,
        duration: '1000',
        center: true,
        onClose: function () {
            if (fn) {
                fn();
            }
            // router.push({ path: '/' });
        }
    });
};
global.errorToast = function (news, fn) {
    Message.error({
        message: news,
        duration: '1000',
        center: true,
        onClose: function () {
            if (fn) {
                fn();
            }
            // router.push({ path: '/' });
        }
    });
};
global.successToast = function (news, fn) {
    Message.success({
        message: news,
        duration: '1000',
        center: true,
        onClose: function () {
            if (fn) {
                fn();
            }
            // router.push({ path: '/' });
        }
    });
};

//获取时间戳
global.getTimeStamp = function (time) {
    if (time == null || time == '') return '';
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
//判断是否为数字
global.isNumber = function (val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}
global.CookieManager = {
    phone: projectName + secondLevelOne + "phone",
    userName: projectName + secondLevelOne + "userName",
    userId: projectName + secondLevelOne + "userId",
    sessionKey: projectName + secondLevelOne + "sessionKey",
    loginUserName: 'loginUserName',
    rememberUserName: 'rememberUserName',
    //设置cookies
    setCookie: function (name, value) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    },
    //读取cookies
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    },
    //删除cookies
    delCookie: function (name) {
        var _this = this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = _this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";

    },
    //退出登录清理参数
    clearWhileLogout: function () {
        var _this = this;
        _this.delCookie(CookieManager.userId);
        _this.delCookie(CookieManager.sessionKey);
        localStorage[CookieManager.sessionUserKey] = '';
        console.log(localStorage[CookieManager.sessionUserKey])
    },
    //登录保存参数
    saveWhileLogin: function (paramsJson) {
        var _this = this;
        for (var key in paramsJson) {
            var item = paramsJson[key];
            _this.setCookie(key, item);
        }
    }
};

//设置localStorage
global.storageManager = {
    setStorage: function (name, val) {
        sessionStorage.setItem(name, JSON.stringify(val));
    },
    getStorage: function (name) {
        var jsonStr = JSON.parse(sessionStorage.getItem(name));
        return (jsonStr);
    }
}

global.UserManager = {
    getAdminInfoDetail(fn) {
        sendPost(urls.getAdminInfoDetail, { data: JSON.stringify({}) }, (resultJson) => {
            if (fn) {
                fn(resultJson.resultData)
            }
        });
    }
}

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
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


// 转为unicode 编码  
global.encodeUnicode = function (str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

// 解码  
global.decodeUnicode = function (str) {
    str = str.replace(/\\/g, "%");
    //转换中文
    str = unescape(str);
    //将其他受影响的转换回原来
    str = str.replace(/%/g, "\\");
    //对网址的链接进行处理
    str = str.replace(/\\/g, "");
    return str;
}
//将小数转换成百分数
global.toPercent = function (point) {
    if (point == 0) {
        return 0;
    }
    var str = Number(point * 100).toFixed(2);
    if (isNaN(str)) {
        return ''
    }
    str += "%";
    return str;
},
    global.TABLE_MERAGE = {
        initMerageIndex(tableData, merageObject) {
            //给数据源排序（总数据）
            tableData.forEach((element, index) => {
                element.listIndex = index;
                for (const key in merageObject) {
                    if (merageObject.hasOwnProperty(key)) {
                        const jElement = merageObject[key];
                        jElement[index] = { rowspan: 0, colspan: 0 }
                    }
                }
            });
        },
        getMerageCellData(incomeList, merageCellData, columnKey, fn) {

            var columnoneSet = {};
            incomeList.forEach((element, index) => {
                var keyone = element[columnKey];
                columnoneSet[keyone] = columnoneSet[keyone] || [];
                columnoneSet[keyone].push(element);
            });

            for (const key in columnoneSet) {
                const list = columnoneSet[key];
                var minIndex = 0;
                var maxIndex = 0;
                list.forEach((element, index) => {
                    if (index == 0) {
                        minIndex = element.listIndex;
                        maxIndex = element.listIndex;
                    }
                    minIndex = Math.min(minIndex, element.listIndex);
                    maxIndex = Math.max(maxIndex, element.listIndex);
                });

                merageCellData[minIndex] = {
                    rowspan: maxIndex - minIndex + 1,
                    colspan: 1
                }
                if (!fn) {
                    console.log('', `${minIndex} - ${maxIndex}【${maxIndex - minIndex + 1}】`);
                    //  console.log('merageCellData[minIndex]',merageCellData[minIndex]);
                }
                if (fn) {
                    fn(list);
                }
            }
            if (!fn) {
                console.log('merageCellData', merageCellData);
            }
        },
    }

global.getEditorContent = function ($editor) {
    let content = $editor.content;
    //去掉编辑器自动追加的标签
    var reg = /<p><br\/><\/p>$/gi;
    content = content.replace(reg, "");
    console.log('content：', content);
    content = `${content.replace(/\"/g, `\'`)}`
    content = `${content.replace(/\\/g, '\\\\')}`
    return encodeURIComponent(content);
}

global.CrypTool = {
    PASSWORD: 'JpJHEKYD',
    //DES加密 Pkcs7填充方式
    encryptByDES(message, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    //DES解密
    decryptByDES(ciphertext, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        // direct decrypt ciphertext
        const decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

//获取字符（包括汉字）的长度
global.getByteLength= function(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
}