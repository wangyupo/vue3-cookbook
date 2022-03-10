import { createStore } from "vuex";
import app from "./modules/app";
import game from "./modules/game";

export default createStore({
  modules: {
    app,
    game,
  },
});
