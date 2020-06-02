<template>
<div>
    <el-form ref="form" :model="form" label-width="140px" :inline="true" align="left">
        <el-form-item label="">
            <el-form-item label="卡号">
                <el-input class="nn-input-s" v-model="form.cardNo" placeholder="请输入卡号"></el-input>
            </el-form-item>
        </el-form-item>
        <el-form-item label="生成时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePick"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="激活码">
            <el-input class="nn-input-s" v-model="form.activationCode" placeholder="请输入激活码"></el-input>
        </el-form-item>
        <el-form-item label="制成卡时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickGenerate"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="会员卡状态">
            <el-select v-model="form.cardState" placeholder="请选择">
                <el-option v-for="item in cardStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发放时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickDeliver"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="发送给用户的账号">
           <el-input class="nn-input-s" v-model="form.phone" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item label="激活卡时间">
            <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickActivate"></VDateRangePicker>
        </el-form-item>
        <el-form-item label="生成类型">
            <el-select v-model="form.cardType" placeholder="请选择">
                <el-option
                v-for="item in [{label:'全部',value:''},...cardTypeList]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="success" icon="el-icon-plus" @click="showMembershipDialogVisible">添加会员卡</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="showBatchUpdateMembershipDialog">批量修改会员卡状态成【已制成卡】</el-button>
            <el-button type="warning" icon="el-icon-upload2" @click="showExportDialog">导出会员卡号</el-button>
            <el-button type="primary" icon="el-icon-search" @click="callFirstPage">查 询</el-button>
        </el-form-item>
        <p class="nn-form-line-h"></p>
        <div class="nn-table-wrapper">
            <el-table class="mt-20 nn-no-overflow-table" :data="tableData" style="width: 100%" align="left" border>
                <el-table-column label="用户真实姓名" prop="" width="120">
                    <template slot-scope="scope">
                         {{scope.row.realName || '-'}}
                    </template>
                </el-table-column>
                <el-table-column label="卡号" prop="cardNo" min-width="120">
                </el-table-column>
                <el-table-column label="激活码" prop="activationCode">
                </el-table-column>
                <el-table-column label="会员卡状态" prop="">
                    <template slot-scope="scope">
                        {{scope.row.cardState | getLabelByValue(cardStateList)}}
                    </template>
                </el-table-column>
                <el-table-column label="生成时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.addTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="制成卡时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.generateTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="发放时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.deliverTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="发放给用户的账号" prop="phone" min-width="140">
                </el-table-column>
                <el-table-column label="激活卡时间" prop="" min-width="100">
                    <template slot-scope="scope">
                        {{new Date(scope.row.activateCardTime).Format()}}
                    </template>
                </el-table-column>
                <el-table-column label="生成类型" prop="" min-width="120">
                    <template slot-scope="scope">
                        {{scope.row.cardType | getLabelByValue(cardTypeList)}}
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" prop="" width="300">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.cardState == 1" type="text" @click="showCardCreateDialogVisible(scope.row)">修改状态成【已制成卡】</el-button>
                        <!-- <el-button v-if="scope.row.cardState == 2" type="text" @click="showCardSentToUserDialog(scope.row)">修改状态成【已发放给用户，未激活】</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div class="mt-20">
                <VPagination ref="vPage" :tableData="tableData" :totalPageCount="totalPageCount" @callTableData="callTableData"></VPagination>
            </div>
        </div>
    </el-form>
    <!-- 添加会员卡对话框 -->
    <el-dialog title="添加/会员卡" :visible.sync="membershipDialogVisible" width="40%" style="text-align: left">
        <el-form ref="membershipDialogForm" :model="membershipDialogForm" label-width="140px" :inline="true" align="left" :rules="membershipDialogRules">
            <el-form-item label="添加张数" prop="cardCount">
                <el-input class="nn-input-s" v-model="membershipDialogForm.cardCount" placeholder="请输入张数"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="membershipDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('membershipDialogForm')">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 更新状态对话框 -->
    <el-dialog title="批量修改会员卡状态成【已制成卡】" :visible.sync="batchUpdateMembershipDialogVisible" width="45%" style="text-align: left">
        <el-form ref="batchUpdateMembershipDialogForm" :model="batchUpdateMembershipDialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="生成时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickBatchUpdateMembership"></VDateRangePicker>
            </el-form-item>

            <div class="color-999 lh-24 mt-20">
                <p>注： 生成时间段内，【已生成，未制成卡】，状态修改成【已制成卡，未发放】</p>
                <p> 生成时间段内，其他状态的卡，不变化；</p>
            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="batchUpdateMembershipDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callGenerateMembershipCard(2,batchUpdateMembershipDialogForm)">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 修改状态成【已发放给用户，未激活】 -->
    <el-dialog title="修改状态成【已发放给用户，未激活】" :visible.sync="cardSentToUserDialogVisible" width="60%" style="text-align: left">
        <el-form ref="cardSentToUserDialogForm" :model="cardSentToUserDialogForm" :rules="cardSentToUserDialogRules" label-width="140px" :inline="false" align="left">
            <el-form-item label="卡号" prop="">
                <p>{{cardSentToUserDialogForm.cardNo}}</p>
            </el-form-item>
            <el-form-item label="激活码" prop="">
                <p>{{cardSentToUserDialogForm.activationCode}}</p>
            </el-form-item>
            <el-form-item label="发放给用户的账号" prop="phone">
                <el-input class="nn-input-s" v-model="cardSentToUserDialogForm.phone" placeholder="输入账号手机号"></el-input>
            </el-form-item>
            <el-form-item label="用户真实姓名" prop="realName">
                <el-input class="nn-input-s" v-model="cardSentToUserDialogForm.realName" placeholder="输入用户真实姓名"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cardSentToUserDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('cardSentToUserDialogForm')">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="修改状态成【已制成卡】" :visible.sync="cardCreateDialogVisible" width="40%" style="text-align: left">
        <el-form ref="cardCreateDialogForm" :model="cardCreateDialogForm" label-width="140px" :inline="false" align="left">
            <el-form-item label="卡号" prop="cardNo">
                {{cardCreateDialogForm.cardNo}}
            </el-form-item>
            <el-form-item label="激活码" prop="activationCode">
                {{cardCreateDialogForm.activationCode}}
            </el-form-item>
        </el-form>
        <p class="ta-c color-999">确定修改状态吗？</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cardCreateDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="submitForm('cardCreateDialogForm')">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="导出会员卡" :visible.sync="exportDialogVisible" width="50%" class="ta-l" :close-on-click-modal="false">
        <el-form ref="exportDialogForm" :model="exportDialogForm" label-width="140px" :inline="true" align="left">
            <el-form-item label="时间">
                <VDateRangePicker type="datetime" :timeInterval="30" @onTimePick="onTimePickExport"></VDateRangePicker>
            </el-form-item>
            <el-form-item label="生成类型">
           <el-select v-model="exportDialogForm.cardType" placeholder="请选择">
               <el-option
               v-for="item in [{label:'全部',value:''},...cardTypeList]"
               :key="item.value"
               :label="item.label"
               :value="item.value">
               </el-option>
           </el-select>
        </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="exportDialogVisible = false">关 闭</el-button>
            <el-button type="primary" @click="callExport">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import VDateRangePicker from "@/components/VDateRangePicker";
import VPagination from "@/components/VPagination";
export default {
    data() {
        return {
            exportDialogVisible:false,
            exportDialogForm:{},
            totalPageCount: 0,
            tableData: [],
            form: {},
            cardStateList: [{
                label: '全部',
                value: '',
            }, {
                label: '已生成，未制成卡',
                value: 1
            }, {
                label: '已制成卡，未发放',
                value: 2
            }, {
                label: '已发放给用户，未激活',
                value: 3
            }, {
                label: '已激活',
                value: 4
            }, ],
            cardTypeList:[{
                label:'手动类型',
                value:1
            },{
                label:'自动类型',
                value:2
            },],
            membershipDialogVisible: false,
            membershipDialogForm: {},
            membershipDialogRules: {
                cardCount: [{
                    required: true,
                    message: '张数不能为空'
                }],
            },
            batchUpdateMembershipDialogVisible: false,
            batchUpdateMembershipDialogForm: {},
            cardSentToUserDialogVisible: false,
            cardSentToUserDialogForm: {},
            cardSentToUserDialogRules: {
                phone: [{
                    required: true,
                    message: '请输入账号手机号'
                }],
                 realName: [{
                    required: true,
                    message: '请输入真实姓名'
                }],
            },
            cardCreateDialogVisible: false,
            cardCreateDialogForm: {},
            row: {},
            paramJson:{}
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.callFirstPage();
        });
    },
    methods: {
        showCardCreateDialogVisible(row) {
            this.cardCreateDialogVisible = true;
            this.cardCreateDialogForm = {
                ...row
            };
        },
        showCardSentToUserDialog(row) {
            this.cardSentToUserDialogVisible = true;
            this.cardSentToUserDialogForm = {
                ...row
            };
            //    this.cardSentToUserDialogForm.phone = '';
        },
        confirmbatchUpdateMembership(count) {
            this.batchUpdateMembershipDialogVisible = false;
            this.$alert(`<div><p class="ta-c color-red">有${count}张卡</p> <p>从【已生成，未制成卡】，状态修改成【已制成卡，未发放】</p></div>`, '更改状态成功！', {
                dangerouslyUseHTMLString: true
            });
        },
        showBatchUpdateMembershipDialog() {
            this.batchUpdateMembershipDialogVisible = true;
        },
        showMembershipDialogVisible() {
            this.membershipDialogVisible = true;
            this.membershipDialogForm = {};
        },
        showExportDialog(){
            this.exportDialogVisible = true;
        },
        onTimePick(timeStart, timeEnd) {
            this.form.addTimeStart = timeStart;
            this.form.addTimeEnd = timeEnd;
        },
        onTimePickGenerate(timeStart, timeEnd) {
            this.form.generateTimeStart = timeStart;
            this.form.generateTimeEnd = timeEnd;
        },
        onTimePickDeliver(timeStart, timeEnd) {
            this.form.deliverTimeStart = timeStart;
            this.form.deliverTimeEnd = timeEnd;
        },
        onTimePickActivate(timeStart, timeEnd) {
            this.form.activateCardTimeStart = timeStart;
            this.form.activateCardTimeEnd = timeEnd;
        },
        onTimePickExport(timeStart, timeEnd) {
            this.exportDialogForm.addTimeStart = timeStart;
            this.exportDialogForm.addTimeEnd = timeEnd;
        },
        onTimePickBatchUpdateMembership(timeStart, timeEnd) {
            this.batchUpdateMembershipDialogForm.addTimeStart = timeStart;
            this.batchUpdateMembershipDialogForm.addTimeEnd = timeEnd;
        },
        callFirstPage() {
            //获取列表第一页的参数,然后触发 callTableData 方法
            this.$refs.vPage.$emit('callFirstPage', 0);
        },
        callTableData(paramJson) {
            paramJson = {
                ...paramJson,
                ...this.form
            };
            //  paramJson.addTimeStart = getTimeStamp(paramJson.addTimeStart);
            //  paramJson.addTimeEnd = getTimeStamp(paramJson.addTimeEnd);
            //  paramJson.generateTimeEnd = getTimeStamp(paramJson.generateTimeEnd);
            //  paramJson.deliverTimeStart = getTimeStamp(paramJson.deliverTimeStart);
            //  paramJson.deliverTimeEnd = getTimeStamp(paramJson.deliverTimeEnd);
            //  paramJson.activateCardTimeStart = getTimeStamp(paramJson.activateCardTimeStart);
            //  paramJson.activateCardTimeEnd = getTimeStamp(paramJson.activateCardTimeEnd);
            this.paramJson  = paramJson;
            sendPost(urls.getMembershipCardList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                this.tableData = resultJson.resultData.membershipCardList;
                this.totalPageCount = resultJson.resultData.membershipCardCount;
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    switch (formName) {
                        case 'cardSentToUserDialogForm':
                            this.callDeliverMembershipCard();
                            break;
                        case 'membershipDialogForm':
                            this.callAddMembershipCard();
                            break;
                        case 'cardCreateDialogForm':
                            this.callGenerateMembershipCard(1, this.cardCreateDialogForm)
                            break;
                        case '':
                            break;
                        default:
                            break;
                    }
                }
            })
        },
        //制作会员卡，传入cardId则为单条记录制作会员卡，传入时间段则为批量制作会员卡
        callGenerateMembershipCard(type, row = {}) {
            let paramJson = {};
            if (type == 1) {
                paramJson.cardId = row.cardId;
            }
            if (type == 2) {
                paramJson.addTimeStart = getTimeStamp(row.addTimeStart);
                paramJson.addTimeEnd = getTimeStamp(row.addTimeEnd);
                if (isTimeNull(paramJson.addTimeStart)) {
                    warningToast('请选择开始时间');
                    return;
                }
                if (isTimeNull(paramJson.addTimeEnd)) {
                    warningToast('请选择j结束时间');
                    return
                }
            }
            sendPost(urls.generateMembershipCard, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                if (type == 2) {
                    this.cardCreateDialogVisible = false;
                    this.callFirstPage()
                    this.confirmbatchUpdateMembership(resultJson.resultData.updateCount)
                } else {
                    successToast(resultJson.resultMsg, () => {
                        this.cardCreateDialogVisible = false;
                        this.callTableData(this.paramJson);
                    });
                }

            });
        },
        callDeliverMembershipCard() {
            let paramJson = {
                cardId: this.cardSentToUserDialogForm.cardId,
                phone: this.cardSentToUserDialogForm.phone,
                realName: this.cardSentToUserDialogForm.realName,
            };
            sendPost(urls.deliverMembershipCard, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.cardSentToUserDialogVisible = false;
                    this.callTableData(this.paramJson);
                });
            });
        },
        callAddMembershipCard() {
            let paramJson = {
                cardCount: this.membershipDialogForm.cardCount,
            };
            sendPost(urls.addMembershipCard, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {
                successToast(resultJson.resultMsg, () => {
                    this.membershipDialogVisible = false;
                    this.callTableData(this.paramJson);
                });
            });
        },
        callExport(url, params = {}) {
            var paramJson = {
                ...JSON.parse(JSON.stringify(this.exportDialogForm))
            };
            paramJson.addTimeStart = getTimeStamp(paramJson.addTimeStart)
            paramJson.addTimeEnd = getTimeStamp(paramJson.addTimeEnd)
            if(isTimeNull(paramJson.addTimeStart)) {
                warningToast('请选择开始时间');
                return;
            }
            if(isTimeNull(paramJson.addTimeEnd)) {
                warningToast('请选择结束时间');
                return;
            }
            sendDownLoad(urls.exportMembershipCardList, {
                data: JSON.stringify(paramJson)
            }, (resultJson) => {

            });
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
