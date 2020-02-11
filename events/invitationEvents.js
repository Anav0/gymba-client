import { chat } from "./sockets";
console.log("SOCKET");
import eventHandler from "../src/eventHandler";
import store from "../store";

const activeConversation = store.getters["conversation/activeConversation"];

eventHandler.$on("invitation-sent", async invitation => {
  console.log("SENT", invitation);
  chat.emit("invitation sent", invitation);
});

eventHandler.$on("invitation-accepted", async invitation => {
  console.log("ACCEPT", invitation);
  chat.emit("invitation accepted", invitation);
});

eventHandler.$on("invitation-rejected", async invitation => {
  console.log("REJECT", invitation);
  chat.emit("invitation rejected", invitation);
});

eventHandler.$on("friend-removed", async friend => {
  chat.emit("friend removed", {
    user: friend,
    roomId: activeConversation.roomId
  });
});
