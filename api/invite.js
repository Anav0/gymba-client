import axios from "axios";

export default {
  getSendInvitations: populate => axios.post(`/invite/sent/`, { populate }),
  getRecivedInvitations: populate =>
    axios.post(`/invite/recived/`, { populate }),
  postInvitation: targetId => axios.post("/invite", { targetId }),
  acceptInvitation: invitationId =>
    axios.post("/invite/accept", { id: invitationId }),
  rejectInvitation: invitationId =>
    axios.post("/invite/reject", { id: invitationId }),
  getInviteInvolving: userId => axios.post(`/invite/involves/`, { userId })
};
