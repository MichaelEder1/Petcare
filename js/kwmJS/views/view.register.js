"use strict";
import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/register", async function () {
    await this.rendering();
})

view.rendering = async function () {
    await KWM_View.renderTemplate("register", document.getElementById("kwm-body"));
    document.getElementById("register-submit").addEventListener("click", function (e) {
        e.preventDefault();
        if (window.localStorage.getItem("token") != null) {
            alert("Sie sind derzeit als '" + window.localStorage.getItem("user_display_name" + "' angemeldet!"));
            window.location.hash = window.Core.router.homeRoute.slug;
        }
        let credentials = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/users/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(function (response) {
            if (response.status != 200) {
                return false;
            }
            window.location.hash = window.Core.router.routes[1].slug;
            return response;
        }).then(response => response.json())
            .then(response => {
                alert(response.message);
            })
    });
}
