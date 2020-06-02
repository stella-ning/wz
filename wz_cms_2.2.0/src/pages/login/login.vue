<template>
    <div class="login-wrapper toastWrap">

        <img class="login-bg" :src="bgImg" alt="">

        <el-form class="dt-form toast" ref="form" :model="form" :rules="rules" label-width="80px" @keyup.enter.native="submitForm('form')">
            <h3 class="form-title">飞宇网赚项目管理后台</h3>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" auto-complete="off" autofocus placeholder="请输入手机号码"></el-input>
            </el-form-item>
             <el-form-item label="图形码" prop="captchaCode">
                <el-input placeholder="请输入图形验证码" v-model="form.captchaCode">
                    <template slot="append">
                        <img  class="captcha" :src="imgCode.imgUrl" alt="" @click="getImgCode">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="form.code" type="phone" placeholder="请输入短信验证码">
                     <el-button v-if="countDown < 0" @click="callMsgLoginSendSmsCode"  class="checknumber-cell" slot="suffix" type="success">点击获取验证码</el-button>
                     <el-button disabled="" v-else class="checknumber-cell" slot="suffix" type="warning">{{countDown}}</el-button>
                     <!-- <span v-if="countDown < 0" @click="callMsgLoginSendSmsCode" class="check-cell" slot="suffix">点击获取验证码</span>
                     <span v-else class="check-cell">{{countDown}}</span> -->
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template> 
<script>
import '../../libs/rsa/security';
export default {
    data() {
        return {
            bgImg:require('@/assets/images/login_bg8.jpg'),
            countDown:-1,
            form: {
                phone: CookieManager.getCookie(CookieManager.phone),
                code: '',
            },
            imgCode:{},
            rules: {
                phone: [{ required: true, message: '手机号能为空' }],
                captchaCode: [{ required: true, message: '图形验证码不能为空' }],
                code: [{ required: true, message: '验证码不能为空' }],
            },
        }
    },
    created() {
        this.getImgCode()
    },
    methods: {
        getImgCode(){
             sendPost(urls.getImgCode ,{data: JSON.stringify({})},(resultJson)=> {
                 console.log('resultJson.resultData.imgCode:',resultJson.resultData.imgCode)
                 this.imgCode =  resultJson.resultData.imgCode
             });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var paramJson = {
                        phone: this.form.phone,
                        code: this.form.code,
                    }
                    // _this.findRSA(paramJson);
                    this.callLogin();
                }
            });
        },
        //获取RSA密钥
        // findRSA(paramJson) {
        //     var _this = this;
        //     // _this.sendPost(getPublicKeyAndModel, {}, function(resultJson) {
        //     sendNoLoadingPost(urls.getPublicKeyAndModel, {}, function(resultJson) {
        //         //根据公钥指数与模生成公钥key
        //         RSAUtils.setMaxDigits(200);
        //         var publicKey = RSAUtils.getKeyPair(resultJson.resultData.publicKeyIndex, '', resultJson.resultData.modulus);
        //         //公钥key加密密码字符串
        //         paramJson.password = RSAUtils.encryptedString(publicKey, paramJson.password.split("").reverse().join(""));
        //         paramJson.privateKeySessionKey = resultJson.resultData.privateKeySessionKey;
        //         //使用加密后的密码登录
        //         // console.log(paramJson);
        //         _this.encryptedLogin(paramJson);
        //     });
        // },
        //使用加密后的密码登录
        // encryptedLogin: function(paramJson) {
        //     var _this = this;
        //     //调登录
        //     console.log('调登陆');
        //     sendPost(urls.login, { data: JSON.stringify(paramJson) }, function(resultJson) {
        //         //保存登录信息-userId-sessionKey 
        //         CookieManager.setCookie(CookieManager.phone, paramJson.phone);
        //         CookieManager.setCookie(CookieManager.userId, resultJson.resultData.userId);
        //         CookieManager.setCookie(CookieManager.sessionKey, resultJson.resultData.sessionKey);
        //         successToast('登录成功', () => {
        //             _this.$router.push({ path: '/home' });
        //         });

        //     });
        // },
        startCountDown() {
            this.countDown = 120;
            var timer = setInterval(()=>{
                 this.countDown --;
                 if(this.countDown == 0) {
                     this.countDown = -1;
                     clearInterval(timer);
                 }
            },1000);
        },
        callMsgLoginSendSmsCode() {
            if(isNull(this.form.phone)) {
                warningToast('请输入手机号');
                return;
            }
           
            let  paramJson = {
                phone:this.form.phone,
                code:this.form.captchaCode,
                imgCodeId:this.imgCode.imgCodeId,
                verifyType:5,//登录
            };
             sendPost(urls.sendCode,{data: JSON.stringify(paramJson)},(resultJson)=> {
                     this.startCountDown();
                     successToast('验证码发送成功')
                }
            );
        },
        callLogin(){
            let  paramJson = {
                phone:this.form.phone,
                code:this.form.code,
                imgCode:this.form.captchaCode,
                imgCodeId:this.imgCode.imgCodeId,
               
            };
             sendPost(urls.cmsLogin ,{data: JSON.stringify(paramJson)},(resultJson)=> {
                        //保存登录信息-userId-sessionKey 
                        CookieManager.setCookie(CookieManager.phone, paramJson.phone);
                        CookieManager.setCookie(CookieManager.userId, resultJson.resultData.userId);
                        CookieManager.setCookie(CookieManager.sessionKey, resultJson.resultData.sessionKey);
                        successToast('登录成功', () => {
                            this.$router.push({ path: '/user/userList' });
                        });
                }
            );
        }
    }
}
</script>

<style lang="scss" scoped>
.dt-form {
    // position: absolute;
    width: 400px; // top: 25%;
    // left: 30%;
    .login-btn {
        width: 100%;
    }
    padding: 20px 60px 20px 20px;
    border-radius: 10px;
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.2);
    margin-top:-40px;
}

.login-wrapper {
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
}

.login-bg {
    z-index: -1;
    left: 0;
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%; // -webkit-filter: blur(2.5px); /* Chrome, Opera */
    //    -moz-filter: blur(10px);
    //     -ms-filter: blur(10px);    
    //         filter: blur(10px);
}

.form-title {
    font-weight: 400;
    color: rgb(31, 47, 61);
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 30px;
    color: white;
    margin-right: -40px;
}
.checknumber-cell {
    margin-right: -5px;
}
.captcha {
    width: 80px;
    height: 40px;
    vertical-align: middle;
    border-radius: 0px 2.5px 2.5px 0;
}
</style>
<style lang="scss" >
.login-wrapper {
    .el-form-item__label {
        color: white;
    }
}

.toastWrap {
    width: 100%;
    width: 100vw;
    height: 100%;
    height: 100vh;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;

    &:after {
        display: inline-block;
        content: '';
        width: 0;
        height: 100%;
        vertical-align: middle;
    }

    .toast {
        display: inline-block;
        vertical-align: middle;
    }

    .el-input-group__append, .el-input-group__prepend {
        padding: 0;
        backface-visibility: white;
        border: none;
    }
}
</style>

