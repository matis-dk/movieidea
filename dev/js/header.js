let headerContainer     =   document.getElementById('header-container')
let headerNavigation    =   document.getElementById('header-navigation-ul');
let headerLogo          =   document.getElementById('header-logo');

window.addEventListener('load', function () {
    headerNavigation.addEventListener('click', changeSite)
    headerLogo.addEventListener('click', changeToHome)
})

function changeSite (e) {

    let page = e.target.getAttribute('data-section');

    if (page == "mainGallery") { mainSectionController(mainGallery) }
    if (page == "mainGenres") { mainSectionController(mainGenres) }
    if (page == "mainHome") { mainSectionController(mainHome) }
    if (page == "mainAbout") { mainSectionController(mainAbout) }
}

function changeToHome (e) {
    mainSectionController(mainHome)
}
