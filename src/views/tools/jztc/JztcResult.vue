<template>
  <div class="cpm-result-wrap position-relative">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" disabled>
      <div class="cpm-result-content position-relative pt-100 pb-100">
        <img
          class="bg position-absolute"
          src="~assets/images/tools/cpm/bg.png"
          alt=""
        />
        <div
          v-if="resultList"
          class="top-card ml-30 mr-30 pd-30 bc-fff border-radius-10 position-relative"
        >
          <div class="flex-row-space-between">
            <div>
              <img class="img-result" :src="resultList.item.picUrl" alt="" />
            </div>
            <div class="top-info">
              <div @click="back" class="text-right">
                <span class="cl-main fs-22">换个宝贝，重新查询</span>
                <img
                  class="result-back-img ml-10"
                  src="~assets/images/tools/cpm/back.png"
                  alt=""
                />
              </div>
              <div class="mt-10">
                <div class="font-bold fs-26">所属类目：</div>
                <div class="mt-5">
                  {{ resultList.catPathName }}
                </div>
              </div>
            </div>
          </div>
          <div class="contact-us-tools mt-40 pb-10">
            <div class="font-bold">创意标题</div>
            <div>
              <img
                class="contact-img mr-10"
                src="~assets/images/tools/cpm/contact.png"
                alt=""
              />
              <span class="cl-666 fs-20" @click="isShowContactUs = true"
                >联系导师-诊断</span
              >
            </div>
          </div>
          <div class="creative-title" v-if="wordsAllList">
            <p v-for="item in wordsAllList" :key="item.title">
              <span>{{ item.wordsAll || item.title }}</span>
            </p>
          </div>
        </div>

        <div
          class="result-list ml-30 mr-30 mt-30 pt-10 pb-30 bc-fff border-radius-10"
        >
          <div
            class="result-list-nav pt-15 pb-15  flex-row-space-between fs-28 font-bold"
          >
            <div style="width: 27%;">关键词</div>
            <div
              :style="item.styleObject"
              v-for="(item, index) in selectArray"
              :key="index"
              @click="selectFunc(item)"
            >
              {{ item.text }}
              <img
                v-if="rankIcon === item.rank"
                class="rank-icon"
                src="~assets/images/tools/jztc/rank_icon_01.png"
                alt=""
              />
              <img
                v-else
                class="rank-icon-02"
                src="~assets/images/tools/jztc/rank_icon_02.png"
                alt=""
              />
            </div>
          </div>
          <div v-if="resultList">
            <van-list
              @load="onLoad"
              finished-text="我也是有底线的"
              :offset="20"
              :finished="finished"
              v-model="loading"
              class="result-list-content"
              :immediate-check="false"
            >
              <div
                class="result-list-item fs-28"
                v-for="(item, index) in resultList.keyword"
                :key="index"
              >
                <div class="rank-active-item pt-15 pb-15 over-hide">
                  <div
                    class="pm fs-24 copyKeyWord"
                    :data-clipboard-text="item.keywordStr"
                  >
                    {{ item.keywordStr }}
                  </div>
                  <div class="title cl-333">{{ item.allPv }}</div>
                  <div class="shop ">{{ item.allCtr }}</div>
                  <div class="shop ">{{ item.allCvr }}</div>
                </div>
              </div>
            </van-list>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <go-top></go-top>
    <van-button
      v-if="resultList"
      size="mini"
      type="primary"
      class="border-radius-10"
      @click="closeShareDialog"
      style="position:fixed; bottom: 120px;"
      >分享看看</van-button
    >
    <share-result
      v-if="shareUserName && resultList.keyword"
      :showShareDialog="showShareDialog"
      :bgImg="shareDialogImg"
      :shareUserName="shareUserName"
      :shareTitle="shareTitle"
      :qrCodeStyle="qrCodeStyle"
      :listData="resultList.keyword.slice(0, 12)"
      @closeShareDialog="closeShareDialog"
    ></share-result>
    <loading
      :second="20"
      :operate="loadingOperate"
      @on-close="loadingOperate = 'stop'"
    ></loading>

    <!--联系导师-->
    <contact-us
      :isShow="isShowContactUs"
      @on-close="isShowContactUs = false"
    ></contact-us>
  </div>
</template>

<script>
import api from "@/api";
import { Button, PullRefresh, List } from "vant";
import GoTop from "@/components/GoTop";
import Loading from "@/components/Loading";
import { throttle, isWechat, convertUTCTimeToLocalTime } from "@/config/utils";
import Clipboard from "clipboard";
import ContactUs from "@/components/ContactUs";
import ShareResult from "@/components/ShareJztcResult";

export default {
  name: "ToolsJztcResult",
  components: {
    vanButton: Button,
    VanPullRefresh: PullRefresh,
    VanList: List,
    ContactUs,
    GoTop,
    Loading,
    ShareResult
  },
  data() {
    return {
      isShowContactUs: false,
      queryParams: {
        text: null
      },
      page: 0,
      size: 100,
      isLoading: false,
      loading: false,
      finished: false,
      allRankList: [],
      resultList: {
        keyword: [],
        item: {}
      },
      matchedList: [],
      matchedNum: [],
      wordsAllList: [],
      nowTime: "",
      loadingOperate: "stop",
      isShowRankNav: false,
      selectArray: [
        {
          text: "在线商品数",
          rank: "zxl",
          styleObject: {
            width: "31%"
          },
          field: "allPv"
        },
        {
          text: "点击率",
          rank: "djl",
          styleObject: {
            width: "21%"
          },
          field: "allCtr"
        },
        {
          text: "转化率",
          rank: "zhl",
          styleObject: {
            width: "21%"
          },
          field: "allCvr"
        }
      ],
      rankIcon: null,
      shareDialogImg:
        this.baseUrl + "/images/toolsIcon/toolsShareBg/jztc-result.png",
      shareTitle: "#邀请你查看“精准淘词”",
      qrCodeStyle: {
        width: 135,
        height: 135,
        x: 328,
        y: 658
      },
      showShareDialog: false
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {
    this.$nextTick(function() {
      let clipboard = new Clipboard(".copyKeyWord");
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
    // 分享人昵称
    shareUserName() {
      return this.$store.state.userInfo.wechatInfo
        ? this.$store.state.userInfo.wechatInfo.nickname
        : "亲";
    }
  },
  mounted() {
    const _this = this;
    _this.getUrlQuery();
    _this.getExactWords();
    _this.nowTime = convertUTCTimeToLocalTime(new Date());
    _this.throttleScroll = throttle(() => {
      _this.handleScroll();
    }, 1000);
    window.addEventListener("scroll", _this.throttleScroll, true);
  },
  methods: {
    closeShareDialog() {
      let _this = this;
      _this.showShareDialog = !_this.showShareDialog;
    },
    handleScroll() {
      this.isShowRankNav =
        document.documentElement.scrollTop + document.body.scrollTop > 300;
    },
    getExactWords() {
      let _this = this;
      _this.loadingOperate = "run";
      api.getExactWords(_this.queryParams).then(res => {
        _this.loadingOperate = "stop";
        if (res.success) {
          _this.$store.dispatch("UPDATE_USER_ENERGY");
          _this.resultList = JSON.parse(res.result);
          let arr = JSON.parse(res.result).creativeTitles;
          for (var i = 0; i < arr.length; i++) {
            let obj = arr[i];
            if (obj.words) {
              let strAll = "";
              for (var j = 0; j < obj.words.length; j++) {
                let str = obj.words[j];
                if (str) {
                  strAll = strAll + " " + str;
                }
              }
              obj.wordsAll = strAll;
              arr[i] = obj;
            }
          }
          this.wordsAllList = arr;
          _this.selectFunc(_this.selectArray[0]);
        } else {
          _this.$dialog
            .confirm({
              message: res.message || "宝贝链接有误",
              showCancelButton: false,
              confirmButtonText: "返回重新查询"
            })
            .then(() => {
              _this.$router.go(-1);
            });
        }
        _this.loading = false;
        _this.finished = true;
      });
    },
    selectFunc(item) {
      let _this = this;
      if (item.rank === _this.rankIcon) {
        return;
      } else {
        _this.rankIcon = item.rank;
        _this.resultList.keyword.sort(function(a, b) {
          return parseFloat(b[item.field]) - parseFloat(a[item.field]);
        });
      }
    },
    // 获取url中的请求参数
    getUrlQuery() {
      this.queryParams.text = this.$route.query.text;
    },

    //下拉刷新
    onRefresh() {
      let _this = this;
      _this.page = 0;
      _this.finished = false;
      _this.resultList = [];
      _this.getResultList();
    },
    //上拉加载
    onLoad() {
      debugger;
    },
    // 返回重新搜索
    back() {
      this.$router.go(-1);
    },
    //点击上榜排名索引,滚动到列表对应位置
    scrollToMarkItem(index) {
      let position = this.$refs["goods" + index][0].offsetTop - 100;
      window.scrollTo(0, position);
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.throttleScroll); //  离开页面清除（移除）滚轮滚动事件
  }
};
</script>

<style scoped lang="scss">
.cpm-result-wrap {
  min-height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  .pl-36 {
    padding-left: 36px;
  }
  .cpm-result-content {
    .bg {
      width: 100%;
      top: 0;
      z-index: -1;
    }
    .rank-nav {
      width: 100%;
      position: fixed;
      z-index: 10;
      background-color: #d4edf9;
    }
    .img-result {
      width: 160px;
      height: 160px;
    }
    .category-box {
      padding-left: 36px;
    }
    .result-back-img {
      width: 29px;
      height: 29px;
      vertical-align: -6px;
      display: inline;
    }
    .top-card {
      .contact-us-tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .contact-img {
          width: 30px;
          height: 30px;
          vertical-align: -4px;
        }
      }
      .top-info {
        width: 70%;
      }
      .creative-title {
        padding: 20px;
        border-radius: 10px;
        background: rgba(238, 249, 254, 0.5);
        border: 1px solid rgba(191, 191, 191, 1);
        p {
          margin-bottom: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #333;
            background: rgba(41, 167, 225, 0.2);
            padding: 2px 20px;
          }
        }
      }
      .result-operate {
        .result-back {
          display: flex;
        }
      }
    }
    .result-list {
      min-height: 500px;
      box-shadow: 0 0 20px 0 rgba(41, 167, 225, 0.15);
      .result-type {
        display: flex;
        .result-type-img {
          width: 30px;
          height: 30px;
        }
      }
      .result-list-nav {
        background-color: #d4edf9;
        padding-right: 10px;
        div {
          text-align: center;
          position: relative;
          .rank-icon {
            width: 21px;
            position: absolute;
            top: 12px;
            right: 10px;
          }
          .rank-icon-02 {
            width: 18px;
            position: absolute;
            top: 12px;
            right: 10px;
          }
        }
      }
      .result-list-content {
        .result-list-item:nth-child(odd) {
          background: rgba(238, 249, 255, 1);
        }
        .result-list-item:nth-child(even) {
          background: rgba(249, 249, 249, 1);
        }
        .result-list-item {
          padding-right: 10px;
          overflow: hidden;
          .rank-active-item {
            display: flex;
          }
          .pm {
            width: 35%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .title {
            width: 31%;
            padding: 0 1%;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 40px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .shop {
            width: 17%;
            padding: 0 1%;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 40px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
