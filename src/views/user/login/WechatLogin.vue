<template>
  <div class="text-center cl-main fs-30 font-bold pt-100 mt-100">
    授权登陆中, 请稍等...
  </div>
</template>

<script>
import api from "@/api";
import { getStorage, setStorage,wechatAuthorization } from "@/config/utils";
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
        self.wechatLogin(code);
      } else {
        wechatAuthorization(window.location.origin + "/wechatLogin");
      }
    },
    // 微信登录
    wechatLogin(code) {
      const self = this;
      api.weChatWebLogin({
        code: code,
      }).then(res => {
        if (res.success) {
          self.$Toast({
            message: "登录成功"
          });
          self.loginSuccessCallback(
            res.data
          );
        } else {
          self.$Toast(res.msg)
        }
      })
    },

    // 登陆成功回调,获取用户信息
    loginSuccessCallback(data) {
      const self = this;
      self.$store
        .dispatch("UPDATE_USER_INFO",data)
      if(data.needBindMobile){
        self.$router.push({name: 'Login'})
      }else {
        self.loginBackTo();
      }
      self.loginLoading = false;
    },
    // 登录后跳转
    loginBackTo() {
      let loginBackUrl = getStorage("loginBackUrl") || "/order-list";
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
