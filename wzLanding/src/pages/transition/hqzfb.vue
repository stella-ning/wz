<template>
 <div>
   <a :href="url" v-trigger></a>
 </div>
</template>

<script>
import FactoryTool from '@/pages/jyd/beans/base/FactoryTool';
export default {
    data () {
        return {
            resultData:{},
            tips:'',
            url:'',
            returnUrl:'',
        }
    },
    created() {
        this.factoryTool = new FactoryTool(getUrlArgs('channel'),this.$route.path);
        let andCode = encodeURIComponent('&');
        let urlPrefix = window.location.href.split('#')[0];
        this.returnUrl = encodeURIComponent(`${urlPrefix}#/card/cardSimple`);
        this.url = `alipays://platformapi/startapp?appId=20000067&url=${this.returnUrl}`;
    },
    directives:{
        trigger:{
            inserted(el,binging){
                console.log(el)
                el.click()
            }
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

 
</style>
