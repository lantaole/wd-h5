<template>
  <van-dialog
    id="follow-dialog"
    v-model="show"
    :closeOnClickOverlay="true"
    :showConfirmButton="false"
    @close="close"
  >
    <img
      src="~assets/images/common/follow-img.png"
      class="follow-img mg-auto"
    />
    <img
      class="close-img mg-auto mt-20"
      src="~assets/images/common/close.png"
      alt=""
      @click="close"
    />
  </van-dialog>
</template>
<script>
export default {
  props: {
    isShow: {
      required: true,
      default: false
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    isShow(val) {
      this.show = val;
    }
  },
  methods: {
    // 关闭loading后向父组件传值
    close() {
      this.show = false;
      this.$emit("on-close");
    }
  }
};
</script>
<style scoped lang="scss">
#follow-dialog {
  background-color: transparent;
  .follow-img {
    width: 90%;
  }
  .close-img {
    width: 60px;
    height: 60px;
  }
}
</style>
