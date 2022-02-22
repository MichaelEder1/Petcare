import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/cats_list", async function () {
    await this.rendering();
})

view.rendering = async function () {
    await KWM_View.renderTemplate("cats", document.getElementById("kwm-body"));
    let standard = await window.Core.model.getCats(("&order=") + document.querySelector("#sort").value);
    for (let cat of standard) {
        cat.renderListMarkup(document.getElementById("cats"));
    }
    document.querySelector("#sort").addEventListener("change", async function () {
        let cats = await window.Core.model.getCats(("&order=") + document.querySelector("#sort").value);
        document.getElementById("cats").innerHTML = "";
        for (let cat of cats) {
            cat.renderListMarkup(document.getElementById("cats"));
        }
    });
    window.Core.model.renderFilterOptions(4);
    document.querySelector("#filter").addEventListener("change", async function () {
        let cats = await window.Core.model.getAllCats();
        document.getElementById("cats").innerHTML = "";
        for (let cat of cats) {
            cat.renderListMarkup(document.getElementById("cats"));
        }
    });
}
