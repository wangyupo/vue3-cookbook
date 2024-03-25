<template>
  <ul class="list-disc ml-3">
    <li>
      本用例仅针对从vue2快速过渡到vue3的人员，如果你没有vue使用经验，请先从另一个项目学起：
      <a class="underline text-blue-600" target="__blank" href="https://github.com/wangyupo/vue-vuex-router">
        vue-vuex-router
      </a>
    </li>
    <li class="mt-2">
      {{ str }}，关于该语法糖请参阅：
      <a
        class="underline text-blue-600"
        target="__blank"
        href="https://v3.cn.vuejs.org/api/sfc-script-setup.html#单文件组件<script setup>"
      >
        单文件组件
      </a>
    </li>
    <li class="mt-2">
      本用例中所有代码展示中的UI组件（'el-'开头）均来自 element-plus 组件库，具体参阅：
      <a
        class="underline text-blue-600"
        target="__blank"
        href="https://element-plus.gitee.io/zh-CN/component/button.html"
      >
        element-plus
      </a>
    </li>
    <li class="mt-2">
      本用例使用了vue3的新特性，组件中支持了多根节点（即template中无需创建一个最外层div），具体参阅：
      <a class="underline text-blue-600" target="__blank" href="https://v3-migration.vuejs.org/zh/new/fragments.html">
        片段
      </a>
    </li>
    <li class="mt-2">
      该示例项目使用 v3s 搭建，如果你的业务需要你快速、安全、标准的搭建中后台，请使用：
      <a class="underline text-blue-600" target="__blank" href="https://github.com/wangyupo/v3s">v3s</a>
    </li>
  </ul>
  <div class="flex flex-col items-center justify-center absolute bottom-5 left-0 right-0">
    <img src="@/assets/logo.png" alt="logo" class="w-36 h-36" />
    <p class="font-semibold">《vue3快速学习》</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const str = "本用例全部使用<script setup>语法糖（即‘组合式API’）";
</script>
