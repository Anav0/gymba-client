import axios from "axios";

export default {
    getConversation: (id) => axios.get(`/user/conversation/${id}`),
}