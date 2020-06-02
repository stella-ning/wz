export default [
    {
        label: '用户管理',
        path: '',
        icon: 'el-icon-user-solid',
        children: [
            {
                label: '用户列表',
                path: '/user/userList',
            },
            {
                label: '会员卡管理',
                path: '/user/membershipCardList',
            },
            {
                label: '用户返佣分组设置',
                path: '/user/userRakeBackSettings',
            },
            {
                label: '用户反馈列表',
                path: '/user/feedbackList',
            },
            //    {
            //       label: '用户浏览&点击广告记录表',
            //        path: '/user/userViewAdsList', 
            //    },
        ]
    },
    {
        label: '订单列表',
        icon: 'el-icon-s-data',
        children: [
            {
                label: '会员卡订单列表',
                path: '/order/membershipOrderList',
            },


        ]
    },
    {
        label: '商品管理',
        icon: 'el-icon-s-goods',
        children: [
            {
                label: '商品列表',
                path: '/goods/goodsList',
            },
            {
                label: '搜索类目管理',
                path: '/goods/goodsCategorySearchSettings',
            },
        ]
    },
    {
        label: '账单管理',
        icon: 'el-icon-s-finance',
        children: [
            {
                label: '【待入账】账户流水列表',
                path: '/account/unrecordedAccountList',
            },
            {
                label: '【已入账，可提现】账户流水列表',
                path: '/account/recordedAccountList',
                breakword: true
            },
            {
                label: '【我的金币】账户流水列表',
                path: '/account/coinAccountList',
            },
            {
                label: '用户提现审核列表',
                path: '/account/userWithdrawCheckList',
            },
        ]
    },
    {
        label: '权益管理',
        icon: 'el-icon-s-opportunity',
        children: [
            {
                label: '【会员权益品牌页】相关配置',
                path: '/right/memberRightsBrandSettings',
                breakword: true
            },
            {
                label: '会员权益产品',
                path: '/right/memberRightsProductList',
            },
            {
                label: '卡密列表',
                path: '/right/cdkeyList',
            },
            {
                label: '会员权益订单（直充订单）',
                path: '/right/memberRightsChargeOrderList',
            },
            {
                label: '会员权益订单（卡密订单）',
                path: '/right/memberRightsCdkeyOrderList',
            },
           
            {
                label: '会员权益品牌列表',
                path: '/right/rightEntranceSettings',
            },
            {
                label: '烈熊权益订单记录',
                path: '/right/liexiongOrderList',
            },
            {
                label: '烈熊权益退款记录',
                path: '/right/liexiongRefundList',
            },
            {
                label: '会员入口点击记录',
                path: '/right/liexiongStatList',
            },
            //    {
            //        label: '香兰会员',
            //        path: '/right/xianglanMemberList',
            //    },
            //    {
            //        label: '香兰财务管理',
            //        path: '/right/xianglanOrderList',
            //    },
        ]
    },
    {
        label: '广告管理',
        icon: 'el-icon-s-data',
        children: [
            {
                label: '广告位管理列表',
                path: '/ads/adsenseManageList',
            },
            {
                label: '奖励管理',
                path: '/ads/rewardManageList',
            },
            {
                label: '出口位管理',
                path: '/ads/exitManageList',
            },
            {
                label: '任务管理',
                path: '/ads/taskManageList',
            },
            {
                label: '开关管理',
                path: '/ads/marketAuditList',
            },
            {
                label: '广告常量配置',
                path: '/ads/adsContentSettings',
            },
            {
                label: '广告统计报表',
                path: '/ads/adsManageStatList',
            },
            {
                label: '用户广告数据统计表',
                path: '/ads/userAdsStatList',
            },
        ]
    },
    {
        label: '数据统计',
        icon: 'el-icon-s-data',
        children: [
            {
                label: '广告数据',
                path: '/dataStat/adsStatList',
            },
            {
                label: '会员权益部报表工具',
                path: '/dataStat/rightsReport',
            },
            {
                label: '产品部报表快速查询工具',
                path: '/dataStat/goodsReport',
            },
            {
                label: '推广部报表快速查询工具',
                path: '/dataStat/marketingQuickSearch',
            },
        ]
    },

    {
        label: '渠道商管理',
        icon: 'el-icon-s-cooperation',
        children: [
            {
                label: '渠道商管理',
                path: '/distributor/distributorSettings',
            },
            {
                label: '落地页多版本配置',
                path: '/distributor/landingPageSettings',
            },

        ]
    },

   {
        label:'消息推送',
        icon:'el-icon-chat-dot-round',
        children:[
            {
                label: '手动推送',
                path: '/messagePush/messagePushByHand',
            },
            {
                label: '营销短信配置',
                path: '/messagePush/smsMarketPush',
            },
        ]
    },
    {
        label:'搜索配置',
        icon:'el-icon-cpu',
        children:[
            {
                label:'搜索配置列表',
                path:'/hotWord/hotWordList'
            }
        ]
    },
    {
        label:'商品活动管理',
        icon:'el-icon-sell',
        children:[
            {
                label: '商品活动管理',
                path: '/goodsActive/goodsActiveMannage',
            }, 
            {
                label:'商品活动入口管理',
                path:'/goodsActive/goodsActiveEntrance'
            },
        ]
    },
    {
       label:'设置',
       icon:'el-icon-s-tools',
       children:[
            {
                label: '首页入口设置',
                path: '/settings/homeEntranceSettings',
            },
           {
               label: 'banner设置',
               path: '/settings/bannerSettings',
           },
           {
                label: 'banner设置（扩展）',
                path: '/settings/bannerSettingsX',
            },
           {
               label: '1元钱抢购板块设置',
               path: '/settings/oneYuanBuySettings',
           },
           {
               label: '全球专属大牌入口设置',
               path: '/settings/brandEntranceSettings',
           },
           {
               label: 'App下载地址设置',
               path: '/settings/appDownloadSettings',
           },
           {
                label: '短信提供商设置',
                path: '/settings/smsProviderSettings',
            },
            {
                label: 'APP版本管理',
                path: '/settings/appUpdateSettings',
            },
           {
                label: '落地页api日志',
                path: '/settings/wzLandingApiLog',
            },
       ]
    },
    {
       label:'小程序',
       icon:'el-icon-toilet-paper',
       children:[
            {
                label: '退款记录',
                path: '/miniApp/minAppRefundList',
            },
         
       ]
    },
]