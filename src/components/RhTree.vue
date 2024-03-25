<template>
  <!-- 树形筛选器 -->
  <div class="rh-tree" :class="fixSearch ? 'fixSearch' : ''">
    <div class="rh-tree-input mb-3">
      <el-input v-model="input" :placeholder="placeholder" clearable @input="filterTree" />
    </div>
    <div class="rh-tree-main flex-1" :class="fixSearch ? 'overflow-y-auto' : ''">
      <el-tree ref="rhTreeRef" v-bind="$attrs" :filter-node-method="filterNode">
        <template v-for="(index, name) in $slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data" :key="index">{{ data.node.label }}</slot>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup>
import { ref, useAttrs } from "vue";

const attrs = useAttrs();
const porps = defineProps({
  // 搜索框占位文字
  placeholder: {
    type: String,
    default: "请输入关键字进行过滤",
  },
  // 是否固定搜索框
  fixSearch: {
    type: Boolean,
    default: false, // true-搜索框固定不动；false-搜索框随文档流滚动
  },
});

const input = ref();
const rhTreeRef = ref();

// 响应输入框内容筛选树节点
const filterTree = inputVal => {
  rhTreeRef.value.filter(inputVal);
};

// 筛选树节点
const filterNode = (value, data) => {
  if (!value) return true;
  let key = "label";
  if (attrs.props && attrs.props.label) key = attrs.props.label;
  return data[key].includes(value);
};

defineExpose({
  rhTreeRef,
});
</script>

<style lang="scss" scoped>
.rh-tree {
  &.fixSearch {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
