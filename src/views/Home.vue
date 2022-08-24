<template>
  <el-container class="main-container">
    <el-aside :width="isExpand ? '64px' : '230px'">
      <el-menu
        class="menu"
        router
        unique-opened
        :collapse="isExpand"
        :collapse-transition="false"
        :default-active="defaultActive"
      >
        <div :class="['flex pt-2', isExpand ? 'justify-center' : 'justify-end mr-3']">
          <el-icon class="menu-expand cursor-pointer" @click="handleFold">
            <fold v-if="!isExpand" />
            <expand v-else />
          </el-icon>
        </div>
        <template v-for="route in menuConfig">
          <template v-if="route.children">
            <el-sub-menu :key="route.path" :index="route.path">
              <template #title>
                <component class="menu-icon" :is="route.icon" v-if="isExpand"></component>
                <span>{{ route.title }}</span>
              </template>

              <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">
                {{ child.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>

          <template v-else>
            <template v-if="isExpand">
              <el-sub-menu :key="route.path" :index="route.path">
                <template #title>
                  <component class="menu-icon" :is="route.icon"></component>
                  <span>{{ route.title }}</span>
                </template>

                <el-menu-item :key="route.path" :index="route.path">
                  {{ route.title }}
                </el-menu-item>
              </el-sub-menu>
            </template>
            <el-menu-item :key="route.path" :index="route.path" v-else>
              {{ route.title }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>

    <el-main class="relative bg-white">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import menuConfig from "@/router/menu.js";

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const route = useRouter();
const defaultActive = computed(() => {
  return route.currentRoute.value.path;
});

const isExpand = ref(false);
const handleFold = () => {
  isExpand.value = !isExpand.value;
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  .menu {
    height: 100%;
    &-expand {
      font-size: 24px;
    }
    &-icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
