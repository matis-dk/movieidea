let mainGenreCon    =   document.getElementById('main-genre-container');

mainGenreCon.addEventListener('click', function (e) {
    for (let i = 0; i < e.path.length; i++) {

        if (e.path[i].hasAttribute('data-id')) {
            console.log(e.path[i])
            // Resetting and setting genre in filter
            removeGenres();
            setGenre(e.path[i].getAttribute("data-id"))

            window.lastSettings = getArrangerSettings();

            let con = {
                task: "discover",
                genreID: e.path[i].getAttribute("data-id"),
                settings: lastSettings
            }

            mainSectionController(mainGallery, con);

            break;
        }
    }

    return;
})
