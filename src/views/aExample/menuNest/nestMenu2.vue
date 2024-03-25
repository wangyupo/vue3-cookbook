<template>
  <div>
    路由菜单2
  </div>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";

const layoutStore = useLayoutStore();

const changeLayoutStyle = type => {
  layoutStore.changeLayoutType(type);
};
</script>

<style lang="scss" scoped></style>
