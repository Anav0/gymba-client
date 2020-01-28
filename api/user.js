import axios from "axios";

export default {
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
