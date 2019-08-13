import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTint, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from '../plugins';
import './registerServiceWorker';
import '../assets/style/styles.scss';

Vue.component('fa-icon', FontAwesomeIcon);
library.add({ faTint, faCheckCircle });

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
