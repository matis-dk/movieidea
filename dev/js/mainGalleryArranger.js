

    // ========== TOGGLING THE ARRANGER MENU - OPEN AND CLOSE
    let mgArranger         = document.getElementById('mg-arranger-container');
    let mgToggle           = document.getElementById('mg-toggle');
    let mgRefresh          = document.getElementById('mg-refresh');

     mgToggle.addEventListener('click', toggleArranger);
     mgRefresh.addEventListener('click', compareArranger);

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
                for (let i in data) {
                    data[i] = parseFloat(data[i])
                }
                return data;
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



    // ========== UPDATING WITH ARRANGER SETTINGS ==========


    function compareArranger () {
        let settings = getArrangerSettings();

        if (compareSettings(settings, "filtering")) {
            console.log("UPDATE DOM - with new filter");

            let con = {
                task: "discover",
                loadState: "loadMore",
                settings: settings
            }

            toggleArranger();
            window.lastSettings = settings;
            loadController(con)

            return;
        }

        if (compareSettings(settings, "sorting")) {
            console.log("UPDATE DOM - with new positioning");
            toggleArranger();
            window.lastSettings = settings;
            return;
        }

        console.log("No changes found");
        toggleArranger();


        function compareSettings (settings, task) {
            return (JSON.stringify(lastSettings[task]) !== JSON.stringify(settings[task]));
        }

    }

        function setLastSettings () {
            window.lastSettings = getArrangerSettings();
        }
