<template>
  <!-- 示例-列字段配置（排序、显示/隐藏） -->
  <div>
    <RhSearch diyColumns :searchInfo="searchInfo" :searchForm="searchForm" @search="handleSearch" />
    <div class="flex justify-end mb-3">
      <el-button type="default" :icon="Download" circle class="mr-3" @click="handleDownload"></el-button>
      <RhTableColumnDIY :columns="tableData.columns" @update-columns="updateColumns"></RhTableColumnDIY>
    </div>
    <RhTable
      border
      stripe
      :loading="loading"
      :table-data="tableData"
      @pageChange="fn_getList"
      @pageSizeChange="pageSizeChange"
    >
      <template #operate="{ scope }">
        <el-button type="primary" link>操作</el-button>
      </template>
    </RhTable>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
// import { getList } from "@/api/api.js";
import { Download } from "@element-plus/icons-vue";
import { exportToExcel } from "@/utils/index.js";
import { cloneDeep } from "lodash-es";

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
    label: "日期",
    placeholder: "请选择日期",
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
  columns: [
    {
      label: "序号",
      type: "index",
    },
    {
      label: "日期",
      prop: "date",
      minWidth: "120px",
      show: true,
    },
    {
      label: "姓名",
      prop: "name",
      width: "120px",
      show: true,
    },
    {
      label: "操作",
      prop: "operate",
      width: "200px",
      show: true,
    },
  ],
  data: [
    {
      date: "2016-05-03",
      name: "tableColumnsDIY 示例数据",
    },
  ],
  pages: {
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  },
});
const loading = ref(false);

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

// 更新列
const updateColumns = newColumns => {
  const lastTypeIdx = tableData.columns.findLastIndex(i => i.type);
  const types = tableData.columns.slice(0, lastTypeIdx + 1);
  tableData.columns = types.concat(newColumns);
};

// 下载Excel
const handleDownload = () => {
  exportToExcel({
    excelData: {
      firstRow: cloneDeep(tableData.columns).slice(1, 3),
      contentRow: cloneDeep(tableData.data),
    },
    fileName: "Excel示例",
  });
};
</script>

<style lang="scss" scoped></style>
