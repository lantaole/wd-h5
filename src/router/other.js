export default [
  {
    path: "/about-us",
    name: "AboutUs",
    meta: {
      title: "随手查-介绍",
      isShowNavBar: false,
      isShowTabBar: false,
      markName: "about_us"
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/other/AboutUs.vue")
  },
  {
    path: "/score",
    name: "Score",
    meta: {
      title: "运营评分",
      isShowNavBar: false,
      isShowTabBar: false,
      markName: "score"
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/other/Score.vue")
  }
];
