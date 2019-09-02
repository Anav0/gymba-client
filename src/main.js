import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTint, faCheckCircle, faCheck, faHeartBroken, faLockOpen, faComment, faEnvelope, faSearch, faKeyboard, faSortAmountUpAlt, faTrash, faSignOutAlt, faAngleLeft, faTimes, faCaretDown, faAngleDown, faHeart, faCommentSlash, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import App from './App.vue';
import { router } from './router';
import { i18n } from '../plugins';
import './registerServiceWorker';
import store from '../store';
import '../assets/style/styles.scss';
import api from "../api";
import * as filters from '../filters';
Vue.component('fa-icon', FontAwesomeIcon);
library.add({ faTint, faCheckCircle, faHeartBroken, faCheck, faLockOpen, faComment, faEnvelope, faKeyboard, faSearch, faSortAmountUpAlt, faTrash, faSignOutAlt, faAngleLeft, faTimes, faCaretDown, faAngleDown, faHeart, faCommentSlash, faBan });

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

const setAuthUser = async () => {
  try {
    const response = await api.user.getAuthUser();
    if (response.data) {
      await store.dispatch("auth/login", response.data);
    }
  } catch (err) {
    console.error(err);
  }
};
setAuthUser();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
