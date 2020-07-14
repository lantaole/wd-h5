<template>
  <div>
    <van-dialog
      v-model="show"
      :overlay="overlay"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
      class="share-popup"
    >
      <div class="bc-fff canvas-shade" ref="shade"></div>
      <img
        class="howToShare position-absolute"
        src="~assets/images/common/howToShare.png"
        alt=""
      />
      <!--<img-->
      <!--class="howToShare position-absolute"-->
      <!--@click="closeShareFuncDialog"-->
      <!--src="~assets/images/tools/wxToTb/closed.png"-->
      <!--alt=""-->
      <!--/>-->

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
          <div class="canvas-box position-relative">
            <p
              v-show="!convertCanvasToImageSrc"
              class="cl-fff text-center fs-32 font-bold text-center"
              style="width: 100%; padding-top: 200px; position:absolute;"
            >
              加载中...
            </p>
            <canvas
              v-show="!convertCanvasToImageSrc"
              id="shareCanvas"
              width="530px"
              height="942px"
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
import { getStorage } from "@/config/utils";
import QRcode from "qrcodejs2";
export default {
  name: "ShareToolsResult",
  components: {},
  props: {
    showShareFunc: {
      type: Boolean,
      default: false
    },
    showFuncBg: {
      type: String
    },
    qrCodeStyle: {
      type: Object
    },
    listData: {},
    keywords: {
      type: String
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
      qrcodeString: null
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    getShareUrl() {
      let _this = this;
      let referrerId = getStorage("token").split("_")[0];
      let fromPage = this.$route.meta.markName;
      let url =
        window.location.origin +
        "" +
        "/tools-cpm" +
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
            _this.$dialog.alert({
              message: res.message
            });
          }
        });
    },
    drawInit(res) {
      let _this = this;
      _this.qrcodeString = res.result;
      let canvas = document.getElementById("shareCanvas");
      let context = canvas.getContext("2d");
      let ratio = getPixelRatio(context);
      let drawObj = {
        codeBorder: {
          width: 530,
          height: 942,
          x: 0 * ratio,
          y: 0 * ratio
        }
      };
      _this.ratio = ratio;
      canvas.style.width = parseInt(canvas.style.width) * ratio + "px";
      canvas.style.height = parseInt(canvas.style.height) * ratio + "px";
      context.clearRect(0, 0, canvas.style.width, canvas.style.height);
      // 将canvas的透明背景设置成白色
      // let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      // for (let i = 0; i < imageData.data.length; i += 4) {
      //   // 当该像素是透明的，则设置成白色
      //   if (imageData.data[i + 3] == 0) {
      //     imageData.data[i] = 255;
      //     imageData.data[i + 1] = 255;
      //     imageData.data[i + 2] = 255;
      //     imageData.data[i + 3] = 255;
      //   }
      // }
      // context.putImageData(imageData, 0, 0);
      context.beginPath();
      _this.$nextTick(function() {
        _this.qrcode(_this.ratio);
        let canvas2 = _this.$refs.qrcodeBox.children[0];
        drawImg(
          context,
          ratio,
          {
            width: drawObj.codeBorder.width,
            height: drawObj.codeBorder.height,
            src: _this.showFuncBg
          },
          drawObj.codeBorder.x,
          drawObj.codeBorder.y
        ).then(function() {
          context.drawImage(
            canvas2,
            _this.qrCodeStyle.x * ratio,
            _this.qrCodeStyle.y * ratio,
            canvas2.width * ratio,
            canvas2.height * ratio
          );
          // title
          drawTitleText(context, ratio);
          forDrawImg(0, _this.listData.length);
        });
      });
      // 循环递归渲染
      function forDrawImg(i, length) {
        setTimeout(function() {
          // 宝贝标题
          let goodsTitleText =
            _this.listData[i].title.length <= 20
              ? _this.listData[i].title
              : _this.listData[i].title.substring(0, 20) + "...";
          drawText(
            goodsTitleText,
            "#ffffff",
            "12px PingFang-SC-Bold",
            canvas.width / (2 * ratio) - 40,
            i * 33 + 195
          );
          // 所属店铺
          let storeName =
            _this.listData[i].storeName.length <= 10
              ? _this.listData[i].storeName
              : _this.listData[i].storeName.substring(0, 10) + "...";
          drawText(
            storeName,
            "#ffffff",
            "12px PingFang-SC-Bold",
            canvas.width / (2 * ratio) + 182,
            i * 33 + 195
          );
          // 商品图片
          drawImg(
            context,
            ratio,
            {
              width: 24,
              height: 24,
              src: _this.listData[i].picUrl
            },
            115,
            i * 99 + 540
          ).then(() => {
            if (++i < length) {
              forDrawImg(i, length);
            } else {
              convertCanvasToImage(canvas);
            }
          });
        }, 1);
      }
      function drawTitleText(context) {
        context.font = "28px PingFang-SC-Bold";
        context.textAlign = "center";
        context.fillStyle = "#000000";
        context.fillText(
          'TOP100的 "' + _this.keywords + '"',
          canvas.width / (2 * ratio),
          96
        );
      }
      function drawText(text, color, fontstyle, x, y) {
        context.font = fontstyle;
        context.textAlign = "center";
        context.fillStyle = color;
        context.fillText(text, x, y);
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
    dataInit() {},
    qrcode(ratio) {
      let _this = this;
      // document.getElementById("qrcode").innerHTML = "";
      new QRcode("qrcode", {
        width: _this.qrCodeStyle.width / ratio,
        height: _this.qrCodeStyle.height / ratio, // 高度
        text: _this.qrcodeString // 二维码内容
      });
    },
    setCanvasTopFunc() {
      let _this = this;
      _this.canvasBoxObj.marginTop =
        (_this.$refs.shade.offsetHeight - _this.$refs.canvasBox.offsetHeight) /
          2 +
        "px";
    },
    closeShareFuncDialog() {
      let _this = this;
      _this.$emit("closeShareFunc");
    }
  },
  watch: {
    showShareFunc: function(val) {
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
      height: 942px;
      margin: auto;
      background-color: #fff;
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
