<template>
  <van-dialog
    v-model="show"
    title="Hi 亲:"
    :closeOnClickOverlay="true"
    :showConfirmButton="false"
    @close="close"
  >
    <div class="contact-dialog-content position-relative pb-30">
      <img
        class="contact-dialog-bg position-absolute"
        src="~assets/images/common/Background.png"
        alt=""
      />
      <div class="ml-50 mr-50 pt-20 text-center fs-26 cl-666">
        我是您的运营参谋，将为您提供一对一辅导，
        让您的运营事半功倍，快来加我吧！
      </div>
      <p class="cl-main fs-26 text-center mt-20 mb-10">
        长按识别二维码
      </p>
      <img class="wx-img mg-auto" :src="wechatInfo.wechatImg" alt="" />
      <van-button
        round
        size="normal"
        class="mg-auto mt-50 cl-main"
        id="copy-dialog"
        :data-clipboard-text="wechatInfo.wechatCode"
        >复制微信号,去添加</van-button
      >
      <van-button
        round
        size="normal"
        class="mg-auto mt-20 cl-fff bc-trans noTip"
        @click="close"
        >我已添加,不再提醒</van-button
      >
      <img
        class="close-img position-absolute"
        src="~assets/images/common/close.png"
        alt=""
        @click="close"
      />
    </div>
  </van-dialog>
</template>
<script>
import { getWechatImg } from "@/config/utils";
import Clipboard from "clipboard";
import { Button } from "vant";
export default {
  components: {
    vanButton: Button
  },
  props: {
    isShow: {
      required: true,
      default: false
    }
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    this.$nextTick(function() {
      let clipboard = new Clipboard("#copy-dialog");
      clipboard.on("success", () => {
        this.$Toast("复制成功!");
      });
      clipboard.on("error", () => {
        this.$Toast("复制失败!");
        clipboard.destroy();
      });
    });
  },
  watch: {
    isShow(val) {
      this.show = val;
    }
  },
  computed: {
    // 微信客服消息
    wechatInfo() {
      return getWechatImg("teacher");
    }
  },
  methods: {
    // 关闭loading后向父组件传值
    close() {
      this.show = false;
      this.$emit("on-close");
    },
    copy() {
      this.$nextTick(function() {
        let clipboard = new Clipboard("#copy-dialog");
        clipboard.on("success", () => {
          this.$Toast("复制成功!");
        });
        clipboard.on("error", () => {
          this.$Toast("复制失败!");
          clipboard.destroy();
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.contact-dialog-content {
  width: 100%;
  min-height: 600px;
  .contact-dialog-bg {
    width: 100%;
    bottom: 0;
    z-index: -1;
  }
  .save-wx-img {
    text-decoration: underline;
  }
  .wx-img {
    width: 260px;
    height: 260px;
  }
  .noTip {
    border: 1px solid #fff; /*no*/
  }
  .close-img {
    width: 60px;
    height: 60px;
    bottom: -100px;
    left: 50%;
    margin-left: -30px;
  }
}
</style>
