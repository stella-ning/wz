<template>
    <div class="nn-wrapper home-wrapper">

        <el-container>
            <el-aside ref="leftBar" v-resize="resize" :width="asideWidth" :class="{'menuHide':!isMenuOpen}" style="transition: all .2s;" draggable="true" >
                <!-- 左上角信息栏 -->
                <div class="nn-left-bar pointer" >
                    <img class="logo" :src="logoUrl" alt="" @click="isSearchBarShow = !isSearchBarShow">
                    <span @click="togglerMenu()" >网赚管理CMS</span>
                    <i class="el-icon-s-fold  toggleIcon ml-20" @click="togglerMenu()" ></i>
                </div>
                <!-- 左边导航菜单 -->
                <div class="search-bar" :class="{'search-bar-hide':!isSearchBarShow}">
                     <el-select  v-model="activeIndex" filterable placeholder="关键字检索菜单" @change="onSelectChange">
                       <el-option-group
                            v-for="group in navMenuList"
                            :key="group.path"
                            :label="group.label">
                            <el-option
                                v-for="item in group.children"
                                :key="item.path"
                                :label="item.label"
                                :value="item.path">
                            </el-option>
                            </el-option-group>
                    </el-select>
                </div>

                <el-menu :default-active="activeIndex" @open="handleOpen" @close="handleClose" :router="true" >
                    <div v-if="item.show" v-for="(item, index) in navMenuList" :key="index">
                        <el-submenu :index="String(index)" v-if="item.children">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.label}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :class="{'menuBreakword' : jItem.breakword}" v-if="jItem.show" :index="jItem.path" v-for="(jItem,j) in item.children" :key="j">{{jItem.label}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item v-else-if="item.show" :route="{path:item.path =='/' ? defaultPath: item.path}" class="ta-l" :index="item.path" :key="index">
                            <i :class="iconList[index]"></i>
                            <span slot="title">{{item.label}}</span>
                        </el-menu-item>
                    </div>
                 </el-menu>  
            </el-aside>

            <!-- <div class="dragBox">
                     <div class="leftCell">
                         <div class="resizeBar">

                         </div>
                    </div>
                    <div class="rightCell">

                    </div>
            </div> -->

           

            
            <el-main>
                <!-- 右边顶部栏 -->
                <rightTopBar>
                    <!-- v-if="!isMenuOpen"  -->
                     <div class="fl pointer" @click="togglerMenu()" >
                          <i  class="el-icon-s-operation fs-18" style="margin-top:20px;"></i>
                            <span class="fs-16">{{currentPageName}}</span>
                     </div> 
                </rightTopBar>
                <!-- 右边下方页面 -->
                <div class="nn-content">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </div>
            </el-main>
        </el-container>

    </div>
</template>

<script>
import rightTopBar from '@components/frame/rightTopBar.vue'
import {mapActions} from 'vuex'
import Vue from 'vue'
import navMenuList from './menu'
export default {
    data() {
        return {
            asideWidth: String(this.$store.state.homeStore.leftBarWidth),
            logoUrl:require('../../assets/images/logo2.png'),
            currentPageName:'',
            isSearchBarShow:false,
            isMenuOpen:true,
            apiPasswordLoanBefore:'',
            apiPasswordLoanAfter:'',
            iconList: [
                'el-icon-s-custom',
                'el-icon-s-data',
                'el-icon-s-ticket',
                'el-icon-s-flag',
                'el-icon-s-shop',
                'el-icon-s-platform',
                'el-icon-s-home',
                'el-icon-tickets',
                'el-icon-document',
                'el-icon-printer',
                'el-icon-news',
                'el-icon-goods',
                'el-icon-message',
                'el-icon-date',
                'el-icon-bell',
                'el-icon-view',
                'el-icon-time',
                'el-icon-service',
                'el-icon-menu',
                'el-icon-phone-outline',
                'el-icon-star-off',
                'el-icon-star-off',
                'el-icon-star-off',
                'el-icon-star-off',
                'el-icon-upload',
                'el-icon-info',

            ],
            defaultPath: '/permission/permissionList',
            activeIndex: this.$route.path,
            navMenuList: [...navMenuList]
          
        }
    },
    created(){
        // if(this.isShowApiFunction) {
        //     this.navMenuList.push( {
        //         label:'全流程放款数据统计',
        //         path:'/api/lendingStatistics'
        //     },)
        // }

        // var API_PATHS = ['/api/lendingStatistics',
      
        // ]
  
        // 监听是否跳转到API功能
        // this.$router.beforeEach((to,from,next) => {
        //     if(this.isShowApiFunction){
        //         next();
        //     }
        //     else {
        //          if(API_PATHS.findIndex((item)=> item == to.path) != -1){
        //                this.$router.push('/permission/permissionList')
        //          }
        //          else {
        //               next()
        //          }
        //     }
        // })
        //没有权限跳转到用户列表
        // if(!this.isShowApiFunction) {
        //     if(API_PATHS.findIndex((item)=> item == this.$route.path) != -1){
        //         this.$router.push('/permission/permissionList')
        //     }
        // }
        
    },
    created(){
        //  this.initRouterCode();
        //  this.initPermission();
        this.navMenuList.forEach(iItem => {
            if(iItem.children && iItem.children.length > 0) {
                
                  Vue.set(iItem,'show',  true)
                  iItem.children.forEach((jItem,j) => {
                      Vue.set(jItem,'show',  true)
                 });
            }
            else {
                Vue.set(iItem,'show', true)
            }
        });
        this.currentPageName = this.$route.name;
    },
    methods: {
        resize(){
          this.$store.commit('setLeftBarWidth', this.$refs.leftBar.$el.offsetWidth)
        },
        onSelectChange(){
            this.$router.push({path:this.activeIndex,query:this.$route.query})
        },
        ...mapActions(['getPermissionList']),
        // 初始化路由的权限code
        initRouterCode(){
            var allRouters = [];
            this.$router.options.routes.forEach(iItem => {
                if(iItem.children && iItem.children.length > 0) {
                    iItem.children.forEach(jItem => {
                         allRouters.push(jItem)
                    });
                }
                else {
                    allRouters.push(iItem)
                }
            });
            this.navMenuList.forEach(iItem => {
                if(iItem.children && iItem.children.length > 0) {
                    iItem.children.forEach(jItem => {
                        var routerItem = allRouters.find(temp=>temp.path == jItem.path) 
                        if(routerItem) {
                            Vue.set(jItem,'code',  routerItem.code)
                        }
                    });
                }
                else {
                    var routerItem = allRouters.find(temp=>temp.path == iItem.path) 
                    if(routerItem) {
                        Vue.set(jItem,'code',  routerItem.code)
                    }
                }
            });
        },
        // 给页面设置权限
        // initPermission(){
        //      this.$store.dispatch('getPermissionList').then((permissionList)=>{
        //         this.navMenuList.forEach(iItem => {
        //             if(iItem.children && iItem.children.length > 0) {
        //                 var itemOkCount = 0;
        //                 iItem.children.forEach((jItem,j) => {
        //                     var indexItem = permissionList.findIndex(temp=>temp.code == jItem.code) 
        //                     if(indexItem >= 0 ) {
        //                         itemOkCount += 1;
        //                     } 
        //                     if(j == iItem.children.length - 1 && itemOkCount > 0) {
        //                             Vue.set(iItem,'show',  true)
        //                     }
        //                     Vue.set(jItem,'show',  indexItem >= 0 ? true: false)
        //                 });
        //             }
        //             else {
        //                 Vue.set(iItem,'show',  permissionList.findIndex(temp=>temp.code == iItem.code) >= 0  >= 0 ? true: false)
        //             }
        //         });
        //     });
        // },
        checkPermission(){

        },
        handleOpen() {

        },
        handleClose() {

        },
        getRouter(item) {
            return { path: item.path };
        },
        togglerMenu(){
            this.isMenuOpen = !this.isMenuOpen;
            this.currentPageName = this.$route.name;
        }
    },
    computed:{
         isShowApiFunction(){
            return true;
        },
        
    },
    watch:{
        $route(){
            this.activeIndex = this.$route.path;
            this.currentPageName = this.$route.name;
            this.asideWidth = String(this.$store.state.homeStore.leftBarWidth);
        }
    },
   
    components:{
        rightTopBar,
    }
}
</script>

<style lang="scss" scoped>
/* S = 重新订单搜索框的样式 */
 /deep/ .search-bar .el-input__inner {
     background: #F5F7FA;
      color: #333
}
 /deep/ .search-bar .el-icon-arrow-up::before {
     content: "\E778";
}
 /deep/ .search-bar .el-icon-arrow-up {
        transform: rotateZ(0)!important;
}
/* E = 重新订单搜索框的样式 */
.search-bar {
    height: 48px;
    transition: all .5s;
    padding-top: 5px;
    border-bottom: 1px solid #1D242D;
}

.search-bar-hide {
    height: 0;
    padding:0;
    border-bottom:0px solid transparent;
    transition: all .5s;
}

.nn-wrapper,
.el-container,
.el-aside {
    height: 100%;
}
.menuHide{
    width: 0!important;
    transition: all .2s;
}
.toggleIcon {
}

.nn-left-bar {
    border-bottom: 1px solid #1D242D;
    color: white;
    text-align: left;
    line-height: 60px;
    height: 60px;
    padding-left: 20px;
    .logo {
        width: 32px;
        border-radius: 50%;
        margin-right: 10px;
        vertical-align: middle;
        transition: all 0.5s;
    }

    // .logo:hover {
    //     width: 48px;
    //     transform: rotateZ(360deg);
    // }
   

    span {
        font-size: 16px;
        font-weight: bold;
    }
}



.nn-content {
    background: white;
    margin: 20px;
    padding: 20px 20px;
    width: 90%;
    border-radius: 5px;
}

.el-aside {
    background: #35404f;
}

.el-main {
    padding: 0;
    background: #ECEEF2;
}

.el-menu {
    border-right: none;
}


.el-menu-item:focus,
.el-menu-item:hover {
    outline: 0;
    // background-color: #323942;
}

.el-menu-item.is-active {
    color: #F3FAFF;
    border-left: 4px solid #2180E3;
    background: #242A31!important;
    box-sizing: border-box;
    color: #CED3D9;
}

.el-menu-item,
.el-submenu__title {
    border-left: 4px solid transparent;
    background: #303743;
    color: rgba(255,255,255,.7);
}

.menuBreakword {
    white-space: normal;
    padding-left: 40px;
    line-height: 18px!important;
    padding-top: 6px!important;
    padding-right: 20px!important;
}

</style>
<style lang="scss">
     .home-wrapper {
         //子菜单嵌套子菜单样式
        .el-submenu .el-submenu__title {
            border-left: 4px solid transparent;
            background: #35404f;
            color: rgba(255,255,255,.7);
            // border-bottom: 1px solid #47474F;
            text-align: left;
            // padding-left: 35px!important;

            >i {
                color: rgba(255,255,255,.7);
            }
        }
        .el-menu-item:hover {
            outline: 0;
            background-color: #313742;
            color: white;
            font-size: 14px!important;
            transition: all .2s;
        }
        .el-menu-item-group__title {
            padding:0;
        }
        .el-submenu.is-active .el-submenu__title {
             border-bottom-color: rgba(31, 31, 34, 0.945);
        }

        .el-submenu .el-menu-item {
            text-align: left;
            padding-left: 48px!important;
            font-size: 13px;
        }
     }

</style>
<style lang="scss" scoped>
    /deep/ .el-aside {
        resize: horizontal;
    }
</style>
