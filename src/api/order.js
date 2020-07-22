import axiosConfig from "@/config/axiosConfig";

export default {
  orderList(params) {
    return axiosConfig.get("c/order/list", params);
  },
  orderDetail(params) {
    return axiosConfig.post("c/order/detail", params);
  },
  orderTrace(params) {
    return axiosConfig.post("user/order/trace", params);
  },
  orderDetail(params) {
    return axiosConfig.post("c/order/detail", params);
  }

};
