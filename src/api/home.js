import axiosConfig from "@/config/axiosConfig";

export default {
  /**
   * 获取首页广告、导航、主题数据
   */
  getHomeCommonData() {
    return axiosConfig.get("home/common-data");
  }
};
