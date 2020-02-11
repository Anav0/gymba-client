import { chat } from "./sockets";
console.log("SOCKET");
import eventHandler from "../src/eventHandler";
import store from "../store";

const settings = store.getters["settings/settings"];
const activeConversation = store.getters["conversation/activeConversation"];

eventHandler.$on("user-logout", async user => {
  if (settings.isEnterLeaveIndicatorVisible)
    chat.emit("user left", {
      roomId: activeConversation.roomId,
      user
    });
  chat.disconnect();
});
