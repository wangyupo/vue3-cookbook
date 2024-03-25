<template>
  <!-- 菜单 -->
  <el-menu
    class="menu"
    :class="[isDark ? 'dark' : '', mode]"
    router
    unique-opened
    :mode="mode"
    :collapse="menuFold"
    :collapse-transition="false"
    :default-active="$route.meta.targetMenuPath || $route.path"
  >
    <template v-for="menuItem in menu">
      <template v-if="menuItem[menuKey.children] && menuItem[menuKey.children].length > 0">
        <el-sub-menu :key="menuItem[menuKey.id]" :index="menuItem[menuKey.id]">
          <template #title>
            <i
              :class="['iconfont text-base mr-2 menuItem-ew-icon', menuItem[menuKey.icon]]"
              v-if="menuItem[menuKey.icon]"
            ></i>
            <span>{{ menuItem[menuKey.title] }}</span>
          </template>
          <MenuItem :menu="menuItem[menuKey.children]" />
        </el-sub-menu>
      </template>

      <el-menu-item v-else-if="menuItem[menuKey.url]" :index="menuItem[menuKey.url]" :key="menuItem[menuKey.id]">
        <i
          :class="['iconfont text-base mr-2 menuItem-ew-icon', menuItem[menuKey.icon]]"
          v-if="menuItem[menuKey.icon]"
        ></i>
        <template #title>
          <span>{{ menuItem[menuKey.title] }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
import { ref, computed, onMounted } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
import { menuKey } from "@/router/menuConfig.js";

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
const { isDark, menuFold, layoutType, getMenu } = useLayout();
const mode = computed(() => {
  return layoutType.value === "LayoutHeadMenu" ? "horizontal" : "vertical";
});
</script>

<style lang="scss" scoped>
@import "@/layout/types/common.scss";

.menu {
  &.horizontal {
    height: $headerHeight;
  }
  &.dark {
    background-color: var(--el-bg-color-overlay);
  }
}
</style>
