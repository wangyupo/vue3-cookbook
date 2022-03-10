<template>
  <!-- 1-基础的数据响应 -->
  <div>
    我的国籍：
    <el-input v-model="inputValue" placeholder="请输入" maxlength="20" class="w-1/4" />
  </div>
  <div class="mt-4">响应的值：{{ inputValue }}</div>

  <div v-highlight class="mt-8" style="width: 600px">
    <p class="font-bold">组件代码：</p>
    <pre>
        <code>
&lt;template&gt;
  &lt;el-input v-model="inputValue" placeholder="请输入"/&gt;
  <span v-pre>{{ inputValue }}</span>
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from "vue";
  const inputValue = ref("中国"); // 初始值，空值设置：ref('')

  // 以下为常见的响应数据示例（对象、数组、基本类型）
  const user = reactive({
      name: "",
      address: "",
  });
  const tableData = ref([]);
  const title = ref("");
  const one = ref(1);
  const isValid = ref(true);
  const foo = ref(null);
  const ufo = ref(undefined);
&lt;/script&gt;
        </code>
    </pre>
  </div>

  <ReLink :links="links" />
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("中国（编辑我试试）");

const links = [
  {
    label: "vue3 setup 模式中如何创建数据的响应式状态",
    link: "https://v3.cn.vuejs.org/api/sfc-script-setup.html#响应式",
  },
  {
    label: "vue3 setup 模式中的ref是什么？有什么作用？",
    link: "https://v3.cn.vuejs.org/api/refs-api.html#ref",
  },
  {
    label: "Vue 3 Composition API: Ref vs Reactive?",
    link: "https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/",
  },
  {
    label: "ref vs reactive in Vue 3?",
    link: "https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3",
  },
];
</script>
