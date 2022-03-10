<template>
  <div id="score">
    <p>最高关卡：{{ game.maxScore }}</p>
    <p>当前关卡：{{ game.score }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();

const game = computed(() => store.state.game.game);
</script>

<style lang="scss" scoped>
#score {
  position: absolute;
  top: 10px;
  right: 20px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
