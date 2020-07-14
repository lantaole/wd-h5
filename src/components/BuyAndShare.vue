<template>
  <div class="buy-and-share-wrap">
    <div class="search-times flex-row-space-between mt-30 pb-10">
      <div class="search-times-text cl-999 fs-24">
        提示: 每次查询消耗<span class="cl-main">20能量</span>
        <!--<span class="fs-20">(同一词查询不会产生扣除)</span>-->
      </div>
      <div
        v-if="isLogin"
        class="assets position-relative text-center border-radius-10 cl-fff fs-20 pl-20 pr-5 ml-40"
      >
        <img src="~assets/images/account/money.png" alt="" />
        <router-link to="/energy-list" class="cl-fff"
          >剩余{{ userEnergy || 0 }}能量</router-link
        >
      </div>
    </div>

    <div class="buy-share-btns flex-row-space-between mt-10">
      <router-link to="/buy-energy" class="the-btn">
        <div class="btn-top pt-5">
          <img src="~assets/images/common/buy.png" alt="" />
          <span class="fs-28 ml-10 font-bold">立即购买</span>
        </div>
        <p class="cl-999 fs-20 text-center">为查询蓄力, 补充能量</p>
      </router-link>
      <a class="the-btn" @click="closeShareFunc">
        <div class="btn-top pt-5">
          <img src="~assets/images/common/share.png" alt="" />
          <span class="fs-28 ml-10 font-bold">分享好友</span>
        </div>
        <p class="cl-999 fs-20 text-center">每一次分享，赚取能量</p>
      </a>
    </div>
    <share-func
      :showShareFunc="showShareFunc"
      :showFuncBg="showFuncBg"
      :qrCodeStyle="qrCodeStyle"
      @closeShareFunc="closeShareFunc"
    ></share-func>
  </div>
</template>

<script>
import { getWxConfigParams, getStorage } from "@/config/utils";
import ShareFunc from "./ShareFunc";
export default {
  name: "BuyAndShare",
  props: {
    showFuncBg: {
      type: String
    },
    shareObj: {
      type: Object
    }
  },
  components: {
    ShareFunc
  },
  data() {
    return {
      isWechatLogin: false,
      showShareFunc: false,
      qrCodeStyle: {
        width: 200,
        height: 200,
        x: 162,
        y: 481
      }
    };
  },
  mounted() {
    let _this = this;
    _this.shareFriendFunc();
  },
  computed: {
    userEnergy() {
      return this.$store.state.energy.balance;
    },
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    shareFriendFunc() {
      let _this = this;
      _this.referrerId = _this.$route.query.referrerId || "";
      let referrerId;
      let fromPage = _this.$route.meta.markName;
      let shareParams;
      if (_this.isLogin) {
        referrerId = getStorage("token").split("_")[0];
      } else {
        referrerId = "";
      }
      shareParams = {
        title: _this.shareObj.title,
        desc: _this.shareObj.desc,
        link:
          window.location.origin +
          "" +
          window.location.pathname +
          "?channel=user_recommend&source=official_accounts&referrerId=" +
          referrerId +
          "&fromPage=" +
          fromPage,
        imgUrl: _this.shareObj.imgUrl
      };
      getWxConfigParams(shareParams);
    },
    closeShareFunc() {
      if (!this.showFuncBg) {
        this.$Toast("正在努力开发中...");
        return;
      }
      if (!this.isLogin) {
        this.$emit("loginFunc");
      } else {
        this.showShareFunc = !this.showShareFunc;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.buy-and-share-wrap {
  .search-times {
    align-items: center;
    .search-times-text {
    }
    .assets {
      width: 250px;
      height: 33px;
      line-height: 33px;
      background-color: #ff6000;
      img {
        height: 33px;
        position: absolute;
        left: -10px;
        top: 0;
      }
    }
  }
  .buy-share-btns {
    .the-btn {
      width: 300px;
      height: 90px;
      border-radius: 43px;
      border: 1px solid #ff6000; /*no*/
      background-color: #ffefe5;
      .btn-top {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 32px;
          height: 32px;
        }
        span {
          color: #ff6000;
        }
      }
    }
  }
}
</style>
