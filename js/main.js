$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        var searchText = $('#searchText').val();
        getMovieDetails(searchText);
        
        e.preventDefault();
    });
});

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
                            <h5>${movie.Title}</h5>
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