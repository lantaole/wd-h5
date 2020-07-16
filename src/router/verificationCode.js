export default [
  {
    path: "/verification-code",
    name: "VerificationCode",
    meta: {
      title: "随手查-验证码",
      isShowNavBar: true,
      isShowTabBar: true,
      showDaySign: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/verificationCode/VerificationCode.vue")
  }
];
