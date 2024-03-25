<template>
  <!-- 示例-多级页面 -->
  <div>
    主页面
    <el-button @click="toChildPage">点我跳转子页面</el-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toChildPage = () => {
  router.push({
    path: "/example/page/child",
    query: {
      id: "1",
      type: "2",
    },
  });
};
</script>

<style lang="scss" scoped></style>
