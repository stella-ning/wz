<template>
    <div>
        <!-- 二次确认弹窗 -->
        <van-popup v-model="isShow" 
            round lock-scroll :close-on-click-overlay='false'
            :style="{ 'width': '90%', 'background' : 'none'}"
        >
            <div class="postateBox">
                <!-- <p class="title">当前进度</p> -->
                <div class="con">
                   <div class="btnBox flex">
                        <span class="cancel" @click="goBack">放弃领取</span>
                        <span class="sure" @click="continueFn">继续申请</span>
                    </div>
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
        background:url('../../assets/images/v12/backCon.png') no-repeat center;
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
           padding-top:vw(205);
           justify-content: center;
            span{
                width:vw(125);
                height:vw(44);
                border-radius:vw(44);
                text-align: center;
                line-height:vw(44);
                font-size:vw(16);
                color:#75460A;
                font-weight: 400;
                &.cancel{
                    border:1px solid #75460A;
                    margin-right:vw(10);
                }
                &.sure{
                    background:linear-gradient(-90deg,rgba(255,204,128,1),rgba(253,231,183,1));
                }
            }
        }
    }
</style>