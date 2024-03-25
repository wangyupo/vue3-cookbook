## 关于如何使用路由及分配页面权限原理

#### 一、路由配置 meta 参数详解。

```
meta: {
  targetMenuPath: "/example/page",  // 二级页面，非菜单，需要配置这个，以高亮父级菜单。
  transparentBackground: true,      // 业务区域，不需要背景色时，需要配置为true，通常是首页等数据分类展示时需要。
  noBreadcrumb: true,               // 某个页面，不需要面包屑导航时，需要配置该项，且值为true。
  wrapperType: "",                  // 最小高度100%，溢出后自动撑开，适合大部分业务，默认为此，默认无需配置，wrapperType也无需出现在meta中。
  wrapperType: "fullPage",          // 高度固定100%，适合添加/编辑业务。
  wrapperType: "flowPage",          // 不设置高度，遵循默认文档流，适合展示业务。
}
```

#### 二、我如何组织路由？需要嵌套吗？后端需要给我传什么样的菜单格式？

1、组织路由见 [menu.json](https://github.com/wangyupo/v3s/blob/main/src/router/menu.json) 这个示例。这是一个简单的对象数组，它包括了`id/parentId/title/url/hidden`，只要你组织好这些，保证其对应关系（parentId 对应 id），那最终的路由就能按照你理想的方式组织并展示。`【注意：menuType:1 的页面（通常是菜单页的下级功能页，不需要展示在菜单中），需要在 router 配置时，配置它对应高亮的上级路由，如：meta: { targetMenuPath: "/example/page" }，可以看这里 [routeExample](https://github.com/wangyupo/v3s/blob/main/src/router/routeExample.js#L49)】`

2、v3s 中的路由组织很简单，router.js 的路由组织，`全部铺平即可`，实际会通过 `menu.json` 的组织为你组织成树状数据，进而展现成你理想的菜单组合方式。（注意：id 和 parentId 必须严格对应。）

3、后端可以铺平传，即传一个对象数组即可，同时也可以传一个组织好的树状数据。因为后端给你传的路由，在 v3s 中，只起到了“权限判断”的作用，实际参与前端路由形成的，仍然是 v3s 的 [index.js](https://github.com/wangyupo/v3s/blob/main/src/router/index.js) 中的路由。（如果你想要限定某个角色、用户的页面访问，那后端的菜单就必须要传哦，后端的菜单内容是唯一的判断。）

#### 三、如果我的页面有非常多，我该如何从路由的主文件 index.js 拆分出来？

如果你有这个问题，说明你是一个非常有预见性的开发者，提前预见了可能出现的 `路由过于庞大、项目难以维护` 的问题，那你就要参考 [routeExamle.js](https://github.com/wangyupo/v3s/blob/main/src/router/routeExample.js) 是如何在路由的主文件 [index.js](https://github.com/wangyupo/v3s/blob/main/src/router/index.js) 中存在的，通过一个简单的数组解构，你就完全可以清晰的拆分出每一组路由，达到方便维护路由的目的。

#### 四、我的后端告诉我，我们的服务定义 path 是路由路径，pId 表示路由的父级路由，我需要修改哪些地方？

替换 /src/router/menuConfig.js 中的 key 即可。

#### 五、我有多层路由，如何组织面包屑？二级或者更深级路由如何使左侧菜单仍然保持高亮？

你可以在 [routeExample.js](https://github.com/wangyupo/v3s/blob/main/src/router/routeExample.js) 中，找到如下代码：

```
meta: {
  targetMenuPath: "/example/page",  //这个就是需要要高亮的路由
},
```

请注意这里的 `meta`，里面的 `targetMenuPath` 就指定了当前路由对应的上级路由，v3s 会根据 router 文件中 meta 对象中的 targetMenuPath 来自动对应当前的路由层级，以及应该高亮的上级菜单。

所以，你每次需要将某个二级即更深级路由，对应的左侧菜单高亮时，将该菜单的 `targetMenuPath` 指定成需要对应的菜单路径即可。
