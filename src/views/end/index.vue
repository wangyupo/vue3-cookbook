<template>
  <p>
    本用例，可以当作 vue3 项目的“参考书”，慢慢熟练了，也就用不着了，多查文档，多阅读其它优秀 vue3
    作品，总结出适合自己开发的经验。
  </p>
  <div class="end">
    <p class="underline underline-offset-8 italic">本项目使用 v3s 进行开发</p>
    <a href="https://github.com/wangyupo/v3s" target="_blank" title="跳转至 v3s github地址">
      <img src="/v3s.jpg" class="mt-3 w-[200px] cursor-pointer" />
    </a>
    <p class="mt-3 flex items-baseline">
      * 推荐使用
      <el-link type="primary" class="mx-2 font-bold text-lg" href="https://github.com/wangyupo/v3s" target="_blank">
        v3s
      </el-link>
      ，结合 vsCode 插件
      <el-link
        type="primary"
        class="mx-2 font-bold text-lg"
        href="https://github.com/wangyupo/V3S-Snippets"
        target="_blank"
      >
        V3S Snippets
      </el-link>
      ，编写快速、安全、标准的 vue3 代码。
    </p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.end {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
