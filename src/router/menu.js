const menus = [
  {
    path: "/begin",
    title: "从这儿开始",
  },
  {
    title: "基础学习",
    path: "/base",
    children: [
      {
        path: "/base/1-setup",
        title: "1、创建响应值",
      },
      {
        path: "/base/2-fn",
        title: "2、创建方法",
      },
      {
        path: "/base/3-changeValue",
        title: "3、使用方法赋值",
      },
      {
        path: "/base/4-useComponent",
        title: "4、使用组件",
      },
      {
        path: "/base/5-useChildFn",
        title: "5、调用子组件方法、值",
      },
      {
        path: "/base/6-props&emit",
        title: "6、组件传值&自定义事件",
      },
      {
        path: "/base/7-compositionApi",
        title: "7、组合式API生命周期钩子",
      },
      {
        path: "/base/8-computed&watch",
        title: "8、响应式计算和侦听",
      },
      {
        path: "/base/9-nextTick",
        title: "9、dom更新后操作",
      },
      {
        path: "/base/10-teleport",
        title: "10、teleport移动dom",
      },
    ],
  },
  {
    title: "第三方包学习",
    path: "/package",
    children: [
      {
        path: "/package/1-axios",
        title: "1、使用Axios",
      },
      {
        path: "/package/2-store",
        title: "2、使用Vuex",
      },
      {
        path: "/package/3-router",
        title: "3、使用Router",
      },
      {
        path: "/package/4-tailwindcss",
        title: "4、使用Tailwind CSS",
      },
    ],
  },
  {
    path: "/game",
    title: "做个项目",
  },
  {
    path: "/end",
    title: "在这儿结束",
  },
];

export default menus;
