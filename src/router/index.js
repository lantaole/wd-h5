import Vue from "vue";
import Router from "vue-router";
import user from "./user";
import verificationCode from "./verificationCode";
Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [ ...user,  ...verificationCode]
});
