<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="转盘每多少次总数">
            <el-input class="nn-input-s" v-model="form.turntableHowCount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="转盘每天总数">
            <el-input class="nn-input-s" v-model="form.turntableDayAmount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="成语每多少次奖励">
            <el-input class="nn-input-s" v-model="form.idiomHowCount" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="成语每天总数">
            <el-input class="nn-input-s" v-model="form.idiomDayAmount" placeholder=""></el-input>
        </el-form-item>
    </el-form>
    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="calUpdateConstantValue">保 存</el-button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            paramsList: ['turntableHowCount', 'turntableDayAmount', 'idiomHowCount', 'idiomDayAmount'],
            form: {}
        }
    },
    created() {
        this.callData();
    },

    methods: {
        callData() {
            this.$store.dispatch('callConstantValues', this.paramsList).then(constantValue => {
                this.form = constantValue;
            })
        },
        calUpdateConstantValue(constantName) {
            let paramJson = {
                constantNames: this.form
            };
            sendPost(urls.updateConstantValues, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.callData();
                });
            });
        },
    }
}
</script>

<style lang="scss" scoped>

 
</style>
