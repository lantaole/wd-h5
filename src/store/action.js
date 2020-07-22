/**
 * Created by ycb on 2019/3/12.
 */
import * as types from "./mutationTypes";
import api from "@/api";
import { setStorage } from "@/config/utils";

export default {
  // 更新用户信息
  [types.UPDATE_USER_INFO]({ commit }, data = {}) {
    console.log(data);
    if (data && data.token) setStorage("token", data.token);
    commit({
      type: "RECORD_USER_INFO",
      data: data
    });
  },
};
