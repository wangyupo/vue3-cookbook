<template>
  <!-- 布局-顶栏菜单 -->
  <el-container class="layout">
    <el-header class="layout-header horizontal" :class="[isDark ? 'dark' : '']">
      <div class="flex items-center w-[80%]">
        <HeaderTitle />
        <Menu class="w-[80%]" :menu="menu" />
      </div>
      <HeaderRightTools />
    </el-header>
    <el-container class="layout-main flex-col">
      <RouterHistoryTabs />
      <el-main
        class="layout-main-content headmenuLayout"
        :class="[isTransparent ? 'transparent' : '', isNoBreadcrumb ? 'noBreadcrumb' : '']"
      >
        <div
          class="main-wrapper"
          :style="wrapStyle"
          v-loading="isNavigating"
          :element-loading-text="contentAreaLoadingText"
          :element-loading-spinner="contentAreaLoadingSvg"
        >
          <Breadcrumb class="mb-3" v-if="!isNoBreadcrumb" />
          <div :style="isNoBreadcrumb ? 'height: 100%' : 'height: calc(100% - 40px)'">
            <slot></slot>
          </div>
        </div>
        <el-backtop target=".layout-main-content" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from "@/layout/components/Menu/Index.vue";
import HeaderTitle from "@/layout/components/HeaderTitle.vue";
import RouterHistoryTabs from "@/layout/components/RouterHistoryTabs.vue";
import HeaderRightTools from "@/layout/components/HeaderRightTools.vue";
import Breadcrumb from "@/layout/components/Breadcrumb.vue";
import { useLayout } from "@/hooks/useLayout.js";
import { ref, onMounted } from "vue";

const {
  isDark,
  isTransparent,
  isNoBreadcrumb,
  wrapStyle,
  isNavigating,
  contentAreaLoadingText,
  contentAreaLoadingSvg,
  getMenu,
} = useLayout();

const menu = ref([]);
onMounted(() => {
  menu.value = getMenu();
});
</script>

<style lang="scss" scoped>
@import "./common.scss";
</style>
