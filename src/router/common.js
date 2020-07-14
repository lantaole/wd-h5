export default [
  {
    path: "/seven-day",
    name: "SevenDay",
    meta: {
      title: "七天冲首页",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: ""
    },
    component: () =>
      import(/* webpackChunkName: "common" */ "../views/common/SevenDay.vue")
  },
  {
    path: "/activity-717",
    name: "Activity717",
    meta: {
      title: "七天冲首页",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "activity717"
    },
    component: () =>
      import(/* webpackChunkName: "common" */ "../views/common/Activity717.vue")
  }
];
