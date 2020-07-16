<template>
  <div class="login-wrap">
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
          :loading="loginLoading"
          >登录</van-button
        >
        <p class=" text-center fs-24 mt-20">
          <span class="cl-b7b7b7">点击开始使用，即表示已阅读并同意</span> <span class="cl-979797">《法律条款及隐私政策》</span>
        </p>
        <!--<div class="text-center mt-5">
          <div class="inline-block pd-10" @click="wechatLogin">
            <img
              src="~assets/images/login/wxdl.png"
              alt=""
              width="30"
              height="30"
            />
            <div>微信授权登录</div>
          </div>
        </div>
        <img
          v-show="isActivity"
          class="row-img mg-auto mt-20"
          :src="this.baseUrl + '/images/common/717/row-img.png'"
          alt=""
          @click="jumpTo('/activity-717')"
        />
        <div class="other-way-login mt-40">
          <span class="line border-bottom"></span>
          <a href="https://support.qq.com/products/60627/faqs/48969" class="txt"
            >收不到验证码？获取帮助</a
          >
          <span class="line border-bottom"></span>
        </div>

        <p class="cl-main fs-26 text-center mt-20">
          长按识别二维码
        </p>

        <img class="wechat-img" :src="wechatInfo.wechatImg" alt="" />

        <div class="text-center mt-20 pb-30">
          <van-button
            plain
            size="mini"
            type="primary"
            class="pl-40 pr-40 mg-auto border-radius-10 fs-26"
            id="copy"
            :data-clipboard-text="wechatInfo.wechatCode"
            >复制微信号,去添加</van-button
          >
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Field } from "vant";
import SmsCountdown from "@/components/SmsCountdown";
import api from "@/api";
import Clipboard from "clipboard";
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
      loginLoading: false
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  computed: {
    // 微信客服消息
    wechatInfo() {
      return getWechatImg("service");
    },
    // 是否为活动期间
    isActivity() {
      return this.$store.state.isActivity;
    }
  },
  created() {
    this.$nextTick(function() {
      let clipboard = new Clipboard("#copy");
      clipboard.on("success", () => {
        this.$Toast("复制成功!");
      });
      clipboard.on("error", () => {
        this.$Toast("复制失败!");
        clipboard.destroy();
      });
    });
  },
  methods: {
    // 登陆注册
    signAndLogin() {
      const _this = this;
      if (!_this.phoneNumber) {
        _this.$Toast({
          message: "请输入手机号"
        });
        return;
      }
      if (!_this.sms) {
        _this.$Toast({
          message: "请输入验证码"
        });
        return;
      }
      _this.loginLoading = true;
      api
        .signAndLogin({
          phone: _this.phoneNumber,
          smsCode: this.sms,
          fromPage: getStorage("qd_page") || "",
          qudao: getStorage("qd") || ""
        })
        .then(res => {
          if (res.success) {
            const token =
              res.result.token.userId + "_" + res.result.token.token;
            setStorage("isNewUser", res.result.isNewUser);
            setStorage("isReLogin", true);
            _this.$store.commit({
              type: "LOGIN",
              info: {
                phone: _this.phoneNumber,
                token: token
              }
            });
            _this.wechat();
          } else {
            _this.$Toast({
              message: res.message
            });
          }
          _this.loginLoading = false;
        });
    },
    // 微信授权相关
    wechat() {
      if (isWechat()) {
        // 监测有没有微信授权过
        api.getIsWeChatAuthed().then(res => {
          setStorage("authed", res.result.authed);
          wechatAuthorization(window.location.origin + "/wechatLogin");
        });
      } else {
        this.loginSuccessCallback();
      }
    },
    // 老用户登陆
    wechatLogin() {
      wechatAuthorization(window.location.origin + "/wechatLogin");
    },
    // 非微信环境,获取用户信息
    loginSuccessCallback() {
      this.$store.dispatch("UPDATE_USER_INFO", {
        token: getStorage("token")
      });
      this.$Toast({
        message: "登录成功"
      });
      let loginBackUrl = getStorage("loginBackUrl") || "/";
      let loginBackQuery = getStorage("loginBackQuery") || {};
      this.$router.replace({
        path: loginBackUrl,
        query: loginBackQuery
      });
      this.loginLoading = false;
    },
    jumpTo(path) {
      this.$router.push({
        path: path
      });
    }
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
    top:50%;
    left:50%;
    width: 100%;
    transform:translate(-50%,-50%);
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
