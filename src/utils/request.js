import axios from "axios";
import { ElMessage } from "element-plus";
import { debounce } from "lodash-es";
import { removeEmptyInObj } from "@/utils/index";

const debounceErr = debounce(msg => {
  ElMessage.error(msg);
}, 200);

const request = axios.create({
  timeout: 60 * 1000, // 请求超时秒数
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.params = removeEmptyInObj(config.params);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
