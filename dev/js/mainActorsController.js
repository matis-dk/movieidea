
let mainActorsProfile   =   document.getElementById('main-actors-profile');

let madName             =   document.getElementById('mad-name')
let madBiography        =   document.getElementById('mad-biography')
let madFrom             =   document.getElementById('mad-from')
let madBirthday         =   document.getElementById('mad-birthday')
let madHomepage         =   document.getElementById('mad-homepage')


let madActorsTrademark  =   Array.from(document.getElementById('mat-container').children)
// let mad      =   document.getElementById('mad-')
// let mad      =   document.getElementById('mad-')
//



function controllerActors (payload) {

    let con = {
        task: "actor",
        personID: payload
    }

    fetchTMDb(con)
        .then(resp => {

            mainActorsProfile.setAttribute('style', `background-image:url('http://image.tmdb.org/t/p/w185${resp.profile_path}')`)

            madName.textContent         =   resp.name;
            madBiography.textContent    =   resp.biography
            madFrom.textContent         =   resp.place_of_birth;
            madBirthday.textContent     =   resp.birthday;
            madHomepage.textContent     =   resp.homepage;

            addMostPopular(resp.combined_credits.cast)
        })
}



function addMostPopular (movieList) {

    movieList.sort(function(a, b){
        if (a.media_type == "tv") { return 0 }  // Removing tv series 
        return b.vote_average - a.vote_average
    });

    for (let i = 0; i < 8; i++) {
        madActorsTrademark[i].setAttribute('style', `background-image:url('http://image.tmdb.org/t/p/w185${movieList[i].poster_path}')`)
        madActorsTrademark[i].setAttribute('movie-id', `${movieList[i].id}`)

        let movieName = `${movieList[i].title} (${parseFloat(movieList[i].release_date)})`
        madActorsTrademark[i].children[0].textContent = movieName;
    }
}
