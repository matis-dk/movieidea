
// The monitorMovieElements is monitoring how many pages that are
// currently loaded and the total number of hits

let monitorMovieElements = {
    total_pages: 0,
    current_page: 0,
    fetched: false
}

function loadMovies (con) {
    console.log("Loading movies")
    return Promise.resolve(fetchTMDb(con))
}

function controllerMovies (con, direction) {
    if (direction == "reset-movies") {
        console.log("Resetting movies!")
        movieAPI.clearMovies();
        clearMovieElements();
        resetMonitor();
    };

    if (monitorMovieElements.total_pages == monitorMovieElements.current_page && monitorMovieElements.fetched) {
        console.log("All movies loaded!")
        return
    }


    loadMovies(con)
        .then (resp => {

            // SORTING RESPOND
            let respSorted = sortingMovies(lastSettings.sorting.sortingby, lastSettings.sorting.sortingorder, resp.results);

            // UPDATING MOVIEAPI
            movieAPI.setMovie(respSorted);

            // UPDATING MONITOR
            monitorMovieElements.total_pages = resp.total_pages;
            monitorMovieElements.fetched = true;

            // UPDATING SCOLL FUNCTIONALITY
            scrollGate = false

            return respSorted })
        .then (resp => { addMovieElements(resp)})
        .then (resp => {
            if (monitorMovieElements.current_page == 1) {
                // PRE-FETCHING SECOND PAGE
                console.log("PRE-FETCHING")
                calcWindowPosition();

                // SELECTING FIRST MOVIE IN GALLERY
                let firstMovieItem = mgMovieContainer.children[0];
                updateMovieSeletion(firstMovieItem);
                //mgMovieContainer.focus();
                //document.scrollingElement.scrollTop = 0;
            }
            return resp;
        })
        .catch(error => {
            console.log("---------------------------------")
            console.log("Failed somewhere at => loadMovies")
            console.log(error);
            console.log(resp);
            console.log(con);
            console.log("---------------------------------")
        })

    return;

}




// ================== MOVIE-API ==================

let movieAPI = (() => {
    let moviesOnSite = [];

    function clearMovies            (x) { moviesOnSite = []}
    function setMovie               (x) { x.map(i => moviesOnSite.push(i)) };
    function setMovieArr            (x) { moviesOnSite = JSON.parse(JSON.stringify(x)) };             // Overwriting
    function getMovie               (x) { return moviesOnSite[x]};
    function getMovieArr            ()  { return JSON.parse(JSON.stringify(moviesOnSite)) };
    function getMovieById           (x) { return moviesOnSite[findMovieIndex(x, moviesOnSite)] };
    function getMovieByIndex        (x) { return JSON.parse(JSON.stringify(moviesOnSite[x])) };

    return {
            clearMovies: clearMovies,
            setMovie: setMovie,
            setMovieArr: setMovieArr,
            getMovie: getMovie,
            getMovieArr: getMovieArr,
            getMovieById: getMovieById,
            getMovieByIndex: getMovieByIndex
        }
})();


// ================== HELPERS ==================

function findMovieIndex (x, moviesOnSite) {
    for (let i = 0; i < moviesOnSite.length; i++) {
        if(moviesOnSite[i].id == x) {
            return i;
        }
    }
    throw new Error("Couldnt find following ID - returning index number instead")
}

function mergeNestedArrays (resp) {
    let payload = [];
    for (let i in resp) {
        for (let o in resp[i].results) {
            payload.push(resp[i].results[o])
    }}
    return payload;
}
