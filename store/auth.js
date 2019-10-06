export default {
  namespaced: true,

  state: () => ({
    loginStatus: false,
    user: {},
  }),

  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.loginStatus = status;
    },

    SET_USER(state, data) {
      state.user = data;
    },
  },

  actions: {
    login({ commit }, user) {
      commit('SET_LOGIN_STATUS', true);
      commit('SET_USER', user);
    },

    logout({ commit }) {
      commit('SET_LOGIN_STATUS', false);
      commit('SET_USER', {});
    },

  },

  getters: {
    loginStatus: (state) => state.loginStatus,
    user: (state) => state.user,
  },
};
