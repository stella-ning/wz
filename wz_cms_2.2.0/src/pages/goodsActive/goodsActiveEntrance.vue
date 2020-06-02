<template>
<div>
    <div class="nn-table-wrapper">
        <el-table  class="mt-20 mb-40 nn-no-overflow-table" :data="tableData"  style="width: 100%" align="left" border>
            <el-table-column label="入口名称" prop="entranceName" width="80"></el-table-column>
            <el-table-column label="入口图片" prop="" width="150">
                <template slot-scope="scope">
                    <VPickSelect :fileType="6"  subTips="选择闪屏图片" :index="scope.$index" @onUploadSuccess="onUploadSuccess" class="pic-selecter" :logoImageUrl="scope.row.picUrl"></VPickSelect>
                    <div>
                        背景色：
                        <el-input type="text" v-model="scope.row.bgColor"></el-input>
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column label="是否展示" prop="">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.display" placeholder="请选择">
                        <el-option
                        v-for="item in displayList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="跳转位置" prop="" width="350">
                <template slot-scope="scope">
                    <div class="ta-l">
                        <el-radio v-model="scope.row.jumpType" :label="1">原生页</el-radio>
                        <p>
                            <el-select v-model="scope.row.nativeJumpPageId" placeholder="请选择">
                                <el-option v-for="item in nativeJumpPageList" :key="item.nativeJumpPageId" :label="item.pageName" :value="item.nativeJumpPageId">
                                </el-option>
                            </el-select>
                        </p>
                    </div>
                    <div class="ta-l mt-10">
                        <el-radio v-model="scope.row.jumpType" :label="2">微信小程序页面链接</el-radio>
                        <el-input class="nn-input-xm" :autosize="{ minRows: 2}" type="textarea" v-model="scope.row.urlMp" placeholder=""></el-input>
                    </div>
                    <div class="ta-l mt-10">
                        <el-radio v-model="scope.row.jumpType" :label="3">手机网页页面链接</el-radio>
                        <el-input class="nn-input-xm" :autosize="{ minRows: 2}" type="textarea" v-model="scope.row.urlW" placeholder=""></el-input>
                    </div>
                     <div class="ta-l mt-10">
                        <el-radio v-model="scope.row.jumpType" :label="4">首页商品活动</el-radio>
                        <p>
                           跳转至：
                           <el-select v-model="scope.row.itemActId" placeholder="请选择">
                                <el-option v-for="item in itemActNameAndIdList" :key="item.itemActId" :label="item.actName" :value="item.itemActId">
                                </el-option>
                            </el-select>
                           <a class="text-blue" :href="scope.row.actUrl" >对应的手机网页</a>
                        </p>
                    </div>
                </template>
            </el-table-column>

        </el-table>
       
        
    </div>
    <div class="ta-l mt-20 nn-bottom-bar">
        <el-button type="primary" @click="updateItemActEntrance">保 存</el-button>
    </div>
</div>
</template>

<script>
import VPickSelect from "@/components/custom/VPicSelect";
export default {
    data() {
        return {
            tableData: [],
            nativeJumpPageList: [],
            itemActNameAndIdList:[],
            displayList: [],

        }
    },
    created() {

    },
    mounted() {
        this.getItemActNameAndIdList();
        this.getItemActEntrance();
         this.$store.dispatch('callConstantValue', 'homeDisplaySettings').then(constantValue => {
            this.displayList = JSON.parse(constantValue);
        })
    },
    methods: {
        
        getApiName(value,list) {
            var label = '';
            list.forEach((element)=> {
                if (String(element.outId) == String(value)) {
                    label = element.benifitName;
                }
            });
            return label;
        },
        onUploadSuccess(imgUrl,index){
            this.$set(this.tableData[index],'picUrl',imgUrl)
        },
        //获取商品活动名称和id
        getItemActNameAndIdList(){
            let params = {};
            sendPost(urls.getItemActNameAndIdList,{
                data:JSON.stringify(params)
            },(res)=>{
                this.itemActNameAndIdList = res.resultData.itemActs;
            })
        },
        //获取列表
        getItemActEntrance() {
            let paramJson = {};
            sendPost(urls.getItemActEntrance, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.nativeJumpPageList = resultJson.resultData.nativeJumpPageList;
                this.tableData = resultJson.resultData.itemActEntrances;
                this.tableData.forEach(element => {
                    this.nativeJumpPageList = resultJson.resultData.nativeJumpPageList;
                    if(!element.picUrl){
                        this.$set(element,'picUrl','')
                    }
                    if(element.jumpType == 2) {
                        this.$set(element,'urlMp',element.urlMp)
                    }
                    if(element.jumpType == 3) {
                        this.$set(element,'urlW',element.urlW)
                    }
                    if(element.jumpType ==4)  {
                        this.$set(element,'actUrl',element.actUrl)
                    }
                });
                
            });
        },
        //更新配置
        updateItemActEntrance() {
            let paramJson = {
                setting: JSON.parse(JSON.stringify(this.tableData)),
            };
            paramJson.setting.forEach(element => {
                if(element.jumpType == 2) {
                    this.$set(element,'urlMp',(element.urlMp || ''))
                }
                if(element.jumpType == 3) {
                    this.$set(element,'urlW',(element.urlW || ''))
                }
                if(element.jumpType ==4)  {
                    this.$set(element,'actUrl',(element.actUrl || ''))
                }
                
                element.picUrl = encodeURIComponent(element.picUrl)
                element.urlW = encodeURIComponent(element.urlW)
                element.urlMp = encodeURIComponent(element.urlMp)
                element.actUrl = encodeURIComponent(element.actUrl)
            });
            sendPost(urls.updateItemActEntrance, {data: JSON.stringify(paramJson)},(resultJson)=>{
                successToast(resultJson.resultMsg,()=>{
                    this.getItemActEntrance();
                });
            });
        },
    },
    components: {
        VPickSelect
    }

}
</script>

<style lang="scss" scoped>
.pic-selecter {
    height: 7vw;
    width: 7vw;
    border: 1px solid #dcdcdc;

}

/deep/ .el-switch__label--left {
    color: #999;
}
</style>
