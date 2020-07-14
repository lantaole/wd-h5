<template>
  <div class="account-wrap">
    <img
      class="bg"
      :style="isShowNavBar ? 'top: 46px' : ''"
      src="~assets/images/account/bg.png"
      alt=""
    />
    <div class="account-content">
      <div class="top-card mt-100 bc-fff border-radius-10">
        <div class="user-info pd-30 position-relative border-bottom">
          <img
            v-if="userInfo.wechatInfo && userInfo.wechatInfo.headimgurl"
            :src="userInfo.wechatInfo.headimgurl"
            alt="用户头像"
            class="avatar left"
          />
          <img
            v-else
            src="~assets/images/common/avatar.png"
            alt="用户头像"
            class="avatar left"
          />
          <div class="left ml-25 pt-20">
            <p v-if="userInfo.wechatInfo" class="font-bold mb-15 fs-26">
              {{ userInfo.wechatInfo ? userInfo.wechatInfo.nickname : "亲" }}
            </p>
            <p
              class="cl-2BA7E1 fs-28 text-line"
              v-else
              @click="$router.push({ path: '/login' })"
            >
              点此登录
            </p>
            <p v-if="userInfo.phone" class="cl-666">
              手机号: {{ userInfo.phone || "" }}
            </p>
            <p v-else class="mt-10 fs-22">
              <span class="cl-999">新用户专享福利</span
              ><span class="cl-FF6203">+1000能量</span>
            </p>
          </div>
          <div
            class="assets position-absolute text-center border-radius-10 cl-fff fs-20 pl-30 pr-15"
            v-if="isLogin"
          >
            <img src="~assets/images/account/money.png" alt="" />
            <router-link to="/energy-list" class="cl-fff"
              >剩余{{ userEnergy || 0 }}能量</router-link
            >
          </div>
        </div>

        <div class="product-list pd-30 pb-5">
          <div
            class="product-item fs-24 border-radius-10 pt-20 pb-20 pl-30 mb-30"
            :style="
              productActive == index
                ? 'background-color: #2BA7E1; color: #fff;'
                : 'background-color: #eef9ff; color: #333;'
            "
            v-for="(item, index) in productList"
            :key="index"
            @click="opt(index)"
          >
            <span>{{ item.productDetail }}</span>
          </div>
        </div>

        <div class="buy-content pl-30 pr-30">
          <p class="fs-28 cl-333">充值金额 :</p>
          <div
            class="buy-money cl-333 fs-34 text-center pt-10 pb-10 border-radius-10 mb-30 mt-10"
          >
            ￥{{
              productList.length
                ? productList[productActive].finalFee / 100
                : 0
            }}元
          </div>
          <van-button
            size="large"
            class="border-radius-10 bc-green cl-fff"
            @click="pay"
            >微信充值</van-button
          >
        </div>

        <div class="buy-tips pd-30">
          <a
            href="https://support.qq.com/embed/60627/faqs/49987"
            class="fs-24 cl-main text-center block"
          >
            还有哪些途径可以获取能量？
          </a>
          <img
            v-show="isActivity"
            class="row-img mg-auto mt-20"
            :src="this.baseUrl + '/images/common/717/row-img.png'"
            alt=""
            @click="jumpTo('/activity-717')"
          />
          <p class="fs-26 cl-999 mt-30 text-center">遇到问题, 获取帮助</p>
          <img class="wechat-img" :src="wechatInfo.wechatImg" alt="" />
          <div class="text-center mt-20 pb-30">
            <van-button
              plain
              size="mini"
              type="primary"
              class="pl-40 pr-40 mg-auto border-radius-10"
              id="copy"
              :data-clipboard-text="wechatInfo.wechatCode"
              >复制微信号,去添加</van-button
            >
          </div>
        </div>
      </div>
    </div>
    <!--支付成功弹窗-->
    <van-dialog
      v-model="paySuccessDialog"
      :closeOnClickOverlay="true"
      :showConfirmButton="false"
      @close="paySuccessDialog = false"
    >
      <div class="paySuccess bc-fff pd-30 border-radius-10">
        <div class="success">
          <van-icon name="success" />
        </div>
        <p class="text-center fs-32 cl-333 mt-20 font-bold pb-50 border-bottom">
          订单支付成功!
        </p>
        <div class="success-content position-relative">
          <p class="fs-32 flex-row-space-between mt-20">
            <span class="cl-666">微信支付 :</span>
            <span style="color:#FF6000;"
              >￥
              {{
                productList.length
                  ? productList[productActive].finalFee / 100
                  : 0
              }}</span
            >
          </p>
          <img class="pay-img" src="~assets/images/common/pay.png" alt="" />
          <p class="getNum position-absolute fs-32 text-center">
            获得
            <span style="color:#FF6000;">{{ buyAmount || 0 }}能量</span>
          </p>
        </div>

        <van-button
          size="large"
          type="primary"
          class="mg-auto mt-20 border-radius-10"
          to="/order-list"
          >查看订单</van-button
        >

        <router-link
          class="cl-main see-energy-btn fs-28 mt-20"
          to="/energy-list"
        >
          <img
            class="see-energy-img mr-10"
            src="~assets/images/common/see-energy.png"
            alt=""
            @click="paySuccessDialog = false"
          />
          查看能量库
        </router-link>

        <img
          class="close-img position-absolute"
          src="~assets/images/common/close.png"
          alt=""
          @click="paySuccessDialog = false"
        />
      </div>
    </van-dialog>
    <!--登录弹框-->
    <login-dialog
      :showLogin="showLogin"
      :isWechatLogin="isWechatLogin"
      @on-close="showLogin = false"
    ></login-dialog>
  </div>
</template>

<script>
import { getStorage } from "@/config/utils";
import api from "@/api";
import { Button, Icon } from "vant";
import Clipboard from "clipboard";
import LoginDialog from "@/components/LoginDialog";
import {
  isWechat,
  wexinPay,
  wechatAuthorization,
  setStorage,
  getWechatImg
} from "@/config/utils";

export default {
  name: "BuyEnergy",
  components: {
    vanButton: Button,
    vanIcon: Icon,
    LoginDialog
  },
  data() {
    return {
      productActive: 0,
      productList: [],
      paySuccessDialog: false,
      buyAmount: 0,
      showLogin: false,
      isWechatLogin: false
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {
    this.isWechatLogin = !!(this.$store.state.authed && getStorage("token"));
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
  computed: {
    // 是否显示顶部navbar
    isShowNavBar() {
      return this.$route.meta.isShowNavBar && !isWechat();
    },
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    },
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo;
    },
    userEnergy() {
      return this.$store.state.energy.balance;
    },
    // 微信客服消息
    wechatInfo() {
      return getWechatImg("service");
    },
    // 是否为活动期间
    isActivity() {
      return this.$store.state.isActivity;
    }
  },
  mounted() {
    this.getProductList();
    this.productActive = this.$route.query.opt || 0;
  },
  methods: {
    // 获取产品列表
    getProductList() {
      const _this = this;
      api.getProductList().then(res => {
        if (res.success) {
          _this.productList = res.result;
        }
      });
    },
    // 选择产品
    opt(index) {
      this.productActive = index;
    },
    // 支付
    pay() {
      const _this = this;
      if (!_this.isLogin) {
        _this.showLogin = true;
        return;
      }
      if (!isWechat()) {
        this.$Toast("请在微信环境下支付!");
        return;
      }
      if (
        !_this.productList.length ||
        !_this.productList[_this.productActive].id
      ) {
        return;
      }
      api
        .createOrder({
          productId: _this.productList[_this.productActive].id
        })
        .then(res => {
          if (res.success && res.result.oid) {
            _this.buyAmount = res.result.amount;
            _this.openWechatPay(res.result.oid);
            api.accesslog({
              moduleCode: "order_create"
            });
          } else {
            // 有未支付订单
            if (res.code === "failed") {
              _this.$dialog
                .confirm({
                  title: "提示",
                  confirmButtonText: "去支付",
                  message: res.message
                })
                .then(() => {
                  _this.$router.push({
                    path: "/order-list"
                  });
                });
            }
          }
        });
    },
    // 拉起微信支付
    openWechatPay(id) {
      const _this = this;
      api
        .getWxPayParams({
          orderId: id
        })
        .then(res => {
          if (res.success) {
            wexinPay(res.result, _this.paySuccessCb, _this.payFailCb);
          } else {
            _this.$Toast(res.message);
            if (res.code == "not_wechat_auth") {
              setStorage("loginBackUrl", _this.$route.path || "/");
              setStorage("loginBackQuery", _this.$route.query || {});
              wechatAuthorization(window.location.origin + "/wechatLogin");
            }
          }
        });
    },
    paySuccessCb() {
      this.paySuccessDialog = true;
      this.$store.dispatch("UPDATE_USER_ENERGY");
    },
    payFailCb() {
      this.$Toast("失败");
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
.account-wrap {
  background-color: #f5f6f8;
  min-height: 100%;
  padding-bottom: 20px;
  .row-img {
    width: 582px;
  }
  .paySuccess {
    position: relative;
    min-height: 400px;
    .success {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #09bb07;
      margin: 40px auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 80px;
      color: #fff;
    }
    .pay-img {
      width: 417px;
      height: 298px;
      margin: 30px auto 0;
      display: block;
    }
    .getNum {
      width: 100%;
      top: 75px;
    }
    .see-energy-btn {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .see-energy-img {
        width: 39px;
        height: 39px;
      }
    }
    .close-img {
      width: 60px;
      height: 60px;
      bottom: -100px;
      left: 50%;
      margin-left: -30px;
    }
  }
  .bg {
    width: 100%;
    position: absolute;
  }
  .account-content {
    width: 100%;
    position: relative;
    padding: 0 30px;
    .top-card {
      width: 100%;
      position: relative;
      overflow: hidden;
      .user-info {
        width: 100%;
        display: inline-block;
        .avatar {
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
        .assets {
          /*width: 160px;*/
          height: 33px;
          line-height: 33px;
          background-color: #ff6000;
          right: 10px;
          top: 102px;
          img {
            height: 33px;
            position: absolute;
            left: -10px;
            top: 0;
          }
        }
      }
      .product-list {
        .product-item {
          border: 1px solid #dcf1fa; /*no*/
        }
      }
      .buy-money {
        border: 1px solid #eeeeee; /*no*/
      }
      .buy-tips {
        .wechat-img {
          width: 255px;
          height: 255px;
          margin: 10px auto;
          display: block;
        }
      }
    }
  }
  .cl-2BA7E1 {
    color: #2ba7e1;
  }
  .cl-FF6203 {
    color: #ff6203;
  }
}
</style>
