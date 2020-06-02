// 会员卡订单管理
const membershipOrderList = () => import('@/pages/order/membershipOrderList')
// 会员卡订单详情
const membershipOrderDetails = () => import('@/pages/order/membershipOrderDetails')
const test = () => import('@/pages/order/test')


export default [{
    path: '/order/membershipOrderList',
    component: membershipOrderList,
    name: '会员卡订单列表',
    code:'A1',
    meta: { keepAlive: true }
},{
    path: '/order/membershipOrderDetails',
    component: membershipOrderDetails,
    name: '会员卡订单详情',
    code:'A1'
},
{
    path: '/order/test',
    component: test,
    name: '测试',
},
]