<template>
    <div class="goodsActBox">
        <mHeader :title="'商品活动'"></mHeader>
        <section class="goodsActTab">
            <div class="hiddenBox">
                <ul class="tabList" :style="tabListStyle">
                    <li v-for="(item,index) in itemActGroups" :key="index" :class="{'active':currentTab == index}" @click="selectGroup(item.itemActGroupId,index)">
                        {{item.groupName}}
                    </li>
                </ul>
            </div>
        </section>
        <section class="actGroupGoods">
            <loadMore :current="startIndex" :fetchData="callActGroupData" :isHasData="isHasData" :groupId="groupId" ref="loanMore">
                <div v-if="itemActGroupGoods.length == 0">
                    暂时没有商品
                </div>
                <div v-else v-for="(item,index) in itemActGroupGoods" :key="index" 
                    @click="toDetailFn(item.itemId)"
                    class="actGroupGoodsItem flex align-center" 
                >
                    <div class="imgBox">
                        <img :src="item.itemPic" v-lazy="item.itemPic">
                    </div>
                    <div class="goodsInfo">
                        <div class="goodsTitle">{{item.itemName}}佳巍2020新款卡通宽松T恤女短袖情侣装夏装半截袖ins潮</div>
                        <div class="goodsCouponBox">
                            <span class="coupon">
                                券{{item.couponAmount/100}}
                            </span>
                            +
                            <span class="cashBack van-hairline--surround">
                                再返￥{{item.commission | formatPrice}}
                            </span>
                        </div>
                        <div class="goodsPriceBox flex">
                            <div class="goodPrice">
                                <del class="originPrice">￥{{item.price | formatPrice}}</del>
                                <div class="outLetPrice">
                                    ￥{{item.couponUsedPrice | formatPrice}}
                                    <span class="label">券后价</span>

                                </div>
                            </div>
                            <div class="monthVolume">
                                月销{{item.monthVolume}}
                            </div>
                        </div>
                    </div>
                </div>
            </loadMore>
        </section>
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    import loadMore from '@/components/common/loadMore';
    export default {
        components:{
            mHeader,
            loadMore,
        },
        data(){
            return{
                itemActGroups:[],
                itemActGroupGoods:[],
                itemActId:'',//活动id
                groupId:'',//商品分组id
                items:[],
                currentTab:0,
                startIndex:0,
                length:10,
            }
        },
        created() {
            this.itemActId = this.$route.query.itemActId;
        },
        mounted() {
            this.getItemActGroup().then(data=>{
                this.selectGroup(this.itemActGroups[0].itemActGroupId,0)
            })
        },
        methods: {
            getItemActGroup(){
                return new Promise((resove,reject)=>{
                    let params = {
                        itemActId:this.itemActId,
                    };
                    this.request.post(this.urls.getItemActGroup,params,false).then(res=>{
                        this.itemActGroups = res.resultData.itemActGroups;
                        resove(res)
                    })
                })
                
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
                        itemActGroupId:id,
                        startIndex:startIndex,
                        length:this.length,
                    };
                    this.request.post(this.urls.getItemActGroupPart,params,true).then(res=>{
                        resove(res.resultData)
                        this.itemActGroupGoods = [...this.itemActGroupGoods, ...res.resultData.items]
                        this.items = res.resultData.items;
                        this.startIndex += 10
                    })
                })
            },
            toDetailFn(itemId){
                APPTool.addJsCallback(this,'startNative', {
                    url:`fychs://org.vackapi.wool.shopping.GoodsActivity?itemId=${itemId}&itemActGroupId=${this.groupId}`
                })
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
            tabListStyle(){
                let width = Number((6.25 * this.itemActGroups.length))+ Number(0.9375*(this.itemActGroups.length-1))+'rem'
                return `
                    width:${width}
                `
            }
        },
    }
</script>

<style lang="scss" scoped>
    .goodsActBox{
        .goodsActTab{
            padding-left:.625rem /* 10/16 */;
            .hiddenBox{
                overflow-x: scroll;
                overflow-y: hidden;
                &::-webkit-scrollbar {
                    display: none;
                }
                .tabList{
                    overflow-x: auto;
                    >li{
                        display:inline-block;
                        width:6.25rem /* 100/16 */;
                        height:2.3125rem /* 37/16 */;
                        background:#E6E6E6;
                        color:#000;
                        font-size:.9375rem /* 15/16 */;
                        font-weight: 300;
                        text-align: center;
                        line-height:2.3125rem /* 37/16 */;
                        &.active{
                            background:#0B8461;
                            color:#fff;
                        }
                    }
                    >li + li{
                        margin-left:.9375rem /* 15/16 */;
                    }
                }
            }
           
        }
        .actGroupGoods{
            width:100%;
            padding:.9375rem /* 15/16 */ .625rem /* 10/16 */;
            .actGroupGoodsItem{
                border-bottom:1px solid #E5E5E5;
                .imgBox{
                    width:6.875rem /* 110/16 */;
                    height:6.875rem /* 110/16 */;
                    padding:.5rem /* 8/16 */;
                    img{
                        width:100%;
                        height:100%;
                        max-width:100%;
                        max-height: 100%;
                    }
                }
                .goodsInfo{
                    flex:2;
                    padding:.625rem /* 10/16 */;
                    .goodsTitle{
                        width:100%;
                        height:2.5rem /* 40/16 */;
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
                                background:url('../../assets/images/goodsActive/conponIcon.png') center no-repeat;
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
                    .goodsPriceBox{
                        .goodPrice{
                            flex:2;
                            .originPrice{
                                font-size:.75rem /* 12/16 */;
                                color:#666;
                                font-weight: 400;
                            }
                            .outLetPrice{
                                font-size:1.125rem /* 18/16 */;
                                color:#000;
                                .label{
                                    display:inline-block;
                                    font-size:.75rem /* 12/16 */;
                                    color:#FFEEC2;
                                    width:4.0625rem /* 65/16 */;
                                    height:1.0625rem /* 17/16 */;
                                    text-align: center;
                                    line-height:1.0625rem /* 17/16 */;
                                    background:url('../../assets/images/goodsActive/outLetBg.png') center no-repeat;
                                    background-size:100%;
                                    position:relative;
                                    right:-.3125rem /* 5/16 */;

                                }
                            }
                        }
                        .monthVolume{
                            flex:1;
                            font-size:.75rem /* 12/16 */;
                            color:#666;
                            font-weight: 400;
                            text-align:right;
                        }
                    }
                }
            }
        }
    }
</style>