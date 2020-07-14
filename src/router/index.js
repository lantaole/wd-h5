import Vue from "vue";
import Router from "vue-router";
import user from "./user";
import home from "./home";
import tools from "./tools";
import vip from "./vip";
import common from "./common";
import other from "./other";
Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [...home, ...user, ...tools, ...vip, ...common, ...other]
});
