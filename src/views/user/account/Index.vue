<template>
  <div class="account-wrap">
    <img
      class="bg"
      :style="isShowNavBar ? 'top: 46px' : ''"
      src="~assets/images/account/bg.png"
      alt=""
    />
    <div class="account-content">
      <img
        v-show="isActivity"
        class="row-top position-absolute"
        :src="this.baseUrl + '/images/common/717/row-top.png'"
        alt=""
        @click="jumpTo('/activity-717')"
      />
      <div class="top-card mt-100 bc-fff border-radius-10">
        <div class="user-info pd-30 position-relative">
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
            <p class="font-bold mb-15 fs-26">
              {{ userInfo.wechatInfo ? userInfo.wechatInfo.nickname : "亲" }}
            </p>
            <p class="cl-666">手机号: {{ userInfo.phone || "" }}</p>
          </div>
          <div
            class="assets position-absolute text-center border-radius-10 cl-fff fs-20 pl-30 pr-15"
          >
            <img src="~assets/images/account/money.png" alt="" />
            <router-link to="/energy-list" class="cl-fff"
              >剩余{{ userEnergy || 0 }}能量</router-link
            >
          </div>
          <van-button
            size="mini"
            type="primary"
            class="setting-password position-absolute pl-5 pr-5"
            @click="logout"
            >退出登录</van-button
          >
        </div>
        <div class="vip-share mt-20 bc-green" v-if="userEnergy == 1000">
          <van-notice-bar
            class="top-news"
            color="#ffffff"
            background="transparent"
          >
            注册会员成功!赠送您1000能量,可用于工具中使用
            <span style="width: 100px;display: inline-block;"></span>
            注册会员成功!赠送您1000能量,可用于工具中使用
          </van-notice-bar>
          <van-button plain round size="mini" class="cl-green" to="/energy-list"
            >查看</van-button
          >
        </div>
        <div class="vip-share mt-20 bc-main" v-else-if="userEnergy >= 200">
          <template v-if="parityBool">
            <van-notice-bar
              class="top-news"
              color="#ffffff"
              background="transparent"
            >
              能量可用于工具使用，去试试邀请好友可获得更多
              <span style="width: 100px;display: inline-block;"></span>
              能量可用于工具使用，去试试邀请好友可获得更多
            </van-notice-bar>
            <van-button plain round size="mini" class="cl-main" to="/share"
              >分享</van-button
            >
          </template>
          <template v-else>
            <van-notice-bar
              class="top-news"
              color="#ffffff"
              background="transparent"
            >
              能量可用于工具使用，来！每天都给自己加把油吧！
              <span style="width: 100px;display: inline-block;"></span>
              能量可用于工具使用，来！每天都给自己加把油吧！
            </van-notice-bar>
            <van-button plain round size="mini" class="cl-main" to="/buy-energy"
              >充值</van-button
            >
          </template>
        </div>
        <div class="vip-share mt-20 bc-red" v-else>
          <van-notice-bar
            class="top-news"
            color="#ffffff"
            background="transparent"
          >
            能量不足！再忙也别忘了给自己加把油哦！及时充值
            <span style="width: 100px;display: inline-block;"></span>
            能量不足！再忙也别忘了给自己加把油哦！及时充值
          </van-notice-bar>
          <van-button plain round size="mini" class="cl-red" to="/buy-energy"
            >充值</van-button
          >
        </div>
      </div>

      <div class="account-collapse mt-30 bc-fff border-radius-10">
        <van-collapse v-model="activeNames">
          <van-collapse-item name="1">
            <div slot="title">
              <img
                class="collapse-title-icon"
                src="~assets/images/account/order.png"
              />
              <span class="collapse-title-text ml-20">我的订单</span>
            </div>
            <div slot="right-icon" class="coll-right">
              <router-link to="/order-list" class="cl-main text-line mr-10">
                查看全部订单
              </router-link>
              <van-icon class="cl-666" name="arrow" />
            </div>
            <div class="collapse-content">
              <table class="order-table" v-if="orderList.length">
                <tr v-for="(item, index) in orderList" :key="index">
                  <td class="pr-10">
                    {{ item.createTime | dateFormat("YYYY-MM-DD hh:mm") }}
                  </td>
                  <!--<td>{{ item.amount }}能量</td>-->
                  <td>{{ item.productName }}</td>
                  <td>￥{{ item.finalFee }}元</td>
                  <td>
                    <van-button
                      v-if="item.orderStatus == 1"
                      size="mini"
                      type="primary"
                      class="border-radius-10"
                      @click="cancelOrder(item.oid, index)"
                      >取消</van-button
                    >
                    <van-button
                      v-else-if="item.orderStatus == 2"
                      disabled
                      size="mini"
                      class="border-radius-10"
                      >完成</van-button
                    >
                    <van-button
                      v-else-if="item.orderStatus == 3"
                      plain
                      disabled
                      size="mini"
                      type="primary"
                      class="border-radius-10"
                      >关闭</van-button
                    >
                  </td>
                  <td>
                    <van-button
                      v-if="item.orderStatus == 1"
                      size="mini"
                      class="cl-fff border-radius-10"
                      style="background-color: #FF6000"
                      @click="openWechatPay(item.oid, index)"
                      >去付款</van-button
                    >
                    <van-button
                      v-else
                      size="mini"
                      class="cl-fff border-radius-10"
                      style="background-color: #FF6000"
                      to="/buy-energy"
                      >去充值</van-button
                    >
                  </td>
                </tr>
                <tr>
                  <td class="text-center text-line" colspan="5">
                    <router-link to="/order-list" class="cl-main">
                      查看更多
                    </router-link>
                  </td>
                </tr>
              </table>

              <div v-else class="pt-30">
                <img
                  class="mg-auto no-more"
                  src="~assets/images/account/no-more.png"
                  alt=""
                />
                <p class="text-center cl-333 fs-30 mt-20">当前没有订单~</p>
                <p class="text-center text-line cl-main fs-26 mt-20">
                  <router-link to="/buy-energy">
                    前往充值
                  </router-link>
                </p>
              </div>
            </div>
          </van-collapse-item>
          <van-collapse-item name="2">
            <div slot="title">
              <img
                class="collapse-title-icon"
                src="~assets/images/account/tools.png"
              />
              <span class="collapse-title-text ml-20">我的工具</span>
            </div>
            <div class="collapse-content">
              <div class="tools-tab-content flex-row-space-around">
                <div
                  class="tools-tab-item"
                  v-for="(item, index) in toolList"
                  :key="index"
                  @click="toolsFun(item.toolsUrl)"
                >
                  <img :src="item.icon" alt="" />
                  <p class="text-center">{{ item.title }}</p>
                </div>
              </div>
            </div>
          </van-collapse-item>

          <van-cell to="/my-fans">
            <template slot="title">
              <img
                class="cell-title-icon"
                src="~assets/images/account/fans.png"
              />
              <span class="ml-20">我的粉丝</span>
            </template>
          </van-cell>
          <van-collapse-item name="3">
            <div slot="title">
              <img
                class="collapse-title-icon"
                src="~assets/images/account/js.png"
              />
              <span class="collapse-title-text ml-20">{{
                isVip ? "我的导师" : "服务经理"
              }}</span>
            </div>
            <div class="collapse-content text-center">
              <p class="text-center">
                {{
                  isVip
                    ? "从事电商运营服务五年以上,非常有经验的老司机,对电商有其独特的见解..."
                    : "添加服务经理微信,请他安排导师"
                }}
              </p>
              <img class="wechat-img" :src="wechatInfo.wechatImg" alt="" />
              <div class="wechat-code text-center">
                <div class="code cl-333">
                  微信号: {{ wechatInfo.wechatCode }}
                </div>
                <van-button
                  plain
                  size="mini"
                  type="primary"
                  class="ml-10 border-radius-10"
                  id="copy"
                  :data-clipboard-text="wechatInfo.wechatCode"
                  >复制</van-button
                >
              </div>
              <p class="cl-main fs-26 text-center mt-20 mb-20">
                长按识别二维码
              </p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <img
        v-show="isActivity"
        class="get-bot mg-auto mt-30"
        :src="this.baseUrl + '/images/common/717/get-bot.png'"
        alt=""
        @click="jumpTo('/activity-717')"
      />
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { Button, Collapse, CollapseItem, Icon, Cell, NoticeBar } from "vant";
import Clipboard from "clipboard";
import {
  isWechat,
  wexinPay,
  dateFormatUtil,
  getWechatImg
} from "@/config/utils";

export default {
  name: "Account",
  components: {
    vanButton: Button,
    vanCollapse: Collapse,
    vanCollapseItem: CollapseItem,
    vanNoticeBar: NoticeBar,
    vanIcon: Icon,
    vanCell: Cell
  },
  data() {
    return {
      orderList: [],
      activeNames: ["2"],
      isVip: false,
      toolList: [
        {
          title: "实时查排名",
          icon: `${this.baseUrl}/images/toolsIcon/cpm.png`,
          toolsUrl: "/tools-cpm"
        },
        {
          title: "旺旺查小号",
          icon: `${this.baseUrl}/images/toolsIcon/cxh.png`,
          toolsUrl: "/tools-cxh"
        },
        {
          title: "精准淘词",
          icon: `${this.baseUrl}/images/toolsIcon/jztc.png`,
          toolsUrl: "/tools-jztc"
        },
        {
          title: "微分享助手",
          icon: `${this.baseUrl}/images/toolsIcon/wfx.png`,
          toolsUrl: "/wxToTb"
        },
        {
          title: "查类目",
          icon: `${this.baseUrl}/images/toolsIcon/clm.png`,
          toolsUrl: "/tools-category"
        }
      ]
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {
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
    // 当前日期是否为偶数
    parityBool() {
      return dateFormatUtil(new Date(), "D") % 2 == 0;
    },
    userEnergy() {
      return this.$store.state.energy.balance;
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
  mounted() {
    this.getOrderPage();
  },
  methods: {
    // 前三条订单
    getOrderPage() {
      const _this = this;
      api
        .getOrderPage({
          pageIndex: 1,
          pageSize: 3
        })
        .then(res => {
          if (res.success) {
            _this.orderList = res.result.list || [];
          }
        });
    },
    // 退出登录
    logout() {
      api.logOut().then(res => {
        if (res.success) {
          this.$store.commit("OUT_LOGIN");
          this.$Toast("退出成功");
          this.$router.replace({ path: "/" });
        } else {
          this.$Toast("退出失败");
        }
      });
    },
    // 工具点击
    toolsFun(toolsUrl) {
      const _this = this;
      if (toolsUrl) {
        _this.$router.push({ path: toolsUrl });
      }
    },
    jumpTo(url) {
      this.$router.push({
        path: url
      });
    },
    // 拉起微信支付
    openWechatPay(id, index) {
      const _this = this;
      if (!isWechat()) {
        _this.$Toast("请在微信环境下支付!");
        return;
      }
      api.accesslog({
        moduleCode: "order_create"
      });
      _this.operationOrderIndex = index;
      api
        .getWxPayParams({
          orderId: id
        })
        .then(res => {
          if (res.success) {
            wexinPay(res.result, _this.paySuccessCb, _this.payFailCb);
          } else {
            _this.$Toast(res.message);
            _this.operationOrderIndex = null;
          }
        });
    },
    paySuccessCb() {
      this.$Toast("成功");
      this.orderList[this.operationOrderIndex].orderStatus = 2;
      this.operationOrderIndex = null;
      this.$store.dispatch("UPDATE_USER_ENERGY");
    },
    payFailCb() {
      this.$Toast("失败");
      this.operationOrderIndex = null;
    },
    cancelOrder(id, index) {
      const _this = this;
      api
        .orderCancel({
          oid: id
        })
        .then(res => {
          if (res.success) {
            _this.$Toast("订单已取消");
            this.orderList[index].orderStatus = 3;
          } else {
            _this.$Toast(res.message);
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.account-wrap {
  background-color: #f5f6f8;
  padding-bottom: 20px;
  .top-news {
    width: 100%;
  }
  .bg {
    width: 100%;
    position: absolute;
  }
  .row-top {
    width: 640px;
    top: -63px;
    left: 55px;
    z-index: 11;
  }
  .get-bot {
    width: 690px;
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
        .setting-password {
          right: 10px;
          top: 97px;
        }
        .assets {
          height: 33px;
          line-height: 33px;
          background-color: #ff6000;
          right: 10px;
          top: 50px;
          img {
            height: 33px;
            position: absolute;
            left: -10px;
            top: 0;
          }
        }
      }
      .vip-share {
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .vip-tip {
          height: 22px; /*no*/
          line-height: 25px; /*no*/
          img {
            height: 22px; /*no*/
            float: left;
          }
        }
      }
    }
    .van-cell__title {
      display: flex;
      align-items: center;
      .cell-title-icon {
        width: 29px; /*no*/
        height: 29px; /*no*/
        border-radius: 50%;
      }
    }
    .account-collapse {
      width: 100%;
      overflow: hidden;
      .van-cell {
        border-top: 1px solid #eeeeee; /*no*/
      }
      .coll-right {
        display: flex;
        align-items: center;
        i {
          font-size: 16px; /*no*/
        }
      }
      .collapse-title-icon {
        width: 29px; /*no*/
        height: 29px; /*no*/
        border-radius: 50%;
        float: left;
      }
      .collapse-title-text {
        line-height: 29px; /*no*/
        float: left;
      }
      .collapse-content {
        .order-table {
          width: 100%;
          tr {
            td {
              height: 70px;
              font-size: 22px;
            }
          }
        }
        .no-more {
          width: 220px;
          height: 199px;
        }
        .tools-tab-content {
          .tools-tab-item {
            img {
              width: 100px;
              height: 100px;
              display: block;
              margin: 0 auto;
            }
            p {
              margin-top: 10px;
              font-size: 20px;
            }
          }
        }
        .wechat-img {
          width: 255px;
          height: 255px;
          margin: 10px auto;
          display: block;
        }
        .wechat-code {
          display: flex;
          justify-content: center;
          .code {
            line-height: 22px; /*no*/
          }
        }
      }
    }
  }
}
</style>
