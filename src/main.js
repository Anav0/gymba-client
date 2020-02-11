import { router } from "./router";
import plugins from "../plugins";
import events from "../events";
import filters from "../filters";
import "./registerServiceWorker";
import Vue from "vue";
import App from "./App.vue";
import store from "../store";

Vue.config.productionTip = false;

const { i18n } = plugins;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
