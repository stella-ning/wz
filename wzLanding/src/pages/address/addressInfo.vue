<template>
    <div class="addressBox" :style="`background:#1D1B1A url(${addressBg}) top left no-repeat;background-size: contain;`">
        <van-popup v-model="show" position="bottom"  class="addressPopu"
            round lock-scroll lazy-render :overlay="false" :close-on-click-overlay='false'
            :style="{ 'width': '100%'}"
        >
            <addressForm :isEdit='false'></addressForm>
        </van-popup>
        
    </div>
</template>

<script>
    import mHeader from '@/components/common/header';
    import addressForm from '@/components/address/addressForm';
    export default {
        components:{
            mHeader,
            addressForm,
        },
       
        data(){
            return{
                show:true,
                addressBg:require('@/assets/images/addressBg.png'),
               
            }
        },
        mounted(){
            this.$ls.set('paySuccessTag','notPaid');
        }

    }
</script>

<style lang="scss" scoped>
    .addressBox{
        width:100vw;
        height:100vh;
        background-color:#1D1B1A;
        .addressPopu{
            background:none;
        }
    }
</style>