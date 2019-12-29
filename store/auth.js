export default {
  namespaced: true,
  state: () => ({
    user: {}
  }),

  mutations: {
    SET_USER(state, data) {
      state.user = data;
    }
  },

  actions: {
    login({ commit }, user) {
      commit("SET_USER", user);
    },

    logout({ commit }) {
      commit("SET_USER", {});
    }
  },

  getters: {
    user: state => state.user
  }
};
