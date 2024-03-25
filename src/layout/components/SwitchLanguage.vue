<template>
  <!-- 国际化 -->
  <el-tooltip effect="dark" :content="`${isZh ? 'English' : '中文'}`" placement="bottom" :show-after="250">
    <div
      class="flex items-center px-3 h-full cursor-pointer"
      :class="headerToolHoverClasses"
      @click.self="handleChangeLanguage"
    >
      <el-switch
        v-model="isZh"
        inline-prompt
        style="--el-switch-on-color: #ee1c25; --el-switch-off-color: #002164"
        active-text="中"
        inactive-text="EN"
      />
    </div>
  </el-tooltip>
</template>

<script setup>
import { useLayout } from "@/hooks/useLayout.js";

const { layoutStore, isZh, headerToolHoverClasses } = useLayout();

// 切换语言
const handleChangeLanguage = () => {
  layoutStore.$patch(state => {
    state.isZh = !isZh.value;
  });
};
</script>

<style lang="scss" scoped></style>
