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
        </section>
        
        <loadMore :current="startIndex" :fetchData="callActGroupData" :isHasData="isHasData" :groupId="groupId" ref="loanMore">
            <section class="actGroupGoods">
                
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
                                <span class="coupon">
                                    {{item.couponAmount/100}}元券
                                </span>
                                <span class="cashBack van-hairline--surround">
                                    再返￥{{item.commission | formatPrice}}
                                </span>
                            </div>
                            <p class="shopName">{{item.shopName}}</p>
                            <div class="goodsPriceBox">
                                <div class="flex">
                                    <div class="goodPrice">
                                        <del class="originPrice">￥{{item.price | formatPrice}}</del>
                                    </div>
                                    <!-- <div class="monthVolume">
                                        月销{{item.monthVolume}}
                                    </div> -->
                                </div>
                                <div class="outLetPrice">
                                    ￥{{item.couponUsedPrice | formatPrice}}
                                    <span class="label"></span>
                                </div>
                            </div>
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
                hfActBg:require('@/assets/images/goodsActive/hfActBg.png'),
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
                phone:'13560162027',
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
                    //this.isScroll = true;
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
            topLabel(index){
                if(index == 0){
                    return this.top1;
                }else if(index ==1){
                    return this.top2
                }else if(index ==2){
                    return this.top3
                }else if(index ==3){
                    return this.top4
                }else if(index ==4){
                    return this.top5
                }else if(index == 5){
                    return this.top6
                }
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
                bannerObj.img = this.hfActBg;
                bannerObj.height = '12.5rem';
                return bannerObj;
            },
          
        },
    }
</script>

<style lang="scss" scoped>
    .goodsActBox{
        background:#FF929D;
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
            
            
        }
      
        
        
        .actGroupGoods{
            width:100%;
            min-height: 62.5rem /* 1000/16 */;
            .goodListBox{
                padding:0 .625rem /* 10/16 */;
            }
            .actGroupGoodsItem{
                background:#fff;
                border-radius:.3125rem /* 5/16 */;
                padding-left:.5rem /* 8/16 */;
                margin-bottom:.625rem /* 10/16 */;
                position:relative;
                align-items: center;
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
                        color:#E8064B;
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
                                background:url('../../../assets/images/goodsActive/aclConponIcon.png') center no-repeat;
                                background-size: 100% 100%;
                                padding: 1px 6px;
                            }
                            &.cashBack{
                                padding:1px 5px;
                                margin-left: .3125rem /* 5/16 */;
                                border-radius:.3125rem /* 5/16 */;
                                &.van-hairline--surround::after{
                                    border-color:#E8064B;
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
                        .flex{
                            height:.9375rem /* 15/16 */;
                        }
                        .goodPrice{
                            flex:1;
                            .originPrice{
                                font-size:.75rem /* 12/16 */;
                                color:#666;
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
                            color:#1A1A1A;
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
                            background:linear-gradient(-180deg,rgba(226,128,71,1),rgba(229,48,42,1));;
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