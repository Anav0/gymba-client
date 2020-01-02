export default {
  namespaced: true,
  state: () => ({
    settings: {}
  }),

  mutations: {
    SET_SETTINGS(state, data) {
      state.user = data;
    }
  },

  actions: {
    setSettings({ commit }, settings) {
      commit("SET_SETTINGS", settings);
    }
  },

  getters: {
    settings: state => state.settings
  }
};
