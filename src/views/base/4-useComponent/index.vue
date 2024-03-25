<template>
  <!-- 4、使用组件 -->
  <div class="flex">
    <div class="w-80 h-80 rounded-2xl relative text-center shadow">
      <p class="font-semibold">我是父组件</p>
      <p>page1</p>
      <Child
        class="w-40 h-40 text-center shadow-md flex flex-col items-center justify-center absolute transform -translate-x-2/4 -translate-y-1/2 top-2/4 left-2/4"
      />
    </div>
  </div>

  <div class="flex mt-8">
    <div v-highlight class="w-80">
      <p class="font-bold">父组件代码：</p>
      <pre>
        <code>
&lt;div&gt;
  我是父组件
  &lt;Child/&gt;
&lt;/div&gt;

&lt;script setup&gt;
  import Child from "./Child.vue";
&lt;/script&gt;
        </code>
    </pre>
    </div>

    <div v-highlight class="ml-4 w-80">
      <p class="font-bold">子组件代码：</p>
      <pre>
        <code>
&lt;template&gt;
  &lt;div&gt;我是子组件&lt;/div&gt;
&lt;/template&gt;
        </code>
    </pre>
    </div>

    <div v-highlight class="ml-4">
      <p class="font-bold">目录结构：</p>
      <pre>
        <code class="html">
|-- folder                // 文件夹
      |-- index.vue       // 父组件
      |-- Child.vue       // 子组件
        </code>
    </pre>
    </div>
  </div>

  <RhReferenceLink :links="links" />
</template>

<script setup>
import Child from "./Child.vue";
const links = [
  {
    label: "vue3 setup 模式中如何使用组件？",
    link: "https://cn.vuejs.org/api/sfc-script-setup.html#using-components",
  },
  {
    label: "vue3 setup 模式中如何给引用的组件重新命名？",
    link: "https://cn.vuejs.org/api/sfc-script-setup.html#recursive-components",
  },
];
</script>
