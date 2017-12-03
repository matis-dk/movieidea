
// https://developers.themoviedb.org/3/search/multi-search

function fetchTMDb (con) {

    /*
    let con = {
        task: "multisearch",
        movieID: null,
        pageNr: 1,
        genreID: null,
        query: "sylvester"
    }

    fetchTMDb(con)
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

    if (con.task == "actor") {
        console.log("called")
        const genreURL = `https://api.themoviedb.org/3/person/${con.personID}?api_key=${APIkey}&language=en-US`;
        return fetch(genreURL)
            .then(handleErrors)
            .then(response => {return response.json()})
            .then(response => console.log(response))
            .catch(error   => console.log("TMDb data request failed => genre"))
    }

    if (con.task == "actorcredits") {
        console.log("called")
        const genreURL = `https://api.themoviedb.org/3/person/${con.personID}/movie_credits?api_key=${APIkey}&language=en-US`;
        return fetch(genreURL)
            .then(handleErrors)
            .then(response => {return response.json()})
            .then(response => console.log(response))
            .catch(error   => console.log("TMDb data request failed => genre"))
    }

    if (con.task == "discover") {
        console.log("called")

        const URL = assembleURL(con.settings);
        const genreURL = `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

        return fetch(genreURL)
            .then(handleErrors)
            .then(response => {return response.json()})
            .then(response => response)
            .catch(error   => console.log("TMDb data request failed => genre"))
    }
}




// ================== HELPERS ==================

function handleErrors(response) {
    if (!response.ok) {
        console.log(`${movieID}      <=========== movieID not found`)
    }
    return response;
}


function assembleURL (settings) {

}
