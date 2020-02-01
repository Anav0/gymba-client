import eventHandler from "../src/eventHandler";
import api from "../api";

export default {
  methods: {
    getLoggedUser() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await api.user.getAuthUser();
          if (response.data) {
            await this.$store.dispatch("auth/login", response.data);
            eventHandler.$emit("logged-user-info-changes");
          }
          resolve(response.data);
        } catch (err) {
          reject(err);
          eventHandler.$emit("logged-user-info-changes");
        }
      });
    }
  }
};
