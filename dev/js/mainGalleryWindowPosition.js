window.addEventListener("scroll", calcWindowPosition);

// Enabling and disabling scroll events
let scrollGate = false;

let mainGallery     =   document.getElementById('main-gallery');
let header          =   document.getElementById('header');

let windowSize, scrollPosition;


function calcWindowPosition (e) {

    if (scrollGate) {
        return;rea
    }

    windowSize     = window.innerHeight;
    scrollPosition = window.pageYOffset;

    let headerHeight        = header.offsetHeight;
    let mainGalleryHeight   = mainGallery.offsetHeight;

    let totalHeight         = headerHeight + mainGalleryHeight;
    let heightFromBottom    = totalHeight - windowSize - scrollPosition;

    console.log(heightFromBottom)

    if (Number(heightFromBottom) < 350) {
        console.log()
        scrollGate = true;
        let con = {
            task: "discover",
            loadState: "loadMore",
            settings: lastSettings
        }

        loadController(con, "load-movies");
    }
}
