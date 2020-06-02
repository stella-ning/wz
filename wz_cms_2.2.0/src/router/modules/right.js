// 香兰会员
const xianglanMemberList = () => import('@/pages/right/xianglanMemberList')
// 香兰财务管理
const xianglanOrderList = () => import('@/pages/right/xianglanOrderList')
// 权益入口设置
const rightEntranceSettings = () => import('@/pages/right/rightEntranceSettings')
// 烈熊权益订单记录
const liexiongOrderList = () => import('@/pages/right/liexiongOrderList')
// 烈熊权益退款记录
const liexiongRefundList = () => import('@/pages/right/liexiongRefundList')
// 会员入口点击记录
const liexiongStatList = () => import('@/pages/right/liexiongStatList')
// 会员权益产品
const memberRightsProductList = () => import('@/pages/right/memberRightsProductList')
//编辑直充产品
const memberRightsChargeEdit = () => import('@/pages/right/memberRightsChargeEdit')
//编辑卡密产品
const memberRightsCdkeyEdit = () => import('@/pages/right/memberRightsCdkeyEdit')
//卡密列表
const cdkeyList = () => import('@/pages/right/cdkeyList')
//会员权益订单（直充订单）
const memberRightsChargeOrderList = () => import('@/pages/right/memberRightsChargeOrderList')
//会员权益订单（卡密订单）
const memberRightsCdkeyOrderList = () => import('@/pages/right/memberRightsCdkeyOrderList')
//【会员权益品牌页】相关配置
const memberRightsBrandSettings = () => import('@/pages/right/memberRightsBrandSettings')


export default [
{
    path: '/right/xianglanMemberList',
    component: xianglanMemberList,
    name: '香兰会员',
},{
    path: '/right/xianglanOrderList',
    component: xianglanOrderList,
    name: '香兰财务管理',
},{
    path: '/right/rightEntranceSettings',
    component: rightEntranceSettings,
    name: '会员权益品牌列表',
},{
    path: '/right/liexiongOrderList',
    component: liexiongOrderList,
    name: '烈熊权益订单记录',
},{
    path: '/right/liexiongRefundList',
    component: liexiongRefundList,
    name: '烈熊权益退款记录',
},{
    path: '/right/liexiongStatList',
    component: liexiongStatList,
    name: '会员入口点击记录',
},
{
    path: '/right/memberRightsProductList',
    component: memberRightsProductList,
    name: '会员权益产品',
},
{
    path: '/right/memberRightsChargeEdit',
    component: memberRightsChargeEdit,
    name: '编辑直充产品',
},
{
    path: '/right/memberRightsCdkeyEdit',
    component: memberRightsCdkeyEdit,
    name: '编辑卡密产品',
},
{
    path: '/right/cdkeyList',
    component: cdkeyList,
    name: '卡密列表',
},
{
    path: '/right/memberRightsChargeOrderList',
    component: memberRightsChargeOrderList,
    name: '会员权益订单（直充订单）',
},
{
    path: '/right/memberRightsCdkeyOrderList',
    component: memberRightsCdkeyOrderList,
    name: '会员权益订单（卡密订单）',
},
{
    path: '/right/memberRightsBrandSettings',
    component: memberRightsBrandSettings,
    name: '【会员权益品牌页】相关配置',
},
]