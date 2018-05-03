<template>
    <div class="index-menu-w">
        <el-menu :router="true" class="el-menu-vertical-demo"
                 :collapse="isCollapse">
            <el-menu-item index="/home">
                <i class="el-icon-star-on"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/exam-list">
                <i class="el-icon-circle-check-outline"></i>
                <span slot="title">考试列表</span>
            </el-menu-item>
            <el-menu-item index="/examination">
                <i class="el-icon-printer"></i>
                <span slot="title">考生列表</span>
            </el-menu-item>
            <el-menu-item index="/exam-add">
                <i class="el-icon-document"></i>
                <span slot="title">新增考试</span>
            </el-menu-item>
            <el-menu-item index="/examination-notice">
                <i class="el-icon-zoom-in"></i>
                <span slot="title">考生须知</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: [],
        data() {
            return {
                isCollapse: false,
            }
        },
        methods: {}
    }
</script>
<style lang="less">
    .index-menu-w {
        position: fixed;
        top: 40px;
        width: 200px;
        height: 100%;
        display: inline-block;
        background-color: white;
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }
</style>
