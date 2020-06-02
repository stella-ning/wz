<template>
	<van-dialog
		v-model="show"
		:value="value"
		title="客服信息"
		:showConfirmButton="false"
		closeOnClickOverlay
		style="border-radius:.625rem;"
	> 
		<van-icon @click="show = false" size="1.125rem" style="position: absolute;right: 3vw;top: 3vw;" name="cross" />
		<div class="dialog-box">
			<p class="color666">客服电话</p>
			<div class="flex align-center justify-between margin-top-1">
				<p class="font20 color333">{{servicePhone}}</p>
				<a class="orderCopyBth" :href="`tel:${servicePhone}`">拨打</a>
			</div>

			<p class="color666 margin-top-3">客服QQ</p>
			<div class="flex align-center justify-between margin-top-1">
				<p id="QQ" class="font20 color333">{{serviceQQ}}</p>
				<span class="orderCopyBth" id="copyQQ" @click="copy('copyQQ')" data-clipboard-target="#QQ">复制</span>
			</div>
		</div>
	</van-dialog>
</template>

<script>  
import ClipboardJS from 'clipboard'

export default {
	props:{
		value:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			show:false,
			copyQQ:'',
			copyWX:'',
			servicePhone:'',
			serviceQQ:'',
		}
	},
	mounted() {
		this.getConstant()
		this.show = this.value
		this.copyQQ = new ClipboardJS('#copyQQ')
		this.copyWX = new ClipboardJS('#copyWX')
	},
	
	methods: {
		copy(name) {
			let clipboard = this[name]
			clipboard.on('success',() => {
				this.$toast('已复制到剪切板')
			})
		},
		getConstant(constant){
			let param = {
				constantNames:['serviceQQ','servicePhone'],
			};
			this.request.post(this.urls.getConstantValue,param,false).then((res)=>{
				this.servicePhone = res.resultData.servicePhone
				this.serviceQQ = res.resultData.serviceQQ
			})

		}


	},

	watch: {
		value() {
			this.show = this.value
		},
		show() {
			this.$emit('input',this.show)
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog-box {
	padding: 5vw 5vw 10vw;
	.orderCopyBth{
		display: block;
		font-size:.75rem /* 12/16 */;
		border:1px solid #D1AA83;
		padding:.25rem .5rem;
		border-radius:.625rem /* 10/16 */;
		color:#D1AA83;
		line-height: 1;
	}
}
</style>