<template>
    <div class="index-w">
        <my-header></my-header>
        <left-menu></left-menu>
        <div class="notice-w menu-content-w">
            <bread text="考生须知"></bread>

            <el-input rows="15" v-model="notice.announceInfo" type="textarea"></el-input>


            <submit-btn submit-url="/announce/saveOrUpdate" submit-method="POST"
                        :before-submit="beforeSubmit"
                        :submit-data="notice"
                        :submit-handler="submitSuccess"
                        btn-text="提交"></submit-btn>
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
        components: {Bread, LeftMenu, MyHeader, SubmitBtn},
        props: [],
        data() {
            return {
                notice: {
                    id: '',
                    announceInfo: ''
                }

            }
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            //获取数据
            fetchData() {
                functions.getAjax('/announce/get', (res) => {
                    if(res.code==500){
                        return;
                    }else{
                        this.notice = {
                            id: res.data.id,
                            announceInfo: res.data.announceInfo
                        };
                    }

                });
            },
            beforeSubmit() {
                let _this = this;
                if (!this.notice.announceInfo) {
                    _this.$notify({
                        title: '提示',
                        message: '通知公告内容不可为空！',
                        type: 'warning'
                    });
                    return false;
                } else {
                    return true;
                }

            },
            submitSuccess(res) {
                if (res.data.code == 200) {
                    this.$notify({
                        title: '提示',
                        message: '编辑公告成功！',
                        type: 'success'
                    });

                }

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
            .el-textarea {
                margin-bottom: 25px;
            }
        }
    }


</style>
