import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

axios.interceptors.response.use(
  response => response,
  error => {
    let errors = [];
    if (error.response && error.response.data.errors)
      errors = error.response.data.errors;

    for (const errmsg of errors) {
      Vue.toasted.show(errmsg, {
        className: "error-toast"
      });
    }
    if (errors.length > 0) return Promise.reject(errors);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject([error.message]);
  }
);
