import axios from "axios";

export default {
    getConversation: (id) => axios.get(`/user/conversation/${id}`),
    getConversationByParticipantId: (partId, numberOfParticipants) => axios.get(`/user/conversation/participant/${partId}/${numberOfParticipants}`)
}