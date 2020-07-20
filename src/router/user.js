export default [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录注册",
      isShowNavBar: true,
      isShowTabBar: false,
      markName: "user_reg"
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/login/Index.vue")
  },
  {
    path: "/wechatLogin",
    name: "WechatLogin",
    meta: {
      title: "微信登录",
      isShowNavBar: true,
      isShowTabBar: false,
      markName: ""
    },
    component: () =>
      import(
        /* webpackChunkName: "user" */ "../views/user/login/WechatLogin.vue"
      )
  },
  {
    path: "/order-list",
    name: "OrderList",
    meta: {
      title: "订单列表",
      isShowNavBar: true,
      isShowTabBar: false,
      markName: ""
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/orderList/Index.vue")
  },
  {
    path: "/order-desc",
    name: "OrderDesc",
    meta: {
      title: "订单详情",
      isShowNavBar: true,
      isShowTabBar: false,
      markName: ""
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/orderDesc/Index.vue")
  },
  {
    path: "/logistics",
    name: "Logistics",
    meta: {
      title: "物流查询",
      isShowNavBar: true,
      isShowTabBar: false,
      markName: ""
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/logistics/Index.vue")
  },
];
