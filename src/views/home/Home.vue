<template>
  <div class="home">
    <!--新闻-->
    <van-notice-bar mode="closeable" class="top-news">
      邀请5位好友成为“随手查”用户，即可免费获得599元的7天冲首页服务一套~
      <span style="width: 100px;display: inline-block;"></span>
      邀请5位好友成为“随手查”用户，即可免费获得599元的7天冲首页服务一套~
    </van-notice-bar>
    <div class="home-content">
      <!--轮播图-->
      <van-swipe
        indicator-color="FF592B"
        class="swipe"
        :autoplay="10000"
        :initial-swipe="initSwipeIndex"
      >
        <van-swipe-item
          v-for="(item, index) in swiperList"
          :key="index"
          @click="toAdUrl(item.adUrl)"
          ><img :src="'/upload/' + item.adImg" alt="" class="swipe-img"
        /></van-swipe-item>
      </van-swipe>
      <!--工具列表-->
      <div class="tools-content mr-30 ml-30 mt-25">
        <div
          class="tool-item"
          v-for="(item, index) in toolList"
          :key="index"
          @click="toolsFun(item.toolsUrl)"
        >
          <img :src="item.icon" alt="图标" />
          <p class="text-center cl-333 fs-28">{{ item.title }}</p>
        </div>
      </div>
      <!--活动横幅-->
      <img
        v-show="isActivity"
        class="row-img mg-auto mb-10"
        :src="this.baseUrl + '/images/common/717/row-img.png'"
        alt=""
        @click="jumpTo('/activity-717')"
      />
      <!--登陆领取能量-->
      <div class="pt-10" v-if="!isLogin">
        <router-link to="/account"
          ><img
            class="invite-btn mg-auto"
            src="~assets/images/account/share/btn.gif"
            alt=""
        /></router-link>
      </div>
      <section class="position-relative" @click="jumpTo('/tools-cpm')">
        <img
          class="img"
          src="~assets/images/aboutUs/content_sscpm.png"
          alt=""
        />
        <img
          class="ewm-common"
          src="~assets/images/aboutUs/ewm_sscpm.png"
          alt=""
        />
      </section>
      <section class="position-relative" @click="jumpTo('/tools-jztc')">
        <img class="img" src="~assets/images/aboutUs/content_jztc.png" alt="" />
        <img
          class="ewm-common"
          src="~assets/images/aboutUs/ewm_jztc.png"
          alt=""
        />
      </section>
      <!--分享领取能量-->
      <div class="pt-10">
        <router-link to="/share"
          ><img
            class="item-bg mg-auto"
            src="~assets/images/account/share/share-back-img3.png"
            alt=""
        /></router-link>
      </div>

      <!--添加到桌面-->
      <div
        class="to-desktop pd-20 mt-25 ml-30 mr-30 bc-main border-radius-10"
        @click="addDisktop"
      >
        <div class="vip-tip cl-fff fs-24">添加到我的桌面,想查就查更便捷!</div>
        <van-button plain round size="mini" class="cl-main font-bold"
          >查看</van-button
        >
      </div>
      <!--吐槽-->
      <div class="complaints cl-main mt-30 text-center fs-22">
        没有想要的工具?
        <a
          class="complaintBtn fs-24"
          href="https://support.qq.com/products/60627"
          >这里吐槽</a
        >
      </div>
      <!--海报-->
      <div class="pt-30 pb-20">
        <router-link to="/seven-day"
          ><img
            class="item-bg mg-auto"
            :src="baseUrl + 'images/common/share-banner-img1.png'"
            alt=""
        /></router-link>
      </div>
    </div>
    <login-dialog
      :showLogin="showLogin"
      :isWechatLogin="isWechatLogin"
      @on-close="showLogin = false"
    ></login-dialog>
  </div>
</template>

<script>
import { Button, NoticeBar, Swipe, SwipeItem } from "vant";
import LoginDialog from "@/components/LoginDialog";
import api from "@/api";
import { getStorage, isWechat, getWxConfigParams } from "@/config/utils";

export default {
  name: "Home",
  components: {
    vanButton: Button,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
    vanNoticeBar: NoticeBar,
    LoginDialog
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    },
    // 是否显示顶部navbar
    isShowNavBar() {
      return this.$route.meta.isShowNavBar && !isWechat();
    },
    // 是否为活动期间
    isActivity() {
      return this.$store.state.isActivity;
    }
  },
  data() {
    return {
      initSwipeIndex: 0, // 轮播图初始位置随机
      swiperList: [],
      showLogin: false,
      isWechatLogin: false,
      toolList: [
        {
          title: "查排名",
          icon: `${this.baseUrl}/images/toolsIcon/cpm.png`,
          toolsUrl: "/tools-cpm"
        },
        {
          title: "查小号",
          icon: `${this.baseUrl}/images/toolsIcon/cxh.png`,
          toolsUrl: "/tools-cxh"
        },
        {
          title: "精准淘词",
          icon: `${this.baseUrl}/images/toolsIcon/jztc.png`,
          toolsUrl: "/tools-jztc"
        },
        {
          title: "微分享",
          icon: `${this.baseUrl}/images/toolsIcon/wfx.png`,
          toolsUrl: "/wxToTb"
        },
        {
          title: "查类目",
          icon: `${this.baseUrl}/images/toolsIcon/clm.png`,
          toolsUrl: "/tools-category"
        },
        {
          title: "冲首页",
          icon: `${this.baseUrl}/images/toolsIcon/csy.png`,
          toolsUrl: "/seven-day"
        }
      ]
    };
  },
  created() {
    this.getByAdType();
  },
  mounted() {
    this.shareConfig();
  },
  methods: {
    jumpTo(url) {
      this.$router.push({
        path: url
      });
    },
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
        title: "码上随手查，利用碎片化时间看管店铺，快戳我！",
        desc:
          "专注电商运营工具服务，包含实时查排名，精准淘词，查小号及多样化流量运营服务，助力卖家运营提升！",
        link: linkUrl,
        imgUrl: window.location.origin + "/img/logo.2d4b8163.png"
      };
      getWxConfigParams(shareParams);
    },
    // 获取首页轮播图
    getByAdType() {
      const _this = this;
      api
        .getByAdType({
          adType: "homePage",
          showMode: "all"
        })
        .then(res => {
          if (res.success) {
            if (res.result.length > 0) {
              _this.swiperList = res.result;
              _this.initSwipeIndex = Math.floor(
                Math.random() * this.swiperList.length
              );
            }
          } else {
            _this.$Toast(res.message);
          }
        });
    },
    // 轮播图跳转
    toAdUrl(url) {
      this.$router.push({ path: url });
    },
    // 工具点击
    toolsFun(toolsUrl) {
      const _this = this;
      this.isWechatLogin = !!(_this.$store.state.authed && getStorage("token"));
      if (toolsUrl) {
        _this.$router.push({ path: toolsUrl });
      }
    },
    // 添加到桌面
    addDisktop() {
      window.location.href = "https://support.qq.com/products/60627/faqs/49087";
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  background-color: #f5f6f8;
  .row-img {
    width: 650px;
  }
  .top-news {
    width: 100%;
    div {
      line-height: 66px;
      text-indent: 2em;
    }
    img {
      width: 36px;
      height: 36px;
    }
  }
  .home-content {
    overflow: hidden;
    /*轮播图*/
    .swipe {
      width: 100%;
      height: 400px;
      .swipe-img {
        width: 100%;
        height: 100%;
      }
    }
    .to-desktop {
      display: flex;
      justify-content: space-between;
      .vip-tip {
        line-height: 45px;
      }
    }
    .invite-btn {
      width: 570px;
    }
    .item-bg {
      width: 690px;
    }
    .tools-content {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20px;
      overflow: hidden;
      padding: 10px 0;
      .tool-item {
        width: 33.33%;
        padding: 20px 40px;
        text-align: center;
        display: inline-block;
        box-sizing: border-box;
        img {
          width: 143px;
          height: 143px;
          display: block;
        }
      }
    }
    .complaints {
      .complaintBtn {
        text-decoration: underline;
      }
    }
  }
  .img {
    width: 100%;
    display: block;
  }
  .ewm-common {
    position: absolute;
    width: 100px;
    top: 56px;
    right: 70px;
  }
}
</style>
