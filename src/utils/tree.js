import { isArray, cloneDeep } from "lodash-es";

/**
 * 数组转树结构
 * @param {Array} list 数组
 * @param {String} id 自定义id字段
 * @param {String} pId 自定义parentId字段
 * @returns {Array} 树结构数据
 */
export function arr2tree(array, config = {}) {
  const clonedArray = cloneDeep(array);

  const idField = config.id || "id";
  const parentIdField = config.parentId || "parentId";
  const childrenField = config.children || "children";

  const nodeMap = {};
  const resultTree = [];

  clonedArray.forEach(item => {
    const id = item[idField];
    nodeMap[id] = item;
  });

  clonedArray.forEach(item => {
    const parentId = item[parentIdField];
    // 如果 parentId 为 "0"、0 或不存在于 nodeMap 中，则是根节点
    if (parentId === "0" || parentId === 0 || !(parentId in nodeMap)) {
      resultTree.push(item);
    } else {
      // 检查是否为当前节点创建了 children 字段，如果没有则创建
      const parent = nodeMap[parentId];
      if (!parent[childrenField]) {
        parent[childrenField] = [];
      }
      parent[childrenField].push(item);
    }
  });

  return resultTree;
}

/**
 * 树结构转数组
 * @param {Array} list 树结构数据
 * @param {String} children 指定子树为节点对象的某个属性值
 * @returns {Array} 数组
 */
export function tree2arr(treeData, config = {}) {
  // 设置默认配置
  const idProp = config.id || "id";
  const parentIdProp = config.parentId || "parentId";
  const childrenProp = config.children || "children";

  let result = [];

  // 定义递归函数进行树遍历
  function traverse(node, parentId = "0") {
    // 默认parentId设置为"0"
    if (!node) {
      return;
    }

    // 在结果数组中添加当前节点，不包含children属性，并始终添加parentId属性
    const { [childrenProp]: _, ...nodeWithoutChildren } = node;
    result.push({
      ...nodeWithoutChildren,
      [parentIdProp]: parentId, // 即使父 ID 为"0"，也包含parentId
    });

    // 如果存在children，则对每个子节点递归调用此函数
    if (node[childrenProp] && node[childrenProp].length > 0) {
      for (const child of node[childrenProp]) {
        traverse(child, node[idProp]); // 传递当前节点的id作为子节点的parentId
      }
    }
  }

  const _treeData =
    // 遍历树数组的每个元素
    treeData.forEach(rootNode => {
      traverse(rootNode);
    });

  return result;
}

/**
 * 树结构增加level层级
 * @param {Array} array 树结构
 * @param {String} levelName 层级字段
 * @param {String} childrenName 子节点字段
 * @param {Function} fn 自定义函数，默认返回单个节点的对象
 * @returns {Array} 增加level字段后的树结构
 */
export function treeAddLevel(array, levelName = "level", childrenName = "children", fn = () => {}) {
  if (!isArray(array)) {
    array = [array];
  }
  const recursive = (array, level = 0) => {
    level++;
    return array.map(v => {
      v[levelName] = level;
      fn(v);
      const child = v[childrenName];
      if (child && child.length) recursive(child, level);
      return v;
    });
  };
  return recursive(array);
}
