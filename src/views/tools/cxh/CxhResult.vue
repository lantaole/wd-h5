<template>
  <div class="cxh-result-wrap position-relative">
    <div class="cxh-result-content position-relative pd-30">
      <!--顶部搜索-->
      <div class="cxh-top bc-fff border-radius-10 pd-25">
        <van-search placeholder="例如: 快乐网吧888" v-model="searchVal">
          <img
            slot="left-icon"
            class="search-icon-slot"
            src="~assets/images/tools/cpm/search.png"
            alt=""
          />
        </van-search>
        <van-button
          size="large"
          type="primary"
          class="border-radius-10 mt-30"
          @click="search"
          :loading="loading"
          >立即查询</van-button
        >
      </div>

      <!--账号标记情况-->
      <div class="account-mark-info bc-fff border-radius-10 pd-25 pb-15 mt-30">
        <table class="mark-table text-center font-bold" border="1">
          <tr>
            <td colspan="6" class="fs-28">
              该账号被标记情况
            </td>
          </tr>
          <tr class="mark-type fs-26 cl-666">
            <td>违规</td>
            <td>降权</td>
            <td>差评</td>
            <td>退单</td>
            <td>作假</td>
            <td>其他</td>
          </tr>
          <tr class="fs-26 cl-main">
            <td :class="riskInfo.acc.illegalNum ? 'cl-red' : ''">
              {{ riskInfo.acc.illegalNum || 0 }}
            </td>
            <td :class="riskInfo.acc.deweightNum ? 'cl-red' : ''">
              {{ riskInfo.acc.deweightNum || 0 }}
            </td>
            <td :class="riskInfo.acc.badrateNum ? 'cl-red' : ''">
              {{ riskInfo.acc.badrateNum || 0 }}
            </td>
            <td :class="riskInfo.acc.refundNum ? 'cl-red' : ''">
              {{ riskInfo.acc.refundNum || 0 }}
            </td>
            <td :class="riskInfo.acc.fakeNum ? 'cl-red' : ''">
              {{ riskInfo.acc.fakeNum || 0 }}
            </td>
            <td :class="riskInfo.acc.otherNum ? 'cl-red' : ''">
              {{ riskInfo.acc.otherNum || 0 }}
            </td>
          </tr>
        </table>

        <p class="text-right fs-22 cl-999 mt-15">若账号被误标记请联系管理员!</p>
      </div>

      <div class="cxh-account-info bc-fff border-radius-10 pd-25 pt-10 mt-30">
        <p class="text-right fs-22 cl-main mb-15 text-line" @click="toMark">
          账号可疑,去标记
        </p>
        <table class="info-table text-center fs-24" border="1">
          <tr class="font-bold">
            <td class="one-td-style">
              <img
                class="aliww-img"
                src="~assets/images/tools/cxh/aliww.png"
                alt=""
              />
            </td>
            <td class="two-td-style">账号等级</td>
            <td>
              <div
                v-if="accountInfo.averageNum >= 0 && accountInfo.averageNum < 5"
                class="acc-grade"
              >
                <img src="~assets/images/tools/cxh/safe.png" alt="" />
                <span class="ml-10" style="color:green;">安全</span>
              </div>
              <div
                v-else-if="
                  accountInfo.averageNum >= 5 && accountInfo.averageNum < 20
                "
                class="acc-grade"
              >
                <img src="~assets/images/tools/cxh/yb.png" alt="" />
                <span class="ml-10" style="color:#c89f6a;">一般</span>
              </div>
              <div v-else-if="accountInfo.averageNum >= 20" class="acc-grade">
                <img src="~assets/images/tools/cxh/warn.png" alt="" />
                <span class="ml-10" style="color:red;">危险</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="font-bold">
              淘宝{{ accountInfo.isSeller == 1 ? "买" : "卖" }}家
            </td>
            <td>
              <div class="img-div">
                <img
                  v-if="accountInfo.tamllInfo"
                  :src="accountInfo.tamllInfo"
                  alt=""
                />
              </div>
            </td>
            <td class="cl-main text-left">{{ accountInfo.userName }}</td>
          </tr>
          <tr>
            <td class="font-bold">实名认证</td>
            <td>
              <div class="img-div">
                <img
                  v-if="accountInfo.userIdentImg"
                  :src="accountInfo.userIdentImg"
                  alt=""
                />
              </div>
            </td>
            <td class="text-left" v-html="accountInfo.userIdent"></td>
          </tr>
          <tr>
            <td class="font-bold">注册时间</td>
            <td></td>
            <td class="text-left">{{ accountInfo.userTime }}</td>
          </tr>
          <tr>
            <td class="font-bold">淘龄(天)</td>
            <td></td>
            <td class="text-left">{{ accountInfo.taobaoTime || "" }}</td>
          </tr>
          <tr>
            <td class="font-bold">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</td>
            <td></td>
            <td class="text-left">{{ accountInfo.userSex }}</td>
          </tr>
          <tr>
            <td class="font-bold">每周平均</td>
            <td></td>
            <td class="text-left">{{ accountInfo.averageNum || 0 }}</td>
          </tr>
          <!--<tr>-->
            <!--<td class="font-bold">最近一周</td>-->
            <!--<td></td>-->
            <!--<td class="text-left">-->
              <!--{{-->
                <!--accountInfo.weekRateBad +-->
                  <!--accountInfo.weekRateGood +-->
                  <!--accountInfo.weekRateNormal || 0-->
              <!--}}-->
            <!--</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td class="font-bold">最近一月</td>-->
            <!--<td></td>-->
            <!--<td class="text-left">-->
              <!--{{-->
                <!--accountInfo.monthRateBad +-->
                  <!--accountInfo.monthRateGood +-->
                  <!--accountInfo.monthRateNormal || 0-->
              <!--}}-->
            <!--</td>-->
          <!--</tr>-->
          <tr>
            <td class="font-bold">
              {{ accountInfo.isSeller == 1 ? "买" : "卖" }}家信誉
            </td>
            <td></td>
            <td>
              <!--<div class="img-div" v-if="accountInfo.userBuyerImg">-->
                <!--<img-->
                  <!--v-if="accountInfo.userBuyerImg"-->
                  <!--:src="accountInfo.userBuyerImg"-->
                  <!--alt=""-->
                <!--/>-->
              <!--</div>-->
              <div class=" text-left" v-if="accountInfo.userBuyerCount">{{accountInfo.userBuyerCount}}</div>
            </td>
            <!--<td class="text-left" v-if="accountInfo.userBuyerImg">-->
              <!--<div >-->
                <!--{{ accountInfo.userBuyerCount.replace("点", "") }}-->
              <!--</div>-->
            <!--</td>-->
          </tr>
          <!--<tr>-->
            <!--<td class="font-bold">所在地区</td>-->
            <!--<td></td>-->
            <!--<td class="text-left">{{ accountInfo.userArea }}</td>-->
          <!--</tr>-->
          <tr>
            <td class="font-bold">中 差 评</td>
            <td class="text-left" colspan="2">
              <div class="evaluate cl-red">
                <div class="img-div">
                  <img
                    class="mr-5"
                    src="~assets/images/tools/cxh/good.png"
                    alt=""
                  />
                </div>
                中评({{ accountInfo.totalNormalCount }})
                <div class="img-div mr-5 ml-20">
                  <img src="~assets/images/tools/cxh/good.png" alt="" />
                </div>
                差评({{ accountInfo.totalBadCount }})
                <span class="cl-666 ml-20">中差评 </span>({{
                  parseInt(
                    (accountInfo.totalNormalCount + accountInfo.totalBadCount) /
                      accountInfo.userBuyerCount
                  ) || 0
                }}%)
              </div>
            </td>
          </tr>
          <tr v-if="accountInfo.isSeller == 2">
            <td class="font-bold">店铺信息</td>
            <td class="text-left" colspan="2">
              <div class="ellipsis shopInfo">
                进入<span class="font-bold"
                  >【{{ accountInfo.shopName }}】</span
                >
                的店铺 (创建时间：
                {{ accountInfo.shopTime }})
              </div>
            </td>
          </tr>
          <tr v-if="accountInfo.isSeller == 2">
            <td class="font-bold">当前主营</td>
            <td></td>
            <td class="text-left">
              {{ accountInfo.shopType }}
            </td>
          </tr>
        </table>
      </div>

      <!--被查询次数-->
      <div
        class="account-mark-info bc-fff border-radius-10 pd-25 pt-10 pb-20 mt-30"
      >
        <p class="text-right fs-22 cl-999 mb-10">被查询时间: {{ nowTime }}</p>
        <table class="mark-table text-center font-bold" border="1">
          <tr>
            <td colspan="4" class="fs-28">
              被查询次数信息
            </td>
          </tr>
          <tr class="mark-type fs-24 cl-666">
            <td>当天</td>
            <td>最近三天</td>
            <td>最近7天</td>
            <td>最近30天</td>
          </tr>
          <tr class="fs-24 cl-main">
            <td>{{ riskInfo.log.curDayNum || 0 }}</td>
            <td>{{ riskInfo.log.lastThreeNum || 0 }}</td>
            <td>{{ riskInfo.log.lastWeekNum || 0 }}</td>
            <td>{{ riskInfo.log.lastMonNum || 0 }}</td>
          </tr>
          <tr>
            <td colspan="4" class="fs-28 cl-666">
              总查询次数: {{ riskInfo.log.totalNum || 0 }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <van-button
      v-if="riskInfo.log != {} && riskInfo.log && accountInfo.userName"
      size="mini"
      type="primary"
      class="border-radius-10"
      @click="closeShareDialog"
      style="position:fixed; bottom: 120px;"
      >分享看看</van-button
    >
    <share-result
      v-if="shareUserName"
      :showShareDialog="showShareDialog"
      :bgImg="shareDialogImg"
      :shareUserName="shareUserName"
      :shareTitle="shareTitle"
      :qrCodeStyle="qrCodeStyle"
      :accountInfo="accountInfo"
      :riskInfo="riskInfo"
      @closeShareDialog="closeShareDialog"
    ></share-result>
  </div>
</template>

<script>
import { convertUTCTimeToLocalTime } from "@/config/utils";
import { Button, Search } from "vant";
import api from "@/api";
import ShareResult from "@/components/ShareCxhResult";
export default {
  name: "ToolsCxhResult",
  components: {
    vanButton: Button,
    vanSearch: Search,
    ShareResult
  },
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    },
    // 分享人昵称
    shareUserName() {
      return this.$store.state.userInfo.wechatInfo
        ? this.$store.state.userInfo.wechatInfo.nickname
        : "亲";
    }
  },
  data() {
    return {
      searchVal: "",
      loading: true,
      accountInfo: {},
      riskInfo: {
        acc: {},
        log: {}
      },
      nowTime: "",
      shareDialogImg:
        this.baseUrl + "/images/toolsIcon/toolsShareBg/cxh-result.png",
      shareTitle: "#邀请你查看“旺旺查小号”",
      qrCodeStyle: {
        width: 135,
        height: 135,
        x: 320,
        y: 658
      },
      showShareDialog: false
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  mounted() {
    this.searchVal = this.$route.query.searchVal;
    this.nowTime = convertUTCTimeToLocalTime(new Date());
    this.search();
  },
  methods: {
    closeShareDialog() {
      let _this = this;
      _this.showShareDialog = !_this.showShareDialog;
    },
    // 搜索
    search() {
      if (!this.searchVal) {
        return;
      }
      this.loading = true;
      this.accountInfo = {};
      this.riskInfo = {
        acc: {},
        log: {}
      };
      this.getWwInfo();
    },
    // 旺旺信誉等基本信息查询
    getWwInfo() {
      const _this = this;
      api
        .getWwInfo({
          nick: _this.searchVal
        })
        .then(res => {
          if (res.success) {
            _this.$store.dispatch("UPDATE_USER_ENERGY");
            let obj = res.result;
            if (obj.userTime) {
              var nowTime = new Date();
              nowTime = nowTime.getTime();
              var userTime = new Date(obj.userTime);
              userTime = userTime.getTime();
              obj.taobaoTime = parseInt(
                (nowTime - userTime) / 1000 / 60 / 60 / 24
              );
            }
            _this.accountInfo = obj || {};
            _this.getWwRiskInfo();
          } else {
            _this.accountInfo = {};
            if (res.code == "energy_not_enough") {
              _this.$dialog
                .confirm({
                  message: "余额不足,请前往充值",
                  confirmButtonText: "去充值"
                })
                .then(() => {
                  _this.$router.push({
                    path: "/buy-energy"
                  });
                })
                .catch(() => {
                  _this.$router.go(-1);
                });
            } else {
              _this.$dialog
                .confirm({
                  message: res.message,
                  showCancelButton: false,
                  confirmButtonText: "我知道了"
                })
                .then(() => {
                  _this.$router.go(-1);
                });
            }
            _this.loading = false;
          }
        })
        .catch(() => {
          _this.$Toast("被标记及被查询次数请求失败,请重试!");
          _this.loading = false;
        });
    },
    // 查询风险信息和查询次数
    getWwRiskInfo() {
      const _this = this;
      api
        .getWwRiskInfo({
          nick: _this.searchVal
        })
        .then(res => {
          if (res.success) {
            let obj = {};
            obj.acc = res.result.acc || {};
            obj.log = res.result.log || {};
            _this.riskInfo = obj;
            _this.loading = false;
          } else {
            _this.riskInfo = {
              acc: {},
              log: {}
            };
            _this.$dialog.alert({
              title: "提示",
              confirmButtonText: "我知道了",
              message: res.message
            });
            _this.loading = false;
          }
        })
        .catch(() => {
          _this.$Toast("查询失败,请重试!");
          _this.loading = false;
        });
    },
    toMark() {
      if (
        this.riskInfo.log != {} &&
        this.riskInfo.log &&
        this.accountInfo.userName
      ) {
        this.$router.push({
          path: "/tools-mark-account?markname=" + this.accountInfo.userName
        });
      } else {
        this.$Toast("该账号查询失败, 不可标记");
      }
    }
  }
};
</script>

<style lang="scss">
.cxh-result-wrap {
  min-height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  .cxh-result-content {
    padding-bottom: 60px; /*no*/
    .cxh-top {
      .van-search {
        padding: 0;
        border-radius: 10px;
        border: 2px solid #9fe1ff;
        .van-search__content {
          background-color: transparent;
          .van-cell {
            .van-field__left-icon {
              display: flex;
              align-items: center;
              .search-icon-slot {
                width: 18px; /*no*/
                height: 18px; /*no*/
              }
            }
          }
        }
      }
    }
    .account-mark-info {
      .mark-table {
        width: 100%;
        background-color: #d7effb;
        border-collapse: collapse;
        tr {
          td {
            border: 1px solid #9fe1ff; /*no*/
            padding: 10px 0;
          }
        }
        .mark-type {
          background-color: #f9f9e9;
        }
      }
    }
    .cxh-account-info {
      .info-table {
        width: 100%;
        border-collapse: collapse;
        tr {
          border: 1px solid #edf9ff; /*no*/
          td {
            padding: 15px 10px;
            line-height: 30px;
            img {
              height: 30px;
            }
            .img-div {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .acc-grade {
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                height: 30px;
              }
              span {
                display: inline-block;
                height: 30px;
                font-size: 28px;
                line-height: 32px;
              }
            }
            .shopInfo {
              width: 450px;
            }
            .evaluate {
              display: flex;
            }
          }
          .one-td-style {
            width: 200px;
          }
          .two-td-style {
            width: 200px;
          }
        }
        tr:nth-of-type(2n + 1) {
          background-color: #edf9ff;
        }
      }
    }
  }
}
</style>
