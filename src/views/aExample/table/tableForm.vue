<template>
  <!-- 示例-带搜索的表格 -->
  <div>
    <RhSearch :searchInfo="searchInfo" :searchData="searchData" @search="handleSearch" />
    <RhTable
      border
      stripe
      :table-data="tableData"
      :loading="loading"
      @pageChange="fn_getList"
      @pageSizeChange="pageSizeChange"
      @selection-change="handleSelectionChange"
    >
      <template #dateHeader="{ scope }">{{ scope.column.label }}Diy</template>
      <template #expand="{ scope }">
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-link type="primary">{{ scope.row.name }}</el-link>
      </template>
    </RhTable>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const searchData = ref({
  name: "",
  address: "",
  date: "",
  time: "",
});
const searchInfo = ref([
  {
    type: "input",
    label: "姓名",
    placeholder: "请输入姓名",
    key: "name",
    colSpan: 8,
  },
  {
    type: "select",
    label: "地址",
    placeholder: "请选择地址",
    key: "address",
    options: [
      {
        value: "No. 188, Grove St, Los Angeles",
        label: "No. 188, Grove St, Los Angeles",
      },
      {
        value: "No. 189, Grove St, Los Angeles",
        label: "No. 189, Grove St, Los Angeles",
      },
    ],
    colSpan: 8,
  },
  {
    type: "date",
    label: "日期",
    placeholder: "请选择日期",
    key: "date",
    colSpan: 8,
  },
  {
    type: "daterange",
    label: "日期范围",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    key: "time",
    startKey: "beginTime",
    endKey: "endTime",
    value: null,
    colSpan: 8,
  },
]);
const selectable = (row, index) => {
  if (index === 1) return false;
  return true;
};
const multipleSelection = ref([]);
const tableData = reactive({
  showOverflowTooltip: true,
  columns: [
    {
      type: "expand",
    },
    {
      type: "selection",
      selectable,
    },
    {
      label: "序号",
      type: "index",
    },
    {
      label: "日期",
      prop: "date",
      width: "150px",
      diyHeader: true,
      sortable: true,
    },
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "地址",
      prop: "address",
      prefix: "<span class='font-bold'>送货地址：</span>",
      suffix: "(not too spicy)",
    },
  ],
  data: [
    {
      date: "15311665523",
      name: "Tom",
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

onMounted(() => {
  // fn_getList();
});

// 搜索
const handleSearch = params => {
  console.log(params);
  // if (dialogVisible.value) return; // 显示弹窗时，禁止回车触发页面搜索
  // searchData.value = params;
  // fn_getList(1);
};

// 列表查询
const fn_getList = (pageNumber = 1) => {
  loading.value = true;
  const params = Object.assign({}, searchData.value, {
    pageNumber: pageNumber ? pageNumber : tableData.pages.pageNumber,
    pageSize: tableData.pages.pageSize,
  });
  api(params)
    .then(res => {
      // 这里必须判断返回参数后再赋值，否则 table 序号与数据刷新不同步
      if (res.code === 200) {
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

// 多选表格行
const handleSelectionChange = val => {
  multipleSelection.value = val;
};
</script>

<style lang="scss" scoped></style>
