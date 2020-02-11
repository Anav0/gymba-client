import api from "../api";
import eventHandler from "../src/eventHandler";
import store from "../store";

export const getLoggedUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("getLoggedUser");
      const response = await api.user.getAuthUser();
      const { data: user } = response;
      if (user._id) {
        await store.dispatch("auth/login", response.data);
        eventHandler.$emit("logged-user-info-changes", response.data);
      }
      return resolve(user);
    } catch (err) {
      reject(err);
    }
  });
