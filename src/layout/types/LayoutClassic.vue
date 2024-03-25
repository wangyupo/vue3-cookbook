<template>
  <!-- 布局-经典菜单 -->
  <el-container class="layout">
    <el-header class="layout-header" :class="[isDark ? 'dark' : '']">
      <div class="flex items-center">
        <HeaderTitle />
        <SidebarFolder class="ml-3" />
        <Breadcrumb class="ml-3" />
      </div>
      <HeaderRightTools />
    </el-header>
    <el-container class="layout-main">
      <el-aside class="layout-aside" :class="[menuFold ? 'fold' : 'expand', isDark ? 'dark' : '']">
        <Menu class="layout-aside-menu classic" :menu="menu" />
      </el-aside>
      <el-container class="flex-col">
        <RouterHistoryTabs />
        <el-main class="layout-main-content" :class="[isTransparent ? 'transparent' : '']">
          <div
            class="main-wrapper"
            :style="wrapStyle"
            v-loading="isNavigating"
            :element-loading-text="contentAreaLoadingText"
            :element-loading-spinner="contentAreaLoadingSvg"
          >
            <slot></slot>
          </div>
          <el-backtop target=".layout-main-content" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import HeaderTitle from "@/layout/components/HeaderTitle.vue";
import SidebarFolder from "@/layout/components/SidebarFolder.vue";
import Menu from "@/layout/components/Menu/Index.vue";
import RouterHistoryTabs from "@/layout/components/RouterHistoryTabs.vue";
import HeaderRightTools from "@/layout/components/HeaderRightTools.vue";
import Breadcrumb from "@/layout/components/Breadcrumb.vue";
import { useLayout } from "@/hooks/useLayout.js";
import { ref, onMounted } from "vue";

const {
  menuFold,
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
