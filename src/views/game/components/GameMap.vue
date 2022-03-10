<template>
  <div id="map">
    <!-- 配置框 -->
    <Config />
    <!-- 分数 -->
    <Score />
    <!-- 人物 -->
    <Figure />
    <!-- 敌人 -->
    <Enemy />
    <!-- 路面 -->
    <Floor />
    <!-- 失败 -->
    <Fail />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed, onMounted } from "vue";
import Floor from "./Floor";
import Figure from "./Figure";
import Enemy from "./Enemy";
import Score from "./Score";
import Config from "./Config";
import Fail from "./Fail";

import { useStore } from "vuex";
const store = useStore();

const game = computed(() => store.state.game.game);
</script>

<style lang="scss" scoped>
#map {
  position: relative;
  border: 2px solid #000;
  margin: 0 auto;
  width: 800px;
  height: 500px;
  overflow: hidden;
}
</style>
