// Vuex Store
import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    role: null,
  },
  mutations: {
    login(state, user) {
      state.isAuthenticated = true;
      state.user = user;
    },
    admin(state) {
      state.role = "admin";
    },
    client(state) {
      state.role = "client";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});
