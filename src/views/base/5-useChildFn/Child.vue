<template>
  <div @click="handleChildClick" class="text-sm">
    <p class="font-semibold">我是子组件</p>
    <p class="mt-2">向外暴露的值：childExpose</p>
    <p class="mt-2">不向外暴露值：childUnexpose</p>
    <p class="mt-2">内部方法：handleChildClick</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
const childExpose = ref("我是暴露的值！");
const childUnexpose = ref("我是没有被暴露的值！");
const handleChildClick = () => {
  alert("我是子组件内部的方法！");
};

// 通过 defineExpose 暴露出去的值、方法等，才能被取到
defineExpose({
  childExpose,
  handleChildClick,
});
</script>
