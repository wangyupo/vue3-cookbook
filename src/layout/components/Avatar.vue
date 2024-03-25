<template>
  <!-- 个人信息 -->
  <el-dropdown trigger="click" class="h-full">
    <div class="avatar flex items-center cursor-pointer flex-shrink-0 px-3 h-full" :class="headerToolHoverClasses">
      <el-avatar :size="30" :icon="UserFilled" />
      <div class="ml-2">管理员</div>
    </div>
    <template #dropdown>
      <div class="menu">
        <div class="menu-item flex items-center" @click="handleV3s">
          <el-icon size="16" class="mr-1"><Location /></el-icon>
          项目地址
        </div>
        <div class="menu-item flex items-center" @click="handleLoginOut">
          <el-icon size="16" class="mr-1"><SwitchButton /></el-icon>
          退出登录
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { removeAllLoginInfo } from "@/utils/index";
import { useLayout } from "@/hooks/useLayout.js";
import { UserFilled } from "@element-plus/icons-vue";

const router = useRouter();
const { headerToolHoverClasses } = useLayout();

// 退出登录
const handleLoginOut = params => {
  ElMessageBox.confirm("确认退出系统吗?", "提示", {
    type: "warning",
  }).then(() => {
    ElMessage({
      type: "success",
      message: "登出成功！",
    });
    router.replace({
      path: "/login",
    });
    removeAllLoginInfo();
  });
};
</script>

<style lang="scss" scoped>
@import "@/layout/types/common.scss";
$itemHeight: 40px;

.avatar {
  height: 100%;
}

.menu {
  overflow: hidden;
  &-item {
    padding: 0 8px;
    height: $itemHeight;
    line-height: $itemHeight;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
    &:last-child {
      border-top: 1px solid var(--el-color-primary-light-9);
    }
  }
}
</style>
