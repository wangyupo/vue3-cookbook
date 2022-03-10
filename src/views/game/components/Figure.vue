<template>
  <div id="figure" :style="{ width: figure.width + 'px', height: figure.height + 'px', left: figure.left + 'px' }">
    国伟
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed, onMounted, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
const store = useStore();

const jumpUp = ref(null);
const jumpDown = ref(null);
const brick = computed(() => store.state.game.brick);
const figure = computed(() => store.state.game.figure);
const game = computed(() => store.state.game.game);

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

const moveFn = (e) => {
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
    }, 300);
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
