/**
 * Created by ycb on 2019/3/12.
 */
import * as types from "./mutationTypes";
import api from "@/api";
import { setStorage } from "@/config/utils";

export default {
  // 更新用户信息
  [types.UPDATE_USER_INFO]({ commit }, payload = {}) {
    if (payload && payload.token) setStorage("token", payload.token);
    // const { id } = state.userInfo;
    return new Promise((resolve, reject) => {
      api
        .getUserInfo()
        .then(res => {
          if (res.success) {
            commit({
              type: "RECORD_USER_INFO",
              info: res.result
            });
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 更新用户能量数
  [types.UPDATE_USER_ENERGY]({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getEnergyInfo()
        .then(res => {
          commit({
            type: "RECORD_USER_ENERGY",
            info: res.result || {}
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
