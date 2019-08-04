import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '../plugins/i18n';
import './registerServiceWorker';
import '../assets/style/styles.scss';

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add({ faTint });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
