<template>
  <div>
    <el-button type="primary" @click="handleRouter">点我打印router对象</el-button>
    <el-button type="primary" @click="handleRoute">点我打印route对象</el-button>
    <el-button type="primary" @click="handleGo">点我跳转</el-button>
    <el-button type="primary" @click="handleCurrent">点我打印当前路由</el-button>
  </div>
  <p class="italic mt-4">请打开控制台查看打印内容。</p>

  <div v-highlight class="mt-8" style="width: 920px">
    <p class="font-bold">组件代码：</p>
    <pre>
            <code>
&lt;template&gt;
  &lt;el-button type="primary" @click="handleRouter"&gt;点我打印router对象&lt;/el-button&gt;
  &lt;el-button type="primary" @click="handleRoute"&gt;点我打印route对象&lt;/el-button&gt;
  &lt;el-button type="primary" @click="handleGo"&gt;点我跳转&lt;/el-button&gt;
  &lt;el-button type="primary" @click="handleCurrent"&gt;点我打印当前路由&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

  // 键入 v3s-router ，待代码提示出现后，回车，会自动生成 router 代码。
  const router = useRouter();
  // 键入 v3s-route ，待代码提示出现后，回车，会自动生成 route 代码。
  const route = useRoute();

  const handleRouter = () => {
    console.log("router对象，内含路由操作方法：", router);
  };
  const handleRoute = () => {
    console.log("route对象，内含当前路由属性：", route);
  };
  const handleGo = () => {
    router.push("/package/1-axios");
  };
  const handleCurrent = () => {
    console.log("当前页面路由：", route.path);
  };

  // 导航守卫
  onBeforeRouteLeave((to, from) => {
    const answer = window.confirm("你确定要跳转页面吗？");
    // 取消导航并停留在同一页面上
    if (!answer) return false;
  });
&lt;/script&gt;
            </code>
        </pre>
  </div>

  <RhReferenceLink class="mt-4" :links="links" />
</template>

<script setup>
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
const router = useRouter();
const route = useRoute();

const handleRouter = () => {
  console.log("router对象，内含路由操作方法：", router);
};
const handleRoute = () => {
  console.log("route对象，内含当前路由属性：", route);
};
const handleGo = () => {
  router.push("/package/1-axios");
};
const handleCurrent = () => {
  console.log("当前页面路由：", route.path);
};

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm("你确定要跳转页面吗？");
  // 取消导航并停留在同一页面上
  if (!answer) return false;
});

const links = [
  {
    label: "vue-router 如何在 setup 模式中使用组合式API？",
    link: "https://router.vuejs.org/zh/guide/advanced/composition-api.html",
  },
  {
    label: "useRouter 是什么？",
    link: "https://router.vuejs.org/zh/api/#Functions-useRouter",
  },
  {
    label: "Router 对象都有哪些方法？",
    link: "https://router.vuejs.org/zh/api/interfaces/Router.html#Methods",
  },
  {
    label: "useRoute 是什么？",
    link: "https://router.vuejs.org/zh/api/#Functions-useRoute",
  },
  {
    label: "Route 对象都有哪些属性？",
    link: "https://router.vuejs.org/zh/api/interfaces/RouteLocationNormalizedLoaded.html#Properties",
  },
  {
    label: "vue-router 如何在 setup 模式中使用导航守卫？",
    link: "https://router.vuejs.org/zh/guide/advanced/composition-api.html#导航守卫",
  },
];
</script>
