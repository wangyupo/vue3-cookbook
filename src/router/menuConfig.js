/**
 * /router/menu.json 是一个接口返回的菜单组织示例，一般情况下，你可以要求后端按这个json格式返回。但是在一些项目中，可能会遇到字段
 * 与示例数据不一致的情况，这时候，只需要修改本文件中对应的 key 即可保证项目正常运行。比如：接口返回 PId，则对应 parentId: "pId"。
 */
export const menuKey = {
  id: "id", // id
  parentId: "parentId", // parentId
  children: "children", // children
  url: "url", // 路由跳转
  title: "title", // 菜单名称
  icon: "icon", // 菜单icon
  // 下面这俩，其实就是 menu.json 里，"menuType": 0 的 key 和 value 的拆解
  menuType: "menuType", // 菜单类型：菜单、业务页面
  menuValue: "0", // 菜单的值，0-菜单，其它-隐藏
};
