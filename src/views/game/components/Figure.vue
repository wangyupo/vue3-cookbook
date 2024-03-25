<template>
  <div id="figure" :style="{ width: figure.width + 'px', height: figure.height + 'px', left: figure.left + 'px' }">
    国伟
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useGameStore } from "@/stores/game.js";
import { storeToRefs } from "pinia";

const jumpUp = ref(null);
const jumpDown = ref(null);
const jumpHeight = ref(600);
const jumpPoor = ref(100);
const gameStore = useGameStore();
const { brick, figure, game } = storeToRefs(gameStore);

watch(
  game,
  val => {
    if (!val.start) {
      jumpHeight.value = 600;
      jumpPoor.value = 100;
    } else {
      if (val.score === 0) return;
      if (jumpHeight.value <= 200) {
        jumpPoor.value = 10;
      }
      jumpHeight.value = jumpHeight.value - jumpPoor.value;
    }
  },
  { deep: true }
);

const figureJump = () => {
  figure.value.bottom += figure.value.speed;
  document.getElementById("figure").style.bottom = figure.value.bottom + "px";
  jumpUp.value = requestAnimationFrame(figureJump);
};

const figureDown = () => {
  figure.value.bottom -= figure.value.speed;
  document.getElementById("figure").style.bottom = figure.value.bottom + "px";
  jumpDown.value = requestAnimationFrame(figureDown);
  if (figure.value.bottom <= brick.value.height) {
    cancelAnimationFrame(jumpDown.value);
    jumpDown.value = null;
  }
};

const moveFn = e => {
  // 移动
  if (e.keyCode === 32) {
    if (!game.value.start) return;
    if (jumpUp.value || jumpDown.value) return;
    figure.value.bottom = brick.value.height;
    jumpUp.value = requestAnimationFrame(figureJump);
    setTimeout(() => {
      cancelAnimationFrame(jumpUp.value);
      jumpUp.value = null;
      jumpDown.value = requestAnimationFrame(figureDown);
    }, jumpHeight.value);
  }
};

onMounted(() => {
  let figureDom = document.getElementById("figure");
  if (!figureDom) return;
  figureDom.style.bottom = brick.value.height + "px";
  document.addEventListener("keydown", moveFn);
});

onBeforeRouteLeave((to, from) => {
  if (jumpDown.value) {
    cancelAnimationFrame(jumpDown.value);
  }
  if (jumpUp.value) {
    cancelAnimationFrame(jumpUp.value);
  }
  document.removeEventListener("keydown", moveFn);
});
</script>

<style lang="scss" scoped>
#figure {
  position: absolute;
  font-size: 14px;
  text-align: center;
  background-color: aqua;
}
</style>
