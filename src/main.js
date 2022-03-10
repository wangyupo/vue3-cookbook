import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 注册Element-plus Icons全局组件
import * as Icons from "@element-plus/icons-vue";
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});

import hljs from "highlight.js"; //导入代码高亮文件
import "highlight.js/styles/atom-one-dark.css"; //导入代码高亮样式
hljs.configure({ ignoreUnescapedHTML: true });  // 去掉控制台警告
//自定义一个代码高亮指令
app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((item) => {
    hljs.highlightBlock(item);
  });
});

import "./tailwind.css"; // 引入tailwind.css

import ReferenceLink from "./components/ReferenceLink.vue";
app.component("ReLink", ReferenceLink);

import axios from "./untils/request";
app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
