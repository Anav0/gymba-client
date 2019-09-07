import axios from "axios";

export default {
    getSendInvitations: (populate) => axios.get(`/invite/${populate}`),
    getRecivedInvitations: (populate) => axios.get(`/invite/recived/${populate}`),
    postInvitation: (targetId) => axios.post(`/invite`, { targetId: targetId }),
    acceptInvitation: (invitationId) => axios.post('/invite/accept', { id: invitationId }),
    rejectInvitation: (invitationId) => axios.post('/invite/reject', { id: invitationId }),
    getInviteInvolving: (userId) => axios.get(`/invite/involves/${userId}`),
}