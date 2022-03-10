<template>
  <div class="introduce">
    <p class="mb-4 text-center font-semibold">国伟立定跳</p>
    <p>玩法简介：按空格开始本关（或下一关），通过按空格让“国伟”跳起来跨越栏杆，跨越成功即算过关。</p>
  </div>
  <Map />
</template>

<script setup>
import Map from "./components/GameMap.vue";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import loadsh from "lodash";
import { useStore } from "vuex";
const store = useStore();

const state = computed(() => store.state.game);
const stateClone = ref();

onMounted(() => {
  stateClone.value = loadsh.cloneDeep(state.value);
});

onBeforeRouteLeave((to, from) => {
  store.commit("game/resetAllState", stateClone.value);
});
</script>

<style lang="scss" scoped>
.introduce {
  width: 800px;
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
