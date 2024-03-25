<template>
  <Layout>
    <router-view v-slot="{ Component, route }">
      <transition name="slide-fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </Layout>
</template>

<script setup>
import Layout from "@/layout/Index.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { arr2tree } from "@/utils/index.js";
import menuJson from "@/router/menu.json";
import { menuKey } from "@/router/menuConfig.js";
import { onBeforeMount, onMounted } from "vue";

const router = useRouter();

// onMounted(() => {
//   handleLogin();
// });

onBeforeMount(() => {
  handleLogin();
});

const handleLogin = params => {
  // 模拟接口返回菜单 START
  const userStore = useUserStore();
  userStore.$patch(state => {
    state.menu = arr2tree(menuJson, {
      id: menuKey.id,
      parentId: menuKey.parentId,
      children: menuKey.children,
    });
  });
  // 模拟接口返回菜单 END
  // router.replace({
  //   path: "/",
  // });
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
