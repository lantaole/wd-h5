import Vue from "vue";
import App from "./App.vue";
import api from "@/api";
import router from "./router";
import store from "./store";
import { Toast, Dialog, Lazyload } from "vant";
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
store.commit("INIT_USER_INFO");

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
  // 百度网站统计埋点
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function() {
      //每次执行前，先移除上次插入的代码
      document.getElementById("baidu_tj") &&
        document.getElementById("baidu_tj").remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3e63c15c12ed2afdd367941fcf7df3d0";
      hm.id = "baidu_tj";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);
  // 监听来源 360 百度
  if (to.query.qd) {
    setStorage("qd", to.query.qd);
    setStorage("qd_page", window.location.href);
  }
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
