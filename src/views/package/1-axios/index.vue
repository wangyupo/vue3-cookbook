<template>
  <div class="flex justify-between">
    <div>
      <div class="flex items-center">
        <el-input
          v-model="word"
          class="w-56"
          placeholder="请输入要翻译的英文"
          clearable
          @keyup.enter="handleHttp"
        ></el-input>
        <el-button type="primary" @click="handleHttp" class="ml-4">翻译</el-button>
      </div>
      <div class="mt-2" v-html="translateRes.translation" v-if="translateRes"></div>
    </div>
    <div class="w-96 italic text-sm font-semibold leading-6 mr-8">
      <p>
        <span class="text-xl">注：</span>
        本用例不具体封装 Axios，仅作使用展示，具体封装可以参考
        <a class="text-blue-600" href="https://axios-http.com/zh/docs/intro" target="__blank">axios 文档</a>
        ，创建一个 request.js 文件进行封装，最后挂载在全局 property 下即可。
      </p>
      <p>
        * 封装 Axios 时，你或许会需要
        <a class="text-blue-600" href="https://www.npmjs.com/package/qs" target="__blank">qs</a>
        去序列化你的参数。
      </p>
    </div>
  </div>

  <div class="flex overflow-x-auto">
    <div v-highlight class="mt-8">
      <p class="font-bold">组件代码：</p>
      <pre>
            <code>
&lt;template&gt;
  &lt;div&gt;
    &lt;el-input v-model="word" placeholder="请输入要翻译的英文" clearable @keyup.enter="handleHttp"&gt;&lt;/el-input&gt;
    &lt;el-button type="primary" @click="handleHttp"&gt;翻译&lt;/el-button&gt;
  &lt;/div&gt;
  &lt;div v-html="translateRes.translation" v-if="translateRes"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { getCurrentInstance, ref, reactive, onMounted } from "vue";
  import { ElNotification } from "element-plus";

  const { appContext } = getCurrentInstance();  // 请在控制台打印并观察 appContext.config.globalProperties

  const word = ref("demo");   // ref 需要通过 .value 取/赋值
  const translateRes = reactive({});  // reactive 对象可以通过 .属性名 直接取/赋值

  const handleHttp = () => {
    if (!word.value) {
      ElNotification({
        title: "提示",
        message: "单词不能为空！",
        type: "error",
        duration: "1300",
      });
      return;
    }
    appContext.config.globalProperties.$axios
      .get("/api/dict/word", {
        params: {
          word: word.value,
        },
      })
      .then(function (response) {
        response.data.translation = response.data.translation.replace(/\\n/g, "&lt;br/&gt;");
        Object.assign(translateRes, response.data);
      })
      .catch(function (error) {
        ElNotification({
          title: "提示",
          message: "未找到结果！",
          type: "error",
          duration: "1300",
        });
      });
  };


  // async await 使用示例
  // const handleHttpAsync = async() => {
  //   await appContext.config.globalProperties.$axios
  //     .get("/api/dict/word", {
  //       params: {
  //         word: word.value,
  //       },
  //     })
  //     .then(function (response) {
  //     })
  //     .catch(function (error) {
  //    });
  // };

  onMounted(() => {
    handleHttp();
  });
&lt;/script&gt;
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">main.js代码：</p>
      <pre>
            <code class="js">
// 这里仅展示 axios 相关，非全部代码
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import axios from "axios";
app.config.globalProperties.$axios = axios;

app.mount("#app");
            </code>
        </pre>
    </div>

    <div v-highlight class="mt-8 ml-4">
      <p class="font-bold">vue.config.js代码：</p>
      <pre>
            <code class="js">
module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080, // 改成你本地的端口号
    https: false,
    proxy: {
      "/api": {
        target: "https://helperservice.getquicker.cn", // 跨域请求的地址
        changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
        secure: true, // 如果是https接口，需要配置这个参数
        // 路径重写
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
            </code>
        </pre>
    </div>
  </div>

  <ReLink class="mt-8" :links="links" />
</template>

<script setup>
import { getCurrentInstance, ref, reactive, onMounted } from "vue";
const { appContext } = getCurrentInstance();
import { ElNotification } from "element-plus";

const word = ref("demo");
const translateRes = reactive({});

const handleHttp = () => {
  if (!word.value) {
    ElNotification({
      title: "提示",
      message: "单词不能为空！",
      type: "error",
      duration: "1300",
    });
    return;
  }
  appContext.config.globalProperties.$axios
    .get("/api/dict/word", {
      params: {
        word: word.value,
      },
    })
    .then(function (response) {
      response.data.translation = response.data.translation.replace(/\\n/g, "<br/>");
      Object.assign(translateRes, response.data);
    })
    .catch(function (error) {
      ElNotification({
        title: "提示",
        message: "未找到结果！",
        type: "error",
        duration: "1300",
      });
    });
};

onMounted(() => {
  handleHttp();
});

const links = [
  {
    label: "axios 中文文档：",
    link: "https://axios-http.com/zh/docs/intro",
  },
  {
    label: "vue3 中如何添加一个可以在应用的任何组件实例中访问的全局 property？",
    link: "https://v3.cn.vuejs.org/api/application-config.html#globalproperties",
  },
  {
    label: "vue3 setup 模式中如何全局挂载使用Axios？",
    link: "https://tiven.cn/p/7f7ba3b2/",
  },
  {
    label: "vue 解决跨域的办法？",
    link: "https://segmentfault.com/a/1190000040583348",
  },
  {
    label: "vue 如何绑定回车事件？",
    link: "https://v3.cn.vuejs.org/guide/events.html#按键别名",
  },
  {
    label: "vue3 中 getCurrentInstance 是什么？",
    link: "https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance",
  },
  {
    label: "vue3 中 reactive 是什么？",
    link: "https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive",
  },
  {
    label: "了解 ref 和 reactive 的区别：",
    link: "https://juejin.cn/post/7013326406444646407",
  },
  {
    label: "vue3 中 ref 和 reactive 有何区别？",
    link: "https://www.weirshi.com/framework/Vue/3.x/ref,reactive.html",
  },
];
</script>
