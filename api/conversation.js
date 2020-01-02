import axios from "axios";

export default {
  getConversation: id => axios.get(`/conversation/${id}`),
  getAllConversations: populate => axios.post(`/conversation/`, { populate }),
  getUnreadMessages: id => axios.get(`/conversation/${id}/unread`),
  getConversationMessages: (id, startDate, endDate) =>
    axios.get(`/conversation/${id}/messages`, { startDate, endDate }),
  getLastConversation: () => axios.get("/conversation/last-active"),
  getConversationByParticipantId: (partId, numberOfParticipants) =>
    axios.get(`/conversation/participant/${partId}/${numberOfParticipants}`)
};
