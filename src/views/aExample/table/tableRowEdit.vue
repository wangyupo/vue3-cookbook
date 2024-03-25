<template>
  <!-- 示例-行编辑的表格 -->
  <div class="flex">
    <div class="w-[300px] text-sm">
      <code>
        <pre>{{ dataJson }}</pre>
      </code>
    </div>
    <RhWrapper class="flex-1">
      <template #title-right>
        <el-button type="primary" @click="handleAddRow()" v-if="!tableData.data.length">新增</el-button>
        <el-button type="primary" :disabled="!tableData.data.length">保存</el-button>
      </template>
      <RhTable border stripe :table-data="tableData">
        <template #date="{ scope }">
          <el-input v-model="scope.row.date" placeholder="Please input date" v-if="rowEditIdx == scope.$index" />
          <template v-else>{{ scope.row.date }}</template>
        </template>
        <template #name="{ scope }">
          <el-input v-model="scope.row.name" placeholder="Please input name" v-if="rowEditIdx == scope.$index" />
          <template v-else>{{ scope.row.name }}</template>
        </template>
        <template #address="{ scope }">
          <el-input v-model="scope.row.address" placeholder="Please input address" v-if="rowEditIdx == scope.$index" />
          <template v-else>{{ scope.row.address }}</template>
        </template>
        <template #operate="{ scope, tableData }">
          <div class="flex items-center">
            <el-button type="primary" @click="() => (rowEditIdx = scope.$index)" v-if="rowEditIdx == null">
              编辑
            </el-button>
            <el-button type="primary" @click="handleConfirm(tableData)" v-else-if="rowEditIdx == scope.$index">
              保存
            </el-button>
            <el-button :icon="Plus" circle title="添加行" @click="handleAddRow(tableData, scope.$index)" />
            <el-button :icon="Minus" circle title="删除行" @click="handleDelRow(tableData, scope.$index)" />
          </div>
        </template>
      </RhTable>
    </RhWrapper>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Plus, Minus } from "@element-plus/icons-vue";

const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    {
      label: "序号",
      type: "index",
    },
    {
      label: "日期",
      prop: "date",
    },
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "地址",
      prop: "address",
    },
    {
      label: "操作",
      prop: "operate",
      width: "250px",
    },
  ],
  data: [
    {
      date: "2016-05-03",
      name: "Joe",
      address: "No. 189, Grove St",
    },
  ],
  pages: {
    total: 100,
    pageNumber: 1,
    pageSize: 10,
  },
});
const rowEditIdx = ref(null);
const dataJson = computed(() => {
  return tableData.data;
});

// 保存编辑
const handleConfirm = data => {
  rowEditIdx.value = null;
  tableData.data = data;
};

// 动态添加行
const handleAddRow = (data, idx) => {
  if (data) tableData.data = data;
  tableData.data.splice(idx + 1, 0, {
    date: "",
    name: "",
    address: "",
  });
  rowEditIdx.value = null;
};

// 动态删除行
const handleDelRow = (data, idx) => {
  tableData.data = data;
  tableData.data.splice(idx, 1);
  rowEditIdx.value = null;
};
</script>

<style lang="scss" scoped></style>
