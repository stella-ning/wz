<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left" @keyup.enter.native="callFirstPage">
        <div class="formCon">
            <el-form-item label="链接标题">
                <el-input v-model="form.smsTitle" placeholder="模糊搜索"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
            </el-form-item>
        </div>
        <div class="formBtn">
            <el-form-item class="ml-20">
                <el-button type="primary" icon="el-icon-search" @keyup.enter.native="callFirstPage" @click="callFirstPage">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
                <el-button type="success" icon="el-icon-plus" @click="showAddDialog(false)">新建推送</el-button>
            </el-form-item>
        </div>

        <p class="nn-form-line-h"></p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="创建时间" prop="">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="短信链接标题" prop="smsTitle">
                </el-table-column>
                <el-table-column label="点击链接跳转至" prop="">
                    <template slot-scope="scope">
                        <template v-if="scope.row.jumpType == 1">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getpageName(appPageList,scope.row.nativeJumpPageId)}}
                        </template>
                        <template v-if="scope.row.jumpType == 2">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{scope.row.urlMp}}
                        </template>
                        <template v-if="scope.row.jumpType == 3">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{scope.row.urlW}}
                        </template>
                        <template v-if="scope.row.jumpType ==4">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(lxBrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==5">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(yjyBrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==6">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(zcBrandList,scope.row.benifitProductId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==7">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(kmBrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==8">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(h5BrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==11">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(otherBenifit,scope.row.benifitId)}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="链接详细" prop="smsUrl">
                   
                </el-table-column>
                
                <el-table-column label="链接点击的用户数" min-width="120" prop="clickCount">
                    
                </el-table-column>

                <el-table-column label="操作" prop="" width="210">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showAddDialog(true,scope.row)">修改跳转</el-button>
                        <el-button type="text" @click="onOperation(scope.row.smsMarketingContentId,'delete')" style="color:red;">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!--分页-->
            <VPagination class="mt-20" ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
        </div>
    </el-form>

    <el-dialog title="新建营销短信配置" :visible.sync="dialogVisible" width="55%" top="2%" class="ta-l" :close-on-click-modal="false">
        <el-form label-width="200px" style="width: 80%;" ref="messageForm" :model="messageForm">
            <el-form-item label="营销短信id（唯一的）：" prop="smsMarketingContentId">
                <div>{{messageForm.smsMarketingContentId}}</div>
            </el-form-item>
            <el-form-item label="短信链接标题：" prop="smsTitle">
                <el-input autofocus v-model="messageForm.smsTitle"></el-input>
            </el-form-item>
            
            <el-form-item label="短信链接（wap地址）：" prop="smsUrl">
                <el-input autofocus v-model="messageForm.smsUrl"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="点击推送跳转至：">
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="1">原生页</el-radio>
                    <el-select v-model="messageForm.nativeJumpPageId" filterable allow-create default-first-option placeholder="请选择">
                        <el-option v-for="item in appPageList" :key="item.nativeJumpPageId" :label="item.pageName" :value="item.nativeJumpPageId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemTow">
                    <el-radio v-model="messageForm.jumpType" :label="2">微信小程序页面链接</el-radio>
                    <el-input autofocus v-model="messageForm.urlMp"></el-input>
                </div>
                <div class="itemTow">
                    <el-radio v-model="messageForm.jumpType" :label="3">手机网页页面链接</el-radio>
                    <el-input autofocus v-model="messageForm.urlW"></el-input>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="4">烈熊类权益品牌</el-radio>
                    <el-select v-model="messageForm.lxBrand" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'lx')">
                        <el-option v-for="item in lxBrandList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="5">易加油类权益品牌</el-radio>
                    <el-select v-model="messageForm.yjyBrand" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'yjy')">
                        <el-option v-for="item in yjyBrandList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="6">直冲类权益品牌</el-radio>
                    <el-select v-model="messageForm.zcBrand" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'zc')">
                        <el-option v-for="item in zcBrandList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="7">卡密类权益品牌</el-radio>
                    <el-select v-model="messageForm.kmBrand" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'km')">
                        <el-option v-for="item in kmBrandList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="8">h5跳转类权益品牌</el-radio>
                    <el-select v-model="messageForm.h5Brand" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'h5')">
                        <el-option v-for="item in h5BrandList" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="11">其他权益类型</el-radio>
                    <el-select v-model="messageForm.otherBenifit" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'qt')">
                        <el-option v-for="item in otherBenifit" :key="item.benifitId" :label="item.benifitName" :value="item.benifitId">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('messageForm')">保存</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
import Vue from 'vue';
export default {
    data() {
        return {
            form: {},
            pushStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '未推送',
                value: 1
            }, {
                label: '推送中',
                value: 2
            }, {
                label: '完成推送',
                value: 3
            }, {
                label: '推送被手动停止',
                value: 4
            }, ],
            pushObjectList: [{
                label: '全部',
                value: '',
            }, {
                label: '指定用户',
                value: 1
            }, {
                label: '群体用户',
                value: 2
            }, {
                label: '所有用户',
                value: 3
            }],
            totalPageCount: 0,
            tableData: [],
            dialogVisible: false,
            row: {},

            isEdit: false,
            //跳转类型 
            jumpTypeArr: ['原生页面', '微信小程序页面', '手机网页', '烈熊类权益', '易加油类权益', '直冲类权益', '卡密类权益', 'h5跳转类权益','单个商品的商品详情页','wap商品活动页','其他权益类型'],
            //新建推送
            messageForm: {
                sendTime: ''
            },
            appPageList: [],
            lxBrandList: [],
            yjyBrandList: [],
            zcBrandList: [],
            kmBrandList: [],
            h5BrandList: [],
            itemActs:[],//商品活动选项
            otherBenifit:[],//其他权益类型
            classPersionList: [{
                label: '已注册，未买卡用户',
                value: 1,
            }, {
                label: '已注册，已买卡，未激活卡用户',
                value: 2,
            }, {
                label: '未完成0元购用户',
                value: 3,
            }, {
                label: '未完成1元购任务用户',
                value: 4,
            }, {
                label: '已激活卡用户',
                value: 5,
            }, ],
            initMessageForm: {
                jumpType: null,
                pushObj: null,


            },

        }
    },
    created() {
        this.getSelectList()
    },
    mounted() {
        this.$nextTick(() => {
            this.callFirstPage({});
        })

    },
    methods: {
        getPercent(row) {
            if(Number(row.pushMsgClick) == 0) {
                return 0;
            }
            if (row.sendCount > 0) {
                return (Number(row.pushMsgClick) / Number(row.sendCount) *100).toFixed(2)
            }
            return 0
        },
        getSelectList() {
            sendPost(urls.getSelectList, {
                    data: JSON.stringify({})
                },
                (res) => {
                    this.appPageList = res.resultData.nativeJumpPageList;
                    this.lxBrandList = res.resultData.lieXiongList;
                    this.yjyBrandList = res.resultData.yiJiaYouList;
                    this.zcBrandList = res.resultData.zhiChongList;
                    this.kmBrandList = res.resultData.kaMiList;
                    this.h5BrandList = res.resultData.h5List;
                    this.itemActs = res.resultData.itemActs;
                    this.otherBenifit = res.resultData.otherBenifit;
                }
            );
        },
        selectChange(val) {
            //val是当前选中的值
            //this.$forceUpdate就是重新render
            this.$forceUpdate()
        },
        getpageName(list, id) {
            let pageName;
            list.map((item) => {
                if (item.nativeJumpPageId == id) {
                    pageName = item.pageName;
                }
            })
            return pageName;
        },
        getclassName(list, id) {
            let benifitName,itemActName;

            list.map((item) => {
                if (item.benifitId == id) {
                    benifitName = item.benifitName;
                    
                }
                if(item.itemActId == id){
                    benifitName = item.actName;
                }
            })
            return benifitName;
            
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        showAddDialog(isEdit, row = {}) {
            this.isEdit = isEdit;
            this.dialogVisible = true;
            this.messageForm = JSON.parse(JSON.stringify(this.initMessageForm))
            if (!isEdit) {
                for (var key in this.messageForm) {
                    if (this.messageForm.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.messageForm, key, '')
                    }
                }
                this.messageForm = {
                    ...this.messageForm,
                    ...this.initMessageForm
                }
                return;
            } else {

                for (var key in row) {
                    if (row.hasOwnProperty(key)) {
                        var element = row[key];
                        Vue.set(this.messageForm, key, element)
                    }
                }
                if (this.messageForm.userGroup == -1) {
                    this.messageForm.userGroup = ''
                }
                if(this.messageForm.itemActId == 0){
                    this.messageForm.itemActId = ''
                }
                if(this.messageForm.itemId){
                    this.messageForm.itemId = ''
                }
                console.log(this.messageForm)
            }

            //区别跳转类型的选项
            switch (this.messageForm.jumpType) {
                case 4:
                    this.messageForm.lxBrand = this.messageForm.benifitId
                    break;
                case 5:
                    this.messageForm.yjyBrand = this.messageForm.benifitId
                    break;
                case 6:
                    this.messageForm.benifitId = this.messageForm.zcBrand
                    break;
                case 7:
                    this.messageForm.kmBrand = this.messageForm.benifitId
                    break;
                case 8:
                    this.messageForm.h5Brand = this.messageForm.benifitId
                    break;
            }

        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法。
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {
                ...paramJson,
                ...this.form
            };
            sendPost(urls.getSmsMarketingContentList, {
                    data: JSON.stringify(paramJson)
                },
                (resultJson) => {
                    this.tableData = resultJson.resultData.smsList;
                    this.totalPageCount = resultJson.resultData.count;
                }
            );
        },

        submitForm(formName) {
            this.callAddPushContent(function () {
                this.dialogVisible = false;
                this.callFirstPage();
            });
        },
        hideAddChannelialog() {
            this.channelDialogVisible = false;
        },
        //新建推送
        callAddPushContent() {
            switch (this.messageForm.jumpType) {
                case 4:
                    this.messageForm.benifitId = this.messageForm.lxBrand
                    break;
                case 5:
                    this.messageForm.benifitId = this.messageForm.yjyBrand
                    break;
                case 6:
                    this.messageForm.benifitId = this.messageForm.zcBrand
                    break;
                case 7:
                    this.messageForm.benifitId = this.messageForm.kmBrand
                    break;
                case 8:
                    this.messageForm.benifitId = this.messageForm.h5Brand
                    break;
                case 11:
                    this.messageForm.benifitId = this.messageForm.otherBenifit
            }
            this.messageForm.sendTime = new Date(this.messageForm.sendTime).getTime()
            let paramJson = {
                ...this.messageForm
            };
            sendPost(urls.addSmsMarketingContent, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.dialogVisible = false;
                    this.callFirstPage();
                });
            });
        },
        //操作删除或者停止推送
        onOperation(id, type) {
            let tipsTxt;
            tipsTxt = '确定要删除该条未推送的消息吗？'
            this.$alert(tipsTxt, '温馨提醒', {
                confirmButtonText: '确定',
            }).then(() => {
                this.delPushContent(id)

            })
        },
        //删除营销短信消息
        delPushContent(pushContentId) {
            let params = {
                smsMarketingContentId: pushContentId
            };
            sendPost(urls.delSmsMarketingContent, {
                    data: JSON.stringify(params)
                },
                (resultJson) => {
                    successToast('删除成功', () => {
                        this.callFirstPage();
                    });
                }
            );
        },
    },
    components: {
        VDateRangePicker,
        VPagination,
    }
}
</script>

<style lang="scss" scoped>
.ta-l {
    /deep/ .el-dialog {
        height: auto;
        max-height: 90vh;
        overflow-y: scroll;
    }

}

.formCon {
    display: inline-block;
    width: 72%;

    /deep/ .el-form-item__content .el-select .el-input__inner {
        width: 150px;
        min-width: 150px;
    }
}

.formBtn {
    display: inline-block;
    width: 27%;

    .el-form--inline .el-form-item {
        margin-left: 0;
        margin-right: 0;
    }
}

.itemRow {
    margin-top: 15px;

    /deep/ .el-radio {
        widows: 130px;
    }
}
</style>
