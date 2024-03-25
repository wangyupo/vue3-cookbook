<template>
  <!-- 无缝滚动包裹 -->
  <div class="rh-seamless-wrapper" :style="wrapperStyle">
    <div
      class="main flex"
      :class="options.direction === 'vertical' ? 'flex-col' : ''"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 列表主体 -->
      <div ref="slotListRef" :style="listStyle">
        <slot></slot>
      </div>
      <!-- 列表复制品 -->
      <div v-html="copyHtml" :style="listStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onUnmounted, reactive, ref, watch } from "vue";
import { cloneDeep } from "lodash-es";
import { typeOf } from "@/utils/index.js";

const props = defineProps({
  // 列表数据（用途：监听变化，并初始化数据填充后的列表高度）
  data: Array,
  // 列表容器宽度
  width: [Number, String],
  // 列表容器高度
  height: [Number, String],
  // 自定义配置项
  options: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const slotListRef = ref(); // 父组件传入dom（用途：计算数据初始化后列表高度）
const slotListHeight = ref(0); // 列表、外层包裹高度
const slotListTop = ref(0); // 列表距顶部距离
const slotListWidth = ref(0); // 列表、外层包裹宽度
const slotListLeft = ref(0); // 列表距左边距离
const copyHtml = ref(""); // 列表复制品（用途：填充主体移动后的空白）
const reqFrame = ref(); // requestAnimationFrame 实例 ID（用途：使用 cancelAnimationFrame 取消已有的动画帧）
// 默认配置（用途：1、赋值响应性配置_options。2、重置_options的值。）
const _optionsDefault = {
  step: 1, // 移动步距（用途：值越大，移动速度越快）
  direction: "vertical", // 滚动方向，vertical-纵向，horizontal-横向
  hoverStop: true,
};
let _options = reactive(cloneDeep(_optionsDefault)); // 实际起作用的配置

const wrapperStyle = computed(() => {
  function buildupUnit(val) {
    return typeOf(val) === "string" ? val : `${val}px`;
  }
  const isVertical = props.options.direction === "vertical";
  const styleVertical = {
    width: props.width ? buildupUnit(props.width) : "auto",
    height: `${props.height ? buildupUnit(props.height) : buildupUnit(slotListHeight.value)}`,
  };
  const styleHorizontal = {
    width: `${props.width ? buildupUnit(props.width) : buildupUnit(slotListWidth.value)}`,
    height: props.height ? buildupUnit(props.height) : "auto",
  };
  return isVertical ? styleVertical : styleHorizontal;
});
const listStyle = computed(() => {
  const isVertical = props.options.direction === "vertical";
  let transitonDirection = isVertical ? "translateY" : "translateX";
  let transitonDirectionValue = isVertical ? slotListTop.value : slotListLeft.value;
  return {
    display: "flex",
    "flex-direction": isVertical ? "column" : "row",
    transform: `${transitonDirection}(${transitonDirectionValue}px)`,
  };
});

watch(
  () => props.data,
  val => {
    // 数据传入后，在dom重绘后初始化 “列表高度” 和 “列表复制品”，并执行无缝滚动动画。
    nextTick(() => {
      resetAndCancelReqFrame();
      slotListWidth.value = slotListRef.value.offsetWidth;
      slotListHeight.value = slotListRef.value.offsetHeight;
      copyHtml.value = slotListRef.value.innerHTML;
      _options = Object.assign({}, _options, props.options);
      seamlessInit();
    });
  },
  {
    immediate: true,
  }
);

onUnmounted(() => {
  resetAndCancelReqFrame();
});

// 重置响应值并清除动画
const resetAndCancelReqFrame = () => {
  slotListWidth.value = 0;
  slotListLeft.value = 0;
  slotListHeight.value = 0;
  slotListTop.value = 0;
  copyHtml.value = "";
  _options = _optionsDefault;
  if (reqFrame.value) window.cancelAnimationFrame(reqFrame.value);
};

// 无缝滚动动画
const seamlessInit = () => {
  const distanceDirection = props.options.direction === "vertical" ? slotListTop : slotListLeft;
  const itemLength = props.options.direction === "vertical" ? -slotListHeight.value : -slotListWidth.value;
  const move = () => {
    distanceDirection.value -= props.options.step;
    if (distanceDirection.value <= itemLength) distanceDirection.value = 0;
    if (slotListRef.value) reqFrame.value = window.requestAnimationFrame(move);
  };
  reqFrame.value = window.requestAnimationFrame(move);
};

// 鼠标移入-中止动画
const handleMouseEnter = () => {
  if (_options.hoverStop) window.cancelAnimationFrame(reqFrame.value);
};

// 鼠标移出-重启动画
const handleMouseLeave = params => {
  if (_options.hoverStop) seamlessInit();
};
</script>

<style lang="scss" scoped>
.rh-seamless-wrapper {
  transition: all 150ms;
  overflow: hidden;
  div {
    flex-shrink: 0;
  }
}
</style>
