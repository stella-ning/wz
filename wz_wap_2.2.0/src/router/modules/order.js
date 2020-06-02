const orderDetail = () => import('@/pages/order/orderDetail') //订单详情
const orderSeek = () => import('@/pages/order/orderSeek') //订单查询

export default [
    {
		path:'/order/orderDetail',
		name: '麒麟卡订单详情',
		component:orderDetail
	},
	{
		path:'/order/orderSeek',
		name: '麒麟卡订单查询',
		component:orderSeek
	},
]