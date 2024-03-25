<template>
  <div id="fail" class="flex flex-col items-center justify-center" v-if="!game.start">
    <template v-if="game.score < game.finalScore">
      <p>你被绊倒了，请重新来过。</p>
      <el-button class="mt-4" @click="handleStart">再来一局</el-button>
    </template>
    <template v-else>
      <p>恭喜你，通过全部{{ game.finalScore }}关！</p>
      <el-button class="mt-4" @click="handleReStart">重新开始</el-button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { cloneDeep } from "lodash-es";
import { useGameStore } from "@/stores/game.js";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const gameClone = ref();

onMounted(() => {
  gameClone.value = cloneDeep(game.value);
});

const handleStart = () => {
  gameStore.setGameStart(true);
};
const handleReStart = () => {
  gameStore.setGameScore(0);
  gameStore.setGameMaxScore(0);
  gameStore.setGameStart(true);
};
</script>

<style lang="scss" scoped>
#fail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
