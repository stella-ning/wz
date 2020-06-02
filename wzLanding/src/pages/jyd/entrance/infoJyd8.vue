<template>
	<div class="box" >
		<section class="topFixed">
			<img :src="computer" alt="">
			办理超惠省麒麟卡，全年预计可省
			<span>
				￥<b>12000</b>
			</span>
			<p class="tips">仅供参考，视个人消费而定</p>
		</section>
		<section class="partOne">
			<div class="topImg" @click="getCard">
				<img :src="partOneBg" alt="">
			</div>
			<div class="privilegeBox" @click="getCard">
				<div class="themeList privilege">
					<ul class="flex align-center justify-between">
						<li class="themeContent" v-for="(item,index) in homeDatas.privilege8" :key="index">
							<div class="imgBox">
								<img :src="item.logo" alt="">
							</div>
							<p class="title">{{item.title}}</p>
							<p class="subTitle">{{item.subTitle}}</p>
							<p class="subTitle">{{item.outLet}}</p>
							<span v-if="item.label" class="tipsLabel">{{item.title == '尊享'?'NEW':'HOT'}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="themeList discount" @click="getCard">
				<ul class="flex justify-center">
					<li class="themeContent" v-for="(item,index) in homeDatas.discount8" :key="index">
						<div class="imgBox">
							<img :src="item.logo" alt="">
						</div>
						<p class="title">{{item.title}}</p>
						<p class="subTitle">{{item.subTitle}}</p>
						<p class="subTitle" v-if="item.outLet">{{item.outLet}}</p>
						<span v-if="item.label" class="tipsLabel">HOT</span>
					</li>
				</ul>
			</div>
			<div class="coupon" @click="getCard">
				<div class="couponBox">
					<div class="imgBox">
						<img :src="coupon" alt="">
					</div>
					<div class="gotItBth">
						<img :src="gotItBth" alt="">
					</div>
				</div>
			</div>
		</section>
		<!-- 会员精选特权 -->
		<section class="block selectedPrivileges">
			<blockHead :blockHead="selectedPrivilegesHead" ></blockHead>
			<div class="bodyBox selectedPrivilegesBody" @click="getCard">
				<div class="bodyLeft">
					<img :src="selectedPrivileges1" alt="">
					<div class="bodyContent">
						<p class="title">全国280城</p>
						<p class="subTitle">
							车主福利8折起
						</p>
					</div>
				</div>
				<div class="bodyRight">
					<div class="rightCon">
						<img :src="selectedPrivileges2" alt="">
						<div class="bodyContent">
							<p class="title">肯德基</p>
							<p class="subTitle">
								会员6折起
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 新人专享0元购 -->
		<section class="block newVipGoods">
			<blockHead :blockHead="newVipGoodsHead"></blockHead>
			<div class="bodyBox goodsBox" @click="getCard">
				<!-- <ul class="goodsList flex align-center justify-center">
					<li  v-for="(item,index) in newGoods" :key="index">
						<div class="goodCon">
							<div class="imgBox">
								<img :src="item.itemPic" alt="">
							</div>
							<p class="goodName">{{item.itemName}}</p>
							<p class="goodPrice">￥0.0</p>
							<div class="btn">付多少全返</div>
						</div>
					</li>
				</ul> -->
				<img :src="price0" alt="">
			</div>
		</section>
		<!-- 会员专享100+特权  -->
		<section class="block membershipPrivileges">
			<blockHead :blockHead="membershipPrivilegesHead"></blockHead>
			<div class="bodyBox membershipPrivilegesBody">
				<div class="hiddenBox" @click="getCard">
					<ul class="globalBrandList"  ref="globalBrand">
						<li v-for='(brandItem,index) in globalBrandList' :key="index">
							<img :src="brandItem" alt="">
						</li>
					</ul>
				</div>
				<div class="membershipPrivilegeTab">
					<span class="tabItem" v-for="(tabItem,index) in membershipPrivilegeTab" :key="index+2" :class="{'active':currentPrivilege == index}" @click="selectPrivilege(tabItem.englishName,index)">{{tabItem.name}}</span>
				</div>
				<ul class="membershipPrivilegeList flex align-center" @click="getCard">
					<li v-for="(listItem,index) in membershipPrivilegeList" :key="index+1">
						<div class="privilegLogo">
							<img :src="listItem.logo" alt="">
						</div>
						<p class="privilegeTitle">
							{{listItem.title}}
						</p>
						<p class="privilegeSubTitle">{{listItem.subTitle}}</p>
					</li>
				</ul>
				<div class="moreBrand" @click="getCard">
					获取全部特权>>
				</div>
			</div>
		</section>
		<!-- 全球大牌 -->
		<section class="block globalBrand">
			<blockHead :blockHead="globalBrandHead"></blockHead>
			<!-- brand 产品列表 -->
			<div class="bodyBox globalBrandBody">
				<div class="globalTab">
					<span class="tabItem" v-for="(tabItem,index) in globalTab" :key="index+2" :class="{'active':currentBrand == index}" @click="selectBrand(tabItem.englishName,index)">{{tabItem.name}}</span>
				</div>
				<div class="globalBrandCon">
					<img :src="globalBrandImg" alt="">
				</div>
				<!-- <div class="hiddenBox" @click="getCard">
					<ul class="globalBrandList"  ref="globalBrand">
						<li v-for='(brandItem,index) in globalBrandList' :key="index">
							<img :src="brandItem.logo" alt="">
						</li>
						<li>
							<img :src="moreImg" alt="">
						</li>
					</ul>
				</div> -->
				<!-- brand 列表 -->
				<!-- <div class="brandBox" @click="getCard">
					<ul class="brandList flex">
						<li class="flex align-center" v-for="(item,index) in homeDatas.brand" :key="index">
							<div class="imgBox">
								<img :src="item.logo" alt="">
							</div>
							<div class="content">
								<p v-html="item.title"></p>
								<div class="btn">低折购买</div>
							</div>
						</li>
					</ul>
				</div> -->
				<div class="moreBrand" @click="getCard">
					查看更多大牌 >>
				</div>
			</div>
			
		</section>
		
		<!-- 1元秒杀 -->
		<section class="block seckillBox">
			<blockHead :blockHead="seckillHead"></blockHead>
			<div class="bodyBox seckillGoods">
				<div class="goodsBox">
					<ul class="timeList flex align-center justify-between"  ref="timeLists">
						<li :class="startTime >= 10 && startTime < 12 ?'doing':'gray'" @click="tabClick(0,'time10')">
							<p class="time">10:00</p>
							<p class="label">{{text10}}</p>
						</li>
						<li :class="startTime >= 12 && startTime < 14 ?'doing':'gray'" @click="tabClick(1,'time12')">
							<p class="time">12:00</p>
							<p class="label">{{text12}}</p>
						</li>
						<li :class="startTime >= 14 && startTime < 18 ?'doing':'gray'" @click="tabClick(2,'time16')" >
							<p class="time">16:00</p>
							<p class="label">{{text16}}</p>
						</li>
						<li :class="startTime >= 18 && startTime < 22 ?'doing':'gray'" @click="tabClick(3,'time20')">
							<p class="time">20:00</p>
							<p class="label">{{text20}}</p>
						</li>
						<li :class="startTime >= 22?'doing':'gray'" @click="tabClick(4,'time22')">
							<p class="time">22:00</p>
							<p class="label">{{text22}}</p>
						</li>
					</ul>
					<div class="globalBrandCon">
						<img :src="seckillImg" alt="">
					</div>
					<!-- <ul class="goodsList flex align-center" @click="getCard">
						<li  v-for="(item,index) in vipGoods" :key="index">
							<div class="goodCon">
								<div class="imgBox">
									<img :src="item.itemPic" alt="">
								</div>
								<p class="goodName">{{item.itemName}}</p>
								<div class="btn">付多少全返</div>
							</div>
						</li>
					</ul> -->
				</div>
			</div>
		</section>
		<!-- 特别惊喜 -->
		<section class="block morePrivileges">
			<div class="morePrivilegesImg">
				<img :src="morePrivileges" alt="">
			</div>
		</section>
		<!-- 当前使用的用户 -->
		<section class=" block partFour" @click="getCard">
			<div class="persion">
				<div class="header">
					<p>“当前，已有<span style="color:#fff">2700735</span>位购物达人 </p>
					<p>正在使用<span style="color:#fff">麒麟卡</span>享受特权”</p>
				</div>
				<div class="tx">
					<img :src="tx" alt="">
				</div>
			</div>
		</section>
		<!-- 商务洽谈、联系方式 -->
		<section class="block cooperation">
			<div class="cooperationHeader">
				<img :src="cooperationImg" alt="">
			</div>
			<div class="cooperationBody">
				<div class="cooperate">
					<div class="headTitle">
						<img :src="cooperateIcon" alt="">
						商务合作
					</div>
					<p>如您有合作意向 </p>
					<p>可联系此邮箱jingguitar520@163.com</p>
				</div>
				<div class="contact">
					<div class="headTitle">
						<img :src="contactIcon" alt="">
						在线客服
					</div>
					<p>如您遇到任何疑问，欢迎联系咨询</p>
					<div class="contactBody">
						<dl class="flex">
							<dt>
								电话：
							</dt>
							<dd>
								{{servicePhone | formatTel}}
							</dd>
						</dl>
						<dl class="flex">
							<dt>
								服务时间：
							</dt>
							<dd>
								9:00 - 18:00
							</dd>
						</dl>
					</div>
				

					<div class="agreementBox" @click="isShowVip = true">
						了解会员章程 <img class="arrowIcon"  :src="rightIcon" alt="">
					</div>
					<div class="toOrderSeek"  @click="toOrderSeek">
						已领卡，查看物流情况 >
					</div>
                    <div class="toOrderSeek" >
						<p>免费领取，邮费需自理</p>
						<p>本活动由商家全权负责，</p>
						<p>与中国移动通信集团广东有限公司无关</p>
					</div>
				</div>
			</div>
		</section>
		<section class="agreement">
			<div class="company">
				<p>广州飞宇互联网科技有限公司</p>
				<p>粤ICP备19140246号-1</p>
			</div>
		</section>
		<footer class="footerBox">
            <div class="line"></div>
			<div class="footerTop" @click="getCard">
				<p><b>立即领卡</b>（{{new Date(time).Format('MM月dd日')}}截止）</p>
			</div>
			<!-- <div class="footerBottom" @click="toDownload" >
				已领卡的用户，请下载专有app >>
			</div> -->
            <div class="label"  @click="getCard">
                <img :src="redPackage" alt="">
            </div>
		</footer>
		<!-- 联系客服 -->
		<aside class="service" @click="showServe = true">
			<img :src="serveBtn" alt="">
		</aside>
		<van-popup v-model="show" round lock-scroll lazy-render :style="{ width: '90%',padding:'0 1.25rem' }">
			<div class="registe formCss">
				<p class="title">
					免费领卡
					<van-icon name="cross" @click="show=false"/>
				</p>
				<van-cell-group >
					<van-field v-model="userInfo.realName" @blur="inputBlur" placeholder="请输入您的姓名，便于锁定卡号" :error="nameError" />
				</van-cell-group>
				<van-cell-group>
					<van-field  v-model="userInfo.userPhone"  @blur="inputBlur" placeholder="请输入手机号" :error="phoneError" />
				</van-cell-group>
				<template v-if="isShowCode">
					<div class="inputBox van-hairline--surround flex">
						<div class="col65">
							<van-field class="borderRight"  @blur="inputBlur"  v-model="imgCode" placeholder="请输入图片验证码"/>
						</div>
						<div class="col35">
							<div class="rightBox">
								<img class="imgCode" :src="imgUrl"  alt="" @click="getImgCode">
							</div>
						</div>
					</div>
					<div class="inputBox van-hairline--surround flex">
						<div class="col65">
							<van-field class="borderRight"  @blur="inputBlur"  v-model="verifyCode" center clearable placeholder="请输入短信验证码"/>
						</div>
						<div class="col35">
							<div class="rightBox">
								<van-button  slot="button"  size="small" type="primary" :disabled="disabled" @click="getVerifyCode">{{btnText}}</van-button>
							</div>
						</div>
					</div>
				
				</template>
				
				<div class="footerBtn">
					<van-button type="primary" size="large" @click="getNow" :disabled="!userInfo.realName || !userInfo.userPhone || !imgCode || !verifyCode">立即领取</van-button>
				</div>
			</div>
			<!-- <component :is="name" @change-name='changeComponent'></component> -->
		</van-popup>
		<van-popup v-model="isWxOpen" :style="{background:'none',top:'10%',right:'1rem'}" position="right">
			<div class="wxOpen">
				<div class="imgBox">
					<img :src="shareArrow" alt="">
				</div>
				<div class="noted">
					请使用浏览器打开
				</div>
			</div>
		</van-popup>
		<!-- 了解会员章程 -->
		<van-popup v-model="isShowVip" round lock-scroll lazy-render :style="{ width: '90%',padding:'0 1.25rem 1rem',height:'70vh' }">
			<vipAgreement></vipAgreement>
			<div class="textBtn">
				<van-button class="btn" type="primary" size="large" @click="isShowVip = false">我已阅读</van-button>
			</div>
		</van-popup>
		<serve v-model="showServe" ref="server"></serve>

	</div>
</template>

<script>

import mHeader from '@/components/common/header';
import addressForm from '@/components/address/addressForm';
import serve from '@/components/service/customerService';
import blockHead from '@/components/vipCard/blockHead';
import vipAgreement from '@/components/vipCard/vipAgreement';
import cardDatas from '@/pages/vipCard/cardDatas';
export default {
	components:{
		mHeader,
		addressForm,
		serve,
		blockHead,
		vipAgreement
	},
	data () {
		return {
			homeDatas:cardDatas.datas,
			selectedPrivilegesHead:{
				blockTitle:'会员精选特权',
				subTitle:'吃喝玩乐全覆盖，最高可省50%',
				savePrice:'2300'
			},
			newVipGoodsHead:{
				blockTitle:'新人专享0元购',
				subTitle:'每日好货1000+件全额返/0元还包邮',
				savePrice:'1500'
			},
			globalBrandHead:{
				blockTitle:'全球大牌优卖',
				subTitle:'购物优惠+返现，全年预计可省8800元',
				savePrice:'8800'
			},
			seckillHead:{
				blockTitle:'会员1元秒杀专享 ',
				subTitle:'每日5常活动，会员超级让利',
				savePrice:'1500'
			},
			membershipPrivilegesHead:{
				blockTitle:'会员专享100+特权  ',
				subTitle:'购物优惠+返现，全年预计可省6800元',
				savePrice:'6800'
			},
			globalTab:[
				{name:'精选',englishName:'JX'},
				{name:'美妆',englishName:'MZ'},
				{name:'食品',englishName:'MS'},
				{name:'女装',englishName:'NZ'},
				],
			membershipPrivilegeTab:[
				{name:'热门推荐',englishName:'hotRecommend6'},
				{name:'生活服务',englishName:'liveServer'},
				{name:'美食饮品',englishName:'foodDrink'},
				{name:'旅游出行',englishName:'travelTrip'},
				{name:'影音娱乐',englishName:'entertainment'},
			],
			partOneBg:require('@/assets/images/partOneBg.png'),
			footerBtn:require('@/assets/images/footerBtn.png'),
			computer:require('@/assets/images/computer.png'),
			coupon:require('@/assets/images/home/coupon.png'),
			gotItBth:require('@/assets/images/home/gotItBth.png'),
			selectedPrivileges1:require('@/assets/images/home/selectedPrivileges21.png'),
			selectedPrivileges2:require('@/assets/images/home/selectedPrivileges2.png'),
			selectedPrivileges3:require('@/assets/images/home/selectedPrivileges3.png'),
			tx:require('@/assets/images/home/tx.png'),
			shareArrow:require('@/assets/images/shareArrow.png'),
			serveBtn:require('@/assets/images/serveBtn.png'),
			moreImg:require('@/assets/images/home/globalBrand/moreImg.png'),
			morePrivileges:require('@/assets/images/home/morePrivileges.png'),
			cooperationImg:require('@/assets/images/home/cooperationImg.png'),
			contactIcon:require('@/assets/images/home/contactIcon.png'),
			cooperateIcon:require('@/assets/images/home/cooperateIcon.png'),
            rightIcon:require('@/assets/images/home/rightIcon.png'),
			redPackage:require('@/assets/images/home/redPackage.png'),
			price0:require('@/assets/images/home/price0.png'),
			checked: 1,
			show:false,
			name:'',
			userInfo:{
				realName:'',
				userPhone:'',
			},
			nameError:false,
			phoneError:false,
			imgCode:'',
			imgUrl:'',
			imgCodeId:'',
			verifyCode:'',
			btnText:'获取验证码',
			disabled:false,
			t:'',
			newGoods:[],//0元购
			vipGoods:[],//1元购
			isWxOpen:false,
			JS_WEIXIN_OK:JS_WEIXIN_OK,//微信公众支付是否OK
			time:'',
			showServe:false,
			startTime:'',
			text10:'',
			text12:'',
			text16:'',
			text20:'',
			text22:'',
			channelName:getUrlArgs('channel'),
			isShowVip:false,
			globalBrandImg:'',
			globalBrandList:[
				require('@/assets/images/home/tq1.png'),
				require('@/assets/images/home/tq2.png'),
				require('@/assets/images/home/tq3.png'),
				require('@/assets/images/home/tq4.png'),
			],//展示当前选中的品牌产品
			seckillImg:'',
			currentBrand:0,
			membershipPrivilegeList:[],//展示当前选中的特权产品
			currentPrivilege:0,
			servicePhone:''
		}
	},
	created() {
		WxCompat.wxSetTitle = '麒麟卡'
		//window.addEventListener('scroll', this.handleScroll, true);
		this.addAccess()
		//window.addEventListener('scroll', this.handleScroll, true);
		this.$nextTick(()=>{
			this.getGoodsList('newVip')
			this.selectBrand('JX',0)
			this.selectPrivilege('hotRecommend6',0)
		})
		
	},

	deactivated() {
       //window.removeEventListener('scroll', this.handleScroll,true)
    },
    destroyed(){
        //window.removeEventListener('scroll', this.handleScroll,true)
    },
	mounted() {
		// this.callGetLandPageByChannelName();
		let currentTime = new Date();
		this.time = currentTime.getTime()+6*(24*60*60*1000);
		this.startTime = Number(new Date(currentTime).Format('hh'));
		this.text10 = this.cumputedText(10,12);
		this.text12 = this.cumputedText(12,14);
		this.text16 = this.cumputedText(16,18);
		this.text20 = this.cumputedText(20,22);
		this.text22 = this.cumputedText(22,24);
		if(this.startTime >= 12 && this.startTime < 14){
			this.seckillImg = this.homeDatas.seckillImgList['time12']
		}else if(this.startTime >= 14 && this.startTime < 18){
			this.seckillImg = this.homeDatas.seckillImgList['time16']
		}else if(this.startTime >= 18 && this.startTime < 22){
			this.seckillImg = this.homeDatas.seckillImgList['time20']
		}else if(this.startTime >= 22 && this.startTime < 24){
			this.seckillImg = this.homeDatas.seckillImgList['time22']
		}else{
			this.seckillImg = this.homeDatas.seckillImgList['time10']
		}
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.servicePhone = this.$refs.server.servicePhone
			},1000)
		})
		
	},
	methods: {
		addAccess(){
			let params = {
				recordType:12,
				url:this.$route.path,
				description:'买卡落地页',
				channelName:getUrlArgs('channel'),

			}
			STATS.addAccess(params);
		},
		handleScroll(){
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			let $footer = document.getElementsByClassName('footerBox');
			if(scrollTop >= 200){
				$footer[0].classList.add('footerFixed')
			}else{
				$footer[0].classList.remove('footerFixed')
			}
		},
		cumputedText(start,end){
			if(this.startTime < start){
				return '即将开始'
			}else if(this.startTime >= start && this.startTime < end){
				return '正在疯抢'
			}else if(this.startTime >= end){
				return '已完成'
			}else{
				return ''
			}
		},
		globalBrandWidth(){
			let $ul = this.$refs.globalBrand;
			let $li = $ul.getElementsByTagName('li');
			$ul.style.width = (Number($li.length)*8.4375 + Number($li.length -1 )*0.3125 + 0.625)+'rem'
		},
		tabClick(index,time){
			let $ul = this.$refs.timeLists;
			let $li = $ul.getElementsByTagName('li');
			for(var i=0;i < $li.length;i++){
				if(i == index){
					$li[index].classList.add('doing');
				}else{
					$li[i].classList.remove('doing')
				}
			}
			this.seckillImg = this.homeDatas.seckillImgList[time];
		},
		selectBrand(type,index){
			this.currentBrand = index
			this.globalBrandImg = this.homeDatas.globalBrand8[type]
			
		},
		selectPrivilege(type,index){
			this.currentPrivilege = index
			this.membershipPrivilegeList = this.homeDatas.membershipPrivileges[type]
		},
		getCard(){
			if(WxCompat.isWeixinClient() && !JS_WEIXIN_OK){
				this.isWxOpen = true
				return;
			}
			STATS_SA.trackClick('getCardNow','立即免费领卡')
			this.$router.push({
				path:'/address/addressInfoNew',
				query: {
					isSimple:true,
					channel:getUrlArgs('channel'),
					...this.$route.query
				}
			})
			this.factoryTool.addState('getCardBtnClick');

		},
		changeComponent(type){
			this.name = type
		},
		//图形验证码
		getImgCode(){
			this.request.post(this.urls.getImgCode,{},false).then((res)=>{
				this.imgUrl = res.resultData.imgCode.imgUrl
				this.imgCodeId = res.resultData.imgCode.imgCodeId
			})
			
		},
		//短信验证码
		getVerifyCode(){
			this.disabled = true
			this.btnText = `60s 后重发`
			let time = 60
			this.t = setInterval(() => {
				time = --time
				this.btnText = `${time}s 后重发`
				if(time == 0) {
					clearInterval(this.t)
					this.disabled = false
					this.btnText = `获取验证码`
				}
			},1000)
			let params = {
				phone:this.userInfo.userPhone,
				code:this.imgCode,
				imgCodeId:this.imgCodeId,
				verifyType:1,//短信验证码类型。1：用户注册，2：用户登陆，3：订单查询，4：激活会员，5：管理员登陆
			};
			this.request.post(this.urls.sendCode,params,true).then(res =>{
				console.log('获取短信验证码成功')
			}).catch(error=>{
				clearInterval(this.t)
				this.disabled = false
				this.btnText = `获取验证码`
			})
			

		},
		getNow(){
			let registerPa = {
				realName:this.userInfo.realName,
				phone:this.userInfo.userPhone,
				code:this.verifyCode,
				channelName:this.channelName,
				platformType:2,//平台类型。1：cms，2：wap，3：iOS，4：android
			};
			this.request.post(this.urls.userRegister,registerPa,true).then(res=>{
				this.userInfo.userId = res.resultData.userId
				this.userInfo.sessionKey = res.resultData.sessionKey
				this.$ls.set('userInfo',this.userInfo)
				if(res.resultData.user.payCardTime > 0){
					//this.$router.push('/order/orderDetail')
					this.$router.push({
                        path:'/order/orderDetail',
                        query: {
                            channel:getUrlArgs('channel'),
                            ...this.$route.query
                        }
                    })
				}else{
					//this.$router.push('/address/addressInfo')
					this.$router.push({
						path:'/address/addressInfo',
						query:{
                            channel:getUrlArgs('channel'),
                            ...this.$route.query
						}
					})
				}
			})	
			
		},
		toDownload(){
			this.$router.push({
				path:'/appInfo/appDownload',
				query: {
					channel:getUrlArgs('channel'),
					...this.$route.query
				}
			})
		},
		toOrderSeek(){
			this.$router.push({
				path:'/order/orderSeek',
				query: {
					channel:getUrlArgs('channel'),
					...this.$route.query
				}
			})
		},
		inputBlur() { //兼容ios固定点位出现的问题
			setTimeout(() => {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					document.activeElement.scrollIntoViewIfNeeded(true)
				}
			}, 400)
		},
		//获取0元购，1元购商品
		getGoodsList(type,time){
			let params = {
				startIndex:0,
			};
			if(type == 'newVip'){
				params.type = [2];
				params.length = 6;
			}else if(type == 'vip'){
				params.type = [3];
				params.length = 3;
				params.startTime = time;
			};
			this.request.post(this.urls.queryItemPromotionList,params,false).then(res=>{
				if(type == 'newVip'){
					this.newGoods = res.resultData.itemPromotionList
				}else if(type == 'vip'){
					this.vipGoods = res.resultData.itemPromotionList
				}
			})
		},
		callGetLandPageByChannelName(){
			this.request.post(this.urls.getLandPageByChannelName,{channelName:getUrlArgs('channel')}).then((res)=>{

			})
		}

	},
	watch: {
		
	},
	props:['factoryTool'],
	computed: {
		isShowCode(){
			if(checkPhoneMob(this.userInfo.userPhone)){
				return true;
			}
		},
		
	},
	beforeRouteEnter(to, from, next){
		next((vm)=>{
			vm.addAccess()
		})
	}
}
</script>

<style lang="scss" scoped>
	.box{
		background:#191918;
		.topFixed{
			position:fixed;
			top:0;
			left:0;
			width:100%;
            //height:2.8125rem /* 45/16 */;
            height:vw(45);
			background:#110F0C;
			font-size:vw(14);
			color:#E1BF6C;
			padding-left:vw(15);
			z-index:9999;
			img{
				display:inline-block;
				width:vw(15);
				max-width: 100%;
				vertical-align: middle;
			}
			span{
				font-size:vw(10);
				color:#fff;
				b{
					font-size:vw(18);
					font-family: DINMittelschrift;
				}
			}
			.tips{
				font-size:vw(10);
                color:#E2BF6C;
				font-weight: 300;
				padding-left:vw(20);

			}
		}
		.block{
			margin: 0 vw(10);
			border-radius:vw(10);
			font-weight: 400;
			.blockHead{
				padding:vw(15) vw(15) vw(25);
			}
			.bodyBox{
				position:relative;
				top:-(vw(10));
			}
			&.selectedPrivileges{
				.blockHead{
					background:url('../../../assets/images/home/selectedPrivilegesBg.png') no-repeat;
					background-size: 100% 100%;
					/deep/  .blockTitle{
						text-shadow:0px 1px 10px rgba(255,173,73,0.5);
					}
				}
				.selectedPrivilegesBody{
					background:#fff;
					border-radius: vw(10);
					padding:vw(10);
					display:flex;
					height:vw(95);
					.bodyContent{
						position:absolute;
						top:0;
						left:0;
						width:100%;
						height:100%;
						background:transparent;
						text-align: center;
						padding-top:vw(20);
						padding-left:vw(40);
						.title{
							font-size:vw(15);
							color:#fff;
							font-weight: 400;
						}
						.subTitle{
							font-size:vw(12);
							color:#FFE7C5;
							font-weight: 400;
						}
					}
					.bodyLeft{
						flex:1;
						background:pink;
						border-radius:vw(10);
						margin-right:vw(8);
						position:relative;
						img{
							width:100%;
							height:100%;
							max-width: 100%;
							max-height: 100%;
						}
						
					}
					.bodyRight{
						flex:1;
						.rightCon{
							border-radius:vw(10);
							height:vw(76);
							position:relative;
							.bodyContent{
								padding-left:vw(15);
							}
							img{
								width:100%;
								height:100%;
								max-width: 100%;
								max-height: 100%;
							}
							&:nth-child(1){
								margin-bottom:vw(6);
								background: #d8b18a
							}
							&:nth-child(2){
								background: #1F120D;
							}
						}
					}
				}
			}
			&.newVipGoods{
				// background:linear-gradient(90deg,rgba(203,81,81,1),rgba(154,38,38,1));
				.blockHead{
					background:url('../../../assets/images/home/newVipGoodsBg.png') no-repeat;
					background-size: 100% 100%;
					/deep/  .blockTitle{
						text-shadow:0px 1px 10px rgba(251,99,89,0.5);
					}
				}
			}
			&.globalBrand{
				// background:linear-gradient(90deg,rgba(80,80,80,1),rgba(9,9,9,1));
				.blockHead{
					background:url('../../../assets/images/home/globalBrandBg.png') no-repeat;
					background-size: 100% 100%;
					/deep/  .blockTitle{
						text-shadow:0px 1px 10px rgba(105,176,253,0.5);
					}
				}
				.globalBrandBody{
					background:linear-gradient(-180deg,#fff,#f0f0f0);
					border-radius: vw(8);
					padding:vw(15) 0 vw(15) vw(10);
					.globalTab{
						margin-bottom: vw(10);
						.tabItem{
							width:vw(65);
							height:vw(30);
							background:#ccc;
							display:inline-block;
							margin-right:vw(10);
							font-size:vw(12);
							font-weight: 400;
							background:#E2F1FF;
							color:#609CEF;
							text-align: center;
							line-height:vw(30);
							border-radius: vw(30);
							&.active{
								background:linear-gradient(0deg,rgba(128,193,253,1),rgba(127,191,253,1),rgba(95,155,239,1));;
								color:#fff;
							}
						}
					}
					.globalBrandCon{
						width:100%;
						height:vw(205);
						padding-right:vw(10);
						margin-bottom:vw(15);
						img{
							width:100%;
							height:100%;
							max-width: 100%;
						}
					}
					
					.brandBox{
						position:relative;
						height:vw(360);
						padding-right:vw(10);
						margin-top:vw(10);
						.brandList{
							border-radius: vw(10);
							height:vw(360);
                            flex-flow:row wrap;
							li{
								width:vw(158);
								height:5vw(8);
								border-radius:vw(5);
								margin-bottom:vw(5);
								background:#fff;
								&:nth-child(2n+1){
									margin-right:vw(5);
								}
								.imgBox{
									flex:1;
									img{
										width:vw(45);
										height:vw(45);
										margin:0 auto;
									}
								}
								.content{
									flex:1.5;
									margin-left:vw(5);
									p{
										color:#1A1A1A;
										font-size:vw(13);
										font-weight: 400;
										line-height:vw(30);
									}
									.btn{
										width:vw(76);
										height:vw(21);
										line-height:vw(21);
										text-align: center;
										background:linear-gradient(0deg,rgba(216,177,138,1),rgba(232,208,164,1));
										border-radius:vw(21);
										font-size:vw(12);
										color:#1A1A1A;
										font-weight: 400;
										margin-top:vw(5);
									}
								}
							}
						}
					}
					
				}
			}
			.hiddenBox{
				overflow-x: scroll;
				overflow-y: hidden;
				margin-bottom:vw(20);
				.globalBrandList{
					width:vw(400);
					box-sizing: border-box;
					overflow-x: auto;
					>li{
						display: inline-block;
						width:vw(95);
						height:vw(95);
						border-radius: .3125rem /* 5/16 */;
						img{
							width:100%;
							max-width:100%;
						}
					}
					>li + li{
						margin-left:.3125rem /* 5/16 */;
					}
				}
			}
			&.seckillBox{
				// background:linear-gradient(90deg,rgba(203,81,80,1),rgba(155,39,39,1));
				
				.blockHead{
					background:url('../../../assets/images/home/seckillBoxBg.png') no-repeat;
					background-size: 100% 100%;
				}
				.seckillGoods{
					background:linear-gradient(-180deg,#fff,#f0f0f0);
					border-radius: vw(10);
					.timeList{
						padding-top:vw(5) /* 10/16 */;
						text-align: center;
						margin-bottom:vw(13);
						li{
							background:#F7EAFC;
							border-radius: vw(18) /* 18/16 */;
							width:vw(62) /* 62/16 */;
							color:#C35EF1;
							font-weight: 400;
						}
						
						.time{
							font-size:vw(16) /* 16/16 */;
							line-height: vw(18) /* 18/16 */;
						}
						.label{
							font-size:10px;
							font-weight: 300;
							line-height:vw(15) /* 18/16 */;
						}
						.doing{
							background:linear-gradient(-90deg,rgba(192,120,251,1),rgba(195,93,240,1));
							color:#fff;
							
						}
					}
				}
			}
			&.membershipPrivileges{
				// background:linear-gradient(90deg,rgba(89,119,221,1),rgba(40,25,112,1));
				.blockHead{
					background:url('../../../assets/images/home/membershipPrivilegesBg.png') no-repeat;
					background-size: 100% 100%;
					/deep/ .blockTitle{
						text-shadow:0px 1px 10px rgba(69,224,206,0.5);
					}
				}
				.membershipPrivilegesBody{
					background:linear-gradient(-180deg,#fff,#f0f0f0);
					border-radius: vw(10) /* 10/16 */;
					padding:vw(10) /* 10/16 */ vw(0) vw(10) vw(10);
					.membershipPrivilegeTab{
						text-align: center;
						padding-right:vw(10);
						.tabItem{
							display: inline-block;
							width:vw(60) /* 60/16 */;
							height:vw(30)/* 30/16 */;
							text-align: center;
							line-height:vw(30) /* 30/16 */;
							border-radius:vw(30) /* 30/16 */;
							background:#EBFCF3;
							color:#22AFAB;
							font-size:vw(10) /* 10/16 */;
							margin-right:vw(5)/* 5/16 */;
							font-weight: 300;
							&.active{
								background:linear-gradient(-90deg,rgba(66,225,201,1),rgba(67,209,206,1));;
								color:#fff;
							}
						}
					}
					.membershipPrivilegeList{
						width:100%;
						flex-flow: row wrap;
						padding-right:vw(10);
						margin-top:vw(10) /* 10/16 */;
						li{
							width:vw(105) /* 105/16 */;
							background:#fff;
							border-radius:vw(10) /* 10/16 */;
							margin-bottom:vw(5) /* 5/16 */;
							margin-right:vw(5) /* 5/16 */;
							padding-bottom:vw(15) /* 15/16 */;
							text-align: center;
							&:nth-child(3n){
								margin-right:0;
							}
							.privilegLogo{
								margin-top:vw(12) /* 12/16 */;
								margin-bottom:vw(5) /* 5/16 */;
								img{
									display:inline-block;
									width:vw(55) /* 55/16 */;
									height:vw(55) /* 55/16 */;
									max-width: 100%;
									max-height: 100%;
								}
							}
							.privilegeTitle{
								font-size:vw(14) /* 14/16 */;
								color:#1A1A1A;
							}
							.privilegeSubTitle{
								font-size:vw(12) /* 12/16 */;
								color:#D4B283;
							}
						}
					}
				}
			}
			&.morePrivileges{
				background:none;
				.morePrivilegesImg{
					border-radius: vw(10) /* 10/16 */;
					img{
						width:100%;
						max-width: 100%
					}
				}
			}
			&.cooperation{
				background:#3A362D;
				.cooperationHeader{
					width: vw(185) /* 185/16 */;
					margin: 0 auto;
					padding: vw(15) /* 15/16 */ 0 vw(25) /* 25/16 */;
					img{
						width:100%;
						max-width:100%;
					}
				}
				.cooperationBody{
					background:#2C2B29;
					border-radius: vw(10) /* 10/16 */;
					color:#DFC479;
					text-align: center;
					font-size:vw(14) /* 14/16 */;
					font-weight: 300;
					padding-bottom:vw(30) /* 30/16 */;
					.headTitle{
						height:vw(56) /* 56/16 */;
						line-height: vw(56) /* 56/16 */;
						color:#F0D9A4;
						img{
							display:inline-block;
							height:vw(18) /* 18/16 */;
							max-height: 100%;
							vertical-align: text-bottom;
						}
					}
					.cooperate{
						margin:0 vw(8)/* 8/16 */;
						padding-bottom:vw(35) /* 35/16 */;
						border-bottom:1px solid #4C4C4C;
					}
					.contact{
						.contactBody{
							margin-top:vw(30) /* 30/16 */;
							margin-bottom:vw(20) /* 20/16 */;
							dl{
								color:#F0D9A4;
								font-weight: 300;
								margin-left:vw(80) /* 80/16 */;
								text-align: left;
								
								dt{
									flex:1;
								}
								dd{
									flex:2.5;
								}
							}
						}
						
						.agreementBox{
							width:vw(180) /* 180/16 */;
							height:vw(35) /* 35/16 */;
							border-radius: vw(35) /* 35/16 */;
							border:1px solid #F0D9A4;
							margin:0 auto;
							text-align: center;
							line-height:vw(33) /* 33/16 */;
							font-size:vw(14) /* 14/16 */;
							color:#F0D9A4;
							font-weight: 400;
							img{
								display:inline-block;
								width:vw(16);
								max-width: 100%;
								margin-left:vw(15) /* 15/16 */;
								vertical-align: text-top;
							}
						}
						.toOrderSeek{
							margin-top:vw(25) /* 25/16 */;
							font-size:vw(14) /* 14/16 */;
							font-weight: 400;
							color:#F0D9A4;
						}
					}
				}
			}
			.moreBrand{
				margin-right:vw(10)/* 10/16 */;
				height:vw(45) /* 45/16 */;
				line-height:vw(45) /* 45/16 */;
				background:#fff;
				border-radius: vw(10) /* 10/16 */;
				text-align: center;
				font-size:vw(14)/* 14/16 */;
				color:#905F21;
			}
		}
		.goodsBox{
			position:relative;
			background:#F7F7F7;
			width:100%;
			padding: vw(10);
    		border-radius: vw(10);
			img{
				width:100%;
				max-width:100%;
				max-height: 100%;
			}
			.goodsList{
				background:#F2F2F2;
				border-radius:vw(10);
				padding:vw(15) /* 15/16 */ 0 vw(5) /* 5/16 */;
				flex-flow:row wrap;
				width:100%;
				li{
					width:vw(105) /* 105/16 */;
					box-shadow:0px 0px 7px 1px rgba(69,54,35,0.1);
					border-radius:vw(5) /* 5/16 */;
					margin-right:vw(5) /* 5/16 */;
					margin-bottom:vw(10) /* 10/16 */;
					text-align: center;
					padding-bottom:vw(13) /* 13/16 */;
					&:nth-child(3n){
						margin-right: 0;
					}
					.imgBox{
						border-radius: vw(5) /* 5/16 */ vw(5) /* 5/16 */ 0 0;
						img{
							max-width: 100%;
							border-radius: vw(5) /* 5/16 */ vw(5) /* 5/16 */ 0 0;
						}
					}
					.goodName{
						width: 100%;
						padding: vw(10) /* 10/16 */ vw(5) /* 5/16 */ vw(4) /* 4/16 */;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size:vw(14) /* 14/16 */;
						color:#1A1A1A;
						font-weight: 400;
					}
					.goodPrice{
						color:#1A1A1A;
						font-size:vw(18) /* 18/16 */;
						font-weight: bold;
						margin-bottom:vw(8) /* 8/16 */;
					}
					.btn{
						width:vw(76) /* 76/16 */;
						height:vw(21) /* 21/16 */;
						line-height:vw(21)/* 21/16 */;
						text-align: center;
						background:linear-gradient(90deg,rgba(255,228,192,1),rgba(255,213,164,1));;
						border-radius:vw(21)/* 21/16 */;
						font-size:vw(12) /* 12/16 */;
						color:#E03A25;
						font-weight: 400;
						margin:0 auto;
					}
				}
			}
		}
		.themeList{
			ul{
				flex-flow:row wrap;
                &.version2{
					flex-flow:nowrap;
					margin-top:vw(10)/* 10/16 */;
					li{
						.title{
							font-size:vw(13) /* 13/16 */;
						}
					}
				}
				li{
					margin-bottom:vw(20)/* 20/16 */;
					position: relative;
					.title{
						color:#FADDB5;
						font-size:vw(14) /* 14/16 */;
						line-height:vw(13)/* 13/16 */;
						margin-bottom:vw(5);
					}
					.subTitle{
						color:#D1C8A8;
						font-size:vw(11);
						font-weight: 400;
						padding:0 vw(8) /* 8/16 */;
						line-height:vw(15);
					}
					.label{
						display:inline-block;
						background:#393939;
						font-size:10px;
						color:#DFD3B8;
						border-radius:vw(15) /* 15/16 */;
						padding:1px 4px;
					}
					.tipsLabel{
						width:vw(35) /* 35/16 */;
						height:vw(14) /* 14/16 */;
						background:linear-gradient(0deg,rgba(226,88,19,1),rgba(243,103,33,1));
						border-radius:vw(14) vw(14) vw(14) 0px;
						font-size:vw(10) /* 10/16 */;
						font-weight: 300;
						color:#fff;
						position:absolute;
						top:-.5rem /* 8/16 */;
						right:vw(2) /* 2/16 */;
					}
				}
			}
		}
		.partOne{
			width:100%;
			height:auto;
			.topImg{
				img{
					width:100%;
					max-width:100%;
				}
			}
			.timeLabel{
				width:vw(95) /* 95/16 */;
				height:vw(45) /* 45/16 */;
				background:linear-gradient(-10deg,rgba(240,29,4,1),rgba(233,90,16,1));
				border-radius:23px 23px 23px 0px;
				margin-top:vw(100) /* 100/16 */;
				margin-left:vw(257) /* 257/16 */;
				text-align: center;
				padding-top:vw(5) /* 5/16 */;
				p{
					&:nth-child(1){
						font-size:vw(12) /* 12/16 */;
						color:#000;
						line-height:vw(12) /* 12/16 */;
					}
					&:nth-child(2){
						font-size:vw(18) /* 18/16 */;
						color:#fff;
					}
				}
			}
			.getCardBth{
				width:vw(325) /* 325/16 */;
				height:vw(50)/* 50/16 */;
				border-radius:vw(50) /* 50/16 */;
				background:linear-gradient(0deg,rgba(216,177,138,1),rgba(232,208,164,1));
				margin:0 auto;
				text-align:center;
				padding:vw(5) /* 5/16 */ 0;
				position: relative;
				top:vw(205) /* 205/16 */;
				p{
					color:#1A1A1A;
					&:nth-child(1){
						font-size:vw(18) /* 18/16 */;
						font-weight: 500;
					}
					&:nth-child(2){
						font-size:vw(10)/* 10/16 */;
					}
				}
			}
			.privilegeBox{
				.privilege{
					li.themeContent{
						width:33.33%;
						text-align: center;
					}
					.imgBox{
						width:vw(45)/* 50/16 */;
						height:vw(45) /* 50/16 */;
						margin:0 auto vw(10) /* 10/16 */;
						img{
							max-width: 100%;
						}
					}
					.tipsLabel{
						right:vw(20)/* 20/16 */;
					}
				}
			}
			.discount{
				ul{
					padding:0 vw(10);
				}
				li.themeContent{
					width:25%;
					text-align: center;

					.subTitle{
						color:#DFD3B8;
						padding:0;
					}
				}
				.imgBox{
					width:vw(45) /* 45/16 */;
					height:vw(45) /* 45/16 */;
					margin:0 auto vw(10)/* 10/16 */;
					img{
						max-width: 100%;
					}
				}
			}
			.coupon{
				margin-bottom:vw(10);
				.couponBox{
					height:vw(104) /* 104/16 */;
					position: relative;
					.imgBox{
						width:vw(320);
						height:100%;
						margin:0 auto;
						img{
							width:100%;
							max-width: 100%;
							max-height:100%;
						}
					}
					.gotItBth{
						width:vw(106) /* 106/16 */;
						position:absolute;
						bottom:vw(10) /* 10/16 */;
						right:vw(65) /* 65/16 */;
						img{
							width:100%;
							max-width: 100%;
						}
					}
				}
			}
		}
		.partFour{
			background:#3A362D;
			margin:vw(15) /* 15/16 */ vw(10) /* 10/16 */;
			.persion{
				border-radius: vw(10) /* 10/16 */;
				text-align: center;
				.header{
					padding-top:vw(16);
					padding-bottom:vw(10) /* 10/16 */;
					color:#F0D9A4;
					font-size:vw(18) /* 18/16 */;
					font-weight: 400;
				}
				.tx{
					background: #2C2B29;
					padding:2rem 1.5625rem /* 25/16 */ 2rem /* 32/16 */;
					border-radius: .625rem /* 10/16 */;
					img{
						max-width:100%;
					}
				}
			}

		}
		.agreement{
			padding:vw(15)/* 15/16 */vw(10) /* 10/16 */ vw(160);
			font-size:vw(12);
			.company{
				color:#F0D9A4;
				text-align:center;
				font-weight: 400;
			}
		}
		.footerBox{
			position: fixed;
			left:0;
			bottom:0;
			width:100vw;
			box-sizing:border-box;
			text-align: center;
			background:#0E0A09;
            transition: all 0.5s ease;
            .line{
                width:100%;
                height:1px;
                background: linear-gradient(90deg,rgba(53,49,45,1),rgba(241,211,174,1),rgba(53,49,45,1));
            }
            .label{
                width:vw(168);
                height:vw(33);
                position:absolute;
                right:vw(20);
                top:-(vw(28));
                -webkit-animation: bounce-down 1.5s linear infinite;
                animation: bounce-down 1.5s linear infinite;
                img{
                    width:100%;
                    max-width:100%;

                }
            }
			.footerTop{
				width:vw(355);
                height:vw(50);
                margin:vw(8) /* 12/16 */ auto vw(8);
                background:linear-gradient(-180deg,rgba(237,202,126,1),rgba(216,168,91,1));;
                border-radius:vw(50);
                line-height:vw(50);
                color:#75460A;
                font-size:vw(16);
			}
			.footerBottom{
				height:1.875rem /* 30/16 */;
				line-height:1.875rem /* 30/16 */;
				color:#D8B28B;
				font-size:.75rem /* 12/16 */;
			}
			&.footerFixed{
				bottom:0;
			}
			
		}
		.service{
			position:fixed;
			right:0;
			top:13rem;
			width:1.5625rem /* 25/16 */;
			img{
				max-width: 100%;
			}
		}
		.registe{
			&.formCss{
				/deep/.borderRight .van-field__body:after{
					position: absolute;
					box-sizing: border-box;
					content: ' ';
					pointer-events: none;
					top: -50%;
					right: -50%;
					bottom: -50%;
					left: -50%;
					border-right: 1px solid #1A1A1A;
					-webkit-transform: scale(.5);
					transform: scale(.5);
				}
				// .inputBox .col65{
				// 	width:66%;
				// }
				/deep/.van-cell{
					padding:.625rem /* 10/16 */ .625rem /* 10/16 */ .625rem /* 10/16 */ .9375rem /* 15/16 */;
				}
			}
		}
		.wxOpen{
			position: relative;
			text-align: center;
			.imgBox{
				position:absolute;
				top:.625rem /* 10/16 */;
				right:.625rem /* 10/16 */;
			}
			.noted{
				color:#fff;
				font-size:1.25rem /* 20/16 */;
				padding-top: 6.875rem /* 110/16 */;
			}
		}
		.textBox{
			height:80%;
			overflow-y: scroll;
			.title{
				text-align: center;
				font-weight: 600;
				padding-top:1.875rem /* 30/16 */;
			}
		}
		.textBtn{
			margin-top:1.25rem /* 20/16 */;
			
			.btn{
				
				background-color: #E3C79C;
				border: 0;
				color: #666;
				font-size: 1rem;
				background: linear-gradient(0deg, #d8b18a, #e8d0a4);
			}
		}
	}
 
</style>
