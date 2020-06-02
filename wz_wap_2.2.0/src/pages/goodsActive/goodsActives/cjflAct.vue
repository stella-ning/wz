<template>
    <div class="goodsActBox" :style="`background-color:${banner.bgAll}`" v-title :data-title="actName" ref='goodsActBox'>
        <topFixed 
            :isScroll="isScroll"
            :closeTips="closeTips" 
            :isshowTips="isshowTips"
            :isHasClosed="isHasClosed"
            :selectGroup="selectGroup"
            :currentTab="currentTab"
            :itemActGroups="itemActGroups"
        ></topFixed>
        <section class="topBanner" >
            <div class="imgBox" :style="`height:${banner.height}`">
                <img :src="banner.img" alt="">
            </div>
            <div class="saletabList flex saletabListNormal" :class="{'saletabListShow':isScroll}">
                <div v-for="(item,index) in itemActGroups" :key="index" class="saleItem van-hairline--surround" :class="{'active':currentTab == index}" @click="selectGroup(item.itemActGroupId,index)">
                    <p>{{item.groupName}}</p>
                </div>
            </div>
        </section>
       
        
        <loadMore :current="startIndex" :fetchData="callActGroupData" :isHasData="isHasData" :groupId="groupId" ref="loanMore">
            <section class="actGroupGoods">
                <div v-if="itemActGroupGoods.length == 0">
                    {{noData}}
                </div>
                <div v-else class="goodListBox flex align-center">
                    <div v-for="(item,index) in itemActGroupGoods" :key="index" 
                        @click="toDetailFn(item.itemId)"
                        class="actGroupGoodsItem" 
                    >
                        <div class="imgBox">
                            <img :src="item.itemPic" v-lazy="item.itemPic">
                        </div>
                        <div class="goodsInfo">
                            <div class="goodsTitle">{{item.itemName}}</div>
                            <div class="goodsCouponBox">
                                <span class="coupon">
                                    {{item.couponAmount/100}}元券
                                </span>
                            </div>
                            <p class="shopName">{{item.shopName}}</p>
                            <div class="goodsPriceBox">
                                <div class="flex">
                                    <div class="goodPrice">
                                        <!-- <p class="shop">{{}}</p> -->
                                        <del class="originPrice">￥{{item.price | formatPrice}}</del>
                                    </div>
                                    <div class="monthVolume">
                                        月销{{item.monthVolume}}
                                    </div>
                                </div>
                                <div class="outLetPrice">
                                    ￥{{item.couponUsedPrice | formatPrice}}
                                    <span class="label"></span>
                                </div>
                            </div>
                        </div>
                        <div class="topLabel">
                            返利<span class="price">￥{{item.commission | formatPrice}}</span>
                        </div>
                    </div>
                </div>
            </section> 
        </loadMore>
        <backTop :showBackTop="showBackTop"></backTop>
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    import loadMore from '@/components/common/loadMore';
    import topFixed from '@/components/goodActives/topFixed';
    import backTop from '@/components/goodActives/backTop';
    import { mapActions} from "vuex";
    export default {
        components:{
            mHeader,
            loadMore,
            topFixed,
            backTop
        },
        props:{
            itemActId:'',
            actName:''
        },
        data(){
            return{
                cjflqActBg:require('@/assets/images/goodsActive/cjflqActBg.png'),
                itemActGroups:[],
                saleTopGoods:[],
                itemActGroupGoods:[],
                groupId:'',
                noData:'',
                items:[],
                currentTab:0,
                startIndex:0,
                length:10,
                isScroll:false,
                showBackTop:false,
                phone:'',
                isshowTips:false,
                isHasClosed:false,
            }
        },
        created() {
            this.getPhone()
            
        },
        mounted() {
            this.getItemActGroup(this.itemActId).then(data=>{
                this.itemActGroups = data.itemActGroups;
                this.selectGroup(this.itemActGroups[0].itemActGroupId,0)
            })
            this.$nextTick(()=>{
                window.addEventListener('scroll', this.handleScroll, true);
            })  
        },
        updated(){
            this.$nextTick(()=>{
                
            })
        },
        deactivated() {
            window.removeEventListener('scroll', this.handleScroll,true)
        },
        destroyed(){
            window.removeEventListener('scroll', this.handleScroll,true)
        },
        directives:{
            title:{
                inserted(el, binding){
                    document.title = el.dataset.title
                }
            }
        },
        methods: {
            ...mapActions(['getItemActGroup']),
            //绑定wap的手机号到网页
            getPhone(fn){
                this.phone = this.$ls.get('phone');
                if(isNull(this.phone)) {
                    var count = 0;
                    var timer = setInterval(() => {
                        count ++;
                        console.log('轮询获取手机号')
                        if(!isNull(this.phone) ||  count > 15) {
                            clearInterval(timer);
                            if(fn)fn();
                        }
                        
                    }, 100);
                }else {
                    if(fn)fn();
                }
            },
            handleScroll(){
                let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let barHeight = document.documentElement.getElementsByClassName('topBanner')[0].offsetHeight;
                if(scrollTop > 300){
                    this.isScroll = true;
                    this.showBackTop = true;
                    if(this.isHasClosed){
                        this.isshowTips = false;
                    }else{
                        this.isshowTips = true;
                    }
                }else{
                    this.isScroll = false;
                    this.showBackTop = false;
                }
            },
            selectGroup(id,index){
                this.currentTab = index;
                this.groupId = id;
                this.startIndex = 0;
                this.itemActGroupGoods = [];
                this.$refs.loanMore.finished = false;
                this.callActGroupData(id,this.startIndex)
            },
            callActGroupData(id,startIndex){
                return new Promise((resove,reject)=>{
                    let params = {
                        phone:this.phone,
                        itemActGroupId:id,
                        startIndex:startIndex,
                        length:this.length,
                    };
                    this.request.post(this.urls.getItemActGroupPart,params,true).then(res=>{
                        resove(res.resultData)
                        this.itemActGroupGoods = [...this.itemActGroupGoods, ...res.resultData.items]
                        this.items = res.resultData.items;
                        this.startIndex += 10;
                        if(this.itemActGroupGoods.length == 0){
                            this.noData = '暂时没有商品'
                        }
                    })
                })
            },
            toDetailFn(itemId){
                if(isAndroidClient()){
                    APPTool.addJsCallback(this,'startNative', {
                        url:`fychs://org.vackapi.wool.shopping.GoodsActivity?itemId=${itemId}&itemActGroupId=${this.groupId}`
                    })
                }
                if(isIOSClient()){
                    APPTool.addJsCallback(this,'startNative', {
                        itemId:itemId,
                        itemActGroupId:this.groupId,
                    })
                }
                
            },
            backTop(){
                let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let timer = setInterval(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timer)
                    }
                }, 16)

            },
            closeTips(){
                this.isHasClosed = true;
                this.isshowTips = false;
            }
        },
        computed: {
            isHasData(){
                if(this.itemActGroupGoods.length > 0){
                    return true
                }else{
                    return false
                }
            },
            banner(){
                let bannerObj = {};
                bannerObj.img = this.cjflqActBg;
                bannerObj.height = '12.5rem';
                bannerObj.bgAll= '#FFCC44';
                return bannerObj;
            },
          
        },
    }
</script>

<style lang="scss" scoped>
    .saletabListNormal {
        opacity: 1;
        transition: 1s;
    }
    .saletabListShow{
        opacity: 0;
        transition: 1s;
    }
    .goodsActBox{
        .topBanner{
            width:100%;
            position:relative;
            //height:12.5rem /* 200/16 */;
            .imgBox{
                width:100%;
                height:100%;
                img{
                    width:100%;
                    max-width:100%;
                    height:100%;
                    max-height:100%;
                }
            }
            .saletabList{
                width:100%;
                height:7.5rem /* 120/16 */;
                background:#FFCC44;
                box-shadow:0px 2px 9px 0px rgba(251, 132, 0, 0.61);
                text-align:center;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-flow: row wrap;
                margin:0 auto;
                padding:0 1.375rem /* 22/16 */;
                .saleItem{
                    width:4.6875rem /* 75/16 */;
                    height:1.875rem /* 30/16 */;
                    line-height:1.875rem /* 30/16 */;
                    text-align: center;
                    font-size:.875rem /* 14/16 */;
                    font-weight: 400;
                    color:#000200;
                    margin-right:.625rem /* 10/16 */;
                    border-radius:1.875rem /* 30/16 */;
                    &:nth-child(4n){
                        margin-right:0;
                    }
                    &.van-hairline--surround::after{
                        border-color:#000200;
                        border-radius:1.875rem /* 30/16 */;
                    }

                    &.active{
                        background:#000200;
                        color:#FFEE3B;
                        font-size:.875rem /* 14/16 */;
                        font-weight: 500;
                    }
                }
            }
            
        }
      
        .saleTopBox{
            width:100%;
            height:30rem /* 480/16 */;
            position:relative;
            
            .saleTop{
                position:absolute;
                top:-1.5625rem /* 25/16 */;
                background:#F5BC79;
                padding-top:1.25rem /* 20/16 */;
                border-radius:.9375rem /* 15/16 */ .9375rem /* 15/16 */ 0 0;
            }
            .saleTopTitle{
                width:9.375rem;
                margin:0 auto 1.25rem /* 20/16 */;
                img{
                    max-width:100%;
                }
            }
            .saleTopGoods{
                width:100%;
                padding:0 .5625rem /* 9/16 */ 1.5625rem /* 25/16 */;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-flow: row wrap;
                .saleTopItem{
                    width:7.3125rem /* 117/16 */;
                    border-radius:.3125rem /* 5/16 */;
                    margin-right:.1875rem /* 3/16 */;
                    padding-bottom:.3125rem /* 5/16 */;
                    background:#fff;
                    position:relative;
                    margin-bottom:.3125rem /* 5/16 */;
                    &:nth-child(3n){
                        margin-right:0;
                    }
                    .imgBox{
                        width:100%;
                        height:6.9375rem /* 115/16 */;
                        border-radius:.3125rem /* 5/16 */;
                        img{
                            width:100%;
                            max-width:100%;
                            border-radius:.3125rem /* 5/16 */;
                        }
                    }
                    .goodInfo{
                        padding:0 .1875rem /* 3/16 */;
                        .goodsTitle{
                            width:100%;
                            height:1.5625rem /* 25/16 */;
                            line-height:1.5625rem /* 25/16 */;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-size:.75rem /* 12/16 */;
                            font-weight: 300;
                            color:#1A1A1A;
                            margin-top:.5rem /* 8/16 */;
                        }
                        .goodsCouponBox{
                            color:#C8350A;
                            font-size:.75rem /* 12/16 */;
                            font-weight: 300;
                            margin-bottom:.3125rem /* 5/16 */;
                            span{
                                display:inline-block;
                                text-align: center;
                                text-align: center;
                                height:1.125rem /* 18/16 */;
                                line-height: 1.125rem /* 18/16 */;
                                &.coupon{
                                    width:3rem /* 48/16 */;
                                    background:url('../../../assets/images/goodsActive/conponIcon.png') center no-repeat;
                                    background-size:contain;
                                    
                                }
                                &.cashBack{
                                    width:3.625rem /* 58/16 */;
                                    margin-left:.125rem /* 2/16 */;
                                    border-radius: 0.3125rem;
                                    &.van-hairline--surround::after{
                                        border-color:#C8350A;
                                    }
                                }
                            }
                        }
                        .outLetPrice{
                            font-size:1rem /* 16/16 */;
                            color:#E33327;
                        }
                        .goodPrice{
                            color:#D9A269;
                            font-size:.625rem /* 10/16 */;
                        }
                    }
                    .label{
                        position:absolute;
                        top:.3125rem /* 5/16 */;
                        left:0;
                        width:2.5rem /* 40/16 */;
                        height:1.5rem /* 24/16 */;
                        img{
                            max-width: 100%;
                        }
                    }
                }
            }
        }
        
        .actGroupGoods{
            width:100%;
            padding:.625rem /* 10/16 */ .625rem /* 10/16 */;
            min-height: 62.5rem /* 1000/16 */;
            margin-top:6.25rem /* 100/16 */;
            .goodListBox{
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-flow: row wrap;
                position:relative;
                top:-5.625rem /* 90/16 */;
            }
            .actGroupGoodsItem{
                width:10.9375rem /* 175/16 */;
                margin-right:.3125rem /* 5/16 */;
                margin-bottom:.3125rem /* 5/16 */;
                background:#fff;
                border-radius:.3125rem /* 5/16 */;
                position:relative;
                &:nth-child(2n){
                    margin-right:0;
                }
                .imgBox{
                    width:100%;
                    height:10.625rem /* 170/16 */;
                    
                    img{
                        width:100%;
                        height:100%;
                        max-width:100%;
                        max-height: 100%;
                        border-radius:.3125rem /* 5/16 */ .3125rem /* 5/16 */ 0 0;
                    }
                }
                .goodsInfo{
                    flex:2;
                    padding:.625rem /* 10/16 */;
                    .goodsTitle{
                        width:100%;
                        height:2.1875rem /* 35/16 */;
                        margin-bottom:.3125rem /* 5/16 */;
                        font-size:.875rem /* 14/16 */;
                        color:#1A1A1A;
                        font-weight: 400;
                        display:-webkit-box;    /*--课伸缩盒子/弹性盒子--*/
                        -webkit-box-orient:vertical;/*--从上向下垂直排列子元素--*/
                        -webkit-line-clamp:2;/*--限制在一个块元素显示的文本的行数(超出3行显示省略号)--*/
                        overflow:hidden;
                    }
                    .goodsCouponBox{
                        color:#C8350A;
                        font-size:.75rem /* 12/16 */;
                        font-weight: 300;
                        margin-top:.3125rem /* 5/16 */;
                        margin-bottom:.3125rem /* 5/16 */;
                        span{
                            display:inline-block;
                            text-align: center;
                            text-align: center;
                            &.coupon{
                                width:auto;
                                background:url('../../../assets/images/goodsActive/conponIcon.png') center no-repeat;
                                background-size: 100% 100%;
                                padding: 1px 6px;
                            }
                            &.cashBack{
                                padding:1px 5px;
                                margin-left: .3125rem /* 5/16 */;
                                border-radius:.3125rem /* 5/16 */;
                                &.van-hairline--surround::after{
                                    border-color:#C8350A;
                                    border-radius:.3125rem /* 5/16 */;
                                }
                            }
                        }
                    }
                    .shopName{
                        font-size:.75rem /* 12/16 */;
                        color:#666;
                        font-weight: 200;
                    }
                    .goodsPriceBox{
                        position:relative;
                        .goodPrice{
                            flex:1;
                            .originPrice{
                                font-size:.75rem /* 12/16 */;
                                color:#D9A269;
                                font-weight: 200;
                            }
                            
                        }
                        .monthVolume{
                            flex:1;
                            font-size:.75rem /* 12/16 */;
                            color:#666;
                            font-weight: 400;
                            text-align:right;
                            margin-bottom:5px;
                        }
                        .outLetPrice{
                            font-size:1.125rem /* 18/16 */;
                            color:#E33327;
                            .label{
                                display:inline-block;
                                font-size:.75rem /* 12/16 */;
                                color:#FFEEC2;
                                width:36px;
                                height:18px;
                                background:url('../../../assets/images/goodsActive/outLetBg.png') center no-repeat;
                                background-size:100% 100%;
                                position:relative;
                                right:0;
                                top:.1875rem /* 3/16 */;
                            }
                        }
                        .btn{
                            position:absolute;
                            bottom:0;
                            right:0;
                            width:4.6875rem /* 75/16 */;
                            height:1.5625rem /* 25/16 */;
                            background:linear-gradient(-180deg,rgba(226,128,71,1),rgba(229,48,42,1));;
                            border-radius:1.5625rem /* 25/16 */;
                            text-align:center;
                            line-height:1.5625rem /* 25/16 */;
                            font-size:.875rem /* 14/16 */;
                            color:#fff;
                        }
                    }
                }
                .topLabel{
                    position:absolute;
                    top:6px;
                    left:0;
                    padding:3px 8px;
                    border-radius:0 13px 13px 0;
                    background:linear-gradient(-180deg,rgba(255,53,53,1),rgba(242,29,29,1));
                    font-size:.75rem /* 12/16 */;
                    color:#fff;
                    font-weight: 400;
                    .price{
                        font-size:1rem /* 16/16 */;
                        color:#fff;
                    }
                }
            }
        }
    }
</style>