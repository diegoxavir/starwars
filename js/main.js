(() => {
const characterBox = document.querySelector("#character-box");
const infoTemplate = document.querySelector("#info-template");
const infoCon = document.querySelector(".info-con");
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
            a.dataset.movie = name["films"];
            li.appendChild(a);
            ul.appendChild(li);
        })

        characterBox.appendChild(ul);
    })

    .then(function() {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach(function(links){
            links.addEventListener("click", getFilms);
        })
    })
    .catch(function(err) {
        console.log(err);
    })



}
function getFilms(e) {
    console.log("films's called");

    const filmUrls = e.currentTarget.dataset.movie;

    infoCon.innerHTML = "";

    if (filmUrls) {
        const urls = filmUrls.split(",");
        urls.forEach(url => {
            fetch(url)
                .then(response => response.json())
                .then(function (response) {
                    const clone = infoTemplate.content.cloneNode(true);
                    const movieHeading = clone.querySelector(".movie-heading");
                    const titleCrawl = clone.querySelector(".title-crawl");
                    const moviePoster = clone.querySelector(".movie-poster");
                    movieHeading.innerHTML = response.title;
                    titleCrawl.innerHTML = response.opening_crawl; 
            
                    infoCon.appendChild(clone);
                })
                .catch(function (err) {
                    infoCon.innerHTML = `<p> No info available for this character </p>`;
                    console.log(err);
                })
        })
    } else {
        infoCon.innerHTML = `<p> No films available for this character </p>`;
    }
}

getNames();
})();