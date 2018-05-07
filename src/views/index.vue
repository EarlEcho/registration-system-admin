<template>
    <div class="main-index-w">
        <my-header></my-header>
        <div class="home-w">
            <el-row :gutter="30">
                <el-col :span="6">
                    <router-link to="/exam-add">
                        <div>
                            <p>新增考试</p>
                            <i class="el-icon-circle-check"></i>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/exam-list">
                        <div>
                            <p>考试列表</p>
                            <i class="el-icon-menu"></i>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/examination">
                        <div>
                            <p>考生列表</p>
                            <i class="el-icon-document"></i>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/examination-notice">
                        <div>
                            <p>通知公告</p>
                            <i class="el-icon-edit-outline"></i>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import MyHeader from '@/components/header'

    export default {
        name: '',
        components: {MyHeader},
        props: [],
        data() {
            return {}
        }
    }
</script>
<style lang="less">
    .main-index-w {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        background: url(/static/image/star-bg.svg);
        .home-w {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

        }
        .el-row {
            width: 1200px;
        }
        @keyframes rotatefresh {
            from { transform: rotate(-25deg) }
            to {
                transform: rotate(335deg);
                transition: all 2s;
            }
        }
        .el-col-6 {
            div {
                background-color: white;
                border-radius: 10px;
                padding: 30px;
                border: double 12px #f5f5f5;
                position: relative;
                overflow: hidden;
                &:hover{
                    i{
                        animation: rotatefresh 2s;
                    }
                }

            }
            p {
                font-size: 36px;
                color: #4f79a5;
                line-height: 200px;
                text-align: center;
                position: relative;
                z-index: 2;
                letter-spacing: 2px;

            }
            i {
                font-size: 40px;
                position: absolute;
                bottom: -8px;
                right: -8px;
                transform: rotate(-25deg);
                color: #d2d2d2;
                zoom: 4;
                z-index: 0;
            }
        }

    }
</style>
