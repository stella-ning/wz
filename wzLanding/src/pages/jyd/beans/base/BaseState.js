export  default class BaseState  {
    constructor(channelName,pageName,className) { 
       this.channelName = channelName;
       this.className = className;
       this.pageName = pageName;
    }

    initSuccess(){
       console.log(`${this.className} => init`)
    }

    addStateSuccess(type,msg=''){
        console.log(`${this.className} => 统计成功   统计事件: ${type}`)
        if(!isNull(msg)) {
            console.log(msg)
        }
    }

    loadJs(url, callback,config = {}) {
        this.removeJs(url)
        console.log('BaseState => loadJs')
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.id = config.id;
        if (typeof (callback) != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            }
            else {
                script.onload = function () {
                    callback();
                }
            }
        }
        script.src = url;
        document.body.appendChild(script);
    }
    loadJsHead(url, callback,config = {}) {
        this.removeJs(url)
        console.log('BaseState => loadJs')
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.id = config.id;
        if (typeof (callback) != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            }
            else {
                script.onload = function () {
                    callback();
                }
            }
        }
        script.src = url;
        script.defer="defer";
        document.head.appendChild(script);
    }
    removeJs(src) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
    }
    
}