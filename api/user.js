import axios from "axios";

export default {
    getAuthUser: () => axios.get("/user"),
    logout: () => axios.get('/logout'),
    getSuggestedContacts: () => axios.get('/user/suggested-friends'),
    postUser: (data) => axios.post("/user", data),
    resendVerificationEmail: (id) => axios.post("/resend-verification-email", { id: id }),
    login: (credentials) => axios.post("/login", credentials)
}