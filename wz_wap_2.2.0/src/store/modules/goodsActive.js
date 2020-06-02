import Vue from 'vue'
const goodsActive = {
	state: {
		itemActId:'',
		actName:''
	},

	mutations: {
		setItemActId(state,id) {
			state.itemActId = id
		},
		setActName(state,name){
			state.actName = name
		}
	},

	getters: {

	},
	actions: {
		getItemActGroup({commit},itemActId,actName){
			return new Promise((resove,reject)=>{
				let params = {
					itemActId:itemActId,
				};
				Vue.prototype.request.post(Vue.prototype.urls.getItemActGroup,params,false).then(res=>{
					resove(res.resultData)
				})
			})	
		},

	}

};

export default goodsActive