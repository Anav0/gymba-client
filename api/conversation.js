import axios from "axios";

export default {
    getConversation: (id) => axios.get(`/conversation/${id}`),
    getConversationMessages: (id) => axios.get(`/conversation/${id}/messages`, { id }),
    getLastConversation: () => axios.get('/conversation/last-active'),
    getConversationByParticipantId: (partId, numberOfParticipants) => axios.get(`/conversation/participant/${partId}/${numberOfParticipants}`)
}