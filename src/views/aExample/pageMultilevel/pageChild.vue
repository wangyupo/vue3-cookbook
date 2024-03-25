<template>
  <div>
    <div>主页面的二级页面。你可以刷新页面，或者通过历史标签刷新，主要验证以下功能：</div>
    <div>1、左侧菜单、历史标签仍保持父级菜单的激活状态。</div>
    <div>
      2、左侧菜单不会出现子页面名称的菜单，例如：编辑页、内容页，这些页面涉及特定页面的特定业务，不应该在菜单中出现。
    </div>
    <div>3、刷新后，浏览器地址栏仍然保持当前子页面路由及url参数。</div>
    <div>4、关闭tab，页面关闭并跳转到最近一个页面。</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
