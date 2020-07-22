/**
 * Created by ycb on 2019/3/12.
 */

import * as types from "./mutationTypes";
import { setStorage, getStorage ,setToken, removeToken} from "@/config/utils";
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
    setStorage("userInfo", state.userInfo);
  },

  // 登录成功后存储用户信息到localStorage和vuex
  [types.RECORD_USER_INFO](state, { data }) {
    console.log(data);
    if (data) {
      state.userInfo = Object.assign(
       data
      );
      setToken(data.token);
    }
    state.isLogin = true;
    setStorage("userInfo", state.userInfo);
  },


  // 退出登录后变更登录状态和清除localStorage用户信息
  [types.OUT_LOGIN](state) {
    state.isLogin = false;
    state.userInfo = {};
    state.energy = {};
    localStorage.clear(); //清除所有缓存
    removeToken()
  },

  //存储配置信息
  [types.ALL_SYS_CONFIG](state, { config }) {
    state.config = config;
  }
};
