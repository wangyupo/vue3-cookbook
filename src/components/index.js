// 需全局注册的组件放在这里
import RhNoData from "./RhNoData.vue";
import RhTitle from "./RhTitle.vue";
import RhWrapper from "./RhWrapper.vue";
import RhTable from "./RhTable.vue";
import RhTableColumnDIY from "./RhTableColumnDIY.vue";
import RhSearch from "./RhSearch.vue";
import RhCountUp from "./RhCountUp.vue";
import RhTree from "./RhTree.vue";
import RhReferenceLink from "./RhReferenceLink.vue";

const plugins = {
  //注册
  install(app) {
    app.component("RhNoData", RhNoData); //第一个参数：组件名称，第二个参数：要注册的组件
    app.component("RhTitle", RhTitle);
    app.component("RhWrapper", RhWrapper);
    app.component("RhTable", RhTable);
    app.component("RhTableColumnDIY", RhTableColumnDIY);
    app.component("RhSearch", RhSearch);
    app.component("RhCountUp", RhCountUp);
    app.component("RhTree", RhTree);
    app.component("RhReferenceLink", RhReferenceLink);
  },
};

export default plugins;
