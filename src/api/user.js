import axiosConfig from "@/config/axiosConfig";
export default {
  /**
   * 手机验证码注册登陆
   */
  signAndLogin(params) {
    return axiosConfig.get("user/regOrLogin.json", params);
  },
  /**
   * 监测有没有微信授权
   */
  getIsWeChatAuthed() {
    return axiosConfig.get("user/isWeChatAuthed.json");
  },
  /**
   * 获取用户信息
   */
  getUserInfo() {
    return axiosConfig.get("user/userInfo.json");
  },
  /**
   * 微信授权登录
   */
  weChatLoginAuth(params) {
    return axiosConfig.get("user/weChatLoginAuth.json", params);
  },
  /**
   * 退出登陆
   */
  logOut() {
    return axiosConfig.get("user/logOut.json");
  },
  /**
   * 获取产品
   */
  getProductList() {
    return axiosConfig.get("pro/list.json");
  },
  /**
   * 获取用户积分能量
   */
  getEnergyInfo() {
    return axiosConfig.get("energy/getEnergyInfo.json");
  },
  /**
   * 获取用户能量记录列表
   */
  getEnergyRecord(params) {
    return axiosConfig.get("energy/getEnergyRecord.json", params);
  },
  /**
   * 获取微信Config相关参数
   */
  getWxConfig(params) {
    return axiosConfig.get("wechat/init-wechat-js-api-config.json", params);
  },
  /**
   * 获取微信支付相关参数
   */
  getWxPayParams(params) {
    return axiosConfig.post("pay/pay/getWxPayParams.json", params);
  },
  /**
   * 保存推荐注册参数
   */
  saveRecommendParams(params) {
    return axiosConfig.post("user/saveRecommendParams.json", params);
  },
  /**
   * 微信授权登陆助力
   */
  shareAward(params) {
    return axiosConfig.get("user/shareAward.json", params);
  },
  /**
   * 邀请粉丝列表
   */
  getFansPage(params) {
    return axiosConfig.get("user/getFansPage.json", params);
  }
};
