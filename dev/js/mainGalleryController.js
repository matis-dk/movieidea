
// The following is monitoring how many pages that are
// currently loaded and the total number of hits

let monitorMovieElements = {
    total_pages: 0,
    current_page: 0,
    fetched: false
}

function loadMovies (con) {
    if (con.loadState == "loadStart") {
        console.log("Loading start movies")
        return Promise.all([fetchTMDb(con), fetchTMDb(con), fetchTMDb(con)])
            .then(resp => {
                monitorMovieElements.total_pages = resp[0].total_pages;
                //monitorMovieElements.current_page += 3;
                monitorMovieElements.fetched = true;

                return resp;
            })
            .then(resp => mergeNestedArrays(resp))
            .then(resp => {
                movieAPI.setMovieArr(resp);
                return resp;
            });

    }

    if (con.loadState == "loadMore") {
        console.log("Loading more movies")
        return Promise.all([fetchTMDb(con)])
            .then(resp => {
                //monitorMovieElements.current_page += 1;
                movieAPI.setMovie(resp[0].results);
                return resp[0].results;
            })
    }
}

function loadController (con, direction) {

    if (monitorMovieElements.total_pages == monitorMovieElements.current_page && monitorMovieElements.fetched) {
        console.log("All movies loaded!")
        return
    }

    if (direction == "reset-movies") {
        clearMovieElements();
        resetMonitor();

        loadMovies(con)
            .then(payload => addMovieElements(payload))
            .catch(error => {
                console.log(error);
                console.log("Failed somewhere at => loadMovies")
            })
        return;
    };

    if (direction == "load-movies") {

        loadMovies(con)
            .then(payload => addMovieElements(payload))
            .then(payload => scrollGate = false)
            .catch(error => {
                console.log(error);
                console.log("Failed somewhere at => loadMovies")
            })
        return;
    }
}




// ================== MOVIE-API ==================

let movieAPI = (() => {
    let moviesOnSite = [];

    function clearMovies(x) {moviesOnSite = []}
    function setMovie   (x) {x.map(i => moviesOnSite.push(i)) };
    function setMovieArr(x) {moviesOnSite = x};             // Overwriting
    function getMovie   (x) {return moviesOnSite[x]};
    function getID      (x) {return moviesOnSite[x].id};
    function getMovieArr()  {return moviesOnSite};
    function getIndex   (x) {
        for (let i = 0; i < moviesOnSite.length; i++) {
            if(moviesOnSite[i].id == x) {
                return i;
            }
        }
        throw new Error("Couldnt find following ID and thus return index number")
    };

    return {
            clearMovies: clearMovies,
            setMovie: setMovie,
            setMovieArr: setMovieArr,
            getMovie: getMovie,
            getID: getID,
            getMovieArr: getMovieArr,
            getIndex: getIndex
        }
})();


// ================== HELPERS ==================


function mergeNestedArrays (resp) {
    let payload = [];
    for (let i in resp) {
        for (let o in resp[i].results) {
            payload.push(resp[i].results[o])
    }}
    return payload;
}
