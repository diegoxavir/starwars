(() => {
const characterBox = document.querySelector("#character-box");
const infoTemplate = document.querySelector("#info-template");
const info = document.querySelector("#info");
const baseUrl = "https://swapi.dev/api/";

function getNames() {
    fetch(`${baseUrl}people`)
    .then(response => response.json())
    .then(function(response) {
        console.log(response);
        const names = response.results
        const ul = document.createElement("ul");
        names.forEach(name => {
            const li = document.createElement("li");
            li.classList.add("name");
            const a = document.createElement("a");
            a.textContent = name["name"];
            a.dataset.movie = name["films"][0];
            li.appendChild(a);
            ul.appendChild(li);
        })
        characterBox.appendChild(ul);
    })

    .then(function() {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach(function(links){
            links.addEventListener("click", getMovie);
        })
    })
    .catch(function(err) {
        console.log(err);
    })



}

function getMovie(e) {
    comsole.log("movie called");
}


getNames();

})();
