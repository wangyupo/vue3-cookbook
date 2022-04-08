<template>
  <!-- teleport 的功能是将模板HTML移动到DOM不同地方的方法
  目标元素不能是teleport标签所在组件的父组件或子组件 -->
  <div class="flex justify-between">
    <div>
      <teleport to="#fullScreen">
        <div
          class="absolute top-0 right-0 bottom-0 left-0 bg-green-100 flex items-center justify-center flex-col"
          v-if="visibleFull"
        >
          <p>我通过 teleport 挂载到了 Vue app 之外的其他位置， 可打开 public 文件夹下的 index.html 查看以下元素：</p>
          <p>&lt;div id="fullScreen"&gt;&lt;/div&gt;</p>
          <p class="italic font-semibold">
            * 我既剥离了 vue 顶层组件挂载的 DOM 的限制，而且还能使用 vue 组件内的状态。
          </p>
          <el-button class="mt-4" type="primary" @click="visibleFull = !visibleFull">点我关闭</el-button>
        </div>
      </teleport>
      <div
        class="absolute top-0 right-0 bottom-0 left-0 bg-green-100 flex items-center justify-center flex-col"
        v-if="visibleCurrent"
      >
        <p>我仅占据了内容区域</p>
        <p>我的 dom 在 vue 单文件中</p>
        <el-button class="mt-4" type="primary" @click="visibleCurrent = !visibleCurrent">点我关闭</el-button>
      </div>
      <el-button type="primary" @click="visibleFull = !visibleFull">全屏弹窗</el-button>
      <el-button type="primary" @click="visibleCurrent = !visibleCurrent">内容区弹窗</el-button>
    </div>

    <div class="w-3/5 italic text-sm font-semibold leading-6 mr-8">
      <p>
        <span class="text-xl">注：</span>
        标准情况下，teleport 不能挂载在当前组件的父组件及子组件上，应该挂载到 DOM 中 Vue app 之外的其它位置，即在
        index.html 中提供挂载区域。
      </p>
      <p>
        * 如果你挂载到了父组件或子组件上，控制台将会报错 "Failed to locate Teleport target with selector "xxx". Note the
        target element must exist before the component is mounted" ，解决方案见参考链接第三个（可以解决，但不推荐！）。
      </p>
    </div>
  </div>

  <div class="flex overflow-x-auto">
    <div v-highlight class="mt-8" style="width: 800px">
      <p class="font-bold">组件代码：</p>
      <pre>
            <code>
&lt;template&gt;
  &lt;teleport to="#fullScreen"&gt;
    &lt;div v-if="visibleFull"&gt;
      &lt;el-button @click="visibleFull = !visibleFull"&gt;点我关闭&lt;/el-button&gt;
    &lt;/div&gt;
  &lt;/teleport&gt;

  &lt;div v-if="visibleCurrent"&gt;
    &lt;el-button @click="visibleCurrent = !visibleCurrent"&gt;点我关闭&lt;/el-button&gt;
  &lt;/div&gt;
  
  &lt;el-button @click="visibleFull = !visibleFull"&gt;全屏弹窗&lt;/el-button&gt;
  &lt;el-button @click="visibleCurrent = !visibleCurrent"&gt;内容区弹窗&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from "vue";

  const visibleFull = ref(false);
  const visibleCurrent = ref(false);
&lt;/script&gt;
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4" style="width: 800px">
      <p class="font-bold">index.html代码：</p>
      <pre>
            <code>
&lt;!DOCTYPE html&gt;
&lt;html lang=""&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    &lt;meta name="viewport" content="width=device-width,initial-scale=1.0"&gt;
    &lt;link rel="icon" href="&lt;%= BASE_URL %&gt;favicon.ico"&gt;
    &lt;title&gt;&lt;%= htmlWebpackPlugin.options.title %&gt;&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;noscript&gt;
      &lt;strong&gt;浏览器不支持&lt;/strong&gt;
    &lt;/noscript&gt;
    &lt;div id="app"&gt;&lt;/div&gt;
    &lt;!-- 注意 id 为 fullScreen 的 div，teleport 的 to 属性指的就是这儿 --&gt;
    &lt;div id="fullScreen"&gt;&lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
            </code>
        </pre>
    </div>
  </div>

  <ReLink :links="links" />
</template>

<script setup>
import { ref } from "vue";

const visibleFull = ref(false);
const visibleCurrent = ref(false);

const links = [
  {
    label: "vue3 中的 teleport 是什么？",
    link: "https://v3.cn.vuejs.org/guide/teleport.html#teleport",
  },
  {
    label: "vue3 中的 teleport 有哪些属性？",
    link: "https://v3.cn.vuejs.org/api/built-in-components.html#teleport",
  },
  {
    label: "teleport 的目标元素如何直接挂载在父组件上？",
    link: "https://juejin.cn/post/6952697587132530702",
  },
];
</script>
