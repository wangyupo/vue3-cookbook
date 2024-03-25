<template>
  <!-- 3、简单的上手 -->
  <div>
    <p>一、确认你已经安装启动了 v3s，并且已经用 vsCode 打开 v3s 的目录，安装了 V3S Snippets 扩展。</p>
    <p class="mt-3">二、打开 /src/views/login.vue ，全选所有内容，然后清空并保存。</p>
    <p class="mt-3">
      三、在 /src/views/login.vue 文件中，输入 v3s-base ，等待出现代码提示后，按下回车，一个最基本的 vue3
      项目结构就创建好了，可以开始
      <el-link type="primary" @click="handleNext">下一章</el-link>
      的学习了。
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 下一章
const handleNext = () => {
  router.push({
    path: "/package/1-axios",
  });
};
</script>

<style lang="scss" scoped></style>
