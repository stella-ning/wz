<template>
<PasswordPannel>
    <el-form ref="form" :model="form" label-width="160px" :inline="true" align="left">
        <el-form-item label="android下载地址">
            <el-input type="textarea" :autosize="{ minRows: 3}" class="nn-input-l" v-model="form.androidDownloadUrl" placeholder=""></el-input>
            <el-button class="ml-20" size="small" type="primary" @click="calUpdateConstantValue('androidDownloadUrl')">保 存</el-button>
        </el-form-item>
        <el-form-item label="ios下载地址">
            <el-input type="textarea" :autosize="{ minRows: 3}" class="nn-input-l" v-model="form.iosDownloadUrl" placeholder=""></el-input>
            <el-button class="ml-20" size="small" type="primary" @click="calUpdateConstantValue('iosDownloadUrl')">保 存</el-button>
        </el-form-item>
              <el-form-item label="买卡地址重定向项目名">
            <el-input type="textarea" :autosize="{ minRows: 3}" class="nn-input-l" v-model="form.buyCardPageUrl" placeholder=""></el-input>
            <el-button class="ml-20" size="small" type="primary" @click="calUpdateConstantValue('buyCardPageUrl')">保 存</el-button>
        </el-form-item>
    </el-form>
</PasswordPannel>
</template>

<script>
import PasswordPannel from '@/components/security/PasswordPannel'
export default {
    data() {
        return {
            form: {
                androidDownloadUrl: '',
                iosDownloadUrl: '',
                buyCardPageUrl:'',
                
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.$store.dispatch('callConstantValue', 'androidDownloadUrl').then(result => {
                this.form.androidDownloadUrl = result;
            })
            this.$store.dispatch('callConstantValue', 'iosDownloadUrl').then(result => {
                this.form.iosDownloadUrl = result;
            })
             this.$store.dispatch('callConstantValue', 'buyCardPageUrl').then(result => {
                this.form.buyCardPageUrl = result;
            })
        },
        calUpdateConstantValue(constantName) {
            var paramJson = {
                constantName: constantName,
                // constantValue: encodeURIComponent(this.form[constantName]),
                constantValue: this.form[constantName],
                constantValue: this.form[constantName],
            }
            sendPost(urls.updateConstantValue, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.$store.dispatch('callConstantValue', constantName).then(result =>  this.form[constantName] = result)
                });
            });
        },
    },
    components: {
        PasswordPannel
    }
}
</script>

<style lang="scss" scoped>

    
</style>
