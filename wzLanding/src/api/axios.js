import Vue from 'vue'
import axios from 'axios'
import constant from './constant';
const VERSION_INFO = constant.VERSION_INFO;

//创建 axios 实例
axios.defaults.timeout = 5000
let service = axios.create({
    timeout:60000,
})


//全局的 axios 默认值 `headers` 是即将被发送的自定义请求头
service.defaults.headers.common = {
    'X-Requested-With':'XMLHtmlRequest'
}




//请求拦截
service.interceptors.request.use((config) => {
    // 请求发送前进行处理
    let token;
    if(token){
        config.headers.common['Authorization'] = token
    }
    return config
},(error) => {
    // 请求错误处理
    return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use((response)=>{
    if(response.status != 200){
        //请求返回的状态!=200的情况
        Vue.prototype.$notify({
            message: response.data.message,
            background: '#ed4014',
            className:'notify-box'
        })
        Vue.prototype.$toast.clear()
        return response.data
    }else{
        return response.data
    }
},(error)=>{
    Vue.prototype.$toast.clear()
    return Promise.reject(error);
  
})

// //请求失败时，所有需要重新发送的url列表
// let retryUrlList = [
//     '/fy/access/addAccess',
// ];
// service.defaults.retry = 5; //重试次数
// service.defaults.retryDelay = 8000; //重试延时
// service.defaults.shouldRetry = (error) => true; //重试条件，默认只要是错误都需要重试
// service.interceptors.response.use(undefined, (err) => {
//     console.log(err.config)
//     var config = err.config;
//     config.shouldRetry = true
//     console.log('config.shouldRetry(err):')
//     console.log(config.shouldRetry(err))
//     // 判断是否配置了重试
//     if (!config || !config.retry) return Promise.reject(err);

//     if (!config.shouldRetry || typeof config.shouldRetry != 'function') {
//         return Promise.reject(err);
//     }
//     //判断是否满足重试条件
//     if (!config.shouldRetry(err)) {
//         return Promise.reject(err);
//     }
//     var retryItem = retryUrlList.find((element) => {
//             return config.url == element;
//         })
//         //需要进行重试的链接
//     if (isNull(retryItem)) {
//         return Promise.reject(err);
//     }
//     // 设置重置次数，默认为0
//     config.__retryCount = config.__retryCount || 0;
//     // 判断是否超过了重试次数
//     if (config.__retryCount >= config.retry) {
//         return Promise.reject(err);
//     }
//     //重试次数自增
//     config.__retryCount += 1;
//     //延时处理
//     var backoff = new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve();
//         }, config.retryDelay || 1);
//     });
//     //重新发起axios请求
//     return backoff.then(function() {
//         // console.log('config')
//         // console.log(config.data)
//         config.data = config.data.replace('}', ',"isRetry":1}');
//         return axios(config);
//     });
// });

//封装请求方法
const request = {
    post(url,params={},loading=true) {
        let config = {
            method:'post',
            loading:loading,
        }
       return request.callData(url,params,config)
    },
    get(url,params={},loading=true){
        let config = {
            method:'get',
            loading:loading,
        }
        return request.callData(url,params,config)
    },

    callData(url,params={},config){
        
        params = Object.assign({},VERSION_INFO,params);
        let loading = config.loading;
        if(loading){
            Vue.prototype.$toast.loading({
                duration:100000,
                message: '请求中...',
                forbidClick: true,
            })
        }
        let data = config.method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
        params = config.method.toLocaleLowerCase() === 'get'? params : JSON.stringify(params);
        return service({
            method: config.method,
            url,
            [data]:params,
            transformRequest: [function (params) {
                /* 做任何你想要的数据转换*/
                if (!String(data).startWith('data=')) {
                    params = 'data=' + params + '';
                }
                return params;
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
            }
        }).then((response)=>{
            if(loading){
                Vue.prototype.$toast.clear();
            }
            if(response.resultCode == 0){
                return Promise.resolve(response)
            }else{
                return Promise.reject(response)
            }
            
        }).catch((error)=>{
            if (loading) {
                Vue.prototype.$toast.clear();
            }
            if(error.resultMsg && error.resultCode != 17){
                Vue.prototype.$toast(error.resultMsg)
            }
            return Promise.reject(error)
        })
    }
}
global.request = request;
export default {
    request
}

