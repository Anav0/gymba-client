import axios from "axios";

export default {
    getUser: (id) => axios.get(`/users/${id}`),
}