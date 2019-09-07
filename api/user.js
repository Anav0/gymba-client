import axios from "axios";

export default {
    getAuthUser: () => axios.get("/user"),
    logout: () => axios.get('/logout'),
    deleteAccount: () => axios.delete('/user'),
    removeFriend: (id) => axios.post('/user/remove-friend', { id }),
    getSuggestedContacts: () => axios.get('/user/suggested-friends'),
    postUser: (data) => axios.post("/user", data),
    resendVerificationEmail: (id) => axios.post("/resend-verification-email", { id: id }),
    login: (credentials) => axios.post("/login", credentials)
}