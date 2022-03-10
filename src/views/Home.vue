<template>
  <el-container class="main-container">
    <el-aside width="220px">
      <el-menu class="menu" router unique-opened :default-active="defaultActive">
        <template v-for="route in menuConfig">
          <template v-if="route.children">
            <el-sub-menu :key="route.path" :index="route.path">
              <template #title>
                <span>{{ route.title }}</span>
              </template>

              <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">
                {{ child.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>

          <template v-else>
            <el-menu-item :key="route.path" :index="route.path">
              {{ route.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>

    <el-main class="relative">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import menuConfig from "@/router/menu.js";

import { computed } from "vue";
import { useRouter } from "vue-router";
const route = useRouter();
const defaultActive = computed(() => {
  return route.currentRoute.value.path;
});
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .menu {
    height: 100%;
  }
}
</style>
