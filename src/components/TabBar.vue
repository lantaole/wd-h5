<template>
  <van-tabbar v-model="active" active-color="#2BA8E2">
    <van-tabbar-item
      v-for="(item, index) in tabBarList"
      :key="index"
      @click="jumpTo(item.path)"
    >
      <span>{{ item.title }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? item.icon.active : item.icon.normal"
      />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "TabBar",
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  data() {
    return {
      active: 0,
      tabBarPageList: ["Home", "SevenDay", "BuyEnergy", "Account"],
      toolsPageList: [
        "ToolsCpm",
        "ToolsCpmResult",
        "ToolsCxh",
        "ToolsCxhResult",
        "ToolsMarkAccount"
      ],
      tabBarList: [
        {
          id: 0,
          title: "首页",
          icon: {
            normal: `${this.baseUrl}/images/tabBarIcon/home.png`,
            active: `${this.baseUrl}/images/tabBarIcon/home-active.png`
          },
          path: "/"
        },
        {
          id: 1,
          title: "工具",
          icon: {
            normal: `${this.baseUrl}/images/tabBarIcon/tools_new.png`,
            active: `${this.baseUrl}/images/tabBarIcon/tools_new_active.png`
          },
          path: "/tools"
        },
        {
          id: 2,
          title: "能量",
          icon: {
            normal: `${this.baseUrl}/images/tabBarIcon/energy.png`,
            active: `${this.baseUrl}/images/tabBarIcon/energy-active.png`
          },
          path: "/buy-energy"
        },
        {
          id: 3,
          title: "我的",
          icon: {
            normal: `${this.baseUrl}/images/tabBarIcon/my.png`,
            active: `${this.baseUrl}/images/tabBarIcon/my-active.png`
          },
          path: "/account"
        }
      ]
    };
  },
  watch: {
    $route(to) {
      if (this.tabBarPageList.includes(to.name)) {
        this.active = this.tabBarPageList.findIndex(item => item === to.name);
      }
      if (to.name.includes("Tool")) {
        this.active = 1;
      }
    }
  },
  methods: {
    jumpTo(path) {
      if (path) {
        this.$router.push({
          path: path
        });
      } else {
        this.$Toast("正在努力开发中...");
      }
    }
  }
};
</script>

<style scoped></style>
