import XLSX from "xlsx-js-style";
import { ElMessage } from "element-plus";

/**
 * 文件导出
 * @param {*} res bolb文件流
 * @param {*} fileName 导出的文件名称
 */
export function fileDownload(res, fileName) {
  if (window.navigator.msSaveBlob) {
    //判断了有该方法即为IE浏览器
    try {
      let blob = new Blob([res], { type: "application/x-www-form-urlencoded" });
      window.navigator.msSaveBlob(blob, fileName);
    } catch (e) {
      console.log(e);
    }
  } else {
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(new Blob([res]));
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link); // Firefox 中必须这么写，不然不会起效果
    link.click();
    document.body.removeChild(link);
  }
  ElMessage({ type: "success", message: `“${fileName}” 导出成功！` });
}

/* 
前端导出Excel
使用：
  exportToExcel({
    firstRow: {
      fontSize: 18,
      fontBold: true,
      backgroundColor: "#9FE3FF"
    },
    otherRow: {
      fontSize: 16,
      fontBold: true,
      backgroundColor: "#ffffff" // 颜色6位
    },
    excelData: {
      firstRow: [
        { label: "日期", prop: "date", minWidth: "120px" },
        { label: "姓名", prop: "name", width: "120px" },
      ],
      contentRow: [
         { date: "2016-05-03", name: "treeFilter 示例数据" },
         { date: "2016-05-03", name: "treeFilter 示例数据" },
      ]
    },
    fileName: "数据导出"
  })
*/
export function exportToExcel({ firstRow = {}, otherRow = {}, excelData = {}, fileName = "数据导出" }) {
  // 没配置的配置默认样式
  firstRow = {
    fontSize: 12,
    fontBold: true,
    backgroundColor: "#ffffff",
    ...firstRow,
  };
  otherRow = {
    fontSize: 12,
    fontBold: false,
    backgroundColor: "#ffffff",
    ...otherRow,
  };
  excelData = {
    firstRow: [],
    contentRow: [],
    ...excelData,
  };

  const firstRowData = excelData.firstRow.filter(column => column.prop && column.prop != "operate").map(i => i.label);
  const contentRowData = excelData.contentRow.map(item => {
    const values = [];
    excelData.firstRow.forEach(column => {
      const prop = column.prop;
      if (prop && item.hasOwnProperty(prop)) {
        values.push(item[prop]);
      }
    });
    return values;
  });

  let data = [firstRowData, ...contentRowData];

  // 配置列最宽宽度
  let arr = excelData.firstRow.map(() => 0);
  data.forEach((item, index) => {
    arr.forEach((i, j) => {
      const re = /[\u4E00-\u9FA5]/g;
      const cnLength = ((item[j] + "").match(re) && (item[j] + "").match(re).length) || 0;
      const otherLength = (item[j] + "").length - cnLength;
      let resLength = 0;
      // 加粗拓宽字体 再结合字体大小配置宽度
      if (index === 0) {
        resLength =
          (firstRow.fontBold ? (cnLength * 2 + otherLength) * 1.2 : cnLength * 2 + otherLength) *
          (firstRow.fontSize / 10);
      } else {
        resLength =
          (otherRow.fontBold ? (cnLength * 2 + otherLength) * 1.2 : cnLength * 2 + otherLength) *
          (otherRow.fontSize / 10);
      }
      if (resLength > i) {
        arr[j] = resLength;
      }
    });
  });
  const ws = XLSX.utils.aoa_to_sheet(data);

  // 按列配置单元格宽度
  ws["!cols"] = arr.map(item => {
    return { wch: item };
  });

  Object.keys(ws).forEach(key => {
    // 非!开头的属性都是单元格
    if (!key.startsWith("!")) {
      const isFirst = (key + "").substring(1) === "1";
      ws[key].s = {
        font: {
          // name: '宋体',
          sz: isFirst ? firstRow.fontSize : otherRow.fontSize,
          bold: isFirst ? firstRow.fontBold : otherRow.fontBold,
        },
        alignment: {
          horizontal: "left",
          vertical: "center",
          // wrapText: true
        },
        fill: {
          fgColor: {
            rgb: isFirst ? firstRow.backgroundColor.replace("#", "") : otherRow.backgroundColor.replace("#", ""),
          },
        },
        border: {
          top: { style: "thin", color: { rgb: "eeeeee" } },
          bottom: { style: "thin", color: { rgb: "eeeeee" } },
          left: { style: "thin", color: { rgb: "eeeeee" } },
          right: { style: "thin", color: { rgb: "eeeeee" } },
        },
      };
    }
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  fileDownload(wbout, fileName + ".xlsx");
}
