import Vue from 'vue'
import permissionStore from './modules/permissionStore'
import homeStore from './modules/homeStore'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        permissionStore,
        homeStore
    },
   
})