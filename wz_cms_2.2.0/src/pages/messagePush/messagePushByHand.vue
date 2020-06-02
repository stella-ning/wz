<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left" @keyup.enter.native="callFirstPage">
        <div class="formCon">
            <el-form-item label="推送标题">
                <el-input v-model="form.titleLike" placeholder="模糊搜索"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
            </el-form-item>
            <el-form-item label="推送状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option v-for="item in pushStateList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始推送时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickPush"></VDateRangePicker>
            </el-form-item>
            <el-form-item label="推送给">
                <el-select v-model="form.pushObj" placeholder="请选择">
                    <el-option v-for="item in pushObjectList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="完成推送时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickFinish"></VDateRangePicker>
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
                        {{new Date(scope.row.createTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="推送消息标题" prop="title">
                </el-table-column>
                <el-table-column label="推送副标题" prop="content">
                </el-table-column>
                <el-table-column label="点击推送跳转至" prop="">
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
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(zcBrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==7">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(kmBrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==8">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(h5BrandList,scope.row.benifitId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==9">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{scope.row.itemName}}
                        </template>
                        <template v-if="scope.row.jumpType ==10">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(itemActs,scope.row.itemActId)}}
                        </template>
                        <template v-if="scope.row.jumpType ==11">
                            {{jumpTypeArr[scope.row.jumpType-1]}}：{{getclassName(otherBenifit,scope.row.benifitId)}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="推送给" prop="">
                    <template slot-scope="scope">
                        <template v-if="scope.row.userGroup>0 && scope.row.pushObj == 2">
                            {{(classPersionList[scope.row.userGroup-1]).label}}
                        </template>
                        <template v-if="scope.row.pushObj == 1">
                            指定用户：{{scope.row.phone}}
                        </template>
                        <template v-if="scope.row.pushObj == 3">
                            所有用户
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="开始推送时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.sendTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="完成推送时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.finishTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="推送消息状态" prop="">
                    <template slot-scope="scope">
                        {{(pushStateList[scope.row.status]).label}}
                    </template>
                </el-table-column>
                <el-table-column label="推送被用户点击数/推送发送的用户数" min-width="120">
                    <template slot-scope="scope">
                        <p>
                            {{`${scope.row.pushMsgClick} / ${scope.row.sendCount}`}}
                        </p>
                       <p>
                            {{`= ${getPercent(scope.row)}%`}}
                       </p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" prop="" width="210">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 1" type="text" @click="onOperation(scope.row.pushContentId,'delete')" style="color:red;">删除</el-button>
                        <el-button v-if="scope.row.status == 2" type="text" @click="onOperation(scope.row.pushContentId,'stop')" style="color:red;">停止推送</el-button>
                        <el-button type="text" @click="showAddDialog(true,scope.row)">以此为模板，创建新推动任务</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!--分页-->
            <VPagination class="mt-20" ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
        </div>
    </el-form>

    <el-dialog title="新建推送" :visible.sync="dialogVisible" width="55%" top="2%" class="ta-l" :close-on-click-modal="false">
        <el-form label-width="150px" style="width: 80%;" ref="messageForm" :model="messageForm">
            <el-form-item label="推送消息标题：" prop="title">
                <el-input autofocus v-model="messageForm.title"></el-input>
            </el-form-item>
            <el-form-item label="推送消息副标题：" prop="content">
                <el-input type="textarea" rows="4" autofocus v-model="messageForm.content"></el-input>
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
                <div class="itemTow">
                    <el-radio v-model="messageForm.jumpType" :label="9">单个商品的商品详情页</el-radio>
                    <el-input autofocus v-model="messageForm.itemName"></el-input>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.jumpType" :label="10">wap商品活动页</el-radio>
                    <el-select v-model="messageForm.itemActId" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'hd')">
                        <el-option v-for="item in itemActs" :key="item.itemActId" :label="item.actName" :value="item.itemActId">
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
            <el-divider></el-divider>
            <el-form-item label="推送给：">
                <div class="itemRow">
                    <el-radio v-model="messageForm.pushObj" :label="1">指定用户</el-radio>
                    <el-input autofocus v-model="messageForm.phone"></el-input>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.pushObj" :label="2">群体用户</el-radio>
                    <el-select v-model="messageForm.userGroup" filterable allow-create default-first-option placeholder="请选择" @change="selectChange($event,'qtyh')">
                        <el-option v-for="item in classPersionList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <div>
                        且，用户注册时间为：
                        <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onRegTimeStartPick"></VDateRangePicker>
                    </div>
                </div>
                <div class="itemRow">
                    <el-radio v-model="messageForm.pushObj" :label="3">所有用户</el-radio>
                </div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="开始推送时间：">
                <el-date-picker v-model="messageForm.sendTime" type="datetime" placeholder="选择日期" :timeInterval="30">
                </el-date-picker>
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
            this.form.createTimeStart = timeStart;
            this.form.createTimeEnd = timeEnd;
        },
        onTimePickPush(timeStart, timeEnd) {
            this.form.sendTimeStart = timeStart;
            this.form.sendTimeEnd = timeEnd;
        },
        onTimePickFinish(timeStart, timeEnd) {
            this.form.finishTimeStart = timeStart;
            this.form.finishTimeEnd = timeEnd;
        },
        onRegTimeStartPick(timeStart, timeEnd) {
            this.messageForm.regTimeStart = timeStart;
            this.messageForm.regTimeEnd = timeEnd;
        },
        onSendTimePick(time) {
            this.messageForm.sendTime = new Date(time).getTime()
            console.log(this.messageForm.sendTime)
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
        tableEditClick(row) {
            Vue.set(row, 'editing', true);
        },
        tableCancelClick(row) {
            Vue.set(row, 'editing', false);
        },
        tableConfirmClick(row) {
            Vue.set(row, 'editing', false);
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
            sendPost(urls.getPushContentList, {
                    data: JSON.stringify(paramJson)
                },
                (resultJson) => {
                    this.tableData = resultJson.resultData.pushContents;
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
            sendPost(urls.addPushContent, {
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
            if (type == 'delete') {
                tipsTxt = '确定要删除该条未推送的消息吗？'
            } else if (type == 'stop') {
                tipsTxt = '确定要停止推送该条消息吗？'
            }
            this.$alert(tipsTxt, '温馨提醒', {
                confirmButtonText: '确定',
            }).then(() => {
                if (type == 'delete') {
                    this.delPushContent(id)
                } else if (type == 'stop') {
                    this.stopPushContent(id)
                }

            })
        },
        //删除未推送的消息
        delPushContent(pushContentId) {
            let params = {
                pushContentId: pushContentId
            };
            sendPost(urls.delPushContent, {
                    data: JSON.stringify(params)
                },
                (resultJson) => {
                    successToast('删除成功', () => {
                        this.callFirstPage();
                    });
                }
            );
        },
        //停止推送
        stopPushContent(pushContentId) {
            let params = {
                pushContentId: pushContentId
            };
            sendPost(urls.stopPushContent, {
                    data: JSON.stringify(params)
                },
                (resultJson) => {
                    successToast('停止推送操作成功', () => {
                        this.callFirstPage();
                    });
                }
            );
        }
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
