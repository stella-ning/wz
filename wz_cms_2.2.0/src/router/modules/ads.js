const adsenseManageList = () => import('@/pages/ads/adsenseManageList') //广告位管理
const rewardManageList = () => import('@/pages/ads/rewardManageList') //奖励管理
const exitManageList = () => import('@/pages/ads/exitManageList') //出口位管理
const taskManageList = () => import('@/pages/ads/taskManageList') //任务挂历
const marketAuditList = () => import('@/pages/ads/marketAuditList') //开关管理
const adsContentSettings = () => import('@/pages/ads/adsContentSettings') //广告展示文案
const adsManageStatList = () => import('@/pages/ads/adsManageStatList') //广告统计报表
const userAdsStatList = () => import('@/pages/ads/userAdsStatList') //用户广告数据统计表


export default [
{
    path: '/ads/adsenseManageList',
    component: adsenseManageList,
    name: '广告位管理列表',
},
{
    path: '/ads/rewardManageList',
    component: rewardManageList,
    name: '奖励管理',
},
{
    path: '/ads/exitManageList',
    component: exitManageList,
    name: '出口位管理',
},
{
    path: '/ads/taskManageList',
    component: taskManageList,
    name: '任务管理',
},
{
    path: '/ads/marketAuditList',
    component: marketAuditList,
    name: '开关管理',
},
{
    path: '/ads/adsContentSettings',
    component: adsContentSettings,
    name: '广告常量配置',
},
{
    path: '/ads/adsManageStatList',
    component: adsManageStatList,
    name: '广告统计报表',
},
{
    path: '/ads/userAdsStatList',
    component: userAdsStatList,
    name: '用户广告数据统计表',
},
]