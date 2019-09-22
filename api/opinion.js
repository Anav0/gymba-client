import axios from "axios";

export default {
    postOpinion: (opinion) => axios.post(`/opinion`, { sender: opinion.sender, content: opinion.content }),
}