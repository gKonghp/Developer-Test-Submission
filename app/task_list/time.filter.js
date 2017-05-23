var app = angular.module("myApp");
app.filter("time", function () {
    return function (e) {
        return Math.floor(e/60) + " min " + e + " sec ";
    }
});