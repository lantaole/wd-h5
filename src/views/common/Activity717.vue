<template>
  <div class="sevenDay-wrap position-relative">
    <div class="top position-relative">
      <img
        class="bg-img"
        :src="this.baseUrl + '/images/common/717/info-img.png'"
        alt=""
        @click="share"
      />
      <div class="countTime" :style="isShowNavBar ? 'top: 46px' : 'top: 0'">
        <img
          v-if="isActivityDisabled && isActive"
          :src="this.baseUrl + '/images/common/717/time-end.png'"
          alt=""
        />
        <img
          v-else-if="isActivityDisabled && !isActive"
          :src="this.baseUrl + '/images/common/717/time-start.png'"
          alt=""
        />
        <img
          v-else
          :src="this.baseUrl + '/images/common/717/time-over.png'"
          alt=""
        />
        <div
          class="time-info position-absolute text-center cl-fff fs-28 font-bold"
          v-show="isActivityDisabled"
        >
          <span style="color:#FFF55D;">{{ d || 0 }}</span>
          <span> 天 </span>
          <span style="color:#FFF55D;">{{ h || 0 }}</span>
          <span> 时 </span>
          <span style="color:#FFF55D;">{{ m || 0 }}</span>
          <span> 分 </span>
          <span style="color:#FFF55D;">{{ s || 0 }}</span>
          <span> 秒</span>
        </div>
      </div>
      <img
        class="fans"
        :src="this.baseUrl + '/images/common/717/my-fans.png'"
        alt=""
        @click="jumpTo('/my-fans')"
        :style="isShowNavBar ? 'top: 116px' : 'top: 70px'"
      />
      <div class="seeRule position-absolute" @click="seeRule"></div>
      <div
        class="followDialog position-absolute"
        @click="followDialog = true"
      ></div>
    </div>
    <img
      class="bottom-btn"
      :src="this.baseUrl + '/images/common/717/bottom-btn-img.png'"
      alt=""
    />
    <div class="bottom-btn-div">
      <div style="width: 25%;" @click="jumpTo('/seven-day')"></div>
      <div style="width: 25%;" @click="jumpTo('/buy-energy?opt=2')"></div>
      <div style="width: 50%;" @click="share"></div>
    </div>
    <share-activity
      v-if="shareUserName"
      :showShareDialog="showShareDialog"
      :bgImg="shareDialogImg"
      :shareUserName="shareUserName"
      :shareTitle="shareTitle"
      :qrCodeStyle="qrCodeStyle"
      @closeShareDialog="closeShareDialog"
    ></share-activity>
    <!--关注公众号弹窗-->
    <follow-dialog
      :isShow="followDialog"
      @on-close="followDialog = false"
    ></follow-dialog>
  </div>
</template>

<script>
import api from "@/api";
import {
  getStorage,
  getWxConfigParams,
  isWechat,
  judgeBrowerType
} from "@/config/utils";
import ShareActivity from "@/components/ShareActivity";
import FollowDialog from "@/components/FollowDialog";
export default {
  name: "Activity717",
  components: {
    ShareActivity,
    FollowDialog
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
    // 分享人昵称
    shareUserName() {
      return this.$store.state.userInfo.wechatInfo
        ? this.$store.state.userInfo.wechatInfo.nickname
        : "亲";
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  data() {
    return {
      isActivityDisabled: true,
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      startTime: "2019/7/17 10:00:00",
      endTime: "2019/7/17 23:59:59",
      isActive: false,
      showShareDialog: false,
      shareDialogImg: this.baseUrl + "/images/common/717/share.png",
      shareTitle: "#邀请您免费获取599元7天排名拉升服务1套#",
      qrCodeStyle: {
        width: 192,
        height: 192,
        x: 48,
        y: 675
      },
      followDialog: false
    };
  },
  mounted() {
    const _this = this;
    if (judgeBrowerType() === 1) {
      _this.startTime = "2019/7/17 10:00:00";
      _this.endTime = "2019/7/17 23:59:59";
    } else {
      _this.startTime = "2019-7-17 10:00:00";
      _this.endTime = "2019-7-17 23:59:59";
    }
    this.shareConfig();
    // 判断活动是否结束,开启倒计时
    api.isActivityDisabled().then(res => {
      if (res.success) {
        _this.isActivityDisabled = res.result;
        if (res.result) {
          _this.countTime();
        }
      }
    });
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
        title: "7天冲首页排名免费做，来不及解释了！快戳",
        desc: "免费带你7天快速提升爆款排名，100个限量名额速度抢呀！！",
        link: linkUrl,
        imgUrl: window.location.origin + "/images/common/717/share-icon.jpg"
      };
      getWxConfigParams(shareParams);
    },
    jumpTo(path) {
      this.$router.push({
        path: path
      });
    },
    share() {
      if (this.isLogin) {
        this.showShareDialog = true;
        api.activityApply();
      } else {
        this.$Toast("请先登陆.");
        this.jumpTo("/login");
      }
    },
    // 倒计时
    countTime() {
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      // 活动开始时间
      let startTime = new Date(this.startTime).getTime();
      //设置截止时间(开始前计算距离开始时间, 开始后计算距离结束时间)
      let endDate;
      if (now < startTime) {
        endDate = new Date(this.startTime);
        this.isActive = false;
      } else {
        endDate = new Date(this.endTime);
        this.isActive = true;
      }
      var end = endDate.getTime();
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      }
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
    closeShareDialog() {
      let _this = this;
      _this.showShareDialog = !_this.showShareDialog;
    },
    seeRule() {
      window.scrollTo(0, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.sevenDay-wrap {
  width: 100%;
  position: relative;
  padding-bottom: 50px; /*no*/
  .top {
    margin-bottom: 120px;
    .bg-img {
      width: 100%;
      display: block;
    }
    .fans {
      width: 220px;
      position: fixed;
      right: 30px;
      z-index: 11;
    }
    .countTime {
      width: 320px;
      height: 133px;
      position: fixed;
      right: 30px;
      z-index: 11;
      img {
        width: 100%;
        height: 100%;
      }
      .time-info {
        width: 100%;
        top: 55px;
      }
    }
    .seeRule {
      width: 130px;
      height: 40px;
      right: 10px;
      top: 505px;
      z-index: 10;
    }
    .followDialog {
      width: 50px;
      height: 50px;
      left: 340px;
      top: 2015px;
      z-index: 10;
    }
  }
  .bottom-btn {
    position: fixed;
    width: 100%;
    bottom: 50px; /*no*/
    display: block;
  }
  .bottom-btn-div {
    position: fixed;
    width: 100%;
    height: 120px;
    bottom: 50px; /*no*/
    div {
      height: 100%;
      float: left;
    }
  }
}
</style>
