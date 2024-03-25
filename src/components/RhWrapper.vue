<template>
  <!-- 通用业务包裹 -->
  <div
    :class="[
      'rh-wrapper flex flex-col',
      noRound ? 'noRound' : '',
      noBorder ? 'noBorder' : '',
      noXBorder ? 'noXBorder' : '',
      noLeftBorder ? 'noLeftBorder' : '',
      noRightBorder ? 'noRightBorder' : '',
      noYBorder ? 'noYBorder' : '',
      noTopBorder ? 'noTopBorder' : '',
      noBottomBorder ? 'noBottomBorder' : '',
      isDark ? 'bg-[var(--el-bg-color)]' : 'bg-white',
    ]"
  >
    <div
      :class="['rh-wrapper-head flex justify-between items-center overflow-hidden', noBorder ? 'border-b-0' : 'p-3 h-default border-b']"
    >
      <RhTitle :title="title" :lineColor="lineColor" nomb />
      <div>
        <slot name="title-right"></slot>
      </div>
    </div>
    <div ref="mainRef" :class="['rh-wrapper-main flex-1 overflow-y-auto relative', noBorder ? 'mt-3' : 'p-3']">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
const { isDark } = useLayout();

const props = defineProps({
  // 标题
  title: String,
  // 竖线颜色
  lineColor: String,
  // 取消圆角
  noRound: {
    type: Boolean,
    default: false,
  },
  // 取消圆角
  noBorder: {
    type: Boolean,
    default: false,
  },
  // 取消左右边框
  noXBorder: {
    type: Boolean,
    default: false,
  },
  // 取消左边框
  noLeftBorder: {
    type: Boolean,
    default: false,
  },
  // 取消右边框
  noRightBorder: {
    type: Boolean,
    default: false,
  },
  // 取消上下边框
  noYBorder: {
    type: Boolean,
    default: false,
  },
  // 取消上边框
  noTopBorder: {
    type: Boolean,
    default: false,
  },
  // 取消下边框
  noBottomBorder: {
    type: Boolean,
    default: false,
  },
});

const mainRef = ref();

const realReac = computed(() => {
  const pHeight = Number(window.getComputedStyle(mainRef.value).paddingTop.split("px")[0]);
  const pWidth = Number(window.getComputedStyle(mainRef.value).paddingLeft.split("px")[0]);
  return {
    innerWidth: mainRef.value.clientWidth - 2 * pWidth,
    innerHeight: mainRef.value.clientHeight - 2 * pHeight,
  };
});

defineExpose({
  mainRef,
  realReac,
});
</script>

<style lang="scss" scoped>
.rh-wrapper {
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  &-head {
    border-bottom-color: var(--el-border-color-light);
    &.h-default {
      height: 46px;
    }
  }
  &.noRound {
    border-radius: 0;
  }
  &.noBorder {
    border: none;
  }
  &.noXBorder {
    border-left-width: 0;
    border-right-width: 0;
  }
  &.noLeftBorder {
    border-left-width: 0;
  }
  &.noRightBorder {
    border-right-width: 0;
  }
  &.noYBorder {
    border-top-width: 0;
    border-bottom-width: 0;
  }
  &.noTopBorder {
    border-top-width: 0;
  }
  &.noBottomBorder {
    border-bottom-width: 0;
  }
}
</style>
