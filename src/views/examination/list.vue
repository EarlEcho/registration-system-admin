<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="examination-list-w menu-content-w">
            <bread text="考生列表"></bread>
            <el-form :inline="true" :model="searchForm" class="search-w">
                <el-form-item>
                    <el-input v-model="searchForm.name" placeholder="输入考生名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvent">查询</el-button>
                    <el-button type="primary" @click.native="resetForm">重置</el-button>
                </el-form-item>
            </el-form>

            <!--考生列表-->
            <el-table :data="examinationList" :stripe="true">
                <el-table-column prop="icon" label="照片">
                    <template slot-scope="scope">
                        <img :src="!scope.row.photoPath?defaultIcon:scope.row.photoPath" class="student-icon">
                    </template>
                </el-table-column>
                <el-table-column prop="realname" label="姓名"></el-table-column>
                <el-table-column prop="phoneNum" label="联系方式"></el-table-column>
                <el-table-column prop="examNum" label="考试数量"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="examinationDetail(scope.row)"
                                   type="primary"
                                   size="small">查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="考生详细信息" :visible.sync="showDetialDialog">
            <div class="examination-detail">
                <el-row>
                    <el-col :span="8">
                        <img :src="!detailForm.photoPath?defaultIcon:detailForm.photoPath" class="student-icon-big">
                    </el-col>
                    <el-col :span="16">
                        <el-row :gutter="30">
                            <el-col :span="7">用户名</el-col>
                            <el-col :span="17">{{!detailForm.username?'暂无':detailForm.username}}</el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="7">姓名</el-col>
                            <el-col :span="17">{{detailForm.realname}}</el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="7">身份证号</el-col>
                            <el-col :span="17">{{detailForm.idcard}}</el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="7">联系方式</el-col>
                            <el-col :span="17">{{!detailForm.phoneNum?'暂无':detailForm.phoneNum}}</el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="7">性别</el-col>
                            <el-col :span="17">{{detailForm.sex}}</el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="7">考试信息</el-col>
                            <el-col :span="17">
                                <p v-for="item in detailForm.studentList">
                                    {{item.name}}
                                </p>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>

            <span slot="footer">
                <el-button type="primary" @click="showDetialDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import LeftMenu from '@/components/leftMenu'
    import MyHeader from '@/components/header'
    import functions from '@/functions/common.js'
    import Bread from '@/components/bread'

    export default {
        name: '',
        components: {Bread, LeftMenu, MyHeader},
        props: [],
        data() {
            return {
                defaultIcon: 'static/image/defaulticon.png',
                searchForm: {
                    name: '',
                },
                showDetialDialog: false,
                detailForm: {},
                examinationList: []
            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            //获取数据
            fetchData() {
                //考生列表
                functions.getAjax('/private/user/querySysUser?pageNum=0', (res) => {
                    this.examinationList = res.data.content;
                    console.log(this.examinationList);

                });
            },

            searchEvent() {
                functions.getAjax('/private/user/findAll' + '?pageNum=0&examName=' + this.searchForm.name, (res) => {
                    console.log(res);
                    this.studentList = res.data.content;
                });
            },
            resetForm(formName) {
                this.$router.go(0);
            },
            examinationDetail(row) {
                this.showDetialDialog = true;
                this.detailForm = row;
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
        .examination-list-w {
            display: inline-block;
            width: 80vw;
            vertical-align: top;
            .search-w {
                margin-bottom: 10px;
            }
        }
        .student-icon {
            width: 55px;
            height: 55px;
            border-radius: 50%;
        }
        .student-icon-big {
            width: 140px;
            height: 140px;
            align-items: center;
        }
        .el-col-8 {
            text-align: center;
        }
        .examination-detail {
            font-size: 16px;
            .el-row {
                line-height: 42px;
                border-bottom: solid 1px #f0f0f0;
            }
            .el-col-7 {
                text-align: right;
            }
            .el-col-17 {

            }
        }
    }


</style>
