<template>
  <div>
    <img
      src="~assets/images/common/go-top.png"
      alt=""
      class="go-top"
      v-show="backTopShow"
      @click="backTop()"
    />
  </div>
</template>

<script>
import { scrollToTop, throttle } from "@/config/utils";
export default {
  name: "GoTop",
  data() {
    return {
      backTopShow: false
    };
  },
  beforeCreate() {
    this.throttleScroll = null;
  },
  mounted() {
    const _this = this;
    _this.throttleScroll = throttle(() => {
      _this.handleScroll();
    }, 1000);
    window.addEventListener("scroll", _this.throttleScroll);
  },
  methods: {
    backTop() {
      scrollToTop();
    },
    handleScroll() {
      this.backTopShow =
        document.documentElement.scrollTop + document.body.scrollTop > 200;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.throttleScroll);
  }
};
</script>

<style scoped lang="scss">
@import "src/scss/mixin";
.go-top {
  width: 65px;
  height: 65px;
  position: fixed;
  right: 40px;
  bottom: 60px; /*no*/
}
</style>
