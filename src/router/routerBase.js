// 基础学习路由
const routerBase = [
  {
    path: "/base/1-setup",
    name: "1-setup",
    component: () => import("../views/base/1-setup/index.vue"),
  },
  {
    path: "/base/2-fn",
    name: "2-fn",
    component: () => import("../views/base/2-fn/index.vue"),
  },
  {
    path: "/base/3-changeValue",
    name: "3-changeValue",
    component: () => import("../views/base/3-changeValue/index.vue"),
  },
  {
    path: "/base/4-useComponent",
    name: "4-useComponent",
    component: () => import("../views/base/4-useComponent/index.vue"),
  },
  {
    path: "/base/5-useChildFn",
    name: "5-useChildFn",
    component: () => import("../views/base/5-useChildFn/index.vue"),
  },
  {
    path: "/base/6-props&emit",
    name: "6-props&emit",
    component: () => import("../views/base/6-props&emit/index.vue"),
  },
  {
    path: "/base/7-compositionApi",
    name: "7-compositionApit",
    component: () => import("../views/base/7-compositionApi/index.vue"),
  },
  {
    path: "/base/8-computed&watch",
    name: "8-computed&watch",
    component: () => import("../views/base/8-computed&watch/index.vue"),
  },
  {
    path: "/base/9-nextTick",
    name: "9-nextTick",
    component: () => import("../views/base/9-nextTick/index.vue"),
  },
  {
    path: "/base/10-teleport",
    name: "10-teleport",
    component: () => import("../views/base/10-teleport/index.vue"),
  },
];

export default routerBase;
