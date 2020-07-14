/**
 * Created by ycb on 2019/3/12.
 */

import * as types from "./mutationTypes";
import { setStorage, getStorage } from "@/config/utils";
import store from "./index";

export default {
  // 登录
  [types.LOGIN](state, { info }) {
    setStorage("token", info.token);
    state.userInfo = Object.assign(
      {},
      {
        phone: info.phone,
        wechatInfo: {}
      }
    );
    state.isLogin = true;
    state.authed = getStorage("authed") != null ? getStorage("authed") : false;
    setStorage("userInfo", state.userInfo);
    // store.dispatch("UPDATE_USER_ENERGY");
  },

  // 登录成功后存储用户信息到localStorage和vuex
  [types.RECORD_USER_INFO](state, { info }) {
    let wxInfo = {};
    if (info) {
      wxInfo = JSON.parse(decodeURIComponent(info.wechatInfo)) || {};
      state.userInfo = Object.assign(
        {},
        {
          phone: info.phone,
          wechatInfo: wxInfo
        }
      );
    }
    state.isLogin = true;
    state.authed = getStorage("authed") != null ? getStorage("authed") : false;
    setStorage("userInfo", state.userInfo);
    store.dispatch("UPDATE_USER_ENERGY");
  },

  // 保存用户能量到vuex
  [types.RECORD_USER_ENERGY](state, { info }) {
    state.energy = info || {};
  },

  // 页面刷新的时候从本地缓存获取用户信息数据存储到vuex
  // LEVEL_PRIVATE_TEST(-1, "内测版"),
  // LEVEL_FREE(1, "试用版"),
  // LEVEL_JUNIOR(10, "初级会员"),
  // LEVEL_MIDDLE(20, "高级会员"),
  // LEVEL_SENIOR(30, "VIP会员"),
  // LEVEL_PLUS(40, "会员");
  [types.INIT_USER_INFO](state) {
    let initUserInfo = getStorage("userInfo");
    state.authed = getStorage("authed") != null ? getStorage("authed") : false;
    if (initUserInfo) {
      state.userInfo = initUserInfo;
      state.isLogin = true;
      store.dispatch("UPDATE_USER_ENERGY");
    } else {
      state.isLogin = false;
    }
  },

  // 退出登录后变更登录状态和清除localStorage用户信息
  [types.OUT_LOGIN](state) {
    state.isLogin = false;
    state.authed = false; // 是否微信授权
    state.userInfo = {};
    state.energy = {};
    localStorage.clear(); //清除所有缓存
  },

  //存储配置信息
  [types.ALL_SYS_CONFIG](state, { config }) {
    state.config = config;
  }
};
