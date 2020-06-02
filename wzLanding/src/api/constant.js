let VERSION_INFO = {
    platformDesc: 'wap', 
    platformType: '2', //1：cms 2：wap 3：ios 4：安卓
    versionCode: '1.1.0',
    projectName:'超惠省落地页',
}
let getWebClient = function() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid)return 'android';
    if (isiOS)return 'ios';
    return '';
}
//判断实际打开页面的设备类型
if(getWebClient() == 'android') {
    VERSION_INFO.platformDesc = 'android',
    VERSION_INFO.platformType = 4;
}
else if(getWebClient() == 'ios'){
    VERSION_INFO.platformDesc = 'ios',
    VERSION_INFO.platformType = 3;
}
else {
    VERSION_INFO.platformDesc = 'wap',
    VERSION_INFO.platformType = 2;
}

export default {
    VERSION_INFO
}

