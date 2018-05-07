<template>
    <div class="bread-w">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{breadText}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        props: ['text'],
        data() {
            return {
                breadText: ''
            }
        },
        mounted() {
            this.breadText = this.text;
        }
    }
</script>
<style lang="less">
    .bread-w{
        margin-bottom: 20px;
    }
</style>
