<template>
  <img
    :src="imgUrl"
    alt=""
    class="tools-guide"
    v-show="show"
    @click="close()"
  />
</template>

<script>
import { getStorage, setStorage } from "@/config/utils";
export default {
  name: "ToolsGuide",
  data() {
    return {
      show: false
    };
  },
  computed: {
    imgUrl() {
      let path = this.$route.path;
      if (path === "/tools-cpm") {
        return this.baseUrl + "/images/common/tools-tips/cpm.png";
      } else if (path === "/tools-cxh") {
        return this.baseUrl + "/images/common/tools-tips/cxh.png";
      } else if (path === "/tools-jztc") {
        return this.baseUrl + "/images/common/tools-tips/jztc.png";
      } else if (path === "/wxToTb") {
        return this.baseUrl + "/images/common/tools-tips/wfx.png";
      } else {
        return this.baseUrl + "/images/common/tools-tips/cpm.png";
      }
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  mounted() {
    let name = this.$route.name;
    this.show = getStorage("notShowToolsGuide" + name) ? false : true;
  },
  methods: {
    close() {
      this.show = false;
      let name = this.$route.name;
      setStorage("notShowToolsGuide" + name, true);
    }
  }
};
</script>

<style scoped lang="scss">
.tools-guide {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000000;
}
</style>
