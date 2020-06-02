import Vue from 'vue'
import axios from 'axios'
import constant from './constant';
const VERSION_INFO = constant.VERSION_INFO;
// 正在进行中的请求列表
let reqList = []
/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
    const errorMsg = errorMessage || ''
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i] === url) {
            cancel(errorMsg)
            return
        }
    }
    reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i] === url) {
            reqList.splice(i, 1)
            break
        }
    }
}



//创建 axios 实例
let service = axios.create({
    // baseURL:baseUrl,
    timeout:60000,
})

//全局的 axios 默认值 `headers` 是即将被发送的自定义请求头
service.defaults.headers.common = {
    'X-Requested-With':'XMLHtmlRequest'
}

//请求拦截
service.interceptors.request.use((config) => {
    // let cancel
  	// // 设置cancelToken对象
    // config.cancelToken = new axios.CancelToken(function(c) {
    // 	cancel = c
    // })
    // // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
    // stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`)

    return config
},(error) => {
    // 请求错误处理
    return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use((response)=>{
    // 增加延迟，相同请求不得在短时间内重复发送
    // setTimeout(() => {
    //     allowRequest(reqList, response.config.url)
    // }, 1000)
    if(response.status != 200){
        //请求返回的状态!=200的情况
        Vue.prototype.$notify({
            message: response.data.message,
            background: '#ed4014',
            className:'notify-box'
        })
        Vue.prototype.$toast.clear()
        // return Promise.reject(response)
        return response.data
    }else{
        return response.data
    }
},(error)=>{
    // if (axios.isCancel(error)) {
    //     console.log(error.message);
    // } else {
    //     // 增加延迟，相同请求不得在短时间内重复发送
    //     setTimeout(() => {
    //         allowRequest(reqList, error.config.url)
    //     }, 1000)
    // }
    Vue.prototype.$toast.clear()
    return Promise.reject(error)
})

//封装请求方法
const request = {
    post(url,params={},loading=true,notify) {
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
        //params = Object.assign({},VERSION_INFO,params);
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
            console.log('error=>',error)
            if(error.resultMsg){
                Vue.prototype.$toast(error.resultMsg)
            }
            return Promise.reject(error)
        })
    }
}
export default {
    request
}

