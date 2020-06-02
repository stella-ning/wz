<template>
	<div class="downLoad" :style="`background:url(${bg}) top center;background-size:100%${imgHeight}px;height:${imgHeight}px`">
		<footer  :style="`background:url(${footerBtn}) top left no-repeat;background-size:contain;`" @click="onDownLoad($event)">
			<p>立即下载</p>
		</footer>
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
	</div>
</template>

<script>
export default {
    data() {
        return {
			bg:require('@/assets/images/appDownLoadBg.png'),
			footerBtn:require('@/assets/images/footerBtn.png'),
			shareArrow:require('@/assets/images/shareArrow.png'),
			imgHeight:'',
			imgWith:document.body.clientWidth,
			androidDownloadUrl:'',
			iosDownloadUrl:'',
			isWxOpen:false,
		}
	},
	created(){
		this.initImage(); 
		this.callDownloadUrl(); 
	},
	methods: {
		initImage(){
			var img = new Image();
			img.src = this.bg;
			img.onload = ()=> {
				this.imgWith = document.body.clientWidth;
				this.imgHeight =  document.body.clientWidth * img.height /img.width;
			};
		},
		onDownLoad($event){
			if(WxCompat.isWeixinClient()){
				this.isWxOpen = true
				return;
			}
			STATS_SA.trackLinkClick($event,'appDownloadClick','App下载点击');
			if(isAndroidClient()){
				window.location.href = this.androidDownloadUrl;
			}
			else if(isIOSClient()){
				if(!isNull(this.iosDownloadUrl) && this.iosDownloadUrl.length > 10) {
					window.location.href = this.iosDownloadUrl;
				}
				else {
					this.$toast('无可用下载')
				}
				
			}
			else {
				this.$toast('请在手机打开');
			}
		},
		callDownloadUrl() {
			let paramJson = {
				constantNames:['androidDownloadUrl','iosDownloadUrl'],
			};
			this.request.post(this.urls.getConstantValue,paramJson,false).then((res)=>{
				this.androidDownloadUrl = res.resultData.androidDownloadUrl || '';
				this.iosDownloadUrl = res.resultData.iosDownloadUrl || '';
			})
		},
	}
 }
</script>

<style lang="scss" scoped>
	.downLoad{
		width:100vw;
		footer{
			position:fixed;
			left:0;
			bottom:0;
			width:100%;
			height:3.75rem /* 60/16 */;
			text-align: center;
			p{
				line-height: vw(60);
				font-size:vw(16);
				color:#1A1A1A;
				font-weight: 600;
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
	}
 
</style>
