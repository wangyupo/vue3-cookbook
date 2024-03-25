<template>
  <!-- 布局-混合菜单 -->
  <el-container class="layout">
    <el-header class="layout-header mix" :class="[isDark ? 'dark' : '']">
      <div class="flex items-center flex-1">
        <HeaderTitle />
        <el-menu :default-active="headerMenuActiveIdx" class="header-menu" mode="horizontal" @select="handleHeaderMenu">
          <el-menu-item v-for="(menuItem, index) in headerMenu" :index="index">
            <i
              :class="['iconfont text-base mr-2 menuItem-ew-icon', menuItem[menuKey.icon]]"
              v-if="menuItem[menuKey.icon]"
            ></i>
            <template #title>
              <span>{{ menuItem[menuKey.title] }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <HeaderRightTools />
    </el-header>
    <el-container class="layout-main">
      <el-aside class="layout-aside" :class="[menuFold ? 'fold' : 'expand', isDark ? 'dark' : '']">
        <Menu class="layout-aside-menu classic" :menu="sideMenu" />
      </el-aside>
      <el-container class="flex-col">
        <!-- <RouterHistoryTabs /> -->
        <div class="-mb-3 px-3"><Breadcrumb /></div>
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
import { arr2tree } from "@/utils/index.js";
import { useRoute } from "vue-router";

const route = useRoute();
const {
  menuFold,
  isDark,
  isTransparent,
  wrapStyle,
  isNavigating,
  contentAreaLoadingText,
  contentAreaLoadingSvg,
  getMenu,
  getAllMenu,
  menuKey,
  layoutStore,
  headerMenuActiveIdx,
} = useLayout();

const menu = ref([]); // 整体菜单
const headerMenu = ref([]); // 顶栏菜单（一级菜单）
const sideMenu = ref([]); // 侧栏菜单（一级页面 && 非一级菜单）

onMounted(() => {
  menu.value = getMenu();
  headerMenu.value = menu.value.filter(i => i.parentId == 0);
  const currentMenuRootParent = findRootNodeAndIndex(route.path, getAllMenu());
  handleHeaderMenu(currentMenuRootParent.rootIndex);
});

/**
 * 获取任意菜单的顶级父节点
 * @param {String} url 任意菜单
 * @param {Array} data 菜单（树数据）
 * @return {Object} { rootNode, rootIndex } 顶级父节点对象、顶级父节点在树数据中的索引
 */
const findRootNodeAndIndex = (url, data) => {
  function searchNode(node, url) {
    if (node.url === url) return true;
    if (node.children) {
      return node.children.some(child => searchNode(child, url));
    }
    return false;
  }
  for (let i = 0; i < data.length; i++) {
    const isFound = searchNode(data[i], url);
    if (isFound) return { rootIndex: i, rootNode: data[i] };
  }
};

// 设置侧栏菜单
const setSideMenu = () => {
  const idx = parseInt(headerMenuActiveIdx.value);
  if (!menu.value[idx]) {
    console.error(`Failed to find menu in ${idx}.`);
    return;
  }
  sideMenu.value = menu.value[idx].children ? menu.value[idx].children : [menu.value[idx]];
};

// 点击顶栏菜单
const handleHeaderMenu = index => {
  layoutStore.$patch(state => {
    state.headerMenuActiveIdx = index;
  });
  setSideMenu();
};
</script>

<style lang="scss" scoped>
@import "./common.scss";

.header-menu {
  width: 100%;
  height: $headerHeight;
  background-color: var(--el-menu-bg-color);
}
</style>
