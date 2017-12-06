
    // let body                = document.getElementsByTagName('body')[0];
    // let movieContainer      = document.getElementsByClassName('movie-container')[0];


    //let overlayWindowActive  = false;
    let keyboardStateActive     = false;


    // =============== MOUSE EVENT ===============

    mgMovieContainer.addEventListener('dblclick', mouseFilter);
    mgMovieContainer.addEventListener('click', mouseFilter);

    function mouseFilter (e) {
        if (e.target.parentNode.classList.contains("mg-movie-item")) {

            updateMovieSeletion(e.target.parentNode)

            if (e.type == "click") {
                console.log("click")
                return;
            }

            if (e.type == "dblclick") {
                console.log("dblclick")

                let movieID     =   e.target.parentNode.getAttribute('movie-id');
                let movieItem   =   movieAPI.getMovieById(movieID);
                controllerMovieOverlay("open", movieItem)
                return;
            }
        }
    }

    // =============== KEYBOARD EVENT ===============

    mgMovieContainer.addEventListener('keyup', function () {keyboardStateActive = false});
    mgMovieContainer.addEventListener('keydown', function (e) {
        if (keyboardStateActive) {
            e.preventDefault();
            console.log("keyboard event cancelled");
            return;
        }
        keyboardStateActive = true;

        if (   e.keyCode == "37"
            || e.keyCode == "38"
            || e.keyCode == "39"
            || e.keyCode == "40"
            || e.keyCode == "13") {
                e.preventDefault();
                calcMovieSelection(e.keyCode);
        }

        // if ( e.keyCode == "27" && olWindowActive) {
        //     oiContainer.style = "display: none";
        //     movieContainer.style = 	"filter: blur(0px)"
        //     olWindowActive = false;
        //     oiPoster.removeAttribute('style');
        //
        //     return;
        // }
    })



    // =============== MOVIE SELECTION ===============


    let movieSelection = {
        current: 291805
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

    function calcMovieSelection(key) {

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

            if (key == "38") {            // Arrow Up
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

            if (key == "40") {            // Arrow down
                if (domIndex + elemPrRow > movieAPI.getMovieArr().length - 1) { return }
                domIndex += elemPrRow;
                pageScroll("down");
                go(domIndex, key); return;
            }

            // if (key == "13" || key == "27") {
            //     selectedMovieInfo (e.target, key);
            // }


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

    let main = document.getElementById('main');
    let upActive    = true;
    let downActive  = true;


    function pageScroll (direction) {
        let elementScroll = document.scrollingElement;

        if (direction == "down" && downActive) {
            let i = 0;
            let idDown = setInterval(frameDown, 5);

            function frameDown() {
                if (i >= 35 || elementScroll.scrollTop == elementScroll.scrollHeight) {
                    clearInterval(idDown);
                    downActive = true;
                } else {
                    downActive = false;
                    i++;
                    elementScroll.scrollTop += 10;
                }
            }
        }

        if (direction == "up" && upActive) {
            let i = 0;
            let idUp = setInterval(frameUp, 5);

            function frameUp() {
                if (i >= 35 || elementScroll.scrollTop == 0) {
                    clearInterval(idUp);
                    upActive = true;
                } else {
                    upActive = false;
                    i++;
                    elementScroll.scrollTop -= 10;
                }
            }
        }
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
