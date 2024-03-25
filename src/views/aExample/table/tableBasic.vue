<template>
  <!-- 示例-基本表格 -->
  <RhTable border stripe :table-data="tableData">
    <template #name="{ scope }">
      <el-link type="primary">{{ scope.row.name }}</el-link>
    </template>
  </RhTable>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

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
    // {
    //   date: "2016-05-03",
    //   name: "",
    //   address: "No. 189, Grove St, Los Angeles",
    // },
    // {
    //   date: "2016-05-02",
    //   name: "Tom",
    //   address: "No. 189, Grove St, Los Angeles",
    // },
    // {
    //   date: "2016-05-04",
    //   name: "Tom",
    //   address: "No. 189, Grove St, Los Angeles",
    // },
    // {
    //   date: "2016-05-01",
    //   name: "Tom",
    //   address: "No. 189, Grove St, Los Angeles",
    // },
  ],
  pages: {
    total: 100,
    pageNumber: 1,
    pageSize: 10,
  },
});
</script>

<style lang="scss" scoped></style>
