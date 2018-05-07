<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="index-content-w menu-content-w">

            <bread text="报名信息列表"></bread>

            <el-form :inline="true" :model="searchForm" class="search-w">
                <el-form-item>
                    <el-input v-model="searchForm.examName" placeholder="考试名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.cartNum" placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.realName" placeholder="考生姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.sex" placeholder="性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvent">查询</el-button>
                    <el-button type="primary" @click.native="resetForm">重置</el-button>
                </el-form-item>
            </el-form>

            <!--报名信息列表-->
            <el-table :data="examList" :stripe="true">
                <el-table-column prop="photoPath" label="照片">
                    <template slot-scope="scope">
                        <img :src="!scope.row.photoPath?defaultIcon:scope.row.photoPath" class="student-icon">
                    </template>
                </el-table-column>
                <el-table-column prop="realName" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cartNum" label="身份证" show-overflow-tooltip></el-table-column>

                <el-table-column prop="examInfo.examName" label="考试名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="applyTime" label="报名时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.applyTime | toTime}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="detailEvent(scope.row)"
                                   type="primary"
                                   size="small">查看
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
                        <el-col :span="5">考生姓名 :</el-col>
                        <el-col :span="19">{{detailForm.realName}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">报名考试名称 :</el-col>
                        <el-col :span="19">{{detailForm.examName}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">报名时间 :</el-col>
                        <el-col :span="19">{{detailForm.applyTime | toTime}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">性别 :</el-col>
                        <el-col :span="19">{{detailForm.sex}}</el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="5">身份证号 :</el-col>
                        <el-col :span="19">{{detailForm.cartNum}}</el-col>
                    </el-row>
                </div>
                <span slot="footer">
                    <el-button type="primary" @click.native="detailExamDialog = false">确 定</el-button>
                </span>
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
                    cartNum: '', //身份证号
                    sex: '',
                    realName: '',
                    examName: '',
                },
                examList: [],

                detailExamDialog: false,
                detailForm: {},
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
                functions.getAjax('/private/apply/pageQueryApplyInfo' + '?pageNum=0&examName=' + this.searchForm.name, (res) => {
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
                functions.getAjax('/private/apply/pageQueryApplyInfo' + '?pageNum=' + currentPage + '&examInfo.examName=' + this.searchForm.examName + '&cartNum=' + this.searchForm.cartNum + '&realName=' + this.searchForm.realName + '&sex=' + this.searchForm.sex, (res) => {
                    this.examList = res.data.content;
                    this.pager = {
                        size: res.data.size,
                        totalElements: res.data.totalElements,
                        numberOfElements: res.data.numberOfElements
                    }
                });
            },
            searchEvent() {
                functions.getAjax('/private/apply/pageQueryApplyInfo' + '?pageNum=0&examInfo.examName=' + this.searchForm.examName + '&cartNum=' + this.searchForm.cartNum + '&realName=' + this.searchForm.realName  + '&sex=' + this.searchForm.sex, (res) => {
                    this.examList = res.data.content;
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

            detailEvent(row) {
                this.detailForm = row;
                this.detailForm.examName = row.examInfo.examName
                this.detailExamDialog = true;
                console.log(this.detailForm)
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

        .student-icon {
            width: 55px;
            height: 55px;
            border-radius: 50%;
        }
    }


</style>
