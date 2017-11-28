$(document).ready(() => {

    getFeatured();

    $('#searchForm').on('submit', (e) => {

        var searchText = $('#searchText').val();
        getMovieDetails(searchText);
        $('#featured').html("");
        e.preventDefault();
    });
});

//OOhsSTRa792Ze2xsx6SQm2UlxiNpz7wS

function getFeatured() {
    var api = "api_key=55a2b131521947fe736a0a2f26f463f7";
    var url = " https://api.themoviedb.org/3/movie/now_playing?" + api;
    axios.get(url)
        .then(function (response) {
            var movielist = response.data.results;
            var output = "";

            $.each(movielist, (index, movie) => {
                var date = movie.release_date.split("-");
                var year = date[0];
                var month = date[1];
                var basicPosterUrl = "https://www.xauzit.com/wp-content/uploads/" + year + "/" + month;
                var movieOverview = movie.overview;
                if (movieOverview.length > 270) {
                    movieOverview = movieOverview.substring(0, 270) + "...";
                }

                output += `
            <div class="col-md-6">
                   <div class="row">
                    <div class="col-md-4">
                        <img class="img-rounded" src=`;
                output += basicPosterUrl + `${movie.poster_path}>
                    </div>
                    <div class="col-md-8">
                        <h5 style="text-align:center;float:center;">${movie.title}</h5>
                        <h5 style="text-align:right;float:right;color:orange">${movie.vote_average} &#9733;</h5>
                        </br></br><h6>`;
                output += movieOverview + `</h6>
                        <br>
                        <a onclick="movieSelectedCurrent('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                        <a onclick="getShowtimes()" style="float: right" class="btn btn-success" href="#">Find Showtimes</a>
                    </div>
                </div>
            </div>
            `
            });
            $('#featured').html(output);
            // console.log(output);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMovieDetails(searchText) {
    var api = "&apikey=c4dacaef"
    var url = "http://www.omdbapi.com/?s=" + searchText + api;
    axios.get(url)
        .then(function (response) {
            var movielist = response.data.Search;
            console.log(movielist);
            var output = "";
            $.each(movielist, (index, movie) => {
                output += `<div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h4>${movie.Title}</h4>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>`
            });
            $('#movies').html(output);
            console.log(output);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function movieSelectedCurrent(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'moviecurrent.html';
    return false;
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovieCurrent() {
    let movieId = sessionStorage.getItem('movieId');
    var apikey = "api_key=55a2b131521947fe736a0a2f26f463f7";
    var url = "https://api.themoviedb.org/3/movie/" + movieId + "?" + apikey;
    var imdbId;

    axios.get(url)
        .then(function (response) {
            console.log(response.data);

            imdbId = response.data.imdb_id;
            // console.log("IMDB " + imdbId);

            var api = "&apikey=c4dacaef"
            var url = "http://www.omdbapi.com/?i=" + imdbId + api;
            axios.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    var movie = response.data;
                    var output = `
                        <div class="row">
                            <div class="col-md-4">
                            <img src="${movie.Poster}" class="thumbnail">
                            </div>
                            <div class="col-md-8">
                                <h2>${movie.Title}</h2>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        Genre: ${movie.Genre}
                                    </li>
                                    <li class="list-group-item">
                                        Release: ${movie.Released}
                                    </li>
                                    <li class="list-group-item">
                                        Rated: ${movie.Rated}
                                    </li>
                                    <li class="list-group-item">
                                        IMDb Rating: ${movie.imdbRating}
                                    </li>
                                    <li class="list-group-item">
                                        Director(s): ${movie.Director}
                                    </li>
                                    <li class="list-group-item">
                                        Writer(s): ${movie.Writer}
                                    </li>
                                    <li class="list-group-item">
                                        Actors: ${movie.Actors}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row>
                            <div class="well">
                                <h3> Plot: </h3> ${movie.Plot}
                                </br>
                                <a href = "http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDb</a>
                                <a href="index.html" class="btn btn-default">Back to Search</a>
                            </div>
                        </div>
            `
                       $('#moviecurrent').html(output);
                })
                .catch(function (error) {
                    console.log(error);
                });

        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    var api = "&apikey=c4dacaef"
    var url = "http://www.omdbapi.com/?i=" + movieId + api;
    axios.get(url)
        .then(function (response) {
            // console.log(response.data);
            var movie = response.data;
            var output = `
                    <div class="row">
                        <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                        </div>
                        <div class="col-md-8">
                            <h2>${movie.Title}</h2>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    Genre: ${movie.Genre}
                                </li>
                                <li class="list-group-item">
                                    Release: ${movie.Released}
                                </li>
                                <li class="list-group-item">
                                    Rated: ${movie.Rated}
                                </li>
                                <li class="list-group-item">
                                    IMDb Rating: ${movie.imdbRating}
                                </li>
                                <li class="list-group-item">
                                    Director(s): ${movie.Director}
                                </li>
                                <li class="list-group-item">
                                    Writer(s): ${movie.Writer}
                                </li>
                                <li class="list-group-item">
                                    Actors: ${movie.Actors}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row>
                        <div class="well">
                            <h3> Plot: </h3> ${movie.Plot}
                            </br>
                            <a href = "http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDb</a>
                            <a href="index.html" class="btn btn-default">Back to Search</a>
                        </div>
                    </div>
        `
            $('#movie').html(output);
        })
        .catch(function (error) {
            console.log(error);
        });
}