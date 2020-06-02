<template>
    <div>
        <section class="topTips" :style="topTipsStyle">
            <b>小提示：</b>部分商品下单支付后，若长时间无返利，可去到【我的> 提现现金>找回订单】，手动获取返利。
            <div class="btn" @click="closeTips">知道了，关闭提示</div>
        </section>
        <section class="goodsActTab" :style="tabFixedStyle">
            <div class="hiddenBox">
                <ul class="tabList" :style="tabListStyle">
                    <li v-for="(item,index) in itemActGroups" :key="index" :class="{'active':currentTab == index}" @click="selectGroup(item.itemActGroupId,index)">
                        {{item.groupName}}
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        props:{
            closeTips:Function,
            isScroll:Boolean,
            isshowTips:Boolean,
            isHasClosed:Boolean,
            selectGroup:Function,
            currentTab:'',
            itemActGroups:Array,
        },
        data(){
            return{

            }
        },
        computed:{
            tabListStyle(){
                let width = Number((6.25 * this.itemActGroups.length))+'rem';
                
                return `
                    width:${width};
                `
            },
            tabFixedStyle(){
                let top;
                if(this.isshowTips && this.isScroll){
                    top = '3.75rem'
                }else if(this.isScroll){
                    top = '0'
                }else{
                    top = '-10rem'
                }
                return `
                    top:${top}
                `
            },
            topTipsStyle(){
                let top;
                if(this.isshowTips){
                    top = '0'
                }else{
                    top = '-10rem'
                }
                return `
                    top:${top}
                `
            },
        }
    }
</script>

<style lang="scss" scoped>
    .topTips{
        width:100%;
        height:3.75rem /* 60/16 */;
        background:linear-gradient(-130deg,rgba(255,235,121,1),rgba(255,225,106,1));
        position:fixed;
        top:-100px;
        left:0;
        font-size:.75rem /* 12/16 */;
        color:#1A1A1A;
        font-weight: 300;
        padding:.625rem /* 10/16 */ .9375rem /* 15/16 */;
        transition: all 0.5s ease;
        z-index:999;
        .btn{
            position:absolute;
            bottom:.3125rem /* 5/16 */;
            right:.625rem /* 10/16 */;
            width:6.875rem /* 110/16 */;
            height:1.5625rem /* 25/16 */;
            line-height:1.5625rem /* 25/16 */;
            text-align:center;
            border-radius:1.5625rem /* 25/16 */;
            background:#1A1A1A;
            color:#FFDD57;
            font-size:.6875rem /* 11/16 */;
            font-weight: 300;
        }

    }
    .goodsActTab{
        position:fixed;
        top:-100px;
        left:0;
        right:0;
        z-index:99;
        height:vw(50);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.8s ease;
        background:#fff;
        .hiddenBox{
            height: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
            overflow-y: hidden;
            /*解决ios上滑动不流畅*/
            -webkit-overflow-scrolling: touch;
            /*纵向超出部分将会隐藏，即滚动条部分被挤出可视区域*/
            padding-bottom: 20px;
            &::-webkit-scrollbar {
                display: none;
            }
            .tabList{
                overflow-x: auto;
                >li{
                    display:inline-block;
                    width:vw(100);
                    color:#000;
                    font-size:.9375rem /* 15/16 */;
                    font-weight: 300;
                    text-align: center;
                    line-height:vw(50);
                    &.active{
                        background:#FFDC61;
                    }
                }
                // >li + li{
                //     margin-left:.9375rem /* 15/16 */;
                // }
            }
        }
    }
</style>