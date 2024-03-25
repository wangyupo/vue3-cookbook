<template>
  <!-- 页面全屏组件 -->
  <el-tooltip effect="dark" :content="isFullscreen ? '取消全屏' : '网页全屏'" placement="bottom" :show-after="250">
    <div class="flex items-center px-3 h-full cursor-pointer" :class="headerToolHoverClasses" @click="toggle">
      <el-icon size="20">
        <FullScreen />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import { useLayout } from "@/hooks/useLayout.js";

const { isFullscreen, toggle } = useFullscreen();
const { headerToolHoverClasses } = useLayout();
</script>

<style lang="scss" scoped></style>
