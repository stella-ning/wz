
const userAgreement = () => import('@/pages/agreement/userAgreement')//用户隐私协议
const serveAgreement = () => import('@/pages/agreement/serveAgreement')//服务协议
const activeRules = () => import('@/pages/agreement/activeRules')//活动规则
const rebateRules = () => import('@/pages/agreement/rebateRules')//返利规则

export default[
  {
		path:'/agreement/userAgreement',
		name:'用户协议及隐私政策',
		component:userAgreement
	},
	{
		path:'/agreement/serveAgreement',
		name:'超惠省服务协议',
		component:serveAgreement
	},
	//activeRules
	{
		path:'/agreement/activeRules',
		name:'0元购活动规则',
		component:activeRules
	},
	//rebateRules
	{
		path:'/agreement/rebateRules',
		name:'更多返利规则',
		component:rebateRules
	},
]
