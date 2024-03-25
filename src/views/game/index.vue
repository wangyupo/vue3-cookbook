<template>
  <div class="introduce">
    <p class="mb-4 text-center font-semibold">国伟立定跳</p>
    <p>玩法简介：按空格开始本关（或下一关），通过按空格让“国伟”跳起来跨越栏杆，跨越成功即算过关，共10关。</p>
  </div>
  <Map />
</template>

<script setup>
import Map from "./components/GameMap.vue";
import { onBeforeRouteLeave } from "vue-router";

import { useGameStore } from "@/stores/game.js";

const gameStore = useGameStore();

onBeforeRouteLeave((to, from) => {
  gameStore.$reset();
});
</script>

<style lang="scss" scoped>
.introduce {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
