$(document).ready(() => {

    getFeatured();

    $('#searchForm').on('submit', (e) => {

        var searchText = $('#searchText').val();
        getMovieDetails(searchText);
        $('#featured').html("");
        e.preventDefault();
    });
});

function getFeatured()
{
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

            output += `
                <div class="col-md-4">
                   <div class="well text-center">
                    <img class="img-rounded" src=`;
            output+=basicPosterUrl + `${movie.poster_path}>
                    <h5 style="text-align:center;float:center;">${movie.title}</h5>
                    <h5 style="text-align:right;float:right;color:orange">${movie.vote_average}</h5>
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

function getMovieDetails(searchText)
{
    var api = "&apikey=c4dacaef"
    var url = "http://www.omdbapi.com/?s=" + searchText + api;
    axios.get(url)
    .then(function (response) {
        var movielist = response.data.Search;
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

function movieSelected(id)
{
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie()
{
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