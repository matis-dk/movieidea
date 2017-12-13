let main            =   Array.from(document.getElementById('main').children);

let mainHome        =   document.getElementById('main-home');
let mainWall        =   document.getElementById('main-wall');
let mainActors      =   document.getElementById('main-actors');
let mainGenres      =   document.getElementById('main-genre');
let mainGallery     =   document.getElementById('main-gallery');

let overlayColor    =   document.getElementById('overlay-color');

function mainSectionController (mainSection, payload) {
        for(let i in main) {
            if (main[i].getAttribute("data-active") == "true") {
                main[i].setAttribute("data-active", "false");
            }
        }

        // Extra changes - specific for each page
        if (mainSection == mainActors) {
            controllerActors(payload);
            document.scrollingElement.scrollTop = 0;
        }

        if (mainSection == mainGallery) {
            if (!payload) {
                payload = {
                    task: "discover",
                    settings: lastSettings
                }
            }
            controllerMovies(payload, "reset-movies")
        }

        if (mainSection == mainWall) {
            controllerSearch(payload)
        }

        if (mainSection == mainHome) {
            mhsInput.focus();
            overlayColor.setAttribute('data-home-active', 'true');
            header.style = "background-color: rgba(236,236,236,0)"
        } else {
            overlayColor.setAttribute('data-home-active', 'false');
            header.style = "background-color: rgba(236,236,236,1)"
        }


        // Changing section
        mainSection.setAttribute("data-active", "true");

}
