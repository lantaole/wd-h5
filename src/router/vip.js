export default [
  {
    path: "/vip",
    name: "Vip",
    meta: {
      title: "Vip",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "vip"
    },
    component: () =>
      import(/* webpackChunkName: "vip" */ "../views/vip/Index.vue")
  }
];
