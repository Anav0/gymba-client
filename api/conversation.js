import axios from "axios";

export default {
  getConversation: id => axios.get(`/conversation/${id}`),
  getAllConversations: populate => axios.post("/conversation/", { populate }),
  getUnreadMessages: id => axios.get(`/conversation/${id}/unread`),
  getRangeOfMessages: (id, numberOfMessages, startFrom) =>
    axios.post(`/conversation/${id}/messages`, { numberOfMessages, startFrom }),
  getLastConversation: () => axios.get("/conversation/last-active"),
  getConversationByParticipantId: (partId, numberOfParticipants) =>
    axios.get(`/conversation/participant/${partId}/${numberOfParticipants}`)
};
