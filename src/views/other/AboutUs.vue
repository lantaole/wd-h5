<template>
  <div class="about-us">
    <img
      class="img"
      @click="commonChangeRouter('/')"
      src="~assets/images/aboutUs/banner.png"
      alt=""
    />
    <section class="position-relative">
      <img
        class="img"
        @click="commonChangeRouter('/')"
        src="~assets/images/aboutUs/content_01.png"
        alt=""
      />
      <img
        @click="commonChangeRouter('/login')"
        src="~assets/images/aboutUs/energy.gif"
        class="energy"
        alt=""
      />
      <div class="router-box clear" @click="changeRouter">
        <div date-router="/tools-cpm" class="child"></div>
        <div date-router="/tools-cxh" class="child"></div>
        <div date-router="/tools-jztc" class="child"></div>
        <div date-router="/wxToTb" class="child"></div>
      </div>
    </section>
    <img src="~assets/images/aboutUs/arrow.png" alt="" class="arrow img" />
    <section
      class="position-relative"
      @click="commonChangeRouter('/tools-cpm')"
    >
      <img class="img" src="~assets/images/aboutUs/content_sscpm.png" alt="" />
      <img
        class="ewm-common"
        src="~assets/images/aboutUs/ewm_sscpm.png"
        alt=""
      />
    </section>
    <section
      class="position-relative"
      @click="commonChangeRouter('/tools-cxh')"
    >
      <img class="img" src="~assets/images/aboutUs/content_wwcxh.png" alt="" />
      <img
        class="ewm-common"
        src="~assets/images/aboutUs/ewm_wwcxh.png"
        alt=""
      />
    </section>
    <section
      class="position-relative"
      @click="commonChangeRouter('/tools-jztc')"
    >
      <img class="img" src="~assets/images/aboutUs/content_jztc.png" alt="" />
      <img
        class="ewm-common"
        src="~assets/images/aboutUs/ewm_jztc.png"
        alt=""
      />
    </section>
    <section class="position-relative" @click="commonChangeRouter('/wxToTb')">
      <img class="img" src="~assets/images/aboutUs/content_wxfxzs.png" alt="" />
      <img
        class="ewm-common"
        src="~assets/images/aboutUs/ewm_wxfxzs.png"
        alt=""
      />
    </section>
    <footer class="footer bc-fff">
      <section class="position-relative">
        <img class="img" src="~assets/images/aboutUs/footer.png" alt="" />
        <img class="ewm-wx" src="~assets/images/aboutUs/ewm_wx.jpg" alt="" />
      </section>
    </footer>
    <buy-share
      v-show="false"
      :showFuncBg="showFuncBg"
      :shareObj="shareObj"
      @loginFunc="loginFunc"
    ></buy-share></div
></template>

<script>
import BuyShare from "@/components/BuyAndShare";
import { getStorage } from "@/config/utils";

export default {
  name: "AboutUs",
  components: {
    BuyShare
  },
  data() {
    return {
      shareObj: {
        title: "随手查",
        desc: "掌柜好帮手，随时随地想查就查",
        imgUrl:
          window.location.origin +
          this.baseUrl +
          "/upload/9acfb202-c348-4a27-b1e2-6b7f737acc36.png"
      },
      showFuncBg: this.baseUrl + "/images/toolsIcon/toolsShareBg/cxh.png",
      showLogin: false
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  methods: {
    changeRouter(e) {
      this.$router.push({ path: e.target.getAttribute("date-router") });
    },
    commonChangeRouter(router) {
      this.$router.push({ path: router });
    },
    loginFunc() {
      let _this = this;
      _this.isWechatLogin = !!(
        _this.$store.state.authed && getStorage("token")
      );
      _this.showLogin = true;
    }
  }
};
</script>

<style scoped lang="scss">
.about-us {
  text-align: center;
  padding-bottom: 272px;
}
.about-us .img {
  width: 100%;
  display: block;
  /*pointer-events: none;*/
}
.about-us .arrow {
  width: 40px;
  display: inline-block;
}
.about-us .energy {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
}
.about-us .ewm-common {
  position: absolute;
  width: 100px;
  top: 56px;
  right: 70px;
}
.about-us .ewm-wx {
  width: 140px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
}
.about-us .footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
.router-box {
  height: 150px;
  position: absolute;
  bottom: 320px;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  .child {
    width: 25%;
    height: 100%;
    float: left;
  }
}
</style>
