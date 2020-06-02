// 商品列表
const goodsList = () => import('@/pages/goods/goodsList')
// 商品详情
const goodsDetails = () => import('@/pages/goods/goodsDetails')
//搜索类目管理
const goodsCategorySearchSettings = () => import('@/pages/goods/goodsCategorySearchSettings')


export default [{
    path: '/goods/goodsList',
    component: goodsList,
    name: '商品列表',
    meta: { keepAlive: true }
},
{
    path: '/goods/goodsDetails',
    component: goodsDetails,
    name: '商品详情',
},
{
    path: '/goods/goodsCategorySearchSettings',
    component: goodsCategorySearchSettings,
    name: '搜索类目管理',
},
]