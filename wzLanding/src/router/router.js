



const aboutUs = () => import('@/pages/aboutUs/aboutUs')//关于我们
const transition =()=> import('@/pages/transition/transition')//淘宝授权过渡
const hqzfb = () => import('@/pages/transition/hqzfb') //测试支付
const test = () => import('@/pages/jyd/test/test') //测试支付

import vipCard from './modules/vipCard'
import address from './modules/address'
import order from './modules/order'
import agreement from './modules/agreement'
import appInfo from './modules/appInfo'
const routes = [
	{
		path:'/',
		name: '根页面',
		redirect: '/card/cardSimple',
	},
	...vipCard,
	...address,
	...order,
	...agreement,
	...appInfo,
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
		path:'/hqzfb',
		name:'唤起支付宝',
		component:hqzfb,
		mate:false,
	},
	{
		path:'/test',
		name:'测试',
		component:test,
		mate:false,
	},

  
]
routes.forEach(element => {
	element.name = 'LD_' + element.name
});
export default routes