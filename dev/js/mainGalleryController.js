

function loadMovies (con) {

    if (con.loadState == "loadDefault") {
        console.log("Loading default movies")
        return Promise.all([fetchTMDb(con), fetchTMDb(con), fetchTMDb(con)])
            .then(resp => mergeNestedArrays(resp) );

    } else if (con.loadState == "loadMore") {
        console.log("Loading more movies")
        return fetchTMDb(con);
    }
}

function loadController (con) {

    loadMovies(con)
        .then(payload => {
            movieAPI.setMovieArr(payload);
            return payload })
        .then(payload => addMovieElements(payload))
        .catch(error => {
            console.log(error);
            console.log("Failed somewhere at => loadMovies")
        })
}






// ================== MOVIE-API ==================

let movieAPI = (() => {
    let moviesOnSite = [];

    function clearMovies(x) {moviesOnSite = []}
    function setMovie   (x) {moviesOnSite.push(x)};
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
