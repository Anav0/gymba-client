import Vue from "vue"

Vue.filter('getInitials', function (fullname) {
    const split = fullname.split(" ");
    return `${split[0][0]}${split[split.length - 1][0]}`;
})

Vue.filter('getFirstname', function (fullname) {
    return fullname.split(" ")[0];
})
