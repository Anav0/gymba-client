import Vuex from 'vuex';
import Vue from 'vue';
import auth from './auth';
import conversation from './conversation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    conversation,
  },
});
