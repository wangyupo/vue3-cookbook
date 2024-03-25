<template>
  <!-- 业务说明 -->
  <div class="flex items-center">
    <slot name="right-slot"></slot>
    <el-popover placement="bottom" title="自定义列" popper-style="width: auto;min-width: 150px" trigger="click">
      <template #reference>
        <el-button type="default" :icon="Setting" circle title="自定义列" />
      </template>
      <draggable
        :list="_columns"
        item-key="name"
        class="list-group max-h-[300px] min-w-[150px] overflow-y-auto"
        ghost-class="ghost"
        tag="div"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <el-checkbox-group v-model="columnCheckList">
            <div class="flex items-center">
              <template v-if="element.label">
                <el-icon size="17" class="mr-2 hover:cursor-move"><Rank /></el-icon>
                <el-checkbox :label="element.label" />
              </template>
            </div>
          </el-checkbox-group>
        </template>
      </draggable>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import { Setting } from "@element-plus/icons-vue";
import { cloneDeep, isEqual } from "lodash-es";

/* 自定义列 START */
const props = defineProps({
  // 表格列
  columns: Array,
});

const columnCheckList = ref([]);
const _columns = ref([]);
const emit = defineEmits(["updateColumns"]);

watch(
  () => props.columns,
  columns => {
    if (!columns) return;
    const withoutTypeColumns = columns.filter(i => !i.type);
    if (withoutTypeColumns && withoutTypeColumns.length && !isEqual(withoutTypeColumns, _columns.value)) {
      _columns.value = cloneDeep(withoutTypeColumns);
      columnCheckList.value = cloneDeep(withoutTypeColumns)
        .filter(i => i.show)
        .map(i => i.label);
    }
  },
  { deep: true, immediate: true }
);
watch(
  _columns,
  newColumns => {
    emit("updateColumns", newColumns);
  },
  { deep: true }
);
watch(columnCheckList, checkedLabelList => {
  for (let index = 0; index < _columns.value.length; index++) {
    const element = _columns.value[index];
    if (checkedLabelList.includes(element.label)) {
      element["show"] = true;
    } else {
      element["show"] = false;
    }
  }
});
/* 自定义列 END */
</script>

<style lang="scss" scoped></style>
