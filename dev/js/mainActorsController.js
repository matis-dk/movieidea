let mainActors          =   document.getElementById('main-actors')
let matImg              =   document.getElementById('mat-img')
let matName             =   document.getElementById('mat-name')

let madBiography        =   document.getElementById('mad-biography')
let madFrom             =   document.getElementById('mad-from')
let madBirthday         =   document.getElementById('mad-birthday')

let madTimeline         =   document.getElementById('mad-timeline')

let matItem             =   document.querySelectorAll('.mat-item')
let matItemImg          =   document.querySelectorAll('.mat-item-img')
let matItemTitle        =   document.querySelectorAll('.mat-item-title')



mainActors.addEventListener('click', openMovieoverlay);


function openMovieoverlay (e) {
    console.log(e)

    // Listener for trandemarks
    if (e.target.parentNode.hasAttribute('movie-id')){
        let movieID = e.target.parentNode.getAttribute('movie-id');
        controllerMovieOverlay("open", movieAPI.getMovieById(movieID))
    }
    // Listener for filmography
    if (e.target.hasAttribute('movie-id')) {
        let movieID = e.target.getAttribute('movie-id');
        controllerMovieOverlay("open", movieAPI.getMovieById(movieID))
    }
}


function controllerActors (payload) {

    let con = {
        task: "actor",
        personID: payload
    }

    fetchTMDb(con)
        .then(resp => {

            lazyLoading(matImg)
            matImg.onload = function () { this.classList.remove('lazy') }
            matImg.setAttribute('src', `http://image.tmdb.org/t/p/w185${resp.profile_path}`)
            matName.textContent         =   resp.name;

            madBiography.textContent    =   resp.biography
            madFrom.textContent         =   resp.place_of_birth;
            madBirthday.textContent     =   resp.birthday;


            // Clearing movielist with missing information
            let movieCleared = clearMovieList(resp.movie_credits.cast);

            addMostPopular(movieCleared)
            assembelFilmography(sortMovieByYear(movieCleared))

        })
}


function addMostPopular (movieList) {

    movieList = sortMovieByRating(movieList);

    for (let i = 0; i < 8; i++) {

        lazyLoading(matItemImg[i]);

        if ((i+1) >= movieList.length) {
            matItemTitle[i].textContent = "";
            continue;
        }

        matItemImg[i].onload = function () { this.classList.remove('lazy') }
        matItemImg[i].setAttribute('src', `http://image.tmdb.org/t/p/w185${movieList[i].poster_path}`)
        matItem[i].setAttribute('movie-id', `${movieList[i].id}`)

        let movieName = `${movieList[i].title} (${parseFloat(movieList[i].release_date)})`
        matItemTitle[i].textContent = movieName;
    }




}


// ==================== SORTING ====================

function clearMovieList (movieList) {
    let movieCleared = [];

    movieList.map(i => {
        if (!i.release_date || !i.poster_path) { return }
         movieCleared.push(i);
    })

    return movieCleared;

}

function sortMovieByRating (movieList) {
    movieList.sort(function(a, b){
        return b.vote_count - a.vote_count;
    })

    return movieList;
}

function sortMovieByYear (movieList) {
    movieList.sort(function(a, b){
        return parseFloat(b.release_date ) - parseFloat(a.release_date);
    })

    movieAPI.setMovieArr(movieList);

    return movieList;
}



// ==================== FILMOGRAPHY TIMELINE ====================

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

        madFragment.appendChild(addFilmographyContent(movieList[i].title, movieList[i].id))

        if (i == movieList.length - 1) {
            madFragment.appendChild(addFilmographyEmpty());
            madFragment.appendChild(addFilmographyEnd());
        }

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


    function addFilmographyContent (title, movieid) {
        let contentElement = document.createElement("li");
        contentElement.className = "mad-content";
        contentElement.textContent = title;
        contentElement.setAttribute('movie-id', `${movieid}`)

        return contentElement;
    }


    function addFilmographyEmpty () {
        let emptyElement = document.createElement("li");
        emptyElement.className = "mad-empty";

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

// ==================== Helpers ====================

    function lazyLoading (item) {
        if (!item.classList.contains('lazy')) {
            item.classList.add('lazy');
            item.setAttribute('src', ``);
        }
    }
