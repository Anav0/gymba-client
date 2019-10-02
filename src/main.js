import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSmile, faPaperclip, faPaperPlane, faEnvelopeOpenText, faUserFriends, faCog, faEraser, faTint, faCheckCircle, faCheck, faHeartBroken, faLockOpen, faComment, faCommentAlt, faEnvelope, faSearch, faKeyboard, faSortAmountUpAlt, faTrash, faSignOutAlt, faAngleLeft, faTimes, faCaretDown, faAngleDown, faHeart, faCommentSlash, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import App from './App.vue';
import { router } from './router';
import { i18n } from '../plugins';
import './registerServiceWorker';
import store from '../store';
import '../assets/style/styles.scss';
import Toasted from 'vue-toasted';
import * as filters from '../filters';

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 5000
});
Vue.component('fa-icon', FontAwesomeIcon);
library.add({ faUser, faSmile, faPaperclip, faPaperPlane, faEnvelopeOpenText, faUserFriends, faCog, faEraser, faTint, faCheckCircle, faHeartBroken, faCheck, faLockOpen, faComment, faCommentAlt, faEnvelope, faKeyboard, faSearch, faSortAmountUpAlt, faTrash, faSignOutAlt, faAngleLeft, faTimes, faCaretDown, faAngleDown, faHeart, faCommentSlash, faBan });


Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
