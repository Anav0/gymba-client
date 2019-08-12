import axios from "axios";

export default {
    postOpinion: (message) => axios.post("/opinion", { opinion: message }),
}