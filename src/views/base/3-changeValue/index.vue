<template>
  <!-- 3-使用方法赋值 -->
  <div class="flex items-center">
    <div>
      姓：
      <el-input v-model="surname" placeholder="请输入姓" maxlength="5" class="w-4/5" />
    </div>
    <div class="ml-4">
      名：
      <el-input v-model="name" placeholder="请输入名" maxlength="10" class="w-4/5" />
    </div>
    <el-button type="primary" class="ml-4" @click="handleConfirm">确认</el-button>
    <div class="ml-8">我的姓名是：{{ fullName }}</div>
  </div>

  <div v-highlight class="mt-8" style="width: 960px">
    <p class="font-bold">组件代码：</p>
    <pre>
        <code>
&lt;template&gt;
  姓：&lt;el-input v-model="surname" placeholder="请输入姓"/&gt;
  名：&lt;el-input v-model="name" placeholder="请输入名"/&gt;
  &lt;el-button type="primary" @click="handleConfirm"&gt;确认&lt;/el-button&gt;
  &lt;div&gt;我的姓名是：<span v-pre>{{ fullName }}</span>&lt;/div&gt;
&lt;/template&gt;


&lt;script setup&gt;
  import { ref } from "vue";

  const surname = ref("老");
  const name = ref("八");
  const fullName = ref("老八");

  const handleConfirm = () => {
    fullName.value = surname.value + name.value;  // ref 对象仅有一个 .value property，指向该内部值。
  };
&lt;/script&gt;
        </code>
    </pre>
  </div>

  <ReLink :links="links" />
</template>

<script setup>
import { ref } from "vue";

const surname = ref("老");
const name = ref("八");
const fullName = ref("老八");

const handleConfirm = () => {
  fullName.value = surname.value + name.value;
};

const links = [
  {
    label: "vue3 setup 模式中赋值为什么要赋在.value对象上？",
    link: "https://v3.cn.vuejs.org/api/refs-api.html#ref",
  },
];
</script>
