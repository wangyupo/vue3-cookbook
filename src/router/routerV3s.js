// v3s
const routerBase = [
  {
    path: "/v3s/1-what",
    name: "1-what",
    component: () => import("../views/v3s/1-what/index.vue"),
  },
  {
    path: "/v3s/2-start",
    name: "2-start",
    component: () => import("../views/v3s/2-start/index.vue"),
  },
  {
    path: "/v3s/3-todo",
    name: "3-todo",
    component: () => import("../views/v3s/3-todo/index.vue"),
  },
];

export default routerBase;
