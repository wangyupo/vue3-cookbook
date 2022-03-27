<template>
  <!-- 2-创建方法 -->
  <el-button type="primary" @click="handleBtn">点我试试</el-button>

  <div v-highlight class="mt-8" style="width: 660px">
    <p class="font-bold">组件代码：</p>
    <pre>
            <code>
&lt;template&gt;
  &lt;el-button type="primary" @click="handleBtn"&gt;点我试试&lt;el-button/&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ElMessageBox } from "element-plus";

  const handleBtn = () => {
    alert("你触发了点击事件！");
  };

  // 这是一个async await使用示例
  // 你可以把 ElMessageBox 替换成 axios 请求
  const handleAsync = async () => {
    let whichClose = true
    await ElMessageBox.confirm("这是一个弹框", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "success",
    })
      .then(() => {
        whichClose = true
      })
      .catch(() => {
        whichClose = false
      });
    console.log(whichClose)
  };
&lt;/script&gt;
            </code>
        </pre>
  </div>

  <ReLink :links="links" />
</template>

<script setup>
const handleBtn = () => {
  alert("你触发了点击事件！");
};

const links = [
  {
    label: "vue3 setup 模式中的方法不需要暴露给methods对象？",
    link: "https://v3.cn.vuejs.org/api/sfc-spec.html#script-setup",
  },
  {
    label: "vue3 setup 模式中的方法如何暴露给模板？",
    link: "https://v3.cn.vuejs.org/api/sfc-script-setup.html#顶层的绑定会被暴露给模板",
  },
];
</script>
