export default [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "随手查",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "home_page",
      showDaySign: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
  }
];
