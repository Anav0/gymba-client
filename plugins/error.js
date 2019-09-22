import Vue from "vue";

Vue.config.errorHandler = function (err, vm, info) {
    Vue.toasted.show(err.message, {

        className: "error-toast",
    });
}