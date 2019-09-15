import axios from "axios";

export default {
    getConversation: (id) => axios.get(`/conversation/${id}`),
    getLastConversation: () => axios.get('/conversation/last-active'),
    getConversationByParticipantId: (partId, numberOfParticipants) => axios.get(`/conversation/participant/${partId}/${numberOfParticipants}`)
}