<template>
  <div class="bc-f5f5f5">
    <transition name="fade">
      <div id="head" class="header-dom transparent" ref="head">
        <div class="mui-flex main-dom" data-spm-anchor-id="a222m.7628550.0.i0">
          <div class="left-btns">
            <a class="icon-link back-link" @click="$router.go(-1)">
              <svg
                t="1516605784224"
                class="icon"
                style=""
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1221"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="200"
                height="200"
              >
                <path
                  d="M393.390114 512.023536l347.948667-336.348468c20.50808-19.85828 20.50808-51.997258 0-71.792093-20.507056-19.826558-53.778834-19.826558-74.28589 0L281.990954 476.135164c-20.476357 19.826558-20.476357 51.981908 0 71.746044l385.061936 372.236839c10.285251 9.91379 23.728424 14.869662 37.173644 14.869662 13.446243 0 26.889417-4.956895 37.112246-14.901385 20.50808-19.826558 20.50808-51.919487 0-71.746044L393.390114 512.023536"
                  p-id="1222"
                ></path>
              </svg>
            </a>
          </div>
          <ul class="cell header-nav">
            <li
              v-for="(item, index) in headerNavList"
              :index="index"
              :key="item.text"
              :class="[
                item.selected === headerSelected.selected ? 'active' : ''
              ]"
              @click="selectNavFunc(item)"
            >
              {{ item.text }}
            </li>
          </ul>
          <div class="right-btns"></div>
        </div>
      </div>
    </transition>
    <van-swipe indicator-color="white" class="demo-swipe">
      <van-swipe-item v-for="item in commodityDescItem.images" :key="item">
        <div
          class="swipe-img-box"
          :style="{
            backgroundImage: 'url(' + zoomOutTaobaoImg(item, '_300x300.') + ')'
          }"
        ></div>
      </van-swipe-item>
    </van-swipe>
    <div class="group-warp">
      <div
        class="module-wrap"
        data-module="mods/module-price/index"
        id="J_mod3"
      >
        <div class="module-price">
          <div class="real-price">
            <span class="ui-yen "
              ><i class="price-symbol">¥</i
              ><span class="price" v-if="commodityDescApiStackPrice.price">{{
                commodityDescApiStackPrice.price.priceText || 0
              }}</span></span
            >
            <span
              class="icon-text"
              v-if="commodityDescApiStackPrice.priceTag"
              >{{ commodityDescApiStackPrice.priceTag[0].text }}</span
            >
          </div>
          <div
            class="item-price"
            v-if="commodityDescApiStackPrice.extraPrices.length > 1"
          >
            <label>价格:</label
            ><del
              >¥{{
                commodityDescApiStackPrice.extraPrices[0].priceText || 0
              }}</del
            >
          </div>
        </div>
      </div>
      <div class="module-wrap">
        <div class="module-title">
          <div class="share-warp mui-flex">
            <div class="main cell">
              {{ commodityDescItem.title }}
            </div>
            <span class="share-div mui-flex share-hidden">
              <div class="share-bd mui-flex">
                <i class="share-icon"></i>
                <span>分享</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="module-wrap" id="J_mod6">
        <div class="module-adds">
          <span class="postage">{{
            commodityDescApiStackDelivery.postage
          }}</span>

          <span class="sales"
            >月销量 {{ commodityDescApiStackItem.vagueSellCount }}件</span
          >

          <span class="delivery">{{ commodityDescApiStackDelivery.from }}</span>
        </div>
      </div>
    </div>
    <div class="group-warp">
      <div v-if="commodityDescSeller.sellerType === 'c'" class="module-wrap">
        <div class="module-prom">
          <div class="prom-content actBorderTop">
            <div class="l">
              {{ commodityDescApiStackPrice.shopPromTitle }}
            </div>
            <div class="J_activity activitylist">
              <div
                class="box mui-flex align-center"
                v-if="commodityDescApiStackPrice.shopProm"
              >
                <div class="ic-box" style="margin-right:-3.6999999999999997px;">
                  <span>{{
                    commodityDescApiStackPrice.shopProm[0].iconText
                  }}</span>
                </div>
                <div class="cell">
                  <span>{{
                    commodityDescApiStackPrice.shopProm[0].title
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="J_mod11" class="module-wrap ">
        <div class="module-advantage">
          <div class="module-scene-wrap">
            <div class="module-scene-item">
              <div class="l">服务</div>
              <div class="r" v-if="commodityDescSeller.sellerType === 'B'">
                <div
                  class="service"
                  v-if="commodityDescApiStackConsumerProtection.displayService"
                >
                  <ul class="server-list service-item">
                    <li
                      v-for="service in commodityDescApiStackConsumerProtection
                        .displayService.services"
                      :key="service.serviceId"
                    >
                      {{ service.name }}
                    </li>
                  </ul>
                  <div class="special service-item pb-20">
                    <img
                      :src="
                        commodityDescApiStackConsumerProtection.displayService
                          .icon
                      "
                    />
                    {{
                      commodityDescApiStackConsumerProtection.displayService
                        .description
                    }}
                  </div>
                </div>
              </div>
              <div class="r" v-if="commodityDescSeller.sellerType === 'C'">
                <div class="service">
                  <ul class="server-list service-item">
                    <li
                      v-for="item in commodityDescApiStackConsumerProtection.items"
                      :key="item.desc"
                    >
                      {{ item.title }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group-warp">
      <div
        class="module-wrap"
        data-module="mods/module-review/index"
        id="comments"
        ref="comments"
      >
        <div
          class="module-review"
          data-nav="评价"
          data-mod-name="detail-m/mods/module-review/index"
        >
          <div id="mui-tagscloud-i" class="mui-tagscloud">
            <div v-if="commodityDescRate" class="mui-tagscloud-main">
              <div class="mui-tagscloud-title">
                商品评价 ({{ commodityDescRate.totalCount }})
              </div>

              <ul class="mui-tagscloud-ul">
                <li
                  v-for="keyword in commodityDescRate.keywords"
                  :key="keyword.attribute"
                >
                  {{ keyword.word }}({{ keyword.count }})
                </li>
              </ul>

              <div
                class="mui-tagscloud-comments"
                v-if="commodityDescRate.rateList"
              >
                <div class="mui-tagscloud-user">
                  <img
                    class="mui-tagscloud-img"
                    :src="commodityDescRate.rateList[0].headPic"
                  />

                  <span class="mui-tagscloud-name">{{
                    commodityDescRate.rateList[0].userName
                  }}</span>
                </div>
                <div class="mui-tagscloud-content">
                  {{ commodityDescRate.rateList[0].content }}
                </div>
                <div class="mui-tagscloud-date">
                  {{ commodityDescRate.rateList[0].dateTime }}
                  {{ commodityDescRate.rateList[0].skuInfo }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="module-wrap"
        data-module="mods/module-askall/index"
        id="J_mod16"
      >
        <div
          class="module-askall"
          data-mod-name="detail-m/mods/module-askall/index"
        >
          <a
            href="javascript: void(0);"
            class="askall-wrap"
            title="问大家"
            v-if="commodityDescVertical.askAll"
          >
            <h3 class="askall-title">
              {{ commodityDescVertical.title }}
            </h3>
            <ul class="askall-list">
              <li
                v-for="(ask, index) in commodityDescVertical.askAll.modelList"
                :key="index"
              >
                <i class="icon-ask">问</i>
                <span class="answer-text">{{ ask.askText }}</span>
                <span class="answer-count">{{ ask.answerCountText }}</span>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </div>
    <div class="group-warp" v-if="commodityDescSeller">
      <div
        class="module-wrap"
        data-module="mods/module-shop/index"
        id="J_mod17"
      >
        <div
          class="module-shop"
          data-mod-name="detail-m/mods/module-shop/index"
          data-spm="1998338745"
        >
          <div class="shop-main" data-spm="1998338745">
            <div class="shop-logo">
              <img :src="commodityDescSeller.shopIcon" />
            </div>
            <div class="shop-info">
              <div class="shop-name">
                {{ commodityDescSeller.sellerNick }}
              </div>
              <div class="shop-title">
                <img :src="commodityDescSeller.creditLevelIcon" />
              </div>
            </div>
            <div class="shop-qualification "></div>
          </div>
          <ul class="score">
            <li
              v-for="(item, index) in commodityDescSeller.evaluates"
              :key="index"
            >
              {{ item.title }}
              <b v-if="item.levelText === '高'" class="up">{{ item.score }}</b>
              <b v-else-if="item.levelText === '低'" class="down">{{
                item.score
              }}</b>
              <b v-else class="equal">{{ item.score }}</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="group-warp">
      <div
        class="module-wrap"
        data-module="mods/module-desc/index"
        id="J_mod19"
      >
        <div
          class="module-desc"
          id="p-desc"
          data-mod-name="detail-m/mods/module-desc/index"
          data-nav="详情"
          ref="p-desc"
        >
          <div class="scrolltips">
            <div class="part-title mui-flex align-center">
              <div class="cell"><hr /></div>
              <span class="txt fixed">详情</span>
              <div class="cell"><hr /></div>
            </div>
          </div>
          <div class="container" style="">
            <!--商品详情-->
            <div class="subtitle" v-if="commodityDescItem.subtitle">
              <h3 class="newAttraction">"{{ commodityDescItem.subtitle }}"</h3>
            </div>
            <div id="modules-desc">
              <div class="module-container image_text">
                <div class="module-content">
                  <div class="mui-wpimagetext mdv-wpimagetext">
                    <div
                      class="mui-wpimagetext-item"
                      v-html="commodityDescDetailImgs"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="actionBar-bg">
      <div id="s-actionBar-container">
        <div class="action-bar-wrap j-bottom-bar  ">
          <div class="trade">
            <router-link to="/" class="cart " role="button"
              ><p>随手查</p></router-link
            >
            <a class="buy " role="button"><p id="copyTbPwd">复制淘口令</p></a>
          </div>
        </div>
      </div>
    </section>
    <div v-if="commodityDesc && commodityDescLink">
      <share-dialog
        :commodityDesc="commodityDesc"
        :commodityDescLink="commodityDescLink"
        :showShareDialog="showShareDialog"
        @closeShareDialog="closeShareDialogFunc"
      ></share-dialog>
    </div>
    <img
      :src="this.baseUrl + '/images/toolsIcon/poster.png'"
      @click="closeShareDialogFunc"
      class="poster-img"
      alt=""
    />
  </div>
</template>

<script>
import api from "@/api";
import {
  zoomOutTaobaoImg,
  getWxConfigParams,
  getStorage
} from "@/config/utils";
import Clipboard from "clipboard";
import ShareDialog from "@/components/ShareDialog";
import { Swipe, SwipeItem } from "vant";
export default {
  name: "WxToTbTransfer",
  components: {
    ShareDialog,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem
  },
  data() {
    return {
      resultId: "",
      zoomOutTaobaoImg: zoomOutTaobaoImg,
      headerNavList: [
        {
          text: "商品",
          selected: "shops",
          scrollTo: "head",
          scrollTop: 0
        },
        {
          text: "评价",
          selected: "comments",
          scrollTo: "comments",
          scrollTop: 0
        },
        {
          text: "详情",
          selected: "desc",
          scrollTo: "p-desc",
          scrollTop: 0
        }
      ],
      headerSelected: {
        text: "商品",
        selected: "shops",
        scrollTo: "head",
        scrollTop: 0
      },
      commodityDesc: null,
      showShareDialog: false,
      commodityDescPwd: null,
      commodityDescApiStackPrice: {
        extraPrices: [
          {
            priceText: 0
          }
        ]
      },
      commodityDescApiStackDelivery: {},
      commodityDescApiStackItem: {},
      commodityDescApiStackConsumerProtection: {},
      commodityDescItem: {},
      commodityDescRate: {},
      commodityDescVertical: {},
      commodityDescMockData: {},
      commodityDescDetailImgs: null,
      commodityDescSeller: {},
      commodityDescLink: null
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {
    let _this = this;
    if (_this.$route.query.resultId) {
      _this.resultId = _this.$route.query.resultId;
    } else if (_this.$route.query.state) {
      // 分享链接进入 授权重定向state
      _this.resultId = _this.$route.query.state;
    }
    _this.loadItem(_this.resultId);
    _this.loadDetailImgs(_this.resultId);
    if (this.isLogin) {
      // 获取分享短链接 配置分享参数
      this.getShareUrl();
    }
  },
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  mounted() {},
  methods: {
    setWechatShare(link) {
      let shareParams = {
        title: "微分享助手",
        desc: "在吗？来看看我有好东西和你分享嘿，赶紧来啊！！！",
        link: link,
        imgUrl:
          window.location.origin + this.baseUrl + "/images/toolsIcon/wfx.png"
      };
      getWxConfigParams(shareParams);
    },
    loadItem(itemId) {
      let _this = this;
      let url =
        window.location.protocol +
        "//acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=%7B%22itemNumId%22%3A%22" +
        itemId +
        "%22%7D";
      _this.$jsonp(url, {}).then(res => {
        let result = res.data;
        if (res.ret[0] === "SUCCESS::调用成功") {
          result.apiStack[0].value = JSON.parse(result.apiStack[0].value);
          result.mockData = JSON.parse(result.mockData);
          _this.commodityDesc = result;
          _this.commodityDescMockData = result.mockData;
          _this.commodityDescApiStackPrice = result.apiStack[0].value.price;
          _this.commodityDescApiStackItem = result.apiStack[0].value.item;
          _this.commodityDescApiStackDelivery =
            result.apiStack[0].value.delivery;
          _this.commodityDescApiStackConsumerProtection =
            result.apiStack[0].value.consumerProtection;
          _this.commodityDescItem = result.item;
          _this.commodityDescRate = result.rate;
          _this.commodityDescVertical = result.vertical;
          _this.commodityDescSeller = result.seller;
          _this.getWxfTkl();
        } else {
          _this.$dialog.alert({
            message: "调用淘宝接口失败"
          });
        }
      });
    },
    loadDetailImgs(itemId) {
      let _this = this;
      let url =
        window.location.protocol +
        "//h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={%22id%22:%22" +
        itemId +
        "%22}";
      _this.$jsonp(url, {}).then(res => {
        if (res.ret[0] === "SUCCESS::调用成功") {
          _this.$store.dispatch("UPDATE_USER_ENERGY");
          let result = res.data;
          _this.commodityDescDetailImgs = result.pcDescContent;
        } else {
          _this.$dialog.alert({
            message: "调用淘宝详情内容接口失败"
          });
        }
      });
    },
    selectNavFunc(item) {
      let _this = this;
      let scrollToDom = _this.$refs[item.scrollTo];
      _this.headerSelected = item;
      let distance =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset; //获取滚动条的高度(兼容三种浏览器版本)
      let total = scrollToDom.offsetTop - 50;
      //平滑滚动的效果，把总距离分成50个小段，每10ms执行一次
      let step = total / 50;
      if (total > distance) {
        //当divArr.[index]offsetTop的距离>滚动条的距离，向下滑动，此时滑动的距离是total
        smoothDown(); //向下滑动
      } else {
        let newTotal = distance - total; //当div到窗口的距离<滚动条的距离，向上滑动，此时滑动的距离是distance - total
        step = newTotal / 50;
        smoothUp();
      }

      //向下滑动
      function smoothDown() {
        if (distance < total) {
          distance = distance + step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          window.pageYOffset = total;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
          window.pageYOffset = total;
        }
      }

      //向上滑动
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          window.pageYOffset = total;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
          window.pageYOffset = total;
        }
      }
    },
    closeShareDialogFunc() {
      let _this = this;
      _this.showShareDialog = !_this.showShareDialog;
    },
    setHeaderNavListTopFunc() {
      let _this = this;
      _this.headerNavList.map(element => {
        element.scrollTop = _this.$refs[element.scrollTo].offsetTop;
      });
    },
    scrollFunc() {
      let _this = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop <= 0) {
        _this.headerSelected = _this.headerNavList[0];
      } else if (
        scrollTop >= _this.headerNavList[0].scrollTop &&
        scrollTop <= _this.headerNavList[1].scrollTop
      ) {
        _this.headerSelected = _this.headerNavList[1];
      } else {
        _this.headerSelected = _this.headerNavList[2];
      }
    },
    getShareUrl() {
      let _this = this;
      let referrerId = this.isLogin ? getStorage("token").split("_")[0] : "";
      let fromPage = this.$route.meta.markName;
      let linkUrl = this.isLogin
        ? window.location.origin +
          "" +
          window.location.pathname +
          "?fromPage=" +
          fromPage +
          "&referrerId=" +
          referrerId +
          "&state=" +
          this.resultId +
          "&channel=user_recommend&source=official_accounts"
        : window.location.origin +
          window.location.pathname +
          "?resultId=" +
          this.resultId;
      api
        .getShareUrl({
          url: linkUrl
        })
        .then(res => {
          if (res.success) {
            _this.commodityDescLink = res.result;
            _this.setWechatShare(res.result);
          } else {
            _this.$dialog.alert({
              message: res.message
            });
          }
        });
    },
    getWxfTkl() {
      let _this = this;
      let tips = _this.commodityDescItem.subtitle
        ? _this.commodityDescItem.subtitle
        : _this.commodityDescItem.title.substring(0, 12);
      api
        .getWxfTkl({
          itemid: _this.commodityDescItem.itemId,
          tips: tips + "【随手查】",
          logo: _this.commodityDescItem.images[0]
        })
        .then(res => {
          _this.commodityDescPwd = res.result || "";
          _this.$nextTick(function() {
            let clipboard = new Clipboard("#copyTbPwd", {
              text: function() {
                return _this.commodityDescPwd;
              }
            });
            clipboard.on("success", () => {
              this.$Toast(
                _this.commodityDescPwd ? "复制成功!" : "淘口令获取失败"
              );
            });
            clipboard.on("error", () => {
              this.$Toast("复制失败!");
              clipboard.destroy();
            });
          });
        });
    }
  }
};
</script>

<style lang="scss">
.swipe-img-box {
  height: 750px;
  max-height: 750px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}

.poster-img {
  position: fixed;
  right: 40px;
  bottom: 60px; /*no*/
  width: 65px;
  height: 65px;
}
.demo-swipe {
  img {
    width: 100%;
    display: block;
  }
}
.group-warp {
  margin-bottom: 20px;
}
.mui-flex,
.mui-flex *,
.mui-flex:after,
.mui-flex:before {
  box-sizing: border-box;
}
.mui-flex {
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.module-price {
  background-color: #fff;
  padding: 0 20px;
  .real-price {
    color: #ff0036;
    height: 72px;
    line-height: 72px;
  }
}
.icon-text {
  background-color: #fb6878;
  color: #fff;
  font-size: 24px;
  padding: 2px 4px;
}
.price-symbol {
  font-family: arial;
  font-style: normal;
  font-size: 36px;
  position: relative;
  top: 4px;
}
.price {
  font-size: 48px;
  position: relative;
  top: 4px;
  margin-right: 10px;
}
.module-title .share-warp {
  padding: 6px 20px 0 !important;
  background-color: #fff;
}
.module-title .main {
  font-size: 28px;
  color: #051b28;
  line-height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  max-height: 126px;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  overflow: hidden;
  word-break: break-all;
}
.module-title .share-div.share-hidden {
  display: none;
}
.module-title .share-div {
  text-align: center;
  line-height: 1;
  color: #a5a5a5;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
  margin-right: -10px;
}
.module-title .share-div .share-bd {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  background: #f4f4f4;
  padding: 5px 8px;
  border-top-left-radius: 10.24px;
  border-bottom-left-radius: 10.24px;
}
.module-adds {
  display: -webkit-box;
  display: flex;
  background-color: #fff;
  line-height: 60px;
  padding: 0 20px;
  font-size: 24px;
  color: #999;
  span {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
}
.module-adds span:first-child {
  text-align: left;
}
.module-adds span:last-child {
  text-align: right;
}
.module-prom {
  background-color: #fff;
}
.module-prom .prom-content {
  position: relative;
  padding: 24px 20px;
}
.module-prom .l {
  float: left;
  width: 60px;
  height: auto;
  color: #999;
  overflow: hidden;
}
.module-prom .activitylist {
  position: relative;
  margin-left: 60px;
  margin-right: 48px;
}
.mui-flex.align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.module-prom .activitylist .ic-box span {
  -webkit-transform: scale(0.7);
  -moz-transform: scale(0.7);
  transform: scale(0.7);
  display: block;
  border: 2px solid #fff5f7;
  background: #fff5f7;
  border-radius: 8px;
  padding: 2px 6px;
  font-size: 28px;
  line-height: 1;
  color: #ff0036;
  left: -15%;
  position: relative;
}
.module-prom .activitylist .box .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mui-flex > .cell {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 0;
  -webkit-flex-basis: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  max-width: 100%;
  display: block;
  padding: 0 !important;
  position: relative;
}
.module-advantage,
.module-advantage .logo,
.module-advantage .module-scene-wrap {
  background: #fff;
}
.module-advantage .module-scene-wrap .module-scene-item {
  position: relative;
  padding: 20px;
}
.module-advantage .module-scene-wrap .module-scene-item {
  position: relative;
  padding: 20px;
}
.module-scene-item > .l {
  float: left;
  width: 60px;
  height: auto;
  color: #999;
}
.module-scene-item > .r {
  margin-left: 60px;
  margin-right: 48px;
}
.module-advantage .module-scene-wrap .module-scene-item .service .server-list {
  position: relative;
  padding-right: 40px;
  color: #333;
  height: 36px;
  overflow: hidden;
}
.module-advantage
  .module-scene-wrap
  .module-scene-item
  .service
  .server-list
  li:first-child {
  content: "";
  padding-left: 0;
}
.module-advantage
  .module-scene-wrap
  .module-scene-item
  .service
  .server-list
  li {
  display: inline;
  padding-left: 12px;
}
.module-advantage
  .module-scene-wrap
  .module-scene-item
  .service
  .server-list
  li::before {
  content: "\00b7";
  padding-right: 12px;
}
.module-advantage
  .module-scene-wrap
  .module-scene-item
  .service
  > .service-item:nth-child(n + 2) {
  margin-top: 20px;
}
.module-advantage .module-scene-wrap .module-scene-item .service .special {
  color: #999;
  font-size: 20px;
  line-height: 24px;
}
.module-advantage .module-scene-wrap .module-scene-item .service .special img {
  float: left;
  height: 24px;
  margin-top: -2px;
  margin-right: 10px;
}
.module-review .mui-tagscloud {
  font-family: "Heiti SC";
  padding: 12px;
  background: #fff;
}
.module-review .mui-tagscloud .mui-tagscloud-title {
  font-size: 28px;
  line-height: 40px;
  color: #666;
  margin: 12px;
}
.module-review .mui-tagscloud .mui-tagscloud-ul {
  list-style-type: none;
  padding: 0;
  max-height: 76px;
  overflow: hidden;
}
.module-review .mui-tagscloud .mui-tagscloud-ul li {
  float: left;
  background-color: #fee;
  color: #666;
  margin: 12px 6px;
  padding: 12px 18px;
  text-align: center;
  border-radius: 52px;
  -moz-border-radius: 52px;
  font-size: 24px;
  line-height: 28px;
}
.module-review .mui-tagscloud .mui-tagscloud-comments {
  margin: 8px 12px;
}
.module-review .mui-tagscloud .mui-tagscloud-user {
  line-height: 32px;
  font-size: 24px;
  margin-bottom: 20px;
  position: relative;
}
.module-review .mui-tagscloud .mui-tagscloud-img {
  width: 48px;
  height: 48px;
  border-radius: 40px;
  -moz-border-radius: 40px;
  vertical-align: middle;
}
.module-review .mui-tagscloud .mui-tagscloud-name {
  vertical-align: middle;
  padding: 10px;
  line-height: 44px;
  color: #999;
}
.module-review .mui-tagscloud .mui-tagscloud-content {
  font-size: 26px;
  line-height: 32px;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  height: 64px;
  overflow: hidden;
  word-break: break-all;
}
.module-review .mui-tagscloud .mui-tagscloud-date {
  font-size: 20px;
  padding-top: 16px;
  color: #999;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.module-wrap:nth-child(2)[data-module="mods/module-askall/index"] {
  position: relative;
  background-color: #fff;
}
.module-wrap:nth-child(2)[data-module="mods/module-askall/index"]::before {
  display: block;
  content: "\020";
  clear: both;
  height: 2px;
  width: auto;
  position: absolute;
  left: 24px;
  background-color: #f5f5f5;
  top: -4px;
  right: 24px;
}
.module-askall {
  padding: 24px;
  background: #fff;
}
.module-askall .askall-wrap {
  font-family: "Heiti SC";
  display: block;
}
.module-askall .askall-title {
  font-size: 28px;
  line-height: 32px;
  font-weight: 400;
  color: #666;
}
.module-askall .askall-list {
  margin-top: 24px;
  list-style: none;
  color: #051b28;
}
.module-askall .askall-list > li {
  font-size: 26px;
  height: 50px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.module-askall .askall-list > li i.icon-ask {
  font-style: normal;
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(90deg, #ff7b3f, #ff5000);
  margin-right: 6px;
  border-radius: 4px;
}
.module-askall .askall-list > li span.answer-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.module-askall .askall-list > li span.answer-count {
  float: right;
  color: #999;
  font-family: Arial;
}

.module-desc .scrolltips .part-title {
  padding: 0 30%;
  text-align: center;
  color: #999;
  margin-bottom: 20px;
}

.mui-flex > .cell {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 0;
  -webkit-flex-basis: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  max-width: 100%;
  display: block;
  padding: 0 !important;
  position: relative;
}
.module-desc .scrolltips .part-title .txt {
  padding: 0 20px;
}
.module-desc .container {
  background: #fff;
  max-width: 100vw;
}
.module-desc .subtitle .newAttraction {
  line-height: 56px;
  padding: 20px;
  background: #fff;
  color: #051b28;
  text-align: center;
  overflow: hidden;
  font-size: 32px;
  font-weight: 400;
}

.module-desc #modules-desc img {
  display: block;
  margin: 0 auto;
  vertical-align: top;
  max-width: 100%;
  width: 100%;
}
.detail-header-bg {
  height: 88px;
  margin-top: -88px;
}
.header-dom.transparent {
  z-index: 2;
}

.header-dom {
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  line-height: 88px;
  height: 88px;
  overflow: visible;
}
.header-dom.transparent .main-dom {
  background: #fff;
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05), 0 0.5px 0 rgba(0, 0, 0, 0.09);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05), 0 0.5px 0 rgba(0, 0, 0, 0.09);
}
.smb-banner-top-show .header-dom.transparent .left-btns,
.smb-banner-top-show .header-dom.transparent .right-btns {
  padding-top: 14px;
}
.header-dom .left-btns a {
  margin-right: 10px;
}
.header-dom .left-btns {
  padding: 14px 0 14px 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.header-dom .icon-link {
  position: relative;
  height: 60px;
  width: 60px;
  display: block;
  -webkit-transition: color ease 0.2s, background-color ease 0.2s,
    fill ease 0.2s;
  transition: color ease 0.2s, background-color ease 0.2s, fill ease 0.2s;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}
.header-dom.transparent .header-nav {
  opacity: 1;
}
.header-dom .header-nav {
  text-align: center;
  font-size: 26px;
  opacity: 0;
  -webkit-transition: opacity ease 0.2s;
  transition: opacity ease 0.2s;
  margin: 0 8%;
  display: -webkit-box !important;
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.header-dom .header-nav li {
  color: #999;
  height: 88px;
  line-height: 88px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  border-bottom: 4px solid #fff;
}
.header-dom .header-nav .active {
  color: #ff0036;
  border-color: #ff0036;
}
.header-dom .right-btns {
  padding: 14px 20px 14px 0;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.header-dom.transparent .icon-link {
  background: 0 0;
  color: #999;
}
.header-dom.transparent .icon-link svg,
.header-dom.transparent .icon-link::before {
  color: #999;
}
.header-dom .icon-link svg,
.header-dom .icon-link::before {
  font-size: 40px;
  color: #fff;
  position: absolute;
  height: 40px;
  width: 40px;
  margin: 10px;
  text-align: center;
  fill: currentColor;
}
#s-actionBar-container {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 1;
  transform: translateZ(0);
}
#s-actionBar-container .action-bar-wrap {
  height: 100px;
  background-color: #fff;
  line-height: 100px;
  display: -webkit-box;
  display: flex;
  text-align: center;
  padding-bottom: var(--safe-area-inset-bottom);
}
.action-bar-wrap .trade {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: flex;
  text-align: center;
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.trade .cart {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #fff;
  background-color: #ff9500;
}
.trade .buy,
.trade .cart {
  font-size: 30px;
  line-height: 68px;
}
.action-bar-wrap .cart {
  background: #ff9500;
}
.trade a {
  display: block;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  line-height: 34px;
}
.trade .buy {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #fff;
}
.trade .buy,
.trade .ok {
  background-color: #ff0036;
}
.module-shop {
  padding: 20px;
  background-color: #fff;
}
.module-shop .shop-main {
  display: -webkit-box;
  display: flex;
  position: relative;
}
.module-shop .shop-main .shop-logo {
  width: 108px;
  min-width: 108px;
  height: 108px;
  border: 2px solid rgba(151, 151, 151, 0.5);
}
.module-shop .shop-main .shop-logo img {
  width: 100%;
  height: 100%;
}
.module-shop .shop-main .shop-info {
  -webkit-flex: 1;
  flex: 1;
  padding: 10px 20px;
  line-height: 36px;
  display: block;
}
.module-shop .shop-main .shop-info .shop-name {
  color: #333;
  font-size: 32px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  display: -webkit-box;
}
.module-shop .shop-main .shop-info .shop-title {
  font-size: 24px;
  color: #051b28;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.module-shop .shop-main .shop-info .shop-title img {
  height: 28px;
  margin-right: 4px;
  vertical-align: bottom;
  margin-bottom: 4px;
}
.module-shop .score {
  display: -webkit-box;
  display: flex;
  text-align: center;
  color: #999;
  font-size: 24px;
  margin: 24px 0 20px;
}
.module-shop .score li {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.module-shop .score li b {
  padding-right: 28px;
  background-position: 100% 50%;
  background-repeat: no-repeat;
  background-size: 24px;
  font-weight: 400;
}
.module-shop .score li b.up {
  color: #e13e4c;
  background-image: url("~assets/images/tools/wxToTb/up.png");
}
.module-shop .score li b.equal {
  color: #1193ce;
  background-image: url("~assets/images/tools/wxToTb/equal.png");
}
.module-shop .score li b.down {
  color: #1193ce;
  background-image: url("~assets/images/tools/wxToTb/down.png");
}
.mui-wpimagetext-item {
  width: 100%;
  .desc_anchor {
    display: none !important;
  }
  img {
    width: 100% !important;
  }
  table {
    width: 100% !important;
  }
}
</style>
