
// ================ SEARCH MODULE ON HEADER ================

let DOMbody             =   document.getElementsByTagName('body')[0];
let headerSearchLogo    =   document.getElementById('header-search-logo');
let headerSearchInput   =   document.getElementById('header-search-input');
let headerSearch        =   document.getElementById('header-search');
let movieContainer      =   document.getElementById('mg-movie-container');
let mhsInput            =   document.getElementById("mhs-input");
let mhsSearch           =   document.getElementById('mhs-search');

let searchField = false;

headerSearchLogo.addEventListener('click', controllerSearchField);
headerSearchInput.addEventListener('keydown', keypressSearchField)

function controllerSearchField (e) {
    e.stopPropagation();
    if (searchField == false) {
        openSearchField(e);
    } else if (searchField) {
        closeSearchField(e);
    }
}

function openSearchField (e) {
    searchField = true;
    headerSearchInput.focus();
    headerSearch.setAttribute('data-active', 'true');
    movieContainer.style = 	"filter: blur(10px)";
    DOMbody.addEventListener('click', closeSearchField);
}


function closeSearchField(e) {
    if (e.target.id != "header-search-input" || e.keyCode == 27) {
        searchField = false;
        headerSearchInput.blur();
        headerSearch.setAttribute('data-active', 'false');
        headerSearchInput.value = "";
        movieContainer.style = 	"filter: blur(0px)";
        DOMbody.removeEventListener('click', closeSearchField)
    }

}

function startSearch (e) {
    if (headerSearchInput.value != "") {
        mainSectionController(mainWall, headerSearchInput.value)
    }
}


function keypressSearchField (e) {
    if (searchField) {
        if (e.keyCode == 13 ) {
            startSearch(e)
            return;
        }

        if (e.keyCode == 27 ) {
            closeSearchField(e);
        }
    }
}





// ================ SEARCH MODULE ON SECTION HOME ================


(function () {
    mhsInput.addEventListener('keyup', searchGuard);
    mhsSearch.addEventListener('click', searchGuard);

    function searchGuard (e) {
        if (e.type == "click" || e.keyCode == 13) {
            if (mhsInput.value == "") { return }

            mainSectionController(mainWall, mhsInput.value)
            mhsInput.value = "";
            return;
        }
    }

})();
