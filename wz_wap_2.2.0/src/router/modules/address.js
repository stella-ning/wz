const addressInfo = () => import('@/pages/address/addressInfo') //收货地址
const editAddress = () => import('@/components/address/addressForm') //编辑收货地址
export default [
    {
		path: '/address/addressInfo',
		name: '收货地址填写',
		component: addressInfo
	},
	{
		path: '/address/editAddress',
		name: '编辑收货地址',
		component: editAddress
	},
]