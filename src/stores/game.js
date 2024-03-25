import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    // 游戏属性
    game: {
      start: true, // 是否开始
      score: 0, // 当前关卡
      maxScore: 0, // 闯过的最大关卡
      finalScore: 10, // 游戏的最大关卡
    },
    // 地砖属性
    brick: {
      width: 40, // 宽度
      height: 15, // 高度
      bgColor: "#fff", // 背景颜色
      total: 21, // 数量
      speed: 10, // 数值越低越快
    },
    // 人物属性
    figure: {
      width: 16,
      height: 50,
      left: 15,
      speed: 10,
      bottom: 0,
    },
    // 敌人属性
    enemy: {
      width: 22,
      height: 30,
      right: -22,
      speed: 1,
      speedAdd: 1,
      currentLeft: 0,
    },
  }),
  getters: {
    getBrick: state => state.brick,
  },
  actions: {
    setBrickSpeed(data) {
      this.brick.speed = loadsh.cloneDeep(data);
    },
    setFigureBottom(data) {
      this.figure.bottom = loadsh.cloneDeep(data);
    },
    setGameScore(data) {
      this.game.score = data;
    },
    setGameMaxScore(data) {
      this.game.maxScore = data;
    },
    setGameStart(data) {
      this.game.start = data;
    },
    resetAllState(data) {
      Object.assign(data);
    },
  },
  persist: false, // localstorage yes or no
});
