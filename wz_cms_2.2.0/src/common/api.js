global.host = '/';
global.projectName = 'fy';
//二级目录名称
global.secondLevelOne = 'cms/';


global.urls = {
    getImgCode : host + projectName + '/imgCode/getImgCode',
    //获取管理员详情
    getAdminInfoDetail: host + projectName + '/admin/getAdminInfoDetail',
     //短信验证码登录
    cmsLogin: host + projectName + '/admin/cmsLogin ',
   //获取登录验证码
    sendCode: host + projectName + '/verifyCode/sendCode',
    //获取会员卡订单列表
    getCardOrderList: host + projectName + '/cardOrder/getCardOrderList',
    //关联会员卡号和物流订单号
    deliverCardOrder: host + projectName + '/cardOrder/deliverCardOrder',
    //导出会员卡列表
    exportCardOrderList: host + projectName + '/cardOrder/exportCardOrderList',
    //导入会员卡订单
    importCardOrderList: host + projectName + '/cardOrder/importCardOrderList',
    importCardOrderList2: host + projectName + '/cardOrder/importCardOrderList2',
    //根据会员卡订单ID查询会员卡订单
    getCardOrderByCardOrderId: host + projectName + '/cardOrder/getCardOrderByCardOrderId',
    //获取退款记录列表
    getCardRefundList: host + projectName + '/cardOrder/getCardRefundList',
    //批量审批退款记录
    updateCardRefundList: host + projectName + '/cardOrder/updateCardRefundList',
    //更新订单地址
    updateOrderAddress: host + projectName + '/cardOrder/updateOrderAddress',
    //更新订单标记
    updateOrderSign: host + projectName + '/cardOrder/updateOrderSign',
    //获取会员卡列表
    getMembershipCardList: host + projectName + '/membershipCard/getMembershipCardList',
    //发放会员卡
    deliverMembershipCard: host + projectName + '/membershipCard/deliverMembershipCard',
    //添加会员卡
    addMembershipCard: host + projectName + '/membershipCard/addMembershipCard',
    //制作会员卡
    generateMembershipCard: host + projectName + '/membershipCard/generateMembershipCard',
    //导出会员卡列表
    exportMembershipCardList: host + projectName + '/membershipCard/exportMembershipCardList',
    //广告点击
    clickInfo: host + projectName + '/ads/clickInfo',
    //金币流水列表
    goldRecordTable: host + projectName + '/gold/goldRecordTable',
    //用户列表
    getUserList: host + projectName + '/user/getUserList',
    //导出用户手机号
    exportUserList: host + projectName + '/user/exportUserList',
    //更新用户返佣分组
    updateCommissionGroup: host + projectName + '/user/updateCommissionGroup',

    //获取待入账流水列表
    getFreezeTransformList: host + projectName + '/freeze/getFreezeTransformList',
    //获取已入账流水列表
    getWithdrawTransformList: host + projectName + '/withdraw/getWithdrawTransformList',
    //获取提现审批列表
    getExtractDepositList: host + projectName + '/extractDeposit/getExtractDepositList',
    //审批提现
    approveExtractDeposit: host + projectName + '/extractDeposit/approveExtractDeposit',
    //打款到支付宝账号
    remitToAlipayAccount: host + projectName + '/extractDeposit/remitToAlipayAccount',
    //获取商品列表
    getItemList: host + projectName + '/item/getItemList',
    //批量处理0、1、5元购为普通商品
    batchActivitySet: host + projectName + '/item/batchActivitySet',
    //批量下架
    batchPullOffShelves: host + projectName + '/item/batchPullOffShelves',
    //获取商品详情
    getItemDetail: host + projectName + '/item/getItemDetail',
    //设置商品类目
    setItemCategory: host + projectName + '/item/setItemCategory',
    //设置商品为普通商品、0元购、1元购或者是5元购
    setActivityType: host + projectName + '/item/setActivityType',
    //设置商品排序值
    setItemSort: host + projectName + '/item/setItemSort',
    //设置商品上下架
    setItemOnline: host + projectName + '/item/setItemOnline',
    //同步好单库商品
    syncItemsFromHdk: host + projectName + '/item/syncItemsFromHdk',
    //更新指定添加时间的商品信息
    updateItemList: host + projectName + '/item/updateItemList',
    //同步淘客商选品库
    syncItemsFromTbk: host + projectName + '/item/syncItemsFromTbk',
    //设置商品所属的板块
    setItemPlate: host + projectName + '/item/setItemPlate',
    //更新产品配置
    updateItemSetting: host + projectName + '/item/updateItemSetting',
    //获取搜索（下拉列表）用的类目列表
    getCategoryListForSearch: host + projectName + '/category/getCategoryListForSearch',
    //获取所有类目
    getAllCategoryListForSearch: host + projectName + '/category//getAllCategoryListForSearch',
    //获取搜索（下拉列表）用的板块列表
    getPlateListForSearch: host + projectName + '/plate/getPlateListForSearch',
    //更商品板块图片
    updatePlates: host + projectName + '/plate/updatePlates',
    // 获取搜索（下拉列表）用的活动列表
    getActivityListForSearch: host + projectName + '/activity/getActivityListForSearch',
    //查询活动专区商品展示列表
    getOneOrFiveItemList: host + projectName + '/promotion/getOneOrFiveItemList',
    //1元购设置-删除展示的活动商品
    deleteItemPromotion: host + projectName + '/promotion/deleteItemPromotion',
    //1元购设置 -未设置1或者5元购活动商品列表
    getNotSetItemPromotionList: host + projectName + '/promotion/getNotSetItemPromotionList',
    //设置活动专区展示商品
    setItemPromotion: host + projectName + '/promotion/setItemPromotion',
    //获取反馈列表
    getFeedbackList: host + projectName + '/feedback/getFeedbackList',
    //设置商品类目图片
    setCategoriesImg: host + projectName + '/category/setCategoriesImg',
    //图片上传
    uploadFileList: host + projectName + '/system/uploadFileList',
    //获取用户返佣分组设置
    getUserRebateSetting: host + projectName + '/system/getUserRebateSetting',
    //更新分佣设置
    updateUserRebateSetting: host + projectName + '/system/updateUserRebateSetting',
    //获取短信方案配置
    getSMSType: host + projectName + '/system/getSMSType',
    //更新短信方案配置
    updateSMSType: host + projectName + '/system/updateSMSType',
    //获取烈熊回调记录列表
    getBillbearRecordList: host + projectName + '/benifit/getBillbearRecordList',
    //获取权益点击列表
    getBenifitClickList: host + projectName + '/benifit/getBenifitClickList',
    //添加/编辑权益
    addBenifit: host + projectName + '/benifit/addBenifit',
    //更新权益分类列表
    updateBenifitClassifyList: host + projectName + '/benifit/updateBenifitClassifyList',
    //更新权益分类关联关系
    updateBenifitClassifyUnion: host + projectName + '/benifit/updateBenifitClassifyUnion',
    //获取权益分类列表
    getBenifitClassifyList: host + projectName + '/benifit/getBenifitClassifyList',
    //更新权益列表
    updateBenifitList: host + projectName + '/benifit/updateBenifitList',
    //获取权益列表
    getBenifitList: host + projectName + '/benifit/getBenifitList',
    //获取权益产品列表
    getBenifitProductList: host + projectName + '/benifit/getBenifitProductList',
    //新增权益产品
    addBenifitProduct: host + projectName + '/benifit/addBenifitProduct',
    //新增权益产品
    addBenifitProduct: host + projectName + '/benifit/addBenifitProduct',
    //更新权益产品列表
    updateBenifitProductList: host + projectName + '/benifit/updateBenifitProductList',
    //权益产品详情
    getBenifitProductDetail: host + projectName + '/benifit/getBenifitProductDetail',
    //编辑权益产品
    updateBenifitProduct: host + projectName + '/benifit/updateBenifitProduct',
    //获取直充订单列表
    getRechargeOrderList: host + projectName + '/benifit/getRechargeOrderList',
    //获取卡密订单列表
    getCdkeyOrderList: host + projectName + '/benifit/getCdkeyOrderList',
    //获取权益卡密列表
    getBenifitCdkeyList: host + projectName + '/benifit/getBenifitCdkeyList',
    //手动操作权益订单退款
    updateOrderRefundNo: host + projectName + '/benifit/updateOrderRefundNo',
    //手动更新卡密过期状态
    updateCdkeyExpiryState: host + projectName + '/benifit/updateCdkeyExpiryState',
    //修改权益卡密销售状态
    updateCdkeySaleState: host + projectName + '/benifit/updateCdkeySaleState',
    //导入权益卡密列表
    importBenifitCdkeyList: host + projectName + '/benifit/importBenifitCdkeyList',
    //获取权益横幅列表
    getBenifitBannerList: host + projectName + '/benifit/getBenifitBannerList',
    //更新权益横幅列表
    updateBenifitBannerList: host + projectName + '/benifit/updateBenifitBannerList',
    //banner 设置
    bannerSetting: host + projectName + '/banner/bannerSetting',
    //获取原生跳转页列表
    getNativeJumpPageList: host + projectName + '/banner/getNativeJumpPageList',
    //获取banner设置
    getBannerSetting: host + projectName + '/banner/getBannerSetting',
    //添加渠道商
    addDistributor: host + projectName + '/distributor/addDistributor',
    //获取渠道商列表
    getDistributorList: host + projectName + '/distributor/getDistributorList', 
    //更新渠道信息
    createOrUpdateChannels: host + projectName + '/channel/createOrUpdateChannels', 
    //添加渠道号
    addChannel: host + projectName + '/channel/addChannel', 
    //获取渠道列表
    getChannelList: host + projectName + '/channel/getChannelList',
    // cms后台渠道商渠道数据列表查询
    getChannelDataList: host + projectName + '/channelData/getChannelDataList', 
    //cms后台渠道商数据汇总
    getSummaryData: host + projectName + '/channelData/getSummaryData', 
    //按注册时间统计的渠道商数据变动详情
    getChannelDataChangeDetail: host + projectName + '/channelData/getChannelDataChangeDetail', 
    //获取商品列表
    getGoodsList: host + projectName + '/weeget/getGoodsList', 
    //更新商品列表
    updateGoodsList: host + projectName + '/weeget/updateGoodsList', 
    //获取品牌列表
    getBrandList: host + projectName + '/weeget/getBrandList', 
    //获取品牌分类列表
    getBrandClassifyList: host + projectName + '/weeget/getBrandClassifyList', 
    //更新品牌列表
    updateBrandList: host + projectName + '/weeget/updateBrandList', 
    //获取优选banner列表
    getWeegetBannerList: host + projectName + '/weeget/getWeegetBannerList', 
    //更新云货优选banner列表
    updateWeegetBannerList: host + projectName + '/weeget/updateWeegetBannerList', 
    //获取首页品牌列表
    getWeegetHoneBrandList: host + projectName + '/weeget/getWeegetHoneBrandList', 
    //更新首页品牌列表
    updateWeegetHoneBrandList: host + projectName + '/weeget/updateWeegetHoneBrandList', 
    //获取广告位列表
    getAdsPositionList: host + projectName + '/adsPosition/getAdsPositionList', 
    //更新广告位
    updateAdsPosition: host + projectName + '/adsPosition/updateAdsPosition', 
    //获取广告商列表
    getAdvertiserList: host + projectName + '/adsPosition/getAdvertiserList', 
    //导出广告位
    exportAdsPositionList: host + projectName + '/adsPosition/exportAdsPositionList', 
    //获取奖励列表
    getAwardList: host + projectName + '/award/getAwardList', 
    //更新奖励记录
    updateAward: host + projectName + '/award/updateAward', 
    //导出奖励列表
    exportAwardList: host + projectName + '/award/exportAwardList', 
    //校验id
    checkId: host + projectName + '/award/checkId', 
    //获取app渠道列表
    getAppChannelList: host + projectName + '/award/getAppChannelList', 
    //获取广告任务列表
    getAdsTaskList: host + projectName + '/adsTask/getAdsTaskList', 
    //根据广告任务ID获取奖励列表
    getAwardListByAdsTaskId: host + projectName + '/adsTask/getAwardListByAdsTaskId', 
    //校验id
    adsTaskCheckId: host + projectName + '/adsTask/checkId', 
    //更新广告任务记录
    updateAdsTask: host + projectName + '/adsTask/updateAdsTask',
    //添加任务奖励 
    addTaskAward: host + projectName + '/adsTask/addTaskAward', 
    //导出任务
    exportAdsTaskList: host + projectName + '/adsTask/exportAdsTaskList', 
    //根据奖励ID删除任务奖励
    deleteTaskAwardByAwardId: host + projectName + '/adsTask/deleteTaskAwardByAwardId', 
    //任务奖励排序
    taskAwardSort: host + projectName + '/adsTask/taskAwardSort', 
    //获取福利设置列表(出口)
    getWelfareSettingList: host + projectName + '/welfareSetting/getWelfareSettingList', 
    //更新福利设置
    updateWelfareSetting: host + projectName + '/welfareSetting/updateWelfareSetting', 
    //获取审核设置列表
    getCheckSettingList: host + projectName + '/checkSetting/getCheckSettingList', 
    //更新审核设置
    updateCheckSetting: host + projectName + '/checkSetting/updateCheckSetting', 
    //获取常量值
    getConstantValue: host + projectName + '/system/getConstantValue',
    getConstantValues: host + projectName + '/system/getConstantValues',
    //更新常量
    updateConstantValue: host + projectName + '/system/updateConstantValue',
    updateConstantValues: host + projectName + '/system/updateConstantValues',
    //权益统计
    getBenifitStatisticsList: host + projectName + '/statistics/getBenifitStatisticsList',
    //获取页面流量统计列表
    getFlowPageStatisticsList: host + projectName + '/statistics/getFlowPageStatisticsList',
    //获取权益流量总分布列表
    getBenifitFlowDistributeList: host + projectName + '/benifitStatistics/getBenifitFlowDistributeList',
    //获取权益业务列表
    getBenifitBusinessList: host + projectName + '/benifitStatistics/getBenifitBusinessList',
    //获取直充统计列表
    getRechargeStatisticsList: host + projectName + '/benifitStatistics/getRechargeStatisticsList',
    //获取卡密统计列表
    getCardPasswordStatisticsList: host + projectName + '/benifitStatistics/getCardPasswordStatisticsList',
    //获取烈熊统计列表
    getBillbearStatisticsList: host + projectName + '/benifitStatistics/getBillbearStatisticsList',
    //获取H5统计列表
    getBenifitH5StatisticsList: host + projectName + '/benifitStatistics/getBenifitH5StatisticsList',
    // 导出权益流量总分布列表   
    exportBenifitFlowDistributeList: host + projectName + '/benifitStatistics/exportBenifitFlowDistributeList',
    //导出权益业务列表
    exportBenifitBusinessList: host + projectName + '/benifitStatistics/exportBenifitBusinessList',
    // 导出权益统计列表。这个接口多传一个type:  1：直冲，2：卡密，3：H5跳转，4：烈熊
    exportBenifitStatisticsList : host + projectName + '/benifitStatistics/exportBenifitStatisticsList ',
    //直充业务快速统计
    getZhiChongStatisticsList: host + projectName + '/statistics/getZhiChongStatisticsList',
    //卡密业务快速统计
    getKaMiStatisticsList: host + projectName + '/statistics/getKaMiStatisticsList',
    //转化监控数据
    conversionMonitor: host + projectName + '/statistics/conversionMonitor',
    //金币统计列表(赚钱任务)
    getGoldStatisticsList: host + projectName + '/statistics/getGoldStatisticsList',
    //获取商品下单统计数据
    getItemData: host + projectName + '/statistics/getItemData',
    //转化监控数据
    getDataChanges: host + projectName + '/statistics/getDataChanges',
    //广告统计报表
    getAdsStatisticsList: host + projectName + '/statistics/getAdsStatisticsList',
    //用户广告统计列表
    getUserAdsStatisticsList: host + projectName + '/statistics/getUserAdsStatisticsList',
    //导出广告统计表
    exportAdsStatisticsList: host + projectName + '/statistics/exportAdsStatisticsList',
    //导出用户广告统计列表
    exportUserAdsStatisticsList: host + projectName + '/statistics/exportUserAdsStatisticsList',
    //产品周期导表
    getWeekReport: host + projectName + '/statistics/getWeekReport',
    //导出H5渠道数据
    exportH5ChannelDataList: host + projectName + '/statistics/exportH5ChannelDataList',
    //查询h5渠道数据
    getH5ChannelDataList: host + projectName + '/statistics/getH5ChannelDataList',
    //获取home设置
    getHomeSetting: host + projectName + '/home/getHomeSetting',
    //更新首页配置
    updateHomeSetting: host + projectName + '/home/updateHomeSetting',
    //获取首页banner列表设置
    getHomeBannerListSetting: host + projectName + '/home/getHomeBannerListSetting',
    //更新首页banner列表-新的
    updateHomeBannerList: host + projectName + '/home/updateHomeBannerList',
    //更新首页banner列表单个-新的
    updateHomeBanner: host + projectName + '/home/updateHomeBanner',
    //落地页配置列表
    getLandPageAllocationList: host + projectName + '/landPage/getLandPageAllocationList',
    //修改落地页配置列表    
    updateLandPageAllocationList: host + projectName + '/landPage/updateLandPageAllocationList',
    // 根据落地页id获取渠道列表
    getChannelListByLandPageId: host + projectName + '/landPage/getChannelListByLandPageId',
    //获取0元购营销分类
    getActItemTypes: host + projectName + '/actItemType/getActItemTypes',
    //0元购营销分类信息更新
    updateActItemTypes: host + projectName + '/actItemType/updateActItemTypes',
    //解除0元购营销分类关联
    removeActItemType: host + projectName + '/actItemType/removeActItemType',
    //消息推送列表
    getPushContentList: host + projectName + '/pushContent/getPushContentList',
    //新建消息推送
    addPushContent: host + projectName + '/pushContent/addPushContent',
    //删除未推送的消息 
    delPushContent: host + projectName + '/pushContent/delPushContent',
    //停止推送
    stopPushContent: host + projectName + '/pushContent/stopPushContent',
    //获取营销短信列表
    getSmsMarketingContentList: host + projectName + '/smsMarketingContent/getSmsMarketingContentList',
    //添加营销短信内容
    addSmsMarketingContent: host + projectName + '/smsMarketingContent/addSmsMarketingContent',
    //删除营销短信记录
    delSmsMarketingContent: host + projectName + '/smsMarketingContent/delSmsMarketingContent',
    //营销短信-跳转类型下拉选框
    getSelectList: host + projectName + '/smsMarketingContent/getSelectList',
    //跳转类型下拉选框
    getSelectList: host + projectName + '/pushContent/getSelectList',
    //获取商品活动列表
    getItemActList: host + projectName + '/itemAct/getItemActList',
    //新建商品活动
    addItemAct: host + projectName + '/itemAct/addItemAct',
    //id获取商品图片和名称
    getItemNameAndImgUrlById: host + projectName + '/item/getItemNameAndImgUrlById',
    //获取物料种类列表
    getSimplyCats: host + projectName + '/tbMaterialCat/getSimplyCats',
    //根据物料分类查找物料id
    getMaterialList: host + projectName + '/tbMaterialCat/getMaterialList',
    //商品活动入口列表
    getItemActEntrance: host + projectName + '/itemActEntrance/getItemActEntrance',
    //更新商品活动入口配置
    updateItemActEntrance: host + projectName + '/itemActEntrance/updateItemActEntrance',
    //获取商品活动名称和ID列表
    getItemActNameAndIdList: host + projectName + '/itemAct/getItemActNameAndIdList',
    //获取api记录列表
    getApiAccessList: host + projectName + '/api/getApiAccessList',
    //更新/新增 版本记录
    updateVersion: host + projectName + '/version/updateVersion',
    //获取版本记录列表
    getVersionList: host + projectName + '/version/getVersionList',
    //获取搜索热词设置列表
    getHotWordList: host + projectName + '/hotWord/getHotWordList',
    //更新搜索热词列表
    updateHotWords: host + projectName + '/hotWord/updateHotWords',
    //查询搜索规则
    getSearchRegular: host + projectName + '/hotWord/getSearchRegular',
    //更新搜索规则
    getSearchRegular: host + projectName + '/hotWord/getSearchRegular',
}   

