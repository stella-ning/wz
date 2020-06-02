<template>
<div>
    <transition mode="out-in">
        <fakeProgress v-if="!currentComponent" :stopEvent="stopEvent"> </fakeProgress>
        <component :is="currentComponent" :itemActId="itemActId" :actName="actName">
        </component>
    </transition>
</div>
</template>

<script>
import fakeProgress from '@/components/common/fakeProgress'
import { mapActions, mapState} from "vuex";
export default {
    data() {
        return {
            stopEvent:false,
            currentComponent: '',
            itemActId:'',
            actName:'',
        }
    },
    created() {
        this.itemActId = this.$route.query.itemActId;
        this.actName = this.$route.query.actName;
        this.$store.commit('setItemActId',this.itemActId);
        this.$store.commit('setActName',this.actName);
        //this.getItemActNameAndIdList();
        this.callGetLandPageByChannelName();
    },
    mounted(){
        STATS_SA.trackPageView('goodsActives',this.actName,{
            actName:this.actName,
            itemActId:this.itemActId
        })
    },
    methods: {
        getItemActNameAndIdList(){
            this.request.post(this.urls.getItemActNameAndIdList,{},true).then((res)=>{
                console.log(res)
            })
        },
        callGetLandPageByChannelName() {
            console.log(this.actName)
            if(this.actName == '放心母婴区活动'){//放心母婴区
                this.currentComponent = 'mbAct'  
            }else if(this.actName == '超级热销活动'){//超级热销
                this.currentComponent = 'saleAct'
            }else if(this.actName == '好券直播活动'){//好券直播
                this.currentComponent = 'hqzbAct'
            }else if( this.actName == '优品牌专区活动'){//优选品牌区活动
                this.currentComponent = 'yppzqAct'
            }else if(this.actName == '大额券精选活动'){//大额券精选
                this.currentComponent = 'deqjxAct'
            }else if(this.actName == '超级返利区活动'){//大额券精选
                this.currentComponent = 'cjflAct'
            }else if(this.actName == '特惠，特惠活动'){
                this.currentComponent = 'thAct'
            }else if(this.actName == '爱潮流活动'){
                this.currentComponent = 'aclAct'
            }else if(this.actName == '会员有好货活动'){
                this.currentComponent = 'vipAct'
            }else if(this.actName == '复工防疫专区活动'){
                this.currentComponent = 'fgAct'
            }else if(this.actName == '精致女生护肤专区'){
                this.currentComponent = 'hfAct'
            }

        }
    },
    components: {
        fakeProgress,
        mbAct(resolve) {
            require(['@/pages/goodsActive/goodsActives/mbAct'], resolve);
        },
        saleAct(resolve) {
            require(['@/pages/goodsActive/goodsActives/saleAct'], resolve);
        },
        hqzbAct(resolve) {
            require(['@/pages/goodsActive/goodsActives/hqzbAct'], resolve);
        },
        yppzqAct(resolve) {
            require(['@/pages/goodsActive/goodsActives/yppzqAct'], resolve);
        },
        deqjxAct(resolve) {
            require(['@/pages/goodsActive/goodsActives/deqjxAct'], resolve);
        },
        cjflAct(resolve){
            require(['@/pages/goodsActive/goodsActives/cjflAct'], resolve);
        },
        thAct(resolve){
            require(['@/pages/goodsActive/goodsActives/thAct'], resolve);
        },
        aclAct(resolve){
            require(['@/pages/goodsActive/goodsActives/aclAct'], resolve);
        },
        vipAct(resolve){
            require(['@/pages/goodsActive/goodsActives/vipAct'], resolve);
        },
        fgAct(resolve){
            require(['@/pages/goodsActive/goodsActives/fgAct'], resolve);
        },
        hfAct(resolve){
            require(['@/pages/goodsActive/goodsActives/hfAct'], resolve);
        },
        
        
    },
    watch: {
        currentComponent() {
            console.log('活动名称:', this.currentComponent);
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
