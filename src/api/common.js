import axiosConfig from "@/config/axiosConfig";

export default {
  /**
   * 发送短信验证码
   */
  sendVerifyCode(params) {
    return axiosConfig.get("user/sendVerifyCode", params);
  },
};
