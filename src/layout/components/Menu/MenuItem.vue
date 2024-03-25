<template>
  <!-- 菜单组 -->
  <template v-for="menuItem in menu">
    <template v-if="menuItem[menuKey.children] && menuItem[menuKey.children].length > 0">
      <el-sub-menu :key="menuItem[menuKey.id]" :index="menuItem[menuKey.id]">
        <template #title>
          <i
            :class="['iconfont text-base mr-2 menuItem-ew-icon', menuItem[menuKey.icon]]"
            v-if="menuItem[menuKey.icon]"
          ></i>
          <span>{{ menuItem[menuKey.title] }}</span>
        </template>
        <MenuItem :menu="menuItem[menuKey.children]" />
      </el-sub-menu>
    </template>

    <el-menu-item v-else-if="menuItem[menuKey.url]" :index="menuItem[menuKey.url]" :key="menuItem[menuKey.id]">
      <i
        :class="['iconfont text-base mr-2 menuItem-ew-icon', menuItem[menuKey.icon]]"
        v-if="menuItem[menuKey.icon]"
      ></i>
      <template #title>
        <span>{{ menuItem[menuKey.title] }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { menuKey } from "@/router/menuConfig.js";

const props = defineProps({
  menu: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<style lang="scss" scoped></style>
