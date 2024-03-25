<template>
  <!-- 布局专用-面包屑导航 -->
  <el-breadcrumb
    class="breadcrumb"
    :class="[layoutType === 'LayoutHeadMenu' ? '-mt-3 border-b border-b-[--el-border-color]' : 'breadcrumb-in-header']"
    separator="/"
    v-if="!noBreadCrumbPath.includes(route.path) && breadcrumb.length"
  >
    <el-breadcrumb-item v-for="route in breadcrumb" :key="route[menuKey.id]" :to="route[menuKey.url]">
      {{ route[menuKey.title] }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useLayout } from "@/hooks/useLayout.js";
import { storeToRefs } from "pinia";
import { tree2arr } from "@/utils/index";
import { cloneDeep } from "lodash-es";
import { menuKey } from "@/router/menuConfig.js";

const breadcrumb = ref([]);
const route = useRoute();
const userStore = useUserStore();
const { menu } = storeToRefs(userStore);
const { layoutType } = useLayout();
const noBreadCrumbPath = ref(["/404"]); //不需要显示面包屑的路由

watch(
  route,
  val => {
    if (!Object.keys(menu).length) return;
    const result = [];
    const list = userStore.menuArr;
    const map = list.reduce((pre, cur) => {
      pre[cur[menuKey.id]] = cur;
      return pre;
    }, {});
    function getParentRoute(currentRoute) {
      if (currentRoute.parentId && currentRoute.parentId !== "0") {
        getParentRoute(map[currentRoute.parentId]);
      }
      result.push(currentRoute);
    }
    const currentRoute = list.find(item => item[menuKey.url] === route.path);
    if (currentRoute) {
      getParentRoute(currentRoute);
      breadcrumb.value = cloneDeep(result).map((i, idx) => {
        if (idx === result.length - 1) i[menuKey.url] = "";
        return i;
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@import "../types/common.scss";

.breadcrumb {
  display: flex;
  align-items: center;
  height: $breadHeight !important;
  :deep(.el-breadcrumb__inner.is-link:hover) {
    cursor: pointer;
  }
}
</style>
