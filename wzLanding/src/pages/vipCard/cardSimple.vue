<template>
<div>
    <transition mode="out-in">
        <fakeProgress v-if="!currentComponent" :stopEvent="stopEvent"> </fakeProgress>
        <component :is="currentComponent" :factoryTool="factoryTool" >
        </component>
    </transition>
</div>
</template>

<script>
import fakeProgress from '@/components/jyd/fakeProgress'
import FactoryTool from '@/pages/jyd/beans/base/FactoryTool';

export default {
    data() {
        return {
            stopEvent:false,
            currentComponent: '',
            cpList: ['infoJyd1', 'infoJyd2', 'infoJyd3', 'infoJyd4'],
            versionCode:'',
        }
    },
    created() {
        let params = {
            recordType:12,
            url:this.$route.path,
            description:'买卡落地页',
            channelName:getUrlArgs('channel') || this.$route.query.channel,

        }
        STATS.addAccess(params);
        this.factoryTool = new FactoryTool(getUrlArgs('channel'),this.$route.path);
        this.callGetLandPageByChannelName();
        this.$ls.set('paySuccessTag','notPaid');
       
    },
    methods: {
        callGetLandPageByChannelName() {
            this.request.post(this.urls.getLandPageByChannelName, {
                channelName: getUrlArgs('channel') || this.$route.query.channel
            },false).then((res) => {
                this.stopEvent = true;
                var landPage = res.resultData.landPage || {
                    versionCode:1,
                    openType:1,
                    noVersion:true,
                };
                if(landPage.noVersion) {
                    this.$toast('无版本信息');
                }
                
                if (!isNaN(landPage.versionCode) && landPage.openType == 1) {
                    this.currentComponent = `infoJyd${landPage.versionCode}`;
                    this.versionCode = landPage.versionCode;
                    this.$store.commit('SET_LANDPAGE',landPage.versionCode)
                    STATS_SA.trackPageView('langdingPageName','落地页具体使用版本',{
                        versionName:this.currentComponent
                    });
                } else {
                    this.$toast('无版本信息');
                }

            })
        }
    },
    components: {
        fakeProgress,
        infoJyd1(resolve) {
            require(['@/pages/jyd/entrance/infoJyd1'], resolve);
        },
        infoJyd2(resolve) {
            require(['@/pages/jyd/entrance/infoJyd2'], resolve);
        },
        infoJyd3(resolve) {
            require(['@/pages/jyd/entrance/infoJyd3'], resolve);
        },
        infoJyd4(resolve) {
            require(['@/pages/jyd/entrance/infoJyd4'], resolve);
        },
        infoJyd5(resolve) {
            require(['@/pages/jyd/entrance/infoJyd5'], resolve);
        },
        infoJyd6(resolve) {
            require(['@/pages/jyd/entrance/infoJyd6'], resolve);
        },
        infoJyd7(resolve) {
            require(['@/pages/jyd/entrance/infoJyd7'], resolve);
        },
        infoJyd8(resolve) {
            require(['@/pages/jyd/entrance/infoJyd8'], resolve);
        },
        infoJyd9(resolve) {
            require(['@/pages/jyd/entrance/infoJyd9'], resolve);
        },
        infoJyd10(resolve) {
            require(['@/pages/jyd/entrance/infoJyd10'], resolve);
        },
        infoJyd11(resolve) {
            require(['@/pages/jyd/entrance/infoJyd11'], resolve);
        },
        infoJyd12(resolve) {
            require(['@/pages/jyd/entrance/infoJyd12'], resolve);
        },
        infoJyd13(resolve) {
            require(['@/pages/jyd/entrance/infoJyd13'], resolve);
        },
        infoJyd14(resolve) {
            require(['@/pages/jyd/entrance/infoJyd14'], resolve);
        },
        infoJyd15(resolve) {
            require(['@/pages/jyd/entrance/infoJyd15'], resolve);
        },
        
    },
    watch: {
        currentComponent() {
            console.log('使用版本:', this.currentComponent);
            console.log('store',this.$store.state.versionCode)
        }
    },
}
</script>

<style lang="scss" scoped>
     .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translate(1);
    }

    .v-enter-active,
    .v-leave-active {
      transition: all 0.6s ease;
    }
    /deep/ .van-progress ,.van-progress__portion {
        height: 2px;
    }
</style>
