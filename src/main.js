import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // pinia持久化存储
import globalComponents from "@/components/index.js"; // 项目自身封装的全局组件

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/element-theme.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/dark.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./styles/iconfont/iconfont.css"; // 直接替换iconfont文件夹内容即可完成更新
import "./styles/common.scss"; // 影响全局的公共样式都在这里配置
import "./styles/tailwind.css"; // 引入tailwindcss
import "./styles/tailwind-reset.scss"; // 单独引入reset文件，防止 tailwindcss 对 ElementPlus组件 的样式覆盖

const pinia = createPinia().use(piniaPluginPersistedstate);
const app = createApp(App);

// 全局引入ElementPlusIcon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

import hljs from "highlight.js"; //导入代码高亮文件
import "highlight.js/styles/atom-one-dark.css"; //导入代码高亮样式
hljs.configure({ ignoreUnescapedHTML: true }); // 去掉控制台警告
//自定义一个代码高亮指令
app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach(item => {
    hljs.highlightBlock(item);
  });
});

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(globalComponents);

app.mount("#app");
