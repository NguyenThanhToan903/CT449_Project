import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = state;
      localStorage.setItem("user", JSON.stringify(user));
    },

    REMOVE_USER(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  actions: {
    login({ commit }, user) {
      commit("SET_USER", user);
    },
    logout({ commit }) {
      commit("REMOVE_USER");
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
    currentUser(state) {
      return state.user;
    },
  },
});

export default store;
