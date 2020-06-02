<template>
    <div class="blockHead">
        <div class="blockTitle">
            {{blockHead.blockTitle}}
        </div>
        <div class="subTitle">{{blockHead.subTitle}}</div>
        <div v-if="versionCode != 8 && versionCode != 9 && versionCode != 10" class="headLable" :style="`background:url(${headLable}) top center;background-size:cover`">
            <p class="txt">预计可省</p>
            <p class="savePrice">￥ <b>{{blockHead.savePrice}}</b></p>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { mapState} from "vuex";
    export default {
        props:{
            blockHead:Object,
        },
        data(){
            return{
                headLable:require('@/assets/images/home/headLable.png')
            }
        },
        computed: {
            ...mapState({
                versionCode: state => state.versionCode,
            }),
           
        },
    }
</script>

<style lang="scss" scoped>
    .block{
        .blockHead{
            padding:.9375rem /* 15/16 */;
            position: relative;
            color:#fff;
            .blockTitle{
                font-size:vw(23);
                line-height:1.875rem /* 30/16 */;
                font-weight: 600;
            }
            .subTitle{
                font-size:vw(12);
                font-weight: 300;
            }
            .headLable{
                position:absolute;
                top:0;
                right:1.25rem /* 20/16 */;
                width:4.375rem /* 70/16 */;
                height:3.75rem;
                color:#f7550c;
                font-size:.75rem /* 12/16 */;
                text-align: center;
                .txt{
                    padding-top:.3125rem /* 5/16 */;
                    line-height:1.25rem /* 20/16 */;
                }
                .savePrice{
                    font-size:.625rem /* 10/16 */;
                    line-height:1.375rem /* 22/16 */;
                    b{
                        font-size:1.375rem /* 22/16 */;
                        position:relative;
                        left:-5px;
                        font-weight: normal
                    }
                }
            }
        }
    }
</style>