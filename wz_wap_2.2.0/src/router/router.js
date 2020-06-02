



const aboutUs = () => import('@/pages/aboutUs/aboutUs')//关于我们
const transition =()=> import('@/pages/transition/transition')//淘宝授权过渡
const toNativePage =()=> import('@/pages/transition/toNativePage')//唤起app原生页
const testPay = () => import('@/pages/pay/testPay') //测试支付
const iosPayment = () => import('@/pages/pay/iosPayment') //ios提交审核支付反馈页面
const leadUpdate = () => import('@/pages/leadPage/leadUpdate') //引导更新app
const leadActived = () => import('@/pages/leadPage/leadActived') //引导更新app
import vipCard from './modules/vipCard'
import address from './modules/address'
import order from './modules/order'
import agreement from './modules/agreement'
import games from './modules/games'
import goodsActive from './modules/goodsActive'
const routes = [
	...vipCard,
	...address,
	...order,
	...agreement,
	...games,
	...goodsActive,
	{
		path:'/',
		redirect: '/card/cardSimple',
	},
	{
		path:'/aboutUs',
		name:'关于我们',
		component:aboutUs
	},
	{
		path:'/transition',
		name:'淘宝授权过渡',
		component:transition
	},
	{
		path:'/pay/iosPayment',
		name:'ios支付反馈页面',
		component:iosPayment
	},
	{
		path:'/leadUpdate',
		name:'引导更新app',
		component:leadUpdate
	},
	{
		path:'/leadActived',
		name:'引导更新app',
		component:leadActived
	},
	{
		path:'/toNativePage',
		name:'唤起app原生页',
		component:toNativePage
	}

  
]

export default routes