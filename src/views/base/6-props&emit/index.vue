<template>
  <div class="flex">
    <div class="w-80 h-80 rounded-2xl relative text-center shadow">
      <p class="font-semibold">我是父组件</p>
      <p class="mt-w">
        传给子组件的值：
        <el-input v-model="todaydate" class="w-2/5" />
      </p>
      <p class="mt-2 text-xs italic">
        {{ emitVal }}
        <span v-if="emitTimes > 1">x{{ emitTimes }}</span>
      </p>
      <Child
        class="w-60 h-40 mt-8 text-center shadow-md flex flex-col items-center justify-center absolute transform -translate-x-2/4 -translate-y-1/2 top-2/4 left-2/4"
        :today="todaydate"
        @change="childChange"
      />
    </div>
  </div>

  <div class="flex mt-8 overflow-x-auto">
    <div v-highlight>
      <p class="font-bold">父组件代码：</p>
      <pre>
        <code>
&lt;template&gt;
  我是父组件
  &lt;div&gt;传给子组件的值：&lt;el-input v-model="todaydate" /&gt;&lt;/div&gt;
  &lt;p&gt;<span v-pre>{{ emitVal }}</span>&lt;/p&gt;
  &lt;Child :today="todaydate" @change="childChange" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import Child from "./Child.vue";
  import { ref } from "vue";

  const todaydate = ref("2022-02-22");  // 传给子组件的值
  const emitVal = ref("");  // 从子组件传出的值

  // 组件的自定义事件
  const childChange = (val) =&gt; {
    emitVal.value = val;
  };
&lt;/script&gt;
        </code>
    </pre>
    </div>

    <div v-highlight class="ml-4">
      <p class="font-bold">子组件代码：</p>
      <pre>
        <code>
&lt;template&gt;
  我是子组件 
  &lt;div&gt;从父组件传进来的值：<span v-pre>{{ today }}</span>&lt;/div&gt;
  &lt;el-button @click="handleClick"&gt;点我触发自定义事件&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // 使用 defineProps 声明 props
  const props = defineProps({
    today: {
      type: String,
      default: "",
    },
  });

  // 使用 defineEmits 声明 emits
  const emit = defineEmits(["change"]);
  const handleClick = () => {
    // 必须经过defineEmits声明，不然方法无效！
    emit("change", "我是经自定义方法传出的值");
  };
&lt;/script&gt;
        </code>
    </pre>
    </div>
  </div>

  <RhReferenceLink :links="links" />
</template>

<script setup>
import Child from "./Child.vue";
import { ref } from "vue";

const date = new Date();
const todaydate = ref(
  `${date.getFullYear()}-${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}-${
    date.getDate() < 10 ? "0" : ""
  }${date.getDate()}`
);
const emitVal = ref("");
const emitTimes = ref(0);

const childChange = (val) => {
  emitVal.value = val;
  emitTimes.value += 1;
};

const links = [
  {
    label: "在 <script setup> 中如何声明 props 和 emits？",
    link: "https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits",
  },
  {
    label: "子组件中的 emit 方法是什么？",
    link: "https://cn.vuejs.org/api/options-state.html#emits",
  },
];
</script>
