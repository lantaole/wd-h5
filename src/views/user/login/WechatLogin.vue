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
      const self = this;
      const code = this.$route.query.code;
      if (code) {
        setStorage("authed", true);
        self.wechatLogin(code);
      } else {
        self.wechat();
      }
    },
    // 微信登录
    wechatLogin(code) {
      const self = this;
      api.weChatWebLogin({
        code: code,
      }).then(res => {
        console.log(res);
      })
      // api
      //   .weChatLoginAuth({
      //     userType: 3,
      //     code: code,
      //     openidSource: 1,
      //     phone: self.$store.state.userInfo.phone || "13655816578"
      //   })
      //   .then(res => {
      //     console.log(res);
      //     if (res.success) {
      //       self.loginSuccessCallback(
      //         res.result.userId + "_" + res.result.token
      //       );
      //     } else {
      //       if (res.code === "phone_used") {
      //         self.$dialog.alert({
      //           title: "提示",
      //           confirmButtonText: "我知道了",
      //           message: res.message
      //         });
      //         this.$store.commit("OUT_LOGIN");
      //         this.$router.replace({ path: "/login" });
      //       } else if (res.code === "new_user") {
      //         self.$dialog.alert({
      //           title: "提示",
      //           confirmButtonText: "我知道了",
      //           message: "新用户请先注册"
      //         });
      //         this.$router.replace({ path: "/login" });
      //       }
      //     }
      //   })
      //   .catch(() => {
      //     self.loginBackTo();
      //   });
    },

    // 登陆成功回调,获取用户信息
    loginSuccessCallback(token) {
      const self = this;
      self.$store
        .dispatch("UPDATE_USER_INFO", {
          token: token
        })
        .then(res => {
          if (res.success) {
            self.$Toast({
              message: "登录成功"
            });
            self.loginBackTo();
          } else {
            self.$Toast({
              message: res.message
            });
          }
        })
        .catch(() => {
          self.loginBackTo();
        });
      self.loginLoading = false;
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
