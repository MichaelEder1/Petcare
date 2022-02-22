"use strict";
/****************************************************
 * Hash-based Router for Single-Page-Applications.
 * Handles Routes behind a '/#/' to your convenience.
 * First given Route will be handled as Home-Route.
 * *****************************************************/

export default class KWMRouter
{
    constructor(views)
    {
        if (window.Core.system.debugMode)
        {
            console.log(views);
        }
        this.routes = views;
        this.homeRoute = views[0];
        this.init();
    }

    init()
    {
        window.removeEventListener('hashchange', this.changeView);
        window.addEventListener('hashchange', this.changeView.bind(this));
        this.changeView();
    }

    changeView()
    {
        if (window.location.hash.length >= 2)
        {

            for (const view of this.routes)
            {
                if (view.isActive())
                {
                    view.init();
                    return;
                }
            }
            if (window.Core.system.debugMode)
            {
                console.warn("Did not find " + window.location.hash + ", but hey, taste some startpage!");
            }
            window.location.hash = this.homeRoute.slug;
        }
        else
        {
            window.location.hash = this.homeRoute.slug;
        }
    }
}
