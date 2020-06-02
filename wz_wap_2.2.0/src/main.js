import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  './api/tools'
import store from './store'
import VueLocalStorage from 'vue-ls' //localstorage缓存插件
import 'vant/lib/index.css'
import '@/assets/style/index.css' //引入全局样式
import filter from '@/utils/filter'
import vuePrototype from '@/utils/vuePrototype'
//import $ from 'jquery'
import Bridge from '@/libs/ios/bridge'
import axiosFn from '@/api/axios'
import apiList from '@/api/urlList';

Vue.prototype.request = axiosFn.request;
Vue.prototype.$bridge = Bridge

// 注册全局函数（包括api）
Object.keys(apiList).forEach(key => {
  Vue.prototype[key] = apiList[key]
})

//设置前缀
Vue.use(VueLocalStorage, {
  namespace: 'wz_wap_'
})


Vue.config.productionTip = false

// 按需加载组件
import { Button,Switch,Popup,Field,Row,Col,Cell, CellGroup,
	Progress,Area,Icon,RadioGroup, Radio,Loading,Toast,CountDown,Image,Dialog,List,Lazyload} from 'vant';
Vue.use(Button)
   .use(Switch)
   .use(Popup)
   .use(Field)
   .use(Row)
   .use(Col)
   .use(Cell)
   .use(CellGroup)
   .use(Progress)
   .use(Area)
   .use(Icon)
   .use(RadioGroup)
   .use(Radio)
   .use(Loading)
   .use(Toast)
   .use(CountDown)
   .use(Image)
   .use(Dialog)
   .use(List)
   .use(Lazyload)
 
// 注册全局函数（包括api）
Object.keys(vuePrototype).forEach(key => {
  	Vue.prototype[key] = vuePrototype[key]
})

//注册全局过滤器
Object.keys(filter).forEach(key => {
  	Vue.filter(key, filter[key])
})


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
