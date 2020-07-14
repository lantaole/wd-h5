export default [
  {
    path: "/account",
    name: "Account",
    meta: {
      title: "个人中心",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "user_center"
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/account/Index.vue")
  },
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
    path: "/buy-energy",
    name: "BuyEnergy",
    meta: {
      title: "能量加油站",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "product_purchase"
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/buyEnergy/Index.vue")
  },
  {
    path: "/energy-list",
    name: "EnergyList",
    meta: {
      title: "我的能量",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "",
      showDaySign: true
    },
    component: () =>
      import(
        /* webpackChunkName: "user" */ "../views/user/buyEnergy/EnergyList.vue"
      )
  },
  {
    path: "/order-list",
    name: "OrderList",
    meta: {
      title: "我的订单",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: ""
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/orderList/Index.vue")
  },
  {
    path: "/share",
    name: "Share",
    meta: {
      title: "分享得能量",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "share_activity"
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/share/Share.vue")
  },
  {
    path: "/share-back",
    name: "ShareBack",
    meta: {
      title: "获取能量",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "share_activity"
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/share/ShareBack.vue")
  },
  {
    path: "/my-fans",
    name: "MyFans",
    meta: {
      title: "我的粉丝",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: ""
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/share/MyFans.vue")
  }
];
