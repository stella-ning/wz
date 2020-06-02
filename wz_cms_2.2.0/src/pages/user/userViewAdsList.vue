<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="广告触发">
            <el-select v-model="form.adsScene" placeholder="请选择">
                <el-option v-for="item in adsSceneList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="用户账号">
            <el-input class="nn-input-s" v-model="form.userAccount" placeholder="精确搜索"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
            <el-select v-model="form.adsType" placeholder="请选择">
                <el-option v-for="item in adsTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <div class="nn-form-line-h"></div>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%"  align="left" border>
                <el-table-column label="序号" prop="" width="80">
                     <template slot-scope="scope">
                        <span>{{scope.$index}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户账号" prop="">
                </el-table-column>
                <el-table-column label="生成时间" prop="">
                </el-table-column>
                <el-table-column label="广告触发" prop="">
                    <template slot-scope="scope">
                        
                    </template>
                </el-table-column>
                <el-table-column label="广告类型" prop="">
                    <template slot-scope="scope">
                        
                    </template>
                </el-table-column>
            </el-table>
        <!--分页-->
        <div class="mt-20">
            <VPagination  ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount"  @callTableData= "callTableData" ></VPagination>
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
            adsSceneList: [{
                label: '全部',
                value: '',
            }, {
                label: '每日签到奖励翻倍，看广告',
                value: 1
            }, {
                label: '【看视频，领红包】刮奖，看广告',
                value: 2
            }, {
                label: '【一起获得500金币】任务，看广告',
                value: 3
            }, ],
            adsTypeList: [{
                label: '全部',
                value: '',
            }, {
                label: '静态广告',
                value: 1
            }, {
                label: '视频广告',
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
