<template>
  <van-button
    class="border-radius-10"
    size="small"
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
      const _this = this;
      if (!_this.phone || _this.phone.length != 11) {
        _this.$Toast({
          message: "电话号码错误，请重新输入！"
        });
        return;
      }
      _this.start();
      _this.setDisabled(true);
      this.$recaptcha("login")
        .then(token => {
          _this.getSmscode(token);
        })
        .catch(e => {
          console.log("谷歌校验失败:" + e);
          let token =
            "03AOLTBLQDlBK70rQ7TPig8XscbF8WHCGRxam5RO4o0ow3Bi9-IZmFyvS4kUZfPEpDLAnaVxaAGAhVC590XPvj2hC6LEH452XeMeT_roXQM0-THEDQ4-cxhLFjLOAHYwKlf_NMMr8auYDYzY0b_VIOwxE9ATb-3_dnf-oko08hpF-ko6ARiDeD6e794Gnp9XRr2NMN-r_Mimm1lqWg_1ahGQ-OccKFwxNT2_QbHYeU6R0r2LPumoEdAyL69wQxH91EKR9YZkJH8hf1lVCj4t7Y5IofKHyF6gxN9MnPRVqVLmbqs0CPnvyr_iq_FNEBBhFlMljT0YopdzNh";
          this.getSmscode(token);
        });
    },
    getSmscode(token) {
      const _this = this;
      api
        .sendVerifyCode({
          phone: _this.phone,
          purpose: _this.purpose,
          token: token
        })
        .then(res => {
          if (res.success) {
            _this.$Toast({
              message: res.message
            });
          } else {
            _this.$Toast({
              message: res.message || "发送失败"
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
