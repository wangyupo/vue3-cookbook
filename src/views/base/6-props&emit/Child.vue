<template>
  <div class="text-sm">
    <p class="font-semibold">我是子组件</p>
    <p class="mt-2 text-xs">从父组件传进来的值：{{ today }}</p>
    <el-button class="mt-2" type="primary" @click="handleClick">点我触发自定义事件</el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  today: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["change"]);
const handleClick = () => {
  emit("change", "我是经自定义方法传出的值");
};
</script>
