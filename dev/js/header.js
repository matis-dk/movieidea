let headerNavigation    =   document.getElementById('header-navigation-ul');
let headerLogo          =   document.getElementById('header-logo');

headerNavigation.addEventListener('click', changeSite)
headerLogo.addEventListener('click', changeToStart)

function changeSite (e) {

    let page = e.target.getAttribute('data-section');

    if (page == "mainGallery") { mainSectionController(mainGallery) }
    if (page == "mainGenres") { mainSectionController(mainGenres) }
    if (page == "mainHome") { mainSectionController(mainHome) }
}

function changeToStart (e) {
    mainSectionController(mainHome)
}
