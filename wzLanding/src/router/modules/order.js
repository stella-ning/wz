const orderDetail = () => import('@/pages/order/orderDetail') //订单详情
const orderSeek = () => import('@/pages/order/orderSeek') //订单查询
const orderDetailNew = () => import('@/pages/order/orderDetailNew')//新版订单详情
const orderDetail10 = () => import('@/pages/jyd/entrance/v10/orderDetail10')//新版订单详情
const orderDetail12 = () => import('@/pages/jyd/entrance/v12/orderDetail12')//新版订单详情
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
	{
		path:'/order/orderDetailNew',
		name: '麒麟卡订单查询new',
		component:orderDetailNew
	},
	{
		path:'/order/orderDetail10',
		name: '麒麟卡订单详情10',
		component:orderDetail10
	},
	{
		path:'/order/orderDetail12',
		name: '麒麟卡订单详情12',
		component:orderDetail12
	},
]