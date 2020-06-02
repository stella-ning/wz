const bannerSettings = () => import('@/pages/settings/bannerSettings')
const bannerSettingsX = () => import('@/pages/settings/bannerSettingsX')
const oneYuanBuySettings = () => import('@/pages/settings/oneYuanBuySettings')
const brandEntranceSettings = () => import('@/pages/settings/brandEntranceSettings')
const appDownloadSettings = () => import('@/pages/settings/appDownloadSettings')
const smsProviderSettings = () => import('@/pages/settings/smsProviderSettings')
const homeEntranceSettings = () => import('@/pages/settings/homeEntranceSettings')
const wzLandingApiLog = () => import('@/pages/settings/wzLandingApiLog')
const appUpdateSettings = () => import('@/pages/settings/appUpdateSettings')


export default [
{
    path: '/settings/bannerSettings',
    component: bannerSettings,
    name: 'banner设置',
},
{
    path: '/settings/bannerSettingsX',
    component: bannerSettingsX,
    name: 'banner设置扩展',
},
{
    path: '/settings/oneYuanBuySettings',
    component: oneYuanBuySettings,
    name: '1元钱抢购板块设置',
    meta: { keepAlive: true }
},{
    path: '/settings/brandEntranceSettings',
    component: brandEntranceSettings,
    name: '全球专属大牌入口设置',
    meta: { keepAlive: true }
},{
    path: '/settings/appDownloadSettings',
    component: appDownloadSettings,
    name: 'App下载地址设置',
    meta: { keepAlive: true }
},{
    path: '/settings/smsProviderSettings',
    component: smsProviderSettings,
    name: '短信提供商设置',
    meta: { keepAlive: true }
},
{
    path: '/settings/homeEntranceSettings',
    component: homeEntranceSettings,
    name: '首页入口设置',
    meta: { keepAlive: true }
},
{
    path: '/settings/wzLandingApiLog',
    component: wzLandingApiLog,
    name: '落地页api日志',
},
{
    path: '/settings/appUpdateSettings',
    component: appUpdateSettings,
    name: 'APP版本管理',
},
]