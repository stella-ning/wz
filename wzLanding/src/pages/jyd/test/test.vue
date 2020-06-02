<template>
<div class="testBox" @click="onCardClick">
    <div class=" center-parent">
        <div v-show="!clickToTop" class="bg1" :style="`background:url(${bg}) top center;background-size:100%${imgHeight}px;height:${imgHeight}px`"></div>
         <div v-show="clickToTop" class="bg2" :class="{'bgFinal':bgFinalShow}" :style="`background:url(${finalBg}) top center;background-size:100%${imgHeight}px;height:${imgHeight}px`"></div>
    </div>
    <transition name="fade">
        <div v-if="guideShow" class="titleBox">
              <div class="title"  :style="{'backgroundImage': 'url(' + title + ')','background-repeat': 'no-repeat','background-size':'100%,auto' }"> </div>
              <div class="titleSub"  :style="{'backgroundImage': 'url(' + titleSub + ')','background-repeat': 'no-repeat','background-size':'100%,auto' }"> </div>
        </div>
    </transition>
    <div class="bubbleBox" v-if="showCardDown &&  !flyShowFinish">
            <div class="taoPiaoPiao" :class="{'scaleChange':scaleLargeShow,'taoPiaoPiaoFly':flyShow}"  :style="{'backgroundImage': 'url(' + taoPiaoPiao + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="jiaYou" :class="{'scaleChange3':scaleLargeShow,'jiaYouFly':flyShow}" :style="{'backgroundImage': 'url(' + jiaYou + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="newPerson" :class="{'scaleChange1':scaleLargeShow,'newPersonFly':flyShow}" :style="{'backgroundImage': 'url(' + newPerson + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="xingBaKe" :class="{'scaleChange2':scaleLargeShow,'xingBaKeFly':flyShow}" :style="{'backgroundImage': 'url(' + xingBaKe + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="aiQiYi" :class="{'scaleChange1':scaleLargeShow,'aiQiYiFly':flyShow}" :style="{'backgroundImage': 'url(' + aiQiYi + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="kenDeJi" :class="{'scaleChange2':scaleLargeShow,'kengDeJiFly':flyShow}" :style="{'backgroundImage': 'url(' + kenDeJi + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="eLeMe" :class="{'scaleChange3':scaleLargeShow,'eLeMeFly':flyShow}" :style="{'backgroundImage': 'url(' + eLeMe + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="lingQuan" :class="{'scaleChange':scaleLargeShow,'lingQuanFly':flyShow}" :style="{'backgroundImage': 'url(' + lingQuan + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
    </div>
     <transition name="fade">
          <div v-if="guideShow" class="guide"  :style="{'backgroundImage': 'url(' + guide + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
    </transition>
    <transition name="fade">
        <div class="bottomBox clickToTop" @click="onCardClick" :class="{'toTop':clickToTop}" v-if="isRender">
            <div class="cardBox center-parent">
                <div class="cardBack center-child" :style="{'backgroundImage': 'url(' + back + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }">

                </div>
            </div>
             <div v-if="guideShow" class="tipStart"  :style="{'backgroundImage': 'url(' + tipStart + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
            <div class="cardBox center-parent">
                <div class="qilinCard center-child" :class="{'cardDown':showCardDown,'cardFlip':cardFlipShow}" :style="{'backgroundImage': 'url(' + qilinCard + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"></div>
                <div class="cardFront center-child" :style="{'backgroundImage': 'url(' + front + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"></div>
                <div v-if="buttonShow" class="btn center-child" :style="{'backgroundImage': 'url(' + btn + ')','background-repeat': 'no-repeat','background-size':'100%,100%' }"> </div>
                <div v-if="buttonShow" class="btnLight center-child" :style="{'backgroundImage': 'url(' + btnLight + ')','background-repeat': 'no-repeat','background-size':'100%,auto' }"></div>
            </div>
        </div>
    </transition>

</div>
</template>

<script>
export default {
    data() {
        return {
            imgHeight:0,
            taoPiaoPiao: require('./images/taoPiaoPiao.png'),
            newPerson: require('./images/newPerson.png'),
            xingBaKe: require('./images/xingBaKe.png'),
            aiQiYi: require('./images/aiQiYi.png'),
            jiaYou: require('./images/jiaYou.png'),
            kenDeJi: require('./images/kenDeJi.png'),
            eLeMe: require('./images/eLeMe.png'),
            lingQuan: require('./images/lingQuan.png'),
            guide: require('./images/guide.png'),
            tipStart: require('./images/tipStart.png'),
            title: require('./images/title.png'),
            titleSub: require('./images/titleSub.png'),
            bg: require('./images/bg.jpg'),
            finalBg: require('./images/finalBg.jpg'),
            btn: require('./images/btn.png'),
            btnLight: require('./images/btnLight.png'),
            front: require('./images/front.png'),
            back: require('./images/back.png'),
            qilinCard: require('./images/qilinCard.png'),
            clickToTop: false,
            showCardDown: false,
            isRender: false,
            scaleLargeShow:false,
            flyShow:false,
            flyShowFinish:false,
            guideShow:false,
            buttonShow:true,
            bgFinalShow:false,
            cardFlipShow:false,
            clickable:false,
        }
    },
    mounted() {
        this.initImage();
        //防止按钮被过早点击
        setTimeout(() => {
            this.clickable = true;
        }, 1900);
        setTimeout(() => {
             this.isRender = true;
        }, 100);
        setTimeout(() => {
            this.showCardDown = true;
        }, 500);
       this.scaleLargeShow = true;
        setTimeout(() => {
            this.guideShow = true;
        },500 + 100 + 1200);
    },
    methods: {
        initImage(){
			var img = new Image();
			img.src = this.bg;
			img.onload = ()=> {
				this.imgWith = document.body.clientWidth;
                this.imgHeight =  document.body.clientWidth * img.height /img.width;
                if(this.imgHeight < document.body.clientHeight) {
                    this.imgHeight = document.body.clientHeight;
                }
			};
		},
        onCardClick(){
            if(!this.clickable) {
                return;
            }

            this.flyShow = true;
            setTimeout(() => {
                this.guideShow = false;
            }, 100);
            setTimeout(() => {
                this.clickToTop = true;
                this.flyShowFinish = true;
                this.buttonShow = false;
                this.bgFinalShow = true;
            }, 600);
            setTimeout(() => {
                this.cardFlipShow = true;
            }, 1200);
        }
    },
    computed:{
        bgUrl(){
            if(this.clickToTop) {
                return this.finalBg;
            }
            return this.bg;
        }
    }
}
</script>

<style lang="scss" scoped>
$baseTop :6rem;
$clickToTop:-23.5rem;
$scaleChangeOpacity:0.2;
.testBox {
    height: 100vh;
}
.bg2 {
    opacity: 0;
}
.bgFinal {
    opacity: 1;
    transition: 1s;
}
.titleBox {
    position: absolute;
    top: 2vh;
    width: 100vw;
    .title {
        width: 80vw;
        height: 7vh;
        margin: 0 auto;
    }
    .titleSub {
        width: 80vw;
        height: 7vh;
        margin: 0 auto;
    }
}
.titleBoxFly {
    
}
.guide {
    left: 63vw;
    top: 17vh;
    position: absolute;
    width: 5rem;
    height: 5rem;
    animation: guideShake 0.4s alternate infinite;
    transform-origin: right bottom;
}

.tipStart {
    width: 100vw;
    // height: 28vh;
    height: 11rem;
    animation: breathe 0.9s alternate infinite;
}
.bubbleBox {
    .newPerson {
        width: 9rem;
        height: 9rem;
        position: absolute;
        left: 32vw;
        top: $baseTop;
        transform: scale(0);
    }
    .newPersonFly {
        top:$baseTop + 25rem;
        transition: .5s ;
        opacity: scaleChangeOpacity;
    }
    .taoPiaoPiao {
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 5vw;
        top:$baseTop + 1rem;
        transform: scale(0);
    }
    .taoPiaoPiaoFly {
        left: 40vw;
        top:$baseTop + 25rem;
        transition: .5s ;
        opacity: scaleChangeOpacity;
    }
    .jiaYou {
        width: 5rem;
        height: 5rem;
        position: absolute;
        right: 7vw;
        top:$baseTop;
        transform: scale(0);
    }
    .jiaYouFly {
        right: 40vw;
        top:$baseTop + 25rem;
        transition: .5s ;
         opacity: scaleChangeOpacity;
    }
    .xingBaKe {
        width: 5rem;
        height: 5rem;
        position: absolute;
        left: 6vw;
        top: $baseTop + 8rem;
        transform: scale(0);
    }
    .xingBaKeFly {
        left: 40vw;
        top:$baseTop + 25rem;
        transition: .5s ;
         opacity: scaleChangeOpacity;
    }
    .aiQiYi {
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 12vw;
        top: $baseTop + 14rem;
        transform: scale(0);
    }
    .aiQiYiFly {
        left: 37vw;
        top: $baseTop + 25rem;
        transition: .5s;
        opacity: scaleChangeOpacity;
    }
    .kenDeJi {
        width: 6rem;
        height: 6rem;
        position: absolute;
        left: 40vw;
        top: $baseTop + 10rem;
        transform: scale(0);
    }
    .kengDeJiFly {
        top: $baseTop + 25rem;
        transition: .5s;
        opacity: scaleChangeOpacity;
    }
    .eLeMe {
        width: 5.5rem;
        height: 5.5rem;
        position: absolute;
        right: 6vw;
        top: $baseTop + 5rem;
        transform: scale(0);
    }
     .eLeMeFly {
        right: 40vw;
        top:$baseTop + 25rem;
        transition: .5s ;
        opacity: scaleChangeOpacity;
    }
    .lingQuan {
        width: 6rem;
        height: 6rem;
        position: absolute;
        right: 7vw;
        top: $baseTop + 11rem;
        transform: scale(0);
    }
     .lingQuanFly {
        right: 39vw;
        top:$baseTop + 25rem;
        transition: .5s ;
        opacity: scaleChangeOpacity;
    }
  
}
.bottomBox {
    position: absolute;
    bottom: 6rem;


    .cardBox {
        bottom: 0;
        width: 100vw;
        position: absolute;

        .qilinCard {
            height: 12rem;
            width: 73vw;
            left: 13.5%;    
            transform: translateY(-18rem);
        }

        .cardBack {
            height: 11rem;
            width: 73vw;
        }

        .cardFront {
            height: 10rem;
            width: 77vw;
        }

        .btn {
            width: 11rem;
            height: 4rem;
            background-position-y: 0.5rem;
        }
        .btnLight {
            width: 10.5rem;
            height: 3.2rem;
            animation: btnSwipe 1.1s 0.2s infinite;
            border-radius: 2.5rem;
            background-position-y: 0.2rem;
        }
    }
}

.cardDown {
    animation: cardDownAni forwards .6s ease;
}

.toTop {
    transform: translateY($clickToTop);
    transition: .5s ease-out;
    
}

.cardFlip {
   animation: cardFlipAni forwards 1s ease;
}
@keyframes cardFlipAni{
    0%{
       transform: translateY(-17vh)
    }
    100%{
       transform: translateY(-22vh)
    }
}


@keyframes breathe{
    0%{
        opacity: 0;
    }
    100%{
       opacity: 1;
    }
}

@keyframes guideShake{
    0%{
        transform: rotate(0);
    }
    100%{
       transform: rotate(-18deg);
    }
}
@keyframes cardDownAni{
    0%{
        transform: translateY(-18rem);
    }
    100%{
       transform: translateY(-7rem);
    }
}

@keyframes btnSwipe{
    0%{
        background-position-x: -7rem;
    }
    100%{
        background-position-x:7rem;
    }
}

.scaleChange {
    animation: scaleChangeAni forwards .6s 1s;
}
.scaleChange1 {
    animation: scaleChangeAni forwards .4s 1s;
}
.scaleChange2 {
    animation: scaleChangeAni forwards .2s 1s;
}
.scaleChange3 {
    animation: scaleChangeAni forwards .3s 1s;
}
@keyframes scaleChangeAni{
    0%{
       transform: scale(.7);
       opacity: 0;
    }
    100%{
        transform: scale(1);
        opacity: 1;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
