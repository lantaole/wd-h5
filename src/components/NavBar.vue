<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      border
      fixed
      :z-index="100"
    ></van-nav-bar>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  components: {
    vanNavBar: NavBar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
