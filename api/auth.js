import axios from "axios";

export default {
  logout: () => axios.get("/auth/logout"),
  login: credentials => axios.post("/auth/login", credentials),
  resendVerificationById: id => axios.post("/auth/resend-email", { id }),
  resendVerificationByEmail: email => axios.post(`/auth/resend-email/${email}`),
  verifyAccount: (id, token) => axios.get(`/auth/verify/${id}/${token}`)
};
