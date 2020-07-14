<template>
  <div>
    <van-dialog
      v-model="show"
      :overlay="overlay"
      :showConfirmButton="false"
      class="share-popup"
    >
      <div class="bc-fff canvas-shade" ref="shade"></div>
      <img
        class="howToShare position-absolute"
        src="~assets/images/common/howToShare.png"
        alt=""
      />
      <div class="scroll-box" ref="scrollBox" :style="canvasBoxObj">
        <p class="top-tips-text fs-30 font-bold text-center mb-20">
          点击右上角 分享给好友
        </p>
        <div class="canvas-box" ref="canvasBox">
          <canvas
            v-show="!convertCanvasToImageSrc"
            id="shareCanvas"
            width="530px"
            height="780px"
          >
          </canvas>
          <img
            v-show="convertCanvasToImageSrc"
            :src="convertCanvasToImageSrc"
            alt=""
            class="border-radius-20"
          />
        </div>
        <p class="cl-fff fs-28 font-bold text-center mt-20">
          长按上方图片即可转发或保存
        </p>
        <div class="share-bottom" ref="shareBottom">
          <div class="share-bottom-list" v-if="false">
            <div class="flex-column text-center align-center">
              <img src="~assets/images/tools/wxToTb/share_01.png" alt="" />
              <span class="fs-24 cl-fff pt-10">分享好友</span>
            </div>
            <div class="fs-24 flex-column text-center align-center">
              <img src="~assets/images/tools/wxToTb/share_02.png" alt="" />
              <span class="fs-24 cl-fff pt-10">一键发圈</span>
            </div>

            <input
              type="text"
              v-model="commodityDescPwd"
              id="copy_text"
              style="display: none;"
            />
            <div
              class="fs-24 flex-column text-center align-center"
              id="copyTbPwd"
              ref="copy"
              data-clipboard-target="#copy_text"
            >
              <img src="~assets/images/tools/wxToTb/share_03.png" alt="" />
              <span class="fs-24 cl-fff pt-10"> 复制口令</span>
            </div>
          </div>
          <div class="flex align-center closed-box justify-center pt-10">
            <img
              @click="closeShareDialogFunc"
              src="~assets/images/tools/wxToTb/closed.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div id="qrcode" v-show="false" ref="qrcodeBox"></div>
    </van-dialog>
  </div>
</template>

<script>
// import api from "@/api";
import { zoomOutTaobaoImg } from "@/config/utils";
import Clipboard from "clipboard";
import QRcode from "qrcodejs2";
export default {
  name: "ShareDialog",
  components: {},
  props: {
    commodityDesc: {
      type: Object
    },
    commodityDescLink: {
      type: String
    },
    showShareDialog: {
      type: Boolean,
      default: false
    },
    commodityDescPwd: {
      default: false
    }
  },
  data() {
    return {
      show: false,
      overlay: false,
      ratio: 1,
      canvasBoxObj: {
        marginTop: 0
      },
      copyBtn: null,
      convertCanvasToImageSrc: null,
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
      commodityDescSeller: {},
      changeStatus: true
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {},
  mounted() {
    let _this = this;
    _this.dataInit();
    _this.$nextTick(function() {
      _this.copyBtn = new Clipboard("#copyTbPwd");
      let clipboard = _this.copyBtn;
      clipboard.on("success", function() {
        _this.$Toast("复制成功");
      });
      clipboard.on("error", function() {
        _this.$Toast("复制失败，请手动复制");
      });
    });
  },
  methods: {
    drawInit() {
      let _this = this;
      let canvas = document.getElementById("shareCanvas");
      let context = canvas.getContext("2d");
      let ratio = getPixelRatio(context);
      let drawObj = {
        codeBorder: {
          width: 146,
          height: 146,
          x: 367 * ratio,
          y: 25 * ratio
        },
        qrCode: {
          width: 110,
          height: 110,
          x: 386 * ratio,
          y: 36 * ratio
        },
        desc: {
          width: 496,
          height: 496,
          x: 15 * ratio,
          y: 185 * ratio
        }
      };
      _this.ratio = ratio;
      canvas.style.width = parseInt(canvas.style.width) * ratio + "px";
      canvas.style.height = parseInt(canvas.style.height) * ratio + "px";
      context.clearRect(0, 0, canvas.style.width, canvas.style.height);
      // 将canvas的透明背景设置成白色
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        // 当该像素是透明的，则设置成白色
        if (imageData.data[i + 3] == 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
        }
      }
      context.putImageData(imageData, 0, 0);
      canvas.style.borderRadius = "10px";
      context.beginPath();
      drawText(context, ratio);
      _this.$nextTick(function() {
        _this.qrcode(_this.ratio);
        let canvas2 = _this.$refs.qrcodeBox.children[0];
        let itemImg =
          _this.commodityDesc.item.images[
            Math.floor(Math.random() * _this.commodityDesc.item.images.length)
          ];
        context.drawImage(
          canvas2,
          drawObj.qrCode.x,
          drawObj.qrCode.y,
          canvas2.width * ratio,
          canvas2.height * ratio
        );
        drawImg(
          context,
          ratio,
          {
            width: drawObj.codeBorder.width,
            height: drawObj.codeBorder.height,
            src: `${_this.baseUrl}/images/toolsIcon/code_border.png`
          },
          drawObj.codeBorder.x,
          drawObj.codeBorder.y
        ).then(function() {
          drawImg(
            context,
            ratio,
            {
              width: drawObj.desc.width,
              height: drawObj.desc.height,
              src: zoomOutTaobaoImg(itemImg, "_300x300.")
            },
            drawObj.desc.x,
            drawObj.desc.y
          ).then(function() {
            convertCanvasToImage(canvas);
          });
        });
      });

      function drawText(context) {
        context.font = "20px PingFang-SC-Bold";
        context.fillStyle = "#333333";
        let text1 = null;
        let text2 = null;
        if (_this.commodityDescItem.title.length <= 16) {
          // context.fillText(, 30, 54);
          context.fillText(_this.commodityDescItem.title, 30, 54);
        } else if (
          _this.commodityDescItem.title.length > 16 &&
          _this.commodityDescItem.title.length <= 32
        ) {
          text1 = _this.commodityDescItem.title.substring(0, 16);
          text2 = _this.commodityDescItem.title.substring(16);
          context.fillText(text1, 30, 54);
          context.fillText(text2, 30, 84);
        } else {
          text1 = _this.commodityDescItem.title.substring(0, 16);
          text2 = _this.commodityDescItem.title.substring(16, 16);
          context.fillText(text1, 30, 54);
          context.fillText(text2, 30, 84);
        }
        context.font = "36px PingFang-SC-Bold";
        context.fillStyle = "#FF4400";
        context.fillText(
          "￥" + _this.commodityDescApiStackPrice.price.priceText,
          30,
          144
        );
        context.font = "22px PingFang-SC-Bold";
        context.textAlign = "center";
        context.fillStyle = "#333333";
        context.fillText(
          _this.commodityDesc.seller.shopName,
          canvas.width / (2 * ratio),
          730
        );
        context.font = "12px PingFang-SC-Bold";
        context.textAlign = "center";
        context.fillStyle = "#333333";
        context.fillText(
          "由随手查提供技术支持",
          canvas.width / (2 * ratio),
          750
        );
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
            context.drawImage(img, x, y, imgWidth, imgHeight);
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
    dataInit() {
      let _this = this;
      if (_this.commodityDesc) {
        let result = _this.commodityDesc;
        _this.commodityDescMockData = result.mockData;
        _this.commodityDescApiStackPrice = result.apiStack[0].value.price;
        _this.commodityDescApiStackItem = result.apiStack[0].value.item;
        _this.commodityDescApiStackDelivery = result.apiStack[0].value.delivery;
        _this.commodityDescApiStackConsumerProtection =
          result.apiStack[0].value.consumerProtection;
        _this.commodityDescItem = result.item;
        _this.commodityDescRate = result.rate;
        _this.commodityDescVertical = result.vertical;
        _this.commodityDescSeller = result.seller;
      }
    },
    qrcode(ratio) {
      let _this = this;
      // document.getElementById("qrcode").innerHTML = "";
      new QRcode("qrcode", {
        width: 109 / ratio,
        height: 109 / ratio, // 高度
        text: _this.commodityDescLink // 二维码内容
      });
    },
    setCanvasTopFunc() {
      let _this = this;
      _this.canvasBoxObj.marginTop =
        (_this.$refs.shade.offsetHeight - _this.$refs.canvasBox.offsetHeight) /
          2 -
        40 +
        "px";
    },
    closeShareDialogFunc() {
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
          _this.drawInit();
          _this.setCanvasTopFunc();
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
    width: 270px;
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
      width: 530px;
      height: 780px;
      margin: auto;
      background-color: #fff;
      border-radius: 20px;
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
