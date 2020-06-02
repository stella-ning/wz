<template>
<div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
</div>
</template>
<script>
import Vue from 'vue'
export default {
    
    components: {},
    created() {
        let userAgent = navigator.userAgent;
        this.bindPhone();
        //获取用户信息
        //this.$store.dispatch('getUser');
        this.$router.beforeEach((to, from, next) => {
            var param = {
                to: to.fullPath,
                from: from.fullPath,
                toQuery: to.query
            }
            if(userAgent.indexOf('fychs') != -1){
                APPTool.addJsCallback(this, 'routerChange', param);
                //this.bindPhone();
            }else{
                next();
            }
            
        })
        //在页面加载时读取sessionStorage里的状态信息
        if (this.$ls.get("store") ) {
            this.$store.replaceState(Object.assign({}, 
            this.$store.state,JSON.parse(this.$ls.get("store"))))
        }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
            console.log('刷新。。。')
            this.$ls.set("store",JSON.stringify(this.$store.state))
        })
    },
    beforeCreate() {
        // STATS_SA.init(this);
        // STATS_SA.quick('autoTrack');
        //vue路由切换
        this.$router.afterEach((to, from) => {
            Vue.nextTick(() => {
                STATS_SA.init(this);
                STATS_SA.quick("autoTrackSinglePage",{
                    $title:to.name
                });
            });
        });
    },
    methods: {
        bindPhone() {
            APPTool.addJsCallback(this,'bindPhone',{
                phone:this.$ls.get('phone') 
            },(phone)=>{
                console.log('+++++++++++++ phone in app ======>' + phone);
                this.$ls.set('phone',phone);
                console.log('++++++++++++ phone in wap ======>' + this.$ls.get('phone'))
            });
        },
    }
}
</script>

<style lang="scss">
 
</style>
