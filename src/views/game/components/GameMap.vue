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
import Floor from "./Floor.vue";
import Figure from "./Figure.vue";
import Enemy from "./Enemy.vue";
import Score from "./Score.vue";
import Config from "./Config.vue";
import Fail from "./Fail.vue";
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
