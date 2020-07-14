/**
 * Created by ycb on 2019/3/12.
 */

import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./action";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
});
