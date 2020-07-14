<template>
  <div>
    <van-dialog
      v-model="show"
      title="您还未登录"
      :closeOnClickOverlay="true"
      :show-cancel-button="true"
      :confirm-button-text="wechatLogin ? '微信登录' : '登录'"
      @close="close()"
      @confirm="login()"
    >
      <p class="mt-30 ml-30 fs-26 text-center cl-999">
        登陆后可以领取专属福利.
      </p>
      <p class="mt-10 ml-30 mb-50 fs-26 text-center cl-999">
        免费获取店铺诊断,卖家工具随时随地用.
      </p>
    </van-dialog>
  </div>
</template>

<script>
import { wechatAuthorization, setStorage } from "@/config/utils";
export default {
  name: "LoginDialog",
  props: {
    showLogin: {
      type: Boolean,
      default: false
    },
    isWechatLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      wechatLogin: false
    };
  },
  methods: {
    close() {
      this.$emit("on-close");
    },
    login() {
      if (this.wechatLogin) {
        // 微信登录
        setStorage("loginBackUrl", this.$route.path);
        setStorage("loginBackQuery", this.$route.query || {});
        wechatAuthorization(window.location.origin + "/wechatLogin");
      } else {
        this.$router.push({ path: "login" });
      }
    }
  },
  watch: {
    showLogin(val) {
      this.show = val;
    },
    isWechatLogin(val) {
      this.wechatLogin = val;
    }
  }
};
</script>
