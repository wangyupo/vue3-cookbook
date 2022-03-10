<template>
  <p>
    本用例，可以当作 vue3 项目的“参考书”，慢慢熟练了，也就用不着了，多查文档，多阅读其它优秀 vue3
    作品，总结出适合自己开发的经验。
  </p>
  <p class="end">没有外链，没有推荐，END</p>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<style lang="scss" scoped>
.end {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
}
</style>
