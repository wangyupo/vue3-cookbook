<template>
  <!-- 表格 -->
  <div>
    <el-table
      ref="elTableRef"
      class="rh-table"
      v-bind="$attrs"
      v-loading="loading"
      :class="[border ? '' : '_border']"
      :border="border"
      :data="_tableData.data"
    >
      <template v-for="(column, index) in _tableData.columns">
        <template v-if="column.type">
          <!-- 展开&收起 -->
          <el-table-column :key="`col_${index}`" fixed="left" type="expand" v-if="column.type === 'expand'">
            <template #default="scope">
              <slot name="expand" :scope="scope"></slot>
            </template>
          </el-table-column>
          <!-- 多选 -->
          <el-table-column
            :key="`col_${index}`"
            fixed="left"
            type="selection"
            width="50"
            :selectable="column.selectable"
            v-if="column.type === 'selection'"
          />
          <!-- 序号 -->
          <el-table-column
            :label="column.label"
            :key="`col_${index}`"
            fixed="left"
            type="index"
            width="60"
            align="center"
            v-if="column.type === 'index'"
          >
            <template #default="scope">
              <div class="flex items-center">
                <el-icon class="rh-table-dragcursor mr-2 hover:cursor-grab" v-if="_tableData.draggable">
                  <Rank />
                </el-icon>
                {{ column.index ? column.index : indexMethod(scope.$index) }}
              </div>
            </template>
          </el-table-column>
        </template>

        <!-- 数据列 -->
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :sortable="column.sortable"
          :key="`col_${index}`"
          :show-overflow-tooltip="
            _tableData.showOverflowTooltip === undefined
              ? true
              : column.showOverflowTooltip === false || column.showOverflowTooltip === true
              ? column.showOverflowTooltip
              : _tableData.showOverflowTooltip
          "
          :align="column.align"
          v-else-if="column.hasOwnProperty('show') ? column.show : true"
        >
          <!-- 自定义表头 -->
          <template #header="scope">
            <slot name="RhTableHeader" :scope="scope" v-if="!column.diyHeader">
              {{ scope.column.label }}
            </slot>
            <slot :name="column.prop + 'Header'" :scope="scope" v-else></slot>
          </template>
          <!-- 自定义列 -->
          <template #default="scope">
            <div class="inline" @click="handleCopy(scope.$index, scope.row, column)">
              <slot :name="column.prop" :scope="scope" :table-data="_tableData.data">
                <template v-if="column.prop != 'operate'">
                  <!-- 自定义前缀 -->
                  <span v-html="column.prefix" v-if="scope.row[column.prop] && column.prefix"></span>
                  <!-- 识别并格式化手机号 -->
                  <span v-if="/^1[3-9][0-9]{9}$/.test(scope.row[column.prop])">
                    {{ formatPhone(scope.row[column.prop]) }}
                  </span>
                  <!-- 空值默认返回 -- -->
                  <span v-else>{{ epyReturn(scope.row[column.prop]) }}</span>
                  <!-- 自定义后缀 -->
                  <span v-html="column.suffix" v-if="scope.row[column.prop] && column.suffix"></span>
                </template>
              </slot>
            </div>
          </template>
        </el-table-column>
      </template>

      <!-- 当数据为空时自定义的内容 -->
      <template #empty>
        <RhNoData v-if="!$slots.empty" />
        <slot name="empty"></slot>
      </template>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      class="mt-3 flex justify-end"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="_tableData.pages.pageNumber"
      :page-size="_tableData.pages.pageSize"
      :page-sizes="[10, 20, 30]"
      :total="_tableData.pages.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      v-if="_tableData.pages"
    />
  </div>
</template>

<script setup>
import { formatPhone, copy, epyReturn } from "@/utils/index";
import { onMounted, onUpdated, reactive, ref, useAttrs, watch } from "vue";
import { debounce, cloneDeep } from "lodash-es";
import Sortable from "sortablejs";

const props = defineProps({
  border: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  tableData: {
    type: Object,
    default(rawProps) {
      return {
        columns: [],
        data: [],
        pages: {
          total: 0,
          pageNumber: 1,
          pageSize: 10,
        },
      };
    },
  },
});
const elTableRef = ref();
let _tableData = ref({});

watch(
  () => props.tableData,
  val => {
    _tableData.value = cloneDeep(val);
  },
  {
    immediate: true,
    deep: true,
  }
);

const emit = defineEmits([
  // 分页器事件
  "page-change",
  "page-size-change",
  "drag-end",
]);

// 分页事件 START
const handlePageChange = pageNumber => {
  emit("page-change", pageNumber);
};
const handleSizeChange = pageSize => {
  emit("page-size-change", pageSize);
};
// 分页事件 END

// el-table事件 START
onMounted(() => {
  if (props.tableData.draggable) rowDrop();
});

//序号
const indexMethod = idx => {
  let pageNumber = 1;
  let pageSize = 10;
  if (_tableData.value.pages) {
    pageNumber = _tableData.value.pages.pageNumber;
    pageSize = _tableData.value.pages.pageSize;
  }
  return (pageNumber - 1) * pageSize + idx + 1;
};

// 复制column内容
const handleCopy = debounce(
  (index, row, column) => {
    if (!column.copy) return;
    copy(row[column.prop], column.label);
  },
  1000,
  {
    leading: true,
    trailing: false,
  }
);

// 行拖拽
const rowDrop = function () {
  // 要拖拽元素的父容器
  const tbody = elTableRef.value.$el.querySelector(".el-table__body-wrapper tbody");
  Sortable.create(tbody, {
    //  可被拖拽的子元素
    handle: ".rh-table .rh-table-dragcursor",
    onEnd({ newIndex, oldIndex }) {
      let data = cloneDeep(_tableData.value.data);
      const currRow = data.splice(oldIndex, 1)[0];
      data.splice(newIndex, 0, currRow);
      emit("drag-end", data);
    },
  });
};
// el-table事件 END
</script>

<style lang="scss" scoped>
.rh-table {
  position: relative;
  &._border {
    border-top: 1px solid var(--el-table-border-color);
    &::before {
      content: "";
      position: absolute;
      top: -1px;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: var(--el-table-border-color);
      z-index: 10;
    }
    &::after {
      content: "";
      position: absolute;
      top: -1px;
      left: 0;
      width: 1px;
      height: 100%;
      background-color: var(--el-table-border-color);
      z-index: 10;
    }
  }
}
</style>
