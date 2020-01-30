import axios from "axios";

export default {
  changeAvatar: data =>
    axios.post("/user/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),
  getAuthUser: () => axios.get("/user"),
  deleteAccount: () => axios.delete("/user"),
  removeFriend: id => axios.post("/user/remove-friend", { id }),
  getSuggestedContacts: () => axios.get("/user/suggested-friends"),
  postUser: data =>
    axios.post("/user", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
};
