// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { useUserStore } from "@/stores/user.js";
import { useDark } from "@vueuse/core";
import { debounce } from "lodash-es";
import { computed } from "vue";
import { TinyColor } from "@ctrl/tinycolor";
import { addClass, removeClass, arr2tree } from "@/utils/index.js";
import { menuKey } from "@/router/menuConfig.js";

export function useLayout() {
  const contentAreaLoadingText = "加载中...";
  const contentAreaLoadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="var(--el-color-primary)" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>`;

  const userStore = useUserStore();
  const getMenu = () => {
    return arr2tree(
      userStore.menuArr.filter(i => i[menuKey.menuType] == menuKey.menuValue),
      { id: menuKey.id, parentId: menuKey.parentId, children: menuKey.children }
    );
  };
  const getAllMenu = () => {
    return arr2tree(userStore.menuArr, { id: menuKey.id, parentId: menuKey.parentId, children: menuKey.children });
  };

  const layoutStore = useLayoutStore();
  const {
    headerMenuActiveIdx,
    colorPrimaryBg,
    colorPrimaryLight2,
    colorPrimaryLight9,
    colorPrimaryLight7,
    colorPrimaryLight4,
    colorPrimaryLight5,
    colorPrimaryDark2,
    layoutType,
    menuFold,
    isGray,
    isZh,
    isTransparent,
    isNoBreadcrumb,
    isNavigating,
    wrapperType,
    menuFilterDialogVisible,
  } = storeToRefs(layoutStore);

  const isDark = useDark({ disableTransition: false }); // 是否暗黑模式

  // Header 工具区条目 hover 背景色
  const headerToolHoverClasses = computed(() => {
    // 定义一个根据layoutType来返回hover颜色的计算属性
    const hoverClasses = {
      LayoutHeadMenu: "hover:bg-[#405270]",
      LayoutMix: "hover:bg-[#405270]",
      // 可以添加其他情况的映射
      default: "hover:bg-[var(--el-fill-color)]", // 默认值
    };

    // 返回相应的hover类，如果layoutType不存在则使用默认值
    return hoverClasses[layoutType.value] ?? hoverClasses["default"];
  });

  // 设置全站置灰
  const toggleGray = () => {
    const el = document.documentElement;
    if (isGray.value) {
      addClass(el, "gray");
    } else {
      removeClass(el, "gray");
    }
  };

  // 侧边栏折叠/展开
  const toggleMenuFold = debounce(() => {
    layoutStore.$patch(state => {
      state.menuFold = !menuFold.value;
    });
  }, 150);

  // 流体布局（适用于大篇幅页面，如：分析页） flowPage
  // 固定全屏布局，超出部分溢出（适用于简单的IO业务页面，如：添加、编辑） fullPage
  // 延展全屏布局，超出部分包裹随之拉伸（适用于大多数页面，如：列表页）
  const wrapStyle = computed(() => {
    if (wrapperType.value == "flowPage") {
      return "height: auto";
    } else if (wrapperType.value == "fullPage") {
      return "height: 100%";
    } else {
      return "min-height: 100%";
    }
  });

  // 修改主题色后，计算并设置 css 变量
  const calcThemeColor = themeColor => {
    // 计算暗色模式下主题色的配套色值
    function darken(colorInst, amount = 20) {
      return colorInst.mix("#141414", amount).toHexString();
    }

    const colorInst = new TinyColor(themeColor);

    let colorPrimaryDark2 = "";
    let colorPrimaryLight2 = "";
    let colorPrimaryLight4 = "";
    let colorPrimaryLight5 = "";
    let colorPrimaryLight7 = "";
    let colorPrimaryLight9 = "";

    if (!isDark.value) {
      colorPrimaryLight2 = colorInst.tint(20).toHexString();
      colorPrimaryLight4 = colorInst.tint(40).toHexString();
      colorPrimaryLight5 = colorInst.tint(50).toHexString();
      colorPrimaryLight7 = colorInst.tint(70).toHexString();
      colorPrimaryLight9 = colorInst.tint(90).toHexString();
    } else {
      colorPrimaryLight2 = darken(colorInst, 20);
      colorPrimaryLight4 = darken(colorInst, 40);
      colorPrimaryLight5 = darken(colorInst, 50);
      colorPrimaryLight7 = darken(colorInst, 70);
      colorPrimaryLight9 = darken(colorInst, 90);
    }
    colorPrimaryDark2 = darken(colorInst, 20);

    layoutStore.$patch(state => {
      state.colorPrimaryBg = themeColor;
      state.colorPrimaryLight2 = colorPrimaryLight2;
      state.colorPrimaryLight9 = colorPrimaryLight9;
      state.colorPrimaryLight7 = colorPrimaryLight7;
      state.colorPrimaryLight5 = colorPrimaryLight5;
      state.colorPrimaryLight4 = colorPrimaryLight4;
      state.colorPrimaryDark2 = colorPrimaryDark2;
    });
  };

  // 设置主题色 css 变量
  const setElementUIThemeColor = () => {
    const el = document.documentElement;

    el.style.setProperty("--el-color-primary", colorPrimaryBg.value); // el-button primary 背景色
    el.style.setProperty("--el-color-primary-dark-2", colorPrimaryDark2.value); // el-button primary acitve 背景色
    el.style.setProperty("--el-color-primary-light-3", colorPrimaryLight2.value); // el-button primary hover 背景色
    el.style.setProperty("--el-color-primary-light-4", colorPrimaryLight4.value); // el-button link primary hover色
    el.style.setProperty("--el-color-primary-light-5", colorPrimaryLight5.value); // el-button primary disabled 背景色
    el.style.setProperty("--el-color-primary-light-7", colorPrimaryLight7.value); // el-button default border 激活色
    el.style.setProperty("--el-color-primary-light-9", colorPrimaryLight9.value); // el-button default hover 背景色
  };

  return {
    headerMenuActiveIdx,
    colorPrimaryBg,
    colorPrimaryLight2,
    colorPrimaryLight9,
    colorPrimaryLight7,
    colorPrimaryLight4,
    colorPrimaryLight5,
    colorPrimaryDark2,
    layoutStore,
    isDark,
    toggleGray,
    toggleMenuFold,
    layoutType,
    menuFold,
    menuKey,
    isGray,
    isZh,
    isTransparent,
    isNoBreadcrumb,
    isNavigating,
    wrapStyle,
    menuFilterDialogVisible,
    contentAreaLoadingText,
    contentAreaLoadingSvg,
    calcThemeColor,
    setElementUIThemeColor,
    getMenu,
    getAllMenu,
    headerToolHoverClasses,
  };
}
