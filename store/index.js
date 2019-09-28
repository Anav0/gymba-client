import auth from "./auth";
import conversation from "./conversation"
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        conversation,
    }
})