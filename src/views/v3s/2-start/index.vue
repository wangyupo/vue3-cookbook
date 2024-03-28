<template>
  <!-- 2、安装和启动 -->
  <div>
    <p class="flex items-baseline">
      一、使用 git 下载 v3s，这是下载地址：
      <el-link type="primary" href="https://github.com/wangyupo/v3s" target="_blank" class="text-lg">
        https://github.com/wangyupo/v3s
      </el-link>
    </p>
    <p class="mt-3">
      二、下载完成后，使用命令行工具进入 v3s 的目录，然后按顺序执行以下命令。（需要保证你的 Node 版本在 20.10.0
      及以上。）
    </p>

    <div v-highlight class="mt-3 w-[300px]">
      <pre>
        <code>
// 安装依赖
npm install

// 启动项目
npm run dev
        </code>
      </pre>
    </div>

    <div>
      <p>三、在浏览器中，有两种启动方式：</p>
      <p class="mt-1 indent-8">
        1、在浏览器地址栏，输入：
        <span class="underline underline-offset-4">http://localhost:5173/v3s-admin/</span>
        ，然后按回车。
      </p>
      <p class="mt-1 indent-8">
        2、执行完 npm run dev 后，停留在你的命令行工具中，输入字母 o ，然后回车，浏览器会自动打开
        <span class="underline underline-offset-4">http://localhost:5173/v3s-admin/</span>
        。
      </p>
    </div>

    <p class="mt-3">
      四、使用 vsCode 打开 v3s 目录。使用组合按键
      <span class="underline underline-offset-4">Ctrl + Shift + X</span>
      唤醒 “扩展”，在 “扩展” 中搜索
      <span class="underline underline-offset-4">V3S Snippets</span>
      ，选中，在左侧工作区弹出的窗口中，点击
      <span class="underline underline-offset-4">安装</span>
      。
    </p>

    <p class="mt-3">五、至此，关于 v3s 的安装和启动工作就都完成了。</p>

    <RhReferenceLink class="mt-16" :links="links" />
  </div>
</template>

<script setup>
const links = [
  {
    label: "如何搭建前端开发环境？如何安装 git、nodeJS、vsCode？",
    link: "https://github.com/wangyupo/FE-Guide",
  },
  {
    label: "v3s的项目地址在哪儿？",
    link: "https://github.com/wangyupo/v3s",
  },
];
</script>

<style lang="scss" scoped></style>
