/**
 * 用户信息及记录相关
 */
import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import { tree2arr } from "@/utils/index";

import { menuKey } from "@/router/menuConfig.js";
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null, // 用户信息
    menu: [], // 菜单
    routeHistory: [], // 菜单历史记录
  }),
  getters: {
    menuArrWithoutEmptyUrl: state => {
      return tree2arr(state.menu).filter(i => i[menuKey.url] !== "");
    },
    menuArr: state => {
      return tree2arr(state.menu);
    },
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
    },
    // 删除历史路由
    delRouterHistory(routeHistoryIdx) {
      this.routeHistory.splice(routeHistoryIdx, 1);
    },
    // 批量删除历史路由
    delRouterHistoryBatch(data) {
      if (this.routeHistory.length === 1) return;
      const { currentMenuInHistoryIdx, removeMenuDirection } = data;
      switch (removeMenuDirection) {
        case "L":
          this.routeHistory.splice(0, currentMenuInHistoryIdx);
          break;
        case "R":
          this.routeHistory.splice(currentMenuInHistoryIdx + 1);
          break;
        case "O":
          const currentMenu = cloneDeep(this.routeHistory[currentMenuInHistoryIdx]);
          this.routeHistory.splice(0, this.routeHistory.length, currentMenu);
          break;
        default:
          break;
      }
    },
  },
  persist: {
    paths: ["userInfo", "menu"],
  },
});
