"use strict";

//import class Cat and Dog
import Cat from "../../classes/class.cat.js";
import Dog from "../../classes/class.dog.js";
import KWM_View from "./kwm-view.js";

const api_root = 'https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/';
const filter = "?per_page=6";
export default class KWM_Model {
    constructor() {
    }

    async getCats(sort) {
        let that = this;
        return new Promise(resolve => {
            fetch(api_root + "kwm_cat" + filter + sort).then(function (response) {
                that.paginateCats(response.headers.get("X-WP-totalPages"), sort);
                return response;
            }).then(response => response.json())
                .then(data => {
                    let cats = [];
                    console.group("getCats(sort)");
                    console.log("%c 🎉 Congratulations! You have found a secret output 🥳", "color: rainbow; font-size:30px; font-family: Quicksand");
                    console.table(data);
                    console.group("Cat Counter");
                    for (let cat of data) {
                        console.count("catCounter");
                        cats.push(new Cat(cat.id, cat.acf));
                    }
                    console.countReset("catCounter");
                    console.groupEnd();
                    console.groupEnd();
                    resolve(cats);
                });
        });
    }

    async getAllCats() {
        document.querySelector("#loadMore").style.visibility = "hidden";
        return new Promise(resolve => {
            fetch(api_root + "kwm_cat?per_page=100")
                .then(data => data.json())
                .then(data => {
                    let cats = [];
                    console.group("getAllCats");
                    console.log("%c 🎉 Aaaaand there is another output! Congrats! 🥳", "color: rainbow; font-size:30px; font-family: Quicksand");
                    console.group("All cats");
                    for (let cat of data) {
                        for (let category of cat.categories) {
                            if (category == document.querySelector("#filter").value) {
                                console.dir(cats);
                                cats.push(new Cat(cat.id, cat.acf));
                            }
                        }
                        console.groupEnd();
                        console.groupEnd();
                        resolve(cats);
                    }
                });

        });
    }

    async getAllDogs() {
        document.querySelector("#loadMore").style.visibility = "hidden";
        return new Promise(resolve => {
            fetch(api_root + "kwm_dog?per_page=100")
                .then(data => data.json())
                .then(data => {
                    let dogs = [];
                    for (let dog of data) {
                        for (let category of dog.categories) {
                            if (category == document.querySelector("#filter").value) {
                                dogs.push(new Dog(dog.id, dog.acf));
                            }
                        }
                        resolve(dogs);
                    }
                });

        });
    }

    async getCat(id) {

        return new Promise(resolve => {
            fetch(api_root + "kwm_cat/" + id).then(response => response.json())
                .then(cat => {
                    resolve(new Cat(cat.id, cat.acf));
                });
        })
    }

    async getDogs(sort) {
        let that = this;
        return new Promise(resolve => {
            fetch(api_root + "kwm_dog" + filter + sort).then(function (response) {
                that.paginateDogs(response.headers.get("X-WP-totalPages"), sort);
                return response;
            }).then(response => response.json())
                .then(data => {
                    let dogs = [];
                    for (let dog of data) {
                        dogs.push(new Dog(dog.id, dog.acf));
                    }
                    resolve(dogs);
                });
        });
    }

    async getDog(id) {
        return new Promise(resolve => {
            fetch(api_root + "kwm_dog/" + id).then(response => response.json())
                .then(dog => {
                    resolve(new Dog(dog.id, dog.acf));
                });
        })
    }

    async getComments(id) {
        /* Get comments */
        if (window.localStorage.getItem("token")) {
            fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/comments?post=" + id).then(response => response.json())
                .then(comments => {
                    for (let comment of comments) {
                        this.renderComment(comment);
                    }
                })
        } else {
            let container = await document.getElementById("comments");
            let p = document.createElement("p");
            p.append(document.createTextNode("Kommentare sind nur für eingeloggte Benutzer sichtbar!"));
            container.append(p);
        }
    }

    async sendComment(id) {
        new Promise((resolve, reject) => {
            document.querySelector("#sendComment").addEventListener("click", function (e) {
                e.preventDefault();
                if (window.localStorage.getItem("token") != null) {
                    /* User ist eingeloggt */
                    fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/comments?post=" + KWM_View.getGetParameters().id + "&content=" + document.querySelector("#inputComment").value, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + window.localStorage.getItem("token")
                        }
                    }).then(function (response) {
                        if (response.status != 200) {
                            document.querySelector("#sendComment").value = "";
                            document.querySelector("#inputComment").value = "";
                            document.querySelector("#comments").innerHTML = "";
                            window.Core.model.getComments(id);
                        }
                        return response;
                    });
                } else {
                    alert("Du musst eingeloggt sein, um Kommentare zu posten!");
                }
            });
        });
    }

    renderComment(comment) {
        let div = document.createElement("div");
        div.dataset.commentid = comment.id;
        div.dataset.author = comment.author_name;
        let author = document.createElement("p");
        author.classList.add("font-bold", "pt-4");
        author.append(document.createTextNode(comment.author_name));
        let date = document.createElement("p");
        let dateArray = comment.date.split(/[-T:]/);
        let date_1 = dateArray[3] + ":" + dateArray[4] + " - " + dateArray[2] + "." + dateArray[1];
        date.classList.add("italic", "pt-1", "pb-1")
        date.append(date_1);
        let span = document.createElement("span");
        span.classList.add("pl-6");
        span.innerHTML = comment.content.rendered;
        div.addEventListener("click", function () {
            fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/comments/" + this.dataset.commentid, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                }
            }).then(function (response) {
                if (response.status != 200) {
                    alert("Fehler " + response.status);
                    console.error(response);
                }
                div.style.display = "none";
            })
        })
        div.append(author);
        div.append(date);
        div.append(span);
        document.getElementById("comments").append(div);
    }

    paginateCats(totalPages, sort) {
        if (totalPages > 1) {
            let button = document.querySelector("#loadMore");
            button.style.visibility = "visible";
            button.dataset.totalPages = totalPages;
            button.dataset.nextPage = 2;
            button.addEventListener("click", function () {
                fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/kwm_cat" + filter + "&page=" + this.dataset.nextPage + sort)
                    .then(response => response.json())
                    .then(data => {
                        let cats = [];
                        for (let cat of data) {
                            cats.push(new Cat(cat.id, cat.acf));
                        }
                        for (let cat of cats) {
                            cat.renderListMarkup(document.getElementById("cats"));
                        }
                        button.dataset.nextPage++;
                        if (button.dataset.nextPage > totalPages) {
                            document.querySelector("#loadMore").style.visibility = "hidden";
                        } else {
                            document.querySelector("#loadMoreButton").append(button);
                        }
                    });
            });
        }
    }

    paginateDogs(totalPages, sort) {
        console.group("paginateDogs(totalPages, sort");
        console.log("%c 🐱‍💻 99 little bugs in the code,", "color: rainbow; font-size:15px; font-family: Quicksand");
        console.log("%c 🐱‍💻 99 little bugs,", "color: rainbow; font-size:15px; font-family: Quicksand");
        console.log("%c 🐱‍💻 Take one down, patch it around,", "color: rainbow; font-size:15px; font-family: Quicksand");
        console.log("%c 🐱‍💻 127 little bugs in the code", "color: rainbow; font-size:15px; font-family: Quicksand");
        if (totalPages > 1) {
            let button = document.querySelector("#loadMore");
            button.style.visibility = "visible";
            button.dataset.totalPages = totalPages;
            button.dataset.nextPage = 2;
            button.addEventListener("click", function () {
                fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/kwm_dog" + filter + "&page=" + this.dataset.nextPage + sort)
                    .then(response => response.json())
                    .then(data => {
                        let dogs = [];
                        console.group("dogs");
                        for (let dog of data) {
                            console.dir(dog);
                            dogs.push(new Dog(dog.id, dog.acf));
                        }
                        console.groupEnd();
                        for (let dog of dogs) {
                            dog.renderListMarkup(document.getElementById("dogs"));
                        }
                        button.dataset.nextPage++;
                        if (button.dataset.nextPage > totalPages) {
                            document.querySelector("#loadMore").style.visibility = "hidden";
                        } else {
                            document.querySelector("#loadMoreButton").append(button);
                        }
                    });
            });
            console.groupEnd();
        }
    }

    renderFilterOptions(category) {
        let options = [];
        fetch("https://api.s1910456008.student.kwmhgb.at/wp-json/wp/v2/categories?parent=" + category)
            .then(response => response.json())
            .then(data => {
                for (let option of data) {
                    options.push(option.name);
                }
                for (let option of data) {
                    let opt = document.createElement("option");
                    opt.value = option.id;
                    opt.append(document.createTextNode(option.name));
                    document.querySelector("#filter").append(opt);
                }
            })
    }
}



