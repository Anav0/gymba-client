import axios from "axios";

export default {
    getConversation: (id) => axios.get(`/conversation/${id}`),
    getConversationByParticipantId: (partId, numberOfParticipants) => axios.get(`/conversation/participant/${partId}/${numberOfParticipants}`)
}