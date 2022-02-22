"use strict";

import KWM_View from "../core/kwm-view.js";

export let view = new KWM_View("/cats", async function () {
    if (window.Core.utils.isEmpty(KWM_View.getGetParameters()).id) {
        window.location.hash = "/";
    } else {
        this.cat = await window.Core.model.getCat(KWM_View.getGetParameters().id);
        if (this.cat == false) {
            window.location.hash = "/";
        } else {
            await this.rendering();
        }
    }
});
view.rendering = async function () {
    await this.cat.renderSingleMarkup(document.getElementById("kwm-body"));
    /* Load and print comments */
    window.setTimeout(async function () {
        await window.Core.model.getComments(KWM_View.getGetParameters().id);
        await window.Core.model.sendComment(KWM_View.getGetParameters().id)
    }, 1000);
}