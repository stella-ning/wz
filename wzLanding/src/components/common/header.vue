<template>
    <div class="headBox">
        <header :class="{'van-hairline--bottom':isOderSure}">
            <!-- <img :src="backIcon" alt="" @click="goBack"> -->
            <span class="titleTxt">{{title}}</span>
            <slot></slot>
        </header>
    </div>
</template>

<script>
    export default {
        props:{
            title:'',
            goBackPath:String,
            isOderSure:{
                default(){
                    return false;
                }
            },
        },
        data(){
            return{
                backIcon:require('@/assets/images/goBack.png'),
            }
        },
        methods: {
            goBack() {
                if(this.goBackPath) {
                    this.$router.push({
                        path:this.goBackPath
                    })
                } else {
                    this.$router.go(-1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .headBox{
        width:100%;
        height:2.8125rem /* 45/16 */;
        background:#fff;
        line-height: 2.8125rem /* 45/16 */;
       
        header{
            position: fixed;
            text-align: center;
            color: #333;
            top: 0;
            left: 0;
            width: 100%;
            height:2.8125rem;
            background: #fff;
            z-index: 99;
            img{
                width:1.875rem /* 30/16 */;
                position:absolute;
                top:.4375rem /* 7/16 */;
                left:.625rem /* 10/16 */;
            }
            .titleTxt{
                font-size: 1.125rem /* 18/16 */;
                
            }
        }
    }
</style>