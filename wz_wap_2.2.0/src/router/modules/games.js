const bigWheel = () => import('@/pages/games/bigWheel')//大转盘游戏
const guessingIdioms = () => import('@/pages/games/guessingIdioms') //猜成语游戏

export default[
    {
        path:'/games/bigWheel',
        name:'大转盘抽奖小游戏',
        component:bigWheel
    },
    {
        path:'/games/guessingIdioms',
        name:'大转盘抽奖小游戏',
        component:guessingIdioms
    },
]