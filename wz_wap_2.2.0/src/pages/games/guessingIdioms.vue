<template>
    <div class="guessingIdiomsPage" v-title data-title="猜成语游戏">
        <section class="guessingIdioms">
            <div class="idiomsCon">
                <div class="rightCount">答对{{idiomCorrectCount}}次 | 剩余{{idiomDaySurplus}}次</div>
                <div class="idiomsBox">
                    <!-- 竖排成语 -->
                    <ul class="verticalIdiom">
                        <li v-for="(world,index) in verticalIdiom" :key="index">
                            {{world == sameWorld ?sameWorldBox:world}}
                        </li>
                    </ul>
                    <!-- 横排成语 -->
                    <ul class="horizontalIdiom" :style="herizontalIdiomStyle">
                        <li v-for="(world,index) in horizontalIdiom" :key="index">
                            {{world == sameWorld?sameWorldBox:world}}
                        </li>
                    </ul>
                    <div class="giftOther" v-if="idiomExtraCount > 0" @click="getExtraGit">
                        <img :src="giftOther" alt="">
                    </div>
                </div>
                <!-- 可选的字 -->
                <ul class="slectedBox flex">
                    <li v-for="(world,index) in selectWorldArr" :key="index" @click="replyIdiom(world)">{{world}}</li>
                </ul>
            </div>
        </section>
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
    </div>
</template>

<script>
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) { 
            this.splice(index, 1); 
        } 
    };
    export default {
        data(){
            return {
                phone:'',
                giftOther:require('@/assets/images/games/idioms/giftOther.png'),
                idiomDayAmount:'',//当天总次数
                idiomDaySurplus:'',//当天剩余数
                idiomExtraCount:'',//额外奖励
                idiomCorrectCount:'',//当天累计答对
                rightCount:0,
                sameWorld:'s',
                identical:'',
                selectWorld:'',
                verticalIdiom:[],
                verticalIdiomIndex:0,
                horizontalIdiom:[],
                herizontalIdiomIndex:0,
                idiomData:{},
                copyIdiomData:{},
                selectWorldArr:[changeToChinese(random(19968,20468)),changeToChinese(random(19968,20468)),changeToChinese(random(19968,20468)),changeToChinese(random(19968,20468)),changeToChinese(random(19968,20468))],//随机取5个汉字
                replyStatus:null,//回答状态。1：正确，2：错误
                correctTimer:null,
                errorTimer:null,
            }
        },
        created() {
            this.getPhone()
        },
        mounted() {
            //this.phone = this.$ls.get('phone')
            
            this.getIdiomAmount()
            this.getIdiom().then((data)=>{
                this.idiomData = data;
                this.changeIdiom()  
            })
            this.selectWorld = '';
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
            sameWorldBox(){
                return this.selectWorld;
            },
            herizontalIdiomStyle(){
                //计算横排成语的位置
                let top = (0.65+this.verticalIdiomIndex*2.5625)+'rem';
                let left = (8.625-this.herizontalIdiomIndex*2.5625)+'rem';
                return `
                        top:${top};
                        left:${left};
                    `
            }

        },
        methods: {
           getPhone(fn){
                this.phone = this.$ls.get('phone');
                if(isNull(this.phone)) {
                    var count = 0;
                    var timer = setInterval(() => {
                        count ++;
                        this.phone = this.$ls.get('phone');
                        if(!isNull(this.phone) ||  count > 15) {
                            APPTool.addJsCallback(this,'setBgColor',{
                                color:'#E029E6',
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
                        color:'#E029E6',
                        txtColor:'#ffffff'
                    })
                    if(fn)fn();
                }
            },
            getIdiomAmount(){
                let params = {
                    phone:this.phone
                }
                this.request.post(this.urls.getIdiomAmount,params,false).then(res=>{
                    this.idiomDayAmount = res.resultData.idiomDayAmount;
                    this.idiomDaySurplus =res.resultData.idiomDaySurplus;
                    this.idiomExtraCount = res.resultData.idiomExtraCount;
                    this.idiomCorrectCount = res.resultData.idiomCorrectCount;
                })
            },
            getIdiom(){
                return new Promise((resolve,reject)=>{
                     //删除上个两成语的共同自
                    this.selectWorldArr.remove(this.identical)
                    let params = {
                        phone:this.phone
                    }
                    this.request.post(this.urls.getIdiom,params,false).then(res=>{
                        if(res.resultCode == 0){
                            resolve(res.resultData.idiom)
                        }else{
                            this.$toast('今日次数已用完，请明天再来~')
                            reject(res.resultMsg)
                        }
                        
                    })
                   
                })  
            },
            changeIdiom(){
                let idiom = this.idiomData;
                
                //将字符串成语初始化未数组
                this.verticalIdiom = this.initIdiom(idiom.idiomOne);
                this.horizontalIdiom = this.initIdiom(idiom.idiomTwo);
                //获取相同字的下标
                this.verticalIdiomIndex = idiom.idiomOne.indexOf(idiom.identical)
                this.herizontalIdiomIndex = idiom.idiomTwo.indexOf(idiom.identical)
                this.identical = idiom.identical;
                //随机取5个字
                this.selectWorldArr = [changeToChinese(random(19968,20068)),changeToChinese(random(19968,20068)),changeToChinese(random(19968,20068)),changeToChinese(random(19968,20068)),changeToChinese(random(19968,20068))]
                //追加某个相同的汉字
                this.selectWorldArr.push(this.identical)
                //打乱顺序
                sortChineseFn(this.selectWorldArr)
            },
            initIdiom(idiom){
                idiom = idiom.replace(this.idiomData.identical,'s')
                return idiom.split('');;
            },
            replyIdiom(world){
                if(this.idiomDaySurplus == 0){
                    this.$toast('今日次数已用完，请明天再来~')
                    return;
                }
                STATS_SA.trackClick('click_to_answer','点击 答题')
                let params = {
                    phone:this.phone,
                    idiomId:this.idiomData.idiomId,
                    replyChar:world
                }
                this.request.post(this.urls.replyIdiom,params,true).then(res=>{
                    if(res.resultCode == 0){
                        this.replyStatus = res.resultData.replyStatus;
                        if(this.replyStatus == 1){
                            this.selectWorld = world;
                            //this.$toast('恭喜答对了')
                        }else if(this.replyStatus == 2){
                            //this.$toast('答错了哦')
                            this.selectWorld = '';
                        }
                        //this.insertTurntableGameAward();
                        this.correctTimer = setTimeout(()=>{
                            this.getIdiom().then((data)=>{
                                this.selectWorld = '';
                                this.idiomData = data;
                                this.changeIdiom()  
                                clearTimeout(this.correctTimer)
                            });
                            this.getIdiomAmount();
                        },2000)
                        
                        APPTool.addJsCallback(this,'showInsertIdiomRes',{
                            replyStatus:this.replyStatus,
                            loadUrl:'/games/guessingIdioms',
                            extraAwardType:2,
                        })
                    }
                })
            },
            //获取额外奖励
            getExtraGit(){
                STATS_SA.trackClick('click_level_rewards_idiom','点击 额外奖励')
                this.correctTimer = setTimeout(()=>{
                    this.getIdiom().then((data)=>{
                        this.selectWorld = '';
                        this.idiomData = data;
                        this.changeIdiom()  
                        clearTimeout(this.correctTimer)
                    });
                    this.getIdiomAmount();
                },2000)
                APPTool.addJsCallback(this,'showInsertIdiomRes',{
                    replyStatus:1,
                    loadUrl:'/games/guessingIdioms',
                    extraAwardType:1,
                })
                //this.$toast('获取额外奖励')

            },
            //领取成语奖励
            insertTurntableGameAward(){
                let params = {
                    phone:this.phone,
                    replyStatus:this.replyStatus
                }
                this.request.post(this.urls.insertTurntableGameAward,params,false).then(res=>{
                    console.log(res)
                })
            }

        },
    }
</script>

<style lang="scss" scoped>
    .guessingIdiomsPage{
        width:100%;
        overflow-x: hidden;
        background:linear-gradient(-180deg, #FF5D58 0%, #E029E6 100%);
        .guessingIdioms{
            width:100%;
            height:13.5625rem /* 217/16 */;
            background:url("../../assets/images/games/idioms/idiomsTopBg.png") no-repeat center top;
            background-size:100%;
            padding:.9375rem /* 15/16 */;
            position:relative;
            margin-bottom:13.4375rem /* 215/16 */;
            .idiomsCon{
                width:21.5625rem /* 345/16 */;
                height:22.625rem /* 362/16 */;
                background:url("../../assets/images/games/idioms/idiomsConBg.png") no-repeat center top;
                background-size:100%;
                position:absolute;
                top:.9375rem /* 15/16 */;
                left:.9375rem /* 15/16 */;
                .rightCount{
                    color:#FFEB38;
                    font-size:.875rem /* 14/16 */;
                    text-align:center;
                    padding-top:4.1875rem /* 67/16 */;
                    font-weight: 500;
                }
                .idiomsBox{
                    width:20.25rem /* 324/16 */;
                    height:11.5625rem /* 185/16 */;
                    background:#fff;
                    border:.25rem /* 4/16 */ solid #E39E3D;
                    border-radius:.5rem /* 8/16 */;
                    margin:1.5rem /* 24/16 */ auto .375rem /* 6/16 */;
                    position:relative;
                    .verticalIdiom{
                        width:2.5rem /* 40/16 */;
                        position:absolute;
                        top: .625rem /* 10/16 */;
                        left: 50%;
                        transform: translate3d(-50%, 0, 0);
                    }
                    .horizontalIdiom{
                        width:100%;
                        height:2.5rem /* 40/16 */;
                        position:absolute;
                        // top:.625rem /* 10/16 */;
                        // left:8.625rem /* 138/16 */;
                        li{
                            float:left;
                            margin-right:.3125rem /* 5/16 */;
                        }
                    }
                    
                    li{
                        width:2.25rem /* 36/16 */;
                        height:2.25rem /* 36/16 */;
                        margin-bottom:.3125rem /* 5/16 */;
                        background:#FFFBF3;
                        border:.15625rem /* 2.5/16 */ solid #B87C27;
                        border-radius:.125rem /* 2/16 */;
                        text-align: center;
                        font-size:1.5rem /* 24/16 */;
                        font-weight: 500;
                        color:#B87C27;
                    }
                    .giftOther{
                        width:7.125rem /* 114/16 */;
                        height:2.4375rem /* 39/16 */;
                        position:absolute;
                        top:-.625rem /* 10/16 */;
                        right:-1.625rem /* 26/16 */;
                        -webkit-animation: bounce-down 1.5s linear infinite;
                        animation: bounce-down 1s linear infinite;
                        img{
                            width:100%;
                            height:100%;
                            max-width: 100%;
                        }
                    }
                }
                .slectedBox{
                    padding-left:.9375rem /* 15/16 */;
                    li{
                        width:3.125rem /* 50/16 */;
                        height:3.125rem /* 50/16 */;
                        background:url("../../assets/images/games/idioms/selectedBg.png") no-repeat center top;
                        background-size:100%;
                        margin-right:.1875rem /* 3/16 */;
                        text-align:center;
                        line-height:3.125rem /* 50/16 */;
                        color:#B87C27;
                        font-size:1.4375rem /* 23/16 */;
                    }
                }
            }
        }

        .otherPoster{
            display:none;
            width:21.5625rem /* 345/16 */;
            height:16.25rem /* 260/16 */;
            position:relative;
            top:-2.5rem /* 40/16 */;
            background:#fff;
            border-radius:.3125rem /* 5/16 */;
            margin:0 auto;
        }
        .activeRules{
            display:none;
            width:20.25rem /* 324/16 */;
            margin:0 auto;
            padding:0 .3125rem /* 5/16 */ 2.5rem /* 40/16 */;
            font-weight:400;
            color:#fff;
            .rulesTitle{
                width:10.25rem /* 164/16 */;
                height:1.6875rem /* 27/16 */;
                background:rgba(255,223,73,.32);
                border-radius: 1.6875rem /* 27/16 */;
                font-size: 1rem;
                font-family: serif;
                text-align:center;
                margin:0 auto;
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