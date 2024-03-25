<template>
  <!-- 个性化配置 -->
  <el-tooltip effect="dark" content="个性化" placement="bottom" :show-after="250">
    <div class="flex items-center px-3 h-full cursor-pointer" :class="headerToolHoverClasses" @click="openDrawer">
      <el-icon size="20"><Setting /></el-icon>
    </div>
  </el-tooltip>

  <el-drawer v-model="drawerVisible" title="个性化配置" direction="rtl" append-to-body :size="400">
    <div class="overflow-y-auto h-[calc(100%-65px)]">
      <el-radio-group v-model="isDark">
        <el-radio-button :label="false">
          <div class="flex items-center">
            <el-icon size="16" class="mr-1"><Sunny /></el-icon>
            日间模式
          </div>
        </el-radio-button>
        <el-radio-button :label="true">
          <div class="flex items-center">
            <el-icon size="16" class="mr-1"><Moon /></el-icon>
            夜间模式
          </div>
        </el-radio-button>
      </el-radio-group>
      <div class="mt-6">
        <RhTitle title="导航模式"></RhTitle>
        <div class="flex">
          <el-radio-group v-model="layoutType">
            <el-radio v-for="(item, index) in layouts" :key="index" class="layout-item" :label="item.layout">
              <div class="flex flex-col justify-center items-center ml-[30px] mb-3 first:ml-0">
                <i class="iconfont text-4xl" :class="item.icon"></i>
                <span class="mt-2">{{ item.name }}</span>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="mt-6">
        <RhTitle title="主题色"></RhTitle>
        <div class="flex items-center">
          <ThemeColorPicker />
        </div>
      </div>
      <div class="mt-6">
        <RhTitle title="界面显示"></RhTitle>
        <div class="flex items-center justify-between w-full">
          <div>灰色模式</div>
          <el-switch v-model="isGray" inline-prompt active-text="开" inactive-text="关" />
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 flex justify-end p-4 border-t border-t-[var(--el-border-color-light)]">
      <el-button type="danger" @click="handleClearStorage">清空缓存并返回首页</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
import { deleteAllCookies } from "@/utils/index.js";
import ThemeColorPicker from "./ThemeColorPicker.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const { layoutType, isDark, isGray, headerToolHoverClasses } = useLayout();
const drawerVisible = ref(false);
const layouts = ref([
  { name: "侧边导航", icon: "icon-layout-cbdh", layout: "LayoutSideMenu" },
  { name: "通栏导航", icon: "icon-layout-tldh", layout: "LayoutClassic" },
  { name: "顶部导航", icon: "icon-layout-dbdh", layout: "LayoutHeadMenu" },
  { name: "混合导航", icon: "icon-layout-hhdh", layout: "LayoutMix" },
]);

// 展开抽屉
const openDrawer = () => {
  drawerVisible.value = true;
};

// 清空缓存并刷新页面
const handleClearStorage = () => {
  ElMessageBox.confirm(`该操作将清空所有缓存，清空后需要重新登录，确认清空缓存?`, "清空缓存", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({ type: "success", message: "缓存清空成功！" });
      sessionStorage.clear();
      localStorage.clear();
      deleteAllCookies();
      window.location.reload();
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.layout-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  :deep(.el-radio__input) {
    order: 2;
  }
  :deep(.el-radio__label) {
    order: 1;
    padding-left: 0;
  }
}
</style>
