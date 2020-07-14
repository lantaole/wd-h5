<template>
  <van-popup
    class="loading-wrap"
    :close-on-click-overlay="false"
    @close="close()"
    v-model="show"
  >
    <div class="loading-content position-relative bc-fff">
      <div
        class="loading-slider position-absolute text-right cl-fff"
        :style="'z-index: 10; left: ' + left + 'px'"
      >
        {{ step }}%
      </div>
    </div>
    <p class="text-center cl-fff fs-22 mt-10">{{ loadingText }}</p>
  </van-popup>
</template>
<script>
import { Popup } from "vant";

export default {
  components: {
    vanPopup: Popup
  },
  props: {
    second: {
      type: Number,
      default: 10
    },
    operate: {
      required: true,
      default: "run"
    }
  },
  data() {
    return {
      show: false,
      left: -200,
      step: 20,
      time: 50,
      disables: false,
      loadingText: "已获取，正在输出列表，请稍等…"
    };
  },
  watch: {
    operate(val) {
      if (val == "run") {
        //开始
        this.show = true;
        this.left = -200;
        this.start();
      } else if (val == "complete") {
        //完成
        if (this.left < 0) {
          this.time = 5;
        } else {
          this.show = false;
        }
      } else if (val == "err") {
        //请求失败
        this.show = false;
      } else {
        this.show = false;
      }
    }
  },
  methods: {
    // 关闭loading后向父组件传值
    close() {
      this.$emit("on-close");
    },
    start() {
      this.time = (this.second * 1000) / 100;
      this.timer();
    },
    timer() {
      if (this.left < 0) {
        this.left += 2;
        this.step = parseInt(((250 + this.left) / 250) * 100);
        if (this.step < 26) {
          this.loadingText = "正在分配空闲手机中…";
        } else if (this.step < 32) {
          this.loadingText = "已输入关键词，正在查询…";
        } else {
          this.loadingText = "已获取，正在输出列表，请稍等…";
        }
        setTimeout(this.timer, this.time);
      } else {
        if (this.operate == "complete") {
          this.show = false;
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.loading-wrap {
  background-color: transparent;
  .loading-content {
    width: 250px; /*no*/
    height: 16px; /*no*/
    border-radius: 10px; /*no*/
    overflow: hidden;
    .loading-slider {
      width: 250px; /*no*/
      height: 16px; /*no*/
      border-radius: 10px; /*no*/
      background-image: -webkit-linear-gradient(0deg, #56e3ff, #33a7fe);
      overflow: hidden;
      font-size: 10px; /*no*/
      line-height: 16px; /*no*/
      padding-right: 6px; /*no*/
    }
  }
}
</style>
