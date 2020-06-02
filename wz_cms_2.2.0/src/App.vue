<template>
  <div id="app" class="app-style"  :style="myStyle" style="height:2000px" >
    <!-- <img src="./assets/images/logo.png"> -->
    <router-view/>

    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      myStyle:{
        height:window.screen.height * 2
      }
    }
  },
  mounted(){
      this.$store.dispatch('getPermissionList').then((permissList)=>{
          
      })
   
  },
  methods:{
     ...mapActions(['getPermissionList'])
  },
  computed:{
   
  }
 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.heightAuto{
  /* height: auto!important; */
}

.app-style {
  /* background: #F8F8F8; */
}
@media screen and (orientation: portrait) {
  /*竖屏 css*/
} 
@media screen and (orientation: landscape) {
  /*横屏 css*/
    /* #app {
      height: auto;
   } */
}
</style>
