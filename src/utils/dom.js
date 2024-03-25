const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const trim = function (string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};
const camelCase = function (name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
};

/**
 * 元素添加监听事件
 * @param {Dom} element 元素对象
 * @param {String} event 事件名称
 * @param {Function} handler 事件函数
 * @param {Boolean} useCapture 是否捕获阶段触发
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler, useCapture = false) {
      if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * 元素删除监听事件
 * @param {Dom} element 元素对象
 * @param {String} event 事件名称
 * @param {Function} handler 事件函数
 * @param {Boolean} useCapture 是否捕获阶段触发
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler, useCapture = false) {
      if (element && event) {
        element.removeEventListener(event, handler, useCapture);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * 元素是否有指定的 class
 * @param {Dom} el 元素对象
 * @param {String} cls 查找的 class 名称
 * @returns {Boolean} 该元素是否包含该 class
 */
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/**
 * 元素添加指定的 class
 * @param {Dom} el 元素对象
 * @param {String} cls 需添加的 class 名称
 */
export function addClass(el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += " " + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/**
 * 元素删除指定的 class
 * @param {Dom} el 元素对象
 * @param {String} cls 需删除的 class 名称
 */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(" " + clsName + " ", " ");
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/**
 * 获取元素style
 * @param {Dom} element 元素对象
 * @param {String} styleName 样式名称
 * @returns 样式值，如：16px
 */
export function getStyle(element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }

  try {
    var computed = document.defaultView.getComputedStyle(element, "");
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}

/**
 * 设置元素style
 * @param {*} element 元素对象
 * @param {*} styleName 样式名称
 * @param {*} value 样式值
 */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === "object") {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    element.style[styleName] = value;
  }
}
