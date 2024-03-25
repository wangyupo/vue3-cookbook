/**
 * START
 * 本文件仅提供【接口示例】（禁止在 aExample.js 中出现任何业务接口），
 * 业务接口应以对应业务名称命名，如 xx.js，然后复制 aExample.js 中
 * 的示例即可。
 */
import request from "@/utils/request";
import qs from "qs";
const baseUrl = import.meta.env.VITE_SYSTEM_BASE_URL;

// get传参，参数在url
export const getBankPersons = params => {
  return request({
    url: `${baseUrl}/bank/persons`,
    method: "get",
    params,
  });
};

// post传参，参数在body
export const getBankList = params => {
  return request({
    url: `${baseUrl}/bank/persons`,
    method: "post",
    data: params,
  });
};

// post传参，参数在body，需要序列化参数
export const getBankDetail = params => {
  return request({
    url: `${baseUrl}/bank/persons`,
    method: "post",
    data: qs.stringify(params),
  });
};

// post传参，参数在url
export const getBankBck = params => {
  return request({
    url: `${baseUrl}/bank/persons`,
    method: "post",
    params,
  });
};

// post传参，下载文件，更改 responseType 为 blob
export const exportBankExcel = params => {
  return request({
    url: `${baseUrl}/bank/persons`,
    method: "post",
    data: params,
    responseType: "blob",
  });
};

// get传参，下载文件，更改 responseType 为 blob
export const exportBankExcelByGet = params => {
  return request({
    url: `${baseUrl}/bank/persons`,
    method: "get",
    params,
    responseType: "blob",
  });
};

/**
 * END
 * 本文件仅提供【接口示例】（禁止在 aExample.js 中出现任何业务接口），
 * 业务接口应以对应业务名称命名，如 xx.js，然后复制 aExample.js 中
 * 的示例即可。
 */
