"use strict";
import KWM_View from "../kwmJS/core/kwm-view.js";

export default class Dog {
    constructor(id, dog) {
        Object.assign(this, dog);
        this.id = id;
    }

    renderListMarkup(container) {
        let div = document.createElement("div");
        div.classList.add("overflow-hidden", "w-full", "md:my-4", "md:px-4", "md:w-1/3", "lg:my-4", "lg:px-4", "lg:w-1/3", "xl:my-4", "xl:px-4", "xl:w-1/3", "transform", "hover:scale-105");
        container.append(div);

        KWM_View.renderTemplate("dog.list", div, {
            id: this.id,
            name: this.name,
            image: this.picture,
        }).then(function () {
            return new Promise((resolve, reject) => {
                resolve();
            });
        });
    }

    renderSingleMarkup(container) {
        KWM_View.renderTemplate("dog.single", container, {
            id: this.id,
            name: this.name,
            image: this.picture,
            bio: this.bio,
            gender: this.gender,
            color: this.color,
            age: this.age,
            coat: this.coat,
            weight: this.weight,
            food: this.favourite_food,
            size: this.size,
            characteristic: this.characteristic,
        }).then(async function () {
            return new Promise((resolve, reject) => {
                resolve();
            });
        })
    }
}