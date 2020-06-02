<template>
<el-dialog title="近30天详情" :visible.sync="detailsDialogForm.detailsDialogVisible" width="60%" class="ta-l" :close-on-click-modal="false">
    <el-form ref="detailsDialogForm" :model="detailsDialogForm" label-width="140px" :inline="true" align="left">
        <el-form-item label="注册日期：">
            {{regDate}}
        </el-form-item>
        <el-form-item label="渠道商渠道号：">
            {{channelName}}
        </el-form-item>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%;margin-top: -5px;" align="left" border>
                <el-table-column label="日期" prop="businessDate">
                </el-table-column>
                <el-table-column label="用户注册数" prop="regCount">
                </el-table-column>
                <el-table-column label="购买卡用户数" prop="buyCardUserCount">
                </el-table-column>
                <el-table-column label="app登录数（首次" prop="appLoginCount">
                </el-table-column>
                <el-table-column label="激活卡用户数" prop="activeCardUserCount">
                </el-table-column>
                <el-table-column label="完成0元购用户数" prop="freeActAttendedUserCount">
                </el-table-column>
                <el-table-column label="完成50元红包领取数" prop="redPacketUsedCount">
                </el-table-column>
            </el-table>
        </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogForm.detailsDialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="detailsDialogForm.detailsDialogVisible = false">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        callgetChannelDataChangeDetail() {
            let paramJson = {
                regDate: this.regDate,
                channelName:this.channelName,
            };
            sendPost(urls.getChannelDataChangeDetail, {data: JSON.stringify(paramJson)},(resultJson)=>{
                this.tableData  = resultJson.resultData.channelDataChanges;
            });
        },
    },
    watch:{
        'detailsDialogForm.detailsDialogVisible'(){
            if(this.detailsDialogForm.detailsDialogVisible) {
                this.callgetChannelDataChangeDetail();
            }
        }
    },
    components: {
    },
    props: ['detailsDialogForm','regDate','channelName']
}
</script>

<style lang="scss" scoped>

 
</style>
