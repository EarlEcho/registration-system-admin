<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="examination-list-w menu-content-w">
            <bread text="考生列表"></bread>
            <el-form :inline="true" :model="searchForm" class="search-w">
                <el-form-item>
                    <el-input v-model="searchForm.name" placeholder="输入考生姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.phoneNum" placeholder="输入考生联系方式"></el-input>
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
                <el-table-column prop="username" label="用户名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="idcard" label="身份证号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="phoneNum" label="联系方式">
                    <template slot-scope="scope">
                        {{!scope.row.phoneNum?'暂无':scope.row.phoneNum}}
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>

            </el-table>

            <div class="pagination-block-w">
                <el-pagination layout="total,prev, pager, next" :total="pager.totalElements" :size="pager.size"
                               @current-change="pageChange">
                </el-pagination>
            </div>
        </div>


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
                pager: {},
                defaultIcon: 'static/image/defaulticon.png',
                searchForm: {
                    name: '',
                    phoneNum: ''
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
                    this.pager = {
                        size: res.data.size,
                        totalElements: res.data.totalElements,
                        numberOfElements: res.data.numberOfElements
                    }
                });
            },
            pageChange(page) {
                let currentPage = parseInt(page - 1);
                functions.getAjax('private/user/querySysUser' + '?pageNum=' + currentPage, (res) => {
                    this.examinationList = res.data.content;
                    this.pager = {
                        size: res.data.size,
                        totalElements: res.data.totalElements,
                        numberOfElements: res.data.numberOfElements
                    }
                });
            },
            searchEvent() {

                functions.getAjax('/private/user/querySysUser' + '?pageNum=0&realname=' + this.searchForm.name + '&phoneNum=' + this.searchForm.phoneNum, (res) => {
                    this.examinationList = res.data.content;
                    this.pager = {
                        size: res.data.size,
                        totalElements: res.data.totalElements,
                        numberOfElements: res.data.numberOfElements
                    }
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
