// 第三方包学习路由
const routerPackage = [
  {
    path: "/package/1-axios",
    name: "1-axios",
    component: () => import("../views/package/1-axios/index.vue"),
  },
  {
    path: "/package/2-pinia",
    name: "2-pinia",
    component: () => import("../views/package/2-pinia/index.vue"),
  },
  {
    path: "/package/3-router",
    name: "3-router",
    component: () => import("../views/package/3-router/index.vue"),
  },
  {
    path: "/package/4-tailwindcss",
    name: "4-tailwindcss",
    component: () => import("../views/package/4-tailwindcss/index.vue"),
  },

];

export default routerPackage;
