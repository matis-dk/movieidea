
// The following is monitoring how many pages that are
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

function loadController (con, direction) {
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
            // UPDATING MOVIEAPI
            movieAPI.setMovie(resp.results);

            // UPDATING MONITOR
            monitorMovieElements.total_pages = resp.total_pages;
            monitorMovieElements.fetched = true;

            // UPDATING SCOLL FUNCTIONALITY
            scrollGate = false

            return resp })
        .then (resp => { addMovieElements(resp.results); return resp })
        .then (resp => {
            // PRE-FETCHING SECOND PAGE
            if (monitorMovieElements.current_page == 1) {
                console.log("PRE-FETCHING")
                calcWindowPosition();
            }
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

    function clearMovies    (x) { moviesOnSite = []}
    function setMovie       (x) { x.map(i => moviesOnSite.push(i)) };
    function setMovieArr    (x) { moviesOnSite = x};             // Overwriting
    function setMovieIndex  () { moviesOnSite = addMovieIndex(moviesOnSite) };
    function getMovie       (x) { return moviesOnSite[x]};
    function getID          (x) { return moviesOnSite[x].id};
    function getMovieArr    ()  { return moviesOnSite};
    function getIndex       (x) { findMovieIndex(x) };

    return {
            clearMovies: clearMovies,
            setMovie: setMovie,
            setMovieArr: setMovieArr,
            setMovieIndex: setMovieIndex,
            getMovie: getMovie,
            getID: getID,
            getMovieArr: getMovieArr,
            getIndex: getIndex
        }
})();


// ================== HELPERS ==================

function addMovieIndex (moviesOnSite) {
    //if (moviesOnSite[0].DOMindex)

    for (let i = 0; i < moviesOnSite.length; i++) {
        moviesOnSite[i].DOMindex = i;
    }
    return moviesOnSite;
}


function findMovieIndex (x) {
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
