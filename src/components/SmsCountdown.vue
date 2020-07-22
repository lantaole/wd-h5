<template>
  <van-button
    class="border-radius-10"
    size="mini"
    type="primary"
    :disabled="disables || time > 0"
    @click="run"
  >
    {{ btnText }}
  </van-button>
</template>
<script>
import { Button } from "vant";
import api from "@/api";
import Vue from "vue";
// 谷歌验证
import { VueReCaptcha } from "vue-recaptcha-v3";
Vue.use(VueReCaptcha, {
  siteKey: "6LchlZ0UAAAAAB-69cFKResZKh-9mlrwPuVPNQVX",
  loaderOptions: {
    useRecaptchaNet: true
  }
});

export default {
  components: {
    vanButton: Button
  },
  props: {
    second: {
      type: Number,
      default: 60
    },
    phone: {
      required: true,
      default: null
    },
    purpose: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      time: 0,
      disables: false
    };
  },
  computed: {
    btnText() {
      return this.time > 0 ? this.time + `s 重新发送` : "获取验证码";
    }
  },
  methods: {
    run() {
      const self = this;
      if (!self.phone || self.phone.length != 11) {
        self.$Toast({
          message: "电话号码错误，请重新输入！"
        });
        return;
      }
      self.start();
      self.setDisabled(true);
      this.getSmscode();
    },
    getSmscode() {
      const self = this;
      api
        .sendVerifyCode({
          mobile: self.phone,
          userType: 3
        })
        .then(res => {
          if (res.success) {
            self.$Toast({
              message: res.msg
            });
          } else {
            self.$Toast({
              message: res.msg || "发送失败"
            });
          }
        });
    },
    start() {
      this.time = this.second;
      this.timer();
    },
    setDisabled(val) {
      this.disables = val;
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.setDisabled(false);
      }
    }
  }
};
</script>
