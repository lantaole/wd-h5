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
          class="rank-nav fs-26 cl-666 text-center pd-20 border-bottom"
          :style="isShowNavBar ? 'top: 46px' : 'top: 0px'"
          v-if="matchedList.length && isShowRankNav"
        >
          该店铺有宝贝排名在<span
            v-for="(item, index) in matchedList"
            :key="index"
            @click="scrollToMarkItem(item.index)"
            >第<span class="cl-main font-bold">{{ item.index }}</span
            >名,
          </span>
          稳步保持
        </div>
        <div
          class="top-card ml-30 mr-30 pd-30 bc-fff border-radius-10 position-relative"
        >
          <div v-if="resultList.length">
            <div class="result-tip" v-if="!queryParams.shopInfo">
              <img
                class="result-img position-absolute"
                src="~assets/images/tools/cpm/top100.png"
                alt=""
              />
              <p class="fs-28 cl-666 text-center mt-50">
                <span class="cl-main">未指定</span
                >{{ queryType === "shop" ? "店铺旺旺号" : "具体宝贝" }}
              </p>
              <p class="fs-28 cl-666 text-center mt-20">
                将为您展现该关键词<span class="cl-main">TOP100的宝贝</span>
              </p>
            </div>
            <div class="result-tip" v-else-if="matchedList.length">
              <img
                class="result-img position-absolute"
                src="~assets/images/tools/cpm/result-img2.png"
                alt=""
              />
              <p class="fs-30 cl-red font-bold text-center mt-70">恭喜您!</p>
              <p class="fs-28 cl-666 text-center mt-20">
                该店铺有宝贝排名在<span
                  v-for="(item, index) in matchedList"
                  :key="index"
                  @click="scrollToMarkItem(item.index)"
                  >第<span class="cl-main font-bold">{{ item.index }}</span
                  >名,
                </span>
                稳步保持
              </p>
            </div>
            <div class="result-tip" v-else>
              <img
                class="result-img position-absolute"
                src="~assets/images/tools/cpm/result-img1.png"
                alt=""
              />
              <p class="fs-30 cl-green font-bold text-center mt-70">很遗憾!</p>
              <p class="fs-28 cl-666 text-center mt-20">
                该店铺<span class="cl-main font-bold">暂没有进入TOP100</span
                >排名宝贝, 再接再厉!
              </p>
            </div>
            <div class="contact-us-tools mt-40 pb-30 border-bottom">
              <img
                class="contact-img mr-10"
                src="~assets/images/tools/cpm/contact.png"
                alt=""
              />
              <span class="cl-666 fs-26" @click="isShowContactUs = true"
                >联系导师-提升排名</span
              >
            </div>
          </div>
          <div class="result-operate flex-row-space-between mt-20 fs-24 pb-10">
            <div>
              关键词:
              <span class="cl-main">{{ queryParams.searchKey || "" }}</span>
            </div>
            <div class="result-back ml-40" @click="back">
              <span class="cl-main mr-10 text-line">换个关键词, 重新查询</span>
              <img
                class="result-back-img"
                src="~assets/images/tools/cpm/back.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          class="result-list ml-30 mr-30 mt-30 pt-30 pb-30 bc-fff border-radius-10"
        >
          <div
            class="result-list-title flex-row-space-between pb-20 pl-20 pr-20"
          >
            <div class="result-type">
              <img
                class="result-type-img"
                src="~assets/images/tools/cpm/st.png"
                alt=""
              />
              <span class="cl-main ml-10 fs-24">手淘APP+综合查询结果</span>
            </div>
            <div class="fs-22 cl-666">查询时间: {{ nowTime }}</div>
          </div>

          <div
            class="result-list-nav pt-15 pb-15 pl-30 pr-30 flex-row-space-between fs-28 font-bold"
          >
            <span>排名位置</span>
            <span>宝贝标题</span>
            <span>所属店铺</span>
          </div>

          <van-list
            @load="onLoad"
            :finished-text="
              loading
                ? ''
                : resultList.length == 0
                ? '暂无搜索结果'
                : '我也是有底线的'
            "
            :offset="20"
            :finished="finished"
            v-model="loading"
            class="result-list-content"
            :immediate-check="false"
          >
            <div
              class="result-list-item fs-28"
              v-for="(item, index) in resultList"
              :key="index"
            >
              <div
                v-if="matchedNum.includes(index + 1)"
                class="rank-active-item pt-20 pb-20 border-bottom over-hide"
                :ref="'goods' + (index + 1)"
              >
                <div class="pm left">
                  <div class="pm-num text-center cl-red">{{ index + 1 }}</div>
                  <img
                    class="result-goods-img ml-10"
                    :src="item.picUrl"
                    alt=""
                  />
                </div>
                <div class="title left cl-333">{{ item.title }}</div>
                <div class="shop left cl-red">{{ item.storeName }}</div>
              </div>
              <div v-else class="over-hide pt-20 pb-20 border-bottom">
                <div class="pm left">
                  <div class="pm-num text-center fs-22">{{ index + 1 }}</div>
                  <img
                    class="result-goods-img ml-10"
                    :src="item.picUrl"
                    alt=""
                  />
                </div>
                <div class="title left cl-333">{{ item.title }}</div>
                <div class="shop left cl-333">{{ item.storeName }}</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </van-pull-refresh>
    <van-button
      v-if="resultList && resultList.length"
      size="mini"
      type="primary"
      class="border-radius-10"
      @click="closeShareFunc"
      :style="{
        position: 'fixed',
        bottom: '120px'
      }"
      >来PK</van-button
    >
    <go-top></go-top>
    <loading
      :second="20"
      :operate="loadingOperate"
      @on-close="loadingOperate = 'stop'"
    ></loading>
    <share-result
      v-if="resultList && resultList.length"
      :showShareFunc="showShareFunc"
      :showFuncBg="showFuncBg"
      :qrCodeStyle="qrCodeStyle"
      :listData="resultList.slice(0, 15)"
      :keywords="queryParams.searchKey"
      @closeShareFunc="closeShareFunc"
    ></share-result>

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
import ShareResult from "@/components/ShareCpmResult";
import { throttle, isWechat, convertUTCTimeToLocalTime } from "@/config/utils";
import ContactUs from "@/components/ContactUs";

export default {
  name: "ToolsCpmResult",
  components: {
    vanButton: Button,
    VanPullRefresh: PullRefresh,
    VanList: List,
    GoTop,
    Loading,
    ContactUs,
    ShareResult
  },
  data() {
    return {
      queryType: "",
      isShowContactUs: false,
      queryParams: {
        device: "wx",
        type: "taobao",
        rankTypes: "zonghe",
        searchKey: "",
        itemInfo: "",
        shopInfo: ""
      },
      page: 0,
      size: 100,
      isLoading: false,
      loading: false,
      finished: false,
      allRankList: [],
      resultList: [],
      matchedList: [],
      matchedNum: [],
      nowTime: "",
      loadingOperate: "stop",
      isShowRankNav: false,
      showShareFunc: false,
      showFuncBg: this.baseUrl + "/images/toolsIcon/05.png",
      qrCodeStyle: {
        width: 95,
        height: 95,
        x: 147,
        y: 694
      },
      htmlUrl: ""
    };
  },
  computed: {
    // 是否显示顶部navbar
    isShowNavBar() {
      return this.$route.meta.isShowNavBar && !isWechat();
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
    /*this.fixdLeft =
      (window.screen.width - document.documentElement.offsetWidth) / 2 +
      5 +
      "px";*/
  },
  mounted() {
    const _this = this;
    _this.getUrlQuery();
    _this.nowTime = convertUTCTimeToLocalTime(new Date());
    _this.throttleScroll = throttle(() => {
      _this.handleScroll();
    }, 1000);
    window.addEventListener("scroll", _this.throttleScroll, true);
  },
  methods: {
    closeShareFunc() {
      let _this = this;
      _this.showShareFunc = !_this.showShareFunc;
    },
    handleScroll() {
      this.isShowRankNav =
        document.documentElement.scrollTop + document.body.scrollTop > 300;
    },
    // 获取url中的请求参数
    getUrlQuery() {
      this.queryType = this.$route.query.queryType;
      this.queryParams.searchKey = this.$route.query.searchKey;
      this.queryParams.shopInfo = this.$route.query.shopInfo;
      this.queryParams.itemInfo = this.$route.query.itemInfo;
      this.getResultList();
    },
    // 排名列表查询
    getResultList() {
      const _this = this;
      _this.loadingOperate = "run";
      _this.loading = true;
      api
        .getRank(_this.queryParams)
        .then(res => {
          if (res.success) {
            _this.$store.dispatch("UPDATE_USER_ENERGY");
            _this.matchedList = res.result.matchedList || [];
            if (_this.matchedList.length) {
              _this.matchedNum = [];
              for (var i = 0; i < _this.matchedList.length; i++) {
                _this.matchedNum.push(_this.matchedList[i].index);
              }
            }
            _this.allRankList = res.result.allRankList || [];
            let arr = _this.allRankList.slice(
              _this.page * _this.size,
              (_this.page + 1) * _this.size
            );
            _this.resultList = arr;
            _this.loadingOperate = "complete";
          } else {
            _this.loadingOperate = "err";
            _this.$dialog.alert({
              title: "提示",
              confirmButtonText: "我知道了",
              message: res.message
            });
          }
          _this.isLoading = false;
          _this.loading = false;
        })
        .catch(() => {
          _this.$Toast("加载失败,请刷新重试");
          _this.loadingOperate = "err";
          _this.isLoading = false;
          _this.loading = false;
        });
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
      let _this = this;
      _this.page++;
      let arr = _this.allRankList.slice(
        _this.page * _this.size,
        (_this.page + 1) * _this.size
      );
      _this.resultList = _this.resultList.concat(arr);
      _this.isLoading = false;
      _this.loading = false;
      if ((_this.page + 1) * _this.size >= 100) {
        _this.finished = true;
      }
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
    .top-card {
      .result-tip {
        .result-img {
          width: 130px;
          height: 130px;
          top: -65px;
          left: 50%;
          margin-left: -65px;
        }
      }
      .contact-us-tools {
        display: flex;
        justify-content: center;
        align-items: center;
        .contact-img {
          width: 30px;
          height: 30px;
        }
      }
      .result-operate {
        .result-back {
          display: flex;
          .result-back-img {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
    .result-list {
      min-height: 500px;
      .result-type {
        display: flex;
        .result-type-img {
          width: 30px;
          height: 30px;
        }
      }
      .result-list-nav {
        background-color: #d4edf9;
        border-top: 1px solid #29a7e1; /*no*/
      }
      .result-list-content {
        .result-list-item {
          background-color: #f9f9f9;
          overflow: hidden;
          .rank-active-item {
            border: 1px solid #56e3ff; /*no*/
            background-color: #e9f6fc;
          }
          .pm {
            width: 25%;
            padding: 0 2%;
            display: flex;
            align-items: center;
            .pm-num {
              width: 40px;
              height: 35px;
              line-height: 35px;
              border-radius: 50%;
              border: 1px solid #cccccc; /*no*/
            }
            .result-goods-img {
              width: 90px;
              height: 90px;
            }
          }
          .title {
            width: 50%;
            padding: 0 2%;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 40px;
          }
          .shop {
            width: 25%;
            padding: 0 2%;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
