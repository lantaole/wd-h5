<template>
  <div id="custom-loading">
    <van-popup
      :value="value"
      :close-on-click-overlay="false"
      style="background-color: transparent;"
    >
      <div class="loading-box">
        <div class="flex-center">
          <van-loading type="spinner" color="#666" />
        </div>
        <p class="text-center cl-666 fs-16 mt-20">加载中...</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Loading } from "vant";
export default {
  name: "CustomLoading",
  props: {
    value: {
      default: false
    }
  },
  components: {
    vanPopup: Popup,
    vanLoading: Loading
  }
};
</script>

<style scoped>
.loading-box {
  background-color: #fff;
  width: 260px;
  height: 200px;
  border-radius: 10px;
  box-sizing: border-box;
  padding-top: 46px;
}
</style>
