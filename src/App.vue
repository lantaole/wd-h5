<template>
  <div
    id="app"
    :style="{
      paddingTop: isShowNavBar ? '46px' : '0',
      paddingBottom: paddingBottom,
      backgroundColor: backgroundColor,
      minHeight: screenHeight + 'px'
    }"
  >
    <keep-alive :max="3" include="Home,Search">
      <router-view></router-view>
    </keep-alive>
    <!--顶部nav-->
    <van-nav-bar :title="navBarTitle" v-show="isShowNavBar"></van-nav-bar>

    <!--右下按钮-->
    <div
      v-drag
      class="right-bottom-btns drag-box clear"
      v-show="isShowContactUsBtn"
      style="right: 10px; bottom: 150px"
    >
      <!--活动入口-->
      <img
        v-show="isActivity"
        src="~assets/images/common/r-b-btn-get.png"
        @click="jumpTo('/activity-717')"
      />
      <!--关注公众号按钮-->
      <img
        class="attention-wx"
        src="~assets/images/common/attention_wx.png"
        @click="followDialog = true"
      />
      <!--分享按钮-->
      <img
        src="~assets/images/common/invite_fans.png"
        @click="jumpTo('/share')"
      />
      <!--联系导师按钮-->
      <!--<img-->
        <!--src="~assets/images/common/contact_service_icon.png"-->
        <!--alt=""-->
        <!--@click="showContactUsDialog = true"-->
      <!--/>-->
    </div>

    <!--关注公众号弹窗-->
    <follow-dialog
      :isShow="followDialog"
      @on-close="followDialog = false"
    ></follow-dialog>

    <!--联系导师-->
    <contact-us
      :isShow="showContactUsDialog"
      @on-close="showContactUsDialog = false"
    ></contact-us>
    <!--底部tab栏-->
    <tab-bar v-show="isShowTabBar"></tab-bar>
    <!--活动弹窗-->
    <activity-pop
      :isShow="isShowActivityPop"
      @on-close="isShowActivityPop = false"
    ></activity-pop>
    <!--日签入口-->
    <ToolsBottomGuide
      @collapse="daySignCollapse"
      v-show="showDaySign"
    ></ToolsBottomGuide>
  </div>
</template>

<script>
import api from "@/api";
import NavBar from "@/components/NavBar";
import TabBar from "@/components/TabBar";
import ActivityPop from "@/components/Activity";
import FollowDialog from "@/components/FollowDialog";
import { Checkbox } from "vant";
import {
  getStorage,
  setStorage,
  removeStorage,
  isWechat,
  getWechatImg
} from "@/config/utils";
import Clipboard from "clipboard";
import ContactUs from "@/components/ContactUs";
import ToolsBottomGuide from "@/components/ToolsBottomGuide";

export default {
  components: {
    vanNavBar: NavBar,
    ContactUs,
    TabBar,
    ActivityPop,
    FollowDialog,
    vanCheckbox: Checkbox,
    ToolsBottomGuide
  },
  watch: {
    $route(to, from) {
      const _this = this;
      _this.accesslog(to.meta.markName);
      // _this.showDaySign = !!to.meta.showDaySign;
      _this.showDaySign = false;
      if (_this.showDaySign) {
        if (to.meta.isShowTabBar) {
          _this.paddingBottom = _this.collapse ? "50px" : "150px";
        } else {
          _this.paddingBottom = _this.collapse ? "0" : "100px";
        }
      } else {
        if (to.meta.isShowTabBar) {
          _this.paddingBottom = "50px";
        } else {
          _this.paddingBottom = "0";
        }
      }
      if (to.path === "/login" && from.path !== "/wechatLogin") {
        setStorage("loginBackUrl", from.path || "/");
        setStorage("loginBackQuery", from.query || {});
        if (_this.isLogin) {
          _this.$Toast("您已经登陆过了");
          _this.$router.push({
            path: "/account"
          });
        }
      }
      if (_this.mustLoginPathList.includes(to.path)) {
        if (!_this.isLogin) {
          setTimeout(function() {
            if (!_this.isLogin) {
              _this.$router.replace({ path: "/login" });
            }
          }, 20);
        }
      }
    },
    screenHeight(val) {
      this.screenHeight = val;
    }
  },
  computed: {
    // 是否显示顶部navbar
    isShowNavBar() {
      return this.$route.meta.isShowNavBar && !isWechat();
    },
    // 顶部navbar title
    navBarTitle() {
      return this.$route.meta.title;
    },
    // 是否显示底部tabbar
    isShowTabBar() {
      return this.$route.meta.isShowTabBar;
    },
    // 是否显示联系客服按钮
    isShowContactUsBtn() {
      return !this.noRightBottomBtnList.includes(this.$route.path);
    },
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    },
    // 微信客服消息
    wechatInfo() {
      return getWechatImg("teacher");
    },
    // 是否为活动期间
    isActivity() {
      return this.$store.state.isActivity;
    }
  },
  data() {
    return {
      followDialog: false,
      showContactUsDialog: false,
      rewardSuccessDialog: false,
      mustLoginPathList: ["/account", "/share"],
      noRightBottomBtnList: ["/login", "/score"],
      isShowActivityPop: false,
      startX: 30,
      startY: 150,
      screenHeight: document.body.clientHeight,
      showDaySign: true,
      paddingBottom: "150px",
      backgroundColor: "",
      collapse: false
    };
  },
  created() {
    setStorage("positionX", 10);
    setStorage("positionY", 150);
    const _this = this;
    this.$nextTick(function() {
      let clipboard = new Clipboard("#copy");
      clipboard.on("success", () => {
        this.$Toast("复制成功!");
      });
      clipboard.on("error", () => {
        this.$Toast("复制失败!");
        clipboard.destroy();
      });
    });
  },
  mounted() {
    const _this = this;
    setTimeout(function() {
      if (_this.isActivity && _this.$route.path !== "/activity-717") {
        if (!_this.isLogin) {
          setTimeout(function() {
            _this.isShowActivityPop = true;
          }, 10 * 1000);
        } else {
          _this.isShowActivityPop = true;
        }
      }
    }, 200);
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        _this.screenHeight = window.screenHeight;
      })();
    };
  },
  directives: {
    drag: el => {
      let sx, sy, mx, my, endX, endY;
      let positionX = getStorage("positionX") || 10,
        positionY = getStorage("positionY") || 150;
      let moved = false;
      el.addEventListener(
        "touchstart",
        function(e) {
          sx = e.changedTouches[0].clientX;
          sy = e.changedTouches[0].clientY;
        },
        false
      );

      /* 绑定第二个事件touchmove，手指在屏幕上连续滑动时连续地触发*/
      el.addEventListener(
        "touchmove",
        function(e) {
          moved = true;
          e.stopPropagation();
          e.preventDefault();
          mx = e.changedTouches[0].clientX - sx;
          my = e.changedTouches[0].clientY - sy;
          endX = positionX - mx;
          endY = positionY - my;
          el.style.right = endX + "px";
          el.style.bottom = endY + "px";
        },
        false
      );

      /* 添加第三个触摸事件touchend，这个事件的场景就是用户手指从屏幕拿开时触发*/
      el.addEventListener(
        "touchend",
        function() {
          if (moved) {
            endX =
              endX <= (document.body.clientWidth - 43) / 2
                ? 10
                : document.body.clientWidth - 83;
            endY = endY < 50 ? 50 : endY;
            if (endY > document.body.clientHeight - 140) {
              endY = document.body.clientHeight - 150;
            }
          }
          positionX = endX;
          positionY = endY;
          el.style.right = endX + "px";
          el.style.bottom = endY + "px";
          moved = false;
          setStorage("positionX", positionX);
          setStorage("positionY", positionY);
        },
        false
      );
    }
  },
  methods: {
    daySignCollapse(val) {
      this.collapse = val;
      if (!val) {
        this.paddingBottom = "150px";
      } else {
        this.paddingBottom = "50px";
      }
    },
    // 记录页面访问日志
    accesslog(pageMarkName) {
      if (pageMarkName && this.isLogin) {
        api.accesslog({
          moduleCode: pageMarkName
        });
      }
    },
    // 定时关闭
    timeOutClose(name, outTime) {
      const _this = this;
      setTimeout(function() {
        _this[name] = false;
      }, outTime * 1000);
    },
    jumpTo(path) {
      this.$router.push({
        path: path
      });
    },
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f6f8;
  padding-bottom: 50px; /*no*/
  box-sizing: border-box;
  #newUser-dialog {
    background-color: transparent;
    height: 100%;
  }
  .right-bottom-btns {
    position: fixed;
    width: 153px;
    z-index: 100;
    text-align: right;
    img {
      display: block;
      width: 95px;
      height: 94px;
      float: right;
    }
    .attention-wx {
      width: 153px;
      height: 85px;
    }
  }
  .new-reward {
    position: relative;
    height: 100%;
    .not-notice {
      right: 30px;
      color: #fff;
    }
    .new-user-dialog-img {
      max-width: 520px; /*no*/
    }
    .getEnergyBtn {
      width: 70%;
      height: 100px;
      left: 15%;
      bottom: 160px;
    }
    .close-img {
      width: 60px;
      height: 60px;
    }
  }
  .get-reward {
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    margin-bottom: 400px;
    .get-reward-img {
      width: 155px;
      height: 155px;
    }
  }
}

.swipe-area .van-swipe__indicator {
  width: 20px;
  height: 20px;
}
/*dialog右按钮背景*/
.van-hairline--left {
  background-color: #2ba8e2;
  color: #fff;
}
.van-dialog__cancel {
  background-color: #eee;
  color: #333;
}
.van-dialog__header {
  color: black;
  font-size: 30px;
}

/*隐藏谷歌token验证*/
.grecaptcha-badge {
  display: none !important;
}
.van-dialog {
  overflow: visible;
}
.not-notice {
  .van-checkbox__icon {
    .van-icon {
      width: 18px; /*no*/
      height: 18px; /*no*/
      line-height: 18px; /*no*/
      font-size: 12px; /*no*/
    }
  }
  .van-checkbox__label.van-checkbox__label--left {
    color: #fff;
    font-size: 16px; /*no*/
    margin-right: 12px;
  }
  .van-checkbox__icon,
  .van-checkbox__label {
  }
}
.van-tabbar--fixed,
.van-nav-bar--fixed,
.van-overlay {
  max-width: 540px; /*no*/
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
}
.van-dialog {
  max-width: 432px; /*no*/
}
#newUser-dialog {
  max-width: 540px; /*no*/
}
.share-popup {
  max-width: 540px; /*no*/
}
</style>
