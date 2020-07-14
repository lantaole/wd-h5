<template>
  <div class="tools">
    <div @click="changeRouter('/about-us')">
      <img
        width="100%"
        src="/upload/2946e4f7-260b-474f-b6db-7f2ab6aa28fb.png"
        alt=""
      />
    </div>
    <div class="content">
      <div
        class="content-item text-center"
        v-for="item in toolsList"
        :key="item.title"
        @click="changeRouter(item.toolsUrl)"
      >
        <div class="position-relative inline-block">
          <img class="icon-img" :src="item.icon" alt="" />
          <img
            v-if="!item.toolsUrl"
            class="soon-online"
            src="~assets/images/common/soon_online_icon.png"
            alt=""
          />
        </div>
        <p class="text-center cl-333 fs-28">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tools",
  data() {
    return {
      toolsList: [
        {
          title: "查排名",
          icon: `${this.baseUrl}/images/toolsIcon/cpm.png`,
          toolsUrl: "/tools-cpm"
        },
        {
          title: "查小号",
          icon: `${this.baseUrl}/images/toolsIcon/cxh.png`,
          toolsUrl: "/tools-cxh"
        },
        {
          title: "精准淘词",
          icon: `${this.baseUrl}/images/toolsIcon/jztc.png`,
          toolsUrl: "/tools-jztc"
        },
        {
          title: "微分享",
          icon: `${this.baseUrl}/images/toolsIcon/wfx.png`,
          toolsUrl: "/wxToTb"
        },
        {
          title: "查类目",
          icon: `${this.baseUrl}/images/toolsIcon/clm.png`,
          toolsUrl: "/tools-category"
        },
        {
          title: "冲首页",
          icon: `${this.baseUrl}/images/toolsIcon/csy.png`,
          toolsUrl: "/seven-day"
        },
        {
          title: "查标题",
          icon: `${this.baseUrl}/images/toolsIcon/cbt.png`,
          toolsUrl: ""
        },
        {
          title: "查降权",
          icon: `${this.baseUrl}/images/toolsIcon/cjq.png`,
          toolsUrl: ""
        },
        {
          title: "查淘宝客",
          icon: `${this.baseUrl}/images/toolsIcon/ctbk.png`,
          toolsUrl: ""
        },
        {
          title: "20万热词",
          icon: `${this.baseUrl}/images/toolsIcon/20wrc.png`,
          toolsUrl: ""
        },
        {
          title: "查违禁词",
          icon: `${this.baseUrl}/images/toolsIcon/cwjc.png`,
          toolsUrl: ""
        },
        {
          title: "店铺诊断",
          icon: `${this.baseUrl}/images/toolsIcon/dpzd.png`,
          toolsUrl: ""
        },
        {
          title: "指数转换",
          icon: `${this.baseUrl}/images/toolsIcon/zszh.png`,
          toolsUrl: ""
        },
        {
          title: "DSR计算",
          icon: `${this.baseUrl}/images/toolsIcon/dsr.png`,
          toolsUrl: ""
        },
        {
          title: "拼多多流量",
          icon: `${this.baseUrl}/images/toolsIcon/pddll.png`,
          toolsUrl: ""
        },
        {
          title: "京东流量",
          icon: `${this.baseUrl}/images/toolsIcon/jdll.png`,
          toolsUrl: ""
        }
      ]
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  methods: {
    changeRouter(router) {
      if (!router) {
        this.$Toast("正在努力开发中...");
        return;
      }
      this.$router.push({ path: router });
    }
  }
};
</script>

<style scoped lang="scss">
.tools {
  background-color: #f5f6f8;
  .content {
    padding: 30px;
    .content-item {
      width: 33.33%;
      padding: 30px;
      display: inline-block;
      box-sizing: border-box;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    .content-item:nth-of-type(3n) {
      border-right: none;
    }
    .content-item:nth-last-of-type(1) {
      border-bottom: none;
    }
    .icon-img {
      width: 143px;
    }
    .soon-online {
      width: 68px;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
