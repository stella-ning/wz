// 渠道商管理
const distributorSettings = () => import('@/pages/distributor/distributorSettings')
// 数据展示
const channelDataDisplay = () => import('@/pages/distributor/channelDataDisplay')
// 落地页多版本配置
const landingPageSettings = () => import('@/pages/distributor/landingPageSettings')


export default [
{
    path: '/distributor/distributorSettings',
    component: distributorSettings,
    name: '渠道商管理',
},{
    path: '/distributor/channelDataDisplay',
    component: channelDataDisplay,
    name: '数据展示',
},{
    path: '/distributor/landingPageSettings',
    component: landingPageSettings,
    name: '落地页多版本配置',
},]