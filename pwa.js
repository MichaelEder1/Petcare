"use strict";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js")
        .then(function () {
        })
}