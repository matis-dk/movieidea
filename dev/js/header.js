let headerNavigation     =   document.getElementById('header-navigation-ul');

headerNavigation.addEventListener('click', changeSite)

function changeSite (e) {

    let page = e.target.getAttribute('data-section');

    if (page == "mainGallery") { mainSectionController(mainGallery) }
    if (page == "mainGenres") { mainSectionController(mainGenres) }
    if (page == "mainHome") { mainSectionController(mainHome) }
}
