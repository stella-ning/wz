import { getByBrandCondition } from '@/api'

const brand = {
  state: {
    list:[]
  },

  mutations: {
    SET_BRAND_LIST(state,data) {
      let list = data.list
      list.forEach(item => {
        try {
          item.mallBrand.brandPic = JSON.parse(item.mallBrand.brandPic)
        } catch {
          item.mallBrand.brandPic = {
            url:'',
            thumb:''
          }
        }
        
      })
      state.list = list
    }
  },

  getters: {
    //选择名称
    // brandList: state => {
    //   let list = state.list.filter(item => item.brandStatus == 1)
    //   return list
    // }
  },

  actions: {
    //获取品牌列表
    async getByBrandCondition({ commit, state, rootState }, reset = false) {
      if(state.list.length && !reset) {
        return false
      } else {
        let params = {
          brandStatus:1,
          isNeedProduct:1,
          pageSize:-1
        }
        let ret = await getByBrandCondition(params)
        commit('SET_BRAND_LIST', ret.data)
        console.log('品牌列表',ret)
      }
    }
  }

};

export default brand