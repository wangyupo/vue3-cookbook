<template>
  <div class="flex justify-between">
    <div class="flex">
      <div class="w-80 h-80 rounded-2xl relative text-center shadow">
        <p class="font-semibold">我是父组件</p>
        <el-button type="primary" class="mt-2" @click="handleFn">点我获取子组件值、触发方法</el-button>
        <Child
          ref="childRef"
          class="w-60 h-40 mt-8 text-center shadow-md flex flex-col items-center justify-center absolute transform -translate-x-2/4 -translate-y-1/2 top-2/4 left-2/4"
        />
      </div>
    </div>

    <div class="w-96 italic text-sm font-semibold leading-6 mr-8">
      <p>
        <span class="text-xl">注：</span>
        <a class="text-blue-600" href="https://v3.cn.vuejs.org/guide/migration/children.html#children" target="__blank">
          $children
        </a>
        实例 property 已从 Vue 3.0 中移除，不再支持。如果你需要访问子组件实例，我们建议使用
        <a
          class="text-blue-600"
          href="https://v3.cn.vuejs.org/guide/composition-api-template-refs.html#模板引用"
          target="__blank"
        >
          $refs
        </a>
        。
        <a class="text-blue-600" href="https://v3.cn.vuejs.org/api/instance-properties.html#parent" target="__blank">
          $parent
        </a>
        仍支持。
      </p>
    </div>
  </div>

  <div class="flex mt-8 overflow-x-auto">
    <div v-highlight>
      <p class="font-bold">父组件代码：</p>
      <pre>
        <code>
&lt;template&gt;
  我是父组件
  &lt;div @click="handleFn"&gt;点我获取子组件值、触发方法&lt;/div&gt;
  &lt;Child ref="childRef"/&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from "vue";
  import Child from "./Child";

  const childRef = ref(); // 这里的变量名必须和组件 ref 的名称一致
  const handleFn = () => {
    alert(`子组件暴露的值-'childExpose'：${childRef.value.childExpose}`);
    alert(`子组件未暴露的值-'childUnexpose'：${childRef.value.childUnexpose}`);
    childRef.value.handleChildClick();
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
  &lt;div @click="handleChildClick"&gt;
    &lt;p&gt;我是子组件&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from "vue";
const childExpose = ref("我是暴露的值！");
const childUnexpose = ref("我是没有被暴露的值！");
const handleChildClick = () => {
  alert("我是子组件内部的方法！");
};

// 通过 defineExpose 暴露出去的值、方法等，才能被取到
defineExpose({
  childExpose,
  handleChildClick,
});
&lt;/script&gt;
        </code>
    </pre>
    </div>
  </div>

  <ReLink :links="links" />
</template>

<script setup>
import { ref } from "vue";
import Child from "./Child";
const childRef = ref();
const handleFn = () => {
  alert(`子组件暴露的值-'childExpose'：${childRef.value.childExpose}`);
  alert(`子组件未暴露的值-'childUnexpose'：${childRef.value.childUnexpose}`);
  childRef.value.handleChildClick();
};

const links = [
  {
    label: "vue3 setup 模式中为什么不能直接通过ref调用组件的方法、值？",
    answer:
      "使用 <script setup> 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定。为了在 <script setup> 组件中明确要暴露出去的属性，使用 defineExpose 编译器宏。",
  },
  {
    label: "vue3 setup 模式中defineExpose是什么？",
    link: "https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose",
  },
  {
    label: "vue3 setup 模式中如何使用 ref 获取 dom？",
    link: "https://v3.cn.vuejs.org/guide/composition-api-template-refs.html#模板引用",
  },
];
</script>
