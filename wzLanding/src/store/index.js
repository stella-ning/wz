import Vue from 'vue'
import Vuex from 'vuex'
// import { getByUserConditionByApp } from '@/api'

Vue.use(Vuex)

import goods from './modules/goods'

export default new Vuex.Store({
  state: {
    mainLoading:false,
    btnLoading:false,
    user:{
      phone:'',
      bankCardList:[],
      isLogin:false
    },
    orderSureTotalPrice:0,
    versionCode:''
  },
  mutations: {
    SET_BTN_LOADING(state,status) {
      state.btnLoading = status
    },
    SET_MAIN_LOADING(state,status) {
      state.mainLoading = status
    },
    SET_USER(state,data) {
      state.user = data
    },
    SET_ORDERSTP(state,data){
      state.orderSureTotalPrice = data;
    },
    SET_LANDPAGE(state,data){
      state.versionCode = data
    }
  },
  actions: {
    async callConstantValue(context,constantName) {
        return new Promise((resolve,reject)=>{
            var paramJson = {
                constantNames: constantName,
			}
			Vue.prototype.request.post(Vue.prototype.urls.getConstantValue,paramJson,false).then(res=>{
				console.log(res.resultData)
				resolve(res.resultData)
			})
            
          
      })
    },
    async getUser({ commit }) {
      // let token = Vue.ls.get('token') || ''
      // if(token) {
      //   let ret = await getByUserConditionByApp()
      //   let user = {
      //     phone:ret.data.userPhone,
      //     bankCardList:ret.data.mallBankCardList,
      //     isLogin:true
      //   }
      //   Vue.ls.set('phone',ret.data.userPhone)
      //   commit('SET_USER',user)
      //   console.log('用户信息',ret)
      // }
    },
  },
  modules: {
    goods
  }
})
