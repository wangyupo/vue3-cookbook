<template>
  <div class="flex justify-between">
    <div>
      <div class="flex items-center">
        <el-button type="primary" :loading="loading" @click="fn_getWeather">
          {{ loading ? "获取中" : "点击获取北京天气" }}
        </el-button>
        <div class="ml-3">
          <pre>{{ weatherData }}</pre>
        </div>
      </div>
    </div>
    <div class="w-96 italic text-sm font-semibold leading-6 mr-8">
      <p>
        <span class="text-xl">注：</span>
        本用例使用 axios 进行接口请求，并且 v3s 已经将 axios 配置在 /src/utils/request.js 中，具体封装可以参考
        <a class="text-blue-600" href="https://www.axios-http.cn/docs/intro" target="__blank">axios 文档</a>
        。
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
  &lt;el-button type="primary" :loading="loading" @click="fn_getWeather"&gt;
    <span v-pre>{{ loading ? "获取中" : "点击获取北京天气" }}</span>
  &lt;/el-button&gt;
  &lt;div class="ml-3"&gt;
    &lt;pre&gt;<span v-pre>{{ weatherData }}</span>&lt;/pre&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { getWeather } from "@/api/api.js";
  import { ref } from "vue";

  const loading = ref(false);
  const weatherData = ref({});

  // 获取天气
  const fn_getWeather = () => {
    // 键入 v3s-api ，待代码提示出现后，回车，会自动生成 api 代码，按 tab 切换下一项。
    loading.value = true;
    const params = { code: 101010100 };
    getWeather(params)
      .then(res => {
        if (res.status == 200) {
          weatherData.value = res.data.forecast[0];
        }
      })
      .catch(() => {})
      .finally(() => {
        loading.value = false;
      });
  };
&lt;/script&gt;
        </code>
      </pre>
    </div>

    <div v-highlight class="ml-8 mt-8">
      <p class="font-bold">vite.config.js代理配置：</p>
      <pre>
        <code class="js">
const PROXY_TARGET = "http://t.weather.itboy.net/"; // 后端服务地址
        </code>
      </pre>
    </div>
  </div>

  <RhReferenceLink class="mt-8" :links="links" />
</template>

<script setup>
import { getWeather } from "@/api/api.js";
import { ref } from "vue";

const loading = ref(false);
const weatherData = ref({});

// 获取天气
const fn_getWeather = () => {
  loading.value = true;
  const params = { code: 101010100 };
  getWeather(params)
    .then(res => {
      if (res.status == 200) {
        weatherData.value = res.data.forecast[0];
      }
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
};

const links = [
  {
    label: "axios 中文文档：",
    link: "https://www.axios-http.cn/docs/intro",
  },
  {
    label: "v3s 如何配置后端服务请求地址？",
    link: "https://github.com/wangyupo/v3s?tab=readme-ov-file#详细文档",
  },
];
</script>
