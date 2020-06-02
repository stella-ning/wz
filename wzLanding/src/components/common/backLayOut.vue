<template>
    <div>
        <!-- 二次确认弹窗 -->
        <van-popup v-model="isShow" 
            round lock-scroll :close-on-click-overlay='false'
            :style="{ 'width': '80%', 'background' : 'none'}"
        >
            <div class="postateBox">
                <!-- <p class="title">当前进度</p> -->
                <div class="con">
                    <!-- <span class="colorRed">{{persons}}</span>
                    人正在申请办卡<br/>今日名额仅剩
                    <span class="colorRed">4%</span> -->
                </div>
                <div class="btnBox flex">
                    <span class="cancel" @click="goBack"></span>
                    <span class="sure" @click="continueFn"></span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        props:{
            isPopstate:{
				type:Boolean,
				default:false
            },
            btnText:{
                type:String,
                default:'继续领卡'
            },
            persons:{
                type:Number,
                default:12736
            },
            continueFn:Function,
        },
        mounted() {
            
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            }
        },
        computed: {
            isShow(){
                return this.isPopstate
            }
        },
    }
</script>

<style lang="scss" scoped>
    .postateBox{
        border-radius:.625rem /* 10/16 */;
        text-align: center;
        width:100%;
        height:vw(388);
        background:url('../../assets/images/home/backCon.png') no-repeat center;
        background-size:100% 100%;
        .title{
            color:#FFD5A5;
            font-size:1rem;
            line-height:2.8125rem /* 45/16 */;
        }
        .con{
            width:100%;
            height:vw(335);
            
        }
        .btnBox{
            background:#FFF8E8;
            border-radius:0 0 vw(60) vw(60);
            span{
                
                height:vw(52);
                &.cancel{
                    width:vw(157);
                    background:url('../../assets/images/home/cancelApply.png') no-repeat center;
                    background-size:100% 100%;
                    
                }
                &.sure{
                    width:vw(172);
                    background:url('../../assets/images/home/continueApply.png') no-repeat center;
                    background-size:100% 100%;
                }
            }
        }
    }
</style>