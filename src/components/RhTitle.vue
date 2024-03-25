<template>
  <!-- section标题（形式：左侧是线，右侧是标题。常用于区分不容内容块。） -->
  <div
    class="rh-title flex items-center justify-between text-[var(--el-text-color-primary)]"
    :class="[divider ? 'pb-3 border-b border-b-[var(--el-border-color-light)]' : '', nomb ? '' : 'mb-4']"
  >
    <!-- 标题 -->
    <div class="flex items-center">
      <span class="rh-title-divider h-4" :style="{ backgroundColor: lineColor }"></span>
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <!-- 右侧插槽 -->
    <div>
      <slot name="title-right"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "默认标题",
  },
  // 竖线颜色
  lineColor: {
    type: String,
    default: "var(--el-color-primary)",
  },
  divider: {
    type: Boolean,
    default: false,
  },
  // 设置取消margin-bottom
  nomb: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.rh-title {
  &-divider {
    margin-right: 6px;
    width: 3px;
    border-radius: 2px;
  }
}
</style>
