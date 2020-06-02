<template>
	<van-list
		v-model="loading"
		:finished="finished"
		:offset="100"
		:immediate-check="false"
		:finished-text="isHasData?'- 已全部加载完毕 -':''"
		@load="onLoad"
	>
		<slot></slot>
	</van-list>
</template>

<script>
	import { mapActions } from 'vuex'  
	export default {
		props:{
			fetchData:Function,
			page:{
				type:Object,
				default:() => {
					return {
						current:1, //当前页
						pages:1 //总页数
					}
				}
			},
			isHasData:{
				default(){
					return true
				}
			}
		},
		data() {
			return {
				loading:false,
				finished:false
			}
		},
		created() {
			console.log('初始化');
			
		},
		methods: {
			onLoad() {
				console.log('加载');
				
				let current = parseInt(this.page.current) + 1
				//加载完毕
				if(current >= parseInt(this.page.pages)+1) {
					this.finished = true
					this.loading = false
					return false
				}
				this.loading = true
				this.fetchData(current).then(() => {
					this.loading = false
				})
			},

			//重置数据
			reset() {
				Object.assign(this.$data, this.$options.data())
			}
		}
	}
</script>

<style lang="scss" scoped>
  
</style>