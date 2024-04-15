import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import store from "./store";
import router from "./router";
import VueCookies from "vue-cookies";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueCookies);

app.mount("#app");
