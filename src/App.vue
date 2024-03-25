<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>

  <!-- 刷新页面遮罩 -->
  <teleport to="#topSlot">
    <div class="fixed top-0 bottom-0 w-full h-full bg-white z-10" v-if="isReloadMask">
      <div id="top-loader"></div>
    </div>
  </teleport>
</template>

<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import { ref, computed, onMounted, watch } from "vue";
import { useLayout } from "@/hooks/useLayout.js";

// 遮罩
const isReloadMask = ref(true);
onMounted(() => {
  setTimeout(() => {
    isReloadMask.value = false;
  }, 1000);
});

const { isZh, isGray, toggleGray } = useLayout();

// 国际化
const locale = computed(() => (isZh.value ? zhCn : en));

// 全站置灰
watch(
  isGray,
  () => {
    toggleGray();
  },
  { immediate: true }
);
</script>

<style lang="scss"></style>
