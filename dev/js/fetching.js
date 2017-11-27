
// https://developers.themoviedb.org/3/search/multi-search

function fetchTMDb (con) {

    /*
    let con = {
        task: null,
        movieID: null,
        pageNr: 1,
        genreID: null,
        query: null
    }
    */

    const APIkey        = "c6aea5536b7de40d0294eb356df3c3df";

    if (con.task == "multisearch") {
        const multisearch = `https://api.themoviedb.org/3/search/multi?api_key=${APIkey}&language=en-US&query=${con.query}&page=${con.pageNr}&include_adult=false`;
        return fetch(multisearch)
            .then(handleErrors)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error   => console.log("TMDb data request failed => popularity"))
    }

    if (con.task == "genre") {
        const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=${genreID}&primary_release_date.gte=2015-01-01&with_original_language=en&vote_count.gte=10&page=${pageNr}&include_video&popularity.desc`
        return fetch(genreURL)
            .then(handleErrors)
            .then(response => {return response.json()})
            .catch(error   => console.log("TMDb data request failed => genre"))
    }
}


/*
function loadMovies (task, genreID = false) {
    siteOpen = "Movies";
    loadingScreen();
    setTimeout(clearMovies(), 500);

    Promise.all([fetchTMDb(false, task, 1, genreID),
                 fetchTMDb(false, task, 2, genreID),
                 fetchTMDb(false, task, 3, genreID)])
        .then(resp => { return mergeNestedArrays(resp) })
        .then(payload => {
            if (task == "nowplaying") {
                payload = checkDate(payload);
            }
            return payload })
        .then(payload => {
            movieAPI.setMovieArr (payload);
            DOMcontroller (payload);
            selectedMovie = {
                movieID:        movieContainer.children[0].id,
                movieDomIndex:  movieAPI.getIndex(movieContainer.children[0].id)
            }
        })
        .catch(error => {
            console.log(error);
            console.log("Failed somewhere at => loadMovies")})
}



*/
// ================== HELPERS ==================

function handleErrors(response) {
    if (!response.ok) {
        console.log(`${movieID}      <=========== movieID not found`)
    }
    return response;
}
