// import { getByProductCondition } from '@/api'

const goods = {
  state: {
    list:[],
    page:{}
  },

  mutations: {
    SET_GOODS_LIST(state,data) {
      data.list.forEach(item => {
        try {
          let arr = JSON.parse(item.productMainPic1) || []
          item.productMainPic1 = arr
        } catch(e) {
          item.productMainPic1 = []
        }
        try {
          let arr = JSON.parse(item.productLongPic1) || []
          item.productLongPic1 = arr
        } catch(e) {
          item.productLongPic1 = []
        }
        try {
          let arr = JSON.parse(item.productColor) || []
          item.productColor = arr
        } catch(e) {
          item.productColor = []
        }
        try {
          let arr = JSON.parse(item.productSpecs) || []
          item.productSpecs = arr
        } catch(e) {
          item.productSpecs = []
        }
      })
      state.list = data.list
      state.page = {
        page:data.pageNum,
        total:data.total,
        size:data.pageSize
      }
    }
  },

  actions: {
    //获取品牌列表
    async getByProductCondition({ commit, rootState, state }, reset = false) {
      // if(state.list.length && !reset) {
      //   return false
      // } else {
      //   let params = Object.assign({},rootState.route.query)
      //   if(params.date) {
      //     params.startTime = new Date(params.date[0]).getTime()
      //     params.endTime = new Date(params.date[1]).getTime()
      //     delete params.date
      //   }
      //   params.pageSize = params.pageSize || 10
      //   params.pageNum = params.pageNum || 1
      //   let ret = await getByProductCondition(params)
      //   commit('SET_GOODS_LIST', ret.data.data)
      //   console.log('商品列表',ret)
      // }
    }
  }

};

export default goods