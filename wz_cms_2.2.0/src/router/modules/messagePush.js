// 消息推送-手动推送
const messagePushByHand = () => import('@/pages/messagePush/messagePushByHand')
const smsMarketPush = () => import('@/pages/messagePush/smsMarketPush')

export default [
{
    path: '/messagePush/messagePushByHand',
    component: messagePushByHand,
    name: '消息推送-手动推送',
},
{
    path: '/messagePush/smsMarketPush',
    component: smsMarketPush,
    name: '消息推送-营销短信链接配置',
},
]