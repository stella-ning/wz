<template>
    <!-- 日期选择控件（开始时间 - 结束时间）对饿了吗UI进行二次封装 -->
    <div>
        <el-date-picker v-model="timeStart" :type="type" placeholder="选择日期">
        </el-date-picker>
        <span class="text-gray">&nbsp;~&nbsp;</span>
        <el-date-picker v-model="timeEnd" :type="type" placeholder="选择日期">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timeStart: this.defaultStart,
            timeEnd: this.defaultEnd,
        }
    },
    methods: {
        //js计算天数差的函数，通用  
        dateDiff(sDate1, sDate2) {
            sDate1 = new Date(sDate1).Format('yyyy-MM-dd');
            sDate2 = new Date(sDate2).Format('yyyy-MM-dd');
            //sDate1和sDate2是2006-12-18格式  
            var aDate, oDate1, oDate2, iDays
            aDate = sDate1.split("-")
            //调用Date的构造函数，转换为12-18-2006格式
            oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            aDate = sDate2.split("-");
            oDate2 = oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            //把相差的毫秒数转换为天数
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
            return iDays
        }
    },
    computed: {
        isDateOk() {
            if (this.timeStart && this.timeEnd && (new Date(this.timeStart).getTime() - new Date(this.timeEnd).getTime() > 0)) {
                warningToast('开始时间不能大于结束时间');
                this.timeStart = '';
            }
            if(this.timeInterval && this.timeStart && this.timeEnd && this.dateDiff(this.timeStart,this.timeEnd) > this.timeInterval) {
                warningToast('日期间隔最多为'+ this.timeInterval + '天');
                this.timeStart = '';
            }
            this.$emit('onTimePick',this.timeStart,this.timeEnd); 
        },

    },
    watch: {
        isDateOk() { },
    },
    props: {
       timeInterval:{},
       defaultStart:{},
       defaultEnd:{},
       type:{
           default:'date',
       }
        
    }
  
}
</script>

<style lang="scss" scoped>
    .el-date-editor {
        width: 210px;
    }
</style>
