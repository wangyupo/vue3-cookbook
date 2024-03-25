<template>
  <!-- 示例-弹窗使用 -->
  <div>
    <el-button @click="showDialog">点击弹窗</el-button>
    <Dialog v-model="dialogVisible" title="示例标题123" />
  </div>
</template>

<script setup>
import Dialog from "./dialog.vue";
import { ref } from "vue";
import { debounce } from "lodash-es";

const dialogVisible = ref(false);

const showDialog = debounce(() => {
  dialogVisible.value = true;
}, 150);
</script>

<style lang="scss" scoped></style>
