<template>
  <div class="config">
    <p>游戏属性：{{ game }}</p>
    <p>地砖属性：{{ brick }}</p>
    <p>人物属性：{{ figure }}</p>
    <p>敌人属性：{{ enemy }}</p>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/game.js";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { brick, game, figure, enemy } = storeToRefs(gameStore);
</script>

<style lang="scss" scoped>
.config {
  font-size: 13px;
}
</style>
