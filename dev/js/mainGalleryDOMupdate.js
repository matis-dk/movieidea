//

let urlImageBase        =   "http://image.tmdb.org/t/p/w154";
let mgMovieContainer    =   document.getElementById('mg-movie-container');


function addMovieElements (payload = 0) {
    let mgFragment          =   document.createDocumentFragment();

    for (let i = 0; i < payload.length; i++) {

        let mgMovieItem  = document.createElement("li");
            mgMovieItem.className = "mg-movie-item";
            mgMovieItem.setAttribute('movie-id', `${payload[i].id}`);

        let mgMovieImage = document.createElement("img");
            mgMovieImage.className = "mg-movie-image lazy";
            mgMovieImage.onload = function () { this.classList.remove('lazy') }
            mgMovieImage.setAttribute('src', `${urlImageBase + payload[i].poster_path}`);

        let mgMovieTitle = document.createElement("h3");
            mgMovieTitle.className = "mg-movie-title";
            mgMovieTitle.innerText = `${payload[i].title}`;

        let mgMovieYear = document.createElement("h4");
            mgMovieYear.className = "mg-movie-year";
            mgMovieYear.innerText = `${parseFloat(payload[i].release_date)}`;

        mgMovieItem.appendChild(mgMovieImage);
        mgMovieItem.appendChild(mgMovieTitle);
        mgMovieItem.appendChild(mgMovieYear);

        mgFragment.appendChild(mgMovieItem);
    }

    mgMovieContainer.appendChild(mgFragment);

}


function clearMovieElements () {
    mgMovieContainer.innerHTML = "";
}


function resetMonitor () {
    monitorMovieElements = {
        total_pages: 0,
        current_page: 0,
        fetched: false
    }
}
