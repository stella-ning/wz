<template>
    <div>
        <div  class="toTop" @click="backTop" :style="topStye">
            <img :src="toTop" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            showBackTop:Boolean,
        },
        data(){
            return{
                toTop:require('@/assets/images/goodsActive/toTop.png'),
            }
        },
        computed: {
            topStye(){
                let right;
                if(this.showBackTop){
                    right='1rem'
                }else{
                    right='-10rem'
                }
                return `
                    right:${right};
                `
            }
        },
        methods: {
            backTop(){
                let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let timer = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timer)
                    }
                }, 16)

            },
        },
    }
</script>

<style lang="scss" scoped>
    .toTop{
        width:2.1875rem /* 35/16 */;
        height:2.1875rem /* 35/16 */;
        position:fixed;
        bottom:2.5rem /* 40/16 */;
        right:-10rem;
        border-radius:50%;
        transition: all 0.8s ease;
        img{
            width:100%;
            height:100%;
            border-radius:50%;
        }
    }
</style>