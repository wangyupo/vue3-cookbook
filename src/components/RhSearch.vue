<template>
  <!-- 搜索组件-支持传参配置搜索项、自动换行、插槽 -->
  <div class="rh-search-wrapper mb-3" :class="[noBorder ? 'noBorder' : '']">
    <div
      class="rh-search-content flex items-center flex-wrap overflow-hidden"
      :class="[!toggle && searchInfo.length > 6 ? 'h-[88px]' : '']"
    >
      <el-form label-width="auto" class="w-full">
        <el-row :gutter="16" class="w-full">
          <el-col :span="searchItem.colSpan" v-for="(searchItem, idx) in searchInfo" :key="idx">
            <!-- 输入框 -->
            <el-form-item :label="searchItem.label" v-if="searchItem.type === 'input'">
              <el-input
                class="rh-search-item"
                v-model="_searchData[searchItem.key]"
                clearable
                :placeholder="searchItem.placeholder"
                :formatter="searchItem.formatter ? searchItem.formatter : value => value.replace(/\s*/g, '')"
              />
            </el-form-item>

            <!-- 单选 -->
            <el-form-item :label="searchItem.label" v-if="searchItem.type === 'select'">
              <el-select
                class="rh-search-item"
                v-model="_searchData[searchItem.key]"
                clearable
                :placeholder="searchItem.placeholder"
                :filterable="searchItem.filterable"
                @change="searchItem.change"
              >
                <el-option
                  v-for="item in searchItem.options"
                  :key="item[searchItem.props && searchItem.props.value ? searchItem.props.value : 'value']"
                  :label="item[searchItem.props && searchItem.props.label ? searchItem.props.label : 'label']"
                  :value="item[searchItem.props && searchItem.props.value ? searchItem.props.value : 'value']"
                />
              </el-select>
            </el-form-item>

            <!-- 多选 -->
            <el-form-item :label="searchItem.label" v-if="searchItem.type === 'selectMultiple'">
              <el-select
                class="rh-search-item"
                v-model="_searchData[searchItem.key]"
                multiple
                clearable
                :placeholder="searchItem.placeholder"
                :collapse-tags="searchItem.collapseTags"
                :collapse-tags-tooltip="searchItem.collapseTagsTooltip"
                :filterable="searchItem.filterable"
              >
                <el-option
                  v-for="item in searchItem.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <!-- 级联选择 -->
            <el-form-item :label="searchItem.label" v-if="searchItem.type === 'cascader'">
              <el-cascader
                class="w-full"
                v-model="_searchData[searchItem.key]"
                :options="searchItem.options"
                :props="searchItem.props"
                :placeholder="searchItem.placeholder"
                clearable
              />
            </el-form-item>

            <!-- 日期单选 -->
            <el-form-item :label="searchItem.label" v-if="searchItem.type === 'date'">
              <el-date-picker
                v-model="_searchData[searchItem.key]"
                type="date"
                clearable
                :placeholder="searchItem.placeholder"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <!-- 日期范围 -->
            <el-form-item :label="searchItem.label" v-if="searchItem.type === 'daterange'">
              <el-date-picker
                v-model="_searchData[searchItem.key]"
                type="daterange"
                value-format="YYYY-MM-DD"
                unlink-panels
                clearable
                :range-separator="searchItem.rangeSeparator ? searchItem.rangeSeparator : '至'"
                :start-placeholder="searchItem.startPlaceholder ? searchItem.startPlaceholder : '开始日期'"
                :end-placeholder="searchItem.endPlaceholder ? searchItem.endPlaceholder : '结束日期'"
                :shortcuts="searchItem.shortcuts ? shortcuts : []"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <!-- 行内搜索（搜索条件小于等于2个） -->
          <el-col class="mb-3" :span="4" v-if="searchInfo.length <= 2">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 多行搜索（搜索条件大于3个） -->
    <div class="flex justify-center mb-3" :span="4" v-if="searchInfo.length > 2">
      <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
      <el-button :icon="RefreshRight" @click="handleReset">重置</el-button>
      <!-- 展开/收起（搜索条件大于6个） -->
      <el-button type="primary" link @click="handleToggle" v-if="searchInfo.length > 6">
        <template v-if="!toggle">
          展开
          <el-icon><ArrowDown /></el-icon>
        </template>
        <template v-if="toggle">
          收起
          <el-icon><ArrowUp /></el-icon>
        </template>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { typeOf } from "@/utils/index";
import { on, off } from "@/utils/index";
import { debounce } from "lodash-es";
import { useLayout } from "@/hooks/useLayout.js";
import { Search, RefreshRight } from "@element-plus/icons-vue";

const { menuFilterDialogVisible } = useLayout();
const emit = defineEmits(["search"]);
const props = defineProps({
  // 搜索配置
  searchInfo: {
    type: Array,
    default: () => [],
  },
  // 搜索值组成的对象
  searchData: {
    type: Object,
    default: () => {},
  },
  // 不显示底部分割线
  noBorder: {
    type: Boolean,
    default: false,
  },
  // 不使用键盘事件
  noKeyBoard: {
    type: Boolean,
    default: false,
  },
});
// 日期范围快捷操作
const shortcuts = [
  {
    text: "过于一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "过去一月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "过去一年",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      return [start, end];
    },
  },
];
const _searchData = reactive(props.searchData || {});
const toggle = ref(false);

watch(
  _searchData,
  () => {
    canSearch.value = true;
  },
  { deep: true }
);

/* 回车触发搜索事件 START */
const canSearch = ref(false); // 开关-回车是否能触发搜索。只有搜索值改变时，才能触发。
onMounted(() => {
  if (!props.noKeyBoard) on(document, "keydown", keyboardTrigger); // 键盘监听事件-添加
});
onUnmounted(() => {
  if (!props.noKeyBoard) off(document, "keydown", keyboardTrigger); // 键盘监听事件-销毁
});
// 键盘响应事件
const keyboardTrigger = e => {
  if (menuFilterDialogVisible.value) return;
  const { ctrlKey, key } = e;
  if (key === "Enter") {
    handleEnterSearch(); // 回车触发搜索
  } else if (ctrlKey && key === "Backspace") {
    // Ctrl+Backspace触发重置
    handleReset({
      isEnterSearch: true,
    });
  }
};
// 回车搜索事件-搜索值有改变时才能触发
const handleEnterSearch = () => {
  if (!canSearch.value) return;
  handleSearch({
    isEnterSearch: true,
  });
};
/* 回车触发搜索事件 END */

// 搜索
const handleSearch = debounce(searchConfig => {
  let params = {};
  const keys = Object.keys(_searchData);
  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const emptyArr = typeOf(_searchData[key]) === "array" && !_searchData[key].length;
    const emptyStr = typeOf(_searchData[key]) === "string" && !_searchData[key];
    if (emptyArr || emptyStr) {
      // 过滤空值
      continue;
    } else {
      const searchCfg = props.searchInfo.find(i => i.key === key);
      // 组装日期范围。由“数组”组装成“startKey”、“endKey”两个值。
      if (searchCfg.type === "daterange" && searchCfg.startKey && searchCfg.endKey) {
        params[searchCfg.startKey] = _searchData[key][0];
        params[searchCfg.endKey] = _searchData[key][1];
      } else {
        params[key] = _searchData[key];
      }
    }
  }
  emit("search", params);
  if (searchConfig && searchConfig.isEnterSearch) canSearch.value = false;
}, 200);

// 重置
const handleReset = debounce(searchConfig => {
  const keys = Object.keys(_searchData);
  keys.forEach(key => {
    if (typeOf(_searchData[key]) === "array") {
      _searchData[key] = [];
    } else if (_searchData[key] || _searchData[key] === 0) {
      _searchData[key] = "";
    }
  });
  handleSearch();
}, 200);

// 展开/收起
const handleToggle = () => {
  toggle.value = !toggle.value;
};
</script>

<style lang="scss" scoped>
.rh-search-wrapper {
  border-bottom: 1px solid var(--el-border-color-light);
  &.noBorder {
    border-bottom: none;
  }
  :deep(.el-form-item) {
    margin-bottom: initial;
  }
}

.rh-search-content {
  flex: 1;
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
  }
}

.rh-search-item {
  margin-bottom: 12px;
  width: 100%;
}
</style>
