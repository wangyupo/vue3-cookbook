import { createRouter, createWebHashHistory } from "vue-router";
import routerBase from "./routerBase";
import routerPackage from "./routerPackage";

const routes = [
  {
    path: "/",
    redirect: "/begin",
  },
  {
    path: "/g",
    name: "g",
    component: () => import("../views/game/index.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/r",
        name: "r",
        component: () => import("../views/convert-symbols.vue"),
      },
      {
        path: "/begin",
        name: "begin",
        component: () => import("../views/begin/index.vue"),
      },
      {
        path: "/game",
        name: "game",
        component: () => import("../views/game/index.vue"),
      },
      {
        path: "/end",
        name: "end",
        component: () => import("../views/end/index.vue"),
      },
      ...routerBase,
      ...routerPackage,
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/vue3-cookbook-website/'),
  routes,
});

router.afterEach((to, from) => {
  if (document.getElementsByClassName("el-main").length) {
    document.getElementsByClassName("el-main")[0].scrollTo(0, 0);
  }
});

export default router;
