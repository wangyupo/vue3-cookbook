<template>
  <!-- 主题颜色选择器 -->
  <div class="flex items-center">
    <template v-for="(item, index) in predefineColors" :key="index">
      <el-tooltip effect="dark" :content="item.name" placement="top" :show-after="250">
        <div
          class="flex items-center justify-center mr-3 first:ml-3 w-[30px] h-[20px] rounded cursor-pointer"
          :style="{ backgroundColor: item.color }"
          @click="changeThemeColor(item.color)"
        >
          <el-icon color="#ffffff" v-show="colorPrimaryBg == item.color"><Select /></el-icon>
        </div>
      </el-tooltip>
    </template>

    <el-tooltip effect="dark" :content="`自定义主题色`" placement="top" :show-after="250">
      <div class="flex items-center h-full">
        <el-color-picker popper-class="mt-3" v-model="colorPrimaryBg" @change="changeThemeColor" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
import { debounce } from "lodash-es";

const { layoutStore, colorPrimaryBg, setElementUIThemeColor, calcThemeColor, isDark } = useLayout();
const predefineColors = ref([
  { color: "#427bff", name: "科技蓝（默认）" },
  { color: "#515a6e", name: "阴影灰" },
  { color: "#925F69", name: "樱花红" },
]);

// 修改主题色
const changeThemeColor = color => {
  if (!color) {
    layoutStore.resetColors();
    setElementUIThemeColor();
    return;
  }
  calcThemeColor(color);
  setElementUIThemeColor();
};

// 监测亮/暗模式切换，自动计算主色值及配套颜色
watch(
  isDark,
  debounce(() => {
    changeThemeColor(colorPrimaryBg.value);
  }, 200)
);
</script>

<style lang="scss" scoped></style>
