import axios from "axios";

export default {
  getBots: () => axios.get("/bot"),
  getBotById: id => axios.get(`/bot?id=${id}`)
};
