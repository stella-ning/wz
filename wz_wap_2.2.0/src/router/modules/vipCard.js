const card = () => import('@/pages/vipCard/card') // 买卡落地页
const cardSimple = () => import('@/pages/vipCard/cardSimple') // 简易版买卡落地页
const buyCard  = () => import('@/pages/vipCard/buyCard') //买卡
const activateCard  = () => import('@/pages/vipCard/activateCard') //激活会员卡

export default [
    {
        path:'/card/index',
        name:'买卡链接index',
        component:card
    },
    {
        path:'/card/cardSimple',
        name:'买卡链接cardSimple',
        component:cardSimple
    },
    {
		path: '/card/buyCard',
		name: '购买麒麟卡',
		component: buyCard
	},
	{
		path: '/card/activateCard',
		name: '激活麒麟卡',
		component: activateCard
	},
]