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
          :src="baseUrl + '/images/toolsIcon/wfx.png'"
          alt=""
        />
        <p class="fs-30 text-center cl-yellow font-bold mt-20">
          淘商转型必备神器
        </p>
      </div>

      <div
        ref="searchForm"
        class="seach-form mt-60 ml-30 mr-30 pd-30 bc-fff border-radius-10"
      >
        <div class="search-item pb-10">
          <span class="search-title fs-28 cl-main font-bold active"
            >填宝贝链接</span
          >
          <a
            class="search-title fs-28 cl-333 ml-30"
            href="https://support.qq.com/products/60627/faqs/50301"
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
          <div class="pt-20 position-relative">
            <van-icon
              name="search"
              class="search-icon"
              size="18px"
              color="#29a7e1"
            ></van-icon>
            <textarea
              class="search-content"
              name=""
              id=""
              v-model="searchParams.text"
              @focus="onFocus"
              placeholder="示例：请输入宝贝链接，例如【2019夏装新韩版时尚衬衫百褶连衣裙五分袖单排扣高腰系带长裙chic】https://m.tb.cn/h.eX32Cdm 点击链接，再选择浏览器咑閞；或復·制这段描述￥8fHkY1BkRa0￥后到淘♂♀"
            >
            </textarea>
          </div>
        </div>
        <div class="pb-30">
          <span class="cl-main" @click="showTips = true"
            >如何用手淘获取到宝贝的链接？</span
          >
        </div>
        <van-button
          size="large"
          type="primary"
          class="border-radius-10"
          @click="search"
          :loading="loading"
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
        <div class="point-content mt-20 cl-666 flex">
          <ul class="flex flex-1 wrap pl-40 pr-20 ">
            <li>
              <span class="fs-26">
                输入淘宝的宝贝链接，转换以后就可在微信打开
                （目前仅支持单品宝贝）
              </span>
            </li>
            <li>
              <span class="fs-26">
                发朋友圈或微信群可以用随手查生成的海报， 识别二维码进入宝贝详情
              </span>
            </li>
          </ul>
          <div class="wrap text-center">
            <div class="cl-333 font-bold">
              <span class="fs-20">
                长按看案例效果
              </span>
            </div>
            <img
              class="img-qrcode"
              src="~assets/images/tools/wxToTb/example.jpg"
              alt=""
            />
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

    <div class="tips-img" v-if="showTips" @click="showTips = false">
      <img src="~assets/images/tools/wxToTb/tips.png" alt="" />
    </div>

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
import api from "@/api";
import { getStorage } from "@/config/utils";
import { Button, Icon } from "vant";
import LoginDialog from "@/components/LoginDialog";
import BuyShare from "@/components/BuyAndShare";
import ContactUs from "@/components/ContactUs";
import ToolsGuide from "@/components/ToolsGuide";
import ToolsCustomBottom from "@/components/ToolsCustomBottom";

export default {
  name: "ToolsCpm",
  components: {
    LoginDialog,
    BuyShare,
    ContactUs,
    ToolsGuide,
    vanButton: Button,
    vanIcon: Icon,
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
      showTips: false,
      showLogin: false,
      isWechatLogin: false,
      searchParams: {
        text: null
      },
      changeHistory: 1,
      loading: false,
      showFuncBg: this.baseUrl + "/images/toolsIcon/01.jpg",
      shareObj: {
        title: "真厉害，能在微信打开淘寳的链接咯，快戳我！",
        desc: "在吗？我有好东西和你分享嘿，赶紧来看看啊！",
        imgUrl:
          window.location.origin + this.baseUrl + "/images/toolsIcon/wfx.png"
      }
    };
  },
  methods: {
    onFocus() {
      const _this = this;
      setTimeout(function() {
        let pos = _this.$refs.searchForm.offsetTop + 10;
        window.scrollTo(0, pos);
      }, 200);
    },
    // 获取在子搜索框组件中传值到父组件
    getSearchVal(data) {
      this.searchQuery[data[0]].value = data[1];
    },
    getWxfparseItemText() {
      let _this = this;
      _this.loading = true;
      api.getWxfparseItemText(_this.searchParams).then(res => {
        if (res.success) {
          _this.$router.push({
            path: "/wxToTbTransfer",
            query: { resultId: res.result.id }
          });
        } else {
          _this.$dialog.alert({
            message: res.message || "宝贝链接有误"
          });
        }
        _this.loading = false;
      });
    },
    // 搜索
    search() {
      const _this = this;
      if (!_this.searchParams.text) {
        _this.$Toast("请输入宝贝链接!");
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
        } else {
          _this.getWxfparseItemText();
        }
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
  .tips-img {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11111;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
  }
  .cpm-content {
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
          position: absolute;
          top: 36px;
          left: 20px;
        }
        .search-content {
          border: 2px solid #29a7e1;
          border-radius: 10px;
          height: 221px;
          width: 100%;
          padding: 16px 40px 16px 60px;
          ::-webkit-input-placeholder {
            color: #8c8c8c;
          }
        }
      }
      .search-times {
        .search-times-text {
          height: 22px; /*no*/
          line-height: 22px; /*no*/
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
        li {
          list-style: disc;
          font-size: 22px;
          line-height: 38px;
          margin-bottom: 5px;
        }
      }
    }
    .point-img {
      width: 100%;
      position: fixed;
      bottom: 50px; /*no*/
    }
  }
  .img-qrcode {
    width: 118px;
    height: 118px;
    margin-top: 2px;
  }
}
</style>
