// 用户列表
const userList = () => import('@/pages/user/userList')
// 会员卡管理
const membershipCardList = () => import('@/pages/user/membershipCardList')
// 用户返佣分组设置
const userRakeBackSettings = () => import('@/pages/user/userRakeBackSettings')
//用户反馈列表
const feedbackList = () => import('@/pages/user/feedbackList')
// 用户浏览&点击广告记录表
const userViewAdsList = () => import('@/pages/user/userViewAdsList')


export default [{
    path: '/user/userList',
    component: userList,
    name: '用户列表',
    code:'A1'
},{
    path: '/user/membershipCardList',
    component: membershipCardList,
    name: '会员卡管理',
},{
    path: '/user/userRakeBackSettings',
    component: userRakeBackSettings,
    name: '用户返佣分组设置',
},
{
    path: '/user/feedbackList',
    component: feedbackList,
    name: '用户反馈列表',
},{
    path: '/user/userViewAdsList',
    component: userViewAdsList,
    name: '用户浏览&点击广告记录表',
},
]