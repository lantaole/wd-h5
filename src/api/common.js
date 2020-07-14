import axiosConfig from "@/config/axiosConfig";

export default {
  /**
   * 发送短信验证码
   */
  sendVerifyCode(params) {
    return axiosConfig.get("sms/sendVerifyCode.json", params);
  },
  /**
   * 记录页面访问日志
   */
  accesslog(params) {
    return axiosConfig.get("accesslog/addLog.json", params);
  },
  /**
   * 记录活动报名
   */
  activityApply(params) {
    return axiosConfig.get("activity/apply.json", params);
  },
  /**
   * 查看活动是否失效
   */
  isActivityDisabled(params) {
    return axiosConfig.get("activity/isActivityDisabled.json", params);
  },
  /**
   * 首页广告轮播图
   */
  getByAdType(params) {
    return axiosConfig.get("advert/getByAdType.json", params);
  }
};
