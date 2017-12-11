window.addEventListener("scroll", calcWindowPosition);

// Enabling and disabling scroll events
let scrollGate = false;

let header          =   document.getElementById('header');

let windowSize, scrollPosition, mainGalleryActive;


function calcWindowPosition (e) {

    mainGalleryActive = mainGallery.getAttribute('data-active');

    if (scrollGate || mainGalleryActive == "false") {
        return;
    }

    windowSize     = window.innerHeight;
    scrollPosition = window.pageYOffset;

    let headerHeight        = header.offsetHeight;
    let mainGalleryHeight   = mainGallery.offsetHeight;

    let totalHeight         = headerHeight + mainGalleryHeight;
    let heightFromBottom    = totalHeight - windowSize - scrollPosition;

    //console.log(heightFromBottom)

    if (Number(heightFromBottom) < 450) {
        scrollGate = true;
        let con = {
            task: "discover",
            settings: lastSettings
        }

        controllerMovies(con);
    }
}
