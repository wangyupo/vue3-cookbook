<template>
  <div class="config">
    <p>游戏属性：{{ game }}</p>
    <p>地砖属性：{{ brick }}</p>
    <p>人物属性：{{ figure }}</p>
    <p>敌人属性：{{ enemy }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const brick = computed(() => store.state.game.brick);
const game = computed(() => store.state.game.game);
const figure = computed(() => store.state.game.figure);
const enemy = computed(() => store.state.game.enemy);
</script>

<style lang="scss" scoped>
.config {
  font-size: 13px;
}
</style>
