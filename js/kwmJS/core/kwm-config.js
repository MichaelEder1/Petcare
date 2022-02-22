"use strict";

import KWM_App from "./kwm-core.js";

//Import and rename your views here:
import {view as home} from '../views/view.home.js';
import {view as login} from '../views/view.login.js';
import {view as cats} from '../views/view.cats.js';
import {view as dogs} from '../views/view.dogs.js';
import {view as register} from "../views/view.register.js";
import {view as cats_list} from "../views/view.cats_list.js";
import {view as dogs_list} from "../views/view.dogs_list.js";

let config = {
    appContainer: "kwmJS",
    debugMode: false,
    languages: ["de", "en", "es"],
    webRoot: "https://app.s1910456008.student.kwmhgb.at",
    views: [home, login, register, cats, cats_list, dogs, dogs_list]
}
new KWM_App(config); // Actually initialize the Application
