<template>
  <!-- 地板 -->
  <div class="flex absolute bottom-0" id="floor">
    <div class="flex">
      <div
        class="brick"
        :style="{ width: brick.width + 'px', height: brick.height + 'px', backgroundColor: brick.bgColor, order: 0 }"
        v-for="item in brick.total"
        :key="item"
      ></div>
    </div>
    <div class="flex">
      <div
        class="brick splice"
        :style="{ width: brick.width + 'px', height: brick.height + 'px', backgroundColor: brick.bgColor, order: 1 }"
        v-for="item in brick.total"
        :key="item"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const brick = computed(() => store.state.game.brick);
const game = computed(() => store.state.game.game);

watch(game.value, (val, oldVal) => {
  if (game.value.start) {
    document.getElementById("floor").classList.add("floorMove");
  } else {
    document.getElementById("floor").classList.remove("floorMove");
  }
});

onMounted(() => {
  document.getElementById("floor").classList.add("floorMove");
  document.getElementById("floor").style.animationDuration = brick.value.speed + "s";
});
</script>

<style lang="scss" scoped>
.brick {
  border-top: 1px solid;
  border-right: 1px solid;
}

@keyframes FloorMove {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-840px);
  }
}

// 地板滚动
.floorMove {
  animation: FloorMove linear infinite;
}

// 地板暂停
.floorPause {
  animation-play-state: paused;
}
</style>
