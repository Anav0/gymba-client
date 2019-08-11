import axios from "axios";

export default {
    postUser: (data) => axios.post("/user", data),
    resendVerificationEmail: (id) => axios.post("/resend-verification-email", { id: id }),
}