<template>
    <div>
        
        <template v-if="!isShowGoodsResource">
            <p class="subTitle">新建活动</p>
            <el-form class="createActiveForm" ref="form" :rules="rules" :model="form" label-width="30%"  align="left" >
                <el-form-item label="商品活动名称：" prop="actName">
                    <el-input v-model="form.actName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="活动负责人：" prop="personInCharge">
                    <el-input v-model="form.personInCharge" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="活动关联的wap页链接：" prop="">
                    <el-input v-model="form.actUrl" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间：" prop="startTime">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        placeholder="选择日期"
                        :timeInterval="30"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动结束时间：" prop="endTime">
                    <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="选择日期"
                        :timeInterval="30"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-divider></el-divider>
                <!-- 商品分组 -->
                <ul class="itemActGroups">
                    <li v-for="(item,index) in form.itemActGroups" :key="index">
                        <el-form-item :label="`商品分组${index+1}名称`">
                            <el-input v-model="item.groupName" placeholder=""></el-input>
                            <el-button  type="text" @click="editRescouce(index,item,item.groupName)">分组商品来源</el-button>
                            <el-button  type="text" style="color:red;" @click="deleteGroup(index)">删除分组</el-button>
                        </el-form-item>
                    </li>
                    <el-button  type="primary" icon="el-icon-plus" style="margin-left:40%;" @click="createActGroup">新建分组</el-button>
                </ul>
                <el-divider></el-divider>
                <el-button  type="primary" size="medium"  @click="submitForm">保存</el-button>
            </el-form>
        </template>
        <template v-else>
            <goodsResource :index="itemActGroupIndex" :itemActGroups="itemActGroupData" @resourceDatas="getResourceDatas($event)" @cancleEdit="isShowGoodsResource = false"></goodsResource>
        </template>
        
    </div>
</template>

<script>
    import goodsResource from './goodsResource';
    export default {
        data(){
            return{
                form: {
                    itemActGroups:[
                        {
                            itemActGroupId:'',
                            groupName:'',
                            itemActGroupParts:[],
                            tbMaterialCatId:'',
                            tbMaterialId:'',
                            itemSource:'',
                        }
                    ],
                },
                rules: {
                    actName: [{
                        required: true,
                        message: '请填写商品活动名称'
                    }],
                    personInCharge: [{
                        required: true,
                        message: '请填写活动负责人'
                    }],
                    actUrl: [{
                        required: true,
                        message: '请填写活动关联的wap页链接'
                    }],
                    startTime: [{
                        required: true,
                        message: '请选择活动开始时间'
                    }],
                    endTime: [{
                        required: true,
                        message: '请选择活动结束时间'
                    }],
                },
                itemTemplate:{
                    itemActGroupId:'',
                    groupName:'',
                    itemActGroupParts:[],
                    tbMaterialCatId:'',
                    tbMaterialId:'',
                    itemSource:'',
                },
                itemActGroupData:{},//商品分组来源
                isShowGoodsResource:false,
                itemActGroupIndex:'',
                itemActGroupName:'',
                isEdit:false,
            }
        },
        created() {
            this.isEdit = this.$route.query.isEdit;
            if(this.isEdit){
                let activeDatas = storageManager.getStorage('activeData');
                this.initForm(activeDatas);
            }
        },
        mounted() {
            
        },
        methods: {
            createActGroup(){
                this.itemTemplate = {
                    itemActGroupId:'',
                    groupName:'',
                    itemActGroupParts:[],
                    tbMaterialCatId:'',
                    tbMaterialId:'',
                    itemSource:'',
                };
                this.form.itemActGroups.push(this.itemTemplate);
            },
            initForm(formData){
                for (var key in formData) {
                    if (formData.hasOwnProperty(key)) {
                        var element = formData[key];
                        this.$set(this.form, key, element)
                    }
                }
            },
            editRescouce(index,item,name){
                if(name){
                    this.itemActGroupIndex = index;
                    for (var key in item) {
                        if (item.hasOwnProperty(key)) {
                            var element = item[key];
                            this.$set(this.itemActGroupData, key, element)
                        }
                    }
                    this.isShowGoodsResource = true;

                }else{
                    this.$message.error('请填写商品分类名称');
                }
                
            },
            getResourceDatas(resourceDatas){
                let itemActGroupParts = resourceDatas.itemActGroupParts;
                for (var key in itemActGroupParts) {
                    if (itemActGroupParts.hasOwnProperty(key)) {
                        var element = itemActGroupParts[key];
                        this.$set(this.form.itemActGroups[resourceDatas.resourceIndex].itemActGroupParts, key, element)
                    }
                }
                //this.form.itemActGroups[resourceDatas.resourceIndex].itemActGroupParts = resourceDatas.itemActGroupParts;
                this.form.itemActGroups[resourceDatas.resourceIndex].itemSource = resourceDatas.itemSource;
                this.form.itemActGroups[resourceDatas.resourceIndex].tbMaterialCatId = resourceDatas.tbMaterialCatId;
                this.form.itemActGroups[resourceDatas.resourceIndex].tbMaterialId = resourceDatas.tbMaterialId;
                this.isShowGoodsResource = false;
            },
            submitForm(isEdit){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                       this.submitRequest()
                    }
                });
            },
            submitRequest(){
                if(this.form.itemActGroups.length == 0){
                    this.$message.error('请添加商品分组');
                    return;
                }
                this.form.startTime = new Date(this.form.startTime).getTime()
                this.form.endTime = new Date(this.form.endTime).getTime()
                //this.form.actUrl = encodeURIComponent(this.form.actUrl)
                let params = {
                    ...this.form
                };
                sendPost(urls.addItemAct, {data: JSON.stringify(params)},(resultJson)=>{
                    this.$router.push('/goodsActive/goodsActiveMannage');
                });
            },
            deleteGroup(index){
                this.form.itemActGroups.splice(index,1)
            }

        },
        components:{
            goodsResource,
        }
    }
</script>

<style lang="scss" scoped>
    .createActiveForm{
        .el-input{
            width:50%;
        }
    }
    .subTitle{
        text-align:left;
        line-height:30px;
    }
</style>