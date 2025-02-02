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
    })
}


getNames();

})();
