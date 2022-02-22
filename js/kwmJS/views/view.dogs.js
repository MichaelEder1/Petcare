"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/dogs", async function () {
    if (window.Core.utils.isEmpty(KWM_View.getGetParameters()).id) {
        window.location.hash = "/";
    } else {
        this.dog = await window.Core.model.getDog(KWM_View.getGetParameters().id);
        if (this.dog == false) {
            window.location.hash = "/";
        } else {
            await this.rendering();
        }
    }
});
view.rendering = async function () {
    await this.dog.renderSingleMarkup(document.getElementById("kwm-body"));
    /* Load and print comments */
    window.setTimeout(async function () {
        await window.Core.model.getComments(KWM_View.getGetParameters().id);
        await window.Core.model.sendComment(KWM_View.getGetParameters().id)
    }, 1000);
}