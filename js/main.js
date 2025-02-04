(() => {
const characterBox = document.querySelector("#character-box");
const infoTemplate = document.querySelector("#info-template");
const infoCon = document.querySelector(".info-con");
const loader = document.querySelector("#loader");
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

        const errorMsg = document.createElement("p");
        errorMsg.textContent = "looks like something went wrong. Check your connection, you may be in a different galaxy"
        const container = document.querySelectorAll(".error-con");

        container.appendChild(errorMsg);

    })



}
function getFilms(e) {
    const filmUrls = e.currentTarget.dataset.movie;

    // Clear previous content
    infoCon.innerHTML = "";

    if (filmUrls) {
        loader.classList.remove("hidden");
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

                    // Add the movie info to the container
                    infoCon.appendChild(clone);
                })
                .catch(function (err) {
                    infoCon.innerHTML = `<p> No info available for this character </p>`;
                    console.log(err);
                })
                .finally(() => {
                    // Hide the loader after all requests have finished
                    loader.classList.add("hidden");
                });
        });
    } else {
        infoCon.innerHTML = `<p> No films available for this character </p>`;
        loader.classList.add("hidden");
    }
}


getNames();
})();