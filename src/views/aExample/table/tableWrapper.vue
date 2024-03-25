<template>
  <!-- 示例-特定容器包裹的表格 -->
  <RhWrapper>
    <template #title-right>
      <el-input placeholder="请输入" :suffix-icon="Search"></el-input>
    </template>
    <RhTable border stripe :table-data="tableData">
      <template #name="{ scope }">
        <el-link type="primary">{{ scope.row.name }}</el-link>
      </template>
    </RhTable>
  </RhWrapper>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";

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
      width: "150px",
      sortable: true,
    },
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "地址",
      prop: "address",
    },
  ],
  data: [
    {
      date: "2016-05-03",
      name: "",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
  pages: {
    total: 100,
    pageNumber: 1,
    pageSize: 10,
  },
});
</script>

<style lang="scss" scoped></style>
