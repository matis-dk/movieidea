    // let body                = document.getElementsByTagName('body')[0];
    // let movieContainer      = document.getElementsByClassName('movie-container')[0];


    //let overlayWindowActive  = false;
    let keyboardStateActive     = false;


    // =============== MOUSE EVENT ===============

    mgMovieContainer.addEventListener('dblclick', mouseFilter);
    mgMovieContainer.addEventListener('click', mouseFilter);

    function mouseFilter (e) {
        let movieElem;
        if (e.target.parentNode.classList.contains("mg-movie-item")) {
            movieElem = e.target.parentNode;
        } else if (e.target.parentNode.parentNode.classList.contains("mg-movie-item")) {
            movieElem = e.target.parentNode.parentNode;
        } else {
            return;
        }

        updateMovieSeletion(movieElem)

        if (e.type == "click") {
            return;
        }

        if (e.type == "dblclick") {
            let movieID     =   movieElem.getAttribute('movie-id');
            let movieItem   =   movieAPI.getMovieById(movieID);
            controllerMovieOverlay("open", movieItem)
            return;
        }

    }

    // =============== KEYBOARD EVENT ===============

    mgMovieContainer.addEventListener('keyup', function () {keyboardStateActive = false});
    mgMovieContainer.addEventListener('keydown', function (e) {

        // Disabling key down events
        if (keyboardStateActive) {
            e.preventDefault();
            console.log("keyboard event cancelled");
            return;
        }

        keyboardStateActive = true;

        // Disabling keyboard navigation when overlay is open
        let overlayActive       = overlayMovies.getAttribute("data-active");

        // Closing overlay with escape key
        if (e.keyCode == "27" && overlayActive == "true") {
            e.preventDefault();
            controllerMovieOverlay("close");
            return;
        }

        if (overlayActive == "true") {
            return;
        }

        if (   e.keyCode == "37"
            || e.keyCode == "38"
            || e.keyCode == "39"
            || e.keyCode == "40"
            || e.keyCode == "13") {
                e.preventDefault();
                calcMovieSelection(e.keyCode, e);
        }

    })



    // =============== MOVIE SELECTION ===============


    let movieSelection = {
        current: null
    }

    function updateMovieSeletion (mgMovieItem) {
        // Removing last selected movie
        let lastMovieSelected = document.querySelector(`.mg-movie-item[movie-id="${movieSelection.current}"]`);
        if (lastMovieSelected !== null) {
            lastMovieSelected.removeAttribute("movie-selected");
        }

        // Setting current selected movie
        mgMovieItem.setAttribute("movie-selected", "true");
        movieSelection.current = mgMovieItem.getAttribute('movie-id');
    }

    function calcMovieSelection(key, e) {

        let domIndex    = currentDomPosition(movieSelection.current)
        let elemPrRow   = moviesPrRow();

            if (key == "37") {            // Arrow left
                if (domIndex == 0) { return }
                if((domIndex % elemPrRow) == 0) {
                    pageScroll("up");
                }
                domIndex -= 1;
                go(domIndex, key); return;
            }

            if (key == "38" && scrollActive == false) {            // Arrow Up
                if (elemPrRow > domIndex) { return }
                domIndex -= elemPrRow;
                pageScroll("up");
                go(domIndex, key); return;
            }

            if (key == "39") {            // Arrow right
                if (domIndex == movieAPI.getMovieArr().length - 1) { return }
                domIndex += 1;
                if((domIndex % elemPrRow) == 0) {
                    pageScroll("down");
                }
                go(domIndex, key); return;
            }

            if (key == "40" && scrollActive == false) {            // Arrow down
                if (domIndex + elemPrRow > movieAPI.getMovieArr().length - 1) { return }
                domIndex += elemPrRow;
                pageScroll("down");
                go(domIndex, key); return;
            }

            if (key == "13") {
                let movieItem = movieAPI.getMovieByIndex(domIndex)
                controllerMovieOverlay("open", movieItem)
            }


            function go (domIndex, key) {
                let nodeElement = document.querySelector(`.mg-movie-item:nth-child(${(domIndex + 1)})`)
                updateMovieSeletion(nodeElement);


                let footerKey =     document.getElementById(`footer-key-${key}`)
                footerKey.setAttribute('style', `background-color: #1abc9c`);
                setTimeout(function (){footerKey.removeAttribute('style')}, 300);

                return;
            }
    }

    // =============== PAGE SCROLL ===============

    let scrollActive = false;

    let movieHeight     = 18.75 + 0.625 + 3.75;                     // Height and margin for movie item
    let movieHeightRel  = 1 / window.devicePixelRatio * 16 * movieHeight;
    let inc = 10;

    function pageScroll (direction) {
        if (scrollActive == true) { return }
        scrollActive = true;

        if (direction == "up") { inc = -Math.abs(inc) }
        else                   { inc = Math.abs(inc) }

        let x = 0; //y-axis pixel displacement
        let y = 1; //delay in milliseconds
        let i = 0;

        let interval = setInterval( start , y);

        function start () {
                i++;
                console.log(i)
                if (i >= 37) {clear() }
                window.scrollBy(0, inc);
                x = x + inc; //if you want to increase speed simply increase increment interval
        }

        function clear () {
            clearInterval(interval)
            scrollActive = false;
        }

        // (function startScroll () {
        //
        //     window.scrollBy({top: inc, behavior: "smooth"})
        //     setTimeout(function(){scrollActive = false}, 300)
        // })();

    }



    // =============== HELPERS ===============

    function moviesPrRow () {
        let mgMovieItemWidth        = document.querySelector('.mg-movie-item').offsetWidth + 20;    // width pr movie element + margin
        let mgMovieContainerWidth   = mgMovieContainer.offsetWidth;                                 // width of movie container

        let moviesPrRow = Math.floor(mgMovieContainerWidth / mgMovieItemWidth);
        return moviesPrRow;
    }

    function currentDomPosition (movieID) {
        let i = 0;
        while (mgMovieContainer.children[i]) {
            if (mgMovieContainer.children[i].getAttribute("movie-id") === movieID) {
                return i;
            }
            i++;
        }
        return;
    }
