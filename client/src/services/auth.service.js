import store from "../store";

const isLoggedIn = () => {
  const isAuthenticated = store.state.isAuthenticated;
  const user = store.state.user;
  console.log("hello", isAuthenticated);
  return { isAuthenticated, user };
};

export default {
  isLoggedIn,
};
