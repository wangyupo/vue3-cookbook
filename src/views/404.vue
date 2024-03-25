<template>
  <div class="flex items-center justify-center flex-col h-full">
    <p class="text-[120px] text-gray-400">404</p>
    <p>
      页面不存在，点此
      <span class="hover:underline text-blue-500 hover:text-blue-600 cursor-pointer" @click="bckLastRoute">
        返回上一级
      </span>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const bckLastRoute = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
