<template>
  <!-- 布局专用-系统标题 -->
  <div
    class="layout-header-title select-none"
    :class="[
      layoutType === 'LayoutClassic'
        ? 'expand'
        : layoutType === 'LayoutSideMenu' && menuFold
        ? 'fold title-height'
        : 'expand title-height',
      isDark ? 'dark' : '',
    ]"
    :title="title"
    @click="toHomePage"
  >
    <div :class="titleColorClass">
      {{ layoutType === "LayoutSideMenu" && menuFold ? titleSimple : title }}
    </div>
  </div>
</template>

<script setup>
import { useLayout } from "@/hooks/useLayout.js";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { layoutType, menuFold, isDark } = useLayout();

const title = import.meta.env.VITE_SYSTEM_TITLE;
const titleSimple = import.meta.env.VITE_SYSTEM_TITLE_SIMPLE;

const titleColorClass = computed(() => {
  // 定义一个根据layoutType来返回文字颜色的计算属性
  const colorClasses = {
    LayoutClassic: "text-[var(--el-text-color-primary)]",
    default: "text-white", // 默认值
  };

  // 返回相应的color类，如果layoutType不存在则使用默认值
  return colorClasses[layoutType.value] ?? colorClasses["default"];
});

const router = useRouter();
const toHomePage = () => {
  router.push({ path: "/" });
};
</script>

<style lang="scss" scoped>
@import "../types/common.scss";

.title-height {
  height: $headerHeight;
}
</style>
