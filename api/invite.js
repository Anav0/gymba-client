import axios from "axios";

export default {
    getSendInvitations: (populate) => axios.get(`/user/invite/${populate}`),
    getRecivedInvitations: (populate) => axios.get(`/user/recived-invite/${populate}`),
    postInvitation: (targetId) => axios.post(`/user/invite`, { targetId: targetId }),
    cancelInvitation: (invitationId) => axios.post('/user/invite/cancel', { id: invitationId }),
    acceptInvitation: (invitationId) => axios.post('/user/invite/accept', { id: invitationId }),
    rejectInvitation: (invitationId) => axios.post('/user/invite/reject', { id: invitationId }),
}