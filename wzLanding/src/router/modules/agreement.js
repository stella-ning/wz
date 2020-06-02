const huaweiMarket = () => import('@/pages/agreement/huaweiMarket')
const userAgreement = () => import('@/pages/agreement/userAgreement')//用户隐私协议
const serveAgreement = () => import('@/pages/agreement/serveAgreement')//服务协议
const activeRules = () => import('@/pages/agreement/activeRules')//活动规则
const rebateRules = () => import('@/pages/agreement/rebateRules')//返利规则
const privacyPolicy = () => import('@/pages/agreement/privacyPolicy') //隐私政策-ios专用
const ppIOSListing = () => import('@/pages/agreement/privacyPolicyForIOSListing') //ios上架隐私政策

export default [{
    path: '/agreement/huaweiMarket',
    name: '华为市场隐私协议',
    component: huaweiMarket
},
{
    path:'/agreement/userAgreement',
    name:'用户协议及隐私政策',
    component:userAgreement
},
{
    path:'/agreement/serveAgreement',
    name:'超惠省服务协议',
    component:serveAgreement
},
//activeRules
{
    path:'/agreement/activeRules',
    name:'0元购活动规则',
    component:activeRules
},
//rebateRules
{
    path:'/agreement/rebateRules',
    name:'更多返利规则',
    component:rebateRules
},
{
    path:'/agreement/privacyPolicyIos',
    name:'隐私政策',
    component:privacyPolicy
},
{
    path:'/agreement/ppIOSListing',
    name:'ios上架隐私政策',
    component:ppIOSListing,
},
]