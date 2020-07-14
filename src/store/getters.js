/**
 * Created by ycb on 2019/3/12.
 */

export default {
  // 从userInfo中提取userAccount信息
  getUserAccount: state => {
    return Object.keys(state.userInfo).length > 0
      ? state.userInfo.userAccount
      : {};
  }
};
