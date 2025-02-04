(() => {
const characterBox = document.querySelector("#character-box");
const infoTemplate = document.querySelector("#info-template");
const infoCon = document.querySelector(".info-con");
const loader = document.querySelector("#loader");
const loaderCharacters = document.querySelector("#loader-1");
const baseUrl = "https://swapi.dev/api/";

function getNames() {
    loaderCharacters.classList.remove("hidden");
    
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
        loaderCharacters.classList.add("hidden");
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
        const container = document.querySelector(".error-con");
        loaderCharacters.classList.add("hidden");

        container.appendChild(errorMsg);

    })



}
function getFilms(e) {
    const filmUrls = e.currentTarget.dataset.movie;

    // Clear previous content
    infoCon.innerHTML = "";

 
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
                    loader.classList.add("hidden");
                })
                .catch(function (err) {
                    const errorMsg = document.createElement("p");
                    errorMsg.textContent = "looks like something went wrong. Check your connection, you may be in a different galaxy"
                    const container = document.querySelector(".error-con-posters");
                    loader.classList.add("hidden");
            
                    container.appendChild(errorMsg);
                })
                
        });
    
}


getNames();
})();