"use strict";function fetchTMDb(e){var t="c6aea5536b7de40d0294eb356df3c3df";if("multisearch"==e.task){var n="https://api.themoviedb.org/3/search/multi?api_key="+t+"&language=en-US&query="+e.query+"&page="+e.pageNr+"&include_adult=false";return fetch(n).then(handleErrors).then(function(e){return e.json()}).then(function(e){return console.log(e)}).catch(function(e){return console.log("TMDb data request failed => popularity")})}if("genre"==e.task){var r="https://api.themoviedb.org/3/discover/movie?api_key="+t+"&with_genres="+genreID+"&primary_release_date.gte=2015-01-01&with_original_language=en&vote_count.gte=10&page="+pageNr+"&include_video&popularity.desc";return fetch(r).then(handleErrors).then(function(e){return e.json()}).catch(function(e){return console.log("TMDb data request failed => genre")})}}function handleErrors(e){return e.ok||console.log(movieID+"      <=========== movieID not found"),e}!function(){function e(e){if("click"==e.type||13==e.keyCode)return t(n.value),void(n.value="")}function t(e){console.log(e)}var n=document.getElementById("mhs-input"),r=document.getElementById("mhs-search");n.addEventListener("keyup",e),r.addEventListener("click",e)}();