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
        //获取用户信息
        // this.$store.dispatch('getUser');
        // this.$router.beforeEach((to, from, next) => {
        //     var param = {
        //         to: to.fullPath,
        //         from: from.fullPath,
        //         toQuery: to.query
        //     }
        //     if (getUrlArgs('canNext')) {
        //         next();
        //     }
        //     APPTool.addJsCallback(this, 'routerChange', param);
        // })
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

    }
}
</script>

<style lang="scss">
 
</style>
