<template>
  <!-- 菜单过滤器 -->
  <el-tooltip effect="dark" content="菜单搜索" placement="bottom" :show-after="250">
    <div class="flex items-center px-3 h-full cursor-pointer" :class="headerToolHoverClasses" @click="showFilterDialog">
      <el-icon size="20"><Search /></el-icon>
    </div>
  </el-tooltip>
  <DialogFilter v-model="menuFilterDialogVisible" />
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { debounce } from "lodash-es";
import { useLayout } from "@/hooks/useLayout.js";
import DialogFilter from "./DialogFilter.vue";

const { layoutStore, menuFilterDialogVisible, headerToolHoverClasses } = useLayout();

const showFilterDialog = debounce(() => {
  layoutStore.$patch(state => {
    state.menuFilterDialogVisible = true;
  });
}, 150);
</script>

<style lang="scss" scoped></style>
