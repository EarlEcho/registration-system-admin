<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="index-content-w menu-content-w">
            <bread text="新增考试"></bread>
            <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px"
                     class="edit-form-w">
                <el-form-item label="考试名称" prop="examName">
                    <el-input v-model="addForm.examName"></el-input>
                </el-form-item>
                <el-form-item label="考试时间段" prop="examStart">
                    <data-picker :start="addForm.examStart" :end="addForm.examEnd"
                                 @update="updateExamTime"></data-picker>
                </el-form-item>
                <el-form-item label="考试地点" prop="examLocation">
                    <el-input v-model="addForm.examLocation"></el-input>
                </el-form-item>
                <el-form-item label="考试费用" prop="payMoney">
                    <el-input v-model="addForm.payMoney"></el-input>
                </el-form-item>
                <el-form-item label="报名时间段" prop="applyStart">
                    <data-picker :start="addForm.applyStart" :end="addForm.applyEnd"
                                 @update="updateApplyTime"></data-picker>
                </el-form-item>
                <el-form-item>
                    <submit-btn submit-url="/private/exam/save" submit-method="POST"
                                :before-submit="beforeSubmit"
                                :submit-data="addForm"
                                :submit-handler="submitSuccess"
                                btn-text="完成"></submit-btn>
                    <el-button @click="resetForm('addForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '@/components/leftMenu'
    import MyHeader from '@/components/header'
    import SubmitBtn from '@/components/SubmitBtn'

    import DataPicker from '@/components/DataPicker'


    import Bread from '@/components/bread'

    import functions from '@/functions/common.js'


    export default {
        name: '',
        components: {DataPicker, Bread, LeftMenu, MyHeader, SubmitBtn},
        props: [],
        data() {
            return {
                searchForm: {
                    name: '',
                },
                addForm: {
                    examName: '',
                    payMoney: '',
                    examStart: '',  //考试开始时间
                    examEnd: '',  //考试结束
                    applyStart: '',     //报名开始
                    applyEnd: '',   //报名结束
                    examLocation: ''
                },
                addFormRules: {
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
                }
            }
        },
        mounted() {

        },
        methods: {
            updateExamTime(time) {
                this.addForm.examStart = time[0];
                this.addForm.examEnd = time[1];
            },
            updateApplyTime(time) {
                this.addForm.applyStart = time[0];
                this.addForm.applyEnd = time[1];
            },
            //获取数据
            fetchData() {

            },
            beforeSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
                if (this.addForm.examName == '') {
                    this.$message.warning('请输入考试名称！');
                    return;
                }
                if (this.addForm.examStart >= this.addForm.examEnd) {
                    this.$message.warning('考试时间必选且考试结束时间必须大于开始时间！');
                    return;
                }
                if (this.addForm.examLocation == '') {
                    this.$message.warning('请输入考试地点！');
                    return;
                }
                if (this.addForm.payMoney == '') {
                    this.$message.warning('请输入考试费用！');
                    return;
                }
                if (this.addForm.applyStart >= this.addForm.applyEnd) {
                    this.$message.warning('报名结束时间必须大于开始时间！');
                    return;
                }
                return true;

            },
            submitSuccess() {

            },
            //编辑
            handleEdit(row) {
                this.addForm = row;
                this.examEditDialog = true;
            },
            searchEvent() {
                functions.getAjax('/regs/exam/findAll' + '?pageNum=0&examName=' + this.searchForm.name, (res) => {
                    console.log(res);
                    this.examList = res.data.content;
                });
            },
            resetForm(formName) {
                this.$router.go(0);
            },
            enrollEvent(row) {
                this.$router.push('/exam-detail?id=' + row.id);
            }

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

        .edit-form-w {
            width: 500px;
        }
    }


</style>
