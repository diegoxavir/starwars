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

        names.forEach((name, index) => {
            const li = document.createElement("li");
            li.classList.add("name");

            //creating a wrapper for my content so I can style each indiidual character
            const characterWrapper = document.createElement("div");
            characterWrapper.classList.add('character-wrapper');

            const a = document.createElement("a");
            a.textContent = name["name"];
            a.dataset.movie = name["films"];

             // Create image for each character
             const characterImg = document.createElement("img");
             const characterSrc = `images/person${index + 1}.png`; 
             characterImg.setAttribute("src", characterSrc);
             characterImg.setAttribute("alt", `Image of ${name.name}`);
             characterImg.classList.add("character-img", "gsap-fade");
            

             characterWrapper.appendChild(characterImg);
            characterWrapper.appendChild(a);
          
              // Append the wrapper div to the list item (li)
              li.appendChild(characterWrapper);
              ul.appendChild(li);
        })

        characterBox.appendChild(ul);
        loaderCharacters.classList.add("hidden");

        fadeAni();
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

    // Scroll functions for the arrows
document.querySelector(".arrow.left").addEventListener("click", () => {
    const box = document.getElementById("character-box");
    box.scrollBy({ left: -200, behavior: 'smooth' });
});

document.querySelector(".arrow.right").addEventListener("click", () => {
    const box = document.getElementById("character-box");
    box.scrollBy({ left: 200, behavior: 'smooth' });
});



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

                const posterSrc = `images/poster${response.episode_id}.jpg`;
                moviePoster.setAttribute("src", posterSrc);
                moviePoster.setAttribute("alt", `Poster for ${response.title}`);

                // Create a div to wrap each film's content (title, crawl, poster)
                const filmContainer = document.createElement("div");
                filmContainer.classList.add("m-col-span-6", "l-col-span-4", "col-span-full");

                // Append the cloned content into the new div (filmContainer)
                filmContainer.appendChild(clone);

                // Add the filmContainer (which holds the film's content) to the infoCon
                infoCon.appendChild(filmContainer);

                loader.classList.add("hidden");
            })
            .catch(function (err) {
                const errorMsg = document.createElement("p");
                errorMsg.textContent = "Looks like something went wrong. Check your connection, you may be in a different galaxy."
                const container = document.querySelector(".error-con-posters");
                loader.classList.add("hidden");

                container.appendChild(errorMsg);
            });
    });

}
function fadeAni() {
    gsap.registerPlugin(ScrollTrigger);

    const fadeDivs = document.querySelectorAll(".gsap-fade");

    fadeDivs.forEach(fadeDiv => {
        gsap.fromTo(
            fadeDiv,
            { autoAlpha: 0, x: -100 },
            {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
            }
        );
    });
}

getNames();
})();