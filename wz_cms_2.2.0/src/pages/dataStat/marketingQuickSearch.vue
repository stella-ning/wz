<template>
<div>
    <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="h5渠道" name="first">
            <marketingQuickSearchTabH5></marketingQuickSearchTabH5>
        </el-tab-pane>
        <el-tab-pane label="app渠道" name="second">
            <marketingQuickSearchTabApp></marketingQuickSearchTabApp>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import marketingQuickSearchTabH5 from '@/components/dataStat/marketingQuickSearchTabH5'
import marketingQuickSearchTabApp from '@/components/dataStat/marketingQuickSearchTabApp'
export default {
    data() {
        return {
            activeName:'first'
        }
    },
    methods: {

    },
    components:{
        marketingQuickSearchTabH5,
        marketingQuickSearchTabApp,
    }
}
</script>

<style lang="scss" scoped>

 
</style>
