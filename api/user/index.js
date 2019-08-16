import axios from "axios";

export default {
    getAuthUser: () => axios.get("/user"),
    postUser: (data) => axios.post("/user", data),
    resendVerificationEmail: (id) => axios.post("/resend-verification-email", { id: id }),
    login: (credentials) => axios.post("/login", credentials),
}