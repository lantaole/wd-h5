import axiosConfig from "@/config/axiosConfig";

export default {
  /**
   * 下单
   */
  createOrder(params) {
    return axiosConfig.post("order/createOrder.json", params);
  },
  /**
   * 订单列表
   */
  getOrderPage(params) {
    return axiosConfig.get("order/getOrderPage.json", params);
  },
  /**
   * 取消订单
   */
  orderCancel(params) {
    return axiosConfig.post("order/orderCancel.json", params);
  }
};
