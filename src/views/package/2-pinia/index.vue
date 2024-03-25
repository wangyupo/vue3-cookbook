<template>
  <div class="flex">
    <div>
      <div class="flex items-center">
        姓名：
        <el-input v-model="user.name" class="w-32" maxlength="10"></el-input>
      </div>
      <div class="flex items-center mt-4">
        年龄：
        <el-input v-model="user.age" class="w-32" maxlength="3"></el-input>
      </div>
      <el-button type="primary" class="mt-4" @click="handleSubmit">提交</el-button>
    </div>

    <div class="ml-16">
      <p class="font-semibold">pinia数据：</p>
      <p class="mt-2">{{ userInfo }}</p>
    </div>
  </div>

  <div class="flex overflow-x-auto">
    <div v-highlight class="mt-8">
      <p class="font-bold">组件代码：</p>
      <pre>
            <code>
&lt;template&gt;
  姓名：&lt;el-input v-model="user.name"&gt;&lt;/el-input&gt;
  年龄：&lt;el-input v-model="user.age"&gt;&lt;/el-input&gt;
  &lt;el-button type="primary" @click="handleSubmit"&gt;提交&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // 在 script 标签中，键入 v3s-usepinia ，待代码提示出现后，回车，会自动生成 pinia 使用代码，按 tab 切换下一项。
  import { ref } from "vue";
  import { useUserStore } from "@/stores/user.js";
  import { storeToRefs } from "pinia";

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const user = ref({ name: "", age: "" });

  const handleSubmit = () => {
    userStore.$patch(state => {
      state.userInfo = user;
    });
  };
&lt;/script&gt;
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">pinia（user.js）代码：</p>
      <pre>
            <code class="js">
// 键入 v3s-pinia ，待代码提示出现后，回车，会自动生成 pinia 源文件。
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null, // 用户信息
  }),
  getters: {},
  actions: {},
  persist: {},
});
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">store 目录结构：</p>
      <pre>
            <code class="js">
|-- src
     |-- store
           |-- user.js
            </code>
        </pre>
    </div>
  </div>

  <RhReferenceLink class="mt-8" :links="links" />
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const user = ref({ name: "", age: "" });

// 提交
const handleSubmit = () => {
  userStore.$patch(state => {
    state.userInfo = user;
  });
};

const links = [
  {
    label: "Pinia 中文文档：",
    link: "https://pinia.web3doc.top/",
  },
  {
    label: "Pinia 如何持久化？",
    link: "https://prazdevs.github.io/pinia-plugin-persistedstate/zh/",
  },
];
</script>
