/* eslint-disable no-undef */
import moment from "moment";
let settings = {};
try {
  settings = JSON.parse(localStorage.settings);
} catch (error) {
  console.error(error);
}

moment.locale(settings.locale ? settings.locale.code : "en");

export default moment;
