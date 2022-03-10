<template>
  <div class="flex">
    <div>
      <div class="flex items-center">
        姓名：
        <el-input v-model="userInfo.name" class="w-32" maxlength="10"></el-input>
      </div>
      <div class="flex items-center mt-4">
        年龄：
        <el-input v-model="userInfo.age" class="w-32" maxlength="3"></el-input>
      </div>
      <el-button type="primary" class="mt-4" @click="handleSumit">提交</el-button>
    </div>

    <div class="ml-64">
      <p class="font-semibold">store数据：</p>
      <p class="mt-2">{{ user }}</p>
    </div>
  </div>

  <div class="flex overflow-x-auto">
    <div v-highlight class="mt-8">
      <p class="font-bold">组件代码：</p>
      <pre>
            <code>
&lt;template&gt;
  姓名：&lt;el-input v-model="userInfo.name"&gt;&lt;/el-input&gt;
  年龄：&lt;el-input v-model="userInfo.age"&gt;&lt;/el-input&gt;
  &lt;el-button type="primary" @click="handleSumit"&gt;提交&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { reactive, getCurrentInstance, computed, onMounted } from "vue";

  // 方法一：使用 getCurrentInstance 实例中的 $store 也可以使用 vuex
  // const { appContext } = getCurrentInstance();
  // const { $store } = appContext.config.globalProperties;

  // 方法二：使用 vuex 中的 store 实例
  import { useStore } from "vuex";
  const store = useStore();

  const userInfo = reactive({
    name: "tom",
    age: "20",
  });

  const user = computed(() => store.state.app.userInfo);

  const handleSumit = () => {
    store.commit("app/setUserInfo", userInfo);
    console.log(store.getters["app/name"]);
    console.log(store.getters["app/age"]);
  };
&lt;/script&gt;
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">store（app.js）代码：</p>
      <pre>
            <code class="js">
// 这里展示的是模块的 store，且开启了名命空间
import loadsh from "lodash";

const app = {
  namespaced: true,
  state: {
    userInfo: {},
  },
  getters: {
    name: (state) => state.userInfo.name,
    age: (state) => state.userInfo.age,
  },
  mutations: {
    setUserInfo(state, data) {
      // reactive 响应式转换是“深度转换”——它会影响传递对象的所有嵌套 property。
      state.userInfo = loadsh.cloneDeep(data);
    },
  },
};

export default app;
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">store（index.js）代码：</p>
      <pre>
            <code class="js">
import { createStore } from "vuex";
import app from "./modules/app";

export default createStore({
  modules: {
    app,
  },
});
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">store 目录结构：</p>
      <pre>
            <code class="js">
|-- store
      |-- index.js
      |-- modules
            |-- app.js
            </code>
        </pre>
    </div>
  </div>

  <ReLink class="mt-8" :links="links" />
</template>

<script setup>
import { reactive, getCurrentInstance, computed, onMounted } from "vue";

// 方法一：使用 getCurrentInstance 实例中的 $store 也可以使用 vuex
// const { appContext } = getCurrentInstance();
// const { $store } = appContext.config.globalProperties;

// 方法二：使用 vuex 中的 store 实例
import { useStore } from "vuex";
const store = useStore();

const userInfo = reactive({
  name: "tom",
  age: "20",
});

const user = computed(() => store.state.app.userInfo);

const handleSumit = () => {
  store.commit("app/setUserInfo", userInfo);
  console.log(store.getters["app/name"]);
  console.log(store.getters["app/age"]);
};

onMounted(() => {
  handleSumit();
});

const links = [
  {
    label: "vuex 中文文档：",
    link: "https://vuex.vuejs.org/zh/",
  },
  {
    label: "vuex 如何访问有命名空间的 store 模块？",
    link: "https://vuex.vuejs.org/zh/guide/modules.html#命名空间",
  },
  {
    label: "如何在vue3中使用vuex 4.x？",
    link: "https://blog.csdn.net/weixin_43564110/article/details/111566345",
  },
  {
    label: "为什么 reactive 的数据会未经 commit 直接改变 state？",
    link: "https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#声明响应式状态",
  },
];
</script>
