<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="支付状态">
            <el-select v-model="form.paidState" placeholder="请选择">
                <el-option v-for="item in paidStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="时间">
            <VDateRangePicker type="datetime" :timeInterval="0" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="通道">
            <el-select v-model="form.payType" placeholder="请选择">
                <el-option v-for="item in payTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="对应订单">
            <el-input class="nn-input-s" v-model="form.order" placeholder="香兰会员订单号 "></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.account" placeholder="精确搜索-注册手机号"></el-input>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="时间" prop="">
                </el-table-column>
                <el-table-column label="支付单号" prop="">
                </el-table-column>
                <el-table-column label="金额" prop="">
                </el-table-column>
                <el-table-column label="支付状态" prop="">
                    <template slot-scope="scope">

                    </template>
                </el-table-column>
                <el-table-column label="支付通道" prop="">
                    <template slot-scope="scope">

                    </template>
                </el-table-column>
                <el-table-column label="对应订单号" prop="">
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
            paidStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '处理中',
                value: 1
            }, {
                label: '成功',
                value: 2
            }, {
                label: '失败',
                value: 3
            }, ],
            payTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: '支付宝',
                value: 1
            }, {
                label: '微信',
                value: 2
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
