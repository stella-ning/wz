<template>
<div>

    <el-container>
        <el-aside width="200px">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            activeName:'first',
        }
    },
    mounted() {

    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    components: {}
}
</script>

<style lang="scss" scoped>
.inputItem {
    //   display: inline-block; 
    width: 22%;
    margin-right: 1%;
    margin-left: 1%;
}

.mt-20 {
    //   margin-top:20px;
}
</style>
