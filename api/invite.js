import axios from "axios";

export default {
    getSendInvitations: (populate) => axios.get(`/invite/${populate}`),
    getRecivedInvitations: (populate) => axios.get(`/invite/recived/${populate}`),
    postInvitation: (targetId) => axios.post(`/invite`, { targetId: targetId }),
    cancelInvitation: (invitationId) => axios.post('/invite/cancel', { id: invitationId }),
    acceptInvitation: (invitationId) => axios.post('/invite/accept', { id: invitationId }),
    rejectInvitation: (invitationId) => axios.post('/invite/reject', { id: invitationId }),
}