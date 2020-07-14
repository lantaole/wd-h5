<template>
  <div class="tools-cxh-wrap position-relative">
    <div class="cxh-content position-relative">
      <img
        class="bg position-absolute"
        src="~assets/images/tools/cpm/bg.png"
        alt=""
      />
      <div class="top-icon-tip pt-50">
        <img
          class="tools-icon mg-auto"
          :src="baseUrl + '/images/toolsIcon/cxh.png'"
          alt=""
        />
        <p class="fs-30 text-center cl-yellow font-bold mt-20">
          随时随地检测买家账号
        </p>
      </div>

      <div
        ref="searchForm"
        class="seach-form mt-60 ml-30 mr-30 pd-30 bc-fff border-radius-10"
      >
        <div class="search-item pb-20">
          <span class="search-title fs-28 cl-main font-bold active">账号</span>
          <a
            class="search-title fs-28 cl-333 ml-30"
            href="https://support.qq.com/products/60627/faqs/50293"
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
          <!--<router-link to="/tools-mark-account"-->
          <!--&gt;<span class="search-title fs-26 cl-main font-bold right text-line"-->
          <!--&gt;有可疑账号,去标记</span-->
          <!--&gt;</router-link-->
          <!--&gt;-->
          <div class="pt-20 pb-20">
            <van-search
              placeholder="请输入淘宝账号进行查询, 例如: 快乐网吧888"
              v-model="searchVal"
              @focus="onFocus"
            >
              <img
                slot="left-icon"
                class="search-icon-slot"
                src="~assets/images/tools/cpm/search.png"
                alt=""
              />
            </van-search>
          </div>
        </div>
        <van-button
          size="large"
          type="primary"
          class="border-radius-10"
          @click="search"
          >立即查询</van-button
        >
        <buy-share
          :showFuncBg="showFuncBg"
          :shareObj="shareObj"
          @loginFunc="loginFunc"
        ></buy-share>
      </div>

      <div class="tools-point ml-30 mr-30 mt-30">
        <div class="title">
          <img src="~assets/images/tools/cpm/point.png" class="left" alt="" />
          <div class="cl-main fs-24 font-bold left ml-15">工具亮点</div>
        </div>
        <div class="point-content mt-20 cl-666">
          <div>
            <li></li>
            <p>
              注册时间<span class="cl-red">小于30天的</span>, 被认定为小号/新号,
              容易给中差评, 或有可能是骗子, 应当谨慎交易!
            </p>
          </div>
          <div>
            <li></li>
            <p>
              当一周信用点数<span class="cl-red">超过20点</span
              >(常购物的买家大号除外), 有可能这个号被淘宝列入黑名单,
              他再拍的东西可能会被认为虚假交易,
              <span class="cl-red">卖家会有降权风险</span>.
            </p>
          </div>
          <div>
            <li></li>
            <p>
              该工具可以查询<span class="cl-red">买家中差评数量</span>以及<span
                class="cl-red"
                >中差评</span
              >信息, 如果该用户的数量超过一定的比例, 则有可能是中差评师,
              要十分注意了! 谨慎交易, 避免不必要的麻烦!
            </p>
          </div>
        </div>
      </div>
      <ToolsCustomBottom></ToolsCustomBottom>
    </div>

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

    <!--新手指引弹窗-->
    <tools-guide></tools-guide>
  </div>
</template>

<script>
import { getStorage } from "@/config/utils";
import { Button, Search } from "vant";
import LoginDialog from "@/components/LoginDialog";
import BuyShare from "@/components/BuyAndShare";
import ContactUs from "@/components/ContactUs";
import ToolsGuide from "@/components/ToolsGuide";
import ToolsCustomBottom from "@/components/ToolsCustomBottom";

export default {
  name: "ToolsCxh",
  components: {
    LoginDialog,
    BuyShare,
    ContactUs,
    ToolsGuide,
    vanButton: Button,
    vanSearch: Search,
    ToolsCustomBottom
  },
  computed: {
    // 用户登录状态
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  data() {
    return {
      isShowContactUs: false,
      showLogin: false,
      isWechatLogin: false,
      searchVal: "",
      showFuncBg: this.baseUrl + "/images/toolsIcon/toolsShareBg/cxh.png",
      shareObj: {
        title: "随时随地查号验号，放心用高质量号，快戳我！",
        desc: "黑号？诈骗号？一网打尽无处遁形！",
        imgUrl:
          window.location.origin + this.baseUrl + "/images/toolsIcon/cxh.png"
      }
    };
  },
  methods: {
    onFocus() {
      let pos = this.$refs.searchForm.offsetTop + 10;
      window.scrollTo(0, pos);
    },
    // 搜索
    search() {
      const _this = this;
      if (!_this.searchVal) {
        _this.$Toast("请输入账号搜索!");
        return;
      }
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
        let query = {
          searchVal: this.searchVal
        };
        setTimeout(function() {
          _this.$router.push({ path: "/tools-cxh-result", query: query });
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

<style lang="scss">
.tools-cxh-wrap {
  min-height: 100%;
  background-color: #edf9ff;
  z-index: 0;
  padding-bottom: 20px;
  .cxh-content {
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
      .search-item {
        .search-title {
          line-height: 50px;
          display: inline-block;
        }
        .active {
          border-bottom: 3px solid #29a7e1;
          color: #29a7e1;
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
