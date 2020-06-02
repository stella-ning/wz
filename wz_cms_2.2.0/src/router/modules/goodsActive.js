const goodsActiveMannage = ()=> import('@/pages/goodsActive/goodsActiveMannage')
const goodsActiveEntrance = ()=> import('@/pages/goodsActive/goodsActiveEntrance')
const goodsActiveCreate = ()=> import('@/pages/goodsActive/goodsActiveCreate')
const goodsResource = ()=> import('@/pages/goodsActive/goodsResource')
export default [
    {
        path: '/goodsActive/goodsActiveMannage',
        component: goodsActiveMannage,
        name: '商品活动管理',
    },
    {
        path: '/goodsActive/goodsActiveEntrance',
        component: goodsActiveEntrance,
        name: '商品活动入口管理',
    },
    {
        path:'/goodsActive/goodsActiveCreate',
        component:goodsActiveCreate,
        name:'新建商品活动'
    },
    {
        path:'/goodsActive/goodsResource',
        component:goodsResource,
        name:'分组商品来源'
    }
]