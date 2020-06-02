const card = () => import('@/pages/vipCard/card') // 买卡落地页
const cardSimple = () => import('@/pages/vipCard/cardSimple') // 简易版买卡落地页
const buyCard  = () => import('@/pages/vipCard/buyCard') //买卡
const activateCard  = () => import('@/pages/vipCard/activateCard') //激活会员卡
const buyCardNew = () => import('@/pages/vipCard/buyCardNew') //新版买卡
const buyCard10 = () => import('@/pages/jyd/entrance/v10/buyCard10') //新版买卡
const buyCard12 = () => import('@/pages/jyd/entrance/v12/buyCard12') //新版买卡
export default [
    {
        path:'/card/index',
        name:'买卡链接index',
        component:card
    },
    {
        path:'/card/cardSimple',
        name:'买卡链接cardSimple',
        component:cardSimple,
        meta:true,
        
    },
    {
		path: '/card/buyCard',
		name: '购买麒麟卡',
        component: buyCard,
        meta:false
    },
    {
		path: '/card/buyCardNew',
		name: '购买麒麟卡new',
        component: buyCardNew,
        meta:false
	},
	{
		path: '/card/activateCard',
		name: '激活麒麟卡',
        component: activateCard,
        mate:true
    },
    {
		path: '/card/buyCard10',
		name: '购买麒麟卡v10',
        component: buyCard10,
        meta:false
    },
    {
		path: '/card/buyCard12',
		name: '购买麒麟卡v12',
        component: buyCard12,
        meta:false
	},
]