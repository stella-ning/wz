import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
};

const router = new VueRouter(RouterConfig)

//进入路由前拦截函数
router.beforeEach(async (to, from, next) => {
  //判断是否已登录和页面是否需要登录，否则跳转登录页
  let token = Vue.ls.get('token') || ''
  if(!token && to.meta.auth) {
    next({
      path:'/login',
      query: {
        from:to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
