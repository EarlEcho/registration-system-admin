<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="index-content-w menu-content-w">

            <bread text="考试列表"></bread>

            <el-form :inline="true" :model="searchForm" class="search-w">
                <el-form-item>
                    <el-input v-model="searchForm.name" placeholder="输入考试名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvent">查询</el-button>
                    <el-button type="primary" @click.native="resetForm">重置</el-button>
                </el-form-item>
            </el-form>

            <!--考试列表-->
            <el-table :data="examList" :stripe="true">
                <el-table-column prop="examName" label="考试名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="applyStart" label="报名开始时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.applyStart | toTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="examStart" label="考试开始时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.examStart | toTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="payMoney" label="考试费用"></el-table-column>
                <el-table-column prop="status" label="报名状态"></el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="detailEvent(scope.row)"
                                   type="primary"
                                   size="small">查看
                        </el-button>
                        <el-button @click.native.prevent="handleEdit(scope.row)"
                                   type="primary"
                                   size="small">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-block-w">
                <el-pagination layout="total,prev, pager, next" :total="pager.totalElements" :size="pager.size"
                               @current-change="pageChange">
                </el-pagination>
            </div>

            <el-dialog title="考试详细信息" :visible.sync="detailExamDialog" width="700px">
                <div class="exam-detail">
                    <el-row :gutter="30">
                        <el-col :span="5">考试名称 :</el-col>
                        <el-col :span="19">{{detailForm.examName}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">考试状态 :</el-col>
                        <el-col :span="19">{{detailForm.status}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">报名时间 :</el-col>
                        <el-col :span="19">{{detailForm.applyStart | toTime}} —— {{detailForm.applyEnd |
                            toTime}}
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">考试时间 :</el-col>
                        <el-col :span="19">{{detailForm.examStart | toTime}} —— {{detailForm.examEnd |
                            toTime}}
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">考试地址 :</el-col>
                        <el-col :span="19">{{detailForm.examLocation}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">考试费用 :</el-col>
                        <el-col :span="19">{{detailForm.payMoney}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">考试须知 :</el-col>
                        <el-col :span="19">{{detailForm.examNotice}}</el-col>
                    </el-row>
                </div>
                <span slot="footer">
                    <el-button type="primary" @click.native="detailExamDialog = false">确 定</el-button>
                </span>
            </el-dialog>


            <el-dialog title="编辑考试信息" :visible.sync="examEditDialog">
                <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px"
                         class="demo-editForm">
                    <el-form-item label="考试名称" prop="examName">
                        <el-input v-model="editForm.examName"></el-input>
                    </el-form-item>
                    <el-form-item label="报名时间段" prop="applyStart">
                        <data-picker :start="editForm.applyStart" :end="editForm.applyEnd"
                                     @update="updateApplyTime"></data-picker>
                    </el-form-item>
                    <el-form-item label="考试时间段" prop="examStart">
                        <data-picker :start="editForm.examStart" :end="editForm.examEnd"
                                     @update="updateExamTime"></data-picker>
                    </el-form-item>
                    <el-form-item label="考试地点" prop="examLocation">
                        <el-input v-model="editForm.examLocation"></el-input>
                    </el-form-item>
                    <el-form-item label="考试费用" prop="payMoney">
                        <el-input type="number" v-model="editForm.payMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="考试须知" prop="examNotice">
                        <el-input v-model="editForm.examNotice" rows="6" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <submit-btn submit-url="/private/exam/updateBySelective" submit-method="POST"
                                    :before-submit="beforeSubmitEdit"
                                    :submit-data="editForm"
                                    :submit-handler="editSuccess"
                                    btn-text="完成"></submit-btn>
                        <el-button @click="resetForm('editForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '@/components/leftMenu'
    import DataPicker from '@/components/DataPicker'
    import Bread from '@/components/bread'

    import MyHeader from '@/components/header'
    import SubmitBtn from '@/components/SubmitBtn'
    import functions from '@/functions/common.js'


    export default {
        name: '',
        components: {Bread, DataPicker, LeftMenu, MyHeader, SubmitBtn},
        props: [],
        data() {
            return {

                pager: {},
                searchForm: {
                    name: '',
                },
                examList: [],
                examEditDialog: false,
                editForm: {},
                editFormRules: {},

                detailExamDialog: false,
                detailForm: {},
                editFormRules: {
                    examName: [
                        {required: true, message: '请输入考试名称', trigger: 'blur'},
                    ],
                    payMoney: [
                        {required: true, message: '请输入考试费用', trigger: 'blur'}
                    ],
                    examLocation: [
                        {required: true, message: '请输入考试地点', trigger: 'blur'}
                    ],
                    examStart: [
                        {required: true, message: '请选择考试时间', trigger: 'blur'}
                    ],
                    applyStart: [
                        {required: true, message: '请选择报名时间', trigger: 'blur'}
                    ],
                    examNotice: [
                        {required: true, message: '请输入考试须知', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
            this.fetchData();
        },
        filters: {
            toTime(value) {
                return functions.timestampToLongText(value);
            }
        },
        methods: {
            //获取数据
            fetchData() {
                functions.getAjax('/private/exam/findAll' + '?pageNum=0&examName=' + this.searchForm.name, (res) => {
                    this.examList = res.data.content;

                    this.pager = {
                        size: res.data.size,
                        totalElements: res.data.totalElements,
                        numberOfElements: res.data.numberOfElements
                    }
                });
            },
            pageChange(page) {
                let currentPage = parseInt(page - 1);
                functions.getAjax('/private/exam/findAll' + '?pageNum=' + currentPage+ '&examName=' + this.searchForm.name, (res) => {
                    this.examList = res.data.content;
                    this.pager = {
                        size: res.data.size,
                        totalElements: res.data.totalElements,
                        numberOfElements: res.data.numberOfElements
                    }
                });
            },
            beforeSubmitEdit() {

                this.$refs.editForm.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
                if (this.editForm.examName == '') {
                    this.$message.warning('请输入考试名称！');
                    return;
                }
                if (this.editForm.applyStart >= this.editForm.applyEnd) {
                    this.$message.warning('报名结束时间必须大于开始时间！');
                    return;
                }
                if (this.editForm.examStart >= this.editForm.examEnd) {
                    this.$message.warning('考试时间必选且考试结束时间必须大于开始时间！');
                    return;
                }
                if (this.editForm.examLocation == '') {
                    this.$message.warning('请输入考试地点！');
                    return;
                }
                if (this.editForm.payMoney == '') {
                    this.$message.warning('请输入考试费用！');
                    return;
                }

                if (this.editForm.examNotice == '') {
                    this.$message.warning('请输入考试须知！');
                    return;
                }
                return true;
            },
            editSuccess() {
                this.$notify({
                    title: '成功',
                    message: '编辑考试成功！',
                    type: 'success'
                });
                setTimeout(() => {
                    this.examEditDialog = false;
                    this.fetchData();
                }, 1000)
            },
            //编辑
            handleEdit(row) {

                this.editForm = {
                    id: row.id,
                    examName: row.examName,
                    payMoney: row.payMoney,
                    examStart: row.examStart,  //考试开始时间
                    examEnd: row.examEnd,  //考试结束
                    applyStart: row.applyStart,     //报名开始
                    applyEnd: row.applyEnd,   //报名结束
                    examLocation: row.examLocation,
                    examNotice: row.examNotice
                };

                this.examEditDialog = true;
            },
            searchEvent() {

                functions.getAjax('/private/exam/findAll' + '?pageNum=0&examName=' + this.searchForm.name, (res) => {
                    this.examList = res.data.content;
                });

            },
            resetForm(formName) {
                this.$router.go(0);
            },

            detailEvent(row) {
                functions.getAjax('/private/exam/findOne' + '?id=' + row.id, (res) => {
                    this.detailForm = res.data;
                });
                this.detailForm = row;
                this.detailExamDialog = true;
            },
            removeEvent(row) {

            },


            //动态转换时间组件数据
            updateExamTime(time) {
                this.editForm.examStart = functions.timestampToLongText(time[0]);
                this.editForm.examEnd = functions.timestampToLongText(time[1]);
            },
            updateApplyTime(time) {
                this.editForm.applyStart = functions.timestampToLongText(time[0]);
                this.editForm.applyEnd = functions.timestampToLongText(time[1]);
            },

        }
    }
</script>
<style lang="less">
    .index-w {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background: #f5f5f5;
        .index-content-w {
            display: inline-block;
            width: 80vw;
            vertical-align: top;
            .search-w {
                margin-bottom: 10px;
            }
        }
        .exam-detail {
            font-size: 16px;
            .el-row {
                line-height: 42px;
                border-bottom: solid 1px #f0f0f0;
            }
            .el-col-5 {
                text-align: right;
            }
            .el-col-19 {

            }
        }
    }


</style>
