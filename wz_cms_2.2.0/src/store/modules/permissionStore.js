export default  {
    state: { 
        permissionList:[1]
    },
    mutations: {  
        setPermissionList(state,n){
            state.permissionList = n;
        }
    },
    actions: {  
      async getPermissionList(context) {
          return new Promise((resolve,reject)=>{
               var list = [{
                   label:'授信订单',
                   code:'A1',
               },{
                   label:'账单列表',
                   code:'A2'
                },{
                  label:'交易记录',
                  code:'B2'
             },{
                  label:'App升级',
                  code:'C2'
            },]
              context.commit('setPermissionList',list)
              resolve(list)
          })
      },
      async callConstantValue(context,constantName) {
        return new Promise((resolve,reject)=>{
            var paramJson = {
                constantName: constantName,
            }
            sendPost(urls.getConstantValue, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                resolve(resultJson.resultData.constantValue)
            });
           
        })
    },
    async callConstantValues(context,list) {
        return new Promise((resolve,reject)=>{
            var paramJson = {
                constantNames: list,
            }
            sendPost(urls.getConstantValues, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                resolve(resultJson.resultData)
            });
           
        })
    },

    },
    getters: {
        getPermissionList: state => {
             return 33333
        }
    },
}