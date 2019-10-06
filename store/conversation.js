export default {
  namespaced: true,

  state: () => ({
    activeConversation: {},
  }),

  mutations: {
    SET_ACTIVE_CONVERSATION(state, conversation) {
      state.activeConversation = conversation;
    },

  },

  actions: {
    setActiveConversation({ commit }, conversation) {
      commit('SET_ACTIVE_CONVERSATION', conversation);
    },

  },

  getters: {
    activeConversation: (state) => state.activeConversation,
  },
};
