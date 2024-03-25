<template>
  <!-- 弹窗-搜索菜单 -->
  <el-dialog
    class="filter-menu-dialog rounded-2xl"
    v-model="dialogVisible"
    width="632px"
    top="6vh"
    :show-close="false"
    @opened="opened"
    @closed="closed"
  >
    <div class="main">
      <el-input
        v-model="searchVal"
        class="filter-menu-dialog-input px-[14px]"
        size="large"
        placeholder="支持菜单全称|关键词|全拼|首字母搜索"
        ref="searchInputRef"
        :prefix-icon="Search"
      />
      <el-scrollbar
        class="mt-4"
        ref="scrollbarRef"
        max-height="300px"
        always
        @scroll="scrollbarScroll"
        v-show="searchVal && filterMenuList.length"
      >
        <div
          ref="resultRef"
          class="flex items-center justify-between mt-2 last:mb-1 mx-[14px] p-3 h-[56px] rounded text-base cursor-pointer hover:bg-blue-500 hover:text-white"
          :class="[listSelectIdx === idx ? 'bg-blue-500 text-white' : '']"
          style="box-shadow: 0 1px 3px #d4d9e1"
          v-for="(item, idx) in filterMenuList"
          :key="item[menuKey.id]"
          @click="nav2Menu(item[menuKey.url])"
        >
          <div class="flex items-center">
            <el-icon class="mr-2"><Document /></el-icon>
            {{ item[menuKey.title] }}
          </div>
          <i class="iconfont icon-enter text-xl"></i>
        </div>
      </el-scrollbar>
      <RhNoData description="暂无搜索结果" v-show="!searchVal || !filterMenuList.length" />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <div class="filter-menu-dialog-board-key flex items-center flex-shrink-0 w">
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[31px] h-[26px] rounded-md mr-3"
          >
            <i class="iconfont icon-enter text-[15px] text-[#5a5a5a]"></i>
          </div>
          确认
        </div>
        <div class="filter-menu-dialog-board-key flex items-center flex-shrink-0 ml-6">
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[26px] h-[26px] rounded-md mr-1"
          >
            <el-icon color="#5a5a5a"><Top /></el-icon>
          </div>
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[26px] h-[26px] rounded-md mr-3"
          >
            <el-icon color="#5a5a5a"><Bottom /></el-icon>
          </div>
          切换
        </div>
        <div class="filter-menu-dialog-board-key flex items-center flex-shrink-0 ml-6">
          <div
            class="filter-menu-dialog-board-key-btn flex items-center justify-center w-[31px] h-[26px] text-[12px] text-[#5a5a5a] rounded-md mr-3"
          >
            Esc
          </div>
          关闭
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import pinyin from "pinyin";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/user.js";
import { useLayout } from "@/hooks/useLayout.js";
import { useRouter } from "vue-router";
import { on, off } from "@/utils/index";
import { menuKey } from "@/router/menuConfig.js";

/** dialog START **/
const dialogVisible = defineModel(false);

// 弹窗开启
const opened = () => {
  if (searchInputRef.value) searchInputRef.value.focus();
};

// 弹窗关闭
const closed = () => {
  resetData();
  dialogVisible.value = false;
};
/** dialog END **/

/** menu filter START **/
const { isDark } = useLayout();
const userStore = useUserStore();
const router = useRouter();
const searchVal = ref("");
const searchInputRef = ref();
const scrollbarRef = ref();
const resultRef = ref();
const listSelectIdx = ref(0);
const filterMenuList = ref([]);
const scrollbarScrollTop = ref(0); // 搜索结果列表滚动条距顶部距离

// 中文转拼音
const chinese2Pinyin = chinese => {
  const _PY_NORMAL = pinyin(chinese, { style: "normal", heteronym: true, compact: true }).map(i =>
    i.flat().join("").toLowerCase()
  );
  const _PY_FIRST_LETTER = pinyin(chinese, { style: "first_letter", heteronym: true, compact: true }).map(i =>
    i.flat().join("").toLowerCase()
  );
  const RES = _PY_NORMAL.concat(_PY_FIRST_LETTER);
  return RES;
};
watch(searchVal, val => {
  setTimeout(() => {
    scrollbarRef.value.setScrollTop(0);
  });
  listSelectIdx.value = 0;
  const valPinyinArr = chinese2Pinyin(val);
  filterMenuList.value = userStore.menuArrWithoutEmptyUrl.filter(i => {
    if (i[menuKey.menuType] != menuKey.menuValue) return false;
    let filterRes = chinese2Pinyin(i[menuKey.title]).filter(p => {
      return valPinyinArr.find(o => p.indexOf(o) !== -1);
    });
    if (filterRes.length) return i;
  });
});

onMounted(() => {
  on(document, "keydown", selectMenuByKeyboard);
});

onUnmounted(() => {
  off(document, "keydown", selectMenuByKeyboard);
});

// 记录搜索结果滚动条位置
const scrollbarScroll = val => {
  scrollbarScrollTop.value = val.scrollTop;
};

// 判断当前元素的下/上一个是否可见，并将不可见元素移至结果列表区域
function scrollTo(index, direction) {
  let idx;
  if (direction == "down") {
    idx = index + 1;
  } else {
    idx = index - 1;
  }
  if (!resultRef.value[idx]) return;
  const { offsetTop, offsetHeight } = resultRef.value[idx];
  const parentWrapHeight = scrollbarRef.value.wrapRef.offsetHeight;

  const nextDomTop2ClientHeight = resultRef.value[idx].getBoundingClientRect().top - 8;
  const nextDomBottom2ClientHeight = resultRef.value[idx].getBoundingClientRect().top + offsetHeight;
  const parentDomTop2ClientHeight = scrollbarRef.value.wrapRef.getBoundingClientRect().top;
  const parentDomBottom2ClientHeight = parentDomTop2ClientHeight + parentWrapHeight;
  if (direction == "down") {
    const domBottom2ParentWrapTop = offsetTop + 8 + offsetHeight + 8;
    if (nextDomBottom2ClientHeight > parentDomBottom2ClientHeight) {
      scrollbarRef.value.setScrollTop(domBottom2ParentWrapTop - parentWrapHeight);
    }
  } else if (direction == "up") {
    if (nextDomTop2ClientHeight < parentDomTop2ClientHeight) {
      scrollbarRef.value.setScrollTop(scrollbarScrollTop.value - (parentDomTop2ClientHeight - nextDomTop2ClientHeight));
    }
  }
}

// 通过键盘选择菜单（选择菜单 & 回车跳转 & 搜索快捷键）
const selectMenuByKeyboard = e => {
  const { metaKey, ctrlKey, key } = e;
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  // mac使用 command+k 打开弹窗
  if (isMac) {
    if (metaKey && key === "k") {
      e.preventDefault();
      dialogVisible.value = true;
    }
  } else {
    // windows使用 ctrl+空格 打开弹窗
    if (ctrlKey && key === " ") dialogVisible.value = true;
  }
  if (!filterMenuList.value.length) return;
  if (key === "ArrowDown") {
    // 向下
    if (listSelectIdx.value === filterMenuList.value.length - 1) return;
    listSelectIdx.value += 1;
    scrollTo(listSelectIdx.value, "down");
  } else if (key === "ArrowUp") {
    // 向上
    e.preventDefault(); // 防止光标受到上键影响
    if (listSelectIdx.value === 0) return;
    listSelectIdx.value -= 1;
    scrollTo(listSelectIdx.value, "up");
  } else if (key === "Enter") {
    // 回车
    const selectedMenu = filterMenuList.value[parseInt(listSelectIdx.value)];
    nav2Menu(selectedMenu[menuKey.url]);
  } else if (key == "Backspace") {
    // 删除文字
    listSelectIdx.value = 0;
  }
};

// To menu && close menu
const nav2Menu = path => {
  router.push({
    path,
  });
  resetData();
  closed();
};

// 重置数据
const resetData = () => {
  searchVal.value = "";
  listSelectIdx.value = 0;
  filterMenuList.value = [];
};
/** menu filter END **/
</script>

<style lang="scss">
.filter-menu-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 12px 0;
  }
  .el-dialog__footer {
    padding: 18px 20px;
    line-height: initial;
  }
  .dialog-footer {
    display: flex;
  }
  &-input {
    height: 50px;
    font-size: 16px;
  }
  &-board-key {
    font-size: 14px;
    color: var(--el-text-color-primary);
    &-btn {
      background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
      box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4);
    }
  }
}
</style>
