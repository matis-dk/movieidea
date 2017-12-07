
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
            movieAPI.setMovieIndex();

            // UPDATING MONITOR
            monitorMovieElements.total_pages = resp.total_pages;
            monitorMovieElements.fetched = true;

            // UPDATING SCOLL FUNCTIONALITY
            scrollGate = false

            return respSorted })
        .then (resp => { addMovieElements(resp)})
        .then (() => {
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

    function clearMovies            (x) { moviesOnSite = []}
    function setMovie               (x) { x.map(i => moviesOnSite.push(i)) };
    function setMovieArr            (x) { moviesOnSite = JSON.parse(JSON.stringify(x)) };             // Overwriting
    function setMovieIndex          ()  {  moviesOnSite = addMovieIndex(moviesOnSite) };
    function getMovie               (x) { return moviesOnSite[x]};
    //function getID                  (x) { return moviesOnSite[x].id};
    function getMovieArr            ()  { return JSON.parse(JSON.stringify(moviesOnSite)) };
    function getMovieById           (x) { return moviesOnSite[findMovieIndex(x, moviesOnSite)] };

    return {
            clearMovies: clearMovies,
            setMovie: setMovie,
            setMovieArr: setMovieArr,
            setMovieIndex: setMovieIndex,
            getMovie: getMovie,
            //getID: getID,
            getMovieArr: getMovieArr,
            getMovieById: getMovieById
        }
})();


// ================== HELPERS ==================

function addMovieIndex (moviesOnSite) {
    //if (moviesOnSite[0].DOMindex)
    console.log("==============")
    console.log(moviesOnSite)
    console.log("==============")
    let data = moviesOnSite;
    for (let i = 0; i < moviesOnSite.length; i++) {
        data[i].DOMindex = i;
    }
    return data;
}


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
