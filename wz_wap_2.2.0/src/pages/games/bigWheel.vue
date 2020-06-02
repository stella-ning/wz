<template>
    <div class="bigWheelPage" v-title data-title="大转盘抽奖">
        <section class="bigWheel" :style="`background:url(${drawBgTop}) center bottom no-repeat;background-size:cover`">
            <div class="luckyTitle">
                <!-- <span class="back">
                    <van-icon name="arrow-left" />
                </span> -->
                <div class="titleBox">
                    <span>剩余次数：{{turntableDaySurplus}}次</span>
                    <span class="line">|</span>
                    <span>次日0点更新</span>
                </div>
            </div>
            <div class="luckySubTitle">
                <span class="iconImg">
                    <img :src="coinSmall" alt="">
                </span>
                <span class="subTitle">再抽{{againCont}}次可领取奖励</span>
            </div>
            <div class="wheelMain">
                <div class="wheelPointer" @click="beginRotate()" ></div>
                <div class="wheelBg"  :style="rotateStyle">
                    <ul class="prizeList">
                        <li class="prizeItem" 
                            v-for="(item,index) in prizeList"
                            :key="index"
                            :style="item.style"
                        >
                            <!-- :style="item.picStyle" -->
                            <div class="prizePic" >
                                <img :src="item.icon" alt="">
                            </div>
                        </li>
                    </ul>

                </div>
                <!-- 额外奖励 -->
                <div v-if="turntableExtraCount > 0" class="otherPrize" @click="getExtraGit">
                    <div class="giftOther">
                        <img class="giftImg" :src="giftOther" alt="">
                        <img class="label" :src="label" alt="">
                    </div>
                </div>
            </div>
        </section>
        <section class="otherPart" :style="`background-image:url(${drawBgBottom});`">
            <section class="otherPoster">第三方广告</section>
            <section class="activeRules">
                <div class="rulesTitle">活动规则</div>
                <p class="ruleList">
                    1、用户参与本活动，即表示用户已经了解并同意活动规则，每位用户需严格遵守活动规则，并完成活动任务后才能获得奖励，若发现作弊行为，将扣除奖励。
                </p>
                <p class="ruleList">
                    2、参与活动即可有机会获得金币，本活动为概率中奖，每日参加抽奖达到一定次数可获得高额金币奖励，已经抽奖的次数次日清理重新计算。
                </p>
                <p class="ruleList">
                    3、在法律许可范围内，活动最终解释权归{{appName}}所有。
                </p>
            </section>
        </section>

    </div>
</template>

<script>
    import { prizeListData } from './prizeList'
    const CIRCLE_ANGLE = 360
    const config = {
        // 总旋转时间
        duration: 4000,
        // 旋转圈数
        circle: 8,
        mode: 'ease-in-out'
    }
    export default {
        data(){
            return{
                drawBgTop:require('@/assets/images/games/bigWheel/drawBgTop.png'),
                drawBgBottom:require('@/assets/images/games/bigWheel/drawBgBottom.png'),
                drawWheel:require('@/assets/images/games/bigWheel/drawWheel.png'),
                drawBtn:require('@/assets/images/games/bigWheel/drawBtn.png'),
                gift:require('@/assets/images/games/bigWheel/gift.png'),
                coin:require('@/assets/images/games/bigWheel/coin.png'),
                coinSmall:require('@/assets/images/games/bigWheel/coinSmall.png'),
                giftOther:require('@/assets/images/games/bigWheel/giftOther.png'),
                label:require('@/assets/images/games/bigWheel/label.png'),
                turntableDayAmount:'',//总次数
                turntableDaySurplus:'',// 剩余抽奖次数
                turntableExtraCount:'',//当天额外抽奖数
                count: 100, 
                againCont:5,//再抽多少次可领奖
                duration: 3000, // 转盘旋转时间
                rotateAngle: 0, // 旋转角度
                isRotating:false,
                prizeList:[],//奖品列表
                angleList:[],
                config:config,
                index: 0,
                phone:'',
                awardType:null,
                correctTimer:null,//定时器
            }
        },
        created() {
            this.getPhone()
            // 获取奖品列表
            this.initPrizeList();
        },
        mounted() {
            //this.phone = this.$ls.get('phone')
            this.getTurntableGameAmount()
            
            
        },
        directives:{
            title:{
                inserted(el, binding){
                    document.title = el.dataset.title
                }
            }
        },
        computed: {
            appName() {
                if(isIOSClient()) {
                    return '麒麟卡';
                }
                return '超惠省'
            },
            rotateStyle () {
                return `
                    -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
                    transition: transform ${this.config.duration}ms ${this.config.mode};
                    -webkit-transform: rotate(${this.rotateAngle}deg);
                        transform: rotate(${this.rotateAngle}deg);`
            },
            toastTitle () {
                return this.prize && this.prize.isPrize === 1
                    ? "恭喜您，获得" +
                    this.prize.name
                    : "未中奖";
            },
        },
        methods:{
            getPhone(fn){
                this.phone = this.$ls.get('phone');
                if(isNull(this.phone)) {
                    var count = 0;
                    var timer = setInterval(() => {
                        count ++;
                        this.phone = this.$ls.get('phone');
                            console.log('轮询获取手机号')
                        if(!isNull(this.phone) ||  count > 15) {
                            APPTool.addJsCallback(this,'setBgColor',{
                                color:'#7B23BF',
                                txtColor:'#ffffff'
                            })
                            clearInterval(timer);
                            if(fn)fn();
                                console.log('轮询获取手机号回调：'+this.phone)
                        }
                        
                    }, 100);
                }
                else {
                    APPTool.addJsCallback(this,'setBgColor',{
                        color:'#7B23BF',
                        txtColor:'#ffffff'
                    })
                    if(fn)fn();
                }
            },
            initPrizeList() {
                this.prizeList = this.formatPrizeList(prizeListData)
            },
            // 格式化奖品列表，计算每个奖品的位置
            formatPrizeList (list) {
                // 记录每个奖的位置
                const angleList = [];
                const l = list.length;
                // 计算单个奖项所占的角度
                const average = CIRCLE_ANGLE / l;
                const half = average / 2;
                // 循环计算给每个奖项添加style属性
                list.forEach((item, i) => {
                    // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
                    const angle = -((i * average) + half)
                    //const angleB = ((i * average) + half)
                    // 增加 style
                    item.style = `-webkit-transform: rotate(${angle}deg);
                                transform: rotate(${angle}deg);`;
                    //把图片摆正
                    item.picStyle = `-webkit-transform: rotate(${Math.abs(angle)}deg);
                                transform: rotate(${Math.abs(angle)}deg);`;
                    // 记录每个奖项的角度范围
                    angleList.push((i * average) + half )
                })
                this.angleList = angleList;
                return list
            },
            //获取转盘的次数
            getTurntableGameAmount(){
                console.log(this.phone)
                let params = {
                    phone:this.phone
                }
                this.request.post(this.urls.getTurntableGameAmount,params,false).then(res=>{
                    this.turntableDayAmount = res.resultData.turntableDayAmount;
                    this.turntableDaySurplus = res.resultData.turntableDaySurplus;
                    this.turntableExtraCount = res.resultData.turntableExtraCount;
                    this.againCont = Number(this.turntableDayAmount - this.turntableDaySurplus) % 5 == 0? 5:5-(Number(this.turntableDayAmount - this.turntableDaySurplus) % 5);
                    clearTimeout(this.correctTimer)
                })
            },
            beginRotate() {
                if (this.isRotating) return
                // 添加次数校验
                if(this.turntableDaySurplus === 0) return
                STATS_SA.trackClick('click_to_lottery','点击 抽奖')
                let awardArr;
                
                // 开始抽奖
                this.getTurntableGameAward().then((data)=>{
                    this.awardType = data.awardType;
                    if(data.awardType == 1){
                        awardArr = [0,2,4,6]
                        //awardArr = [1,3,5,7]
                    }
                    if(data.awardType == 2){
                        awardArr = [1,3,5,7]
                    }
                    // 获取奖品下标
                    this.index = awardArr[this.random(awardArr)];
                    //this.getTurntableGameAmount()
                    // 开始旋转
                    this.rotating()
                    // 旋转结束后，允许再次触发
                    setTimeout(() => {
                        this.rotateOver()
                    }, config.duration + 1000)
                })
                
            },
            random (arr) {
                console.log(arr)
                return Math.floor(Math.random() * arr.length+1)-1
            },
            rotating() {
                //const { isRotating, angleList, config, rotateAngle, index } = this
                if (this.isRotating) return

                this.isRotating = true
                
                // 计算角度
                const angle =
                    // 初始角度
                    this.rotateAngle +
                    // 多旋转的圈数
                    config.circle * CIRCLE_ANGLE +
                    // 奖项的角度
                    this.angleList[this.index] -
                    (this.rotateAngle % CIRCLE_ANGLE);

                    this.rotateAngle = angle
                    
            },
            rotateOver () {
                this.isRotating = false
                this.prize = this.prizeList[this.index]
                this.correctTimer = setTimeout(()=>{
                    this.getTurntableGameAmount()
                },2000)
                APPTool.addJsCallback(this,'showTurntableGameRes',{
                    awardType:this.awardType,
                    extraAwardType:2,
                })
                //this.insertTurntableGameAward()
            },
            getExtraGit(){
                STATS_SA.trackClick('click_level_rewards','点击 额外奖励')
                this.correctTimer = setTimeout(()=>{
                    this.getTurntableGameAmount()
                },2000)
                APPTool.addJsCallback(this,'showTurntableGameRes',{
                    awardType:1,
                    extraAwardType:1,
                })
            },
            //关闭弹窗
            closeToast() {
                //this.prize = null;
            },
            //获取奖品类型
            getTurntableGameAward(){
                return new Promise((resolve,reject)=>{
                    let params = {
                        phone:this.phone
                    }
                    this.request.post(this.urls.getTurntableGameAward,params,false).then(res=>{
                        resolve(res.resultData)
                    })
                })
                
            },
            //领取转盘游戏奖励
            insertTurntableGameAward(){
                let params = {
                    phone:this.phone,
                    awardType:this.awardType
                }
                this.request.post(this.urls.insertTurntableGameAward,params,false).then(res=>{
                    this.$toast('恭喜抽中了。。。')
                    this.getTurntableGameAmount()
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    .bigWheelPage{
        background:#8D32C1;
        color:#fff;
        overflow-x:hidden;
        .bigWheel{
            width:100%;
            height:27.5625rem /* 441/16 */;
            .luckyTitle{
                position:relative;
                height:2.8125rem /* 45/16 */;
                padding:1.25rem /* 20/16 */ 0 .6875rem /* 11/16 */;
                .back{
                    position:absolute;
                    top:1rem /* 16/16 */;
                    left:1.875rem /* 30/16 */;
                }
                .titleBox{
                    width:14.0625rem /* 225/16 */;
                    height:1.4375rem /* 23/16 */;
                    margin:0 auto;
                    background:rgba(255,255,255,0.2);
                    font-size:.75rem /* 12/16 */;
                    text-align:center;
                    border-radius:1.4375rem /* 23/16 */;
                    span{
                        display:inline-block;
                        line-height:1.5625rem /* 25/16 */;
                    }
                    .line{
                        padding:0 .5rem /* 8/16 */;
                    }
                }
            }
            .luckySubTitle{
                width:100%;
                text-align:center;
                font-size:.75rem /* 12/16 */;
                color:#FFCF3F;
                height:1.25rem /* 20/16 */;
                .iconImg{
                    display:inline-block;
                    width:1.75rem /* 28/16 */;
                    height:1.875rem /* 30/16 */;
                    vertical-align: middle;
                    margin-right:.3125rem /* 5/16 */;
                    img{
                        width:100%;
                        max-width:100%;
                    }
                }
            }
            .wheelMain{
                width:20.5rem /* 328/16 */;
                height:20.5rem /* 328/16 */;
                margin:0 auto;
                position:relative;
                .wheelPointer{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 2;
                    width: 7.5rem /* 120/16 */;
                    height: 7.5rem /* 120/16 */;
                    background: url("../../assets/images/games/bigWheel/drawBtn.png") no-repeat center center;
                    background-size: 100%;
                    transform: translate3d(-50%, -50%, 0);
                }
                .wheelBg{
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    background: url("../../assets/images/games/bigWheel/drawWheel.png") no-repeat center top;
                    background-size: 100%;
                    .prizeList{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        .prizeItem{
                            position: absolute;
                            width: 5.9375rem /* 95/16 */;
                            height: 7.1875rem /* 115/16 */;
                            padding:0 1.375rem /* 22/16 */;
                            top: 3rem /* 48/16 */;
                            left: 50%;
                            margin-left:-2.96875rem /* 47.5/16 */;
                            transform-origin: 50% 100%;
                            .prizePic{
                                text-align:center;
                                img{
                                    width:2.8125rem /* 45/16 */;
                                    height:2.8125rem /* 45/16 */;
                                    height:100%;
                                    max-width:100%;
                                    max-height:100%;
                                }
                            }
                        }
                    }
                }
                .otherPrize{
                    width:4.5625rem /* 73/16 */;
                    height:4.6875rem /* 75/16 */;
                    position:absolute;
                    bottom:0;
                    right:-1.5625rem /* 25/16 */;
                    .giftOther{
                        width:100%;
                        height:100%;
                        position:relative;
                        .giftImg{
                            width:100%;
                            max-width: 100%;
                        }
                        .label{
                            width:2.1875rem /* 35/16 */;
                            height:1.5rem /* 24/16 */;
                            position:absolute;
                            top:.0625rem /* 1/16 */;
                            right:.375rem /* 6/16 */;
                            -webkit-animation: bounce-down 1.5s linear infinite;
                            animation: bounce-down 1.5s linear infinite;
                        }
                    }
                }
            }
        }
        .otherPart{
            display:none;
            width:100%;
            background-repeat-y: repeat;
            background-size: 100%;
            position:relative;
        }
        .otherPoster{
            width:21.5625rem /* 345/16 */;
            height:16.25rem /* 260/16 */;
            position:relative;
            top:-2.5rem /* 40/16 */;
            background:#fff;
            border-radius:.3125rem /* 5/16 */;
            margin:0 auto;
        }
        .activeRules{
            width:20.25rem /* 324/16 */;
            margin:0 auto;
            padding:0 .3125rem /* 5/16 */ 2.5rem /* 40/16 */;
            font-weight: 400;
            .rulesTitle{
                font-size: 1rem;
                font-family: serif;
                text-align:center;
                margin-bottom:.625rem /* 10/16 */;
            }
            .ruleList{
                font-size:.75rem /* 12/16 */;
                font-weight: 300;
                margin-bottom:.375rem /* 6/16 */;
            }
        }
    }
   
</style>