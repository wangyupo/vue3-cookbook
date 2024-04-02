<template>
  <!-- 1-基础的数据响应 -->
  <div class="flex justify-between">
    <div>
      <div class="flex">
        <span style="flex: 0 0 80px" @click="dd">我的国籍：</span>
        <el-input v-model="inputValue" placeholder="请输入" maxlength="20" />
      </div>
      <div class="mt-4">响应的值：{{ inputValue }}</div>
    </div>

    <div class="italic text-sm font-semibold leading-6 mr-8" style="width: 500px">
      <p>
        <span class="text-xl">注：</span>
        vue3 中，对象、数组的更新不再需要 $set（且已被
        <a
          class="text-blue-600"
          href="https://v3-migration.vuejs.org/zh/breaking-changes/#被移除的-api"
          target="_blank"
        >
          移除
        </a>
        ），只需要用 ref、reactive 声明对象、数组即可实现实时响应，如 const obj = reactive({ a: 1 })，你可以直接使用
        obj.b = 2，即可更新数据，并实时响应。这与 vue3 的 proxy 实现原理有关。
      </p>
    </div>
  </div>

  <div v-highlight class="mt-8" style="width: 600px">
    <p class="font-bold">组件代码：</p>
    <pre>
        <code>
&lt;template&gt;
  &lt;el-input v-model="inputValue" placeholder="请输入"/&gt;
  <span v-pre>{{ inputValue }}</span>
&lt;/template&gt;

&lt;script setup&gt;
  import { ref, reactive } from "vue";
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

  // 用ref、reactive声明的对象、数组，可以直接更新，
  // 并且数据是响应的，可以在视图实时更新
  user.age = 13;
  tableData.value[0] = {
    name: "apple",
    price: "12.0"
  }
&lt;/script&gt;
        </code>
    </pre>
  </div>

  <RhReferenceLink :links="links" />
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("中国（编辑我试试）");

const links = [
  {
    label: "vue3 setup 模式中如何创建数据的响应式状态",
    link: "https://cn.vuejs.org/api/reactivity-core.html",
  },
  {
    label: "vue3 setup 模式中的ref是什么？有什么作用？",
    link: "https://cn.vuejs.org/api/reactivity-core.html#ref",
  },
  {
    label: "Vue 3 Composition API: Ref vs Reactive?",
    link: "https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/",
  },
  {
    label: "ref vs reactive in Vue 3?",
    link: "https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3",
  },
  {
    label: "《vue3》reactivity API（vue3的$set呢?）",
    link: "https://www.jianshu.com/p/d3300061ce89",
  },
];
</script>
