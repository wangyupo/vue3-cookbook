<template>
  <div class="introduce">
    <p class="mb-4 text-center font-semibold">国伟立定跳</p>
    <p>玩法简介：按空格开始本关（或下一关），通过按空格让“国伟”跳起来跨越栏杆，跨越成功即算过关，共10关。</p>
  </div>
  <Map />
</template>

<script setup>
import Map from "./components/GameMap.vue";
import { ref, onMounted, computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { cloneDeep } from "lodash-es";

import { useGameStore } from "@/stores/game.js";
import { storeToRefs } from "pinia";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

// import { useStore } from "vuex";
// const store = useStore();

// const state = computed(() => store.state.game);
const stateClone = ref();

onMounted(() => {
  stateClone.value = cloneDeep(game.value);
});

onBeforeRouteLeave((to, from) => {
  // store.commit("game/resetAllState", stateClone.value);
  gameStore.resetAllState(stateClone.value);
});
</script>

<style lang="scss" scoped>
.introduce {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
