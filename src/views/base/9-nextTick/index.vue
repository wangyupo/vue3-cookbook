<template>
  <p class="italic">以下表格的数据，是在 table 的 dom 更新循环之后才添加进去的。</p>
  <el-table :data="tableData" border class="w-3/5 mt-4">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>

  <div v-highlight class="mt-8" style="width: 600px">
    <p class="font-bold">组件代码：</p>
    <pre>
            <code>
&lt;template&gt;
  &lt;el-table :data="tableData""&gt;
    &lt;el-table-column prop="date" label="日期" width="180" /&gt;
    &lt;el-table-column prop="name" label="姓名" width="180" /&gt;
    &lt;el-table-column prop="address" label="地址" /&gt;
  &lt;/el-table&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref, nextTick } from "vue";

  const tableData = ref([]);

  // 将回调推迟到下一个 DOM 更新周期之后执行。
  nextTick(() => {
    tableData.value = [
      {
        date: "2022-05-02",
        name: "李易",
        address: "北京市海淀区",
      },
      {
        date: "2022-05-03",
        name: "周明",
        address: "上海市普陀区",
      },
    ];
  });
&lt;/script&gt;
            </code>
        </pre>
  </div>

  <ReLink :links="links" />
</template>

<script setup>
import { ref, nextTick } from "vue";

const tableData = ref([]);
const date = new Date();
nextTick(() => {
  tableData.value = [
    {
      date: `${date.getFullYear()}-05-02`,
      name: "李易",
      address: "北京市海淀区",
    },
    {
      date: `${date.getFullYear()}-05-03`,
      name: "周明",
      address: "上海市普陀区",
    },
  ];
});

const links = [
  {
    label: "vue3 setup 模式中 nextTick 如何调用？",
    link: "https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html",
  },
  {
    label: "vue中 nextTick 有什么作用？",
    link: "https://v3.cn.vuejs.org/api/global-api.html#nexttick",
  },
  {
    label: "vue3 setup 模式中如何声明响应式数组？",
    link: "https://www.cnblogs.com/goloving/p/15437343.html",
  },
];
</script>
