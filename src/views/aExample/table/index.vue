<template>
  <!-- 示例-table样式 -->
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane :label="item.label" :name="index" v-for="(item, index) in tabList" :key="index">
      <component :is="item.component"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import tableBasic from "./tableBasic.vue";
import tableForm from "./tableForm.vue";
import tableWrapper from "./tableWrapper.vue";
import tableRowEdit from "./tableRowEdit.vue";
import tableColumnsDIY from "./tableColumnsDIY.vue";
import tableDragRow from "./tableDragRow.vue";
import { ref } from "vue";

const activeName = ref(0);
const tabList = [
  { label: "基础样式", component: tableBasic },
  { label: "搜索样式", component: tableForm },
  { label: "线框样式", component: tableWrapper },
  { label: "列字段配置（排序、显示/隐藏）", component: tableColumnsDIY },
  { label: "行编辑", component: tableRowEdit },
  { label: "行拖拽（必须设置row-key，且保证是唯一不重复的）", component: tableDragRow },
];
</script>

<style lang="scss" scoped></style>
