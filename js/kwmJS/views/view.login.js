"use strict";
import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/login", async function () {
    await this.rendering();
})

view.rendering = async function () {
    console.log("%c 🏎 Login page goes vroom", "color: lightskyblue; font-size: 20px; font-family: Quicksand");
    console.time("time to fetch");
    await KWM_View.renderTemplate("login", document.getElementById("kwm-body"));
    console.timeEnd("time to fetch");
    //****** Login **********//
    if (window.localStorage.getItem("token")) {
        //bin eingeloggt
        window.location.hash = window.Core.router.homeRoute.slug;
        alert("Du bist bereits als User " + window.localStorage.getItem("user_display_name") + " eingeloggt!");
    } else {
        //bin leider nicht eingeloggt
        document.querySelector("#login-submit").addEventListener("click", function (e) {
            e.preventDefault();
            let credentials = {
                username: username.value,
                password: password.value
            };
            fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/jwt-auth/v1/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }).then(function (response) {
                if (response.status != 200) {
                    alert("Fehlgeschlagen! " + response.status);
                    console.log(response);
                    return false;
                }
                return response;
            }).then(response => response.json())
                .then(response => {
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem("user_display_name", response.user_display_name);
                    alert("Erfolgreich eingeloggt! User: " + username.value);
                    window.location.hash = window.Core.router.homeRoute.slug;
                })
        });
    }
}
