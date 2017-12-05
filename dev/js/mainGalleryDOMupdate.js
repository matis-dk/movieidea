//

let urlImageBase        =   "http://image.tmdb.org/t/p/w154";
let mgMovieContainer    =   document.getElementById('mg-movie-container');


function addMovieElements (payload = 0) {
    let mgFragment          =   document.createDocumentFragment();

    for (let i = 0; i < payload.length; i++) {

        let mgMovieItem  = document.createElement("li");
            mgMovieItem.className = "mg-movie-item";

        let mgMovieImage = document.createElement("div");
            mgMovieImage.className = "mg-movie-image";
            mgMovieImage.setAttribute('style', `background-image: url('${urlImageBase + payload[i].poster_path}')`)

        let mgMovieTitle = document.createElement("h3");
            mgMovieTitle.className = "mg-movie-title";
            mgMovieTitle.innerText = `${payload[i].title}`

        let mgMovieYear = document.createElement("h4");
            mgMovieYear.className = "mg-movie-year";
            mgMovieYear.innerText = `${parseFloat(payload[i].release_date)}`

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

//
// function updateElementsPosition (movieElements) {
//     //console.log(movieElements);
//
//     let length =  movieElements.length;
//     for (let i = 0; i < length; i++) {
//         let DOMelements         = mgMovieContainer.children;
//         let DOMelementsIndex    = movieElements[i].DOMindex;
//
//         DOMelements[DOMelementsIndex].setAttribute("style", `order: -${length - 1 - i}`)
//     }
// }
