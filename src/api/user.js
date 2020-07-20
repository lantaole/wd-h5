import axiosConfig from "@/config/axiosConfig";
export default {
  /**
   * 手机验证码注册登陆
   */
  signAndLogin(params) {
    return axiosConfig.get("user/regOrLogin.json", params);
  },
  /**
   * 手机验证码注册登陆
   */
  bindMobile(params) {
    return axiosConfig.get("/user/bind/mobile", params);
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
    return axiosConfig.get("/user/oauthLogin", params);
  },
  /**
   * 微信网页登录
   */
  weChatWebLogin(params) {
    return axiosConfig.get("user/wechat/login", params);
  },

};
