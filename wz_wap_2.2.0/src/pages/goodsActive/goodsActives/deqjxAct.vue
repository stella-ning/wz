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
        <section class="saleTopBox">
            <div class="saleTopTitle">
                <img :src="deqjxTop" alt="">
            </div>
            <div class="saleTopGoods flex">
                <div class="saleTopItem" v-for="(item,index) in saleTopGoods" :key="index" @click="toDetailFn(item.itemId)">
                    <div class="imgBox">
                        <img :src="item.itemPic" v-lazy="item.itemPic">
                    </div>
                    <div class="goodInfo">
                        <div class="goodsTitle">{{item.itemName}}</div>
                        <div class="goodsCouponBox">
                            <span class="cashBack van-hairline--surround">
                                返￥{{item.commission | formatPrice}}
                            </span>
                        </div>
                        <div class="flex align-center justify-between">
                            <div class="outLetPrice">
                                ￥{{item.couponUsedPrice | formatPrice}}
                            </div>
                            <div class="goodPrice">
                                <del class="originPrice">￥{{item.price | formatPrice}}</del>
                            </div>
                        </div>
                    </div>
                    <div class="label">
                       {{item.couponAmount/100}}元券
                    </div>
                </div>
            </div>
        </section>
        
        <loadMore :current="startIndex" :fetchData="callActGroupData" :isHasData="isHasData" :groupId="groupId" ref="loanMore">
            <section class="actGroupGoods">
                <div class="saleTopTitle">
                    <img :src="deqjxBuy" alt="">
                </div>
                <div v-if="itemActGroupGoods.length == 0">
                    {{noData}}
                </div>
                <div v-else class="goodListBox">
                    <div v-for="(item,index) in itemActGroupGoods" :key="index" 
                        @click="toDetailFn(item.itemId)"
                        class="actGroupGoodsItem flex" 
                    >
                        <div class="imgBox">
                            <img :src="item.itemPic" v-lazy="item.itemPic">
                        </div>
                        <div class="goodsInfo">
                            <div class="goodsTitle">{{item.itemName}}</div>
                            <div class="goodsCouponBox">
                                <span class="cashBack van-hairline--surround">
                                    再返￥{{item.commission | formatPrice}}
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
                                <div class="btn">领券买</div>
                            </div>
                        </div>
                        <div class="label">
                            {{item.couponAmount/100}}元券
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
            backTop,
        },
        props:{
            itemActId:'',
            actName:''
        },
        data(){
            return{
                deqjxBg:require('@/assets/images/goodsActive/deqjxBg.png'),
                deqjxTop:require('@/assets/images/goodsActive/deqjxTop.png'),
                deqjxBuy:require('@/assets/images/goodsActive/deqjxBuy.png'),
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
                        if(startIndex == 0){
                            this.saleTopGoods = res.resultData.items.slice(0,3);
                            this.itemActGroupGoods = res.resultData.items.slice(3);
                        }else{
                            this.itemActGroupGoods = [...this.itemActGroupGoods, ...res.resultData.items]
                        }
                        
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
                bannerObj.img = this.deqjxBg;
                bannerObj.height = '12.5rem';
                bannerObj.bgAll= '#5FE6F9';
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
        //background:#97D1FE;
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
                height:8.4375rem /* 135/16 */;
                background:#73ECFF;
                text-align:center;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-flow: row wrap;
                margin:0 auto;
                border-radius:.625rem /* 10/16 */ .625rem 0 0;
                padding:0 .625rem /* 10/16 */;
                box-shadow: 0px 4px 4px 0px rgba(83, 199, 215, 0.2);
                margin-bottom:.9375rem /* 15/16 */;
                .saleItem{
                    width:5.0625rem /* 81/16 */;
                    height:1.875rem /* 30/16 */;
                    line-height:1.875rem /* 30/16 */;
                    text-align: center;
                    font-size:.875rem /* 14/16 */;
                    font-weight: 400;
                    color:#001B1F;
                    margin-right:.625rem /* 10/16 */;
                    border-radius:.1875rem /* 3/16 */;
                    &:nth-child(4n){
                        margin-right:0;
                    }
                    &.van-hairline--surround::after{
                        border-color:#001B1F;
                        border-radius:.1875rem /* 3/16 */;
                    }

                    &.active{
                        background:#FEF44D;
                        font-weight: 500;
                        &.van-hairline--surround::after{
                            border-color:transparent;
                        }
                    }
                }
            }
            
        }
        .saleTopBox{
            width:100%;
            padding-top:.5rem /* 8/16 */;
            .saleTopTitle{
                width:14.375rem /* 230/16 */;
                height:1.75rem /* 28/16 */;
                margin:0 auto .9375rem /* 15/16 */;
                img{
                    max-width:100%;
                }
            }
            .saleTopGoods{
                width:100%;
                padding:0 .5625rem /* 9/16 */ 1.5625rem /* 25/16 */;
                .saleTopItem{
                    width:7.3125rem /* 117/16 */;
                    border-radius:.3125rem /* 5/16 */;
                    margin-right:.1875rem /* 3/16 */;
                    padding-bottom:.3125rem /* 5/16 */;
                    background:#fff;
                    position:relative;
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
                            border-radius:.3125rem /* 5/16 */ .3125rem /* 5/16 */ 0 0;
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
                        top:0;
                        left:.375rem /* 6/16 */;
                        width:6.5625rem /* 105/16 */;
                        height:1.6875rem /* 27/16 */;
                        background:url('../../../assets/images/goodsActive/hqzbActIcon.png') center no-repeat;
                        background-size:cover;
                        text-align: center;
                        line-height:1.6875rem /* 27/16 */;
                        font-size:.875rem /* 14/16 */;
                        color:#fff;
                    }
                }
            }
        }
        
        .actGroupGoods{
            width:100%;
            min-height: 62.5rem /* 1000/16 */;
            .saleTopTitle{
                width:14.375rem /* 230/16 */;
                height:1.75rem /* 28/16 */;
                margin:0 auto .9375rem /* 15/16 */;
                img{
                    width:100%;
                    max-width:100%;
                }
            }
            .goodListBox{
                padding:0 .625rem /* 10/16 */;
            }
            .actGroupGoodsItem{
                background:#fff;
                border-radius:.625rem /* 10/16 */;
                padding-left:.5rem /* 8/16 */;
                align-items: center;
                margin-bottom:.625rem /* 10/16 */;
                position:relative;
                .label{
                    position:absolute;
                    top:0;
                    left:.375rem /* 6/16 */;
                    width:6.5625rem /* 105/16 */;
                    height:1.6875rem /* 27/16 */;
                    background:url('../../../assets/images/goodsActive/hqzbActIcon.png') center no-repeat;
                    background-size:cover;
                    text-align: center;
                    line-height:1.6875rem /* 27/16 */;
                    font-size:.875rem /* 14/16 */;
                    color:#fff;
                }
                .imgBox{
                    width:6.875rem /* 110/16 */;
                    height:6.875rem /* 110/16 */;
                    border-radius:.3125rem /* 5/16 */;
                    img{
                        width:100%;
                        height:100%;
                        max-width:100%;
                        max-height: 100%;
                        border-radius:.3125rem /* 5/16 */;
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
                            height:1.0625rem /* 17/16 */;
                            text-align: center;
                            line-height: 1.0625rem /* 17/16 */;
                            &.coupon{
                                width:2.75rem /* 44/16 */;
                                background:url('../../../assets/images/goodsActive/conponIcon.png') center no-repeat;
                                background-size:100%;
                                
                            }
                            &.cashBack{
                                width:4.375rem /* 70/16 */;
                                &.van-hairline--surround::after{
                                    border-color:#C8350A;
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
                        .flex{
                            height:.9375rem /* 15/16 */;
                        }
                        .goodPrice{
                            flex:2;
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
                            position:relative;
                            top:-5px;
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
                                left:0;
                                top:.1875rem /* 3/16 */;
                            }
                        }
                        .btn{
                            position:absolute;
                            bottom:0;
                            right:0;
                            width:4.6875rem /* 75/16 */;
                            height:1.5625rem /* 25/16 */;
                            background:#FC2D2D;
                            border-radius:1.5625rem /* 25/16 */;
                            text-align:center;
                            line-height:1.5625rem /* 25/16 */;
                            font-size:.875rem /* 14/16 */;
                            color:#fff;
                        }
                    }
                }
            }
        }
        
    }
</style>