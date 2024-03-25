import cookies from "js-cookie";
import { ElMessage } from "element-plus";

/**
 * 去掉所有的登录信息（菜单、用户信息、cookie等）
 * 登出业务需要
 */
export function removeAllLoginInfo() {
  cookies.remove("Authorization");
  removeLocalStorage("user");
}

// 删除所有cookie
export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

/**
 * 存储localStorage
 * @param {String} name 名称
 * @param {*} content 值
 */
export function setLocalStorage(name, content) {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 * @param {String} name 名称
 * @returns 值
 */
export function getLocalStorage(name) {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 * @param {String} name 名称
 */
export function removeLocalStorage(name) {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 去除对象中的空格
 * @param {Object} data 传入的对象数据
 */
export function trimData(data) {
  for (let field in data) {
    if (typeof data[field] === "string") {
      data[field] = data[field].trim();
    }
    if (typeof data[field] === "object") {
      trimData(data[field]);
    }
  }
}

/**
 * 去掉对象中的空字符串、空数组、空对象
 * @param {Object} obj 传入的对象数据 eg: {a:1,b:''}
 * @returns {Object} egBck: {a:1}
 */
export function removeEmptyInObj(obj) {
  let newObj = {};
  if (typeof obj === "string") {
    obj = JSON.parse(obj);
  }
  if (obj instanceof Array) {
    newObj = [];
  }
  if (obj instanceof Object) {
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr) && obj[attr] !== "" && obj[attr] !== null && obj[attr] !== undefined) {
        if (obj[attr] instanceof Object) {
          if (JSON.stringify(obj[attr]) === "{}" || JSON.stringify(obj[attr]) === "[]") {
            continue;
          }
          newObj[attr] = removeEmptyInObj(obj[attr]);
        } else if (
          typeof obj[attr] === "string" &&
          ((obj[attr].indexOf("{") > -1 && obj[attr].indexOf("}") > -1) ||
            (obj[attr].indexOf("[") > -1 && obj[attr].indexOf("]") > -1))
        ) {
          try {
            let attrObj = JSON.parse(obj[attr]);
            if (attrObj instanceof Object) {
              newObj[attr] = removeEmptyInObj(attrObj);
            }
          } catch (e) {
            newObj[attr] = obj[attr];
          }
        } else {
          newObj[attr] = obj[attr];
        }
      }
    }
  }
  return newObj;
}

/**
 * 根据长度截断字符，并添加换行符\n
 * @param {String} string 原始字符串
 * @param {Number} breakLength 需要截断得长度
 * @param {String} breakSymbol 自定义换行符，默认为\n
 */
export function breakStringByLength(string, breakLength, breakSymbol = "\n") {
  let strs = string.split("");
  let str = "";
  for (let i = 0, s; (s = strs[i++]); ) {
    str += s;
    if (!(i % breakLength) && i !== strs.length) str += breakSymbol;
  }
  return str;
}

/**
 * 判断元素类型
 * @param {Dom} obj 元素本身
 * @returns {String} 元素类型
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
}

/**
 * 生成uuid
 * @returns {String} uuid
 */
export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

/**
 * 手机号格式化
 * @param {String} phone
 * @returns {String} 183 1114 3263
 */
export const formatPhone = phone => {
  phone = phone.toString();
  return phone.substring(0, 3) + " " + phone.substring(3, 7) + " " + phone.substring(7, 11);
};

/**
 * 4位一空格（格式化银行卡）
 * @param {String} val
 * @returns {String} 4114 0201 5368 4210 213
 */
export const formatBank = val => {
  if (val) {
    return val
      .toString()
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ");
  }
};

/**
 * 复制文字至剪切板
 * @param {*} data 文字内容
 * @param {*} label 提示内容名称
 */
export const copy = (data, label = "") => {
  let url = data;
  let oInput = document.createElement("input");
  oInput.value = url;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象;
  document.execCommand("Copy"); // 执行浏览器复制命令
  ElMessage({
    type: "success",
    message: (label ? `“${label}” ` : "") + `复制成功`,
  });
  oInput.remove();
};

/**
 * 对象转FormData
 * @param {*} obj
 * @returns {formdata}
 */
export const toFormData = obj => {
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

/**
 * 空字段串显示--
 * @param {*} obj 字段
 * @returns {String} 字段为空返回 --，否则返回字段本身
 */
export const epyReturn = obj => {
  const emptyStr = "--";
  let result;
  if (typeOf(obj) === "array") {
    result = obj.length ? obj : emptyStr;
  } else if (typeOf(obj) === "object") {
    result = Object.keys(obj).length ? obj : emptyStr;
  } else {
    result = obj ? obj : emptyStr;
  }
  return result;
};

/**
 * 数字格式化
 * @param {*} num 金额
 * @returns {String} 千分位逗号格式 20000->20,000
 */
export const numberFormat = num => {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
};
