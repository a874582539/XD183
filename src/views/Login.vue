<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">{{ title }}</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <div class="flex-png">
                <el-input type="text" v-model="ruleForm2.verification" auto-complete="off" placeholder="验证码"
                          class="button"></el-input>
                <img src="http://10.200.10.117:8085/login/authCode" @click="refreshImg">
                <!--<img src="http://www.toncentsoft.cn:8090/login/authCode" @click="refreshImg">-->
            </div>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
            </el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin,api} from '../api/api';
    import qs from 'qs';
    //import NProgress from 'nprogress';
    // import axios from 'axios';
    export default {
        data() {
            return {
                title: '出入境智慧服务大厅',
                logining: false,
                ruleForm2: {
                    account: 'admin',
                    checkPass: '123456',
                    verification: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ],
                    verification: [
                        {required: true, message: "请输入验证码", trigger: 'blur'}
                    ],
                },
                checked: true
            };
        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = {
                            username: this.ruleForm2.account,
                            password: this.ruleForm2.checkPass,
                            verification: this.ruleForm2.verification,
                        };
                        requestLogin(qs.stringify(loginParams)).then(data => {
                            this.logining = false;
                            //NProgress.done();
                            // console.log(data.data.permissionList);
                            let {errorMsg, success} = data;
                            if (success == false) {
                                this.$message({
                                    message: '登录失败',
                                    type: 'error'
                                });
                            } else {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                let user = {
                                    name: loginParams.username,
                                    avatar: 'http://hongcg.com/wp-content/uploads/2017/12/0001-150x150.jpg'
                                };
                                sessionStorage.setItem('user', JSON.stringify(user));
                                setTimeout(() => _this.$router.push({path: '/data'}), 0);
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            refreshImg() {
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
        .flex-png {
            display: flex;
            flex-wrap: nowrap;
            .button {
                width: 80%;
                padding-right: 5px;
            }
            img {
                flex: 1;
            }
        }
    }
</style>