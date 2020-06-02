const appDownload = () => import('@/pages/appInfo/appDownload') //App下载页
const wechatGuide = () => import('@/pages/appInfo/wechatGuide') //微信关注引导
const testSa1 = () => import('@/pages/appInfo/testSa1') 
const testSa2 = () => import('@/pages/appInfo/testSa2') 
export default [
    {
		path:'/appInfo/appDownload',
		name:'App下载页',
		component:appDownload
	},
    {
		path:'/appInfo/wechatGuide',
		name:'微信引导关注公众号',
		component:wechatGuide
	},
	{
		path:'/appInfo/testSa1',
		name:'神策测试页1',
		component:testSa1
	},
	{
		path:'/appInfo/testSa2',
		name:'神策测试页2',
		component:testSa2
	},
]