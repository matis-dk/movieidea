
// ================ SEARCH MODULE ON HEADER ================

let DOMbody             =   document.getElementsByTagName('body')[0];
let headerSearchLogo    =   document.getElementById('header-search-logo');
let headerSearchInput   =   document.getElementById('header-search-input');
let headerSearch        =   document.getElementById('header-search');
let movieContainer      =   document.getElementById('mg-movie-container');


let searchField = false;

headerSearchLogo.addEventListener('click', openSearchField);
headerSearchInput.addEventListener('keydown', keypressSearchField)


function openSearchField (e) {
    if (searchField == false) {
        e.stopPropagation();
        searchField = true;
        headerSearchInput.focus();
        headerSearch.setAttribute('data-active', 'true');
        movieContainer.style = 	"filter: blur(10px)";
        DOMbody.addEventListener('click', closeSearchField);
    } else {
        if (headerSearchInput.value != "") {
            mainSectionController(mainWall, headerSearchInput.value)
        }

        searchField = false;
        headerSearchInput.blur();
        headerSearch.setAttribute('data-active', 'false');
        headerSearchInput.value = "";
        movieContainer.style = 	"filter: blur(0px)";
        DOMbody.removeEventListener('click', closeSearchField)
    }
}

function keypressSearchField (e) {
    if (searchField) {
        if (e.keyCode == 13 || e.keyCode == 27) {
            openSearchField();
            return;
        }
    }
}

function closeSearchField(e) {
    if (e.target.id != "header-search-input") {
        openSearchField();
    }
}




// ================ SEARCH MODULE ON SECTION HOME ================


(function () {
    let mhsInput    = document.getElementById('mhs-input');
    let mhsSearch   = document.getElementById('mhs-search');

    mhsInput.addEventListener('keyup', searchGuard);
    mhsSearch.addEventListener('click', searchGuard);

    function searchGuard (e) {
        if (e.type == "click" || e.keyCode == 13) {
            mainSectionController(mainWall, mhsInput.value)
            mhsInput.value = "";
            return;
        }
    }

})();
