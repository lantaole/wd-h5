<template>
  <div class="result-bottom">
    <div class="pl-30 pr-30">
      <img width="100%" src="~assets/images/tools/clm/more_tools.png" alt="" />
    </div>
    <div class="tools-list-box mt-20">
      <div
        v-for="(item, index) in toolsList"
        :key="item.title"
        class="tools-list-item text-center"
        :class="{ 'ml-20': index !== 0 }"
        @click="changeRouter(item.toolsUrl)"
      >
        <img class="tools-list-item-img" :src="item.icon" alt="" />
        <div class="text-center">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToosCustomBottom",
  data() {
    return {
      toolsList: [
        {
          title: "实时查排名",
          icon: `${this.baseUrl}/images/toolsIcon/cpm.png`,
          toolsUrl: "/tools-cpm"
        },
        {
          title: "旺旺查小号",
          icon: `${this.baseUrl}/images/toolsIcon/cxh.png`,
          toolsUrl: "/tools-cxh"
        },
        {
          title: "精准淘词",
          icon: `${this.baseUrl}/images/toolsIcon/jztc.png`,
          toolsUrl: "/tools-jztc"
        },
        {
          title: "微分享助手",
          icon: `${this.baseUrl}/images/toolsIcon/wfx.png`,
          toolsUrl: "/wxToTb"
        },
        {
          title: "查类目",
          icon: `${this.baseUrl}/images/toolsIcon/clm.png`,
          toolsUrl: "/tools-category"
        }
      ]
    };
  },
  created() {
    this.toolsList = this.toolsList.filter(item => {
      return item.toolsUrl !== this.$route.path;
    });
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  methods: {
    changeRouter(router) {
      this.$router.replace({ path: router });
    }
  }
};
</script>

<style scoped lang="scss">
.result-bottom {
  background-color: #fff;
  border-radius: 10px;
  margin: 20px 30px 0 30px;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 0 20px 0 rgba(41, 167, 225, 0.15);
  overflow: hidden;
  .tools-list-box {
    width: 100%;
    white-space: nowrap;
    overflow-x: visible;
    overflow-y: hidden;
  }
  .tools-list-item {
    display: inline-block;
    width: 170px;
    height: 150px;
    background-color: #f5f6f8;
    border-radius: 10px;
    padding-top: 12px;
    box-sizing: border-box;
  }
  .tools-list-item-img {
    width: 80px;
  }
}
</style>
