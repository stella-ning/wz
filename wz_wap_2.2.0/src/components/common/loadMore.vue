<template>
	<van-list
		v-model="loading"
		:finished="finished"
		:offset="50"
		:immediate-check="false"
		:finished-text="isHasData?'- 已全部加载完毕 -':''"
		@load="onLoad"
	>
		<slot></slot>
	</van-list>
</template>

<script>
	export default {
		props:{
			fetchData:Function,
			current:Number,
			groupId:'',
			isHasData:{
				default(){
					return true
				}
			}
		},
		data() {
			return {
				loading:false,
				finished:false,
				timer:null
			}
		},
		created() {
			console.log('初始化');
			
		},
		methods: {
			onLoad() {
				//加载完毕
				if(this.finished) return
				console.log('加载下一页')
				this.fetchData(this.groupId,this.current).then((data) => {
					this.loading = false
					//加载完毕
					if(data.items.length == 0){
						this.finished = true
						this.loading = false
					}
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