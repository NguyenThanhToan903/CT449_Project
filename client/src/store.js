import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    user: null, // Không lưu thông tin người dùng trong localStorage
    userRole: localStorage.getItem("userRole") || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false, // Đổi tên biến thành isLoggedIn
  },
  mutations: {
    // Mutation để login
    login(state, user) {
      state.user = user; // Lưu thông tin người dùng vào state
      state.userRole = user.position; // Lưu userRole vào state
      state.isLoggedIn = true; // Đánh dấu là người dùng đã đăng nhập
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", user.email); // Lưu userEmail vào localStorage
      localStorage.setItem("userRole", user.position); // Lưu userRole vào localStorage
      localStorage.setItem("isLoggedIn", "true"); // Đánh dấu là người dùng đã đăng nhập
    },

    // Mutation để logout
    logout(state) {
      state.user = null;
      state.userRole = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.setItem("isLoggedIn", "false"); // Đánh dấu là người dùng đã đăng xuất
    },

    // Mutation để lưu thông tin người dùng khi đăng nhập (dành cho SET_USER)
    SET_USER(state, user) {
      state.user = user;
      state.userRole = user.position;
      state.isLoggedIn = true; // Đánh dấu đăng nhập
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", user.email); // Lưu userEmail vào localStorage
      localStorage.setItem("userRole", user.position); // Lưu userRole vào localStorage
      localStorage.setItem("isLoggedIn", "true"); // Đánh dấu đăng nhập
    },
  },

  actions: {
    login({ commit }, user) {
      commit("SET_USER", user); // Lưu thông tin người dùng khi đăng nhập
    },

    logout({ commit }) {
      commit("logout"); // Gọi mutation logout
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.user; // Trả về thông tin người dùng
    },
    currentUserEmail(state) {
      return state.user ? state.user.email : null; // Lấy email của người dùng
    },
    currentUserRole(state) {
      return state.userRole || null; // Lấy role của người dùng
    },
  },
});

export default store;
