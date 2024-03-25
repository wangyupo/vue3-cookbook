<template>
  <div class="flex">
    <div>
      <p>
        <span class="font-semibold">watch示例：</span>
        <span class="italic">通过 watch 监听值，实现求和</span>
      </p>
      <p class="mt-4">
        <el-input class="w-16" v-model.number="wNum1" maxlength="3" />
        <span class="mx-2">+</span>
        <el-input class="w-16" v-model.number="wNum2" maxlength="3" />
        <span class="mx-2">=</span>
        <el-input class="w-16" v-model.number="wSum" readonly />
      </p>

      <div v-highlight class="mt-8">
        <p class="font-bold">watch 求和代码：</p>
        <pre>
            <code>
&lt;template&gt;
  &lt;el-input v-model.number="wNum1" /&gt;
  +
  &lt;el-input v-model.number="wNum2" /&gt;
  =
  &lt;el-input v-model.number="wSum" readonly /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref, watch } from "vue";

  const wNum1 = ref(1);
  const wNum2 = ref(2);
  const wSum = ref(3);

  watch(
    [wNum1, wNum2],
    (val, oldVal) => {
      wSum.value = val[0] + val[1];
    },
    { immediate: true, deep: true } // 立即检测、深度检测，如果需要就添加
  );
&lt;/script&gt;
            </code>
        </pre>
      </div>
    </div>

    <div class="ml-32">
      <p>
        <span class="font-semibold">computed示例：</span>
        <span class="italic">通过 computed 计算属性求和</span>
      </p>
      <p class="mt-4">
        <el-input class="w-16" v-model.number="cNum1" maxlength="3" />
        <span class="mx-2">+</span>
        <el-input class="w-16" v-model.number="cNum2" maxlength="3" />
        <span class="mx-2">=</span>
        <el-input class="w-16" v-model.number="cSum" readonly />
      </p>

      <div v-highlight class="mt-8">
        <p class="font-bold">computed 求和代码：</p>
        <pre>
          <code>
&lt;template&gt;
  &lt;el-input v-model.number="cNum1" /&gt;
  +
  &lt;el-input v-model.number="cNum2" /&gt;
  =
  &lt;el-input v-model.number="cSum" readonly /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref, computed } from "vue";

  const cNum1 = ref(1);
  const cNum2 = ref(2);

  const cSum = computed(() => {
    return cNum1.value + cNum2.value
  });
&lt;/script&gt;
          </code>
        </pre>
      </div>
    </div>
  </div>

  <RhReferenceLink :links="links" />
</template>

<script setup>
import { ref, watch, computed } from "vue";

const wNum1 = ref(1);
const wNum2 = ref(2);
const wSum = ref(3);

watch(
  [wNum1, wNum2],
  (val, oldVal) => {
    wSum.value = val[0] + val[1];
  },
  { immediate: true, deep: true } // 立即检测、深度检测，如果需要就添加
);

const cNum1 = ref(1);
const cNum2 = ref(2);
const cSum = computed(() => {
  return cNum1.value + cNum2.value;
});

const links = [
  {
    label: "vue3 setup 模式中如何使用 watch？",
    link: "https://cn.vuejs.org/guide/essentials/watchers.html#watchers",
  },
  {
    label: "vue3 setup 模式中如何使用 computed？",
    link: "https://cn.vuejs.org/guide/essentials/computed.html#computed-properties",
  },
];
</script>
