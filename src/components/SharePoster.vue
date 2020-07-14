<template>
  <div>
    <van-dialog
      v-model="show"
      :overlay="overlay"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
      class="share-popup"
    >
      <div class="bc-trans canvas-shade" ref="shade"></div>
      <img
        class="howToShare position-absolute"
        src="~assets/images/common/howToShare.png"
        alt=""
      />

      <div
        class="scroll-box"
        ref="scrollBox"
        :style="canvasBoxObj"
        @click="closeShareFuncDialog"
      >
        <p class="top-tips-text fs-30 font-bold text-center mb-20">
          点击右上角 分享给好友
        </p>
        <div ref="canvasBox">
          <div class="canvas-box">
            <p
              v-show="!convertCanvasToImageSrc"
              class="cl-main text-center fs-32 font-bold"
              style="padding-top: 200px; padding-bottom: 300px;"
            >
              加载中...
            </p>
            <canvas
              v-show="!convertCanvasToImageSrc"
              id="shareCanvas"
              width="690px"
              height="925px"
            >
            </canvas>
            <img
              v-show="convertCanvasToImageSrc"
              :src="convertCanvasToImageSrc"
              alt=""
            />
          </div>
          <p class="cl-fff fs-28 font-bold text-center mt-20">
            长按上方图片即可转发或保存
          </p>
        </div>
      </div>
      <div id="qrcode" v-show="false" ref="qrcodeBox"></div>
    </van-dialog>
  </div>
</template>

<script>
import api from "@/api";
import {
  getStorage,
  getCurrentWeek,
  getCurrentMonthEnglish
} from "@/config/utils";
import QRcode from "qrcodejs2";
export default {
  name: "ShareCxhResult",
  components: {},
  props: {
    showShareDialog: {
      type: Boolean,
      default: false
    },
    shareUserName: {
      type: String
    },
    qrCodeStyle: {
      type: Object
    },
    posterItem: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      overlay: true,
      ratio: 1,
      canvasBoxObj: {
        marginTop: 0
      },
      changeStatus: true,
      convertCanvasToImageSrc: null,
      qrcodeString: null,
      dateParams: {}
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {
    this.getDate();
  },
  mounted() {},
  computed: {},
  methods: {
    getDate() {
      let curTime = new Date();
      let year = curTime.getFullYear();
      let month =
        curTime.getMonth() + 1 > 9
          ? curTime.getMonth() + 1
          : "0" + (curTime.getMonth() + 1);
      let week = getCurrentWeek(curTime.getDay());
      let day = curTime.getDate();
      let monthEn = getCurrentMonthEnglish(curTime.getMonth());
      this.dateParams = {
        year,
        month,
        day,
        week,
        monthEn
      };
    },
    getShareUrl() {
      let _this = this;
      let referrerId = getStorage("token")
        ? getStorage("token").split("_")[0]
        : "";
      let fromPage = this.$route.meta.markName;
      let url =
        window.location.origin +
        "/about-us" +
        "?fromPage=" +
        fromPage +
        "&referrerId=" +
        referrerId +
        "&channel=user_recommend&source=official_accounts";
      api
        .getShareUrl({
          url: url
        })
        .then(res => {
          if (res.success) {
            _this.drawInit(res);
          } else {
            _this.drawInit();
          }
        });
    },
    drawInit(res) {
      let _this = this;
      if (res) _this.qrcodeString = res.result;
      let canvas = document.getElementById("shareCanvas");
      let context = canvas.getContext("2d");
      let ratio = getPixelRatio(context);
      let drawObj = {
        codeBorder: {
          width: 690,
          height: 925,
          x: 0,
          y: 0
        }
      };
      _this.ratio = ratio;
      canvas.style.width = parseInt(canvas.style.width) * ratio + "px";
      canvas.style.height = parseInt(canvas.style.height) * ratio + "px";
      context.clearRect(0, 0, canvas.style.width, canvas.style.height);
      context.beginPath();
      // drawText(context, ratio);
      _this.$nextTick(async function() {
        if (res) _this.qrcode(_this.ratio);
        let canvas2 = _this.$refs.qrcodeBox.children[0];
        // 背景图
        await drawImg(
          context,
          ratio,
          {
            width: drawObj.codeBorder.width,
            height: drawObj.codeBorder.height,
            src: _this.posterItem.backgroundImage
          },
          0,
          0
        );
        await drawImg(
          context,
          ratio,
          {
            width: 28 * 2,
            height: 39 * 2,
            src:
              _this.baseUrl + "/upload/6872e933-c805-450e-a921-81c65584c190.png"
          },
          30,
          65
        );
        // 日
        drawTextDate(
          _this.dateParams.day,
          false,
          "#fff",
          "bold 120px DINCond-Black",
          660,
          160
        );
        // 月份
        drawTextDate(
          `${_this.dateParams.year}.${_this.dateParams.month} | ${_this.dateParams.monthEn}`,
          false,
          "#fff",
          "30px FZXIJINLJW--GB1-0",
          660,
          210
        );
        // 星期
        drawText(
          _this.dateParams.week,
          false,
          "#fff",
          "30px FZXIJINLJW--GB1-0",
          660 - _this.dateParams.week.length * 30,
          270
        );
        // 语录部分
        // 语录标题
        drawText(
          _this.posterItem.title,
          false,
          "#fff",
          "bold 40px FZXIJINLJW--GB1-0",
          30,
          855 - _this.posterItem.lines * 40 - 100
        );
        // 横线
        drawLine(855 - _this.posterItem.lines * 40 - 70);
        // 语录主体内容
        drawTextMultiLine(
          _this.posterItem.content,
          false,
          "#fff",
          "26px FZXIJINLJW--GB1-0",
          30,
          855 - _this.posterItem.lines * 40 - 20
        );
        // 语录出处
        /*  drawTextDate(
          _this.posterItem.source,
          false,
          "#fff",
          "26px FZXIJINLJW--GB1-0",
          660,
          805
        );*/
        // 分享人昵称
        drawText("来自", false, "#666", "16px  FZXIJINLJW--GB1-0", 70, 870);
        drawText(
          "@" + _this.shareUserName,
          false,
          "#FF592B",
          "16px  FZXIJINLJW--GB1-0",
          102,
          870
        );
        drawText(
          "的分享，做电商，重要的是思维和技巧",
          false,
          "#666",
          "16px  FZXIJINLJW--GB1-0",
          102 + _this.shareUserName.length * 16 + 18,
          870
        );
        // 底部关注随手查图片
        await drawImg(
          context,
          ratio,
          {
            width: 300,
            height: 22,
            src:
              _this.baseUrl + "/upload/b58159ed-2ead-464d-8bb3-b1595ab51254.png"
          },
          70,
          885
        );
        // 二维码
        if (res) {
          context.drawImage(
            canvas2,
            560 * ratio,
            845 * ratio,
            // _this.qrCodeStyle.y * ratio,
            67 * ratio,
            67 * ratio
          );
        } else {
          // 未登录二维码图片
          await drawImg(
            context,
            ratio,
            {
              width: 67,
              height: 67,
              src:
                _this.baseUrl +
                "/upload/f1151e37-1141-4463-b432-daebd6d87afe.png"
            },
            560,
            845
          );
        }
        convertCanvasToImage(canvas);
      });
      // 普通绘制文字
      function drawText(text, isCenter, color, fontstyle, x, y) {
        context.font = fontstyle;
        if (isCenter) {
          context.textAlign = "center";
        }
        context.fillStyle = color;
        context.fillText(text, x, y);
      }
      // 文字多行显示
      function drawTextMultiLine(text, isCenter, color, fontstyle, x, y) {
        context.font = fontstyle;
        if (isCenter) {
          context.textAlign = "center";
        }
        context.fillStyle = color;
        for (let i = 0; i < Math.ceil(text.length / 24); i++) {
          let textStr = text.slice(i * 24, (i + 1) * 24);
          context.fillText(textStr, x, y + i * 40);
        }
      }
      // 文字多行显示最多三行
      /*function drawTextContext(text, isCenter, color, fontstyle, x, y) {
        context.font = fontstyle;
        if (isCenter) {
          context.textAlign = "center";
        }
        context.fillStyle = color;
        if (context.measureText(text).width > 630) {
          let itemWidth = context.measureText(text).width / text.length;
          let start = Math.floor(630 / itemWidth);
          let firstStr = text.slice(0, start);
          let secondStr = text.slice(start);
          if (context.measureText(secondStr).width > 630) {
            let secondItemWidth =
              context.measureText(secondStr).width / secondStr.length;
            let secondStart = Math.floor(630 / secondItemWidth);
            let threeStr = secondStr.slice(0, secondStart);
            let fourStr = secondStr.slice(secondStart);
            context.fillText(firstStr, x, y);
            context.fillText(threeStr.toString(), x, y + 35);
            context.fillText(fourStr.toString(), x, y + 70);
          } else {
            context.fillText(firstStr, x, y);
            context.fillText(secondStr, x, y + 35);
          }
        } else {
          context.fillText(text, x, y);
        }
      }*/
      // 绘制文字文字靠右排列
      function drawTextDate(text, isCenter, color, fontstyle, x, y) {
        context.font = fontstyle;
        if (isCenter) {
          context.textAlign = "center";
        }
        context.fillStyle = color;
        context.fillText(text, x - context.measureText(text).width, y);
      }
      // 绘制横实线
      function drawLine(y) {
        context.moveTo(30, y);
        context.lineTo(660, y);
        context.lineWidth = 1;
        context.strokeStyle = "#ddd";
        context.stroke();
      }
      function drawImg(context, ratio, styleObj, x, y) {
        return new Promise(function(resolve) {
          // 对图片先缩小再放大
          let img = new Image();
          img.setAttribute("crossOrigin", "anonymous");
          let imgWidth = styleObj.width * ratio;
          let imgHeight = styleObj.height * ratio;
          img.src = styleObj.src;
          // 绘制图片
          //当图片准备以后再绘制
          img.onload = function() {
            //绘制图片,按照图片本身的大小进行加载
            context.drawImage(img, x * ratio, y * ratio, imgWidth, imgHeight);
            resolve();
          };
        });
      }
      function getPixelRatio(context) {
        let backingStore =
          context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        return (window.devicePixelRatio || 1) / backingStore;
      }

      function convertCanvasToImage(canvas) {
        _this.convertCanvasToImageSrc = canvas.toDataURL("image/png");
      }
    },
    qrcode() {
      let _this = this;
      // document.getElementById("qrcode").innerHTML = "";
      new QRcode("qrcode", {
        width: _this.qrCodeStyle.width,
        height: _this.qrCodeStyle.height, // 高度
        text: _this.qrcodeString // 二维码内容
      });
    },
    setCanvasTopFunc() {
      let _this = this;
      _this.canvasBoxObj.marginTop =
        (_this.$refs.shade.offsetHeight - _this.$refs.canvasBox.offsetHeight) /
          2 -
        30 +
        "px";
    },
    closeShareFuncDialog() {
      let _this = this;
      _this.$emit("closeShareDialog");
    }
  },
  watch: {
    showShareDialog: function(val) {
      let _this = this;
      _this.show = val;
      if (_this.changeStatus) {
        _this.$nextTick(function() {
          _this.setCanvasTopFunc();
          _this.getShareUrl();
          _this.changeStatus = false;
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.share-popup {
  width: 100%;
  height: 100%;
  .van-dialog__content {
    width: 100%;
    height: 100%;
  }
  .howToShare {
    width: 230px;
    right: 20px;
    top: 0;
  }
  .canvas-shade {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    opacity: 0.8;
  }
  .scroll-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .top-tips-text {
      color: orange;
    }
    .canvas-box {
      width: 690px;
      height: 925px;
      margin: auto;
      background-color: transparent;
      overflow: hidden;
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .share-bottom {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    margin-top: 18px;
    .share-bottom-title {
      padding-bottom: 20px;
      padding-top: 20px;
      hr {
        width: 100%;
        height: 1px;
        background-color: #d2d2d2;
      }
    }
    .share-bottom-list {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      > div {
        margin: 0 45px;
        img {
          width: 76px;
          height: 76px;
        }
      }
    }
    .closed-box {
      margin-top: 16px;
      img {
        width: 58px;
        height: 58px;
      }
    }
  }
}
</style>
