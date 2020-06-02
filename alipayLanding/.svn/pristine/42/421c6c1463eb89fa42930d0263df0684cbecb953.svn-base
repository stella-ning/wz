


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

let checkPhoneMob = function (phone) {
    return /^1[23456789]\d{9}$/.test(phone);
}
let isNull = function (str) {
    if (str === 0) {
        return false;
    }
    if (str == "" || str == null || str == 'undefined' || str == '&nbsp;')
        return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
};
 // 星号处理手机号
const noPassByPhone = function(str){
 if(null != str && str != undefined){
    var pat=/(\d{3})\d*(\d{4})/;
    return str.replace(pat,'$1****$2');
} else {
    return "";
}
}

module.exports = {
     checkPhoneMob,
     isNull,
     noPassByPhone
}