import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import store from "./store";
import router from "./router";
import VueCookies from "vue-cookies";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
// Vue.config.productionTip = false;
app.use(store);
app.use(router);
app.use(VueCookies);

app.use(VueSweetalert2);
app.use({
  store,
  render: (h) => h(App),
});
app.mount("#app");
