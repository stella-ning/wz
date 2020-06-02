import BaseState from '../base/BaseState'
export default  class  jhState extends BaseState{
        constructor(channelName,pageName) { // 定义构造方法
            super(channelName,pageName,'jhState');
        }

        init(){
            // alert(FactoryTool.PageEnum.submitAddress)
            super.loadJs('http://yun.tuisnake.com/h5-mami/log.js',()=>{
                super.initSuccess();
            },{id:'send_log'});
        }

        addState(type){
            switch (type) {
                case 'paySuccess':
                    setTimeout(() => {
                        countLog.init(()=>{
                            super.addStateSuccess(type);
                        });
                    }, 200);
                    break;
                default:
                    break;
            }
           
            
        }
       
}
