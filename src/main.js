import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import _axios from "axios";
_axios.defaults.withCredentials = true;

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
