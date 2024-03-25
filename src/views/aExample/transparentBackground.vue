<template>
  <!-- 示例-背景透明 -->
  <div>
    <p>
      1、这个业务区域的背景和底色相同，这在业务开发中很常见，想要做到这一点，只需要在配置 router 的时候，将 meta 中的
      transparentBackground 设为 true 即可。
    </p>
    <p>
      2、同时，你会发现面包屑也不见了，这对
      <el-button type="primary" link @click="handleAction">“顶部菜单布局”</el-button>
      中的某些业务情况下友好，想要做到这一点，只需要在配置 router 的时候，将 meta 中的 noBreadcrumb 设为 true 即可。
    </p>
  </div>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";

const layoutStore = useLayoutStore();

// 切换布局
const handleAction = () => {
  layoutStore.changeLayoutType("LayoutHeadMenu");
};
</script>

<style lang="scss" scoped></style>
