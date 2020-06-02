<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="订单状态">
            <el-select v-model="form.orderState" placeholder="请选择">
                <el-option v-for="item in orderStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

        </el-form-item>
        <el-form-item label="时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.account" placeholder="精确搜索-注册手机号"></el-input>
        </el-form-item>
        <el-form-item label="平台">
            <el-select v-model="form.platform" placeholder="请选择">
                <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="form.memberLevel" placeholder="请选择">
                <el-option v-for="item in memberLevelList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="面额">
            <el-select v-model="form.menmbershipPeriod" placeholder="请选择">
                <el-option v-for="item in menmbershipPeriodList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                el-table-column label="下单时间" prop="">
                </el-table-column>
                <el-table-column label="用户账号-注册手机号" prop="">
                </el-table-column>
                <el-table-column label="订单号" prop="">
                </el-table-column>
                <el-table-column label="商品" prop="">
                </el-table-column>
                <el-table-column label="订单状态" prop="">
                </el-table-column>
                <el-table-column label="充值号码" prop="">
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>

        </div>
    </el-form>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            totalPageCount: 0,
            tableData: [],
            form: {},
            orderStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '待支付',
                value: 1
            }, {
                label: '待发货',
                value: 2
            }, {
                label: '已完成',
                value: 3
            }, {
                label: '已关闭',
                value: 4
            }, ],
            platformList: [{
                label: '全部',
                value: '',
            }, {
                label: '腾讯',
                value: 1
            }, {
                label: '爱奇艺',
                value: 2
            }, {
                label: '优酷',
                value: 3
            }, {
                label: '',
                value: 4
            }, ],
            memberLevelList: [{
                label: '全部',
                value: '',
            }, {
                label: '黄金会员',
                value: 1
            }, {
                label: '钻石会员',
                value: 2
            }, ],
            menmbershipPeriodList: [{
                label: '全部',
                value: '',
            }, {
                label: '日卡',
                value: 1
            }, {
                label: '月卡',
                value: 2
            }, {
                label: '季卡',
                value: 3
            }, {
                label: '年卡',
                value: 4
            }, ],
        }
    },
    methods: {
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {

        },
    },
    components: {
        VDateRangePicker,
        VPagination
    }
}
</script>

<style lang="scss" scoped>

 
</style>
