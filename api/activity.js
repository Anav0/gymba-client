import axios from "axios";

export default {
  getActiveUsersIds: () => axios.get("/activity/users/active"),
  getActivityByUserId: userId => axios.get(`/activity/${userId}`)
};
