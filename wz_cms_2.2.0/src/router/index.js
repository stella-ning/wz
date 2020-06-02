import Vue from 'vue'
import Router from 'vue-router'

import user from './modules/user'
import goods from './modules/goods'
import order from './modules/order'
import account from './modules/account'
import settings from './modules/settings'
import dataStat from './modules/dataStat'
import distributor from './modules/distributor'
import right from './modules/right'
import ads from './modules/ads'
import messagePush from './modules/messagePush'
import goodsActive from './modules/goodsActive'
import miniApp from './modules/miniApp'

const login = () => import('@/pages/login/login')
const home = () => import('@/pages/home/home')
Vue.use(Router)

export default new Router({
    //mode: 'history',

    routes: [
        {
            path: '/',
            redirect: '/user/userList',
        },
    
        {
            path: '/login',
            component: login,
            name: 'login',
        },
        {
            path: '/',
            component: home,
            name: 'home',
            children: [
               ...user,
               ...goods,
               ...order,
               ...account,
               ...settings,
               ...dataStat,
               ...distributor,
               ...right,
               ...ads,
               ...messagePush,
               ...goodsActive,
               ...miniApp
            ]
        }

    ]
})