<template>
  <div class="tools-cpm-wrap position-relative">
    <div class="cpm-content position-relative">
      <img
        class="bg position-absolute"
        src="~assets/images/tools/cpm/bg.png"
        alt=""
      />
      <div class="top-icon-tip pt-50">
        <img
          class="tools-icon mg-auto"
          :src="baseUrl + '/images/toolsIcon/cpm.png'"
          alt=""
        />
        <p class="fs-30 text-center cl-yellow font-bold mt-20">
          填写关键词，查看排名
        </p>
      </div>

      <div
        ref="searchForm"
        class="seach-form mt-60 ml-30 mr-30 pd-30 bc-fff border-radius-10"
      >
        <div class="search-item pb-20">
          <span class="search-title fs-28 cl-main font-bold active"
            >搜索关键词</span
          >
          <a
            class="search-title fs-28 cl-333 ml-30"
            href="https://support.qq.com/products/60627/faqs/50286"
            >查看指引</a
          >
          <div class="contact-us-tools right" @click="isShowContactUs = true">
            <img
              class="contact-img mr-10"
              src="~assets/images/tools/cpm/contact.png"
              alt=""
            />
            <span class="cl-666 fs-26">联系导师</span>
          </div>
          <div class="pt-20 pb-20">
            <search-input
              :queryName="searchQuery.searchKey.queryName"
              :changeHistory="changeHistory"
              placeholder="请输入关键词,例如: 零食大礼包"
              @getSearchVal="getSearchVal"
              @focus="onFocus"
            ></search-input>
          </div>
        </div>
        <div class="search-item pb-20">
          <span
            :class="
              queryType === 'shop'
                ? 'search-title active fs-28 cl-main font-bold'
                : 'search-title fs-28'
            "
            @click="queryType = 'shop'"
            >店铺</span
          >
          <span
            :class="
              queryType === 'goods'
                ? 'search-title active fs-28 cl-main font-bold mr-30 ml-30'
                : 'search-title fs-28 ml-30'
            "
            @click="queryType = 'goods'"
            >宝贝</span
          >
          <div class="pt-20 pb-20">
            <search-input
              v-if="queryType === 'shop'"
              :queryName="searchQuery.shopInfo.queryName"
              :changeHistory="changeHistory"
              placeholder="请输入店铺的掌柜旺旺号,例如: 良品铺子旗舰店"
              @getSearchVal="getSearchVal"
              @focus="onFocus"
            ></search-input>

            <div class="position-relative" v-if="queryType === 'goods'">
              <img
                class="search-icon"
                src="~assets/images/tools/cpm/search.png"
                alt=""
              />
              <textarea
                @focus="onFocus"
                class="search-content"
                v-model="searchQuery.itemInfo.value"
                placeholder="示例：请输入宝贝链接，例如【2019夏装新韩版时尚衬衫百褶连衣裙五分袖单排扣高腰系带长裙chic】https://m.tb.cn/h.eX32Cdm 点击链接，再选择浏览器咑閞；或復·制这段描述￥8fHkY1BkRa0￥后到淘♂♀"
              >
              </textarea>
            </div>
          </div>
        </div>
        <van-button
          size="large"
          type="primary"
          class="border-radius-10"
          @click="sure"
          >立即查询</van-button
        >
        <buy-share
          :showFuncBg="showFuncBg"
          :shareObj="shareObj"
          @loginFunc="loginFunc"
        ></buy-share>
      </div>

      <div class="tools-point ml-30 mr-30 mt-30">
        <div class="title clear">
          <img src="~assets/images/tools/cpm/point.png" class="left" alt="" />
          <div class="cl-main fs-24 font-bold left ml-15">工具亮点</div>
        </div>
        <div class="point-content mt-20 cl-666 fs-26">
          <div>
            <li></li>
            <p>
              排名实时更新，查询完成后可收藏分享，随时随地查看；
            </p>
          </div>
          <div>
            <li></li>
            <p>
              同行、自己店铺和商品排名一目了然，支持TOP100；
            </p>
          </div>
          <div>
            <li></li>
            <p>
              排除千人千面个性化影响,排名更加客观真是,能准确的知道商品的实际排名和权重,查询快速、准确、稳定.
            </p>
          </div>
        </div>
      </div>
      <ToolsCustomBottom></ToolsCustomBottom>
    </div>

    <!--登录弹框-->
    <login-dialog
      :showLogin="showLogin"
      :isWechatLogin="isWechatLogin"
      @on-close="showLogin = false"
    ></login-dialog>

    <!--联系导师-->
    <contact-us
      :isShow="isShowContactUs"
      @on-close="isShowContactUs = false"
    ></contact-us>

    <!--未填店铺弹窗-->
    <van-dialog
      v-model="showSearchTip"
      title="查询提示"
      :closeOnClickOverlay="true"
      :show-cancel-button="true"
      @confirm="search"
    >
      <p class="mt-30 ml-30 fs-26 text-center cl-999">
        {{ queryType === "goods" ? "未指定具体宝贝." : "未指定店铺旺旺号." }}
      </p>
      <p class="mt-10 ml-30 mb-50 fs-26 text-center cl-999">
        将为您展现该关键词TOP100的宝贝
      </p>
    </van-dialog>
    <!--新手指引弹窗-->
    <tools-guide></tools-guide>
  </div>
</template>

<script>
// import api from "@/api";
import { getStorage } from "@/config/utils";
import SearchInput from "@/components/SearchWithHistoy";
import BuyShare from "@/components/BuyAndShare";
import { Button } from "vant";
import LoginDialog from "@/components/LoginDialog";
import ContactUs from "@/components/ContactUs";
import ToolsGuide from "@/components/ToolsGuide";
import ToolsCustomBottom from "@/components/ToolsCustomBottom";

export default {
  name: "ToolsCpm",
  components: {
    LoginDialog,
    SearchInput,
    BuyShare,
    ContactUs,
    ToolsGuide,
    vanButton: Button,
    ToolsCustomBottom
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
        : "随手查";
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  data() {
    return {
      showLogin: false,
      showSearchTip: false,
      isWechatLogin: false,
      isShowContactUs: false,
      queryType: "shop",
      searchQuery: {
        searchKey: {
          queryName: "searchKey",
          value: ""
        },
        shopInfo: {
          queryName: "shopInfo",
          value: ""
        },
        itemInfo: {
          queryName: "itemInfo",
          value: ""
        }
      },
      changeHistory: 1,
      showFuncBg: this.baseUrl + "/images/toolsIcon/02.jpg",
      shareObj: {
        title: "随时随地查排名，一键掌握排名提升，快戳我！",
        desc: "在吗？你想知道TOP100的宝贝产品都有哪些吗？",
        imgUrl:
          window.location.origin + this.baseUrl + "/images/toolsIcon/cpm.png"
      }
    };
  },
  methods: {
    onFocus() {
      let pos = this.$refs.searchForm.offsetTop + 10;
      window.scrollTo(0, pos);
    },
    // 获取在子搜索框组件中传值到父组件
    getSearchVal(data) {
      this.searchQuery[data[0]].value = data[1];
    },
    // 立即搜索
    sure() {
      const _this = this;
      if (!_this.searchQuery.searchKey.value) {
        _this.$Toast("请输入关键词搜索!");
        return;
      }
      if (
        (!_this.searchQuery.shopInfo.value && _this.queryType === "shop") ||
        (!_this.searchQuery.itemInfo.value && _this.queryType === "goods")
      ) {
        _this.showSearchTip = true;
      } else {
        _this.search();
      }
    },
    // 搜索
    search() {
      const _this = this;
      _this.changeHistory++; //添加历史搜素记录
      if (!_this.isLogin) {
        _this.isWechatLogin = !!(
          _this.$store.state.authed && getStorage("token")
        );
        _this.showLogin = true;
      } else {
        if (_this.$store.state.energy.balance < 20) {
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
              // on cancel
            });
          return;
        }
        let query;
        if (_this.queryType === "goods") {
          query = {
            [_this.searchQuery.searchKey.queryName]:
              _this.searchQuery.searchKey.value,
            itemInfo: this.searchQuery.itemInfo.value,
            queryType: _this.queryType
          };
        } else {
          query = {
            [_this.searchQuery.searchKey.queryName]:
              _this.searchQuery.searchKey.value,
            [_this.searchQuery.shopInfo.queryName]:
              _this.searchQuery.shopInfo.value,
            queryType: _this.queryType
          };
        }
        setTimeout(function() {
          _this.$router.push({ path: "/tools-cpm-result", query: query });
        }, 10);
      }
    },
    loginFunc() {
      let _this = this;
      _this.isWechatLogin = !!(
        _this.$store.state.authed && getStorage("token")
      );
      _this.showLogin = true;
    }
  }
};
</script>

<style scoped lang="scss">
.tools-cpm-wrap {
  min-height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  padding-bottom: 20px;
  .cpm-content {
    .contact-us-tools {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .contact-img {
        width: 30px;
        height: 30px;
      }
    }
    .bg {
      width: 100%;
      top: 0;
      z-index: -1;
    }
    .top-icon-tip {
      .tools-icon {
        width: 150px;
        height: 150px;
      }
    }
    .seach-form {
      .search-item {
        .search-title {
          line-height: 50px;
          display: inline-block;
        }
        .active {
          border-bottom: 3px solid #29a7e1;
          color: #29a7e1;
        }
        .search-icon {
          width: 18px; /*no*/
          height: 18px; /*no*/
          position: absolute;
          top: 20px;
          left: 20px;
        }
        .search-content {
          border: 1px solid #9fe1ff; /*no*/
          border-radius: 10px;
          height: 221px;
          width: 100%;
          padding: 16px 40px 16px 60px;
          ::-webkit-input-placeholder {
            color: #8c8c8c;
          }
        }
      }
    }
    .tools-point {
      .title {
        overflow: hidden;
        img {
          height: 35px;
        }
        div {
          height: 35px;
          line-height: 39px;
        }
      }
      .point-content {
        div {
          display: flex;
          li {
            list-style: disc;
            margin-bottom: 5px;
          }
          p {
            line-height: 45px;
          }
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
