<template>
  <!-- 业务说明 -->
  <div class="flex">
    <div class="w-[300px] text-sm">
      <code>
        <pre>{{ dataJson }}</pre>
      </code>
    </div>
    <div class="flex-1">
      <RhSearch :searchInfo="searchInfo" :searchForm="searchForm" @search="handleSearch" />
      <RhTable
        border
        stripe
        row-key="date"
        :loading="loading"
        :table-data="tableData"
        @drag-end="dragend"
        @pageChange="fn_getList"
        @pageSizeChange="pageSizeChange"
      >
        <template #operate="{ scope }">
          <el-button type="primary" link>操作</el-button>
        </template>
      </RhTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
// import { getList } from "@/api/api.js";

// 条件配置
const searchForm = ref({
  key: "",
});
const searchInfo = ref([
  {
    type: "input",
    label: "姓名",
    placeholder: "请输入姓名",
    key: "input",
    value: "",
    colSpan: 8,
  },
  {
    type: "select",
    label: "状态",
    placeholder: "请选择状态",
    key: "select",
    value: "",
    options: [
      {
        value: "1",
        label: "选项一",
      },
      {
        value: "2",
        label: "选项二",
      },
    ],
    colSpan: 8,
  },
]);
// 表格配置
const tableData = reactive({
  showOverflowTooltip: true,
  draggable: true,
  columns: [
    {
      label: "序号",
      type: "index",
    },
    {
      label: "日期",
      prop: "date",
      minWidth: "120px",
    },
    {
      label: "姓名",
      prop: "name",
      // width: "120px",
    },
    {
      label: "操作",
      prop: "operate",
      width: "200px",
    },
  ],
  data: [
    {
      date: "2016-05-01",
      name: "home 示例数据1",
    },
    {
      date: "2016-05-02",
      name: "home 示例数据2",
    },
    {
      date: "2016-05-03",
      name: "home 示例数据3",
    },
  ],
  pages: {
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  },
});
const loading = ref(false);
const dataJson = computed(() => {
  return tableData.data;
});

onMounted(() => {
  // fn_getList();
});

// 条件查询
const handleSearch = params => {
  searchForm.value = params;
  fn_getList(1);
};

// 列表查询
const fn_getList = (pageNumber = 1) => {
  loading.value = true;
  const params = Object.assign(
    {
      pageNumber: pageNumber ? pageNumber : tableData.pages.pageNumber,
      pageSize: tableData.pages.pageSize,
    },
    searchForm.value
  );
  getList(params)
    .then(res => {
      if (res.code == 200) {
        tableData.data = res.rows;
        tableData.pages.total = res.total;
        tableData.pages.pageNumber = params.pageNumber;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

// 更变每页条数
const pageSizeChange = pageSize => {
  tableData.pages.pageSize = pageSize;
  fn_getList(1);
};

// 行拖拽结束
const dragend = val => {
  tableData.data = val;
};
</script>

<style lang="scss" scoped></style>
