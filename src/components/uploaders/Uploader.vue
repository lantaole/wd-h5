<template>
  <div class="clear">
    <template v-if="uploadImageUrl.length > 0">
      <div
        :class="{ 'mr-10': maxNumber > 1 }"
        class="upload-list pos-rel left mt-5 mb-5"
        v-for="(item, index) in uploadImageUrl"
        :key="index"
      >
        <img :src="item" alt="上传组件图片" @click="imagePreviewFun(index)" />
        <i
          v-if="closeIcon"
          class="close-btn van-icon van-icon-close"
          @click="removeImage(index)"
          v-show="!disabled"
        ></i>
      </div>
    </template>
    <div
      class="uploader position-relative left mt-5 mb-5"
      v-if="uploadImageUrl.length < maxNumber"
    >
      <van-icon name="photograph" v-show="!isShowLoading" />
      <van-loading
        v-show="isShowLoading"
        type="spinner"
        color="black"
        class="loading"
      />
      <input
        ref="input"
        type="file"
        class="uploader-input"
        v-bind="$attrs"
        :accept="accept"
        :disabled="disabled"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import { Icon, Loading, ImagePreview } from "vant";
import aliUploadConfig from "@/config/aliUploadConfig";
import exif from "./exif";

export default {
  name: "uploader",
  inheritAttrs: false,
  data() {
    return {
      isShowLoading: false,
      uploadImageUrl: [],
      instance: false
    };
  },
  components: {
    vanIcon: Icon,
    vanLoading: Loading
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    defaultImageUrl: {
      default: []
    },
    closeIcon: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: "image/*"
    },
    name: {
      required: true,
      type: String
    },
    onSuccess: {
      type: Function,
      default() {
        return {};
      }
    },
    onRemove: {
      type: Function,
      default() {
        return {};
      }
    },
    resultType: {
      type: String,
      default: "dataUrl"
    },
    maxSize: {
      type: Number,
      default: 100 * 1024
    },
    maxNumber: {
      type: Number,
      default: 1
    }
  },
  watch: {
    defaultImageUrl(value) {
      this.uploadImageUrl = value;
    }
  },
  created() {
    this.uploadImageUrl = this.defaultImageUrl;
  },
  methods: {
    onChange(event) {
      let { files } = event.target;
      if (this.disabled || !files.length) {
        return;
      }
      // 当上传多张图片的时候将类数组转化为数组
      files = files.length === 1 ? files[0] : [].slice.call(files, 0);
      if (!files) {
        return;
      }
      // 一次同时上传多张图片
      if (Array.isArray(files)) {
        Promise.all(files.map(this.readFile)).then(contents => {
          contents.map(item => {
            const data = this.compress(item);
            if (item.complete) {
              this.upload(data);
            } else {
              contents.onload = this.upload(data);
            }
          });
          this.$refs.input && (this.$refs.input.value = "");
        });
      } else {
        // 一次上传单张图片
        this.readFile(files);
      }
    },
    removeImage(index) {
      this.onRemove(index);
    },
    imagePreviewFun(index) {
      this.instance = ImagePreview(this.uploadImageUrl, index);
    },
    readFile(file) {
      this.isShowLoading = true;
      let orientation = null;
      exif.getData(file, function() {
        orientation = exif.getTag(this, "Orientation");
      });
      const reader = new FileReader();
      reader.onload = event => {
        let img = new Image();
        const result = event.target.result;
        img.src = result;
        if (result.length < this.maxSize) {
          img = null;
          this.upload(result);
          return;
        }
        setTimeout(() => {
          const data = this.compress(img, orientation);
          if (img.complete) {
            this.upload(data);
          } else {
            img.onload = this.upload(data);
          }
          img = null;
        }, 200);
      };
      reader.readAsDataURL(file);
      this.$refs.input && (this.$refs.input.value = "");
    },
    rotateImg(img, direction, canvas, roteNum) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction === "right") {
        step++;
        // 旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      // 旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          // 需要两次旋转（传进来一个参数来确定是否连续两次旋转）
          if (roteNum === 2) {
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
          } else {
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
          }
          break;
      }
    },
    compress(img, orientation) {
      // 用于压缩图片的canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 用于绘制瓦片的canvas
      const tCanvas = document.createElement("canvas");
      const tctx = tCanvas.getContext("2d");
      // const initSize = img.src.length;
      let width = img.width;
      let height = img.height;

      // 如果图片大于400万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;

      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        // 计算要分成多少块瓦片
        count = ~~(Math.sqrt(count) + 1);

        // 计算每块瓦片的宽和高
        const nw = ~~(width / count);
        const nh = ~~(height / count);

        tCanvas.width = nw;
        tCanvas.height = nh;

        // 绘制瓦片
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }

      // 修复上传图片的时候，被旋转的问题
      if (orientation !== "" && orientation !== 1) {
        switch (orientation) {
          case 1: // 正常状态
            break;
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas, 2); //转两次
            break;
        }
      }

      // 进行最小压缩（压缩比例可自由控制）
      const ndata = canvas.toDataURL("image/jpeg", 0.6);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

      return ndata;
    },

    upload(baseStr) {
      const _this = this;
      const base64 = baseStr.split(",")[1];
      const text = window.atob(base64);
      const bufferLen = text.length;
      const bufferArray = new Uint8Array(bufferLen);
      for (let i = 0; i < bufferLen; i++) {
        bufferArray[i] = text.charCodeAt(i);
      }
      const key = _this.name + "/" + new Date().getTime();
      aliUploadConfig
        .aliUploadImgBuffer(key, bufferArray.buffer)
        .then(res => {
          if (res) {
            _this.uploadImageUrl.push(res.url);
            _this.onSuccess(_this.uploadImageUrl);
            _this.isShowLoading = false;
          }
        })
        .catch(err => {
          _this.isShowLoading = false;
          alert(err);
        });
    }
  },
  beforeDestroy() {
    this.instance && this.instance.close();
  }
};
</script>

<style lang="scss" scoped>
.uploader {
  width: 120px;
  height: 120px;
  border: 2px solid #666;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 120px;
  text-align: center;
}

.upload-list {
  width: 120px;
  height: 120px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
  }
}

.uploader-input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.close-btn {
  position: absolute;
  top: -4px;
  font-size: 18px;
  color: #f9284f;
  right: -9px;
  background-color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
</style>
