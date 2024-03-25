<template>
  <!-- 大屏包裹。采用scale放大内容，使用px正常开发即可。 -->
  <div class="rh-ls-wrapper text-white" :style="style">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { debounce } from "lodash-es";

const props = defineProps({
  width: {
    type: [Number, String],
    default: 1920,
  },
  height: {
    type: [Number, String],
    default: 1080,
  },
  background: "#012700",
});

// 默认行内样式
const style = reactive({
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: "scale(1)",
});

onMounted(() => {
  setScale();
  window.onresize = debounce(setScale, 500); // 监听 onresize 事件，执行 setSacle
  document.body.style.background = props.background;
});

// 获取放大缩小比例
const getScale = () => {
  const { width, height } = props;
  const w = window.innerWidth / width;
  const h = window.innerHeight / height;
  return w < h ? w : h;
};

// 修改样式
const setScale = () => {
  style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
};
</script>

<style scoped lang="scss">
.rh-ls-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left top;
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: #fff;
  overflow: hidden;
}
</style>
