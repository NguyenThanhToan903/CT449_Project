import store from "../store";

const isLoggedIn = () => {
  const isAuthenticated = store.state.isAuthenticated;
  return isAuthenticated;
};

export default {
  isLoggedIn,
};
