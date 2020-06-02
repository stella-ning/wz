<template>
	<div class="box" >
		<section class="partOne" :style="`background:url(${partOneBg}) top center;background-size:cover`">
			<div class="timeLabel">
				<p>市场价:<del>￥299</del></p>
				<p>限时免费</p>
			</div>
			<div class="privilegeBox" @click="getCard">
				<div class="themeTitle flex align-center">
					<span class="left" :style="`background:url(${leftT}) center right no-repeat;background-size:contain;`"></span>
					<span class="center">6大会员特权</span>
					<span class="right" :style="`background:url(${rightT}) center left no-repeat;background-size:contain;`"></span>
				</div>
				<div class="themeList privilege">
					<ul class="flex align-center justify-between">
						<li class="themeContent" v-for="(item,index) in homeDatas.privilege" :key="index">
							<div class="imgBox">
								<img :src="item.logo" alt="">
							</div>
							<p class="title">{{item.title}}</p>
							<p class="subTitle">{{item.subTitle}}</p>
							<p class="label">免费领取</p>
							<span v-if="item.label" class="tipsLabel">HOT</span>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<section class="partTwo" @click="getCard" :style="`background:url(${partTwoBg}) top center;background-size:cover`">
			<div class="themeTitle flex align-center">
				<span class="left">
					<i></i>
				</span>
				<span class="center">超低会员折扣</span>
				<span class="right">
					<i></i>
				</span>
			</div>
			<div class="themeList discount">
				<ul class="flex align-center justify-center">
					<li class="themeContent" v-for="(item,index) in homeDatas.discount" :key="index">
						<div class="imgBox">
							<img :src="item.logo" alt="">
						</div>
						<p class="title">{{item.title}}</p>
						<p class="subTitle">{{item.subTitle}}</p>
						<span v-if="item.label" class="tipsLabel">HOT</span>
					</li>
				</ul>
			</div>
			<div class="themeTitle flex align-center">
				<span class="left">
					<i></i>
				</span>
				<span class="center">吃喝玩乐折扣</span>
				<span class="right">
					<i></i>
				</span>
			</div>
			<div class="themeList discount">
				<ul class="flex align-center justify-between">
					<li class="themeContent" v-for="(item,index) in homeDatas.eatDiscount" :key="index">
						<div class="imgBox">
							<img :src="item.logo" alt="">
						</div>
						<p class="title">{{item.title}}</p>
						<p class="subTitle">{{item.subTitle}}</p>
						<span v-if="item.label" class="tipsLabel">NEW</span>
					</li>
				</ul>
			</div>
		</section>
		<section class="partThree">
			<div class="globalBrand" @click="getCard">
				<div class="header">
					全球大牌优卖
				</div>
				<div class="brandBox">
					<ul class="brandList">
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
				</div>
			</div>
			<div class="coupon" @click="getCard">
				<div class="header">
					会员50元优惠
					<p>会员专享最高50元现金，下单即领！</p>
				</div>
				<div class="couponBox">
					<div class="imgBox">
						<img :src="coupon" alt="">
					</div>
					
				</div>
			</div>
			<div class="newVipGoods">
				<div class="header">
					新人0元购<span style="font-size:18px">（下单全额返现）</span>
				</div>
				<div class="goodsBox" @click="getCard">
					<ul class="goodsList flex align-center justify-center">
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
					</ul>
				</div>
			</div>
			<div class="vipGoods">
				<div class="header">
					会员1元秒杀专享
					<ul class="timeList flex align-center justify-between">
						<li :class="startTime >= 10 && startTime < 12 ?'doing':''" @click="tabClick(0,'10:00')">
							<p class="time">10:00</p>
							<p class="label">{{text10}}</p>
						</li>
						<li :class="startTime >= 12 && startTime < 14 ?'doing':''" @click="tabClick(1,'12:00')">
							<p class="time">12:00</p>
							<p class="label">{{text12}}</p>
						</li>
						<li :class="startTime >= 14 && startTime < 18 ?'doing':''" @click="tabClick(2,'16:00')">
							<p class="time">16:00</p>
							<p class="label">{{text16}}</p>
						</li>
						<li :class="startTime >= 18 && startTime < 22 ?'doing':''" @click="tabClick(3,'20:00')">
							<p class="time">20:00</p>
							<p class="label">{{text20}}</p>
						</li>
						<li :class="startTime >= 22?'doing':''" @click="tabClick(4,'22:00')">
							<p class="time">22:00</p>
							<p class="label">{{text22}}</p>
						</li>
					</ul>
				</div>
				<div class="goodsBox" @click="getCard">
					<ul class="goodsList flex align-center justify-between">
						<li  v-for="(item,index) in vipGoods" :key="index">
							<div class="goodCon">
								<div class="imgBox">
									<img :src="item.itemPic" alt="">
								</div>
								<p class="goodName">{{item.itemName}}</p>
								<div class="btn">付多少全返</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<section class="partFour" @click="getCard">
			<div class="rightsBox">
				<div class="rightsCon">
					<div class="header">更多特权：健康、出行旅游权益</div>
					<div class="themeList rights">
						<ul class="flex align-center">
							<li class="themeContent" v-for="(item,index) in homeDatas.rights" :key="index">
								<div class="imgBox">
									<img :src="item.logo" alt="">
								</div>
								<p class="title">{{item.title}}</p>
								<p class="subTitle">{{item.subTitle}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="persion">
				<div class="header">
					<!-- style="color:#FF6E4E;" -->
					<p>“当前，已<span>有2700735</span>位购物达人 </p>
					<p>正在使用<span style="color:#F7C786">麒麟卡</span>享受特权”</p>
				</div>
				<div class="tx">
					<img :src="tx" alt="">
				</div>
			</div>
		</section>
		<section class="agreement">
			<div class="agreementBox" @click="isShowVip = true">
				<p>了解会员章程 <van-icon class="arrowIcon" name="arrow" /></p>
			</div>
			<div class="company">
				<p>广州飞宇互联网科技有限公司</p>
				<p>粤ICP备19140246号-1</p>
			</div>
		</section>

		<footer @click="getCard" :style="`background:url(${footerBtn}) top left no-repeat;background-size:contain;`">
			<p><b>立即免费领卡</b>（{{new Date(time).Format('MM月dd日')}}截止）</p>
			<p>一次办理  终身可用</p>
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
		<van-popup v-model="isShowVip" round lock-scroll lazy-render :style="{ width: '90%',padding:'0 1.25rem',height:'70vh' }">
			<div class="textBox">
				<p class="title">
					本协议签订地：广州天河区
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					提示条款
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					欢迎您签署本《超惠省麒麟卡<span>特权服务协议》（下称</span>“本协议”）并使用超惠省麒麟卡特权平台服务！
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					超惠省麒麟卡及超惠省APP<span>客户端、微信公众号、</span><span>WAP</span><span>端等（以下统称为“</span>超惠省<span>平台</span>”、“超惠省”或“本平台”）在此特别提醒您仔细阅读（未成年人应在其法定监护人的陪同下阅读）《超惠省麒麟卡<span>特权会员章程》（下称</span>“本协议”）中的各个条款，尤其是以粗体并下划线标示的条款，包括但不限于免除或者限制麒麟卡责任的条款、对用户权利进行限制的条款以及约定争议解决方式、司法管辖的条款。您与超惠省均应当严格履行本协议以其补充协议所约定的各项义务，如发生争议或者纠纷，双方可以友好协商解决；协商不成的，任何一方均可向本协议签订地有管辖权的人民法院提起诉讼。本协议签订地为广州市天河区。
				</p>
				<p class="MsoNormal">
					您如果通过登录超惠省申请页面或者超惠省提供的其他申请渠道注册用户账号，完成我们的注册流程或使用我们的服务，即视为您完全同意本协议，愿意接受本协议所有及任何条款的约束。
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					1.<span>名词解释</span>
				</p>
				<p class="MsoNormal">
					除您与超惠省另外约定外，本协议以及补充协议当中的下列名词均采用如下解释。
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					超惠省平台：指超惠省享有全部著作权以及其他知识产权的、提供给您以及其他用户登录和使用的超惠省麒麟卡、以及对应的超惠省APP<span>、微信公众号及</span><span>WAP</span><span>端等。</span>
				</p>
				<p class="MsoNormal">
					超惠省服务协议：即本协议，指您与超惠省订立的旨在约定您申请超惠省麒麟卡、激活、登录、使用本平台，以及通过本平台下达订单、购买商品、支付贷款、收取商品等整个网购过程中，您与超惠省之间的权利、义务的书面合同。
				</p>
				<p class="MsoNormal">
					商品：是销售商通过本平台向您推荐并进行销售的具体商品或服务的统称。
				</p>
				<p class="MsoNormal">
					经销商：可能是超惠省的运营主体或关联公司，也可能是入驻超惠省的第三方商家。我们会以恰当方式向您展示相关主体信息。
				</p>
				<p class="MsoNormal">
					订单：指由本平台生成的记录您通过本平台所购买的商品的名称、品牌、价款、折扣等交易信息的表格。这份文件将被用为所有可能发生的与您购买有关的询问。请求和争议的参考。
				</p>
				<p class="MsoNormal">
					超惠省麒麟卡会员卡号：指您通过超惠省特权提供的麒麟卡会员卡注册渠道，注册获得并可据以登录本平台的会员卡号。
				</p>
				<p class="MsoNormal">
					超惠省平台规则：本平台在平台内已经发布及后续发布的各类规则、实施细则、解读、产品流程说明、公告等。
				</p>
				<p class="MsoNormal">
					2.<span>用户使用</span>超惠省麒麟卡规则
				</p>
				<p class="MsoNormal">
					您确认，在您开始申请注册超惠省麒麟卡会员，使用超惠省平台服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前速与您行为相适应的民事行为能力，则您的监护人应依照法律规则承担因此而造成的一切后果。此外，您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象、否则您可能无法正常注册及使用超惠省平台服务
				</p>
				<p class="MsoNormal">
					您可以通过登录超惠省APP<span>申请页申请</span>超惠省麒麟卡，并按照相应指引激活超惠省麒麟卡，一经激活，您即可以凭借卡号或激活码，或采用本平台提供的其他登录方式登录以及使用本平台。
				</p>
				<p class="MsoNormal">
					您成功获取超惠省麒麟卡会员卡后，如果需要使用该会员卡从本平台购买商品的，还应当填写收货人、收货地址和手机号码。除此之外，您还可以按照本平台相关页面的说明填写其他的个人信息，上述个人信息的填写并非您购买商品所必须，您可以选择填写与否。为使您更好的使用超惠省麒麟卡平台的各项服务，保障您的账户安全，超惠省平台可要求您按平台规定完成实名认证。
				</p>
				<p class="MsoNormal">
					超惠省平台原则上只允许每位用户使用一个超惠省平台账号。如有证据证明或根据超惠省平台规则判断您存在不当注册或不当使用多个超惠省平台账户的情形，超惠省平台可以采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如给超惠省平台及相关方造成损失的，您还应承担赔偿责任。
				</p>
				<p class="MsoNormal">
					您务必妥善保管您的超惠省麒麟卡会员卡号或激活号、登录密码、支付密码（如有）及您填写的所有个人信息。账户因您主动泄露或因您遭受他人攻击、欺诈等行为导致的损失及后果，本平台并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。除本平台存在过错外，您应对您账户项下所有的行为结果（包括但不限于在线签署各类协议、提供信息、购买商品及服务、发表评论、售后处理决定等）负责。
				</p>
				<p class="MsoNormal">
					为了防止您及其他用户的会员卡或其项下的个人信息泄露或被他人窃取，超惠省可能会随时采取计算机病毒查杀技术、计算机加密技术等措施进行保护。对此，您完全同意并接受，但这并不能免除您对会员卡号及其项下的个人信息所负有的妥善保管义务。
				</p>
				<p class="MsoNormal">
					由于超惠省平台超惠省麒麟卡会员卡号关联您的个人信息及平台商业信息，您的超惠省麒麟卡仅限您本人使用。否则本平台有权追究您的违约责任
				</p>
				<p class="MsoNormal">
					您充分理解并完全同意：根据您的会员卡及该卡号绑定的手机号项下的商品购买记录及其他相关信息，销售商如果发现或者合理怀疑您此前或者当次通过本平台提供的其他网购渠道购买的商有出现并非用于个人消费或者使用用途的情形，对于您的这个行为用户账号的商品购买需求，销售商有权不予接受；您如果已经下达订单，销售商有权不予接受订单；销售商如果已经接受订单的，有权单方面解除并不予发货。而且，超惠省平台视情况还有权冻结您的这个用户账号，使之无法通过本平台及超惠省提供的其他网购渠道下达订单、购买商品
				</p>
				<p class="MsoNormal">
					您可以通过超惠省平台申请超惠省麒麟卡。我们在此善意的提醒您，超惠省麒麟卡<span>致力于为您带来更加优惠的网购权益，且终身免年费。发货前，可关注公众号</span>“超惠省<span>优选</span>”在“订单查询”里申请退款；发货后，不支持退款退货，请确认后再下单。
				</p>
				<p class="MsoNormal">
					3.<span>商品描述与营销信息</span>
				</p>
				<p class="MsoNormal">
					商品描述：相关商品信息均由销售商提供，超惠省尽可能根据所接收到的商品信息准确、详尽地描述每一件商品
				</p>
				<p class="MsoNormal">
					营销信息：您一经注册超惠省麒麟卡会员卡，即视为您同意超惠省麒麟卡通过短信后电子邮箱的方式向您注册时填写的手机号码或者电子邮箱发送相应的商品广告信息、促销优惠等营销信息；您如果不同意发送，您可以通过相应的退订功能进行退订
				</p>
				<p class="MsoNormal">
					4.<span>商品价格</span>
				</p>
				<p class="MsoNormal">
					本平台上显示的所有价格都是以人民币为计价单位，包括所有的税费，但不包括运费（除非特效说明）。结账之前运费会自动计算包括在订单总价之内。在商品详情页面里会您可以找到所有的相关信息，支付价格为下订单时的有效价格
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					5.<span>订单</span>
				</p>
				<p class="MsoNormal">
					超惠省<span>保留对单个商品的区域出售数量、规格进行限制的权利，有权对单个订单的商品购买数量及同一</span>IP<span>地址对同类商品购买数量、规格进行限制</span>
				</p>
				<p class="MsoNormal">
					<span>根据您填写的订单信息，系统将会生成一份包含您的订单的必要信息的电子订单，是该次交易的有效证据，这份文件被认为是所有的发货、问题、退货和争议事项的参考，所以您必须非常仔细地查看清楚这些信息并纠正一切坑的错误。点击</span>“去结算”意味着您认可订单表格中有包含的所有信息都是正确和完整的
				</p>
				<p class="MsoNormal">
					如果您填写的收货人与用户本人不一致的，收货人的行为和意思表示视为您的行为的意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任
				</p>
				<p class="MsoNormal">
					6.<span>合同成立</span>
				</p>
				<p class="MsoNormal">
					当您作为消费者为生活消费需要下单并支付货款的情况下，您在货款支付成功后即视为您与经销商之间就已支付货款部分的订单成立合同关系
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					7.<span>商品缺货</span>
				</p>
				<p class="MsoNormal">
					由于市场变化及各种以合理商业努力难以控制因素的影响，无法避免的会出现您提交的订单信息中的商品出现缺货、价格标示错误等情况。如您下单所购买的商品出现以上情况，您有权取消订单，销售商亦有权自行取消订单，若您已经付款，则将为您办理退款
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					8.<span>配送服务</span>
				</p>
				<p class="MsoNormal">
					<span>您所订购的商品由两种配送方式：（</span>1<span>）有</span>超惠省<span>选择具有运输服务资质的公司为您提供运输代理服务；（</span>2<span>）有销售商选择具有提供运输服务资质的公司为您提供运输代理服务。基于配送合作、配送秩序的考虑，原则上</span>超惠省及销售商无法按照您的指定由某个物流服务进行配送，除非超惠省平台页面有明确说明
				</p>
				<p class="MsoNormal">
					&nbsp;
				</p>
				<p class="MsoNormal">
					9.<span>商品收取</span>
				</p>
				<p class="MsoNormal">
					您所订购的商品将被送至订单表格上注明的送货地址。无论说明原因商品不能送达到送货地址的，销售商将会尽快跟您取得联系
				</p>
				<p class="MsoNormal">
					在您收到订单商品时，您书面签收则证明您收到了完好状态的商品。如果包装出现破损，请拒收
				</p>
				<p class="MsoNormal">
					您在本平台购买的商品由配送公司为您完成订单交付的，系统或者单据记录的签收时间为交付时间；您购买服务的，生成的电子或者食物凭证中载明的时间为交付时间
				</p>
				<p class="MsoNormal">
					如果您收到的商品与送货单中的商品列表不符，您可以按照本平台对外公布且正在实施退货政策及退货程序，将相应的商品退回销售商
				</p>
				<p class="MsoNormal">
					10.<span>退回订单</span>
				</p>
				<p class="MsoNormal">
					对于使用七天无理由退货的商品，您如果需要退货的，请在收到商品之日起七天内，按照不影响商品正常使用及再次销售的原则，将您需要退货的商品及其包装、赠品、送货单、税务发票（如有）等送货时一并交付给您的物品和资料，全部完好无损的退回销售商。否则，销售商有权不予退货。除有相反的证据外，退货的日期以销售商收到的包裹上显示的寄出邮戳所显示的日期为准。对于某些商品，如在商品详情页面及有关退货政策中已提示该类商品不予以退货的，您的下达订单行为将被视为您已经同意接受销售商对此商品不予退货的安排
				</p>
				<p class="MsoNormal">
					销售商有权拒绝不符合超惠省对外公布实施的退货政策所规定的条件的所有退货。仅当销售商确认以上规定的这些条款得到了适时的遵从后，才会启动返还货款金额的程序
				</p>
				<p class="MsoNormal">
					11.<span>知识产权</span>
				</p>
				<p class="MsoNormal">
					超惠省对本平台的内容享有全部知识产权，包括但不限于：编码、商标、服务标志、商号、图形、美术品、照片、肖像、文字内容、音频片段、按钮图标以及计算机软件、标志、数码下载、数据汇编都是超惠省或者其内容提供者的财产，受到中华人民共和国版权相关法律法规的保护
				</p>
				<p class="MsoNormal">
					您仅在符合本平台使用目的的前提下被许可浏览和使用本平台，即以个人名义浏览信息和购买供个人使用商品的目的。禁止其他方式的使用，包括但不限于以下方式：复制、修改、销售、传送、改版、删除、添加、展览、记入或者演示本平台及商品，且经超惠省允许将本平台当中的咨询转发至朋友圈等第三方媒体的除外
				</p>
				<p class="MsoNormal">
					您不得进行任何侵犯本平台或其他用户合法权益的行为，超惠省<span>平台保留追究您法律责任的权利。这些将被追究法律责任的行为包括但不限于</span>:<span>（</span><span>1</span><span>）修改、复制或发行本平台（</span><span>2</span><span>）进行编译。反编译、反向工程或者以其他方式破解本平台的行为；（</span><span>3</span><span>）使用本平台外挂或利用本平台当中的</span><span>BUG</span><span>来获得不正当的权益；（</span><span>4</span><span>）利用劫持域名服务器等技术非法侵入、破坏本平台的服务器软件系统，非法挤占本平台的服务器空间，或者实施其他的使用超负荷运行的行为；（</span><span>5</span><span>）修改、增加、删除、窃取、截留、替换本平台的客户端或服务区软件系统中的数据；（</span><span>6</span><span>）假冒</span>超惠省<span>或签约商家在本平台当中发布任何诈骗或虚假信息；（</span>7<span>）在本平台当中内置插件程序或者其他的第三方程序；（</span><span>8</span><span>）利用本平台故意传播恶意程序或计算机病毒。</span>
				</p>
				<p class="MsoNormal">
					12.<span>用户行为守则</span>
				</p>
				<p class="MsoNormal">
					您如果需要进行下载、安装、运行、登录或者使用本平台，您至少必须自备一部可供上网的电脑或智能移动终端，并确保其能够通过互联网与本平台服务器软件进行实时的信息（即电子数据）交互，相应的上网流量费等相关的费用由您自行承担。除非另有说明，超惠省存储在其服务器上的数据是超惠省平台和其他会员之间交易的唯一有效证据
				</p>
				<p class="MsoNormal">
					超惠省麒麟卡的发放及超惠省平台目前免费使用，仅收取超惠省麒麟卡寄送过程中的快递费用。超惠省麒麟卡有权基于运营成本等考虑，设置收费标准或服务、费率标准、收费对象及或收费时段。您如果不同意相关收费，则应当立即停止使用本平台；您如果继续使用，则视为您接受超惠省麒麟卡上述设置并支付相应的费用
				</p>
				<p class="MsoNormal">
					您充分理解：超惠省可能会不定期地通过发布软件升级包或软件补丁、在线升级等方式对本平台进行更新。更新的过程中，超惠省可能通过互联网调取，收集您的终端上的关于本平台的客户端软件版本信息、数据及其他有关资料，并自动进行替换、修改、删除或补充。此种行为是平台更新所必须的一种操作或步骤，您如果不同意超惠省进行此操作，请您不要进行更新；您更新的行为即视为您同意超惠省进行此种操作
				</p>
				<p class="MsoNormal">
					在超惠省开放评论专区的情况下，您有权在本平台当中发表评论，转发或者回复其他用户的评论，但您应确保评论真实、客观且不会侵犯任何第三方的著作权、肖像权、名誉权、隐私权等合法权利。而且，您不得借助本平台用户评论功能发布任何广告
				</p>
				<p class="MsoNormal">
					<span>您应当遵守国家相关法律法规，不得在本平台当中发表、转发或者传播含有下列内容的信息</span>:<span>（</span><span>1</span><span>）反对想法所确定的基本原则的；（</span><span>2</span><span>）危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一的；（</span><span>3</span><span>）损害国家荣誉和利益的；（</span><span>4</span><span>）煽动民族仇恨、民族歧视，破坏民族团结的；（</span><span>5</span><span>）破坏国家宗教政策，宣扬邪教和封建迷信的；（</span><span>6</span><span>）散布谣言，扰乱社会秩序，破坏社会稳定的；（</span><span>7</span><span>）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；（</span><span>8</span><span>）侮辱或者诽谤他人，侵害他人合法权益的；（</span><span>9</span><span>）含有法律、行政法规禁止的其他内容的。</span>
				</p>
				<p class="MsoNormal">
					您充分理解并完全同意：对您在本平台当中发表、转发或者传播的评论及其内容，包括但不限于视频、照片、文字内容，不论是否属于著作权意义上的作品，超惠省均享有永久的、无限期及地域限制的、完全免费的使用权。而且，对于上述评论或内容，超惠省<span>还享有下列各项权利，且实际形式时无需另行征得您的同意</span>:<span>（</span><span>1</span><span>）有权将其许可给任何第三方使用，被许可的第三方征得</span>超惠省同意后，既可以将其使用超惠省<span>网址或其</span>APP<span>等</span>超惠省<span>自有网络平台，也可以将其使用与被许可的第三方自有的网络平台。（</span>2<span>）有权对其进行修改、编辑、汇编、改编、分发或者以其他的方式进行使用；（</span><span>3</span><span>）既有权使用其全部内容，也有权使用其中的某一部分或某几部分内容；（</span><span>4</span><span>）有权单独以自己的名义，对未经</span>超惠省许可擅自使用上述评论或内容的第三方进行取证、证据保全、公证、提起诉讼或依法采取其他合法措施，以追究其法律责任。
				</p>
				<p class="MsoNormal">
					超惠省麒麟卡会员卡是超惠省授权您使用超惠省平台的唯一凭证。超惠省平台提供优惠均发至该会员卡项下，并且仅提供给活动授权的用户个人使用。您同意在符合法律法规及本条款规则的情况下使用个人账户，超惠省有可能在某些情况下（包括但不限于您违反有关法律法规规定或本协议或其他公开规则，或者您严重违背社会公德、提供虚假注册身份信息、经超惠省判定认为存在恶意退货或经本平台判定认为可能损害超惠省利益的不正当行为等）下暂时冻结、永久冻结、修改、删除您的个人账户或者采取其他处理措施。特别地，您了解并同意，超惠省用户管理系统中个人账户、积分、代金券等互联网产品及服务。非经超惠省同意，您不得将超惠省各项产品及服务用于商业用途（例如：销售超惠省麒麟卡会员卡、销售超惠省麒麟卡会员卡账户下积分、代金券等）。在使用超惠省服务过程中，如果您或您的个人账户刻意规避超惠省管理措施，或存在涉嫌欺诈、商业牟利、不恰当地使用服务或者其他违反本协议或其他公开规则的行为（包括但不限于使用作弊软件获取积分或代金券或贩卖个人账号、积分或代金券、盗号、协助盗号、非用于个人或家庭合理消费等），超惠省有权拒绝为您继续提供服务，永久冻结您的个人账户，并根据具体情况并有权对该等个人账号中因上述手段而产生、获得的一切虚拟产品予以清零
				</p>
				<p class="MsoNormal">
					如你的行为使超惠省或及其关联公司遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和借款、律师费、诉讼费等间接经济损失），您应赔偿超惠省或其关联公司的上述全部损失。如您的行为使超惠省以及其关联公司遭受第三人主张权利，麒麟卡及其关联公司可在对第三人承担金钱给付等义务后就全部损失向您追偿。如因其关联公司处于社会公共利益保护或消费者权益保护目的，可自您的任何超惠省账户中划扣相应款项进行支付
				</p>
				<p class="MsoNormal">
					13.<span>免责声明</span>
				</p>
				<p class="MsoNormal">
					<span>本平台与其他的在线使用互联网网址一样，也会收到各种不良信息、网络安全和网络故障问题的困扰，包括但不限于</span>:<span>（</span><span>1</span><span>）其他用户可能会发布诈骗或虚假信息，或者发布有谩骂、诅咒、诋毁、攻击内容的，或者含有淫秽、色情、下流、反动、煽动民族仇恨等让人反感、厌恶的内容的非法言论；（</span><span>2</span><span>）其他用户可能会发布一些侵犯您或者其他第三方知识产权、肖像权、姓名权、名誉权、隐私权或其他合法权益的图片、照片、文字等资料；面临着诸如黑客攻击、计算机病毒困扰、系统崩溃、网络掉线、网络缓慢、程序漏洞等问题的困扰和威胁</span>
				</p>
				<p class="MsoNormal">
					您充分理解到：上诉的各种不良信息、网络安全和网络故障问题，并不是超惠省或者本平台所导致的问题，您造成的任何损失，概由您自行承担，超惠省无需向您承担任何责任
				</p>
				<p class="MsoNormal">
					您完全同意：除法律法规规定或者您与超惠省约定需提前通知的以外，超惠省在解散、注销、合并、分立、或超惠省运营公司将本平台或其运营权转让给了第三方，或国家法律、法规、政策及国家机关的命令或者发生其他的诸如地震、火灾、海啸、台风、罢工、战争等不可抗力事件，或因您违反本协议所约定的用户守则等原因，可单方面中止或终止本协议的履行。超惠省平台将及时通知您
				</p>
				<p class="MsoNormal">
					<span>关于商品销售的免责声明</span>:<span>（</span><span>1</span><span>）不同手机终端设备观看页面会存在显示上的差异，</span>超惠省<span>上展示的商品在图像、颜色可能与实物存在差异。因此，所有显示的图片、视频和其他商品显示方法仅限于图示目的，在任何情况下不认为是合同的组成部分。（</span>2<span>）销售商保留根据市场价格波动随时修改上线商品价格的权利而无需事先通知您。在由于排版错误或销售商提供价格信息错误的情况下以不正确的价格列出来的商品，销售商有拒绝或取消任何以下任何不正确的价格列出来的商品所下订单的权利。由于合理的或不可避免的送货延迟会对您或第三方带来任何损失，</span>超惠省不负任何责任
				</p>
				<p class="MsoNormal">
					14.<span>个人信息保护</span>
				</p>
				<p class="MsoNormal">
					超惠省<span>可能通过本平台在您自愿选择服务或提供信息的情况下收集您的个人信息（简称</span>“个人信息”），例如您的姓名、细致、电话号码以及其他身份信息等。我们有可能会保留一些用户的使用习惯信息，用于更好地了解和服务于用户。这些数据将有利于我们开发出更符合用户需求的功能、信息和服务。我们基于为您提供服务的目的会将您的个人信息提供给交货人、收款机构等，我们会要求这些机构对您的个人信息予以严格保密及禁止另作他用
				</p>
				<p class="MsoNormal">
					超惠省将使用各种安全技术和程序防止您和其他用户个人信息的丢失、不当使用、未经授权阅览或披露。但您充分理解到：由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全
				</p>
				<p class="MsoNormal">
					15.<span>通知与送达</span>
				</p>
				<p class="MsoNormal">
					联系方式：您在注册成为超惠省麒麟卡会员，并接受超惠省平台服务时，您应该向超惠省提供真实有效的联系方式，对于联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态。您在注册申请超惠省麒麟卡生成的用与登录超惠省平台接受站内信、您制定的邮寄地址为您的法定联系地址或您提供的有效联系地址。您同意司法机关可采取以上一种或多种送达方式向您达法律文书，送达时间以上述方式适用于各个司法程序阶段。如进入诉讼程序的，包括但不限于一审、二审、再审、执行以及督促程序等。您应当保证所提供的联系方式是准确的、有效的，并进行实时更新。如果因提供联系方式不确切，或不及时告知变更后的联系方式，使法律文书无法送达或未及时送达，由您自行承担由此可能产生的法律后果
				</p>
				<p class="MsoNormal">
					16.<span>其他约定</span>
				</p>
				<p class="MsoNormal">
					超惠省保留随时地不需要理由的、单方面地修改本协议的权利。本协议一经修订即完全代替修订前的协议版本，并通过适当的方式向所有用户公开征求意见，您可以通过平台指定的方式向我们反馈意见。如果您不同意修改后协议版本，请您立即停止使用本平台，否则即视同您同意并完全接受修订后的协议版本
				</p>
				<p class="MsoNormal">
					您通过本平台购买非商品的服务产品（例如旅游产品）的，您与超惠省之间的权利义务亦参照本协议的相关约定
				</p>
				<p class="MsoNormal">
					由于互联网高速发展，您与超惠省签署的本协议列明的条款并不能完整覆盖您与超惠省所有的权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，超惠省平台隐私权政策、超惠省平台规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用超惠省平台服务，视为您同意上述补充协议
				</p>
				<p class="MsoNormal">
					您与超惠省均应当严格履行本协议及其补充协议所约定的各项义务，如发生争议或者纠纷，双发可以友好协商解决；协商不成的，任何一方均可向本协议签订地有管辖权的人民法院提前诉讼
				</p>
				<p class="MsoNormal">
					本协议及其补充协议签订地为广东省广州市天河区，均受中华人民共和国法律、法规管辖
				</p>
				
			</div>
			<div class="textBtn">
				<van-button class="btn" type="primary" size="large" @click="isShowVip = false">我已阅读</van-button>
			</div>
		</van-popup>
		<serve v-model="showServe"></serve>

	</div>
</template>

<script>

import mHeader from '@/components/common/header';
import addressForm from '@/components/address/addressForm';
import serve from '@/components/service/customerService';
import cardDatas from './cardDatas';
export default {
	components:{
		mHeader,
		addressForm,
		serve,
	},
	data () {
		return {
			homeDatas:cardDatas.datas,
			partOneBg:require('@/assets/images/partOneBg.png'),
			partTwoBg:require('@/assets/images/partTwoBg.png'),
			footerBtn:require('@/assets/images/footerBtn.png'),
			coupon:require('@/assets/images/home/coupon.png'),
			leftT:require('@/assets/images/home/leftT.png'),
			rightT:require('@/assets/images/home/rightT.png'),
			tx:require('@/assets/images/home/tx.png'),
			shareArrow:require('@/assets/images/shareArrow.png'),
			serveBtn:require('@/assets/images/serveBtn.png'),
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
			//isCardSimple:isCardSimple,
			userAgent:'',
		}
	},
	created(){
		WxCompat.wxSetTitle = '麒麟卡'
		// if(getUrlArgs('device') && isCardSimple){
		// 	APPTool.addJsCallback(this, 'routerChange', {
		// 		to:'/card/cardSimple',
		// 		from:'/card/index',
		// 		toQuery:{
		// 			needFinish : true
		// 		}
		// 	})
			
		// }
	},
	mounted() {
		let currentTime = new Date();
		this.time = currentTime.getTime()+24*60*60*1000;
		this.startTime = Number(new Date(currentTime).Format('hh'));
		this.getGoodsList('newVip')
		this.text10 = this.cumputedText(10,12);
		this.text12 = this.cumputedText(12,14);
		this.text16 = this.cumputedText(16,18);
		this.text20 = this.cumputedText(20,22);
		this.text22 = this.cumputedText(22,24);
		if(this.startTime >= 12 && this.startTime < 14){
			this.getGoodsList('vip','12:00');
		}else if(this.startTime >= 14 && this.startTime < 18){
			this.getGoodsList('vip','16:00');
		}else if(this.startTime >= 18 && this.startTime < 22){
			this.getGoodsList('vip','20:00');
		}else if(this.startTime >= 22 && this.startTime < 24){
			this.getGoodsList('vip','22:00');
		}else{
			this.getGoodsList('vip','10:00');
		}
		
	},
	methods: {
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
		tabClick(index,time){
			//$('.timeList li').eq(index).addClass('doing').siblings().removeClass('doing');
			this.getGoodsList('vip',time);
		},
		getCard(){
			//判断是否是微信浏览器打开
			if(WxCompat.isWeixinClient()){
				this.isWxOpen = true;
				return;
			}
			this.show = true;
			this.getImgCode()

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
			this.request.post(this.urls.sendCode,params,true).then(res=>{
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
				platformType:2,//平台类型。1：cms，2：wap，3：iOS，4：android
				channelName:this.channelName,
				
			};
			this.request.post(this.urls.userRegister,registerPa,true).then(res=>{
				this.userInfo.userId = res.resultData.userId
				this.userInfo.sessionKey = res.resultData.sessionKey
				this.$ls.set('userInfo',this.userInfo)
				//关联神策登录
				STATS_SA.login(this.userInfo);
				if(res.resultData.user.payCardTime > 0){
					this.$router.push('/order/orderDetail')
				}else{
					this.$router.push('/address/addressInfo')
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
			
		}

	},
	computed: {
		isShowCode(){
			if(checkPhoneMob(this.userInfo.userPhone)){
				return true;
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	.box{
		background:#000;
		.themeTitle{
			width:100%;
			//height:5.75rem /* 92/16 */;
			height:vw(92);
			.left{
				flex:1;
				height:.875rem /* 14/16 */;
			}
			.center{
				flex:1.7;
				font-size:1.5625rem /* 25/16 */;
				color:rgba(239,41,6,1);
				background:linear-gradient(-34deg, rgba(239,197,141,1) 0%, rgba(242,217,184,1) 100%);
				-webkit-background-clip:text;
				-webkit-text-fill-color:transparent;
				text-align: center;
			}
			.right{
				flex:1;
				height:.875rem /* 14/16 */;
			}
		}
		.themeList{
			ul{
				flex-flow:row wrap;
				li{
					margin-bottom:1.25rem /* 20/16 */;
					position: relative;
					.title{
						color:#E1AF7D;
						font-size:.875rem /* 14/16 */;
						font-weight: 600;
					}
					.subTitle{
						color:#E1AF7D;
						font-size:.75rem /* 12/16 */;
						font-weight: 400;
						margin-top:.1875rem /* 3/16 */;
						padding:0 .5rem /* 8/16 */;
					}
					.label{
						display:inline-block;
						background:#393939;
						font-size:10px;
						color:#DFD3B8;
						border-radius:.9375rem /* 15/16 */;
						padding:1px 4px;
					}
					.tipsLabel{
						width:2.625rem /* 42/16 */;
						height:1rem /* 16/16 */;
						background:linear-gradient(-5deg,rgba(240,29,4,1),#ff8445);
						border-radius:.125rem /* 2/16 */;
						font-size:.75rem /* 12/16 */;
						color:#fff;
						position:absolute;
						top:-.5rem /* 8/16 */;
						right:.125rem /* 2/16 */;
					}
				}
			}
		}
		.partOne{
			width:100%;
			height:auto;
			padding-top:2.1875rem /* 35/16 */;
			.timeLabel{
				width:5.9375rem /* 95/16 */;
				height:2.8125rem /* 45/16 */;
				background:linear-gradient(-10deg,rgba(240,29,4,1),rgba(233,90,16,1));
				border-radius:23px 23px 23px 0px;
				margin-top:6.25rem /* 100/16 */;
				margin-left:16.0625rem /* 257/16 */;
				text-align: center;
				padding-top:.3125rem /* 5/16 */;
				p{
					&:nth-child(1){
						font-size:.75rem /* 12/16 */;
						color:#000;
						line-height:.75rem /* 12/16 */;
					}
					&:nth-child(2){
						font-size:1.125rem /* 18/16 */;
						color:#fff;
					}
				}
			}
			.privilegeBox{
				margin-top:12.9375rem /* 207/16 */;
				.privilege{
					li.themeContent{
						width:33.33%;
						text-align: center;
					}
					.imgBox{
						width:3.125rem /* 50/16 */;
						height:3.125rem /* 50/16 */;
						margin:0 auto .3125rem /* 5/16 */;
						img{
							max-width: 100%;
						}
					}
					.tipsLabel{
						right:1.25rem /* 20/16 */;
					}
				}
			}

		}
		.partTwo{
			.themeTitle{
				.left,.right{
					height:auto;
				}
				.left{
					text-align: right;
					padding-right:.625rem /* 10/16 */;
				}
				.right{
					padding-left:.625rem /* 10/16 */;
				}
				.left i,.right i{
					display:inline-block;
					width:2.5rem /* 40/16 */;
					height:.0625rem /* 1/16 */;
					background: #F2D9B8;
					vertical-align: middle;
				}
			}
			.discount{
				li.themeContent{
					width:25%;
					text-align: center;
					.subTitle{
						color:#DFD3B8;
					}
				}
				.imgBox{
					width:2.8125rem /* 45/16 */;
					height:2.8125rem /* 45/16 */;
					margin:0 auto .3125rem /* 5/16 */;
					img{
						max-width: 100%;
					}
				}
			}
		}
		.partThree{
			background:#000;
			padding-top:.625rem /* 10/16 */;
			.header{
				width:100%;
				height:7.5rem /* 120/16 */;
				border-radius:.625rem /* 10/16 */ .625rem /* 10/16 */ .9375rem /* 15/16 */ .9375rem /* 15/16 */;
				padding-top:1.125rem /* 18/16 */;
				font-size:1.375rem /* 22/16 */;
				color:#fff;
				text-align: center;
				p{
					font-size:.875rem /* 14/16 */;
				}
				
			}
			.globalBrand{
				.header{
					background:linear-gradient(-10deg,rgba(253,151,123,1),rgba(255,177,156,1));
				}
				.brandBox{
					position:relative;
					height:21.875rem /* 350/16 */;
					margin:0 .625rem /* 10/16 */;
					.brandList{
						background:#fff;
						border-radius: .625rem /* 10/16 */;
						position: absolute;
						left:0;
						top:-4rem;
						padding:.9375rem /* 15/16 */ 0 .3125rem /* 5/16 */;
						li{
							float:left;
							width:10.12rem /* 162/16 */;
							height:5.3125rem /* 85/16 */;
							box-shadow:0px 0px 7px 1px rgba(69,54,35,0.1);
							border-radius:.3125rem /* 5/16 */;
							margin-left:.625rem /* 10/16 */;
							margin-bottom:.625rem /* 10/16 */;
							.imgBox{
								flex:1;
								img{
									width:2.8125rem /* 45/16 */;
									height:2.8125rem /* 45/16 */;
									margin:0 auto;
								}
							}
							.content{
								flex:1.5;
								margin-left:.3125rem /* 5/16 */;
								p{
									color:#1A1A1A;
									font-size:.875rem /* 14/16 */;
									font-weight: 400;
									line-height:1.875rem /* 30/16 */;
								}
								.btn{
									width:4.75rem /* 76/16 */;
									height:1.3125rem /* 21/16 */;
									line-height:1.3125rem /* 21/16 */;
									text-align: center;
									background:linear-gradient(0deg,rgba(216,177,138,1),rgba(232,208,164,1));
									border-radius:1.3125rem /* 21/16 */;
									font-size:.75rem /* 12/16 */;
									color:#1A1A1A;
									font-weight: 400;
									margin-top:.3125rem /* 5/16 */;
								}
							}
						}
					}
				}
				
			}
			.coupon{
				.header{
					background:linear-gradient(0deg,rgba(58,130,105,1),rgba(44,125,95,1),rgba(36,151,116,1),rgba(82,210,160,1));
				}
				.couponBox{
					position:relative;
					height:6rem;
					.imgBox{
						width: 22.375rem /* 358/16 */;
						height: 8rem /* 128/16 */;
						position: absolute;
						top: -3.5rem;
						left: .625rem /* 10/16 */;
						img{
							display:block;
							width: 22.375rem /* 358/16 */;
						}
					}
				}
			}
			.newVipGoods{
				.header{
					background:linear-gradient(-10deg,rgba(16,161,183,1),rgba(39,201,211,1));
				}
			}
			.vipGoods{
				.header{
					height:10rem /* 160/16 */;
					background:linear-gradient(-10deg,rgba(119,166,253,1),rgba(84,112,253,1));
					.timeList{
						padding:.75rem /* 12/16 */ .9375rem /* 15/16 */ 0;
						
						.time{
							color:#1A1A1A;
							font-weight: bold;
							font-size:1rem /* 16/16 */;
							margin-bottom:.3125rem /* 5/16 */;
						}
						.label{
							color:#666;
							font-size:.75rem /* 12/16 */;
							font-weight: 400;
							padding:.0625rem /* 1/16 */ .3125rem /* 5/16 */;
							
						}
						.doing{
							.label{
								background:linear-gradient(-10deg,rgba(240,29,4,1),rgba(233,90,16,1));
								border-radius:.5rem /* 8/16 */;
								color:#fff;
							}
						}
					}
				}
				.goodsBox{
					height:10.5rem;
					.goodsList{
						top:-3rem;
					}
				}
			}
			.goodsBox{
				position:relative;
				height:25rem;
				margin:0 .625rem /* 10/16 */;
				
				.goodsList{
					background:#fff;
					border-radius: .625rem /* 10/16 */;
					position: absolute;
					left:0;
					top:-4rem;
					padding:.9375rem /* 15/16 */ .625rem /* 10/16 */ .3125rem /* 5/16 */;
					flex-flow:row wrap;
					width:100%;
					li{
						width:6.5625rem /* 105/16 */;
						box-shadow:0px 0px 7px 1px rgba(69,54,35,0.1);
						border-radius:.3125rem /* 5/16 */;
						margin-right:.625rem /* 10/16 */;
						margin-bottom:.625rem /* 10/16 */;
						text-align: center;
						padding-bottom:.8125rem /* 13/16 */;
						&:nth-child(3n){
							margin-right: 0;
						}
						.imgBox{
							width:5.9375rem /* 95/16 */;
							height:5.9375rem /* 95/16 */;
							margin:.3125rem /* 5/16 */;
							img{
								max-width: 100%;
							}
						}
						.goodName{
							width: 100%;
							padding: .625rem /* 10/16 */ .3125rem /* 5/16 */ .25rem /* 4/16 */;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							font-size:.875rem /* 14/16 */;
							color:#1A1A1A;
							font-weight: 400;
						}
						.goodPrice{
							color:#FF2042;
							font-size:1.125rem /* 18/16 */;
							font-weight: bold;
							margin-bottom:.5rem /* 8/16 */;
						}
						.btn{
							width:4.75rem /* 76/16 */;
							height:1.3125rem /* 21/16 */;
							line-height:1.3125rem /* 21/16 */;
							text-align: center;
							background:linear-gradient(0deg,rgba(216,177,138,1),rgba(232,208,164,1));
							border-radius:1.3125rem /* 21/16 */;
							font-size:.75rem /* 12/16 */;
							color:#1A1A1A;
							font-weight: 400;
							margin:0 auto;
						}
					}
				}
			}
		}
		.partFour{
			background:#000;
			padding:0 .625rem /* 10/16 */;
			padding-bottom:.9375rem /* 15/16 */;
			.rightsBox{
				background:#1F120D;
				padding:.5rem /* 8/16 */;
				margin-bottom:.625rem /* 10/16 */;
				border-radius: .625rem /* 10/16 */;
				.rightsCon{
					border:.0625rem /* 1/16 */ solid #F2D7B4;
					border-radius:.125rem /* 2/16 */;
					text-align: center;
					.header{
						font-size:1.125rem /* 18/16 */;
						color:rgba(255,255,255,1);
						background:linear-gradient(0deg,rgba(232,208,164,1) 0%, rgba(216,177,138,1) 100%);
						-webkit-background-clip:text;
						-webkit-text-fill-color:transparent;
						padding-top:1.4375rem /* 23/16 */;
						padding-bottom: 2.25rem /* 36/16 */;
					}
					.themeList ul li{
						width:25%;
						text-align: center;
						.imgBox{
							width:2.8125rem /* 45/16 */;
							height:2.8125rem /* 45/16 */;
							margin:0 auto .3125rem /* 5/16 */;
							img{
								max-width: 100%;
							}
						}
						.title{
							color:#E2C59B;
						}
						.subTitle{
							color:#C5B99E;
						}
					}
				}
			}
			.persion{
				background: rgba(228, 201, 158, 0.2);
				border-radius: .625rem /* 10/16 */;
				text-align: center;
				.header{
					padding-top:2.3125rem /* 37/16 */;
					padding-bottom:2.125rem /* 34/16 */;
					color:#fff;
					font-size:1.125rem /* 18/16 */;
				}
				.tx{
					padding:0 1.5625rem /* 25/16 */ 2rem /* 32/16 */;
					img{
						max-width:100%;
					}
				}
			}

		}
		.agreement{
			background:#000;
			padding:0 .625rem /* 10/16 */;
			padding-bottom:6.875rem /* 110/16 */;
			.agreementBox{
				background:rgba(228, 201, 158, 0.2);
				padding:.5rem /* 8/16 */;
				margin-bottom:.625rem /* 10/16 */;
				border-radius: .5rem /* 8/16 */;
				position: relative;
				color:#fff;
				.arrowIcon{
					position:absolute;
					top:.625rem /* 10/16 */;
					right:.625rem /* 10/16 */;
				}
			}
			.company{
				color:#DFD3B8;
				text-align:center;
			}
		}
		footer{
			position:fixed;
			left:0;
			bottom:0;
			width:100vw;
			height:3.75rem /* 60/16 */;
			text-align: center;
			padding-top:.75rem /* 12/16 */;
			padding-bottom:.5rem /* 8/16 */;
			box-sizing:border-box;
			p{
				&:nth-child(1){
					font-size:1rem /* 16/16 */;
					color:#1A1A1A;
				}
				&:nth-child(2){
					font-size:.625rem /* 10/16 */;
					color:#4D4D4D;
				}
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
