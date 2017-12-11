let mwsMoviesContainer       =   document.getElementById('mws-movies-container')
let mwsPersonsContainer      =   document.getElementById('mws-persons-container')
let mwsMovies                =   document.getElementById('mws-movies')
let mwsPersons               =   document.getElementById('mws-persons')


let mwsQuery                 =    document.getElementById('mws-query');

mwsMoviesContainer.addEventListener('click', function (e) {
    controllerMovieOverlay("open", returnDataId(e));
});

mwsPersonsContainer.addEventListener('click', function (e) {
    mainSectionController(mainActors, returnDataId(e).id)
})

function returnDataId (e) {
    let mwsItem = e.target.parentNode;

    if (mwsItem.hasAttribute('data-id')) {
        return movieAPI.getMovieById(mwsItem.getAttribute('data-id'));
    }
    if (mwsItem.parentNode.hasAttribute('data-id')) {
        return movieAPI.getMovieById(mwsItem.getAttribute('data-id'));
    }

    return;
}

function controllerSearch (query) {

        let con = {
            task: "multisearch",
            query: query,
            pageNr: 1
        }

        fetchTMDb(con)
            .then(resp => {
                movieAPI.setMovieArr(resp.results);
                return resp;
            })
            .then(resp => assembelSearch(resp.results, query, resp.total_results))
}


function assembelSearch (response, query, totalNumbers) {

    mwsQuery.textContent = query;

    mwsMoviesContainer.textContent = "";
    mwsPersonsContainer.textContent = "";

    mwsMovies.classList.remove('mws-visible');
    mwsPersons.classList.remove('mws-visible');

    for (let i = 0; i < response.length; i++) {

        let m   =   response[i];

        if (m.media_type == "movie") {
            if (!m.poster_path) return;
            if (!mwsMovies.classList.contains("mws-visible")) mwsMovies.classList.add("mws-visible");

            let item =  createMwsItem(m.title, m.release_date, m.overview, "fa fa-calendar", m.poster_path)
            item.setAttribute('data-id', `${m.id}`);
            mwsMoviesContainer.appendChild(item)
        }

        if (m.media_type == "person") {
            if (!m.profile_path) return;
            if (!mwsPersons.classList.contains("mws-visible")) mwsPersons.classList.add("mws-visible");

            let item =  createMwsItem(m.name, m.popularity, "", "fa fa-fire", m.profile_path)
            item.setAttribute('data-id', `${m.id}`);
            mwsPersonsContainer.appendChild(item)
        }

    }

}


    function createMwsItem (title, release_date, overview, icon, img, id) {
        let div     =   document.createElement('div');
        div.className = "mws-item";
        div.appendChild(createPosterItem(img))
        div.appendChild(createH3Item(title))
        div.appendChild(createH5Item(release_date, icon))
        div.appendChild(createPItem(overview))
        return div;
    }

        function createPosterItem (img) {
            let posterItem  =   document.createElement('img');
            posterItem.className = "mws-poster-item";
            posterItem.setAttribute('style', `background-image: url('http://image.tmdb.org/t/p/w45${img}')`);
            return posterItem;
        }

        function createH3Item (title) {
            let h3Item  =   document.createElement('h3');
            h3Item.className = "mws-h3-item";
            h3Item.textContent = title;
            return h3Item;
        }

        function createH5Item (date, icon) {
            let span            =   document.createElement('span');
            let span2           =   document.createElement('span');
            let h5Item          =   document.createElement('h5');
            span.className      =   icon;
            span2.textContent   =   date;
            h5Item.className    =   "mws-h5-item";

            h5Item.appendChild(span)
            h5Item.appendChild(span2)
            return h5Item;
        }

        function createPItem (overview) {
            let p           =   document.createElement('p');
            p.className     =   "mws-p-item";
            p.textContent   =   overview;
            return p;
        }
