<template>
  <!-- 示例-弹窗 -->
  <el-dialog v-model="dialogVisible" v-bind="$attrs" width="30%" @opened="opened" @closed="closed">示例弹窗</el-dialog>
</template>

<script setup>
/** dialog START **/
const emits = defineEmits(["opened", "closed"]);
const dialogVisible = defineModel();

// 弹窗开启
const opened = () => {
  emits("opened");
};

// 弹窗关闭
const closed = () => {
  resetData();
  emits("closed");
};

// 重置数据
const resetData = () => {};
/** dialog END **/
</script>

<style lang="scss" scoped></style>
