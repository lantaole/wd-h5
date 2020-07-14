import axiosConfig from "@/config/axiosConfig";

export default {
  /**
   * 宝贝排名查询 列表
   */
  getRank(params) {
    return axiosConfig.get("rank/getRank.json", params);
  },
  /**
   * 旺旺信誉等基本信息查询
   */
  getWwInfo(params) {
    return axiosConfig.get("wwCheck/getWwInfo.json", params);
  },
  /**
   * 查询风险信息和查询次数
   */
  getWwRiskInfo(params) {
    return axiosConfig.get("wwCheck/getWwRiskInfo.json", params);
  },
  /**
   * 淘口令或短链接解析宝贝id
   */
  getWxfparseItemText(params) {
    return axiosConfig.get("wfx/parseItemText.json", params);
  },
  /**
   * 获取分享海报短链接
   */
  getWxfUrl(params) {
    return axiosConfig.get("wfx/wfxUrl.json", params);
  },
  /**
   * 获取淘口令
   */
  getWxfTkl(params) {
    return axiosConfig.get("wfx/wfxTkl.json", params);
  },
  /**
   * 标记危险账户
   */
  wwSign(params) {
    return axiosConfig.get("wwCheck/wwSign.json", params);
  },
  /**
   * 上传图片
   */
  upload(params) {
    return axiosConfig.post("picture/upload.json", params);
  },
  /**
   * 获取精准淘词
   */
  getExactWords(params) {
    return axiosConfig.get("word/exactWords.json", params);
  },
  /**
   * 获取短链接
   */
  getShotUrl(params) {
    return axiosConfig.get("word/getShotUrl.json", params);
  },
  /**
   * 获取短链接
   */
  getShareUrl(params) {
    return axiosConfig.post("user/getShareUrl.json", params);
  },
  /**
   * 获取短链接
   */
  score(params) {
    return axiosConfig.post("ops/score.json", params);
  },
  /**
   * 查类目
   */
  getLeiMu(params) {
    return axiosConfig.get("category/search-by-keyword.json", params);
  }
};
