
let mainActorsProfile   =   document.getElementById('main-actors-profile');

let madName             =   document.getElementById('mad-name')
let madBiography        =   document.getElementById('mad-biography')
let madFrom             =   document.getElementById('mad-from')
let madBirthday         =   document.getElementById('mad-birthday')
let madHomepage         =   document.getElementById('mad-homepage')

let madTimeline         =   document.getElementById('mad-timeline')

let madActorsTrademark  =   Array.from(document.getElementById('mat-container').children)
// let mad      =   document.getElementById('mad-')
// let mad      =   document.getElementById('mad-')
//



function controllerActors (payload) {

    let con = {
        task: "actor",
        personID: payload
    }

    fetchTMDb(con)
        .then(resp => {

            mainActorsProfile.setAttribute('style', `background-image:url('http://image.tmdb.org/t/p/w185${resp.profile_path}')`)

            madName.textContent         =   resp.name;
            madBiography.textContent    =   resp.biography
            madFrom.textContent         =   resp.place_of_birth;
            madBirthday.textContent     =   resp.birthday;
            madHomepage.textContent     =   resp.homepage;

            addMostPopular(resp.combined_credits.cast)

            assembelFilmography(sortMovieByYear(resp.combined_credits.cast))
        })
}



function addMostPopular (movieList) {

    movieList = sortMovieByRating(movieList);

    for (let i = 0; i < 8; i++) {
        madActorsTrademark[i].setAttribute('style', `background-image:url('http://image.tmdb.org/t/p/w185${movieList[i].poster_path}')`)
        madActorsTrademark[i].setAttribute('movie-id', `${movieList[i].id}`)

        let movieName = `${movieList[i].title} (${parseFloat(movieList[i].release_date)})`
        madActorsTrademark[i].children[0].textContent = movieName;
    }
}


function sortMovieByRating (movieList) {
    movieList.sort(function(a, b){
        if (a.media_type == "tv") { return 0 }  // Removing tv series
        return b.vote_average - a.vote_average;
    })

    return movieList;
}

function sortMovieByYear (movieList) {

    let movieSorted = [];
    movieList.map(i => {
        if (!i.release_date) { return }
        if (i.media_type == "movie") { movieSorted.push(i)};
    })

    movieSorted.sort(function(a, b){
        return parseFloat(b.release_date ) - parseFloat(a.release_date);
    })


    console.log(movieSorted);

    return movieSorted;
}


function assembelFilmography (movieList) {

   let madFragment          =   document.createDocumentFragment();

    let year = 0;
    let yearParse = 0;

    madTimeline.innerHTML = "";

    for (let i = 0; i < movieList.length; i++) {
        if (i == 0) { madFragment.appendChild(addFilmographyStart()) }

        yearParse = parseFloat(movieList[i].release_date);

        if (yearParse != year) {
            year = yearParse;
            madFragment.appendChild(addFilmographyYear(yearParse))
        }

        madFragment.appendChild(addFilmographyContent(movieList[i].title))
   }

    madTimeline.appendChild(madFragment);

}


    function addFilmographyStart () {
        let startElement = document.createElement("li");
        let startDetail  = document.createElement("i");

        startElement.className = "mad-start";
        startDetail.className = "fa fa-arrow-circle-o-up";
        startDetail.setAttribute('aria-hidden', "true");

        startElement.appendChild(startDetail);
        return startElement;
    }


    function addFilmographyYear (year) {
        let yearElement = document.createElement("li");
        yearElement.className = "mad-year";
        yearElement.textContent = year;

        return yearElement;
    }


    function addFilmographyContent (title) {
        let contentElement = document.createElement("li");
        contentElement.className = "mad-content";
        contentElement.textContent = title;

        return contentElement;
    }


    function addFilmographyEmpty () {
        let emptyElement = document.createElement("li");
        emptyElement.className = "mad-empty";
        emptyElement.className = "mad-start";

        return emptyElement;
    }


    function addFilmographyEnd () {
        let endElement = document.createElement("li");
        let endDetail  = document.createElement("i");

        endElement.className = "mad-end";
        endDetail.className = "fa fa-stop-circle";
        endDetail.setAttribute('aria-hidden', "true");

        endElement.appendChild(endDetail);

        return endElement;
    }
