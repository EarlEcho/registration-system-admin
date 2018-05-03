<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="notice-w menu-content-w">
            <bread text="考生须知"></bread>

            <el-input rows="15" v-model="noticeText" type="textarea"></el-input>

            <submit-btn submit-url="/" submit-method="POST"
                        :before-submit="beforeSubmit"
                        :submit-data="noticeText"
                        :submit-handler="submitSuccess"
                        btn-text="完成"></submit-btn>
            <el-button @click="noticeText=''">重置</el-button>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '@/components/leftMenu'
    import MyHeader from '@/components/header'
    import SubmitBtn from '@/components/SubmitBtn'
    import functions from '@/functions/common.js'
    import Bread from '@/components/bread'


    export default {
        name: '',
        components: {Bread,LeftMenu, MyHeader, SubmitBtn},
        props: [],
        data() {
            return {
                noticeText: ''

            }
        },
        mounted() {

        },
        methods: {
            //获取数据
            fetchData() {

            },
            beforeSubmit() {

            },
            submitSuccess() {

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
        .notice-w {
            display: inline-block;
            width: 80vw;
            vertical-align: top;
            .el-textarea{
                margin-bottom: 25px;
            }
        }
    }


</style>
