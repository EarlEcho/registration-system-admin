<template>
    <div class="sing-in-w clearfix">
        <div class="sing-in-left">
            <h1>在线通用报名系统——管理员端</h1>
        </div>
        <div class="sing-in-right g-rt">
            <div class="sing-in-form">
                <h1 class="sing-title">登录</h1>
                <el-form :model="singUpForm" :rules="rules" ref="singUpForm" class="demo-singUpForm">
                    <el-form-item prop="username">
                        <p class="sing-form-item-title">用户名</p>
                        <el-input v-model="singUpForm.username" placeholder="请输入用户名">
                            <i slot="prefix" class="icon ion-android-person sing-icon"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <p class="sing-form-item-title">密码</p>
                        <el-input type="password" v-model="singUpForm.password" placeholder="请输入密码">
                            <i slot="prefix" class="icon ion-android-lock sing-icon"></i>
                        </el-input>
                    </el-form-item>
                    <br>
                    <el-form-item>
                        <submit-btn submit-url="/private/user/pub/manageLogin" submit-method="POST"
                                    :before-submit="beforeSubmit"
                                    :submit-data="singUpForm"
                                    :submit-handler="submitSuccess"
                                    btn-text="登录"></submit-btn>
                    </el-form-item>
                </el-form>

            </div>
        </div>

    </div>
</template>

<script>
    import axios from '../../config/http'
    import SubmitBtn from '@/components/SubmitBtn'

    export default {
        name: '',
        components: {
            SubmitBtn
        },
        props: [],
        data() {
            return {
                singUpForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6,  message: '用户名长度至少为6个字符', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 12, message: '密码长度为6-12个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //登录表单提交前
            beforeSubmit() {
                let flag = 0;
                this.$refs.singUpForm.validate((valid) => {
                    if (valid) {
                        flag = 1;
                    } else {
                        flag = 0;
                    }
                });
                if (flag == 1) {
                    return true;
                }
            },
            //登录成功
            submitSuccess(res) {
                if (res.data.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: '登录成功，2秒后跳转到首页。',
                        type: 'success'
                    });
                    localStorage.setItem('sid', (res.data.data));
                    axios.defaults.headers.sid = (localStorage.sid);
                    setTimeout(() => {
                        this.$router.replace('/home')
                    }, 2000)
                }else{
                    this.$notify({
                        title: '提示',
                        message: res.data.msg,
                        type: 'warning'
                    });
                }

            }
        }
    }
</script>
<style lang="less">
    .sing-in-w {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: white;
        div {
            box-sizing: border-box;
        }
        .sing-in-left {
            position: absolute;
            width: 65%;
            height: 100%;
            background-color: #3a8ee6;
            background-size: 102%;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            h1 {
                color: white;
                font-weight: normal;
                font-size: 40px;
                letter-spacing: 1px;
            }
        }
        .sing-in-right {
            width: 35%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .sing-in-form {
                width: 65%;
                background: white;
            }
            .el-form-item {
                margin-bottom: 15px;
            }
            .submit-btn {
                width: 100%;
                button {
                    width: 100%;
                }
            }
        }
    }

    .sing-title {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 20px;
        color: #444444;
    }

    .sing-form-item-title {
        font-size: 16px;
        color: #696868;
    }

    .sing-icon {
        margin-left: 6px;
        font-size: 16px;
    }

    .sing-other-action {
        a {
            margin-top: 10px;
            color: #396689;
            font-size: 14px;
        }

    }
</style>
