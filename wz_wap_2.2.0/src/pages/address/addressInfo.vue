<template>
    <div class="addressBox" :style="`background:url(${partOneBg}) top left no-repeat;background-size:cover;`">
        <van-popup v-model="show" position="bottom"  class="addressPopu"
            round lock-scroll lazy-render :close-on-click-overlay='false'
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
                partOneBg: isIOSClient() ?  require('@/assets/images/partOneBgHsq.png') : require('@/assets/images/partOneBg.png'),
               
            }
        },
        mounted(){
           
        }

    }
</script>

<style lang="scss" scoped>
    .addressBox{
        width:100vw;
        height:100vh;
        .addressPopu{
            background:none;
        }
    }
</style>