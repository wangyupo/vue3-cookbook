<template>
  <!-- 数字动画（将一个数字以动画的形式动态渐变到指定值的组件） -->
  <div class="rh-countup">
    <slot name="prefix"></slot>
    <span ref="elRef"></span>
    <slot name="suffix"></slot>
  </div>
</template>

<script setup>
import { CountUp } from "countup.js";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  // 结束数值
  endVal: {
    type: [String, Number],
    default: 1000,
  },
  // 开始数值
  startVal: {
    type: [String, Number],
    default: 0,
  },
  // 动画时长，单位 秒
  duration: {
    type: [String, Number],
    default: 2,
  },
  // 小数点位数
  decimalPlaces: Number,
  // 千分位分隔符
  separator: {
    type: String,
    default: ",",
  },
  // CountUp.js 配置项
  options: {
    type: Object,
    default: () => {},
  },
});

const emits = defineEmits(["init", "finished"]);

const elRef = ref(); // dom实例
let countUp = ref(); // CountUp实例对象

const initCountUp = () => {
  if (!elRef.value) return;
  const startVal = Number(props.startVal);
  const endVal = Number(props.endVal);
  const duration = Number(props.duration);
  countUp.value = new CountUp(elRef.value, endVal, {
    startVal,
    duration,
    decimalPlaces: props.decimalPlaces,
    separator: props.separator,
    ...props.options,
  });
  if (countUp.value.error) {
    console.error(countUp.value.error);
    return;
  }
  countUp.value?.start();
  emits("init", countUp.value);
};

onMounted(() => {
  initCountUp();
});

watch(
  () => props.endVal,
  value => {
    if (!countUp.value) {
      initCountUp();
    } else {
      countUp.value?.update(value);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  countUp.value?.reset();
});
</script>

<style lang="scss" scoped></style>
