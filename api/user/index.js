import axios from "axios";

export default {
    getAuthUser: () => axios.get("/user"),
    getSendInvitations: (populate) => axios.get(`/user/invite/${populate}`),
    postInvitation: (targetId) => axios.post(`/user/invite`, { targetId: targetId }),
    cancelInvitation: (invitationId) => axios.post('/user/invite/cancel', { id: invitationId }),
    getSuggestedContacts: () => axios.get('/user/suggested-friends'),
    postUser: (data) => axios.post("/user", data),
    resendVerificationEmail: (id) => axios.post("/resend-verification-email", { id: id }),
    login: (credentials) => axios.post("/login", credentials),
}