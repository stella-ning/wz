const unrecordedAccountList = () => import('@/pages/account/unrecordedAccountList')
const recordedAccountList = () => import('@/pages/account/recordedAccountList')
const coinAccountList = () => import('@/pages/account/coinAccountList')
const userWithdrawCheckList = () => import('@/pages/account/userWithdrawCheckList')


export default [
{
    path: '/account/unrecordedAccountList',
    component: unrecordedAccountList,
    name: '【待入账】账户流水列表',
},{
    path: '/account/recordedAccountList',
    component: recordedAccountList,
    name: '【已入账，可提现】账户流水列表',
},{
    path: '/account/coinAccountList',
    component: coinAccountList,
    name: '【我的金币】账户流水列表',
},{
    path: '/account/userWithdrawCheckList',
    component: userWithdrawCheckList,
    name: '用户提现审核列表',
},]