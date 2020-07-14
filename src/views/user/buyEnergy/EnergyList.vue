<template>
  <div class="energy-list-wrap position-relative">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="energy-content position-relative">
        <img
          class="bg position-absolute"
          src="~assets/images/tools/cpm/bg.png"
          alt=""
        />

        <div class="energy mt-60 ml-30 mr-30 bc-fff border-radius-10">
          <div class="energy-top flex-row-space-between">
            <div class="top-left flex-row-space-between ml-30">
              <img src="~assets/images/account/order.png" alt="" />
              <span class="fs-26 ml-20 cl-main">我的能量动态</span>
            </div>
            <div class="top-right mr-30">
              <div
                class="assets position-relative text-center border-radius-10 cl-fff fs-20 pl-30 pr-15"
              >
                <img src="~assets/images/account/money.png" alt="" />
                <span>剩余{{ userEnergy || 0 }}能量</span>
              </div>
              <router-link to="/buy-energy" class="mr-10 ml-10 add">
                加油
              </router-link>
            </div>
          </div>

          <div class="energy-screen pd-20 fs-22">
            <div class="energy-type-select" @click="showTaskTypePop = true">
              任务类型 : {{ taskTypeList[taskType] }}
              <van-icon name="arrow-down" class="ml-5" />
            </div>
            <div class="energy-date">
              <img src="~assets/images/account/calender.png" alt="" />
              <span class="ml-5">{{ nowMonthStart }} 至 {{ nowMonthEnd }}</span>
            </div>
          </div>

          <div class="energy-tab">
            <van-tabs v-model="active" @change="changeTradeType">
              <van-tab title="全部"></van-tab>
              <van-tab title="收入"></van-tab>
              <van-tab title="支出"></van-tab>
            </van-tabs>
          </div>

          <div class="energy-list">
            <van-list
              v-if="energyList.length"
              @load="loadMore"
              finished-text="可查看近30天内的记录"
              :offset="20"
              :finished="finished"
              v-model="loadingMore"
              class="result-list-content"
              :immediate-check="false"
            >
              <table class="energy-table">
                <tr
                  v-for="(item, index) in energyList"
                  :key="index"
                  :style="item.changeAmount > 0 ? 'color: #FF6000' : ''"
                  :class="
                    item.type == 'nav' ? 'table-nav font-bold cl-000 fs-28' : ''
                  "
                >
                  <template v-if="item.type == 'nav'">
                    <td v-if="item.time == 'today'">
                      今天
                    </td>
                    <td v-else>{{ item.time | dateFormat("YYYY-MM-DD") }}</td>
                    <td></td>
                    <td>动态</td>
                    <td>类型</td>
                  </template>

                  <template v-else>
                    <td>
                      <span v-if="item.changeAmount < 0">支出</span>
                      <span v-else>收入</span>
                    </td>
                    <td>
                      {{ item.createTime | dateFormat("YYYY-MM-DD hh:mm") }}
                    </td>
                    <td>{{ item.changeAmount }}能量</td>
                    <td>{{ item.remark }}</td>
                  </template>
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
              <p class="text-center cl-333 fs-30 mt-20">当前没有能量记录~</p>
              <p class="text-center text-line cl-main fs-26 mt-20 pb-50">
                <router-link to="/buy-energy">
                  前往充值
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <!--任务类型选择弹窗-->
    <van-popup v-model="showTaskTypePop" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="taskTypeList"
        @cancel="showTaskTypePop = false"
        @confirm="taskTypeChange"
      />
    </van-popup>
  </div>
</template>

<script>
import { Tab, Tabs, PullRefresh, List, Popup, Picker, Icon } from "vant";
import api from "@/api";
import {
  timeToDate,
  timeLastMonthToDate,
  dateFormatUtil,
  coppyArray
} from "config/utils";
export default {
  name: "EnergyList",
  components: {
    vanPopup: Popup,
    vanPicker: Picker,
    vanIcon: Icon,
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
      energyList: [],
      // 任务类型 : 1注册奖励,2充值,3查排名,4查小号,5精准淘词,6微分享助手
      taskTypeList: [
        "全部",
        "注册奖励",
        "充值",
        "实时查排名",
        "旺旺查小号",
        "精准淘词",
        "微分享助手"
      ],
      showTaskTypePop: false,
      taskType: 0,
      active: 0,
      //收入类型: 1支出, 2收入
      tradeType: "",
      pageIndex: 1,
      pageSize: 30,
      nowMonthStart: "",
      nowMonthEnd: ""
    };
  },
  computed: {
    userEnergy() {
      return this.$store.state.energy.balance;
    }
  },
  mounted() {
    this.nowMonthStart = timeLastMonthToDate();
    this.nowMonthEnd = timeToDate();
    this.getEnergyRecord();
  },
  methods: {
    //下拉刷新
    onRefresh() {
      let _this = this;
      _this.pageIndex = 1;
      _this.finished = false;
      _this.energyList = [];
      _this.getEnergyRecord();
    },
    //上拉加载
    loadMore() {
      let _this = this;
      setTimeout(() => {
        _this.pageIndex = _this.pageIndex + 1;
        _this.getEnergyRecord();
      }, 200);
    },
    // 获取能量记录
    getEnergyRecord() {
      const _this = this;
      _this.loadingMore = true;
      api
        .getEnergyRecord({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          startTime: _this.nowMonthStart + " 00:00:00",
          endTime: _this.nowMonthEnd + " 23:59:59",
          taskType: this.taskType ? this.taskType : "",
          tradeType: this.tradeType ? this.tradeType : ""
        })
        .then(res => {
          if (res.success) {
            let arr = res.result.list || [];
            if (arr.length < _this.pageSize) {
              _this.finished = true;
            }
            if (arr.length > 1) {
              let newArr = coppyArray(arr);
              let navNum = 0;
              for (var i = 0; i < arr.length - 1; i++) {
                let time1 = arr[i].createTime;
                let time2 = arr[i + 1].createTime;
                if (
                  dateFormatUtil(time1, "YYYY-MM-DD") !=
                  dateFormatUtil(time2, "YYYY-MM-DD")
                ) {
                  newArr.splice(i + navNum + 1, 0, {
                    time: arr[i + 1].createTime,
                    type: "nav"
                  });
                  navNum++;
                }
              }
              newArr.unshift({
                time:
                  dateFormatUtil(arr[0].createTime, "YYYY-MM-DD") ==
                  dateFormatUtil(new Date().valueOf(), "YYYY-MM-DD")
                    ? "today"
                    : arr[0].createTime,
                type: "nav"
              });
              _this.energyList = _this.energyList.concat(newArr);
            } else if (arr.length == 1) {
              arr.unshift({
                time:
                  dateFormatUtil(arr[0].createTime, "YYYY-MM-DD") !=
                  dateFormatUtil(new Date().valueOf(), "YYYY-MM-DD")
                    ? "today"
                    : arr[0].createTime,
                type: "nav"
              });
              _this.energyList = _this.energyList.concat(arr);
            }
            _this.refreshing = false;
            _this.loadingMore = false;
          }
        });
    },
    //切换任务类型
    taskTypeChange(value, index) {
      this.showTaskTypePop = false;
      this.taskType = index;
      this.pageIndex = 1;
      this.finished = false;
      this.energyList = [];
      this.getEnergyRecord();
    },
    // 切换支付状态
    changeTradeType() {
      this.tradeType = this.active;
      this.pageIndex = 1;
      this.finished = false;
      this.energyList = [];
      this.getEnergyRecord();
    }
  }
};
</script>

<style lang="scss">
.energy-list-wrap {
  min-height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  .van-tabs__line {
    background-color: #2ba8e2;
  }
  .energy-content {
    overflow: hidden;
    padding-bottom: 20px;
    .bg {
      width: 100%;
      top: 0;
      z-index: -1;
    }
    .energy {
      overflow: hidden;
      .energy-top {
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
      .energy-screen {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .energy-type-select {
          display: flex;
          align-items: center;
        }
        .energy-date {
          display: flex;
          align-items: center;
          img {
            width: 31px;
            height: 31px;
          }
        }
      }
      .energy-list {
        .energy-table {
          width: 100%;
          tr {
            td {
              text-align: center;
              padding: 10px 5px;
            }
          }
          .table-nav {
            background-color: #eef9ff;
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
