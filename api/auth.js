import axios from "axios";

export default {
    logout: () => axios.get('/auth/logout'),
    login: (credentials) => axios.post("/auth/login", credentials),
    resendVerificationEmail: (id) => axios.post("/auth/resend-email", { id })
}

