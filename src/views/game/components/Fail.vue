<template>
  <div id="fail" class="flex flex-col items-center justify-center" v-if="!game.start">
    <template v-if="game.score < game.finalScore">
      <p>你被绊倒了，请重新来过。</p>
      <el-button class="mt-4" @click="handleStart">再来一局</el-button>
    </template>
    <template v-else>
      <p>恭喜你，通过全部{{game.finalScore}}关！</p>
      <el-button class="mt-4" @click="handleReStart">重新开始</el-button>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed, watch, onMounted } from "vue";
import loadsh from "lodash";
import { useStore } from "vuex";
const store = useStore();

const game = computed(() => store.state.game.game);
const gameClone = ref();

onMounted(() => {
  gameClone.value = loadsh.cloneDeep(game.value);
});

const handleStart = () => {
  store.commit("game/setGameStart", true);
};
const handleReStart = () => {
  store.commit("game/setGameScore", 0);
  store.commit("game/setGameMaxScore", 0);
  store.commit("game/setGameStart", true);
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
