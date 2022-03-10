import loadsh from "lodash";

const app = {
  namespaced: true,
  state: {
    userInfo: {},
  },
  getters: {
    name: (state) => state.userInfo.name,
    age: (state) => state.userInfo.age,
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = loadsh.cloneDeep(data);
    },
  },
};

export default app;
