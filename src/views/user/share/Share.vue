<template>
  <div class="share-wrap">
    <div class="share-top position-relative">
      <img
        class="share-top-bg"
        src="~assets/images/account/share/share-top.png"
        alt=""
      />
      <router-link
        to="/my-fans"
        class="myFans fs-30 font-bold position-absolute border-radius-10"
      >
        我的粉丝
      </router-link>
      <div class="invite-btn position-absolute" @click="invite"></div>
    </div>
    <div class="share-content pt-60">
      <div class="position-relative">
        <img
          class="share-img1 mg-auto"
          src="~assets/images/account/share/share-img1.png"
          alt=""
        />
        <div
          class="flex-row-space-around position-absolute"
          style="height: 80px; width: 100%; bottom: 0;"
        >
          <div
            v-for="(item, index) in toolsList"
            :key="index"
            @click="jumpTo(item.url)"
            style="width: 25%;height: 100%;"
          ></div>
        </div>
      </div>
      <img
        class="share-img2 mg-auto mt-80"
        src="~assets/images/account/share/share-img2.png"
        alt=""
        @click="jumpTo('/seven-day')"
      />
      <img
        class="share-btn mg-auto mt-80"
        src="~assets/images/account/share/share-btn.png"
        alt=""
        @click="invite"
      />
    </div>

    <div class="tips-dialog" v-if="showTips" @click="showTips = false">
      <img
        class="howToShare position-absolute"
        src="~assets/images/common/howToShare.png"
        alt=""
      />
      <p class="top-tips-text fs-36 font-bold text-center">
        点击右上角 分享给好友
      </p>
    </div>
  </div>
</template>
<script>
import { getWxConfigParams, getStorage } from "@/config/utils";
export default {
  name: "Share",
  data() {
    return {
      showTips: false,
      toolsList: [
        {
          url: "/tools-cpm"
        },
        {
          url: "/tools-cxh"
        },
        {
          url: "/tools-jztc"
        },
        {
          url: "/wxToTb"
        }
      ]
    };
  },
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  mounted() {
    if (this.isLogin) {
      let referrerId = getStorage("token").split("_")[0];
      let fromPage = this.$route.meta.markName;
      let shareParams = {
        title: "随手查新用户1000能量免费领取啦，快戳我！",
        desc: "快到碗里来，成为我的粉丝，你也可以获得能量，一起来做电商王者！",
        link:
          window.location.origin +
          "/share-back?channel=user_recommend&source=official_accounts&referrerId=" +
          referrerId +
          "&fromPage=" +
          fromPage,
        imgUrl: window.location.origin + "/img/share-back-img1.b18c80a1.png"
      };
      getWxConfigParams(shareParams);
    }
  },
  methods: {
    invite() {
      this.showTips = true;
    },
    jumpTo(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>
<style scoped lang="scss">
.share-wrap {
  padding-bottom: 50px; /*no*/
  .share-top {
    .share-top-bg {
      width: 100%;
    }
    .myFans {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 60px;
      background-color: #f1cb88;
      right: 70px;
      top: 200px;
      color: #7d3000;
    }
    .invite-btn {
      width: 550px;
      height: 90px;
      top: 595px;
      left: 100px;
    }
  }
  .share-content {
    .share-img1 {
      width: 637px;
    }
    .share-img2 {
      width: 590px;
    }
    .share-btn {
      width: 690px;
    }
  }
  .tips-dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    .howToShare {
      width: 270px;
      right: 30px;
      top: 0;
    }
    .top-tips-text {
      color: orange;
      padding-top: 200px;
    }
  }
}
</style>
