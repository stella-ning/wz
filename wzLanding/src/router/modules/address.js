const addressInfo = () => import('@/pages/address/addressInfo') //收货地址
const addressInfo9 = () => import('@/pages/jyd/entrance/v9/addressInfo9') //收货地址
const editAddress = () => import('@/components/address/addressForm') //编辑收货地址
const addressInfoNew = () => import('@/pages/address/addressInfoNew') //版8-9收货地址
const addressInfo10 = () => import('@/pages/jyd/entrance/v10/addressInfo10') //版10收货地址
const addressInfo11 = () => import('@/pages/jyd/entrance/v11/addressInfo11') //版11收货地址
const addressInfo12 = () => import('@/pages/jyd/entrance/v12/addressInfo12') //版12收货地址
export default [
   {
		path: '/address/addressInfo',
		name: '收货地址填写',
		component: addressInfo,
		meta:false
	},
   {
		path: '/address/addressInfo9',
		name: '收货地址填写v9',
		component: addressInfo9,
		meta:false
	},
	{
		path: '/address/editAddress',
		name: '编辑收货地址',
		component: editAddress
	},
	{
		path: '/address/addressInfoNew',
		name: '新版收货地址new',
		component: addressInfoNew
	},
	{
		path: '/address/addressInfo10',
		name: '收货地址v10',
		component: addressInfo10
	},
	{
		path: '/address/addressInfo11',
		name: '收货地址v11',
		component: addressInfo11
	},
	{
		path: '/address/addressInfo12',
		name: '收货地址v12',
		component: addressInfo12
	},
]