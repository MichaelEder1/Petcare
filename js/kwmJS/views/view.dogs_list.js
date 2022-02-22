import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/dogs_list", async function () {
    await this.rendering();
})

view.rendering = async function () {
    await KWM_View.renderTemplate("dogs", document.getElementById("kwm-body"));
    let standard = await window.Core.model.getDogs(("&order=") + document.querySelector("#sort").value);
    for (let dog of standard) {
        dog.renderListMarkup(document.getElementById("dogs"));
    }
    document.querySelector("#sort").addEventListener("change", async function () {
        let dogs = await window.Core.model.getDogs(("&order=") + document.querySelector("#sort").value);
        document.getElementById("dogs").innerHTML = "";
        for (let dog of dogs) {
            dog.renderListMarkup(document.getElementById("dogs"));
        }
    });
    window.Core.model.renderFilterOptions(5);
    document.querySelector("#filter").addEventListener("change", async function () {
        let dogs = await window.Core.model.getAllDogs();
        document.getElementById("dogs").innerHTML = "";
        for (let dog of dogs) {
            dog.renderListMarkup(document.getElementById("dogs"));
        }
    });
}