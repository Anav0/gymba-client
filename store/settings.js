export default {
  namespaced: true,
  state: () => ({
    settings: {},
    locales: [
      { code: "pl", iso: "pl-PL", name: "Polski" },
      { code: "en", iso: "en-US", name: "English" }
    ]
  }),

  mutations: {
    SET_SETTINGS(state, data) {
      state.settings = data;
      localStorage.settings = JSON.stringify(data);
    },
    LOAD_SETTINGS(state) {
      if (localStorage.settings) {
        state.settings = JSON.parse(localStorage.settings);
      } else {
        const defaultSettings = {
          locale: state.locales[0],
          isEnterLeaveIndicatorVisible: true
        };
        localStorage.settings = JSON.stringify(defaultSettings);
        state.settings = defaultSettings;
      }
    }
  },

  actions: {
    saveSettings({ commit }, settings) {
      commit("SET_SETTINGS", settings);
    },
    loadSettings({ commit }) {
      commit("LOAD_SETTINGS");
    }
  },

  getters: {
    settings: state => state.settings,
    locales: state => state.locales
  }
};
