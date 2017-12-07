let mwsMoviesContainer       =   document.getElementById('mws-movies-container')
let mwsPersonsContainer      =   document.getElementById('mws-persons-container')
let mwsTvshowsContainer      =   document.getElementById('mws-tvshows-container')

let mwsQuery                 =    document.getElementById('mws-query');

function controllerSearch (query) {

        let con = {
            task: "multisearch",
            query: query,
            pageNr: 1
        }

        fetchTMDb(con)
            .then(resp => assembelSearch(resp.results, query, resp.total_results))
}


function assembelSearch (response, query, totalNumbers) {

    mwsQuery.textContent = query;

    mwsMoviesContainer.textContent = "";
    mwsPersonsContainer.textContent = "";
    mwsTvshowsContainer.textContent = "";

    for (let i = 0; i < response.length; i++) {

        let m   =   response[i];

        if (m.media_type == "movie") {

            let item =  createMwsItem(m.title, m.release_date, m.overview, "fa fa-calendar")
            mwsMoviesContainer.appendChild(item)
        }

        if (m.media_type == "person") {
            let item =  createMwsItem(m.name, m.popularity, "", "fa fa-fire")
            mwsPersonsContainer.appendChild(item)
        }

        if (m.media_type == "tv") {
            let item =  createMwsItem(m.original_name, m.first_air_date, m.overview, "fa fa-calendar")
            mwsTvshowsContainer.appendChild(item)
        }

    }

}


    function createMwsItem (title, release_date, overview, icon) {
        let div     =   document.createElement('div');
        div.className = "mws-item";
        div.appendChild(createH3Item(title))
        div.appendChild(createH5Item(release_date, icon))
        div.appendChild(createPItem(overview))
        return div;
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
