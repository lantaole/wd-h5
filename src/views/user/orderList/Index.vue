<template>
  <div
    class="order-list-wrap position-relative"
    :style="{ minHeight: screenHeight - 96 + 'px' }"
  >
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="order-content position-relative">
        <img
          class="bg position-absolute"
          src="~assets/images/tools/cpm/bg.png"
          alt=""
        />

        <div class="orders mt-60 ml-30 mr-30 bc-fff border-radius-10">
          <div class="order-top flex-row-space-between">
            <div class="top-left flex-row-space-between ml-30">
              <img src="~assets/images/account/order.png" alt="" />
              <span class="fs-26 ml-20 cl-main">我的订单</span>
            </div>
            <div class="top-right mr-30">
              <div
                class="assets position-relative text-center border-radius-10 cl-fff fs-20 pl-30 pr-15"
              >
                <img src="~assets/images/account/money.png" alt="" />
                <router-link to="/energy-list" class="cl-fff"
                  >剩余{{ userEnergy || 0 }}能量</router-link
                >
              </div>
              <router-link to="/buy-energy" class="mr-10 ml-10 add">
                加油
              </router-link>
            </div>
          </div>

          <div class="order-tab">
            <van-tabs v-model="active" @change="changeOrderStatus">
              <van-tab title="待支付"></van-tab>
              <van-tab title="已完成"></van-tab>
              <van-tab title="已关闭"></van-tab>
            </van-tabs>
          </div>

          <div class="pd-10 order-list">
            <van-list
              v-if="orderList.length"
              @load="loadMore"
              finished-text="我也是有底线的哦~"
              :offset="20"
              :finished="finished"
              v-model="loadingMore"
              class="result-list-content"
              :immediate-check="false"
            >
              <table class="order-table">
                <tr v-for="(item, index) in orderList" :key="index">
                  <td>
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
              </table>
            </van-list>

            <p
              v-else-if="loadingMore"
              class="text-center cl-main fs-26 pt-50 pb-50"
            >
              加载中~
            </p>

            <div v-else class="pt-30">
              <img
                class="mg-auto no-more"
                src="~assets/images/account/no-more.png"
                alt=""
              />
              <p class="text-center cl-333 fs-30 mt-20">当前没有订单~</p>
              <p class="text-center text-line cl-main fs-26 mt-20 pb-50">
                <router-link to="/buy-energy">
                  前往充值
                </router-link>
              </p>
            </div>
          </div>
        </div>

        <img
          class="point-img"
          src="~assets/images/tools/cpm/point-img.png"
          alt=""
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  wexinPay,
  isWechat,
  wechatAuthorization,
  setStorage
} from "@/config/utils";
import { Tab, Tabs, Button, PullRefresh, List } from "vant";
import api from "@/api";
export default {
  name: "ToolsCxh",
  components: {
    vanButton: Button,
    VanPullRefresh: PullRefresh,
    VanList: List,
    vanTab: Tab,
    vanTabs: Tabs
  },
  data() {
    return {
      refreshing: false,
      loadingMore: true,
      finished: false,
      orderList: [],
      active: 0,
      //1待支付，2已支付，3已关闭
      orderStatus: 1,
      pageIndex: 1,
      pageSize: 30,
      operationOrderIndex: null,
      screenHeight: document.body.clientHeight
    };
  },
  mounted() {
    this.getOrderPage();
  },
  computed: {
    userEnergy() {
      return this.$store.state.energy.balance;
    }
  },
  methods: {
    //下拉刷新
    onRefresh() {
      let _this = this;
      _this.pageIndex = 1;
      _this.finished = false;
      _this.orderList = [];
      _this.getOrderPage();
    },
    //上拉加载
    loadMore() {
      let _this = this;
      setTimeout(() => {
        _this.pageIndex = _this.pageIndex + 1;
        _this.getOrderPage();
      }, 200);
    },
    // 获取订单列表
    getOrderPage() {
      const _this = this;
      _this.loadingMore = true;
      api
        .getOrderPage({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          //1待支付，2已支付，3已关闭
          orderStatus: this.orderStatus
        })
        .then(res => {
          if (res.success) {
            let arr = res.result.list || [];
            if (arr.length < _this.pageSize) {
              _this.finished = true;
            }
            _this.orderList = _this.orderList.concat(arr);
            _this.refreshing = false;
            _this.loadingMore = false;
          }
        });
    },
    // 切换支付状态
    changeOrderStatus() {
      this.orderStatus = this.active + 1;
      this.pageIndex = 1;
      this.finished = false;
      this.orderList = [];
      this.getOrderPage();
    },
    // 拉起微信支付
    openWechatPay(id, index) {
      const _this = this;
      if (!isWechat()) {
        this.$Toast("请在微信环境下支付!");
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
            if (res.code == "not_wechat_auth") {
              setStorage("loginBackUrl", _this.$route.path || "/");
              setStorage("loginBackQuery", _this.$route.query || {});
              wechatAuthorization(window.location.origin + "/wechatLogin");
            }
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

<style lang="scss">
.order-list-wrap {
  height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  .van-tabs__line {
    background-color: #2ba8e2;
  }
  .order-content {
    overflow: hidden;
    .bg {
      width: 100%;
      top: 0;
      z-index: -1;
    }
    .orders {
      overflow: hidden;
      padding-bottom: 150px;
      .order-top {
        height: 96px;
        background-color: #d4edf9;
        align-items: center;
        .top-left {
          align-items: center;
          img {
            width: 52px;
            height: 52px;
          }
        }
        .top-right {
          height: 33px;
          display: flex;
          align-items: center;
          border-radius: 17px;
          border: 1px solid #ff6000; /*no*/
          .add {
            color: #ff6000;
          }
          .assets {
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
      }
      .order-list {
        .order-table {
          width: 100%;
          tr {
            td {
              height: 70px;
              text-align: center;
            }
          }
        }
        .no-more {
          width: 220px;
          height: 199px;
        }
      }
    }
    .point-img {
      width: 100%;
      position: fixed;
      bottom: 50px; /*no*/
    }
  }
}
</style>
