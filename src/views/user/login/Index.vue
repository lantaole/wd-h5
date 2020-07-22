<template>
  <div class="login-wrap"  :style="{ minHeight: screenHeight + 'px' }">
    <div class="login-content pb-10">
      <div class="logo bc-fff border-radius-10">
        <img  src="~assets/images/common/logo.png" class="block" alt="" />
        <p class=" text-center fs-28 mt-20 cl-b7b7b7">
          一站式服务 就用WD掌柜
        </p>
      </div>
      <div
        class="login-form pd-30 border-radius-10 bc-fff"
      >
        <div class="flex">
          <img src="~assets/images/login/phone.png" alt="">
          <div class="position-relative ml-20 wd-100p">
            <van-field
              v-model="phoneNumber"
              center
              clearable
              type="tel"
              placeholder="请输入手机号"
              class="bg-F2F2F2 border-radius-10 pl-120"
            >
            </van-field>
            <i class="position-absolute bg-E7E7E7 phone-icon">+86</i>
          </div>
        </div>

<!--        <van-field-->
<!--          v-model="sms"-->
<!--          center-->
<!--          clearable-->
<!--          type="tel"-->
<!--          left-icon="checked"-->
<!--          placeholder="短信验证码"-->
<!--          class="border-bottom"-->
<!--        >-->
<!--          <sms-countdown-->
<!--            slot="button"-->
<!--            :phone="phoneNumber"-->
<!--            purpose="reg"-->
<!--          ></sms-countdown>-->
<!--        </van-field>-->
        <van-button
          size="large"
          type="primary"
          class="mt-40 border-radius-10"
          @click="signAndLogin"
          >登录</van-button
        >
        <p class=" text-center fs-24 mt-20">
          <span class="cl-b7b7b7">点击开始使用，即表示已阅读并同意</span> <span class="cl-979797">《法律条款及隐私政策》</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Field } from "vant";
import SmsCountdown from "@/components/SmsCountdown";
import api from "@/api";
import {
  setStorage,
  getStorage,
  wechatAuthorization,
  isWechat,
  getWechatImg
} from "@/config/utils";
export default {
  name: "Login",
  components: {
    vanButton: Button,
    SmsCountdown: SmsCountdown,
    vanField: Field
  },
  data() {
    return {
      sms: "",
      phoneNumber: "",
      screenHeight: document.body.clientHeight,
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  computed: {

  },
  created() {
  },
  methods: {
    // 登陆注册
    signAndLogin() {
      const self = this;
      if (!self.phoneNumber) {
        self.$Toast({
          message: "请输入手机号"
        });
        return;
      }else {
        self.$router.push({name: 'VerificationCode', query: {phone: this.phoneNumber}})
      }
    },
  }
};
</script>

<style scoped lang="scss">
.login-wrap {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #fff;
  .login-content {
    position: fixed;
    top:40%;
    left:50%;
    width: 100%;
    transform:translate(-50%,-40%);
    .phone-icon{
      top: 0;
      left: 0;
      height: 100%;
      width: 100px;;
      border-radius: 10px 0 0 10px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-style: normal;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
      .logo-img {
        width: 90%;
        height: 90%;
        background-color: #fff;
      }
    }
    .free-get {
      height: 120px;
      width: 60%;
      position: absolute;
      top: 170px;
      left: 20%;
    }
    .act-mt-ing {
      margin-top: 340px;
    }
    .act-mt-end {
      position: relative;
      z-index: 5;
      margin-top: -190px;
    }
    .row-img {
      width: 582px;
    }
    .other-way-login {
      height: 30px;
      line-height: 30px;
      font-size: 24px;
      text-align: center;
      .line {
        display: inline-block;
        width: 120px;
      }
      .txt {
        color: #8c8c8c;
        font-size: 28px;
        vertical-align: middle;
        vertical-align: -20%;
        margin: 0 30px;
      }
    }
    .wechat-img {
      width: 255px;
      height: 255px;
      margin: 10px auto;
      display: block;
    }
  }
}
</style>
