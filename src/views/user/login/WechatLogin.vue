<template>
  <div class="text-center cl-main fs-30 font-bold pt-100 mt-100">
    授权登陆中, 请稍等...
  </div>
</template>

<script>
import api from "@/api";
import { getStorage, setStorage } from "@/config/utils";
export default {
  name: "Login",
  data() {
    return {};
  },
  mounted() {
    this.getCode();
  },
  methods: {
    // 微信授权获取code
    getCode() {
      const _this = this;
      const code = this.$route.query.code;
      if (code) {
        setStorage("authed", true);
        _this.wechatLogin(code);
      } else {
        let loginBackUrl = getStorage("loginBackUrl") || "/";
        let loginBackQuery = getStorage("loginBackQuery") || {};
        _this.$router.replace({
          path: loginBackUrl,
          query: loginBackQuery
        });
      }
    },
    // 微信登录
    wechatLogin(code) {
      const _this = this;
      api
        .weChatLoginAuth({
          code: code,
          phone: _this.$store.state.userInfo.phone || ""
        })
        .then(res => {
          if (res.success) {
            _this.loginSuccessCallback(
              res.result.userId + "_" + res.result.token
            );
          } else {
            if (res.code === "phone_used") {
              _this.$dialog.alert({
                title: "提示",
                confirmButtonText: "我知道了",
                message: res.message
              });
              this.$store.commit("OUT_LOGIN");
              this.$router.replace({ path: "/login" });
            } else if (res.code === "new_user") {
              _this.$dialog.alert({
                title: "提示",
                confirmButtonText: "我知道了",
                message: "新用户请先注册"
              });
              this.$router.replace({ path: "/login" });
            }
          }
        })
        .catch(() => {
          _this.loginBackTo();
        });
    },
    // 登陆成功回调,获取用户信息
    loginSuccessCallback(token) {
      const _this = this;
      _this.$store
        .dispatch("UPDATE_USER_INFO", {
          token: token
        })
        .then(res => {
          if (res.success) {
            _this.$Toast({
              message: "登录成功"
            });
            _this.loginBackTo();
          } else {
            _this.$Toast({
              message: res.message
            });
          }
        })
        .catch(() => {
          _this.loginBackTo();
        });
      _this.loginLoading = false;
    },
    // 登录后跳转
    loginBackTo() {
      let loginBackUrl = getStorage("loginBackUrl") || "/";
      let loginBackQuery = getStorage("loginBackQuery") || {};
      this.$router.replace({
        path: loginBackUrl,
        query: loginBackQuery
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
