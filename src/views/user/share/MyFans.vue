<template>
  <div class="fans-wrap position-relative">
    <div class="fans-content position-relative over-hide mb-30">
      <img
        v-if="!fansList.length && isActivity"
        class="bg position-absolute"
        :src="this.baseUrl + '/images/common/717/bg1.png'"
        alt=""
      />
      <img
        v-else
        class="bg position-absolute"
        src="~assets/images/tools/cpm/bg.png"
        alt=""
      />
      <div
        v-show="!fansList.length"
        @click="jumpTo('/activity-717')"
        class="free-get"
      ></div>
      <div class="no-fans-wrap position-relative" v-if="!fansList.length">
        <div class="no-fans-content">
          <div class="pb-100 pt-30 bc-fff border-radius-10" style="width: 90%;">
            <img
              class="fans mg-auto"
              src="~assets/images/account/share/fans.png"
              alt=""
            />
            <p class="fs-36 font-bold mt-30 text-center">你还没有粉丝哦~</p>
            <p class="fs-26 cl-999 mt-30 text-center">
              快快邀请伙伴们一起来随手查
            </p>
            <img
              class="fans-btn mg-auto mt-30"
              src="~assets/images/account/share/fans-invite-btn.png"
              @click="jumpTo('/share')"
              alt=""
            />
          </div>
        </div>
        <div class="no-fans-bottom flex-row-space-around">
          <router-link
            v-for="(item, index) in toolList"
            :key="index"
            :to="item.toolsUrl"
            class="bottom-item"
          >
            <img class="mg-auto" :src="item.icon" alt="" />
            <p class="text-center fs-26 cl-999 mt-10">{{ item.title }}</p>
          </router-link>
        </div>
      </div>
      <template v-else>
        <img
          v-show="isActivity"
          class="row-top position-absolute"
          :src="this.baseUrl + '/images/common/717/row-top.png'"
          alt=""
          @click="jumpTo('/activity-717')"
        />
        <div
          class="fans-list-content bc-fff border-radius-10 over-hide mg-auto position-relative mt-100"
        >
          <div class="fans-list-top flex-row-space-between pl-20 pr-20">
            <div class="list-top-left">
              <span class="fs-32 cl-333 font-bold">专属粉丝累计能量</span>
              <img
                class="fans-list-icon ml-20"
                src="~assets/images/account/share/fans-list-icon.png"
                alt=""
              />
            </div>
            <div class="fs-24 font-bold" style="color: #FF6000">
              {{ allAmount }}能量
            </div>
          </div>

          <div class="fans-list">
            <van-list
              v-if="fansList.length"
              @load="loadMore"
              finished-text="我可是有底线的哦~"
              :offset="20"
              :finished="finished"
              v-model="loadingMore"
              class="result-list-content"
              :immediate-check="false"
            >
              <div
                class="fans-item over-hide"
                v-for="(item, index) in fansList"
                :key="index"
              >
                <div class="fans-avatar left">
                  <img :src="item.wechatInfo.headimgurl" alt="" />
                </div>
                <div class="fans-info left border-bottom pr-20">
                  <div class="fans-name pt-30">
                    <div class="fs-28 cl-333 wechat-name">
                      微信名 : {{ item.wechatInfo.nickname }}
                    </div>
                    <div
                      class="etc text-center pr-20 pl-20 border-radius-10 fs-18 ml-20"
                      v-if="item.buyFee"
                    >
                      已充值¥{{ item.buyFee }}元
                    </div>
                  </div>
                  <div class="fans-bot flex-row-space-between mt-15">
                    <div class="date-phone fs-24 cl-999">
                      <div class="date-i pr-15">
                        {{ item.createTime | dateFormat("YYYY-MM-DD") }}
                      </div>
                      <div class="pl-10">
                        {{ item.phone ? item.phone : "未注册" }}
                      </div>
                    </div>
                    <div class="helpEnergy fs-16 pr-10 pl-10 border-radius-10">
                      赋能你{{ item.amount ? item.amount + 20 : 20 }}能量
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
            <img
              v-show="isActivity"
              class="get-bot mg-auto mt-20 mb-40"
              :src="this.baseUrl + '/images/common/717/get-bot.png'"
              alt=""
              @click="jumpTo('/activity-717')"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { List } from "vant";
import api from "@/api";
export default {
  name: "MyFans",
  components: {
    VanList: List
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  computed: {
    // 是否为活动期间
    isActivity() {
      return this.$store.state.isActivity;
    }
  },
  data() {
    return {
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
        }
      ],
      fansList: [],
      finished: false,
      loadingMore: true,
      pageIndex: 1,
      pageSize: 10,
      allAmount: 0
    };
  },
  mounted() {
    this.getFansPage();
  },
  methods: {
    jumpTo(url) {
      this.$router.push({
        path: url
      });
    },
    getFansPage() {
      const _this = this;
      _this.loadingMore = true;
      api
        .getFansPage({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.success && res.result && res.result.page) {
            _this.allAmount = res.result.allAmount || 0;
            let arr = res.result.page.list || [];
            for (var i = 0; i < arr.length; i++) {
              arr[i].wechatInfo = JSON.parse(
                decodeURIComponent(arr[i].wechatInfo)
              );
            }
            _this.fansList = _this.fansList.concat(arr);
            if (arr.length < _this.pageSize) {
              _this.finished = true;
            }
          }
          _this.loadingMore = false;
        });
    },
    //上拉加载
    loadMore() {
      let _this = this;
      setTimeout(() => {
        _this.pageIndex = _this.pageIndex + 1;
        _this.getFansPage();
      }, 200);
    }
  }
};
</script>

<style lang="scss">
.fans-wrap {
  min-height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  .free-get {
    height: 120px;
    width: 60%;
    position: absolute;
    top: 170px;
    left: 20%;
    z-index: 111;
  }
  .row-top {
    width: 640px;
    top: 37px;
    left: 55px;
    z-index: 11;
  }
  .get-bot {
    width: 590px;
  }
  .fans-content {
    padding-bottom: 50px; /*no*/
    min-height: 100vh;
    .bg {
      width: 100%;
      top: 0;
      z-index: -1;
    }
    .no-fans-wrap {
      height: 100%;
      margin-top: 300px;
      .no-fans-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .fans {
          width: 170px;
          height: 126px;
        }
        .fans-btn {
          width: 400px;
          height: 90px;
        }
      }
      .no-fans-bottom {
        width: 100%;
        position: fixed;
        bottom: 50px;
        left: 0;
        .bottom-item {
          img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
    .fans-list-content {
      width: 690px;
      min-height: 700px;
      .fans-list-top {
        height: 100px;
        align-items: center;
        background-color: #d4edf9;
        .list-top-left {
          display: flex;
          align-items: center;
          .fans-list-icon {
            width: 48px;
            height: 24px;
          }
        }
      }
      .fans-list {
        .fans-item {
          .fans-avatar {
            width: 150px;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 90px;
              height: 90px;
              border-radius: 50%;
            }
          }
          .fans-info {
            width: 540px;
            min-height: 150px;
            .fans-name {
              display: flex;
              align-items: center;
              .wechat-name {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              .etc {
                background-color: #1f1913;
                color: #e5ba6b;
              }
            }
            .fans-bot {
              align-items: center;
              .date-phone {
                display: flex;
                align-items: center;
                .date-i {
                  border-right: 1px solid #eeeeee; /*no*/
                }
              }
              .helpEnergy {
                border: 1px solid #ff6000; /*no*/
                color: #ff6000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
