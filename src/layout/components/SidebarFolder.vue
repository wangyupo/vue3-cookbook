<template>
  <!-- 布局专用-侧边栏折叠器 -->
  <el-icon
    class="cursor-pointer text-[var(--el-text-color-primary)]"
    size="20"
    :title="menuFold ? '展开菜单' : '折叠菜单'"
    @click="toggleMenuFold"
  >
    <Fold v-show="!menuFold" />
    <Expand v-show="menuFold" />
  </el-icon>
</template>

<script setup>
import { useLayout } from "@/hooks/useLayout.js";

const { menuFold, toggleMenuFold } = useLayout();
</script>

<style lang="scss" scoped></style>
