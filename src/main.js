import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTint, faCheckCircle, faSearch, faSortAmountUpAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import App from './App.vue';
import { router } from './router';
import { i18n } from '../plugins';
import './registerServiceWorker';
import store from '../store';
import '../assets/style/styles.scss';
Vue.component('fa-icon', FontAwesomeIcon);
library.add({ faTint, faCheckCircle, faSearch, faSortAmountUpAlt });
import api from "../api";
import * as filters from "../filters";

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;

const getAuth = async () => {
  try {
    const response = await api.user.getAuthUser();
    if (response.data) {
      await store.dispatch("auth/login", response.data);
      router.push('/chat');
    }
  } catch (err) {
    console.error(err);
  }
}
getAuth();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
