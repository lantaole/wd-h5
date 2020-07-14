export default [
  {
    path: "/tools",
    name: "Tools",
    meta: {
      title: "工具",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "tools"
    },
    component: () =>
      import(/* webpackChunkName: "tools" */ "../views/tools/Index.vue")
  },
  {
    path: "/tools-cpm",
    name: "ToolsCpm",
    meta: {
      title: "实时查排名",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "ssc_function",
      showDaySign: true
    },
    component: () =>
      import(/* webpackChunkName: "tools" */ "../views/tools/cpm/Index.vue")
  },
  {
    path: "/tools-cpm-result",
    name: "ToolsCpmResult",
    meta: {
      title: "查询结果",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "ssc_result"
    },
    component: () =>
      import(/* webpackChunkName: "tools" */ "../views/tools/cpm/CpmResult.vue")
  },
  {
    path: "/wxToTb",
    name: "WxToTb",
    meta: {
      title: "微分享助手",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "wt_page",
      showDaySign: true
    },
    component: () =>
      import(/* webpackChunkName: "vip" */ "../views/tools/wxToTb/WxToTb.vue")
  },
  {
    path: "/wxToTbTransfer",
    name: "WxToTbTransfer",
    meta: {
      title: "微分享助手",
      isShowNavBar: false,
      isShowTabBar: false,
      markName: "wt_detail"
    },
    component: () =>
      import(
        /* webpackChunkName: "vip" */ "../views/tools/wxToTb/WxToTbTransfer.vue"
      )
  },
  {
    path: "/tools-cxh",
    name: "ToolsCxh",
    meta: {
      title: "旺旺查小号",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "ww_search_page",
      showDaySign: true
    },
    component: () =>
      import(/* webpackChunkName: "tools" */ "../views/tools/cxh/Index.vue")
  },
  {
    path: "/tools-cxh-result",
    name: "ToolsCxhResult",
    meta: {
      title: "小号查询结果",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "ww_search_result"
    },
    component: () =>
      import(/* webpackChunkName: "tools" */ "../views/tools/cxh/CxhResult.vue")
  },
  {
    path: "/tools-mark-account",
    name: "ToolsMarkAccount",
    meta: {
      title: "恶意小号标记",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: ""
    },
    component: () =>
      import(
        /* webpackChunkName: "tools" */ "../views/tools/cxh/MarkAccount.vue"
      )
  },
  {
    path: "/tools-jztc",
    name: "ToolsJztc",
    meta: {
      title: "精准淘词",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "keyword_choose",
      showDaySign: true
    },
    component: () =>
      import(/* webpackChunkName: "tools" */ "../views/tools/jztc/Jztc.vue")
  },
  {
    path: "/tools-Jztc-result",
    name: "ToolsJztcResult",
    meta: {
      title: "精准淘词结果",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "keyword_choose_result"
    },
    component: () =>
      import(
        /* webpackChunkName: "tools" */ "../views/tools/jztc/JztcResult.vue"
      )
  },
  {
    path: "/tools-category",
    name: "ToolsCheckCategory",
    meta: {
      title: "查类目",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "item_category",
      showDaySign: true
    },
    component: () =>
      import(
        /* webpackChunkName: "tools" */ "../views/tools/checkCategory/index.vue"
      )
  },
  {
    path: "/category-result",
    name: "ToolsCheckCategoryResult",
    meta: {
      title: "查类目结果",
      isShowNavBar: true,
      isShowTabBar: true,
      markName: "",
      showDaySign: true
    },
    component: () =>
      import(
        /* webpackChunkName: "tools" */ "../views/tools/checkCategory/CheckCategoryResult.vue"
      )
  }
];
