<template>
  <div
    id="app"
  >
    <keep-alive :max="3" include="Home,Search">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import api from "@/api";
import { Checkbox } from "vant";
import {
  getStorage,
  setStorage,
  removeStorage,
  isWechat,
  getWechatImg
} from "@/config/utils";

export default {
  components: {
    vanCheckbox: Checkbox,
  },
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  data() {
    return {
      noLoginPathList: ["/verification-code", "/login"],
      startX: 30,
      startY: 150,
      screenHeight: document.body.clientHeight,
    };
  },
  created() {
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        self.screenHeight = window.screenHeight;
      })();
    };
  },
  methods: {
  },
  watch: {
    $route(to, from) {
      const self = this;
      if (to.path === "/login" && from.path !== "/wechatLogin") {
        setStorage("loginBackUrl", from.path || "/");
        setStorage("loginBackQuery", from.query || {});
        if (self.isLogin) {
          self.$Toast("您已经登陆过了");
          self.$router.push({
            path: "/account"
          });
        }
      }
      if (self.noLoginPathList.includes(to.path)) {

      }else {
        if (!self.isLogin) {
          setTimeout(function() {
            if (!self.isLogin) {
              self.$router.replace({ path: "/login" });
            }
          }, 20);
        }
      }
    },
    screenHeight(val) {
      this.screenHeight = val;
    }
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
  background-color: #F2F2F2;
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
