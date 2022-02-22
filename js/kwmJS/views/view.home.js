"use strict";
import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/", async function () {
    console.clear();
    console.log("%c 🦄 Welcome to the mysterious world of console.log 🦄", "color: red; font-size:30px; font-family: Quicksand");
    console.log("%c ❓    Are you brave enough to find all the hidden bugs?", "color: lightskyblue; font-size:25px; font-family: Quicksand");
    console.log("%c ⚠      Always remember: it's not a bug, it's a feature! ⚠", "color: yellow; font-size: 20px; font-family: Quicksand");
    await this.rendering();
})

view.rendering = async function () {
    await KWM_View.renderTemplate("home", document.getElementById("kwm-body"));

    document.querySelector("#logout-submit").addEventListener("click", function (e) {
        e.preventDefault();
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_display_name"); //wenn ausgeloggt, bring mich zum Login Formular
        alert("Erfolgreich ausgeloggt!");
        window.location.hash = window.Core.router.routes[1].slug;
    });

    if (window.localStorage.getItem("token") == null) {
        document.querySelector("#logout-submit").style.display = "none";
    } else {
        document.querySelector("#logout-submit").style.display = "flex";
    }
}