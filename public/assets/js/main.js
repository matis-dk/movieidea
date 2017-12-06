"use strict";function toggleArranger(e){"false"!=mgArranger.getAttribute("data-open")?mgArranger.setAttribute("data-open","false"):mgArranger.setAttribute("data-open","true")}function getArrangerSettings(){return{filtering:{genre:getArrangerCheckbox(),rating:sliderRating.noUiSlider.get(),runtime:parseData(sliderRuntime.noUiSlider.get()),year:parseData(sliderYear.noUiSlider.get())},sorting:{sortingby:getArrangerRadiobuttons(),sortingorder:getArrangerSortingorder()}}}function parseData(e){var t=[];for(var o in e)t.push(parseInt(e[o]));return t}function getArrangerCheckbox(){for(var e=[],t=0;t<mgFilteringGenre.length;t++)1==mgFilteringGenre[t].checked&&e.push(mgFilteringGenre[t].value);return e}function getArrangerRadiobuttons(){for(var e=0;e<mgRadioInput.length;e++)if(1==mgRadioInput[e].checked)return mgRadioInput[e].value}function getArrangerSortingorder(){return mgSortingOrder[0].checked?mgSortingOrder[0].value:mgSortingOrder[1].value}function compareArranger(){var e=getArrangerSettings();if(compareSettings(e,"filtering")){console.log("--------------------------------------------"),console.log("UPDATE DOM - with new filter"),window.lastSettings=e;var t={task:"discover",settings:lastSettings};return toggleArranger(),void loadController(t,"reset-movies")}if(compareSettings(e,"sorting")){console.log("UPDATE DOM - with new positioning"),window.lastSettings=e,toggleArranger();var o=sortingMovies(e.sorting.sortingby,e.sorting.sortingorder);return clearMovieElements(),addMovieElements(o),void movieAPI.setMovieArr(o)}console.log("No changes found"),toggleArranger()}function compareSettings(e,t){return JSON.stringify(lastSettings[t])!==JSON.stringify(e[t])}function sortingMovies(e,t){function o(e,t,o){var r=void 0;return"word"==e&&(r=n.sort(sortingWords(t,o))),"number"==e&&(r=n.sort(sortingNumbers(t,o))),r}var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:movieAPI.getMovieArr();if(n)return console.log("Sorting by "+e),"rating"==e?o("number","vote_average",t):"popularity"==e?o("number","popularity",t):"year"==e?o("number","release_date",t):"title"==e?o("word","title",t):void 0}function sortingNumbers(e,t){return function(o,n){return"lowest"==t?parseFloat(o[e])-parseFloat(n[e]):"highest"==t?parseFloat(n[e])-parseFloat(o[e]):void 0}}function sortingWords(e,t){return function(o,n){var r=o[e].toUpperCase(),i=n[e].toUpperCase();if("lowest"==t){if(r<i)return-1;if(r>i)return 1}if("highest"==t){if(r>i)return-1;if(r<i)return 1}return 0}}function loadMovies(e){return console.log("Loading movies"),Promise.resolve(fetchTMDb(e))}function loadController(e,t){"reset-movies"==t&&(console.log("Resetting movies!"),movieAPI.clearMovies(),clearMovieElements(),resetMonitor()),monitorMovieElements.total_pages==monitorMovieElements.current_page&&monitorMovieElements.fetched?console.log("All movies loaded!"):loadMovies(e).then(function(e){var t=sortingMovies(lastSettings.sorting.sortingby,lastSettings.sorting.sortingorder,e.results);return movieAPI.setMovie(t),movieAPI.setMovieIndex(),monitorMovieElements.total_pages=e.total_pages,monitorMovieElements.fetched=!0,scrollGate=!1,t}).then(function(e){addMovieElements(e)}).then(function(){1==monitorMovieElements.current_page&&(console.log("PRE-FETCHING"),calcWindowPosition())}).catch(function(t){console.log("---------------------------------"),console.log("Failed somewhere at => loadMovies"),console.log(t),console.log(resp),console.log(e),console.log("---------------------------------")})}function addMovieIndex(e){console.log("=============="),console.log(e),console.log("==============");for(var t=e,o=0;o<e.length;o++)t[o].DOMindex=o;return t}function findMovieIndex(e,t){for(var o=0;o<t.length;o++)if(t[o].id==e)return o;throw new Error("Couldnt find following ID - returning index number instead")}function mergeNestedArrays(e){var t=[];for(var o in e)for(var n in e[o].results)t.push(e[o].results[n]);return t}function addMovieElements(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=document.createDocumentFragment(),o=0;o<e.length;o++){var n=document.createElement("li");n.className="mg-movie-item",n.setAttribute("movie-id",""+e[o].id);var r=document.createElement("div");r.className="mg-movie-image",r.setAttribute("style","background-image: url('"+(urlImageBase+e[o].poster_path)+"')");var i=document.createElement("h3");i.className="mg-movie-title",i.innerText=""+e[o].title;var a=document.createElement("h4");a.className="mg-movie-year",a.innerText=""+parseFloat(e[o].release_date),n.appendChild(r),n.appendChild(i),n.appendChild(a),t.appendChild(n)}mgMovieContainer.appendChild(t)}function clearMovieElements(){mgMovieContainer.innerHTML=""}function resetMonitor(){monitorMovieElements={total_pages:0,current_page:0,fetched:!1}}function mouseFilter(e){if(e.target.parentNode.classList.contains("mg-movie-item")){if(updateMovieSeletion(e.target.parentNode),"click"==e.type)return void console.log("click");if("dblclick"==e.type){console.log("dblclick");var t=e.target.parentNode.getAttribute("movie-id");return void controllerMovieOverlay("open",movieAPI.getMovieById(t))}}}function updateMovieSeletion(e){var t=document.querySelector('.mg-movie-item[movie-id="'+movieSelection.current+'"]');null!==t&&t.removeAttribute("movie-selected"),e.setAttribute("movie-selected","true"),movieSelection.current=e.getAttribute("movie-id")}function calcMovieSelection(e){function t(e,t){updateMovieSeletion(document.querySelector(".mg-movie-item:nth-child("+(e+1)+")"));var o=document.getElementById("footer-key-"+t);o.setAttribute("style","background-color: #1abc9c"),setTimeout(function(){o.removeAttribute("style")},300)}var o=currentDomPosition(movieSelection.current),n=moviesPrRow();if("37"==e){if(0==o)return;return o%n==0&&pageScroll("up"),o-=1,void t(o,e)}if("38"==e){if(n>o)return;return o-=n,pageScroll("up"),void t(o,e)}if("39"==e){if(o==movieAPI.getMovieArr().length-1)return;return(o+=1)%n==0&&pageScroll("down"),void t(o,e)}if("40"==e){if(o+n>movieAPI.getMovieArr().length-1)return;return o+=n,pageScroll("down"),void t(o,e)}}function pageScroll(e){var t=document.scrollingElement;if("down"==e&&downActive)var o=0,n=setInterval(function(){o>=35||t.scrollTop==t.scrollHeight?(clearInterval(n),downActive=!0):(downActive=!1,o++,t.scrollTop+=10)},5);if("up"==e&&upActive)var r=0,i=setInterval(function(){r>=35||0==t.scrollTop?(clearInterval(i),upActive=!0):(upActive=!1,r++,t.scrollTop-=10)},5)}function moviesPrRow(){var e=document.querySelector(".mg-movie-item").offsetWidth+20,t=mgMovieContainer.offsetWidth;return Math.floor(t/e)}function currentDomPosition(e){for(var t=0;mgMovieContainer.children[t];){if(mgMovieContainer.children[t].getAttribute("movie-id")===e)return t;t++}}function calcWindowPosition(e){if(mainGalleryActive=mainGallery.getAttribute("data-active"),!scrollGate&&"false"!=mainGalleryActive){windowSize=window.innerHeight,scrollPosition=window.pageYOffset;var t=header.offsetHeight+mainGallery.offsetHeight-windowSize-scrollPosition;console.log(t),Number(t)<450&&(scrollGate=!0,loadController({task:"discover",settings:lastSettings}))}}function openSearchField(e){0==searchField?(e.stopPropagation(),searchField=!0,headerSearchInput.focus(),headerSearch.setAttribute("data-active","true"),movieContainer.style="filter: blur(10px)",DOMbody.addEventListener("click",closeSearchField)):(""!=headerSearchInput.value&&console.log("request data "),searchField=!1,headerSearchInput.blur(),headerSearch.setAttribute("data-active","false"),headerSearchInput.value="",movieContainer.style="filter: blur(0px)",DOMbody.removeEventListener("click",closeSearchField))}function keypressSearchField(e){!searchField||13!=e.keyCode&&27!=e.keyCode||openSearchField()}function closeSearchField(e){"header-search-input"!=e.target.id&&openSearchField()}function controllerMovieOverlay(e,t,o){if("open"==e){overlayMovies.setAttribute("data-active","true");var n={task:"movie",movieID:t.id};overlayMovies.addEventListener("click",function(e){controllerMovieOverlay("close")}),overlayMovieCon.addEventListener("click",function(e){e.stopPropagation()}),Promise.resolve(fetchTMDb(n)).then(function(e){return updateMovieOverlay(e)})}"close"==e&&overlayMovies.setAttribute("data-active","false")}function updateMovieOverlay(e){var t="http://image.tmdb.org/t/p/w342"+e.poster_path;omPoster.setAttribute("style","background-image: url("+t+")"),omPosterInner.setAttribute("style","background-image: url("+t+")"),omTitle.textContent=e.title+" - "+e.tagline,omYear.textContent=parseFloat(e.release_date),omDuration.textContent=e.runtime,omRating.textContent=e.vote_average,omVotes.textContent=e.vote_count+" votes",omDirector.textContent=getIdentity(e.credits.crew,"Director"),omGenre.textContent=void 0,omWriter.textContent=getIdentity(e.credits.crew,"Writer","Screenplay"),omReleasedate.textContent=e.release_date,omDescription.textContent=e.overview,omActorsIcon.textContent=void 0}function getIdentity(e,t,o){for(var n in e)if(e[n].job==t||e[n].job==o)return e[n].name}function closeOI(e){e.stopPropagation(),"overlay-info-main"!=this.id&&(oiContainer.style="display: none",movieContainer.style="filter: blur(0px)",oiPoster.removeAttribute("style"),olWindowActive=!1)}function fetchTMDb(e){function t(e,t){return fetch(e).then(function(e){return handleErrors(e,t)}).then(function(e){return e.json()}).then(function(e){return console.log(e),e}).catch(function(e){return console.log("TMDb data fetch failed")})}var o="c6aea5536b7de40d0294eb356df3c3df",n="&include_adult=false";return"movie"==e.task?(console.log("TASK = MOVIE"),t("https://api.themoviedb.org/3/movie/"+e.movieID+"?api_key="+o+"&append_to_response=credits",e.task)):"multisearch"==e.task?(console.log("TASK = MULTISEARCH"),t("https://api.themoviedb.org/3/search/multi?api_key="+o+"&language=en-US"+n+"&query="+e.query+"&page="+e.pageNr,e.task)):"genre"==e.task?(console.log("TASK = GENRE"),t("https://api.themoviedb.org/3/discover/movie?api_key="+o+"&with_genres="+genreID+"&primary_release_date.gte=2015-01-01&vote_count.gte=10&page="+pageNr+"&include_video&popularity.desc",e.task)):"actor"==e.task?(console.log("TASK = ACTOR"),t("https://api.themoviedb.org/3/person/"+e.personID+"?api_key="+o+"&language=en-US",e.task)):"actorcredits"==e.task?(console.log("TASK = ACTOR CREDITS"),t("https://api.themoviedb.org/3/person/"+e.personID+"/movie_credits?api_key="+o+"&language=en-US",e.task)):"discover"==e.task?(console.log("TASK = DISCOVER"),monitorMovieElements.current_page+=1,t("https://api.themoviedb.org/3/discover/movie?api_key="+o+n+"&include_video=false"+assembleSettings(e.settings)+"&page="+monitorMovieElements.current_page,e.task)):void 0}function handleErrors(e,t){return e.ok||(console.log(e),console.log(t+"      <=========== following task failed")),e}function assembleSettings(e){return"&"+("with_genres="+getGenreID(e.filtering.genre))+"&"+("vote_average.gte="+e.filtering.rating[0])+"&"+("vote_average.lte="+e.filtering.rating[1])+"&"+("with_runtime.gte="+e.filtering.runtime[0])+"&"+("with_runtime.lte="+e.filtering.runtime[1])+"&"+("primary_release_date.gte="+e.filtering.year[0]+"-01-01")+"&"+("primary_release_date.lte="+e.filtering.year[1]+"-01-01")}function getGenreID(e){for(var t="",o=0;o<e.length;o++)0!=o&&(t+=","),t+=genreList[e[o]];return t}var mgArranger=document.getElementById("mg-arranger-container"),mgToggle=document.getElementById("mg-toggle"),mgRefresh=document.getElementById("mg-refresh");mgToggle.addEventListener("click",toggleArranger),mgRefresh.addEventListener("click",compareArranger);var lastSettings=[],mgFilteringGenre=document.getElementsByClassName("mg-checkbox"),mgRadioInput=document.getElementsByClassName("mg-radio-input"),mgSortingOrder=document.getElementsByClassName("mg-sorting-order"),monitorMovieElements={total_pages:0,current_page:0,fetched:!1},movieAPI=function(){var e=[];return{clearMovies:function(t){e=[]},setMovie:function(t){t.map(function(t){return e.push(t)})},setMovieArr:function(t){e=JSON.parse(JSON.stringify(t))},setMovieIndex:function(){e=addMovieIndex(e)},getMovie:function(t){return e[t]},getMovieArr:function(){return JSON.parse(JSON.stringify(e))},getMovieById:function(t){return e[findMovieIndex(t,e)]}}}(),urlImageBase="http://image.tmdb.org/t/p/w154",mgMovieContainer=document.getElementById("mg-movie-container"),keyboardStateActive=!1;mgMovieContainer.addEventListener("dblclick",mouseFilter),mgMovieContainer.addEventListener("click",mouseFilter),mgMovieContainer.addEventListener("keyup",function(){keyboardStateActive=!1}),mgMovieContainer.addEventListener("keydown",function(e){if(keyboardStateActive)return e.preventDefault(),void console.log("keyboard event cancelled");keyboardStateActive=!0,"37"!=e.keyCode&&"38"!=e.keyCode&&"39"!=e.keyCode&&"40"!=e.keyCode&&"13"!=e.keyCode||(e.preventDefault(),calcMovieSelection(e.keyCode))});var movieSelection={current:291805},main=document.getElementById("main"),upActive=!0,downActive=!0;window.addEventListener("scroll",calcWindowPosition);var scrollGate=!1,mainGallery=document.getElementById("main-gallery"),header=document.getElementById("header"),windowSize=void 0,scrollPosition=void 0,mainGalleryActive=void 0;window.onload=function(){window.lastSettings=getArrangerSettings(),loadController({task:"discover",settings:lastSettings})};var DOMbody=document.getElementsByTagName("body")[0],headerSearchLogo=document.getElementById("header-search-logo"),headerSearchInput=document.getElementById("header-search-input"),headerSearch=document.getElementById("header-search"),movieContainer=document.getElementById("mg-movie-container"),searchField=!1;headerSearchLogo.addEventListener("click",openSearchField),headerSearchInput.addEventListener("keydown",keypressSearchField),function(){function e(e){if("click"==e.type||13==e.keyCode)return t(o.value),void(o.value="")}function t(e){console.log(e)}var o=document.getElementById("mhs-input"),n=document.getElementById("mhs-search");o.addEventListener("keyup",e),n.addEventListener("click",e)}();var omPoster=document.getElementById("om-poster"),omPosterInner=document.getElementById("om-poster-inner"),omTitle=document.getElementById("om-title"),omYear=document.getElementById("om-year"),omDuration=document.getElementById("om-duration"),omRating=document.getElementById("om-rating"),omVotes=document.getElementById("om-votes"),omDirector=document.getElementById("om-director"),omGenre=document.getElementById("om-genre"),omWriter=document.getElementById("om-writer"),omReleasedate=document.getElementById("om-releasedate"),omActors=document.getElementById("om-actors"),omDescription=document.getElementById("om-description"),omActorsIcon=document.getElementById("om-actors-icon"),overlayMovies=document.getElementById("overlay-movies"),overlayMovieCon=document.getElementById("overlay-movies-container"),genreList={action:28,adventure:12,animation:16,comedy:35,crime:80,documentary:99,drama:18,fantasy:14,history:36,horror:27,mystery:9648,romance:10749,scifi:878,thriller:53,war:10752,western:37},sliderRating=document.getElementById("mg-slider-rating"),sliderRuntime=document.getElementById("mg-slider-runtime"),sliderYear=document.getElementById("mg-slider-year");noUiSlider.create(sliderRating,{start:[6,10],connect:!0,tooltips:[wNumb({decimals:1}),wNumb({decimals:1})],range:{min:[1],max:[10]}}),noUiSlider.create(sliderRuntime,{start:[80,150],connect:!0,animationDuration:300,tooltips:[wNumb({decimals:0}),wNumb({decimals:0})],range:{min:[60],max:[300]}}),noUiSlider.create(sliderYear,{start:[1990,2017],connect:!0,orientation:"vertical",tooltips:[wNumb({decimals:0}),wNumb({decimals:0})],range:{min:[1940],"50%":[2e3],max:[2020]}});