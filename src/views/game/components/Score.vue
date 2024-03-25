<template>
  <div id="score">
    <p>最高关卡：{{ game.maxScore }}</p>
    <p>当前关卡：{{ game.score }}</p>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game.js";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
</script>

<style lang="scss" scoped>
#score {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
