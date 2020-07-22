import Vue from "vue";
import App from "./App.vue";
import api from "@/api";
import router from "./router";
import store from "./store";
import { Toast, Dialog, Lazyload, } from "vant";
import "lib-flexible/flexible";
import "hidpi-canvas/dist/hidpi-canvas.min";
import VueJsonp from "vue-jsonp";
import * as filters from "./filter/filter";
import "iview/dist/styles/iview.css";
import "@/scss/iview.scss";
import "@/scss/common.scss";
import wx from "weixin-jsapi";
import { wechatAuthorization, setStorage, getStorage } from "@/config/utils";

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== "production";

Vue.use(Dialog);
Vue.use(Lazyload);
Vue.use(VueJsonp);

// 应用初始化校验用户登录信息

Vue.prototype.$Toast = Toast;
Vue.prototype.$wx = wx;

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// ios端微信分享签名地址保存
if (window.__wxjs_is_wkwebview) {
  if (window.entryUrl == "" || window.entryUrl == undefined) {
    window.entryUrl = document.URL; // 将后面的参数去除
  }
}
router.afterEach(to => {
  document.title = to.meta.title;
  // 监听是否为分享进入页面,保存分享参数
  if (to.query.referrerId && to.query.fromPage) {
    setStorage("sharePath", to.path);
    let state = "";
    if (to.query.state) {
      state = to.query.state;
    }
    api
      .saveRecommendParams({
        referrerId: to.query.referrerId,
        fromPage: to.query.fromPage,
        channel: to.query.channel,
        source: to.query.source
      })
      .then(res => {
        if (res.success) {
          wechatAuthorization(window.location.origin + to.path, state);
        }
      });
  }
  // 保存分享参数微信授权监听重定向获取code 为好友助力
  if (to.path == getStorage("sharePath")) {
    if (to.query.code) {
      api
        .shareAward({
          code: to.query.code
        })
        .then(res => {
          if (res.success) {
            Toast("成功为好友助力");
          } else {
            Toast(res.message);
          }
          setStorage("sharePath", "no");
        });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
