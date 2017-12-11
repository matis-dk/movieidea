

    // ========== TOGGLING THE ARRANGER MENU - OPEN AND CLOSE
    let mgArranger         = document.getElementById('mg-arranger-container');
    let mgToggle           = document.getElementById('mg-toggle');
    let mgRefresh          = document.getElementById('mg-refresh');

     mgToggle.addEventListener('click', toggleArranger);
     mgRefresh.addEventListener('click', compareArranger);

     let lastSettings = [];

     function toggleArranger (e) {
        if (mgArranger.getAttribute("data-open") == "false") {
            mgArranger.setAttribute("data-open", "true");
            return;
        }
        mgArranger.setAttribute("data-open", "false");
     }


    // ========== GETTING ARRANGER SETTINGS ==========
    let mgFilteringGenre    =   document.getElementsByClassName("mg-checkbox");
    let mgRadioInput        =   document.getElementsByClassName('mg-radio-input');
    let mgSortingOrder      =   document.getElementsByClassName('mg-sorting-order');


    function getArrangerSettings () {

        let arrangerData = {
            filtering: {
                genre: getArrangerCheckbox(),
                rating: sliderRating.noUiSlider.get(),
                runtime: parseData(sliderRuntime.noUiSlider.get()),
                year: parseData(sliderYear.noUiSlider.get())
            },

            sorting: {
                sortingby: getArrangerRadiobuttons(),
                sortingorder: getArrangerSortingorder()
            }
        }
        return arrangerData;
    }

            function parseData (data) {
                let container = [];
                for (let i in data) {
                    container.push(parseInt(data[i]));
                }
                return container;
            }

            function getArrangerCheckbox () {
                let genres = [];
                for (let i = 0; i < mgFilteringGenre.length; i++) {
                    if (mgFilteringGenre[i].checked == true) {
                        genres.push(mgFilteringGenre[i].value)
                    }
                }
                return genres;
            }

            function getArrangerRadiobuttons () {
                for (let i = 0; i < mgRadioInput.length; i++) {
                    if (mgRadioInput[i].checked == true) {
                        return mgRadioInput[i].value
                    }
                }
            }

            function getArrangerSortingorder () {
                if (mgSortingOrder[0].checked) {
                    return mgSortingOrder[0].value;
                }
                return mgSortingOrder[1].value;
            }



    // ========== COMPARING AND UPDATING WITH ARRANGER SETTINGS ==========


    function compareArranger () {
        let settings = getArrangerSettings();

        if (compareSettings(settings, "filtering")) {
            console.log("--------------------------------------------");
            console.log("UPDATE DOM - with new filter");

            window.lastSettings = settings;

            let con = {
                task: "discover",
                settings: lastSettings
            }

            toggleArranger();
            controllerMovies(con, "reset-movies")

            return;
        }

        if (compareSettings(settings, "sorting")) {
            console.log("UPDATE DOM - with new positioning");

            window.lastSettings = settings;
            toggleArranger();
            let sortedMovies = sortingMovies(settings.sorting.sortingby, settings.sorting.sortingorder)

            clearMovieElements();
            addMovieElements(sortedMovies);

            movieAPI.setMovieArr(sortedMovies)

            return;
        }

        console.log("No changes found");
        toggleArranger();
    }

        function compareSettings (settings, task) {
            return (JSON.stringify(lastSettings[task]) !== JSON.stringify(settings[task]));
        }



    // ========== SORTING MECHANISM ==========

    function sortingMovies (sortingBy, sortingOrder, movieElements = movieAPI.getMovieArr()) {


        if (!movieElements) { return };

        console.log("Sorting by " + sortingBy);

        // NUMBER SORTING
            if (sortingBy == "rating") {
                return updateSite("number", "vote_average", sortingOrder)
            }

            if (sortingBy == "popularity") {
                return updateSite("number", "popularity", sortingOrder)
            }

            if (sortingBy == "year") {
                return updateSite("number", "release_date", sortingOrder)
            }

        // WORD SORTING
            if (sortingBy == "title") {
                return updateSite("word", "title", sortingOrder)
            }


            function updateSite (datatype, key, sortingOrder) {
                let sortedMovieElements;

                if (datatype == "word") {
                    sortedMovieElements = movieElements.sort(sortingWords(key, sortingOrder))
                }

                if (datatype == "number") {
                    sortedMovieElements = movieElements.sort(sortingNumbers(key, sortingOrder))
                }

                return sortedMovieElements;
            }
}


    // SETTING and RESETTING GENRES
    let mgGenreContainer    =   Array.from(document.getElementById('mg-genre-container').children);

    function setGenre (genre) {
        for (let i in mgGenreContainer) {
            if(mgGenreContainer[i].getAttribute('data-genre-id') == genre) {
                mgGenreContainer[i].children[0].checked = true;;
            }
        }
    }

    function removeGenres () {
        for (let i in mgGenreContainer) {
            mgGenreContainer[i].children[0].checked = false;
        }
    }








    // =========== HELPERS ====================

        // Sort by number
        function sortingNumbers (key, sortingOrder) {
            return function sortingAlgo (a, b,) {

                if (sortingOrder == "lowest") {
                    return parseFloat(a[key]) - parseFloat(b[key]);
                }

                if (sortingOrder == "highest") {
                    return parseFloat(b[key]) - parseFloat(a[key]);
                }
            }
        }


        // Sort by word
        function sortingWords (key, sortingOrder) {
            return function sortingAlgo (a, b) {
                let nameA = a[key].toUpperCase();
                let nameB = b[key].toUpperCase();

                if (sortingOrder == "lowest") {
                    if (nameA < nameB) {
                        return -1;
                    }

                    if (nameA > nameB) {
                        return 1;
                    }
                }

                if (sortingOrder == "highest") {
                    if (nameA > nameB) {
                        return -1;
                    }

                    if (nameA < nameB) {
                        return 1;
                    }
                }

                return 0;
            }
        }
