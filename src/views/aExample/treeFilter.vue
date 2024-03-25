<template>
  <div class="flex h-full">
    <RhWrapper title="单选" class="w-[300px]">
      <RhTree default-expand-all fixSearch :data="data" @node-click="handleNodeClick" />
    </RhWrapper>
    <RhWrapper title="多选" class="ml-3 w-[300px]">
      <RhTree default-expand-all show-checkbox :data="data" @check="handleCheck" />
    </RhWrapper>
    <RhWrapper title="自定义节点内容" class="ml-3 w-[300px]">
      <RhTree default-expand-all show-checkbox :data="data" @check="handleCheck">
        <template #default="{ node, data }">
          {{ node.label }}
          <el-icon class="ml-2"><Link /></el-icon>
        </template>
      </RhTree>
    </RhWrapper>
  </div>
</template>

<script setup>
import { ref } from "vue";

const handleNodeClick = params => {
  console.log("单选：", params);
};

const handleCheck = params => {
  console.log("多选：", params);
};

const data = ref([
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
