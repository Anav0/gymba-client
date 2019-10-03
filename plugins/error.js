import Vue from "vue";

Vue.config.errorHandler = function (err, vm, info) {

    if (err.response.message)
        Vue.toasted.show(err.response.message, {
            className: "error-toast",
        });

    Vue.toasted.show(err.message, {
        className: "error-toast",
    });
}

