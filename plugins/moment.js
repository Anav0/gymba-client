import moment from "moment";

moment.locale(localStorage.locale ? JSON.parse(localStorage.locale).code : 'en')