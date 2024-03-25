import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { tree2arr, getLocalStorage, removeAllLoginInfo } from "@/utils/index";
import NProgress from "@/utils/nProgress.js";
import { menuKey } from "@/router/menuConfig.js";
import { useLayoutStore } from "@/stores/layout.js";

const main = () => import("@/views/main.vue");
const refreshPage = () => import("@/views/refreshPage.vue");
const notFound = () => import("@/views/404.vue");
const begin = () => import("@/views/begin/index.vue");
const game = () => import("@/views/game/index.vue");
const end = () => import("@/views/end/index.vue");

import routerBase from "./routerBase";
import routerV3s from "./routerV3s";
import routerPackage from "./routerPackage";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "主体框架",
      component: main,
      redirect: to => {
        return "/begin";
      },
      children: [
        {
          path: "/refresh",
          name: "refreshPage",
          component: refreshPage,
          beforeEnter: (to, from) => {
            if (from.meta.targetMenuPath) {
              to.meta.targetMenuPath = from.meta.targetMenuPath;
            } else {
              to.meta.targetMenuPath = from.path;
            }
          },
        },
        {
          path: "/begin",
          name: "begin",
          component: begin,
        },
        ...routerBase,
        ...routerV3s,
        ...routerPackage,
        {
          path: "/game",
          name: "game",
          component: game,
        },
        {
          path: "/end",
          name: "end",
          component: end,
        },

        {
          path: "/404",
          name: "notFound",
          component: notFound,
        },
        { path: "/:pathMatch(.*)*", redirect: "/404" },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const layoutStore = useLayoutStore();
  layoutStore.$patch(state => {
    state.isNavigating = true;
  });
  next();
});

router.afterEach(to => {
  NProgress.done();
  const layoutStore = useLayoutStore();
  layoutStore.$patch(state => {
    state.isTransparent = to.meta.transparentBackground ? true : false;
    state.isNoBreadcrumb = to.meta.noBreadcrumb ? true : false;
    state.wrapperType = to.meta.wrapperType ? to.meta.wrapperType : "";
    state.isNavigating = false;
  });
  // 业务区域滚动条自动返回顶部
  const wrapper = document.getElementsByClassName("layout-main-content");
  if (wrapper.length) wrapper[0].scrollTop = 0;
});

export default router;
