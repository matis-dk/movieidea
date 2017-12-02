
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
            console.log("request data ")
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
