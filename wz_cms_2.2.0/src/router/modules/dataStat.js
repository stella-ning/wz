
// 广告数据
const adsStatList = () => import('@/pages/dataStat/adsStatList')
// 产品部报表快速查询工具
const goodsReport = () => import('@/pages/dataStat/goodsReport')
//推广部报表快速查询工具
const marketingQuickSearch = () => import('@/pages/dataStat/marketingQuickSearch')
//权益报表
const rightsReport = () => import('@/pages/dataStat/rightsReport')

export default [{
    path: '/dataStat/adsStatList',
    component: adsStatList,
    name: '广告数据',
},
{
    path: '/dataStat/goodsReport',
    component: goodsReport,
    name: '产品部报表快速查询工具',
},
{
    path: '/dataStat/marketingQuickSearch',
    component: marketingQuickSearch,
    name: '推广部报表快速查询工具',
},
{
    path: '/dataStat/rightsReport',
    component: rightsReport,
    name: '会员权益部报表工具',
},
]