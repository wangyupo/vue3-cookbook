<template>
  <!-- 切换夜间模式（顶部菜单栏用，置于 HeaderRightTools 组件内使用） -->
  <el-tooltip effect="dark" :content="`切换${isDark ? '亮色' : '暗色'}`" placement="bottom" :show-after="250">
    <div class="flex items-center h-full hover:bg-[--el-color-primary-dark-2]">
      <el-switch v-model="isDark" :active-action-icon="Moon" :inactive-action-icon="Sunny" class="night-switch px-3" />
    </div>
  </el-tooltip>
</template>

<script setup>
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useLayout } from "@/hooks/useLayout.js";

const { isDark } = useLayout();
</script>

<style lang="scss" scoped>
.night-switch {
  & :deep(.el-switch__core) {
    border-color: var(--el-border-color);
  }
}
</style>
