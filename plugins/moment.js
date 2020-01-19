/* eslint-disable no-undef */
import moment from "moment";
const settings = JSON.parse(localStorage.settings);

moment.locale(settings.locale ? settings.locale.code : "en");

export default moment;
