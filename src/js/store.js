import { createStore } from "framework7/lite";

const store = createStore({
  state: {},
  getters: {
    products({ state }) {
      return state.products;
    },
  },
  actions: {
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
  },
});
export default store;
