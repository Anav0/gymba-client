import axios from "axios";
import eventHandler from "../src/eventHandler";

export default {
  getSendInvitations: populate => axios.post(`/invite/sent/`, { populate }),
  getRecivedInvitations: populate =>
    axios.post(`/invite/recived/`, { populate }),
  postInvitation: targetId =>
    axios.post("/invite", { targetId }).then(response => {
      eventHandler.$emit("invitation-sent", response.data);
      return response;
    }),
  acceptInvitation: invitationId =>
    axios.post("/invite/accept", { id: invitationId }).then(response => {
      eventHandler.$emit("invitation-accepted", response.data);
      return response;
    }),
  rejectInvitation: invitationId =>
    axios.post("/invite/reject", { id: invitationId }).then(response => {
      eventHandler.$emit("invitation-rejected", response.data);
      return response;
    }),
  getInviteInvolving: userId => axios.post(`/invite/involves/`, { userId })
};
