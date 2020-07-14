<template>
  <div class="sevenDay-wrap">
    <div class="top position-relative">
      <img class="bg-img" src="~assets/images/common/seven-day-bg.png" alt="" />
      <img
        class="wechat-img position-absolute"
        :src="wechatInfo.wechatImg"
        alt=""
      />
    </div>
    <img
      class="bottom-btn"
      src="~assets/images/common/seven-day-btn.png"
      alt=""
      @click="jumpTo"
    />
  </div>
</template>

<script>
import { getStorage, getWxConfigParams, getWechatImg } from "@/config/utils";
export default {
  name: "SevenDay",
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    },
    // 微信客服消息
    wechatInfo() {
      return getWechatImg("teacher");
    }
  },
  mounted() {
    this.shareConfig();
  },
  methods: {
    shareConfig() {
      let referrerId = this.isLogin ? getStorage("token").split("_")[0] : "";
      let fromPage = this.$route.meta.markName;
      let linkUrl = this.isLogin
        ? window.location.origin +
          "" +
          window.location.pathname +
          "?channel=user_recommend&source=official_accounts&referrerId=" +
          referrerId +
          "&fromPage=" +
          fromPage
        : window.location.origin + window.location.pathname;
      let shareParams = {
        title:
          "4天出词，7天排名暴力拉升，快戳我！4天出词，7天排名暴力拉升，快戳我！",
        desc: "十个电商人，九个半就在靠它冲排名！一起来做电商王者！",
        link: linkUrl,
        imgUrl: window.location.origin + "/img/common/share-sevenday.png"
      };
      getWxConfigParams(shareParams);
    },
    jumpTo() {
      this.$router.push({
        path: "/buy-energy?opt=2"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.sevenDay-wrap {
  width: 100%;
  .top {
    margin-bottom: 99px;
    .bg-img {
      width: 100%;
      display: block;
    }
    .wechat-img {
      width: 130px;
      height: 130px;
      bottom: 204px;
      left: 50%;
      margin-left: -65px;
    }
  }
  .bottom-btn {
    position: fixed;
    width: 100%;
    bottom: 50px; /*no*/
    display: block;
  }
}
</style>
