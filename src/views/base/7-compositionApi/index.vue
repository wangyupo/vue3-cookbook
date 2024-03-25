<template>
  <div class="flex justify-between">
    <div>
      <p class="italic">
        1、本节请打开控制台，并刷新页面，观察打印
        <span class="font-semibold">“组合式API：API name”</span>
      </p>
      <p class="italic">
        2、所有组合式 API 的使用方法都是传入一个
        <span class="font-semibold underline">函数（即“方法”）</span>
      </p>
    </div>

    <div class="w-96 italic text-sm font-semibold leading-6 mr-8">
      <p>
        <span class="text-xl">注：</span>
        选项式 API 即 vue2.x 中 export default 中的生命周期函数，而组合式 API 是 vue3.x 中 setup
        模式中的生命周期函数，具体参考：
        <a class="text-blue-600" href="https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子" target="__blank">
          生命周期钩子
        </a>
      </p>
    </div>
  </div>

  <div v-highlight class="w-3/5 mt-8">
    <p class="font-bold">组件代码：</p>
    <pre>
        <code>
&lt;script setup&gt;
  // vue setup 中所有的组合式API
  import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    onErrorCaptured,
    onRenderTracked,
    onRenderTriggered,
    onActivated,
    onDeactivated,
  } from "vue";

  // 使用方法均为：传入一个函数（即“方法”）
  onBeforeMount(() => {
    console.log("组合式API：onBeforeMount");
  });

  const cons = () => {
    console.log("组合式API：onMounted");
  };
  onMounted(() => {
    cons();
  });
&lt;/script&gt;
        </code>
    </pre>
  </div>

  <RhReferenceLink :links="links" />
</template>

<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
} from "vue";

onBeforeMount(() => {
  console.log("组合式API：onBeforeMount");
});

const cons = () => {
  console.log("组合式API：onMounted");
};
onMounted(() => {
  cons();
});

const links = [
  {
    label: "什么是组合式 API？",
    link: "https://cn.vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api",
  },
  {
    label: "vue生命周期图示：",
    link: "https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram",
  },

  {
    label: "在 <script setup> 中使用组合式生命周期：",
    link: "https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-hooks",
  },
  {
    label: "所有的组合式生命周期钩子：",
    link: "https://cn.vuejs.org/api/composition-api-lifecycle.html#composition-api-lifecycle-hooks",
  },
  {
    label: "Vue3 组合式生命周期完整指南：",
    link: "https://segmentfault.com/a/1190000039680245",
  },
];
</script>
