<template>
    <div class="cardHome">
        <div class="imgBox" @click="getCard">
            <img :src="home1" alt="">
        </div>
        <div class="imgBox" @click="getCard">
            <img :src="home2" alt="">
        </div>
        <footer class="footerBox">
            <div class="line"></div>
			<div class="footerTop" @click="getCard">
				<p><b>立即领卡</b></p>
			</div>
		</footer>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                home1:require('@/assets/images/v12/home1.png'),
                home2:require('@/assets/images/v12/home2.png'),
            }
        },
        methods:{
            getCard(){
                STATS_SA.trackClick('getCardNow','立即免费领卡')
                this.$router.push({
                    path:'/address/addressInfo12',
                    query: {
                        isSimple:true,
                        channel:getUrlArgs('channel'),
                        ...this.$route.query
                    }
                })
                this.factoryTool.addState('getCardBtnClick');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cardHome{
        width:100vw;
        background:#F8C0A5;
        padding-bottom:vw(70);
        .imgBox{
            width:100vw;
            &:nth-child(1){
                height:vw(295);
            }
            &:nth-child(2){
                height:vw(392);
            }
            img{
                width:100%;
                height:100%;
            }
        }
        .footerBox{
			position: fixed;
			left:0;
			bottom:0;
			width:100vw;
			box-sizing:border-box;
            text-align: center;
            background:#F8C0A5;
            transition: all 0.5s ease;
            .line{
                width:100%;
                height:1px;
                background: linear-gradient(90deg,rgba(255,206,182,1),rgba(254,222,195,1),rgba(255,206,182,1));
            }
            .label{
                width:vw(168);
                height:vw(33);
                position:absolute;
                right:vw(20);
                top:-(vw(28));
                -webkit-animation: bounce-down 1.5s linear infinite;
                animation: bounce-down 1.5s linear infinite;
                img{
                    width:100%;
                    max-width:100%;

                }
            }
			.footerTop{
				width:vw(355);
                height:vw(50);
                margin:vw(8) /* 12/16 */ auto vw(8);
                background:linear-gradient(0deg,rgba(237,78,59,1),rgba(252,133,91,1));
                border-radius:vw(50);
                line-height:vw(50);
                color:#fff;
                font-size:vw(18);
			}
			.footerBottom{
				height:1.875rem /* 30/16 */;
				line-height:1.875rem /* 30/16 */;
				color:#D8B28B;
				font-size:.75rem /* 12/16 */;
			}
			&.footerFixed{
				bottom:0;
			}
			
		}
    }
</style>