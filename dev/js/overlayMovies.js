
// om = Overlay Movie

let omPoster      =   document.getElementById('om-poster')
let omPosterInner =   document.getElementById('om-poster-inner')
let omTitle       =   document.getElementById('om-title')
let omYear        =   document.getElementById('om-year')
let omDuration    =   document.getElementById('om-duration')
let omRating      =   document.getElementById('om-rating')
let omVotes       =   document.getElementById('om-votes')
let omDirector    =   document.getElementById('om-director')
let omGenre       =   document.getElementById('om-genre')
let omWriter      =   document.getElementById('om-writer')
let omReleasedate =   document.getElementById('om-releasedate')
let omActors      =   document.getElementById('om-actors')
let omDescription =   document.getElementById('om-description')
let omActorsIcon  =   document.getElementById('om-actors-icon')
let omActorsIconChildren  =   Array.from(document.getElementById('om-actors-icon').children);

let overlayMovies =   document.getElementById('overlay-movies');
let overlayMovieCon = document.getElementById('overlay-movies-container');



function controllerMovieOverlay (direction, movie) {
    if (direction == "open") {

        let con = {
            task: "movie",
            movieID: movie.id
        }

        Promise.resolve(fetchTMDb(con))
            .then(resp => updateMovieOverlay(resp)) // updateMovieOverlay(resp.results)


        // Setting poster while waiting for TMDb to respond
        omPoster.setAttribute('style', `background-image: url("http://image.tmdb.org/t/p/w342${movie.poster_path}")`)
        omPosterInner.setAttribute('style', `background-image: url("http://image.tmdb.org/t/p/w342${movie.poster_path}")`)

        overlayMovies.setAttribute('data-active', 'true');

        overlayMovies.addEventListener('click', toggleOverlay);
        overlayMovieCon.addEventListener('click', toggleOverlayCon);

    }

    if (direction == "close") {
        overlayMovies.setAttribute('data-active', 'false');

        overlayMovies.removeEventListener('click', toggleOverlay);
        overlayMovieCon.removeEventListener('click', toggleOverlayCon);

    }
}

    function toggleOverlay () {controllerMovieOverlay("close")}
    function toggleOverlayCon (e) {
        e.stopPropagation()

        if (e.target.hasAttribute('data-actor-id')) {
            controllerMovieOverlay("close");
            mainSectionController(mainActors, e.target.getAttribute("data-actor-id"));
        }

        if (e.target.hasAttribute('data-genre-id')) {
            controllerMovieOverlay("close");

            // Resetting and setting genre in filter
            removeGenres();
            setGenre(e.target.getAttribute("data-genre-id"))

            window.lastSettings = getArrangerSettings();

            let con = {
                task: "discover",
                genreID: e.target.getAttribute("data-genre-id"),
                settings: lastSettings
            }

            mainSectionController(mainGallery, con);
        }
    }



function updateMovieOverlay (movie) {

    omTitle.textContent         =   `${movie.title}  ${"- " + movie.tagline}`

    omYear.textContent                  = parseFloat(movie.release_date);
    omDuration.textContent              = movie.runtime;
    omRating.textContent                = movie.vote_average;
    omVotes.textContent                 = movie.vote_count + " votes";

    omDirector.textContent              = getIdentity(movie.credits.crew, "Director")
    omWriter.textContent                = getIdentity(movie.credits.crew, "Writer", "Screenplay")

    omReleasedate.textContent           = movie.release_date;
    omDescription.textContent           = movie.overview;

    addInnerElements(movie.credits.cast, 6, "actor", omActors);
    addInnerElements(movie.genres, false, "genre", omGenre);

    addCastPictures(movie.credits.cast)
}


// ============= HELPERS ========================
function addCastPictures (actors) {
    for (let i in omActorsIconChildren) {
        omActorsIconChildren[i].setAttribute("style", `background-image: url('http://image.tmdb.org/t/p/w45${actors[i].profile_path}')`)
        omActorsIconChildren[i].setAttribute('data-actor-id', `${actors[i].id}`)
    }
}

function addInnerElements (data, iterations, category, parentElement) {
    let mgFragment          =   document.createDocumentFragment();
    if (!iterations) { iterations = data.length}


    for (let i = 0; i < iterations; i++) {
        let innerElement  = document.createElement("span");

        innerElement.className = "om-inner-element";
        innerElement.setAttribute(`data-${category}-id`, `${data[i].id}`);
        innerElement.textContent  = `${data[i].name}`;

        mgFragment.appendChild(innerElement)
    }
    parentElement.textContent = "";
    parentElement.appendChild(mgFragment);
}


function getIdentity(path, identity, identity2) {

    for (let i in path) {
        if (path[i].job == identity || path[i].job == identity2) {
            return path[i].name;
        }
    }
}
